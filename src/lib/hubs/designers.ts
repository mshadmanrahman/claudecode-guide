/**
 * English copy for the /for-designers hub. Plain data, no functions or JSX, so
 * `npm run check:bn` can hash it and flag the Bangla hub when this drifts.
 * `{n}` is replaced at render time. Ids, slugs and styles stay in the components.
 */
export const DESIGNERS_HUB = {
  hero: {
    headline: ["You tried Claude.", "It felt generic.", "That's a setup problem."],
    lead: "Claude doesn't know you design for first-time mobile users on low-end Android in a price-sensitive market. It knows you're a person with a question. These guides fix that.",
    journeys: [
      {
        id: "web",
        label: "On the web",
        tagline: "Nothing to install.",
        note: "Open claude.ai in any browser. A Project keeps your working agreement next to Figma. Start here.",
      },
      {
        id: "desktop",
        label: "In the desktop app",
        tagline: "Claude reads your files.",
        note: "The Claude app for Mac or Windows. Point it at a folder of briefs and Figma exports so you stop pasting.",
      },
    ],
    codeNote: "Want Claude to build working prototypes? Two guides use the Code tab of the desktop app.",
    codeNoteLink: "See them",
    ctaPrimary: "Start with Guide 1",
    ctaSecondary: "Browse all guides",
  },
  demo: {
    folder: "Checkout redesign",
    prompt: "Read this brief. Who is the user, and what is it missing?",
    reply:
      "**User:** first-time buyers on mid-range Android phones.\n**Missing:** a success metric, the payment methods in scope, and what happens offline.\nI drafted three questions for the PM in questions.md.",
  },
  beforeAfter: {
    heading: "Same Claude. Two places to use it.",
    lead: "The difference is where your files live. On the web you paste them in. In the desktop app Claude reads them from a folder.",
    entryPathLabel: "Entry path",
    structuralShiftLabel: "The structural shift",
    appliesToLabel: "Applies to these guides",
    journeys: [
      {
        id: "web",
        label: "On the web",
        nickname: "The Thinking Partner",
        tagline:
          "Designer who never leaves the browser. Claude lives in a Project on claude.ai, open next to Figma. Nothing to install.",
        env: "claude.ai",
        entryPath: ["Open claude.ai", "Create a Project", "Write your working agreement", "Start interrogating briefs"],
        shifts: [
          {
            area: "Brief work",
            before: "Re-explain your users, constraints, and preferences at the start of every session.",
            after: "A Project holds your working context. Every session starts already knowing your work.",
          },
          {
            area: "Evaluation",
            before: "Gut-check your designs and hope obvious issues surface in review.",
            after: "Structured critique against all 10 heuristics, severity-rated and ready for sprint planning.",
          },
          {
            area: "Research",
            before: "8 hours of affinity mapping. Post-its everywhere. Themes that shift when someone new joins.",
            after: "45 minutes. Paste raw notes, run the synthesis, review and challenge the themes.",
          },
        ],
        structuralShift:
          "Claude sees only what you paste or upload, and everything happens in conversation. Getting challenged in dialogue is a different experience from getting challenged in a review meeting.",
        appliesTo: [
          { slug: "set-up-claude", short: "Set Up" },
          { slug: "decode-a-brief", short: "Decode a Brief" },
          { slug: "write-a-sharper-brief", short: "Write a Brief" },
          { slug: "evaluate-your-designs", short: "Evaluate Designs" },
          { slug: "heuristic-evaluation", short: "Heuristic Eval" },
          { slug: "research-synthesis", short: "Research" },
        ],
      },
      {
        id: "desktop",
        label: "In the desktop app",
        nickname: "The Active Collaborator",
        tagline:
          "Designer using the Claude app on Mac or Windows. Claude reads a folder of their briefs, notes and exports, and pushes back while the work is still in progress.",
        env: "Mac or Windows",
        entryPath: [
          "Open the Claude desktop app",
          "Create a Project",
          "Give it a folder of your files",
          "Paste your working agreement",
        ],
        shifts: [
          {
            area: "Research",
            before: "Manually copy-paste interview notes into a chat window, session by session.",
            after: "Save notes as all-notes.md. Claude reads the file directly and runs synthesis on the full set.",
          },
          {
            area: "Figma handoff",
            before: "Export specs, open a chat, paste everything, explain the context again.",
            after: "Save exports to your project folder. Claude reads tokens, layer names, and annotations in place.",
          },
          {
            area: "Brief decoding",
            before: "Explain the brief from scratch. Paste it. Add background. Re-explain the users.",
            after: "brief.md is already in the folder. Claude reads it, asks the 20 questions before you open Figma.",
          },
        ],
        structuralShift:
          "The critique loop moves from post-design (review meetings) to in-design (working sessions). You stop defending decisions you already made.",
        appliesTo: [
          { slug: "set-up-claude", short: "Set Up" },
          { slug: "decode-a-brief", short: "Decode a Brief" },
          { slug: "write-a-sharper-brief", short: "Write a Brief" },
          { slug: "evaluate-your-designs", short: "Evaluate Designs" },
          { slug: "heuristic-evaluation", short: "Heuristic Eval" },
          { slug: "figma-for-ai-handoff", short: "Figma for AI Handoff" },
          { slug: "research-synthesis", short: "Research" },
        ],
      },
    ],
  },
  process: {
    heading: "What each one covers",
    lead: "The desktop app covers everything the web does, and adds Direction and Handoff because it can read your files. Build and Ship need Claude Code, which runs in the Code tab of the desktop app.",
    legend: { added: "New in the desktop app", inherited: "Also on the web", none: "Not covered" },
    /** Same order as the stage ids in design-process.tsx. */
    stages: ["Brief", "Research", "Direction", "Frames", "Critique", "Handoff", "Build", "Ship"],
    layers: [
      {
        id: "web",
        label: "Web",
        sublabel: "claude.ai",
        addedLabel: "Baseline",
        description:
          "Everything in conversation. Interrogates briefs, synthesizes research, critiques designs. Claude sees what you paste or upload.",
      },
      {
        id: "desktop",
        label: "Desktop app",
        sublabel: "Mac or Windows",
        addedLabel: "+ Direction, Handoff",
        description:
          "Reads files from a folder on your computer. Challenges direction before you commit to frames. Reads Figma exports for handoff prep.",
      },
    ],
  },
  strip: {
    heading: "A designer's day with Claude",
    slots: [
      { time: "08:00", label: "Brief", title: "Interrogate the brief before touching Figma" },
      { time: "10:00", label: "Research", title: "Synthesize competitors and user quotes into patterns" },
      { time: "12:00", label: "Critique", title: "Get a second opinion on your wireframes" },
      { time: "14:00", label: "Handoff", title: "Write the developer specs in minutes" },
      { time: "17:00", label: "Prep", title: "Anticipate tomorrow's client feedback" },
    ],
  },
  cards: {
    heading: "Pick your path",
    introBefore: "Two places to work with Claude. Pick yours to see the",
    introCount: "{n} guides",
    introAfter: "that work there.",
    open: "Open",
    isNew: "new",
    difficulty: { beginner: "beginner", intermediate: "intermediate" },
    journeys: [
      {
        id: "desktop",
        label: "In the desktop app",
        env: "Mac or Windows",
        tagline: "The Claude desktop app. It can read a folder of your files.",
        note: "Point Claude at a folder of briefs, interview notes and Figma exports, and it reads them directly instead of waiting for you to paste.",
        clusters: ["Foundation", "Brief work", "Evaluation", "Production", "Research and automation"],
      },
      {
        id: "web",
        label: "On the web",
        env: "claude.ai",
        tagline: "Open claude.ai in any browser. Nothing to install.",
        note: "Paste or upload what you are working on. A Project keeps your working agreement and files together across conversations.",
        clusters: ["Foundation", "Brief work", "Evaluation", "Research and automation"],
      },
    ],
    codeTabHeading: "When you want to ship code",
    codeTabLead:
      "These two build real code, so they run in the Code tab of the Claude desktop app (Claude Code), not in a regular conversation. Start with Git if you have not used it.",
  },
  gettingStarted: {
    heading: "Getting started",
    lead: "Three steps, and the first one takes 10 minutes.",
    steps: [
      {
        title: "Pick where you work",
        body: "claude.ai in any browser, with nothing to install. Or the Claude desktop app for Mac or Windows, if you want Claude reading a folder of your files. Both follow the same guides.",
      },
      {
        title: "Write your working agreement",
        body: "Guide 1 walks you through it in 10 minutes. One block of text that tells Claude who you are, who you design for, and how you want output delivered. Every session starts from there.",
        cta: "Start Guide 1",
      },
      {
        title: "Pick any guide that matches today",
        body: "Got a brief kickoff tomorrow? Guide 2. Running a heuristic eval next week? Guide 5. Each one is self-contained. No order required after the first.",
        cta: "Browse all guides",
      },
    ],
  },
  why: {
    heading: "Made for the work designers actually do",
    paragraphs: [
      "Most Claude guides are written for developers. They assume you want to write code, run tests, or build infrastructure. Useful if that is your job. Frustrating if it is not.",
      "Designers use Claude every day: summarising research, wrestling with briefs, trying to get feedback that is not just “looks good.” But the default output is generic because Claude does not know you design for first-time mobile users on low-end Android in a price-sensitive market. It knows you are a person with a question.",
      "These guides fix that. They are built around what UX and UI designers actually do at work: the brief that arrives too vague, the evaluation that needs to happen before the sprint, the research synthesis that is due Friday, the Figma file that needs to survive a handoff.",
      "Start with Guide 1 to write your working agreement. After that, pick whichever guide matches today.",
    ],
  },
};

export type DesignersHubCopy = typeof DESIGNERS_HUB;
