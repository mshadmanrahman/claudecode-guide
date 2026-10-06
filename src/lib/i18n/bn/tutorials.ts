/**
 * Bangla tutorial translations, keyed by the English slug.
 *
 * Style rules (the pilot below is the reference for every later page):
 * - Formal আপনি, never তুমি. Plain spoken Bangla, not literary.
 * - Product names, commands, file names and code stay in English: Claude Code,
 *   Sonnet, Opus, /model, plan mode, CLAUDE.md, skill, prompt, terminal.
 * - Inside mocks, Claude Code's own interface stays English (tool rows,
 *   thinking verbs, "Claude Code ready"). What the reader types and what
 *   Claude answers is Bangla, because that is what they will actually see.
 * - Idioms are re-expressed, never translated word for word.
 *
 * `sourceHash` is the hash of the English entry this was translated from.
 * `scripts/check-bn-sync.ts` and the page itself compare it with the current
 * English and flag the translation as stale when they differ.
 */
import type { Tutorial } from "@/lib/tutorials";

export interface Translation<T> {
  sourceHash: string;
  translatedAt: string;
  content: T;
}

export const BN_TUTORIALS: Partial<Record<string, Translation<Tutorial>>> = {
  "coming-from-chatgpt": {
    sourceHash: "a65c3b8559b3763a",
    translatedAt: "2026-10-06",
    content: {
      title: "ChatGPT থেকে আসছেন? যা যা আলাদা",
      slug: "coming-from-chatgpt",
      duration: "১০ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "terminal"],
      description:
        "Claude ব্যবহার করলে ChatGPT-এর মতো লাগে না। কেন এমন হয়, আর কীভাবে setup করলে এটি আপনার expectation মতো কাজ করবে, তা এখানে দেখুন।",
      intro:
        "ChatGPT ভালো tool। এটা কোনো competition নয়। কিন্তু Claude ব্যবহার করে আপনার যদি মনে হয়ে থাকে \"এটা তো আমাকে মনে রাখে না\" বা \"আমার preference-গুলো থাকে না\", তাহলে আপনি ভুল দেখছেন না। Claude ইচ্ছে করেই অন্যভাবে কাজ করে। কেন, সেটা বুঝলে সমাধান করতে মোটামুটি পাঁচ মিনিট লাগে। চলুন একসঙ্গে দেখি।",
      steps: [
        {
          title: "সবচেয়ে বড় পার্থক্য: Claude কোথায় থাকে",
          description:
            "ChatGPT থাকে আপনার browser-এ। এটি আপনার আগের conversation-গুলোর list রাখে এবং এক session থেকে আরেক session-এ সেগুলো কাজে লাগাতে পারে। Claude Code থাকে আপনার কম্পিউটারে। এটি চলে আপনার terminal-এ (বা Claude.ai web app-এ), কিন্তু এর এমন কোনো built-in memory নেই যা সব জায়গায় আপনার সঙ্গে থাকে। প্রতিটি নতুন session শুরু হয় একদম নতুন করে। এটা কোনো bug নয়। আসলে এ কারণেই real কাজে Claude এত useful: এটি সরাসরি আপনার ফাইল, ফোল্ডার আর কোডের ওপর কাজ করে। তবে এর মানে, আপনি কে, সেটা Claude-কে আপনাকেই জানাতে হবে। ভালো খবর হলো, কাজটা একবারই করতে হয়।",
          demo: {
            title: "নতুন Claude session দেখতে কেমন",
            steps: [
              { type: "cmd", text: "claude" },
              { type: "success", text: "Claude Code ready", delay: 300 },
              { type: "out", text: "Working directory: ~/my-project" },
              { type: "out", text: "No CLAUDE.md found" },
              { type: "warn", text: "Claude এখনও আপনাকে চেনে না। চলুন সেটা ঠিক করি।" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "প্রতিটা session-এ আপনি কেন একদম শুরু থেকে শুরু করেন?" },
              { kind: "thinking", ms: 1100 },
              {
                kind: "say",
                text: "আমি এক session থেকে আরেক session-এ কিছু মনে রাখি না। তবে প্রতিবার\nশুরুর সময় আমি একটা ফাইল পড়ি, যার নাম CLAUDE.md।\n\nএই ফোল্ডারে এখনও সেটা নেই, তাই আপনার সম্পর্কে আমি কিছুই জানি না।\n/init চালান, অথবা আমাকে বলুন, আমরা একসঙ্গে লিখে ফেলি।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি ChatGPT থেকে Claude-এ move করছি। আমাকে কি সব সময় একদম শুরু থেকেই শুরু করতে হবে?",
              },
              {
                role: "claude",
                text: "শুরুতে অনেকেরই এমন মনে হয়, আর কথাটা ঠিক। Claude-এর এমন কোনো built-in memory নেই যা এক conversation থেকে পরেরটায় আপনার সঙ্গে যায়।\n\nসমাধান হলো CLAUDE.md নামের একটা ফাইল। আপনি একবার লিখবেন, আর প্রতিটি session-এর শুরুতে Claude সেটা পড়ে নেবে। অনেকটা নিজের জন্য একটা briefing note রেখে যাওয়ার মতো, যেটা Claude নিজে থেকেই তুলে নেয়।\n\nএকটা বানাতে সাহায্য করব? মোটামুটি পাঁচ মিনিট লাগবে।",
              },
            ],
          },
        },
        {
          title: "Claude যেভাবে আপনাকে মনে রাখবে: CLAUDE.md",
          description:
            "\"Claude কেন বারবার আমাকে ভুলে যায়?\" এই প্রশ্নের উত্তর হলো CLAUDE.md নামের একটা ফাইল। এটি আপনার project ফোল্ডারে রাখুন (অথবা সব কাজে একই preference চাইলে home directory-তে), আর প্রতিটি session-এর শুরুতে Claude নিজে থেকেই এটা পড়বে। কোনো plugin লাগবে না, কোনো setting না, কোনো subscription upgrade না। শুধু একটা text ফাইল। এখনই কীভাবে একটা বানাবেন, নিচে দেখুন।",
          code: {
            snippet: `# home directory-তে একটা CLAUDE.md বানান
# এটি আপনার কম্পিউটারের প্রতিটি Claude session-এ কাজ করবে

cat > ~/CLAUDE.md << 'EOF'
# আমার সম্পর্কে
আমি একটি SaaS কোম্পানিতে product manager।
আমি short answer পছন্দ করি। কোনো intro ছাড়া, সরাসরি point-এ।
উত্তর বাংলায় দিন, technical term ইংরেজিতে রাখুন।

# আমার কাজের context
আমি মূলত roadmap, user research আর Jira ticket নিয়ে কাজ করি।
লেখায় সাহায্য চাইলে, আমি যা paste করি তার tone মিলিয়ে লিখুন।

# Preference
- লম্বা paragraph-এর বদলে bullet point
- আগে উত্তর, পরে explanation
- "অবশ্যই!" বা "দারুণ প্রশ্ন!" টাইপের বাড়তি কথা নয়
EOF`,
            language: "bash",
          },
          demo: {
            title: "আপনার প্রথম CLAUDE.md বানানো",
            steps: [
              { type: "cmd", text: "nano ~/CLAUDE.md" },
              { type: "out", text: "Opening editor...", delay: 400 },
              { type: "out", text: "  # আমার সম্পর্কে" },
              { type: "out", text: "  আমি product manager। short answer পছন্দ করি।" },
              { type: "out", text: "  উত্তর বাংলায়, technical term ইংরেজিতে।" },
              { type: "out", text: "" },
              { type: "out", text: "  # Preference" },
              { type: "out", text: "  - paragraph-এর বদলে bullet point" },
              { type: "out", text: "  - আগে উত্তর, পরে explanation" },
              { type: "success", text: "Saved ~/CLAUDE.md" },
              { type: "warn", text: "এখন থেকে প্রতিটি session এই context দিয়ে শুরু হবে।" },
            ],
          },
          cliDemo: {
            steps: [
              {
                kind: "prompt",
                text: "আমি একটা ~/CLAUDE.md বানাতে চাই: আমি PM, short answer চাই, উত্তর বাংলায় কিন্তু technical term ইংরেজিতে, paragraph-এর বদলে bullet",
              },
              { kind: "thinking", verb: "Writing", ms: 1000 },
              {
                kind: "tool",
                name: "Write",
                arg: "~/CLAUDE.md",
                result: "Wrote 8 lines to ~/CLAUDE.md",
                lines: [
                  "# আমার সম্পর্কে",
                  "আমি product manager। short answer পছন্দ করি।",
                  "উত্তর বাংলায় দিন, technical term ইংরেজিতে রাখুন।",
                  "",
                  "# Preference",
                  "- paragraph-এর বদলে bullet point",
                  "- আগে উত্তর, পরে explanation",
                  "- বাড়তি কথা নয়",
                ],
              },
              { kind: "say", text: "হয়ে গেছে। এখন থেকে প্রতিটি নতুন session এই ফাইল পড়ে শুরু হবে।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "হ্যাঁ। আমি একটা CLAUDE.md বানাতে চাই। আমি product manager। আমার short answer লাগবে, উত্তর বাংলায় কিন্তু technical term ইংরেজিতে, paragraph-এর বদলে bullet point, আর 'অবশ্যই!' টাইপের বাড়তি কথা নয়।",
              },
              {
                role: "claude",
                text: "এই নিন আপনার CLAUDE.md। এটি `CLAUDE.md` নামে আপনার home directory-তে (অথবা project ফোল্ডারে) save করুন:\n\n```\n# আমার সম্পর্কে\nআমি একজন product manager।\nআমি short, সরাসরি উত্তর পছন্দ করি, কোনো intro ছাড়া।\nউত্তর বাংলায় দিন, technical term ইংরেজিতে রাখুন।\n\n# লেখার style\n- লম্বা paragraph-এর বদলে bullet point\n- আগে উত্তর, পরে explanation\n- বাড়তি কথা নয়: 'অবশ্যই!', 'দারুণ প্রশ্ন!' বাদ দিন\n```\n\nফাইলটি থাকলে প্রতিটি নতুন session-এর শুরুতে Claude এটা পড়ে নেবে। আপনার preference-গুলো নিজে থেকেই থেকে যাবে।",
              },
            ],
          },
        },
        {
          title: "এখন আপনার preference-গুলো থেকে যায়",
          description:
            "CLAUDE.md তৈরি হয়ে গেলে একটা নতুন session শুরু করে দেখুন। আপনার প্রথম message লেখার আগেই Claude ফাইলটা পড়ে নেবে। \"মনে রাখবেন, আমি short answer পছন্দ করি\" এ কথা আর কখনো বলতে হবে না। এখনই test করে দেখুন: Claude-কে কিছু লিখতে বলুন, তারপর দেখুন সেটা আপনার বলে দেওয়া style-এর সঙ্গে মেলে কি না।",
          code: {
            snippet: `# নতুন Claude session শুরু করে test করুন
claude "product roadmap কী? আমাকে short তিনটা bullet-এ বুঝিয়ে দিন"`,
            language: "bash",
          },
          demo: {
            title: "শুরু থেকেই Claude আপনার preference জানে",
            steps: [
              { type: "cmd", text: 'claude "product roadmap কী? আমাকে short তিনটা bullet-এ বুঝিয়ে দিন"' },
              { type: "out", text: "Reading ~/CLAUDE.md...", delay: 500 },
              { type: "out", text: "Context: PM, short answer, বাংলায় উত্তর, আগে bullet" },
              { type: "out", text: "" },
              { type: "out", text: "Product roadmap হলো:" },
              { type: "out", text: "- কী বানানো হবে আর কখন, তার priority ঠিক করা plan" },
              { type: "out", text: "- stakeholder-দের align করার একটা tool" },
              { type: "out", text: "- সময়ের সঙ্গে update হয় এমন document, কোনো fixed promise নয়" },
              { type: "success", text: "বাংলায় উত্তর। আগে bullet। কোনো intro নেই। হয়ে গেল।" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "product roadmap কী? আমাকে short তিনটা bullet-এ বুঝিয়ে দিন" },
              { kind: "thinking", ms: 1000 },
              {
                kind: "say",
                text: "Product roadmap হলো:\n- কী বানানো হবে আর কখন, তার priority ঠিক করা plan\n- stakeholder-দের align করার একটা tool\n- সময়ের সঙ্গে update হয় এমন document, কোনো fixed promise নয়",
              },
            ],
          },
          appDemo: {
            steps: [
              { role: "user", text: "product roadmap কী? আমাকে short তিনটা bullet-এ বুঝিয়ে দিন।" },
              {
                role: "claude",
                text: "Product roadmap হলো:\n- কী বানানো হবে আর কখন, তার priority ঠিক করা plan, যা strategic goal-এর সঙ্গে connected\n- stakeholder-দের align করার tool, date নিয়ে বাড়তি commitment না দিয়েই\n- এমন একটা document যা priority বদলালে update হয়, কোনো নির্দিষ্ট delivery schedule নয়",
              },
            ],
          },
        },
        {
          title: "যে project-এর context থেকে যায়: project-level CLAUDE.md",
          description:
            "home directory-র CLAUDE.md আপনার general preference-গুলো ধরে রাখে। কিন্তু নির্দিষ্ট কোনো project-এর জন্য সেই project ফোল্ডারের ভেতরেই দ্বিতীয় একটা CLAUDE.md রাখতে পারেন। Claude দুটোই একসঙ্গে ব্যবহার করে: home directory থেকে আপনার general preference, project ফোল্ডার থেকে project-এর context। এভাবেই আপনি ChatGPT-র মতো continuity পান, আপনার context রাখার জন্য কোনো cloud service ছাড়াই।",
          code: {
            snippet: `# project ফোল্ডারের ভেতরে এই project-এর জন্য আলাদা CLAUDE.md বানান

cd ~/my-product-work
cat > CLAUDE.md << 'EOF'
# Project: Q3 Roadmap Planning
এটি quarterly roadmap planning-এর workspace।

## Key file
- roadmap-draft.md : current working draft
- user-research-notes.md : এপ্রিলের interview-গুলোর summary
- competitor-analysis.csv : last update মার্চ ২০২৫

## Context
Q3-এর জন্য তিনটা strategic bet থেকে একটা বেছে নিতে হবে।
Decision শুক্রবারের মধ্যে leadership-এর কাছে যেতে হবে।

## যা আগেই ঠিক হয়ে গেছে
- Mobile-first-ই priority
- এই cycle-এ native app বানানো হচ্ছে না
EOF`,
            language: "bash",
          },
          demo: {
            title: "Project context নিজে থেকেই load হয়",
            steps: [
              { type: "cmd", text: "cd ~/my-product-work && claude" },
              { type: "out", text: "Reading ~/CLAUDE.md (global)...", delay: 400 },
              { type: "out", text: "Reading ./CLAUDE.md (project)...", delay: 300 },
              { type: "success", text: "Load হয়েছে: PM-এর preference + Q3 roadmap context" },
              { type: "out", text: "Claude জানে: আপনার key file, deadline, আর কী আগেই ঠিক হয়ে গেছে।" },
              { type: "warn", text: "Project আবার বুঝিয়ে বলার দরকার নেই।" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "এই project-এর ব্যাপারে আপনি আগে থেকে কী জানেন?" },
              { kind: "thinking", verb: "Reading", ms: 900 },
              { kind: "tool", name: "Read", arg: "CLAUDE.md", result: "Read 14 lines" },
              {
                kind: "say",
                text: "আপনারা Q3-এর তিনটা bet থেকে একটা বেছে নিচ্ছেন, decision শুক্রবারের মধ্যে।\nআগে থেকেই ঠিক: mobile-first, এই cycle-এ কোনো native app নয়।\nআমি roadmap-draft.md আর user-research-notes.md থেকে কাজ করব।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি চাই Claude এই project-এর context নিজে থেকেই জানুক। আমরা Q3-এর জন্য তিনটা bet থেকে একটা বেছে নিচ্ছি। Decision আমাদের শুক্রবারের মধ্যেই নিতে হবে। Mobile-first আগে থেকেই বেছে নেওয়া হয়ে গেছে। আর এই cycle-এ কোনো native app নয়।",
              },
              {
                role: "claude",
                text: "আপনার project ফোল্ডারের ভেতরে একটা `CLAUDE.md` ফাইলে এটা যোগ করুন:\n\n```\n# Project: Q3 Strategy Decision\n\n## Context\nQ3-এর জন্য তিনটা strategic bet থেকে একটা বেছে নেওয়া।\nDecision deadline: শুক্রবার।\n\n## যা আগেই ঠিক হয়ে গেছে\n- Mobile-first-ই priority\n- এই cycle-এ কোনো native app নয়\n\n## যে ফাইলগুলো দেখতে হবে\n- roadmap-draft.md\n- user-research-notes.md\n```\n\nএই ফোল্ডারের ভেতরে যখনই নতুন Claude session খুলবেন, Claude আগে এই context পড়ে নেবে। পরিস্থিতি আর কখনো নতুন করে বুঝিয়ে বলতে হবে না।",
              },
            ],
          },
        },
        {
          title: "Honest তুলনা: কখন কোনটা ব্যবহার করবেন",
          description:
            "কোনো টুলই অন্যটার চেয়ে ভালো নয়। দুটো আলাদা ধরনের কাজের জন্য বানানো। নিচে পরিষ্কার করে ভাগ করে দেওয়া হলো, যাতে কোনো দ্বিধা ছাড়াই যেটা যেখানে ভালো কাজ করে, সেখানে সেটা ব্যবহার করতে পারেন।",
          demo: {
            title: "Claude বনাম ChatGPT: কখন কোনটা",
            steps: [
              { type: "out", text: "ChatGPT ব্যবহার করুন যখন:", delay: 200 },
              { type: "out", text: "  - দ্রুত, chat-এর মতো back-and-forth চান" },
              { type: "out", text: "  - ব্রাউজারে বা ফোনে আছেন" },
              { type: "out", text: "  - কোনো setup ছাড়াই এক session থেকে আরেক session-এ memory চান" },
              { type: "out", text: "  - GPT plugin বা DALL-E দিয়ে ছবি বানাচ্ছেন" },
              { type: "out", text: "" },
              { type: "out", text: "Claude Code ব্যবহার করুন যখন:", delay: 300 },
              { type: "out", text: "  - real কোনো project বা ফোল্ডারের ভেতরে কাজ করছেন" },
              { type: "out", text: "  - চান Claude আসল ফাইল পড়ুক, লিখুক আর edit করুক" },
              { type: "out", text: "  - repeatable workflow চান (skill, automation)" },
              { type: "out", text: "  - চান context আপনার নিজের কম্পিউটার থেকে load হোক" },
              { type: "success", text: "চিরকালের জন্য একটা বেছে নিতে হবে না। দুটোই ব্যবহার করুন।" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "Honestly বলুন, কখন আপনার বদলে ChatGPT use করব?" },
              { kind: "thinking", ms: 1100 },
              {
                kind: "say",
                text: "ফোনে দ্রুত chat করতে, বা কোনো setup ছাড়া memory চাইলে ChatGPT নিন।\nকাজ যখন কোনো ফোল্ডারে থাকে, তখন Claude Code নিন:\nপড়ার আর edit করার মতো আসল ফাইল, আর CLAUDE.md থেকে load হওয়া context।\n\nবেশিরভাগ মানুষ দুটোই ব্যবহার করেন।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Honestly বলুন, কখন ChatGPT আর কখন Claude use করব? Biased উত্তর চাই না।",
              },
              {
                role: "claude",
                text: "প্রশ্নটা fair। Honestly ভাগ করলে এমন দাঁড়ায়:\n\nChatGPT নিন যখন:\n- কোনো setup ছাড়াই memory কাজ করুক, এমন চান\n- ডেস্কে নয়, phone-এ বা browser-এ আছেন\n- ছবি বানানো বা browsing-এর জন্য GPT-4o ব্যবহার করেন\n- project context ছাড়াই দ্রুত chat-এ help চান\n\nClaude নিন যখন:\n- আসল ফাইলসহ কোনো project ফোল্ডারের ভেতরে কাজ করছেন\n- চান Claude শুধু লেখা তৈরি না করে ফাইল পড়ুক আর লিখুক\n- চান CLAUDE.md দিয়ে আপনার preference আর project context নিজে থেকেই load হোক\n- repeatable workflow বানাচ্ছেন (skill, automation, structured output)\n\nসংক্ষেপে: chat-এর জন্য ChatGPT ভালো। আপনার কম্পিউটারে থাকা কাজের জন্য Claude Code ভালো। অনেকেই দুটোই ব্যবহার করেন।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "আপনার প্রথম CLAUDE.md বানান",
        href: "/tutorials/your-first-claude-md",
      },
    },
  },
};
