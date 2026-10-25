# UNILAG IDEAS — DEVELOPMENT ROADMAP & TASK BOARD

**Project:** UNILAG Ideas  
**Roadmap version:** 1.0  
**Current scope:** Landing page → deployment → authentication → welcome feed  
**Ticket convention:** C = Goal / Milestone, T = Task

---

# C1 — Project Foundation

**Objective:** Establish the codebase and development environment so frontend and backend development can proceed without unnecessary setup issues.

**Completion condition:** The frontend and backend run locally, configuration is documented, and the application can communicate with the backend.

### T1 — Initialize the frontend

**Tasks**
- Create a React + TypeScript + Vite application.
- Configure the development server.
- Establish basic routing.
- Add the styling approach and shared UI conventions.
- Verify that the application runs locally.

**Acceptance criteria**
- The frontend starts without errors.
- A basic page renders successfully.
- TypeScript compilation works.
- The project can be built for production.

### T2 — Initialize the backend

**Tasks**
- Create the FastAPI application.
- Configure the Python environment and dependencies.
- Add a health-check endpoint.
- Configure development settings.
- Add basic error handling.

**Acceptance criteria**
- The backend starts locally.
- The health endpoint returns a successful response.
- Invalid requests receive appropriate responses.

### T3 — Configure environment variables

**Tasks**
- Create frontend and backend environment templates.
- Configure the API base URL.
- Prepare Supabase project configuration.
- Ensure secrets are excluded from Git.
- Document the required environment variables.

**Acceptance criteria**
- A new developer can understand how to configure the application.
- No secret credentials are committed to the repository.
- Frontend and backend configuration are separated appropriately.

### T4 — Establish the initial application structure

**Tasks**
- Separate frontend pages, reusable components, and API utilities.
- Separate backend routes, configuration, and application logic.
- Add a README with local setup instructions.
- Confirm the frontend can reach the backend.

**Acceptance criteria**
- The project has a clear, understandable structure.
- Both applications run independently.
- The frontend can successfully call the backend health endpoint.

**Dependencies:** None.

---

# C2 — Landing Page

**Objective:** Build a polished public-facing page that explains UNILAG Ideas and encourages students to register.

**Completion condition:** A visitor can understand the product and navigate to the sign-up or login page.

### T5 — Build the landing page layout

**Tasks**
- Create the navigation bar.
- Add the hero section.
- Write the product headline and supporting description.
- Add primary and secondary calls to action.
- Add a concise “How it works” section.
- Add a footer.

**Acceptance criteria**
- The page communicates the platform's purpose clearly.
- Sign-up and login actions are visible.
- The content accurately reflects the current product.
- No unimplemented features are presented as already functional.

### T6 — Make the landing page responsive

**Tasks**
- Implement mobile, tablet, and desktop layouts.
- Ensure navigation works at small screen sizes.
- Check text wrapping and spacing.
- Verify buttons and links are easy to use on mobile.
- Test keyboard navigation and colour contrast.

**Acceptance criteria**
- No significant horizontal overflow occurs on supported screen sizes.
- All primary actions remain accessible on mobile.
- The layout remains readable and usable across screen sizes.

### T7 — Connect landing page navigation

**Tasks**
- Connect Create an Account to `/signup`.
- Connect Log In to `/login`.
- Add the appropriate route placeholders if the pages are not yet implemented.
- Verify that navigation behaves consistently.

**Acceptance criteria**
- Both actions navigate to the intended routes.
- No primary navigation link is broken.

**Dependencies:** C1.

---

# C3 — First Deployment

**Objective:** Put the public landing page online before implementing the full authentication flow.

**Completion condition:** The deployed website is publicly accessible and its main navigation works.

### T8 — Deploy the frontend

**Tasks**
- Create the frontend deployment.
- Configure the production build.
- Set the production environment variables.
- Configure the production domain or deployment URL.
- Verify the published page.

**Acceptance criteria**
- The production URL loads successfully.
- The landing page renders correctly.
- No development-only configuration is required to view it.

### T9 — Verify the deployed landing page

**Tasks**
- Test the page on desktop and mobile.
- Check navigation and internal routes.
- Review browser console errors.
- Verify asset loading.
- Fix any production-only issues.

**Acceptance criteria**
- The deployed landing page is usable.
- No critical rendering or navigation issues remain.
- The live page matches the intended design.

**Dependencies:** C2.

---

# C4 — Authentication Infrastructure

**Objective:** Configure authentication and establish the connection between authenticated identities and application profiles.

**Completion condition:** The application can identify a signed-in user and securely retrieve their profile.

### T10 — Configure Supabase Auth

**Tasks**
- Create or configure the Supabase project.
- Enable the intended authentication method.
- Configure email verification behaviour.
- Set production and development redirect URLs.
- Configure the frontend authentication client.
- Confirm the required public configuration is available to the frontend.

**Acceptance criteria**
- The application can communicate with Supabase Auth.
- Authentication configuration works locally.
- Redirect URLs match the intended environments.
- Privileged credentials are not exposed to the frontend.

### T11 — Create the user profile model

**Tasks**
- Define the user profile schema.
- Link the profile to the Supabase Auth user ID.
- Add the username field.
- Add the creation timestamp.
- Enforce username uniqueness.
- Define a reliable profile-creation process.

**Acceptance criteria**
- Every successfully onboarded user can have a corresponding profile.
- Usernames cannot be duplicated.
- Authentication identity and application profile are linked through a stable user ID.
- The application handles profile-creation failures safely.

### T12 — Implement protected profile retrieval

**Tasks**
- Configure FastAPI to verify Supabase access tokens.
- Implement `GET /api/v1/users/me`.
- Derive the user ID from the verified token.
- Retrieve the corresponding profile.
- Return appropriate responses for unauthorized requests and missing profiles.

**Acceptance criteria**
- A valid token retrieves the authenticated user's profile.
- Missing or invalid tokens are rejected.
- The endpoint does not trust a client-supplied user ID.
- Users cannot retrieve another user's profile by manipulating request parameters.

**Dependencies:** C1.

---

# C5 — Registration and Login

**Objective:** Allow new users to create accounts and existing users to authenticate.

**Completion condition:** A student can register, log in, and establish a valid authenticated session.

### T13 — Build the sign-up page

**Tasks**
- Create the `/signup` route.
- Add username, email, and password fields.
- Add password confirmation if needed.
- Add input validation.
- Add a submit button and loading state.
- Add validation and authentication error messages.
- Add a link to the login page.

**Acceptance criteria**
- All required fields are validated.
- Errors are clearly communicated.
- Duplicate usernames are handled.
- The form cannot be submitted repeatedly while a request is processing.

### T14 — Implement account registration

**Tasks**
- Connect the sign-up form to Supabase Auth.
- Create the authentication account.
- Create or initialize the application profile.
- Handle email verification if enabled.
- Handle duplicate accounts and failed requests.
- Define what happens when authentication succeeds but profile creation fails.

**Acceptance criteria**
- Valid registration creates an account.
- The username is stored in the application profile.
- Failed registration displays useful feedback.
- Successful registration follows the configured verification and session flow.

### T15 — Build the login page

**Tasks**
- Create the `/login` route.
- Add email and password fields.
- Add form validation.
- Add loading and error states.
- Add a link to the sign-up page.

**Acceptance criteria**
- The login form is functional and responsive.
- Invalid input produces appropriate feedback.
- The page links correctly to registration.

### T16 — Implement login and session handling

**Tasks**
- Connect the login form to Supabase Auth.
- Establish the authenticated session.
- Handle invalid credentials.
- Restore valid sessions after browser refreshes.
- Handle session expiry and refresh.
- Redirect authenticated users to `/feed`.

**Acceptance criteria**
- Valid credentials authenticate successfully.
- Invalid credentials do not grant access.
- A valid session persists across refreshes.
- Successful authentication redirects to the correct destination.

**Dependencies:** C4 for profile integration; the login UI can be developed in parallel with the sign-up UI.

---

# C6 — Authenticated Welcome Feed

**Objective:** Give authenticated users their first personalized destination after login.

**Completion condition:** The feed displays the correct username, protects user data, and supports logout.

### T17 — Build the welcome feed UI

**Tasks**
- Create the `/feed` route.
- Add a welcome heading.
- Add the username display.
- Add a logout button.
- Create loading and error states.
- Keep the layout simple enough to accommodate a future idea feed.

**Acceptance criteria**
- The page displays the welcome message.
- The username has a clear place in the layout.
- The logout action is visible.
- The page is responsive.

### T18 — Connect the feed to the authenticated profile

**Tasks**
- Retrieve the current user's profile.
- Display the profile's username.
- Handle profile-loading states.
- Handle missing profiles.
- Handle failed API requests.
- Ensure profile information is not taken from arbitrary client input.

**Acceptance criteria**
- The correct username is displayed for the authenticated user.
- Loading and error states work.
- The page does not display another user's profile information.

### T19 — Protect routes and implement logout

**Tasks**
- Implement authentication-aware route protection.
- Redirect unauthenticated users from `/feed` to `/login`.
- Redirect authenticated users away from login and registration where appropriate.
- Implement logout through Supabase Auth.
- Clear or invalidate the applicable session.
- Verify that protected routes cannot be accessed after logout.

**Acceptance criteria**
- Unauthenticated visitors cannot access protected feed data.
- Authenticated users can access the feed.
- Logout ends the session.
- Returning to `/feed` after logout requires authentication.

**Dependencies:** C4 and C5.

---

# C7 — Integration Testing and Production Release

**Objective:** Verify that the complete authentication journey works reliably in the deployed application.

**Completion condition:** A new user can register, view their welcome feed, log out, and return later to log in again.

### T20 — Test the complete user journey

**Tasks**
- Test new-user registration.
- Test login with valid and invalid credentials.
- Test email verification if enabled.
- Test session persistence after refresh.
- Test direct access to `/feed`.
- Test logout and subsequent access attempts.
- Test profile retrieval and authorization.
- Fix any critical bugs.

**Acceptance criteria**
- All primary user journeys work.
- No critical authentication or authorization bugs remain.
- Error states are understandable.
- No user can access another user's private profile through the profile endpoint.

### T21 — Deploy the backend

**Tasks**
- Deploy FastAPI to a suitable Python host.
- Configure production environment variables.
- Configure database connectivity.
- Configure allowed frontend origins.
- Verify the health endpoint.
- Confirm production authentication-token verification works.

**Acceptance criteria**
- The backend is reachable from the deployed frontend.
- The health endpoint succeeds.
- Production secrets are configured outside source control.
- Protected API requests work correctly.

### T22 — Complete production integration

**Tasks**
- Configure the frontend to use the production API.
- Configure authentication redirect URLs.
- Test registration and login on the deployed site.
- Test profile retrieval and logout.
- Review deployment logs for errors.
- Update the README with deployment and setup instructions.

**Acceptance criteria**
- The entire authentication flow works in production.
- No local development URLs are accidentally used in production.
- The application is ready to demonstrate as a portfolio project.

**Dependencies:** C3, C4, C5, and C6.

---

# C8 — Future Feature: Idea Submission

**Status:** Not started; excluded from the first release.

**Objective:** Allow students to publish their own ideas.

### T23 — Design the idea data model
- Define idea title, description, creator, and timestamps.
- Add optional categories and tags.
- Define publication and deletion rules.

### T24 — Implement idea creation
- Build the idea submission form.
- Validate inputs.
- Add the create-idea API endpoint.
- Store the idea against the authenticated user.
- Enforce ownership and validation on the backend.

### T25 — Implement idea details and management
- Create the idea detail page.
- Display the creator and publication date.
- Allow creators to edit their own ideas.
- Allow creators to delete their own ideas under the defined rules.

**Completion condition:** Authenticated students can create and manage their own ideas.

---

# C9 — Future Feature: Community Feed and Voting

**Status:** Not started; excluded from the first release.

**Objective:** Make student ideas discoverable and allow the community to vote.

### T26 — Implement the ideas feed
- Retrieve published ideas.
- Build reusable idea cards.
- Add newest-first sorting.
- Add pagination or incremental loading.

### T27 — Implement voting
- Add upvote and downvote controls if both are retained.
- Create the votes data model.
- Enforce one active vote per user per idea.
- Support vote changes and removals.
- Keep vote totals consistent.

### T28 — Implement discovery
- Add keyword search.
- Add categories and filters.
- Add popularity sorting.
- Test discovery with a growing dataset.

**Completion condition:** Students can browse published ideas and vote according to the platform's rules.

---

# C10 — Future Feature: Community and Moderation

**Status:** Not started.

**Objective:** Support constructive participation and keep the platform usable as the community grows.

### T29 — Implement comments
- Create the comments data model.
- Add comment creation and display.
- Enforce author permissions.
- Support editing and deletion under defined rules.

### T30 — Implement reporting and moderation
- Add a report-content mechanism.
- Define moderation rules.
- Create an administrative review workflow.
- Handle spam and abusive content.

### T31 — Improve student discovery and collaboration
- Add user profiles.
- Add optional faculty or department information.
- Explore expressions of interest in ideas.
- Evaluate ways to help students find collaborators.

**Completion condition:** The platform supports basic discussion, reporting, and a defined moderation process.

---

# Suggested Lock-In Session Plan

Choose a goal based on what you want to finish, rather than trying to work on every feature at once.

| Session | Goal | Target outcome |
|---|---|---|
| 1 | C1 | Frontend and backend run locally |
| 2 | C2 | Landing page complete and responsive |
| 3 | C3 | Landing page deployed |
| 4 | C4 | Authentication and profile infrastructure configured |
| 5 | C5 | Registration and login work |
| 6 | C6 | Personalized welcome feed and logout work |
| 7 | C7 | Complete flow tested and deployed |
| Later | C8–C10 | Idea submission, voting, and community features |

These are planning units, not fixed time estimates. If a goal proves larger than one session, split it into smaller sessions without expanding its scope.

# Recommended Starting Point

**Start with C1, then C2.** Do not start idea submission or voting yet.

Your first meaningful checkpoint is C3: a deployed landing page that a UNILAG student can open and navigate. Your next major checkpoint is C6: a student can create an account, log in, and see their own username on the welcome feed.

Once C7 is complete, you will have a working, deployed foundation for the larger product.