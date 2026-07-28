# Pitfalls Hit Building This Page

Read this before touching `globals.css` or writing any scroll-driven animation — every one
of these cost real debugging time across both the original build and the monochrome
rebuild.

## 1. `.container-page`'s padding must be longhand, never shorthand

`.container-page` is applied on nearly every section alongside a `py-*`/`pt-*`/`pb-*`
utility for vertical spacing. If `.container-page` itself sets `padding: 0 32px`
(shorthand), that shorthand's implicit `padding-top: 0; padding-bottom: 0` **silently
wins over every section's `py-*` class site-wide** — Tailwind v4 puts custom
hand-authored utility classes and its own generated utilities in the same cascade layer,
and source order (not specificity) decides the winner. The symptom was every section on
the page looking "squished with zero top/bottom margin" — a real, page-wide layout bug,
not a spacing preference. The fix, already applied and never to be undone:

```css
.container-page {
  max-width: 1240px;
  margin: 0 auto;
  padding-left: 32px;   /* longhand — never `padding: 0 32px` */
  padding-right: 32px;
  position: relative;
}
```

**General rule**: any shared utility class that sets a property you expect a *different*
utility class to override elsewhere (especially per-breakpoint, `md:`-prefixed
overrides) must use longhand for that property, or it will silently and confusingly lose
to nothing.

## 2. A literal `*/` inside a CSS comment breaks the whole stylesheet

Writing a comment like `/* handles py-*/pt-*/pb-* overrides */` contains a literal `*/`
partway through (`py-*/`) that prematurely closes the comment, corrupting everything after
it in the file. The failure mode is confusing: the resulting error can look stale and
persist even after the typo is fixed, because a cached dev-server/browser state keeps
serving the broken version. If a CSS fix doesn't take effect, restart the dev server,
clear `.next`, and reload in a fresh tab before assuming the fix itself is wrong. Avoid the
trigger entirely: never write a literal `*/` sequence inside a CSS comment's text, even
when describing wildcard class names.

## 3. `mask-image` can produce blank frames from headless screenshot tooling

Using `mask-image`/`-webkit-mask-image` — for a decorative dot-grid fade, or for a
marquee's edge fade — has repeatedly caused this project's automated browser-preview
screenshot tool to capture pure blank white/empty frames whenever the page was scrolled,
while the actual rendered page was completely fine (confirmed via `getBoundingClientRect`,
accessibility tree, and `elementFromPoint`, all of which agreed real content was there).
This is a known category of Chromium `Page.captureScreenshot` bug with masked compositing
layers — not a real user-facing bug, but real enough to design around. **Practical
takeaway, now the standing rule for this project**: don't use `mask-image` at all; use
plain non-masked textures, or two `absolute` gradient divs for an edge fade (see
`TestimonialsSection.tsx`'s marquee) instead of masking the scrollable element itself.

## 4. Too many `will-change` + `overflow-hidden` layers can also break screenshot QA

A grid of 9 separate `Reveal`-wrapped image cards (each individually getting
`will-change` during its enter animation, each with its own `overflow-hidden`) caused the
same kind of blank/broken automated screenshot as #3, even with a plain CSS grid and no
masking anywhere (CSS columns were ruled out first, then masking, before isolating this as
the actual cause). Confirmed as a compositor-overwhelm issue specific to having many
simultaneous animated layers, not a real rendering bug. **Fix, and now the standing
pattern**: wrap the *whole grid* in a single `Reveal`, not one per item — this is also less
code, so it aligns with the "efficient" project directive regardless of the bug.

## 5. `scroll-behavior: smooth` races `window.scrollTo` during automated testing

If the page (or a global CSS rule) sets `scroll-behavior: smooth`, calling
`window.scrollTo(x, y)` from a test/screenshot script animates the scroll instead of
jumping instantly — so reading `window.scrollY` or taking a screenshot immediately after
can capture a mid-animation position (e.g. asking for 800 and reading back 473 or 729).
This isn't a real user-facing bug, but it will make automated visual QA look flaky or
wrong. **Fix**: always scroll with
`window.scrollTo({ top, behavior: 'instant' })` in test/screenshot scripts, regardless of
what the page's own CSS does for real user scrolling.

## 6. GSAP ScrollTrigger `pin` + a separately-sized wrapper double-reserves space

(Historical — this project no longer uses GSAP at all, see `component-patterns.md`, but
the lesson generalizes to any custom sticky-scroll implementation.) Giving the *trigger*
element its own explicit height **in addition to** letting a pinning mechanism insert its
own spacer for the pinned child produces a large, unexplained blank gap after the pinned
content settles — the two height reservations stack. The plain-CSS `position: sticky`
patterns this project uses now (see `component-patterns.md`) avoid the whole class of bug
by construction — sticky doesn't reserve any extra space beyond its parent's natural
height, which is exactly why they replaced GSAP pinning here.

## 7. Don't fabricate content

No invented customer logos, stats ("50K+ users"), product screenshots, or testimonial
quotes dressed up as real. This was the single biggest driver of the monochrome rebuild —
reviewers specifically called out squished, obviously-fake product mockups as reading
"conventional and AI." When real assets don't exist yet for a new sub-feature page, ask for
them and hold that section back rather than shipping a placeholder that could be mistaken
for a real screenshot.

## 8. Translucent/glass surfaces over other rendered content, not just colorful backgrounds

(Historical — glass surfaces (`.glass-card`) were part of the earlier purple direction and
have been removed from this project entirely.) The lesson still generalizes: any
semi-transparent card sitting directly on top of *other rendered content* (not a solid
background) will let that content bleed through and become unreadable. If a future page
ever reintroduces any translucency, use a near-opaque surface
(`bg-white/95 backdrop-blur-xl`) for anything stacked/overlapping, never a card at ~60%
opacity.

## 9. A network-sandboxed shell may not be able to `git push`

If pushing to GitHub from an agent's shell fails with "Could not resolve host: github.com"
while `curl https://api.github.com/...` works fine, that's a tool-level egress
allowlist issue (only `api.github.com` reachable, not `github.com` itself) — not a
credentials problem. The fix is having the human run the already-committed push from
their own terminal on the same machine, not re-debugging GitHub auth.

## 10. A Vercel project created against an empty repo can get stuck on "Other" framework

If a Vercel project is first linked before any code exists in the repo, it may lock its
Framework Preset to "Other" and never re-detect Next.js on later deploys, serving a 404
even though the build succeeds. Fix by committing a `vercel.json` with
`{"framework": "nextjs"}` at the repo root — this overrides the dashboard setting
reliably and is version-controlled, so it survives future project re-links too.
