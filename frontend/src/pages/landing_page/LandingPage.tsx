import type { CSSProperties, ReactElement } from 'react';
import { Link } from 'react-router';
import './landing.css';

// Authored flat contours in the poster-wall grammar (all decorative: aria-hidden)
function Blob() {
  return (
    <svg viewBox="0 0 96 96" className="p-shape" aria-hidden="true">
      <path
        d="M52 8c15 1 27 9 31 21 4 12-2 25-12 33-10 9-27 11-38 2-11-8-12-24-6-36C33 16 39 7 52 8Z"
        fill="#1c1c1c"
      />
    </svg>
  );
}

function Leaf() {
  return (
    <svg viewBox="0 0 96 96" className="p-shape" aria-hidden="true">
      <path
        d="M50 6C72 20 86 44 76 68c-10 22-38 26-56 12C32 64 27 42 35 26c6-12 9-16 15-20Z"
        fill="#1c1c1c"
      />
      <path
        d="M50 12C45 44 40 66 27 84"
        fill="none"
        stroke="#f3ead8"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Bloom() {
  return (
    <svg viewBox="0 0 96 96" className="p-shape" aria-hidden="true">
      <circle cx="48" cy="19" r="15" fill="#1c1c1c" />
      <circle cx="76" cy="48" r="15" fill="#1c1c1c" />
      <circle cx="49" cy="77" r="15" fill="#1c1c1c" />
      <circle cx="21" cy="48" r="15" fill="#1c1c1c" />
      <circle cx="48" cy="48" r="12" fill="#1c1c1c" />
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M6 1l5 8H1Z" fill="currentColor" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M6 11L1 3h10Z" fill="currentColor" />
    </svg>
  );
}

function IdeaSheet({
  fill,
  tilt,
  i,
  title,
  meta,
  up,
  down,
  shape,
  stamp = true,
  state,
}: {
  fill: 'pink' | 'teal' | 'marigold';
  tilt: number;
  i: number;
  title: string;
  meta: string;
  up: number;
  down: number;
  shape: () => ReactElement;
  stamp?: boolean;
  state?: string;
}) {
  const Shape = shape;
  return (
    <article className={`p-sheet p-${fill}`} style={{ '--tilt': `${tilt}deg`, '--i': i } as CSSProperties}>
      {stamp && <span className="p-stamp">Preview</span>}
      <h3 className="p-idea">{title}</h3>
      <p className="p-meta">{meta}</p>
      <Shape />
      <div className="p-votes" role="img" aria-label={`Preview state: ${up} up, ${down} down`}>
        <span className="p-pill p-pill-ink">
          <ArrowUp />
          {up}
        </span>
        <span className="p-pill p-pill-line">
          <ArrowDown />
          {down}
        </span>
      </div>
      {state && (
        <p className="p-state">
          <span className={`p-dot${state.startsWith('down') ? ' p-dot-ghost' : ''}`}></span>
          {state}
        </p>
      )}
    </article>
  );
}

export default function LandingPage() {
  // Pre-launch waitlist mode (VITE_WAITLIST_MODE=on): the primary actions
  // become "join the waiting list" copy while every honesty line stays.
  const WL = import.meta.env.VITE_WAITLIST_MODE === 'on';
  return (
    <div className="wall">
      {/* HERO — the first viewport: manifesto panel + paste cluster */}
      <section className="wall-hero" aria-label="What BringIdeas is">
        <div>
          <h1 className="wall-display">
            BRING AN IDEA.
            <br />
            LET PEOPLE <span className="fl-pink">JUDGE</span> IT.
            <br />
            <span className="fl-teal">DISCOVER</span> OTHER IDEAS.
          </h1>
          <p className="wall-lede">
            BringIdeas is where students post the ideas they carry around — the campus fix, the app,
            the society that should exist — and the community votes every one up or{' '}
            <b>
              <u>down</u>
            </b>
            . Better than group chats, louder than your notes app: the wall
            decides which ideas are worth building.{' '}
            {WL
              ? "Join the waiting list — you're first in when posting opens."
              : 'Sign up now — posting opens with the first release.'}
          </p>
          <div className="wall-sun" aria-hidden="true"></div>
        </div>

        <div className="wall-cluster">
          <div className="row">
            <IdeaSheet
              fill="pink"
              tilt={-1.6}
              i={0}
              title="24-hour study room in the library basement"
              meta="Amaka O. · posted Feb 12"
              up={61}
              down={9}
              shape={Blob}
              state="up — state swaps hue"
            />
            <IdeaSheet
              fill="teal"
              tilt={1.2}
              i={1}
              stamp={false}
              title="Food-truck market on Faculty Road, Fridays"
              meta="Tunde A. · posted Feb 10"
              up={124}
              down={17}
              shape={Leaf}
            />
          </div>
          <div className="second-row">
            <IdeaSheet
              fill="marigold"
              tilt={-0.8}
              i={2}
              stamp={false}
              title="One shared notes hub for every foundation course"
              meta="Ijeoma K. · posted Feb 8"
              up={88}
              down={41}
              shape={Bloom}
            />
          </div>
          <p className="wall-preview-note">Preview states — voting opens soon. Nothing here is live yet.</p>
        </div>
      </section>

      {/* REGISTER BAR — primary action */}
      <div className="wall-bar">
        <Link to="/signup" className="bi-slab-cta">
          {WL ? 'JOIN THE WAITING LIST' : 'REGISTER TO VOTE'}
        </Link>
        <p className="wall-note">
          {WL
            ? 'First on the wall gets heard first — leave your email'
            : 'Sign up early — hang your first idea when the wall opens'}
        </p>
      </div>

      {/* Divider squiggle */}
      <svg className="wall-div" viewBox="0 0 760 44" aria-hidden="true">
        <path
          d="M2 24C90 6 170 40 258 22 346 4 426 38 514 24 602 10 682 36 758 20"
          fill="none"
          stroke="#1c1c1c"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="740" cy="14" r="9" fill="#f7b32b" stroke="#1c1c1c" strokeWidth="3" />
      </svg>

      {/* HOW THE WALL WORKS — unequal step posters */}
      <section className="wall-how" aria-label="How the wall works">
        <h2 className="wall-hd">HOW THE WALL WORKS</h2>
        <div className="step step-post">
          <h3>POST IT.</h3>
          <p>
            Explain your idea in a few lines — the problem it fixes and who benefits. No pitch deck,
            no jargon; if you can say it to a friend, you can post it.
          </p>
          <Blob />
        </div>
        <div className="step step-judge">
          <h3>THE WALL JUDGES IT.</h3>
          <p>
            Every registered student votes. An upvote turns a poster warm; a downvote cools it.
            Counts are public, votes belong to people, and the tally is honest — one voice each.
          </p>
          <Leaf />
        </div>
        <div className="step step-rise">
          <h3>GOOD IDEAS RISE.</h3>
          <p>The feed ranks by judgement, so the ideas worth building surface first — across faculties.</p>
          <Bloom />
        </div>
      </section>

      {/* NOW / ARRIVING SOON — honest phase panel */}
      <section className="wall-phase" aria-label="Launch status">
        <div className="phase-now">
          <h2 className="wall-hd">WHAT'S ON THE WALL NOW</h2>
          <ul>
            <li>
              <b>{WL ? 'The waiting list.' : 'Early sign-up.'}</b>{' '}
              {WL
                ? "Leave your email — first in when posting opens."
                : 'Take a name on the sheet today — the flow is being finished.'}
            </li>
            <li>
              <b>This page.</b> The whole concept, exactly as it will ship.
            </li>
          </ul>
          <p className="phase-foot">
            Nothing on this page pretends to be live. Sample posters are illustrations, clearly
            marked Preview.
          </p>
        </div>
        <div className="phase-soon">
          <span className="phase-stamp">Arriving soon</span>
          <ul>
            <li>
              <ArrowUp /> Posting ideas
            </li>
            <li>
              <ArrowUp /> Community voting
            </li>
            <li>
              <ArrowUp /> The discovery feed
            </li>
          </ul>
        </div>
      </section>

      {/* FINAL POSTER CTA */}
      <section className="wall-final" aria-label="Join the first release">
        <h2>BRING YOUR FIRST IDEA.</h2>
        <div>
          <Link to="/signup" className="bi-slab-cta">
            {WL ? 'JOIN THE WAITING LIST' : 'SIGN UP'}
          </Link>
          <p className="wall-preview-note" style={{ marginTop: 12 }}>
            First release coming soon · UNILAG first, every campus after
          </p>
        </div>
      </section>
    </div>
  );
}
