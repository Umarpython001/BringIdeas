# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## UNILAG Student Ideas Platform

**Working title:** BringIdeas  
**Product type:** Student idea-sharing and discovery platform  
**Target audience:** Students of the University of Lagos (UNILAG)  
**Document status:** Initial product specification  
**Version:** 1.0  
**Initial release:** Landing page, authentication, and personalized welcome feed

---

# 1. Product Overview

## 1.1 Product Summary

BringIdeas is a web platform where students of the University of Lagos can share ideas, discover ideas from other students, and express their opinions through community voting.

Students often have ideas for businesses, campus improvements, software products, student services, events, social initiatives, and other projects. However, many ideas never go beyond a conversation with friends or a note on someone's phone.

The platform provides a central place for students to document those ideas and make them discoverable by the wider university community.

Inspired by IdeasAI's simple idea-discovery and voting experience, BringIdeas adapts the concept to a university environment. Instead of focusing exclusively on AI-generated startup concepts, the platform will prioritize ideas contributed by students themselves.

The long-term objective is to create a campus community where ideas can be shared, discussed, evaluated, and potentially developed collaboratively.

## 1.2 Problem Statement

Students have ideas, but there is no dedicated, centralized platform within this product concept for students to publish, discover, and collectively evaluate them.

Existing communication channels are not necessarily designed for this purpose. Ideas shared in group chats can become difficult to find, social media posts compete with unrelated content, and private notes do not provide opportunities for feedback.

As a result:
- Students may forget or abandon ideas they never document properly.
- Students with similar interests may not discover one another.
- Interesting ideas may receive little feedback outside their creators' immediate circles.
- Students who want to collaborate may struggle to find others interested in the same problem.
- There is no single community feed for exploring student-generated ideas.

These are initial product hypotheses, not yet validated findings. The project should test whether students actually experience these problems and whether they would use a dedicated platform to address them.

## 1.3 Proposed Solution

Build a responsive web application where UNILAG students can eventually:

- Create an account and sign in.
- Publish ideas in a structured format.
- Browse ideas submitted by other students.
- Upvote ideas they find interesting.
- Downvote ideas they do not support.
- View the popularity of ideas through vote counts and rankings.
- Discover ideas across different faculties, interests, and disciplines.
- Engage with other students around promising ideas.

The first release will implement only the public landing page, account registration, login, session management, and a basic authenticated welcome page.

## 1.4 Product Vision

Make it easier for every UNILAG student to put an idea out into the world, discover what other students are thinking about, and find people who might help bring those ideas to life.

## 1.5 Product Principles

1. **Low friction:** Sharing an idea should eventually take only a few minutes.
2. **Accessible to everyone:** Students should not need programming or technical knowledge to participate.
3. **Ideas first:** The quality and usefulness of an idea should matter more than the technical ability of its creator.
4. **Simple discovery:** Students should be able to browse ideas without navigating a complicated interface.
5. **Community feedback:** Voting should make it easier to understand what interests the community.
6. **Mobile-first usability:** The experience must work well on phones, not only laptops.
7. **Trust and accountability:** Accounts, moderation, and privacy should be considered from the beginning.

---

# 2. Goals and Non-Goals

## 2.1 Primary Goals

- Establish a clear product identity for the UNILAG student community.
- Build a functional authentication system.
- Give registered students a personalized experience.
- Create a technical foundation that supports future idea submission, discovery, and voting.
- Produce a demonstrable first version suitable for a developer portfolio.
- Validate whether students are interested in using the platform.

## 2.2 Long-Term Goals

- Build a searchable database of student-generated ideas.
- Encourage students to exchange feedback.
- Identify ideas that attract sustained interest.
- Help students discover potential collaborators.
- Create a useful archive of campus innovation and student initiatives.

## 2.3 Non-Goals for the Initial Release

The initial release will not include:

- Idea submission or editing.
- Upvoting or downvoting.
- Comments or discussions.
- AI-generated ideas.
- AI-based recommendations.
- Direct messaging.
- Notifications.
- Following users.
- Collaboration workspaces.
- Startup investment or funding.
- Payments or subscriptions.
- Native Android or iOS applications.
- Advanced analytics dashboards.
- Faculty-specific leaderboards.

These features may be considered in later releases after the foundation is stable and the product's value has been validated.

---

# 3. Target Users

## 3.1 Primary User: The Student with an Idea

A student who frequently thinks of possible solutions to everyday problems but has no consistent way to document or share them.

**Needs:**
- An easy way to publish ideas.
- A place where other students can discover them.
- Feedback from people outside their immediate circle.

## 3.2 Secondary User: The Curious Student

A student interested in exploring ideas, discovering projects, or finding inspiration.

**Needs:**
- A feed of interesting ideas.
- A way to express support or disagreement.
- An easy way to discover ideas beyond their department.

## 3.3 Future User: The Potential Collaborator

A student looking for people with interesting ideas or shared interests.

**Needs:**
- Enough information to understand an idea.
- A way to identify its creator.
- Eventually, a way to express interest in contributing.

## 3.4 Initial Audience Scope

The initial target audience is the University of Lagos student community.

The application should not assume that every user studies Computer Science, wants to build a startup, or understands technical terminology.

The product should accommodate ideas from different academic disciplines and interests.

---

# 4. Product Scope and Release Strategy

The product will be developed incrementally.

## Phase 1: Foundation and Authentication

**Immediate development priority.**

Deliver:
- Public landing page.
- Sign-up page.
- Login page.
- Authentication integration.
- Protected welcome/feed page.
- Persistent authentication sessions.
- Logout functionality.
- Basic responsive design.
- Loading, validation, and error states.

The authenticated feed will initially display a welcome message and the logged-in user's username. It will not display ideas because idea submission and discovery are outside this phase.

## Phase 2: Idea Submission

Deliver:
- Create an idea.
- View the idea submission form.
- Validate and store idea details.
- View an idea's details.
- Display the creator's identity.
- View ideas submitted by the current user.
- Edit or delete one's own ideas, subject to the product's rules.

## Phase 3: Community Feed and Voting

Deliver:
- Browse all published ideas.
- Upvote and downvote ideas.
- Display vote totals.
- Change or remove a vote.
- Sort by newest and popularity.
- Paginate or incrementally load the feed.
- Prevent duplicate votes from the same user.

## Phase 4: Community and Discovery

Potential additions:
- Comments.
- Search.
- Categories and tags.
- Faculty or interest filters.
- User profiles.
- Basic reporting and moderation.
- Trending and popular ideas.

## Phase 5: Collaboration and Growth

Potential additions after validation:
- Expressions of interest in an idea.
- Finding collaborators.
- Idea status tracking.
- Notifications.
- Sharing ideas through public links.
- Analytics on platform activity.
- Optional AI-assisted idea refinement.

Each phase should be evaluated before expanding the scope. The product does not need all these features to become a useful portfolio project.

---

# 5. Functional Requirements: Phase 1

## 5.1 Public Landing Page

**Route:** `/`

### Purpose

Explain the product to visitors and direct them toward account creation or login.

### Required elements

1. **Navigation bar**
   - Product name or logo.
   - Login link.
   - Sign-up button.

2. **Hero section**
   - A clear headline describing the platform.
   - A short explanation of its purpose.
   - A primary call to action: Create an account.
   - A secondary action: Log in.

3. **How it works**
   - Share an idea.
   - Discover other students' ideas.
   - Vote and help ideas gain visibility.

   These describe the intended product experience; the latter features will be labelled as upcoming or presented as the platform's direction until implemented.

4. **Value proposition**
   - Ideas from across the UNILAG community.
   - A simple place to document thoughts.
   - An opportunity to discover what other students are thinking about.

5. **Footer**
   - Product name.
   - Copyright notice.
   - Links to privacy information and terms when those pages are available.

### Behaviour

- Clicking **Create an account** navigates to `/signup`.
- Clicking **Log in** navigates to `/login`.
- Authenticated users who visit the landing page may be redirected to `/feed`.
- The landing page must work without authentication.
- No idea feed or voting controls are required on this page.

### Acceptance criteria

- The page loads without requiring an account.
- All navigation links work.
- The primary call to action opens the sign-up page.
- The layout adapts to mobile, tablet, and desktop screens.
- The page accurately represents the current product and does not claim that unimplemented features are already functional.

## 5.2 Sign-Up Page

**Route:** `/signup`

### Purpose

Allow a new student to create an account.

### Required fields

- Username.
- Email address.
- Password.
- Password confirmation, if supported by the selected authentication flow.

### Recommended behaviour

1. The student enters the required details.
2. The frontend performs basic input validation.
3. The backend or authentication provider validates the credentials.
4. The application creates the account.
5. If email verification is required, the student is instructed to verify their email.
6. After successful authentication, the student is directed to `/feed`.

### Validation requirements

- Username is required and follows a defined length and character policy.
- Username uniqueness is enforced.
- Email address is valid.
- Email uniqueness is enforced by the authentication provider.
- Password meets the provider's password requirements.
- Password confirmation matches the password, if included.
- Invalid input produces clear, field-specific error messages.
- The submit button indicates when a request is in progress.
- Repeated submissions must not accidentally create duplicate application records.

### Additional requirements

- Provide a link to the login page for existing users.
- Do not expose passwords in logs or error messages.
- Do not store plaintext passwords in the application database.
- Do not treat successful form submission alone as proof of authentication.
- Handle failed registration attempts without losing all form input unnecessarily.

### Acceptance criteria

- A user can register with valid credentials.
- Duplicate usernames are rejected.
- Invalid data produces understandable feedback.
- Successful registration follows the configured email-verification and session flow.
- A successfully authenticated user reaches the protected feed.

## 5.3 Login Page

**Route:** `/login`

### Purpose

Allow an existing user to authenticate and access the application.

### Required fields

- Email address.
- Password.

### Required behaviour

1. The user enters their credentials.
2. The application sends the authentication request through the configured authentication flow.
3. Invalid credentials produce a generic, useful error message.
4. Successful authentication establishes a valid session.
5. The user is redirected to `/feed`.

### Additional requirements

- Include a link to `/signup`.
- Prevent accidental repeated submissions while a request is processing.
- Show loading and error states.
- Do not reveal whether a particular email address has an account when doing so would enable account enumeration.
- Keep authenticated routes protected even if the user manually enters their URL.
- Support the configured session refresh and expiry behaviour.

### Acceptance criteria

- Valid credentials establish an authenticated session.
- Invalid credentials do not grant access.
- The user reaches `/feed` after successful authentication.
- Refreshing the browser does not immediately log out a user whose session remains valid.
- Expired or invalid sessions are handled safely.

## 5.4 Authentication and Session Management

Authentication is a core system capability, not merely a collection of forms.

### Requirements

- Use a trusted authentication provider.
- Associate each authenticated user with a stable, unique user identifier.
- Keep application-specific profile information separate from authentication credentials.
- Ensure the frontend can determine whether a valid session exists.
- Protect the feed from unauthenticated access.
- Restore a valid session after a browser refresh.
- Handle logout and session expiry.
- Avoid exposing service-role credentials or other privileged secrets to the frontend.
- Enforce authorization on the server for any protected backend operation.

### Recommended initial account model

The authentication provider should manage:
- User ID.
- Email.
- Password credential management.
- Email verification.
- Session lifecycle.

The application's own profile record should manage:
- User ID linked to the authentication provider.
- Username.
- Creation timestamp.
- Optional faculty or department fields in a later release.

The user ID is the primary link between authentication and application data. Usernames are display identifiers and should not be used as the sole basis for authorization.

### UNILAG verification

For the initial release, decide whether registration requires a UNILAG email address or whether students can register with any email address.

A UNILAG-only email restriction is not equivalent to verifying that someone is currently a student. If access must genuinely be limited to students, the product will need a defined verification policy.

Do not make campus verification a blocker for the first prototype unless it is a deliberate requirement.

## 5.5 Authenticated Welcome Feed

**Route:** `/feed`

### Purpose

Provide the first authenticated destination after login or registration.

### Required content

- A welcome heading.
- The authenticated user's username.
- A logout button.

Example:

> Welcome, umar!

This is a placeholder authenticated feed, not the final idea-discovery interface.

### Behaviour

- The page requires a valid authenticated session.
- The username is loaded from the authenticated user's profile.
- If the profile is not yet available, the page displays an appropriate loading state.
- If the session is invalid or missing, the user is redirected to `/login`.
- Clicking logout ends the user's session and returns them to `/login` or `/`.
- Refreshing the page preserves the authenticated state when the session is still valid.

### Acceptance criteria

- An authenticated user sees their own username.
- One user's username is never displayed as another user's identity.
- Unauthenticated visitors cannot access protected feed data.
- Logout invalidates or clears the applicable session.
- Loading and error states are handled cleanly.
- No idea submission, voting, or commenting functionality is required.

---

# 6. Future Functional Requirements

The following requirements define the intended product beyond Phase 1. They should guide architectural decisions but must not expand the immediate implementation scope.

## 6.1 Idea Creation

Students will eventually be able to submit an idea with:

- Title.
- Description.
- Optional category.
- Optional tags.
- Creator identity.
- Creation timestamp.
- Last updated timestamp.
- Publication status.

### Content guidance

The submission form should encourage students to explain:
- What problem or opportunity they have noticed.
- What their proposed idea is.
- Who might benefit from it.

These prompts should be optional guidance rather than a barrier to posting. Students should not need to write a business plan to share an idea.

### Rules

- A title is required.
- A description is required.
- Input length limits are enforced.
- Text is safely rendered to prevent cross-site scripting.
- Users can edit or delete their own ideas according to the platform's rules.
- Server-side authorization must prevent users from editing other people's ideas.
- Empty or malformed submissions are rejected.

## 6.2 Idea Feed

The feed will display published ideas from the student community.

Each idea card should eventually contain:
- Idea title.
- Short description or excerpt.
- Author username.
- Creation date.
- Category or tags, if available.
- Upvote and downvote controls.
- Vote totals.
- Link to the full idea.

### Initial sorting options

- Newest.
- Most upvoted.
- Most discussed, once comments exist.

Popularity sorting should be based on an explicitly defined ranking rule, not an unexplained mixture of metrics.

The feed should support pagination or incremental loading as the number of ideas grows.

## 6.3 Voting

Students should be able to express whether they support or oppose an idea.

### Voting rules

- Only authenticated users can vote.
- A user can have at most one active vote per idea.
- A vote is either upvote, downvote, or no vote.
- A user can change an existing vote.
- Repeating the same vote may remove it, if that interaction is chosen for the final design.
- The UI must reflect the user's current vote.
- Vote totals must remain consistent under concurrent requests.
- The backend must enforce voting rules; frontend button states are not sufficient.

### Important product consideration

Downvotes can discourage students from sharing early-stage ideas. Consider testing whether upvotes alone, or upvotes combined with a neutral feedback mechanism, better serve the community. The final choice should be based on product goals and student feedback.

## 6.4 Idea Details and Comments

A future idea detail page should display the complete idea, its creator, voting controls, and any comments.

Comments should:
- Require authentication to create.
- Display the author's username and timestamp.
- Have a defined edit/delete policy.
- Support reporting inappropriate content.
- Enforce input validation and reasonable length limits.

## 6.5 Search and Categories

As the platform grows, students should be able to find ideas using:
- Keywords in titles and descriptions.
- Categories.
- Tags.
- Newest or popularity sorting.

Categories might eventually include technology, business, campus life, education, sustainability, health, creative projects, and social impact.

Categories should be flexible enough to support ideas that do not fit neatly into one discipline.

## 6.6 User Profiles

A future public profile may display:
- Username.
- Optional biography.
- Optional faculty or department.
- Ideas published by the student.
- Basic participation statistics.

Avoid collecting personal information that is not necessary for the platform's purpose.

## 6.7 Moderation

The platform will eventually need ways to report:
- Harassment.
- Spam.
- Impersonation.
- Abusive or discriminatory content.
- Unlawful content.
- Content that exposes another person's private information.

A simple reporting mechanism and an administrative moderation process should be introduced before opening the full publishing system to a wider audience.

---

# 7. User Journeys

## 7.1 New User

1. Visits `/`.
2. Reads the landing page.
3. Clicks Create an account.
4. Arrives at `/signup`.
5. Enters username, email, and password.
6. Completes any required verification.
7. Establishes an authenticated session.
8. Arrives at `/feed`.
9. Sees a welcome message containing their username.

## 7.2 Returning User

1. Visits the landing page or `/login`.
2. Enters email and password.
3. Authenticates successfully.
4. Arrives at `/feed`.
5. Refreshes the browser and remains authenticated if the session is valid.

## 7.3 Unauthenticated Visitor Accessing the Feed

1. Enters `/feed` directly.
2. The application checks authentication.
3. No valid session is found.
4. The visitor is redirected to `/login`.
5. No protected user information is disclosed.

## 7.4 Logout

1. An authenticated user opens `/feed`.
2. Clicks Logout.
3. The session is ended or cleared through the appropriate authentication flow.
4. The user is redirected to `/login` or `/`.
5. Accessing `/feed` again requires authentication.

## 7.5 Future Idea Contributor

1. Logs in.
2. Opens the idea submission form.
3. Enters a title and description.
4. Submits the idea.
5. The backend validates and stores it.
6. The published idea appears in the feed.
7. Other users can view and vote on it.

---

# 8. Technical Architecture

## 8.1 Recommended Stack

The initial architecture should follow a clear separation between frontend, backend, authentication, and database responsibilities.

### Frontend
- React.
- TypeScript.
- Vite.
- A routing library such as React Router.
- A lightweight styling approach appropriate for the project.
- A consistent component system for forms, buttons, alerts, and page layouts.

### Backend
- Python.
- FastAPI.
- SQLAlchemy.
- Pydantic for request and response validation.

### Authentication
- Supabase Auth.

### Database
- PostgreSQL hosted by Supabase for production.
- A local PostgreSQL database for development if the same development workflow is retained.

### Deployment
- Vercel for the frontend.
- A suitable Python application host for the FastAPI backend.
- Supabase for authentication and the production database.

Deployment providers and pricing should be checked when deployment is implemented; do not assume every service remains free at every usage level.

## 8.2 Request Flow

The intended application flow is:

React frontend → FastAPI backend → PostgreSQL database.

Supabase Auth manages account credentials and authentication sessions.

For protected backend requests, the frontend supplies the appropriate access token. FastAPI verifies the token and uses the authenticated user's stable ID to authorize the operation.

The backend should be the only application layer accessing the database through SQLAlchemy. The frontend should not connect directly to PostgreSQL.

## 8.3 Important Authentication Design Decision

Supabase Auth and FastAPI serve different purposes.

- Supabase Auth handles credential management and identity sessions.
- FastAPI handles application-specific API operations and authorization.
- SQLAlchemy manages application database interactions.
- PostgreSQL stores application records.

Do not create a second, independent password system in FastAPI alongside Supabase Auth.

If the frontend uses Supabase Auth directly to sign up and sign in, the backend must still verify access tokens for protected API requests. A successful frontend login must never be treated as sufficient authorization by itself.

## 8.4 Suggested Phase 1 API Surface

The exact endpoints may change during implementation, but a minimal API surface could include:

- `GET /api/v1/health` — checks whether the API is available.
- `GET /api/v1/users/me` — returns the authenticated user's application profile.

Supabase Auth can handle the initial registration and login flows, so separate FastAPI login and registration endpoints are not mandatory.

The profile endpoint should:
- Require a valid access token.
- Derive the user ID from the verified token.
- Return only the profile belonging to that user.
- Return a suitable unauthorized response when authentication fails.
- Avoid accepting a client-supplied user ID as proof of identity.

A profile record should be created reliably after registration, using a server-side process or an appropriately secured database mechanism. The application must handle the case where the authentication account exists but the profile record has not yet been created.

## 8.5 Data Model

For Phase 1, keep the database minimal.

**User profile**

| Field | Purpose |
|---|---|
| `id` | Stable user ID linked to Supabase Auth |
| `username` | Public display name |
| `created_at` | Profile creation timestamp |

Username uniqueness must be enforced at the database level, not only in frontend validation.

A future version will add an ideas table and a votes table. Avoid building all future tables before the current authentication flow is working.

---

# 9. Security and Privacy Requirements

Security requirements apply from the first release.

## 9.1 Authentication Security

- Use the authentication provider's supported password and session handling.
- Never store plaintext passwords.
- Never expose privileged Supabase service-role keys in frontend code.
- Verify access tokens on protected backend endpoints.
- Do not trust a user ID supplied by the browser without verifying it against the authenticated identity.
- Configure session expiry and refresh behaviour correctly.
- Apply sensible rate limits to authentication-sensitive operations where supported.

## 9.2 Data Protection

- Collect only information needed for the platform.
- Do not make email addresses publicly visible by default.
- Avoid exposing authentication tokens in logs.
- Use HTTPS in production.
- Keep secrets in environment variables or the hosting provider's secret manager.
- Restrict database permissions to the minimum required.
- Define how users can request account deletion before the platform grows substantially.

## 9.3 Input Security

- Validate input on the backend.
- Apply length limits.
- Safely render user-generated text.
- Use parameterized database queries through the ORM.
- Handle errors without revealing stack traces or secrets to users.

## 9.4 Idea Ownership and Privacy

Because users will eventually publish their own ideas, the product should make it clear that posting an idea makes its contents visible according to the platform's publication rules.

Before launching idea submission, define:
- Whether ideas are public to all visitors or only logged-in users.
- What happens when an idea is deleted.
- Whether deleted content remains in backups for a limited period.
- How users can report plagiarism or misuse.
- How moderation decisions are handled.

The platform should not promise that posting an idea guarantees legal protection, exclusivity, or confidentiality.

---

# 10. User Interface and Experience Requirements

## 10.1 General Design Direction

The interface should feel like a lightweight student community, not an enterprise dashboard.

Design priorities:
- Clear typography.
- Straightforward navigation.
- Generous spacing.
- A strong visual hierarchy.
- Responsive layouts.
- Accessible form controls.
- Consistent buttons, inputs, and error messages.

Avoid adding visual complexity that does not improve the user journey.

## 10.2 Landing Page

The landing page should communicate three things quickly:

1. What the platform is.
2. Why a UNILAG student might use it.
3. How to join.

The call to action should be prominent without overwhelming the page.

Do not build a large marketing site before validating the core experience.

## 10.3 Authentication Pages

The sign-up and login pages should share a consistent visual system.

Each page should have:
- Clearly labelled fields.
- Visible validation messages.
- An understandable submit button.
- A loading state.
- A link to the alternative authentication page.
- An appropriate error state.

Avoid unnecessary fields or long registration questionnaires.

## 10.4 Welcome Feed

For Phase 1, the feed can be intentionally minimal:

- Welcome message.
- Username.
- Logout action.

The layout should leave room for future idea cards and feed controls without requiring the entire interface to be redesigned.

## 10.5 Accessibility

- Form inputs must have visible labels.
- Interactive elements must be keyboard accessible.
- Text and controls must have sufficient contrast.
- Errors should be communicated in text, not colour alone.
- Buttons should have clear names.
- The layout must remain usable on small screens.

---

# 11. Non-Functional Requirements

## Performance

- Keep the landing page lightweight.
- Avoid loading large libraries that are not needed.
- Provide loading indicators for network-dependent actions.
- Add pagination when the idea feed is implemented.
- Avoid unnecessary API calls when checking session state.

## Reliability

- Handle failed authentication requests gracefully.
- Do not show a successful login state before authentication succeeds.
- Handle temporary API or database outages.
- Prevent duplicate application records where uniqueness is required.
- Provide a health endpoint for basic backend monitoring.

## Maintainability

- Keep frontend, backend, authentication, and database responsibilities distinct.
- Use typed request and response models.
- Centralize API error handling where practical.
- Keep secrets out of source control.
- Document environment variables and setup requirements.
- Maintain a clear separation between development and production configuration.

## Scalability

The first version does not need complex distributed infrastructure.

A conventional frontend, backend API, and PostgreSQL database are sufficient for the intended initial scope. Optimize further only when actual usage demonstrates a need.

## Compatibility

Support current versions of major desktop and mobile browsers. Test the interface on common mobile screen sizes, especially because students may primarily access the platform through their phones.

---

# 12. Success Metrics

The first release should be evaluated on whether the core flow works, not on whether the platform already has a large community.

## Phase 1 technical metrics

- Successful account registration.
- Successful login.
- Correct username display.
- Successful logout.
- Correct protected-route behaviour.
- Session persistence across refreshes.
- No cross-user profile data exposure.
- No unresolved critical authentication bugs.

## Initial adoption metrics

Once the site is available to students, measure:
- Number of registered users.
- Number of users who complete registration.
- Percentage of registered users who successfully reach the feed.
- Number of users who return.
- Qualitative feedback on whether the concept is useful.

## Later product metrics

When idea publishing and voting are implemented:
- Number of ideas published.
- Percentage of registered users who publish at least one idea.
- Votes per published idea.
- Number of returning contributors.
- Number of meaningful comments or expressions of interest.
- Time between account creation and first idea submission.

Do not treat total votes alone as proof that the platform creates value. A smaller number of useful interactions may matter more than a large number of low-effort votes.

---

# 13. Testing Strategy

## 13.1 Landing Page Tests

- Landing page loads without authentication.
- Navigation links work.
- Call-to-action buttons navigate to the correct pages.
- Responsive layouts work across screen sizes.

## 13.2 Registration Tests

- Valid registration succeeds.
- Invalid email is rejected.
- Weak or invalid passwords are handled appropriately.
- Duplicate usernames are rejected.
- Duplicate email behaviour is handled correctly.
- Email verification works if enabled.
- Network failures produce useful errors.

## 13.3 Login Tests

- Valid credentials succeed.
- Invalid credentials fail safely.
- Loading states work.
- Successful login redirects correctly.
- Repeated submissions do not cause inconsistent states.

## 13.4 Authorization Tests

- An unauthenticated user cannot access the protected feed.
- A valid session can access the feed.
- Invalid or expired tokens are rejected by the backend.
- The profile endpoint returns the authenticated user's own profile.
- A user cannot retrieve another user's private profile by changing a request parameter.

## 13.5 Session Tests

- Refreshing a valid session works.
- Logout clears the applicable session.
- Returning to a protected route after logout requires authentication.
- Expired sessions are handled predictably.

## 13.6 Future Voting Tests

- A user cannot cast multiple active votes on the same idea.
- Changing a vote updates totals correctly.
- Concurrent voting does not corrupt counts.
- A user cannot modify another user's vote.

---

# 14. Risks and Mitigations

## Risk 1: Low Student Adoption

Students may like the concept but fail to return after registering.

**Mitigation:** Validate the idea with a small group of students, observe whether they publish and revisit ideas, and prioritize features that create repeat usage.

## Risk 2: Empty Feed

A new platform has little value if there are no ideas to discover.

**Mitigation:** Before launching the full feed, invite a small group of students to contribute initial ideas with their consent. Do not fabricate student activity or misrepresent sample content as real submissions.

## Risk 3: Low-Quality or Duplicate Ideas

Repeated ideas and vague submissions may reduce the quality of discovery.

**Mitigation:** Add optional categories, basic validation, search, and duplicate-awareness features only when they become useful. Do not make the submission process unnecessarily difficult.

## Risk 4: Voting Discourages Participation

Students may hesitate to publish ideas if they expect public rejection.

**Mitigation:** Evaluate whether downvotes are necessary, provide constructive feedback mechanisms, and avoid presenting low vote counts as a judgement of the creator.

## Risk 5: Spam and Abuse

Public publishing can attract spam or inappropriate content.

**Mitigation:** Introduce reporting, moderation, rate limiting, and clear community rules before opening the platform broadly.

## Risk 6: Authentication Complexity

Incorrect handling of sessions, tokens, or profile creation can produce security issues.

**Mitigation:** Use Supabase Auth for credentials, verify tokens in FastAPI, enforce database constraints, and test authorization independently of the frontend.

## Risk 7: Scope Creep

Adding comments, AI features, notifications, profiles, and dashboards too early can delay the first working release.

**Mitigation:** Keep the first milestone limited to the landing page, registration, login, session handling, and welcome feed.

## Risk 8: Unclear Differentiation

The platform could become another idea board without giving students a reason to use it.

**Mitigation:** Focus on the UNILAG context, easy contribution, cross-disciplinary discovery, and opportunities for student collaboration. Validate these advantages through actual student feedback rather than assuming they will be enough.

---

# 15. Immediate Development Plan

The first development milestone is complete when a new user can register, reach the welcome feed, log out, and later log back in.

## Step 1: Establish the application foundation

- Create the React + TypeScript frontend.
- Create the FastAPI backend.
- Configure the environment variables.
- Connect Supabase Auth.
- Connect the backend to the PostgreSQL database.
- Establish a working local development environment.

## Step 2: Build the landing page

- Add product name and branding.
- Create the navigation bar.
- Add the hero section and calls to action.
- Add a concise explanation of the platform.
- Implement responsive layouts.
- Connect buttons to the authentication routes.

## Step 3: Implement registration

- Create the sign-up form.
- Connect it to Supabase Auth.
- Validate the username and other required fields.
- Establish a reliable profile-creation flow.
- Handle verification and error states.

## Step 4: Implement login

- Create the login form.
- Authenticate through Supabase Auth.
- Handle loading and error states.
- Redirect authenticated users to `/feed`.

## Step 5: Implement the welcome feed

- Protect the route.
- Retrieve the current user's profile.
- Display the welcome message and username.
- Add logout.
- Handle loading, missing profile, and expired-session states.

## Step 6: Test the complete flow

Test the experience from the perspective of:
- A first-time visitor.
- A newly registered user.
- A returning user.
- An unauthenticated visitor opening `/feed`.
- A user who logs out and attempts to return to the feed.

## Step 7: Deploy the first version

- Deploy the frontend and backend.
- Configure production environment variables.
- Configure allowed frontend origins in the backend.
- Verify the production authentication redirect URLs.
- Test registration, login, session persistence, and logout on the deployed site.
- Confirm that no privileged credentials are exposed in the frontend bundle.

---

# 16. Definition of Done for Phase 1

Phase 1 is complete when all of the following are true:

- [ ] The landing page is publicly accessible.
- [ ] Visitors can navigate to registration and login.
- [ ] New users can create accounts.
- [ ] Existing users can log in.
- [ ] Authentication state is handled correctly.
- [ ] Authenticated users reach `/feed`.
- [ ] The welcome page displays the correct username.
- [ ] Unauthenticated visitors cannot access protected feed data.
- [ ] Logout works.
- [ ] Valid sessions survive browser refreshes.
- [ ] Validation, loading, and error states are implemented.
- [ ] The website works on mobile and desktop.
- [ ] The application is deployed and tested in production.
- [ ] No critical authentication or authorization bugs remain.

Idea creation, voting, comments, search, and collaboration are explicitly excluded from this definition of done.

---

# 17. Future Product Decisions

These questions should be resolved before the relevant features are implemented, not all before Phase 1 begins.

1. **Access:** Must users register with a UNILAG email address, or can anyone create an account?
2. **Visibility:** Can the public browse ideas without logging in?
3. **Voting:** Should the platform have both upvotes and downvotes, or only upvotes?
4. **Idea ownership:** What editing and deletion rights should creators have?
5. **Moderation:** Who handles reports and removes inappropriate content?
6. **Attribution:** Should student ideas display only usernames, or also optional faculty and department information?
7. **Collaboration:** Is the main objective to share ideas, or should the platform eventually help students find collaborators?
8. **Positioning:** Is this primarily an idea-sharing community, a campus innovation platform, or a place to discover potential projects?

These decisions will shape the later product, but they should not delay the first authentication milestone unless they directly affect its implementation.

---

# 18. Final Product Direction

The initial release should remain deliberately small: a landing page, sign-up page, login page, and authenticated welcome feed.

The broader product is a student-generated idea platform that borrows the simplicity of IdeasAI's discovery and voting model while serving a specific university community.

The immediate technical objective is to establish secure authentication, reliable profile management, and a working deployment. Once that foundation is stable, idea submission and the community feed can be developed as the next meaningful product milestone.

**The most important delivery principle is to build a complete, working slice before expanding the feature set.** A deployed authentication flow that works correctly is a better foundation for the project than a large collection of unfinished screens.