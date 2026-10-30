import type { DesignersHubCopy } from "@/lib/hubs/designers";
import type { Translation } from "@/lib/i18n/bn/tutorials";

/** Bangla copy for /bn/for-designers. Mirrors `DESIGNERS_HUB` key for key. */
export const BN_DESIGNERS_HUB: Translation<DesignersHubCopy> = {
  sourceHash: "86adfbd2359a6410",
  translatedAt: "2026-10-30",
  content: {
    hero: {
      headline: ["Claude ব্যবহার করেছেন।", "উত্তরগুলো generic লেগেছে।", "সমস্যাটা setup-এ।"],
      lead: "Claude জানে না যে আপনি কম দামের Android phone-এ প্রথমবার app ব্যবহার করা মানুষের জন্য design করেন, যাদের কাছে দাম বড় ব্যাপার। Claude শুধু জানে আপনি প্রশ্ন নিয়ে আসা একজন মানুষ। এই guide-গুলো সেটা ঠিক করে।",
      journeys: [
        {
          id: "web",
          label: "Web-এ",
          tagline: "কিছু install করতে হবে না।",
          note: "যেকোনো browser-এ claude.ai খুলুন। একটা Project আপনার working agreement-টা Figma-র পাশেই রাখে। এখান থেকে শুরু করুন।",
        },
        {
          id: "desktop",
          label: "Desktop app-এ",
          tagline: "Claude আপনার file পড়ে।",
          note: "Mac বা Windows-এর Claude app। Brief আর Figma export-এর একটা folder দেখিয়ে দিন, তাহলে আর paste করতে হবে না।",
        },
      ],
      codeNote: "Claude দিয়ে চালানো যায় এমন prototype বানাতে চান? দুটো guide desktop app-এর Code tab ব্যবহার করে।",
      codeNoteLink: "দেখুন",
      ctaPrimary: "Guide 1 দিয়ে শুরু করুন",
      ctaSecondary: "সব guide দেখুন",
    },
    demo: {
      folder: "Checkout redesign",
      prompt: "এই brief-টা পড়ুন। User কে, আর কী কী বাদ পড়েছে?",
      reply:
        "**User:** মাঝারি দামের Android phone-এ প্রথমবার কেনাকাটা করা মানুষ।\n**বাদ পড়েছে:** success metric, কোন কোন payment method থাকবে, আর offline হলে কী হবে।\nPM-এর জন্য তিনটা প্রশ্ন questions.md-তে লিখে রেখেছি।",
    },
    beforeAfter: {
      heading: "একই Claude, ব্যবহারের দুটো জায়গা।",
      lead: "পার্থক্যটা হলো আপনার file কোথায় থাকে। Web-এ আপনি paste করেন। Desktop app-এ Claude একটা folder থেকে নিজেই পড়ে নেয়।",
      entryPathLabel: "শুরুর ধাপ",
      structuralShiftLabel: "কাজের ধরন যেভাবে বদলায়",
      appliesToLabel: "যে guide-গুলোতে খাটে",
      journeys: [
        {
          id: "web",
          label: "Web-এ",
          nickname: "চিন্তার সঙ্গী",
          tagline:
            "যে ডিজাইনার browser ছেড়ে বের হন না। Claude থাকে claude.ai-এর একটা Project-এ, Figma-র পাশেই খোলা। কিছু install করতে হয় না।",
          env: "claude.ai",
          entryPath: ["claude.ai খুলুন", "একটা Project বানান", "আপনার working agreement লিখুন", "Brief নিয়ে প্রশ্ন করা শুরু করুন"],
          shifts: [
            {
              area: "Brief-এর কাজ",
              before: "প্রতিটা session-এর শুরুতে আপনার user, constraint আর preference আবার বুঝিয়ে বলা।",
              after: "Project আপনার কাজের context ধরে রাখে। প্রতিটা session আপনার কাজ জেনেই শুরু হয়।",
            },
            {
              area: "Evaluation",
              before: "আন্দাজে design যাচাই করা, আর আশা করা যে review-তে বড় সমস্যাগুলো ধরা পড়বে।",
              after: "১০টা heuristic ধরে গোছানো critique, severity দেওয়া, sprint planning-এর জন্য তৈরি।",
            },
            {
              area: "Research",
              before: "৮ ঘণ্টার affinity mapping। চারদিকে post-it। নতুন কেউ এলেই theme বদলে যায়।",
              after: "৪৫ মিনিট। কাঁচা note paste করুন, synthesis চালান, তারপর theme-গুলো যাচাই করে প্রশ্ন তুলুন।",
            },
          ],
          structuralShift:
            "আপনি যা paste বা upload করেন, Claude শুধু সেটুকুই দেখে, আর সব কাজ হয় কথার মধ্যে। কথোপকথনে প্রশ্নের মুখে পড়া আর review meeting-এ প্রশ্নের মুখে পড়া, দুটো একেবারে আলাদা অভিজ্ঞতা।",
          appliesTo: [
            { slug: "set-up-claude", short: "Setup" },
            { slug: "decode-a-brief", short: "Brief বোঝা" },
            { slug: "write-a-sharper-brief", short: "Brief লেখা" },
            { slug: "evaluate-your-designs", short: "Design যাচাই" },
            { slug: "heuristic-evaluation", short: "Heuristic eval" },
            { slug: "research-synthesis", short: "Research" },
          ],
        },
        {
          id: "desktop",
          label: "Desktop app-এ",
          nickname: "সক্রিয় সহকর্মী",
          tagline:
            "যে ডিজাইনার Mac বা Windows-এ Claude app ব্যবহার করেন। Claude তাঁর brief, note আর export-এর folder পড়ে, আর কাজ চলার সময়েই প্রশ্ন তোলে।",
          env: "Mac বা Windows",
          entryPath: [
            "Claude desktop app খুলুন",
            "একটা Project বানান",
            "আপনার file-এর একটা folder দিন",
            "আপনার working agreement paste করুন",
          ],
          shifts: [
            {
              area: "Research",
              before: "Interview note হাতে হাতে chat window-এ copy-paste করা, session-এর পর session।",
              after: "Note-গুলো all-notes.md হিসেবে save করুন। Claude file-টা সরাসরি পড়ে পুরো set-এর ওপর synthesis চালায়।",
            },
            {
              area: "Figma handoff",
              before: "Spec export করা, chat খোলা, সব paste করা, context আবার বোঝানো।",
              after: "Export-গুলো project folder-এ save করুন। Claude সেখানেই token, layer-এর নাম আর annotation পড়ে নেয়।",
            },
            {
              area: "Brief বোঝা",
              before: "শুরু থেকে brief বোঝানো। Paste করা। Background যোগ করা। User-দের কথা আবার বলা।",
              after: "brief.md আগে থেকেই folder-এ আছে। Claude সেটা পড়ে, Figma খোলার আগেই ২০টা প্রশ্ন করে।",
            },
          ],
          structuralShift:
            "Critique-এর সময়টা design শেষ হওয়ার পর (review meeting) থেকে সরে আসে design চলার মাঝে (working session)। আগেই নেওয়া সিদ্ধান্ত নিয়ে আর তর্ক করতে হয় না।",
          appliesTo: [
            { slug: "set-up-claude", short: "Setup" },
            { slug: "decode-a-brief", short: "Brief বোঝা" },
            { slug: "write-a-sharper-brief", short: "Brief লেখা" },
            { slug: "evaluate-your-designs", short: "Design যাচাই" },
            { slug: "heuristic-evaluation", short: "Heuristic eval" },
            { slug: "figma-for-ai-handoff", short: "AI handoff-এর জন্য Figma" },
            { slug: "research-synthesis", short: "Research" },
          ],
        },
      ],
    },
    process: {
      heading: "কোনটা কোন কাজ ধরে",
      lead: "Web যা পারে desktop app-ও তার সবই পারে, আর আপনার file পড়তে পারে বলে Direction আর Handoff-ও ধরে। Build আর Ship-এর জন্য Claude Code লাগে, যেটা desktop app-এর Code tab-এ চলে।",
      legend: { added: "Desktop app-এ নতুন", inherited: "Web-এও আছে", none: "নেই" },
      stages: ["Brief", "Research", "Direction", "Frames", "Critique", "Handoff", "Build", "Ship"],
      layers: [
        {
          id: "web",
          label: "Web",
          sublabel: "claude.ai",
          addedLabel: "শুরুর ভিত্তি",
          description:
            "সব কাজ কথার মধ্যে। Brief নিয়ে প্রশ্ন করে, research-এর synthesis করে, design-এর critique করে। আপনি যা paste বা upload করেন, Claude সেটা দেখে।",
        },
        {
          id: "desktop",
          label: "Desktop app",
          sublabel: "Mac বা Windows",
          addedLabel: "+ Direction, Handoff",
          description:
            "আপনার computer-এর একটা folder থেকে file পড়ে। Frame-এ যাওয়ার আগেই direction নিয়ে প্রশ্ন তোলে। Handoff-এর প্রস্তুতির জন্য Figma export পড়ে।",
        },
      ],
    },
    strip: {
      heading: "Claude-এর সাথে একজন ডিজাইনারের দিন",
      slots: [
        { time: "08:00", label: "Brief", title: "Figma খোলার আগে brief-কে প্রশ্ন করুন" },
        { time: "10:00", label: "Research", title: "Competitor আর user-এর কথা থেকে pattern বের করুন" },
        { time: "12:00", label: "Critique", title: "আপনার wireframe নিয়ে দ্বিতীয় একটা মত নিন" },
        { time: "14:00", label: "Handoff", title: "কয়েক মিনিটে developer-দের spec লিখুন" },
        { time: "17:00", label: "প্রস্তুতি", title: "কালকের client feedback আগেই আন্দাজ করুন" },
      ],
    },
    cards: {
      heading: "আপনার পথ বেছে নিন",
      introBefore: "Claude-এর সাথে কাজের দুটো জায়গা। আপনারটা বেছে নিলে সেখানে চলে এমন",
      introCount: "{n}টা guide",
      introAfter: "দেখতে পাবেন।",
      open: "খুলুন",
      isNew: "নতুন",
      difficulty: { beginner: "নতুনদের জন্য", intermediate: "মাঝারি" },
      journeys: [
        {
          id: "desktop",
          label: "Desktop app-এ",
          env: "Mac বা Windows",
          tagline: "Claude desktop app। আপনার file-এর একটা folder পড়তে পারে।",
          note: "Brief, interview note আর Figma export-এর একটা folder Claude-কে দেখিয়ে দিন। আপনি paste করার অপেক্ষা না করে Claude সেগুলো সরাসরি পড়বে।",
          clusters: ["ভিত্তি", "Brief-এর কাজ", "Evaluation", "Production", "Research আর automation"],
        },
        {
          id: "web",
          label: "Web-এ",
          env: "claude.ai",
          tagline: "যেকোনো browser-এ claude.ai খুলুন। কিছু install করতে হবে না।",
          note: "যা নিয়ে কাজ করছেন সেটা paste বা upload করুন। একটা Project আপনার working agreement আর file এক জায়গায় রাখে, প্রতিটা conversation জুড়ে।",
          clusters: ["ভিত্তি", "Brief-এর কাজ", "Evaluation", "Research আর automation"],
        },
      ],
      codeTabHeading: "যখন code ship করতে চান",
      codeTabLead:
        "এই দুটো guide আসল code বানায়, তাই এগুলো সাধারণ conversation-এ না, Claude desktop app-এর Code tab-এ (Claude Code) চলে। Git আগে ব্যবহার না করে থাকলে Git দিয়ে শুরু করুন।",
    },
    gettingStarted: {
      heading: "শুরু করবেন যেভাবে",
      lead: "তিনটা ধাপ, প্রথমটায় লাগে ১০ মিনিট।",
      steps: [
        {
          title: "কোথায় কাজ করবেন বেছে নিন",
          body: "যেকোনো browser-এ claude.ai, কিছু install করতে হবে না। অথবা Mac বা Windows-এর Claude desktop app, যদি চান Claude আপনার file-এর folder পড়ুক। দুই জায়গাতেই একই guide চলে।",
        },
        {
          title: "আপনার working agreement লিখুন",
          body: "Guide 1 আপনাকে ১০ মিনিটে এটা করিয়ে দেবে। এক টুকরো লেখা, যেটা Claude-কে বলে আপনি কে, কাদের জন্য design করেন, আর output কীভাবে চান। প্রতিটা session সেখান থেকে শুরু হয়।",
          cta: "Guide 1 শুরু করুন",
        },
        {
          title: "আজকের কাজের সাথে মেলে এমন যেকোনো guide বেছে নিন",
          body: "কাল brief kickoff? Guide 2। পরের সপ্তাহে heuristic eval? Guide 5। প্রতিটা guide নিজে নিজেই সম্পূর্ণ। প্রথমটার পর কোনো ক্রম মানতে হবে না।",
          cta: "সব guide দেখুন",
        },
      ],
    },
    why: {
      heading: "ডিজাইনাররা আসলে যে কাজ করেন, তার জন্য বানানো",
      paragraphs: [
        "Claude-এর বেশিরভাগ guide developer-দের জন্য লেখা। ধরে নেওয়া হয় আপনি code লিখবেন, test চালাবেন, বা infrastructure বানাবেন। সেটা আপনার কাজ হলে কাজে লাগে। না হলে বিরক্তিকর।",
        "ডিজাইনাররা প্রতিদিন Claude ব্যবহার করেন: research-এর summary করা, brief নিয়ে লড়াই করা, এমন feedback পাওয়ার চেষ্টা যেটা শুধু “ভালো লাগছে” না। কিন্তু default output generic হয়, কারণ Claude জানে না যে আপনি কম দামের Android phone-এ প্রথমবার app ব্যবহার করা মানুষের জন্য design করেন, যাদের কাছে দাম বড় ব্যাপার। Claude শুধু জানে আপনি প্রশ্ন নিয়ে আসা একজন মানুষ।",
        "এই guide-গুলো সেটা ঠিক করে। এগুলো বানানো হয়েছে UX আর UI ডিজাইনাররা কাজে আসলে যা করেন তা ঘিরে: যে brief অস্পষ্ট হয়ে আসে, sprint-এর আগে যে evaluation করতেই হবে, শুক্রবারের মধ্যে যে research synthesis জমা দিতে হবে, handoff-এর পরও যে Figma file টিকে থাকতে হবে।",
        "Guide 1 দিয়ে শুরু করে আপনার working agreement লিখুন। তারপর আজকের কাজের সাথে যেটা মেলে, সেই guide বেছে নিন।",
      ],
    },
  },
};
