export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I used to block off a whole afternoon for a client deck. Now I get a full draft before my second coffee and spend the rest of the time actually refining the story.",
    name: "Priya S.",
    role: "Marketing Lead",
  },
  {
    quote:
      "The PDF to PPT converter alone saved us from re-typing a 30-page research document into slides by hand.",
    name: "Marcus T.",
    role: "Startup Founder",
  },
  {
    quote:
      "Presenter mode from my phone means I'm not tethered to a laptop at the front of the room anymore.",
    name: "Dana K.",
    role: "Program Manager",
  },
  {
    quote:
      "I built a full term's worth of lesson slides in an afternoon instead of spreading it out over a whole semester of Sunday nights.",
    name: "Sam R.",
    role: "High School Teacher",
  },
  {
    quote:
      "Client workshops used to mean two days of turning sticky notes into a deck. Now I upload my notes and have a polished readout before the follow-up call.",
    name: "Elena V.",
    role: "Management Consultant",
  },
  {
    quote:
      "Every recurring report used to drift a little further from our brand each quarter. Now the template holds and I just drop in new numbers.",
    name: "Jordan K.",
    role: "Operations Manager",
  },
];
