/**
 * English copy for the /for-teachers hub. Plain data, no functions or JSX, so
 * `npm run check:bn` can hash it and flag the Bangla hub when this drifts.
 * `{n}` is replaced at render time.
 */
export const TEACHERS_HUB = {
  hero: {
    headline: "You plan. You teach. You assess.",
    headlineMuted: "Claude handles the paperwork.",
    lead: "Teachers spend hours every week on tasks that are not teaching: writing lesson plans, generating quiz questions, drafting parent emails, marking feedback. These guides show you how to use Claude for all of it, so your time goes back to the room.",
    journeys: [
      {
        id: "lesson-planning",
        label: "Lesson planning",
        tagline: "Plans, activities, and units",
        note: "From topic to structured lesson plan in minutes. Any subject, any year group.",
      },
      {
        id: "assessment",
        label: "Assessment",
        tagline: "Questions, rubrics, feedback",
        note: "Quiz questions, marking rubrics, and written feedback on student work.",
      },
      {
        id: "communication",
        label: "Communication",
        tagline: "Emails and reports",
        note: "Parent emails, report comments, and sensitive communications drafted for you.",
      },
    ],
    ctaPrimary: "Start with lesson planning",
    ctaSecondary: "Browse all guides",
  },
  demo: {
    folder: "Year 7 Science",
    prompt: "Plan a 45-minute lesson on the water cycle for Year 7",
    reply:
      "**Starter (5 min):** where did the rain on the window come from?\n**Main (25 min):** label the cycle, then act it out in four groups.\n**Check (10 min):** five quick questions, answers attached.\n**Exit (5 min):** one sentence each on evaporation.",
  },
  strip: {
    heading: "A teacher's day with Claude",
    slots: [
      { time: "08:00", label: "Morning", title: "Anticipate where students will get stuck today" },
      { time: "10:00", label: "Assessment", title: "Create quiz questions and rubrics in minutes" },
      { time: "12:00", label: "Comms", title: "Write compassionate, clear parent updates" },
      { time: "14:00", label: "Planning", title: "Differentiate activities for every learner" },
      { time: "17:00", label: "Feedback", title: "Give better essay feedback, faster" },
    ],
  },
  cards: {
    heading: "Pick your focus",
    introBefore: "Three areas where Claude saves the most teacher time. Select one to see the",
    introCount: "{n} guides",
    introAfter: "for that area.",
    open: "Open",
    difficulty: { beginner: "beginner", intermediate: "intermediate" },
    journeys: [
      {
        id: "lesson-planning",
        label: "Lesson planning",
        tagline: "Plans and activities",
        note: "Give Claude the topic, year group, and learning objective. It builds the plan.",
        cluster: "Planning",
      },
      {
        id: "assessment",
        label: "Assessment",
        tagline: "Questions, rubrics, feedback",
        note: "Question banks, marking rubrics, and written feedback from your bullet-point notes.",
        cluster: "Assessment",
      },
      {
        id: "communication",
        label: "Communication",
        tagline: "Emails and reports",
        note: "Parent emails, sensitive messages, and report comments drafted in under a minute.",
        cluster: "Communication",
      },
    ],
  },
  gettingStarted: {
    heading: "Getting started",
    lead: "No installation. No configuration. It works in a browser tab you open next to your planning doc.",
    needHeading: "What you need",
    need: ["A free Claude account at claude.ai", "A browser", "No technical setup: it works in any browser"],
    tierNote:
      "Claude's free tier is enough to follow all guides here. If you use Claude daily, Pro ($20/month) removes the rate limits.",
    howHeading: "How it works",
    how: [
      "Open Claude.ai alongside your work.",
      "Describe what you need to create.",
      "Copy Claude's output.",
      "Edit and use it as you would any other resource.",
    ],
    cta: "Start with Guide 1: Lesson plans",
  },
};

export type TeachersHubCopy = typeof TEACHERS_HUB;
