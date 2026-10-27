import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router';
import '../auth.css';

const OCCUPATIONS = [
  { value: 'student', label: 'Student' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
  { value: 'other', label: 'Other' },
] as const;

type Values = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirm: string;
  age: string;
  school: string;
  occupation: string;
  other: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const initialValues: Values = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirm: '',
  age: '',
  school: '',
  occupation: '',
  other: '',
};

// DOM ids the sheet renders, keyed by Values field — used to move focus
// to the first invalid field when a submit fails.
const FIELD_IDS: Record<keyof Values, string> = {
  firstName: 'first',
  lastName: 'last',
  username: 'username',
  email: 'email',
  password: 'password',
  confirm: 'confirm',
  age: 'age',
  school: 'school',
  occupation: 'occupation',
  other: 'other',
};

// Sign up — "The Mural Type": the marigold mural does the talking,
// the form stays an honest standard column. Backend wiring is the
// developer's job; the integration point is marked in handleSubmit.
function SignupPage() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const update =
    (field: keyof Values) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value }));

  function validate(): Errors {
    const next: Errors = {};
    if (!values.firstName.trim()) next.firstName = 'First name is required.';
    if (!values.lastName.trim()) next.lastName = 'Last name is required.';
    if (!values.username.trim()) next.username = 'Username is required.';
    if (!values.email.trim()) next.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      next.email = "That email doesn't look right.";
    if (!values.password) next.password = 'Password is required.';
    else if (values.password.length < 8)
      next.password = 'At least 8 characters, please.';
    if (!values.confirm) next.confirm = 'Confirm your password.';
    else if (values.confirm !== values.password)
      next.confirm = "Passwords don't match.";
    if (!values.age.trim()) next.age = 'Age is required.';
    else if (Number.isNaN(Number(values.age)))
      next.age = 'Age should be a number.';
    else if (Number(values.age) < 13 || Number(values.age) > 120)
      next.age = 'Age needs to be between 13 and 120.';
    if (!values.occupation) next.occupation = 'Pick what you do right now.';
    else if (values.occupation === 'other' && !values.other.trim())
      next.other = 'Tell us what you do — one line is fine.';
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Put the visitor on the first field that needs attention.
      const firstKey = Object.keys(next)[0] as keyof Values;
      document.getElementById(`su-${FIELD_IDS[firstKey]}`)?.focus();
      return;
    }

    setSubmitting(true);
    // ── Wire your backend here ─────────────────────────────────
    // This is the integration point. Example shape (Supabase-ready):
    //
    //   const { error } = await signUp({
    //     email: values.email,
    //     password: values.password,
    //     username: values.username, // uniqueness is your backend's check —
    //     // map "taken" errors back to this field's message
    //     firstName: values.firstName,
    //     lastName: values.lastName,
    //     age: Number(values.age),
    //     school: values.school || null,
    //     occupation: values.occupation === 'other' ? values.other : values.occupation,
    //   });
    //
    // On success navigate('/home'); on error map the message to a
    // field (or show it near the CTA). Until then the form simply
    // reports nothing outside itself.
    // ───────────────────────────────────────────────────────────
    setSubmitting(false); // remove once a real await lives above
  }

  const id = (field: string) => `su-${field}`;

  const renderError = (field: keyof Values) =>
    errors[field] ? (
      <p className="au-err" id={id(field) + '-err'}>
        <span className="au-err-dot" aria-hidden="true" />
        {errors[field]}
      </p>
    ) : undefined;

  const state = (field: keyof Values) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? id(field) + '-err' : undefined,
    className: errors[field] ? 'au-field au-bad' : 'au-field',
  });

  return (
    <div className="au-auth">
      <section className="au-mural" aria-label="BringIdeas">
        <h1 className="au-title">
          Sign
          <br />
          up<span className="au-dot">.</span>
        </h1>
        <hr className="au-rule" />
        <p className="au-sub">
          Take your name on the sheet. The wall keeps it — every idea you hang,
          every vote you cast.
        </p>
        <div className="au-chips" aria-hidden="true">
          <span className="au-chip">Education</span>
          <span className="au-chip">Campus life</span>
          <span className="au-chip">Tech</span>
        </div>
        <div className="au-blob" aria-hidden="true" />
      </section>

      <div className="au-side">
        <form
          className="au-sheet"
          aria-label="Sign up"
          noValidate
          aria-busy={submitting}
          onSubmit={handleSubmit}
        >
          <div className="au-row">
            <div className="au-group">
              <label className="au-label" htmlFor={id('first')}>
                First name
              </label>
              <input
                id={id('first')}
                name="firstName"
                autoComplete="given-name"
                required
                value={values.firstName}
                onChange={update('firstName')}
                {...state('firstName')}
              />
              {renderError('firstName')}
            </div>
            <div className="au-group">
              <label className="au-label" htmlFor={id('last')}>
                Last name
              </label>
              <input
                id={id('last')}
                name="lastName"
                autoComplete="family-name"
                required
                value={values.lastName}
                onChange={update('lastName')}
                {...state('lastName')}
              />
              {renderError('lastName')}
            </div>
          </div>

          <div className="au-row">
            <div className="au-group">
              <label className="au-label" htmlFor={id('username')}>
                Username <span className="au-opt">(must be unique)</span>
              </label>
              <input
                id={id('username')}
                name="username"
                autoComplete="username"
                required
                value={values.username}
                onChange={update('username')}
                {...state('username')}
              />
              {renderError('username')}
            </div>
            <div className="au-group">
              <label className="au-label" htmlFor={id('email')}>
                Email
              </label>
              <input
                id={id('email')}
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={update('email')}
                {...state('email')}
              />
              {renderError('email')}
            </div>
          </div>

          <div className="au-row">
            <div className="au-group">
              <label className="au-label" htmlFor={id('password')}>
                Password
              </label>
              <input
                id={id('password')}
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={values.password}
                onChange={update('password')}
                {...state('password')}
              />
              {renderError('password')}
            </div>
            <div className="au-group">
              <label className="au-label" htmlFor={id('confirm')}>
                Confirm password
              </label>
              <input
                id={id('confirm')}
                name="confirm"
                type="password"
                autoComplete="new-password"
                required
                value={values.confirm}
                onChange={update('confirm')}
                {...state('confirm')}
              />
              {renderError('confirm')}
            </div>
          </div>

          <div className="au-row">
            <div className="au-group au-narrow">
              <label className="au-label" htmlFor={id('age')}>
                Age
              </label>
              <input
                id={id('age')}
                name="age"
                type="number"
                min={13}
                max={120}
                inputMode="numeric"
                required
                value={values.age}
                onChange={update('age')}
                {...state('age')}
              />
              {renderError('age')}
            </div>
            <div className="au-group">
              <label className="au-label" htmlFor={id('school')}>
                School / university <span className="au-opt">(optional)</span>
              </label>
              <input
                id={id('school')}
                name="school"
                autoComplete="organization"
                value={values.school}
                onChange={update('school')}
                {...state('school')}
              />
            </div>
          </div>

          <div className="au-group">
            <label className="au-label" htmlFor={id('occupation')}>
              What do you do right now?
            </label>
            <select
              id={id('occupation')}
              name="occupation"
              required
              value={values.occupation}
              onChange={update('occupation')}
              {...state('occupation')}
            >
              <option value="" disabled>
                Select…
              </option>
              {OCCUPATIONS.map((job) => (
                <option key={job.value} value={job.value}>
                  {job.label}
                </option>
              ))}
            </select>
            {renderError('occupation')}
          </div>

          {values.occupation === 'other' && (
            <div className="au-group">
              <label className="au-label" htmlFor={id('other')}>
                Others — tell us
              </label>
              <input
                id={id('other')}
                name="other"
                placeholder="e.g. Podcaster, photographer, farmer…"
                value={values.other}
                onChange={update('other')}
                {...state('other')}
              />
              {renderError('other')}
            </div>
          )}

          <button className="au-cta" disabled={submitting}>
            {submitting ? 'Putting your name up…' : 'Put me on the wall'}
          </button>
          <p className="au-alt">
            Already on the wall? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
