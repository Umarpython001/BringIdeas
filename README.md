
# BringIdeas

**Bring an idea. Discover another. Find your people.**

BringIdeas is a student-focused idea-sharing platform initially built for the University of Lagos (UNILAG). It gives students a place to share their ideas, discover what others are thinking about, and vote on ideas they find interesting.

The goal is to make sharing ideas simple for everyone, regardless of their technical background. Whether it's an idea for a startup, a campus improvement, a social initiative, or a creative project, BringIdeas aims to help students put their thoughts out there and connect with people who might help bring them to life.

> **Project Status:** In development. The initial milestone focuses on the landing page, user authentication, and a personalized welcome page.

## The Problem

Students often have interesting ideas but lack a dedicated place to document and share them with a wider community. Ideas can get buried in group chats, remain in private notes, or never go beyond conversations with friends.

BringIdeas aims to provide a central space where students can publish ideas, discover ideas from others, and collectively identify the ones that interest them most.

## Features

### Initial Release
- Public landing page introducing the platform.
- User registration and login.
- Secure authentication and session management.
- Personalized welcome page displaying the logged-in user's username.
- Logout functionality.
- Responsive design for mobile and desktop.

### Planned Features
- **Idea Publishing:** Create, edit, and delete ideas.
- **Community Feed:** Browse ideas submitted by other students.
- **Voting:** Upvote or downvote ideas.
- **Discovery:** Search, filter, and sort ideas.
- **Comments:** Discuss ideas and provide feedback.
- **User Profiles:** View users and their published ideas.
- **Moderation:** Report inappropriate content and help maintain a healthy community.

*Planned features may not be available in the current version.*

## Technology Stack

The intended technology stack includes:

| Component | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Python, FastAPI |
| Authentication | Supabase Auth |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Frontend Deployment | Vercel |
| Backend Deployment | Python-compatible hosting provider |

## Development Roadmap

Development is organized into goals and individual tasks.

| Goal | Description |
|---|---|
| C1 | Project Foundation |
| C2 | Landing Page |
| C3 | First Deployment |
| C4 | Authentication Infrastructure |
| C5 | Registration and Login |
| C6 | Authenticated Welcome Feed |
| C7 | Integration Testing and Production Release |
| C8 | Idea Submission |
| C9 | Community Feed and Voting |
| C10 | Community and Moderation |

The immediate priority is **C1–C7**. Idea publishing, voting, and community features will follow after the authentication flow is working reliably.

## Getting Started

Local setup instructions will be added as the project structure is established.

The planned development environment will require:

- Node.js and npm for the frontend.
- Python for the FastAPI backend.
- A Supabase project for authentication and database services.
- Environment variables for local configuration.

### Environment Variables

Create local environment files based on the project's environment templates once they are available.

Never commit passwords, access tokens, or other secrets to version control. Supabase service-role keys must remain on the server and must never be exposed in frontend code.

## Product Principles

- **Accessible:** Anyone should be able to share an idea without technical knowledge.
- **Simple:** Keep the process of publishing and discovering ideas straightforward.
- **Inclusive:** Welcome ideas from different faculties, disciplines, and interests.
- **Community-driven:** Give students opportunities to discover and support ideas from their peers.
- **Secure:** Protect user accounts and personal information.
- **Incremental:** Build a reliable foundation before expanding the feature set.

## Security and Privacy

BringIdeas is intended to use Supabase Auth for authentication and FastAPI for protected application APIs.

Security considerations include:

- Never store plaintext passwords.
- Verify authentication tokens on protected backend endpoints.
- Enforce authorization on the server.
- Validate user input.
- Keep privileged credentials out of frontend code.
- Avoid exposing users' email addresses publicly by default.
- Establish clear content ownership and moderation rules before launching idea publishing.

## Contributing

Contribution guidelines will be added as the repository workflow develops.

For now, keep changes focused, document configuration changes, and never commit secrets.

## License

No license has been selected yet. Until a license is added, permissions for reuse and redistribution have not been specified.

---

**BringIdeas** — A place for student ideas to find their people.