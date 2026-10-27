import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router';
import { supabase } from '../../../lib/supabase';
import '../auth.css';

type Status = 'idle' | 'busy' | 'done' | 'error' | 'unwired';

// Waiting list — pre-launch mode (VITE_WAITLIST_MODE=on). One field, one
// promise: leave your email, be first on the wall. Capture is a Supabase
// `waitlist` table with an insert-only policy (setup: WAITLIST.md); the
// Supabase client is yours — this page only calls `.from('waitlist')`.
function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const donePanel = useRef<HTMLDivElement | null>(null);

  // The confirmation is the pay-off moment: announce it AND move focus to
  // it, so it lands for screen-reader and keyboard visitors alike.
  useEffect(() => {
    if (status === 'done') donePanel.current?.focus();
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value) {
      setStatus('error');
      setMessage('Email is required.');
      document.getElementById('wl-email')?.focus();
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setStatus('error');
      setMessage("That email doesn't look right.");
      document.getElementById('wl-email')?.focus();
      return;
    }

    // ── Capture point ──────────────────────────────────────────
    // One insert into your `waitlist` table. Setup lives in the
    // project-root WAITLIST.md (table + insert-only policy + keys).
    // ───────────────────────────────────────────────────────────
    if (!supabase) {
      // Infrastructure note, not a field error — the email can't be
      // wrong about its own form's wiring.
      setStatus('unwired');
      setMessage('Email capture is not wired into this build yet — add the Supabase keys to finish setup.');
      return;
    }

    setStatus('busy');
    const { error } = await supabase.from('waitlist').insert({ email: value });

    if (error) {
      if (error.code === '23505') {
        // Unique constraint: this email is already on the list.
        setStatus('done');
        setMessage("You're already on the list — we'll write when the wall opens.");
        return;
      }
      setStatus('error');
      setMessage("That didn't stick — one more try in a minute.");
      return;
    }

    setStatus('done');
    setMessage("You're on the list. We'll write the moment the wall opens.");
  }

  return (
    <div className="au-auth">
      <section className="au-mural" aria-label="BringIdeas">
        <h1 className="au-title">
          Wait
          <br />
          list<span className="au-dot">.</span>
        </h1>
        <hr className="au-rule" />
        <p className="au-sub">
          The wall opens soon. Leave your email and you're first on it — every
          idea hung, every vote counted, while the room is still small.
        </p>
        <div className="au-chips" aria-hidden="true">
          <span className="au-chip">Ideas</span>
          <span className="au-chip">Votes</span>
          <span className="au-chip">Discovery</span>
        </div>
        <div className="au-blob" aria-hidden="true" />
      </section>

      <div className="au-side">
        <form
          className="au-sheet"
          aria-label="Join the waiting list"
          noValidate
          aria-busy={status === 'busy'}
          onSubmit={handleSubmit}
        >
          {status === 'done' ? (
            <div className="au-done" role="status" tabIndex={-1} ref={donePanel}>
              <p className="au-done-title">You're on the list.</p>
              <p>{message}</p>
              <p className="au-alt">
                Just looking? <Link to="/">The wall's open to read</Link>
              </p>
            </div>
          ) : (
            <>
              <div className="au-group">
                <label className="au-label" htmlFor="wl-email">
                  Email
                </label>
                <input
                  id="wl-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={status === 'error' ? true : undefined}
                  aria-describedby="wl-status"
                  className={status === 'error' ? 'au-field au-bad' : 'au-field'}
                />
              </div>

              <button className="au-cta" disabled={status === 'busy'}>
                {status === 'busy' ? 'Putting your name up…' : 'Put me on the list'}
              </button>

              {/* Constant status lane: invalid and unwired states write into
                  this always-mounted element, so aria-describedby and the
                  live region both point at real content. The done state
                  replaces the whole form with its own role="status"
                  confirmation, which receives focus on entry. */}
              <p
                id="wl-status"
                aria-live="polite"
                className={
                  status === 'error' ? 'au-err' : status === 'unwired' ? 'au-note' : 'au-status'
                }
              >
                {(status === 'error' || status === 'unwired') && message !== '' && (
                  <>
                    {status === 'error' && <span className="au-err-dot" aria-hidden="true" />}
                    {message}
                  </>
                )}
              </p>

              <p className="au-alt">
                Already interested? <Link to="/">Look around the wall</Link>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default WaitlistPage;
