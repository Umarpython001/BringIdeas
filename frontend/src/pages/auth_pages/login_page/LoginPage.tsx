import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router';
import '../auth.css';

// One identifier field: the visitor signs in with username OR email.
type Values = { identifier: string; password: string };
type Errors = Partial<Record<keyof Values, string>>;

// DOM ids the sheet renders, keyed by Values field — used to move focus
// to the first invalid field when a submit fails.
const FIELD_IDS: Record<keyof Values, string> = {
  identifier: 'identifier',
  password: 'password',
};

// Log in — same mural split as signup, shorter sheet. Backend wiring is
// the developer's job; the integration point is marked in handleSubmit.
function LoginPage() {
  const [values, setValues] = useState<Values>({ identifier: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const update =
    (field: keyof Values) =>
    (event: ChangeEvent<HTMLInputElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value }));

  function validate(): Errors {
    const next: Errors = {};
    // The identifier may be a username or an email — required only here;
    // resolving which one it is (and wrong-password errors) is backend work.
    if (!values.identifier.trim())
      next.identifier = 'Email or username is required.';
    if (!values.password) next.password = 'Password is required.';
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Put the visitor on the first field that needs attention.
      const firstKey = Object.keys(next)[0] as keyof Values;
      document.getElementById(`li-${FIELD_IDS[firstKey]}`)?.focus();
      return;
    }

    setSubmitting(true);
    // ── Wire your backend here ─────────────────────────────────
    // Integration point. Example shape (Supabase-ready):
    //
    //   const { error } = await signIn(values.identifier, values.password);
    //   // signIn resolves whether identifier is a username or an email,
    //   // then verifies the password against that account.
    //
    // On success navigate('/home'); on error show the message near
    // the CTA. Until then the form reports nothing outside itself.
    // ───────────────────────────────────────────────────────────
    setSubmitting(false); // remove once a real await lives above
  }

  const renderError = (field: keyof Values) =>
    errors[field] ? (
      <p className="au-err" id={`li-${field}-err`}>
        <span className="au-err-dot" aria-hidden="true" />
        {errors[field]}
      </p>
    ) : undefined;

  const state = (field: keyof Values) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `li-${field}-err` : undefined,
    className: errors[field] ? 'au-field au-bad' : 'au-field',
  });

  return (
    <div className="au-auth">
      <section className="au-mural" aria-label="BringIdeas">
        <h1 className="au-title">
          Sign
          <br />
          in<span className="au-dot">.</span>
        </h1>
        <hr className="au-rule" />
        <p className="au-sub">
          Back already? Good. Your name is still on the sheet — pick things up
          right where you left them.
        </p>
        <div className="au-chips" aria-hidden="true">
          <span className="au-chip">Ideas</span>
          <span className="au-chip">Votes</span>
          <span className="au-chip">Discovery</span>
        </div>
        <div className="au-blob au-blob-teal" aria-hidden="true" />
      </section>

      <div className="au-side">
        <form
          className="au-sheet"
          aria-label="Log in"
          noValidate
          aria-busy={submitting}
          onSubmit={handleSubmit}
        >
          <div className="au-group">
            <label className="au-label" htmlFor="li-identifier">
              Email or username
            </label>
            <input
              id="li-identifier"
              name="identifier"
              type="text"
              autoComplete="username"
              required
              value={values.identifier}
              onChange={update('identifier')}
              {...state('identifier')}
            />
            {renderError('identifier')}
          </div>

          <div className="au-group">
            <label className="au-label" htmlFor="li-password">
              Password
            </label>
            <input
              id="li-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={values.password}
              onChange={update('password')}
              {...state('password')}
            />
            {renderError('password')}
          </div>

          <button className="au-cta" disabled={submitting}>
            {submitting ? 'Checking the sheet…' : 'Sign in'}
          </button>
          <p className="au-alt">
            First time here? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
