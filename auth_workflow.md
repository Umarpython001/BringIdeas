# Authentication Workflow with Supabase Auth, React, and FastAPI

## 1. Overview

This document explains how authentication works in the application using **Supabase Auth**, **React**, and **FastAPI**.

The application delegates authentication responsibilities to Supabase Auth, while FastAPI handles protected backend operations and application business logic.

The main responsibilities are:

- **React:** Collects registration and login details and communicates with Supabase Auth.
- **Supabase Auth:** Creates user accounts, manages passwords, verifies email addresses, manages sessions, and issues access tokens.
- **FastAPI:** Validates access tokens, identifies authenticated users, and handles protected API requests.
- **Supabase PostgreSQL:** Stores application data, including user profile information.

### Important distinction

Supabase Auth and the application's own profile table serve different purposes.

Supabase Auth manages authentication. The application's `public.profiles` table stores additional information about users that the application needs.

Both records are connected using the same user UUID.

---

## 2. Understanding the User Tables

Supabase Auth maintains its own internal PostgreSQL schema containing the `auth.users` table.

Whenever a user registers successfully, Supabase Auth creates a record in this table and assigns the user a unique UUID.

### 2.1 The `auth.users` table

The `auth.users` table contains authentication-related information, including:

- `id`: The user's unique UUID.
- `email`: The user's email address.
- `encrypted_password`: The stored password hash, where applicable.
- `email_confirmed_at`: The timestamp when the email address was confirmed.
- `created_at`: When the account was created.
- `raw_user_meta_data`: Additional user metadata supplied during registration.

Supabase manages this table. Application code should generally interact with it through Supabase Auth rather than manually inserting or updating authentication records.

### 2.2 The `public.profiles` table

The application maintains its own profile table in the `public` schema.

This table stores information required by the application, such as:

- `id`: The user's UUID, referencing `auth.users.id`.
- `first_name`
- `last_name`
- `username`
- `age`
- `university`
- Other application-specific profile fields.

The `id` column should use the same UUID assigned by Supabase Auth.

For example:

```sql
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    first_name text,
    last_name text,
    username text unique,
    age integer,
    university text,
    created_at timestamptz default now()
);
```

**Why use the same UUID?**

There is no need to generate a separate user ID for the profile record. The Supabase Auth UUID identifies the user across both tables.

The relationship is:

```text
auth.users.id  ────────── public.profiles.id
     UUID                       UUID
```

The two tables are separate, but each profile belongs to one authentication account.

---

## 3. Registration Workflow

The registration workflow describes what happens when a new user creates an account.

### Step 1: User fills out the React registration form

The user enters their registration information.

React performs client-side validation, including:

- Required fields are provided.
- Email address has a valid format.
- Password meets the application's requirements.
- Password and confirmation password match.
- Username follows the required format.
- Other profile fields contain valid values.

Client-side validation improves the user experience, but it is not a security boundary. Important constraints must also be enforced by the backend or database.

### Step 2: React sends authentication details to Supabase Auth

React uses the Supabase JavaScript client (`supabase-js`) to register the user.

The `signUp()` method accepts the user's email and password.

Additional profile information can be included through `options.data`.

Example:

```typescript
const { data, error } = await supabase.auth.signUp({
  email: registrationData.email,
  password: registrationData.password,

  options: {
    data: {
      first_name: registrationData.firstName,
      last_name: registrationData.lastName,
      username: registrationData.username,
      age: registrationData.age,
      university: registrationData.university,
    },
  },
});
```

The additional information supplied through `options.data` is stored as user metadata in the `raw_user_meta_data` field of `auth.users`.

**Important:** Sending metadata to Supabase Auth does not automatically create corresponding columns or rows in the application's `public.profiles` table.

### Step 3: Supabase Auth creates the authentication account

Supabase Auth processes the registration request.

If registration succeeds, it creates a new record in `auth.users` and assigns the account a UUID.

The UUID becomes the primary identifier for that user throughout the application.

### Step 4: A database trigger creates the application profile

The application needs a separate profile record containing information such as the user's first name, last name, username, and university.

To achieve this, create a PostgreSQL trigger that listens for new records inserted into `auth.users`.

The trigger executes a database function that:

1. Receives the newly created authentication record.
2. Reads the user's UUID from `new.id`.
3. Reads the additional information from `new.raw_user_meta_data`.
4. Inserts the relevant information into `public.profiles`.
5. Uses the same UUID as the profile's primary key.

This means the application profile is created automatically when the authentication account is created.

The trigger runs as part of the database transaction associated with the new user record. If the trigger fails, the signup operation can fail too.

**Implementation note:** The trigger function must handle missing or invalid metadata safely. For example, converting an absent or invalid `age` value to an integer can cause an error. Also account for username uniqueness constraints.

### Step 5: Supabase handles email confirmation

If email confirmation is enabled in the Supabase project settings, Supabase sends a confirmation email to the registered address.

The user follows the confirmation link to verify their email address.

The exact signup experience depends on the project's email-confirmation configuration.

### Step 6: A session is established

Depending on the email-confirmation settings, signup may return:

- A user and an active session; or
- A user without an active session, until email confirmation is completed.

When a session is established, Supabase provides authentication tokens that allow the user to access protected resources.

The session generally contains:

- An access token (JWT).
- A refresh token.

Supabase Auth manages token refresh through the client library.

### Registration workflow summary

```text
User
  |
  v
React Registration Form
  |
  | Email, password, profile metadata
  v
Supabase Auth: signUp()
  |
  v
auth.users record created
  |
  v
Database Trigger
  |
  v
public.profiles record created
  |
  v
Email Confirmation (if enabled)
  |
  v
Authenticated Session (depending on configuration)
```

---

## 4. Login Workflow

When an existing user wants to log in, React communicates directly with Supabase Auth.

### Step 1: User submits the login form

The user enters their email address and password.

React performs basic form validation before submitting the details.

### Step 2: React sends the credentials to Supabase Auth

Use `signInWithPassword()`:

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: loginData.email,
  password: loginData.password,
});
```

### Step 3: Supabase Auth verifies the credentials

Supabase Auth checks the submitted credentials against the stored authentication account.

If the credentials are valid and the account satisfies the applicable authentication requirements, Supabase establishes a session.

If authentication fails, Supabase returns an error.

### Step 4: Supabase returns the session

The session contains an access token and a refresh token.

The Supabase JavaScript client manages the session and can refresh expired access tokens.

### Login workflow summary

```text
User
  |
  v
React Login Form
  |
  | Email and password
  v
Supabase Auth: signInWithPassword()
  |
  v
Credentials Verified
  |
  v
Session and Tokens Returned
  |
  v
User Authenticated
```

---

## 5. Protecting Backend Routes with FastAPI

Supabase Auth handles authentication, but FastAPI still needs to know which user is making each API request.

This is where the access token comes in.

### Step 1: React sends an API request with the access token

When a user makes a request to a protected FastAPI endpoint, React includes the Supabase access token in the HTTP Authorization header.

Example:

```http
GET /api/profile
Authorization: Bearer <supabase_access_token>
```

The token identifies the authenticated user.

### Step 2: FastAPI receives the request

FastAPI extracts the token from the Authorization header.

A reusable authentication dependency can handle this process so that individual route handlers do not need to repeat the same authentication logic.

### Step 3: FastAPI validates the access token

FastAPI must verify that the token is valid and was issued by the expected Supabase project.

Token validation should verify the signature and relevant claims, including:

- Token expiration (`exp`).
- Issuer (`iss`).
- Audience (`aud`), where applicable.
- The user's identity (`sub`).

This verification can be implemented using Supabase's supported token-verification methods or a properly configured JWT verification library.

**Security note:** Never simply decode a JWT and trust its contents. Decoding is not the same as verifying its signature.

### Step 4: FastAPI identifies the authenticated user

After successful verification, FastAPI obtains the user's UUID from the token's `sub` claim.

The UUID can then be used to retrieve the corresponding profile from `public.profiles`.

For example:

```python
profile = db.query(Profile).filter(
    Profile.id == authenticated_user_id
).first()
```

### Step 5: FastAPI processes the protected request

Once the user's identity has been verified, FastAPI can execute the requested operation.

For example:

- Retrieve the user's profile.
- Update profile information.
- Create a new post.
- Retrieve the user's own posts.
- Check whether the user has permission to perform an operation.

**Important:** Authentication and authorization are different.

- Authentication answers: Who is making this request?
- Authorization answers: Is this user allowed to perform this action?

FastAPI must enforce the application's authorization rules rather than assuming that an authenticated user can access every resource.

### Backend authentication workflow summary

```text
React
  |
  | API Request + Bearer Access Token
  v
FastAPI Protected Endpoint
  |
  v
Extract Access Token
  |
  v
Verify Token
  |
  v
Identify User (JWT sub / UUID)
  |
  v
Check Authorization
  |
  v
Execute Protected Operation
```

---

## 6. Logout Workflow

React can log the user out through the Supabase JavaScript client.

```typescript
const { error } = await supabase.auth.signOut();
```

Supabase Auth and the client library handle the sign-out process and the local session state.

The application should update its authentication state and redirect the user where appropriate.

---

## 7. Responsibilities of Each Component

| Component | Responsibility |
|---|---|
| React | Registration and login forms, client-side validation, session-aware UI, and API requests. |
| Supabase Auth | Account creation, password verification, email confirmation, sessions, and token issuance. |
| `auth.users` | Supabase-managed authentication records. |
| Database Trigger | Creates an application profile when a new authentication account is inserted. |
| `public.profiles` | Stores application-specific user information. |
| FastAPI | Token verification, user identification, authorization, and business logic. |
| Supabase PostgreSQL | Persistent storage for application data. |

---

## 8. Important Security and Implementation Notes

1. **Never store user passwords in `public.profiles`.** Supabase Auth is responsible for password management.

2. **Never expose the Supabase secret/service-role key in React.** Use the publishable key in the browser. Keep privileged credentials on the server.

3. **Do not trust user metadata for authorization.** `raw_user_meta_data` is user-editable. Do not use it to determine privileged roles or permissions.

4. **Validate important data.** Client-side validation alone is insufficient. Enforce database constraints and server-side validation where appropriate.

5. **Verify access tokens properly.** Never trust a JWT merely because you can decode it.

6. **Do not assume SQLAlchemy automatically enforces Supabase Row Level Security (RLS).** A direct PostgreSQL connection from FastAPI does not automatically inherit the user's Supabase JWT identity. The backend must enforce authorization itself or deliberately implement a supported RLS-aware request context.

7. **Keep the authentication and profile records separate.** Supabase Auth owns `auth.users`; the application owns `public.profiles`.

---

## 9. Quick Reference: Authentication vs Application Profile Information

### Authentication information

Managed by Supabase Auth:

- Email address.
- Password and password verification.
- User UUID.
- Email verification status.
- Authentication sessions.
- Access and refresh tokens.

### Application profile information

Managed by the application's profile table:

- First name.
- Last name.
- Username.
- Age.
- University.
- Other information required by the application.

**The key idea:** Supabase Auth establishes and manages the user's identity. The application uses that identity to associate the user with their profile and application data.