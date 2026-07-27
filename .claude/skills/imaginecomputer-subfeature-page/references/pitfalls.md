# Pitfalls Hit Building This Page

Read this before touching `globals.css` or writing any scroll-driven animation — every
one of these cost real debugging time on the reference build.

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

## 2. Don't mix a custom width/layout utility with per-breakpoint Tailwind overrides

`.team-card-item` (a hand-authored `flex: 0 0 clamp(...)` utility) fought with a
`md:w-[380px]` override on the same element in an early version of the horizontal
gallery — same cascade-layer-ordering issue as #1. If a card's width needs to differ by
breakpoint, give it a plain Tailwind width class (`w-[300px] md:w-[380px]`) instead of a
custom CSS class, or keep the custom class breakpoint-agnostic.

## 3. `mask-image` can produce blank frames from headless screenshot tooling

Using `mask-image`/`-webkit-mask-image` for a decorative dot-grid fade (in the Hero and
Final CTA) caused the automated browser-preview screenshot tool used during this build to
capture pure blank white/empty frames whenever the page was scrolled — while the actual
rendered page was completely fine (confirmed via `getBoundingClientRect`, accessibility
tree, and `elementFromPoint`, all of which agreed real content was there). This is a
known category of Chromium `Page.captureScreenshot` bug with masked compositing layers.
**Practical takeaway**: prefer a uniform (non-masked) texture, or test screenshot-based
QA carefully if a mask is used — don't burn time assuming a masked background is a real
rendering bug just because automated screenshots go blank.

## 4. GSAP ScrollTrigger `pin` + a separately-sized wrapper double-reserves space

Giving the *trigger* element its own explicit height (e.g. `md:h-[170vh]`) **in addition
to** letting `ScrollTrigger`'s `pinSpacing` insert its own spacer for the pinned child
produces a large, unexplained blank gap after the pinned content settles — the two
height reservations stack. Let the trigger element have **no manual height**; let
`pinSpacing` (on by default) size the spacer entirely from `end - start`. Pass `end` as a
**function** (e.g. `() => \`+=${window.innerHeight * 0.9}\``) with
`invalidateOnRefresh: true` so it re-measures correctly on resize/font-load instead of
freezing a stale pixel value from initial mount.

## 5. Measuring row width for a horizontal scroll tween: avoid `scrollWidth` surprises

When computing how far a horizontally-animated row needs to travel, prefer measuring the
actual last child's position (`lastCard.offsetLeft + lastCard.offsetWidth`) over the
row's own `scrollWidth` if the row has `overflow: visible` at any point in its lifecycle
— `scrollWidth` is unreliable outside a scrollable context.

## 6. Translucent glass cards over *other cards/text*, not just colorful backgrounds

`.glass-card`'s 60%-opacity background is tuned for sitting over ambient color blobs. Put
it in a stack where one card sits directly on top of *other rendered content* (e.g. a
card-deck testimonial UI) and the layers behind bleed through, turning readable text into
overlapping clutter. Use a near-opaque surface (`bg-white/95 backdrop-blur-xl`) for any
stacked/overlapping card UI instead.

## 7. Don't fabricate content

No invented customer logos, stats ("50K+ users"), or product screenshots dressed up as
real. When real assets don't exist yet (this page's showcase mockups, for example), build
an honestly-labeled placeholder and say so explicitly in both the code comment and to the
person you're building for — don't let a placeholder quietly read as a real screenshot.

## 8. A network-sandboxed shell may not be able to `git push`

If pushing to GitHub from an agent's shell fails with "Could not resolve host: github.com"
while `curl https://api.github.com/...` works fine, that's a tool-level egress
allowlist issue (only `api.github.com` reachable, not `github.com` itself) — not a
credentials problem. The fix is having the human run the already-committed push from
their own terminal on the same machine, not re-debugging GitHub auth.

## 9. A Vercel project created against an empty repo can get stuck on "Other" framework

If a Vercel project is first linked before any code exists in the repo, it may lock its
Framework Preset to "Other" and never re-detect Next.js on later deploys, serving a 404
even though the build succeeds. Fix by committing a `vercel.json` with
`{"framework": "nextjs"}` at the repo root — this overrides the dashboard setting
reliably and is version-controlled, so it survives future project re-links too.
