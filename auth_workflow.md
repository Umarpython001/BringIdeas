






Supabase Auth has it's own `auth.users` table that is automatically populated with a row/record whenever a new user signs up. 

This record contains authentication information such as: id, email, encrypted password, email_confirmed_at, created_at, etc. 

It also stores additional profile information like first name, last name, age, depending on what info you collect, as options.data, as user meta data and stores it in the `raw_user_meta_data` field.


You can sign up a user like this:
```ts

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


## How to populate the normal users profile table with information from the Supabase Auth users table

Sending metadata to Supabase Auth does NOT automatically create corresponding columns or rows in your `public.profiles` table. 

You will need to create a trigger function that listens for new users in the `auth.users` table and inserts their metadata into your normal user profiles table. Let's call it `public.profiles`.








### React: 
    - Collects registration and login details and communicates with Supabase Auth using supabase-js.


### Supabase Auth: 
    - Creates accounts, verifies credentials, manages sessions and issues access tokens.

### FastAPI: 
    - Receives and validates supabase access tokens, identifies the authenticated user, and handles protected API requests.

### Supabase PostgreSQL: 
    - Stores your application data, including any additional user profile information you need.


## There are two types of user information to distinguish:

### Authentication information
- Email address
- Password (managed by Supabase Auth)
- User ID
- Email verification status
- Session and token information

### Application profile information
- First name
- Last name
- Username
- University
- Other information your application needs

Supabase Auth manages the first category. Your own users or profiles table can manage the second.