import type { ReactNode } from 'react';
import { Link } from 'react-router';
import './container.css';

interface MainLayoutProps {
  children: ReactNode;
}

// Shared shell: paper nav slab wordmark + flat chips, main slot, poster footer.
// Shared by every route so the whole app sits in the poster-wall world.
// Pre-launch waitlist mode (Vite env: VITE_WAITLIST_MODE === 'on') replaces
// the auth chips with one "Join the list" chip and hides the login link.
const WAITLIST_MODE = import.meta.env.VITE_WAITLIST_MODE === 'on';

function Container({ children }: MainLayoutProps) {
  return (
    <div className="bi-shell">
      <nav className="bi-nav" aria-label="Main">
        <Link className="bi-mark" to="/">
          BringIdeas<span className="bi-mark-note">!</span>
        </Link>
        <div className="bi-actions">
          {WAITLIST_MODE ? (
            <Link className="bi-chip bi-chip-ink" to="/signup">
              Join the list
            </Link>
          ) : (
            <>
              <Link className="bi-chip bi-chip-line" to="/login">
                Sign in
              </Link>
              <Link className="bi-chip bi-chip-ink" to="/signup">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="bi-main">{children}</main>

      <footer className="bi-footer">
        <div>
          <span className="bi-mark bi-mark-sm">
            BringIdeas<span className="bi-mark-note">!</span>
          </span>
          <p className="bi-footer-line">A place for student ideas to find their people.</p>
        </div>
        <p className="bi-footer-copy">&copy; {new Date().getFullYear()} BringIdeas. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Container;
