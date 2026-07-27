export type UseCase = {
  title: string;
  body: string;
  icon: "sales" | "marketing" | "startup" | "educator" | "consultant" | "operations";
  size?: "lg" | "sm";
};

export const USE_CASES: UseCase[] = [
  {
    title: "Sales",
    body: "Turn call notes into a client-ready proposal before the follow-up email goes out.",
    icon: "sales",
    size: "lg",
  },
  {
    title: "Marketing",
    body: "Draft campaign recaps and strategy decks without waiting on the design team.",
    icon: "marketing",
  },
  {
    title: "Startups & Founders",
    body: "Go from a rough thesis to an investor-ready pitch deck in one sitting.",
    icon: "startup",
  },
  {
    title: "Educators",
    body: "Build lesson slides and visual aids for a whole term in an afternoon.",
    icon: "educator",
  },
  {
    title: "Consultants",
    body: "Turn a client workshop's raw notes into a polished readout the same day.",
    icon: "consultant",
  },
  {
    title: "Operations",
    body: "Keep recurring reports consistent, on-brand, and off everyone's weekend.",
    icon: "operations",
    size: "lg",
  },
];
