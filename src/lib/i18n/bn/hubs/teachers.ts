import type { TeachersHubCopy } from "@/lib/hubs/teachers";
import type { Translation } from "@/lib/i18n/bn/tutorials";

/** Bangla copy for /bn/for-teachers. Mirrors `TEACHERS_HUB` key for key. */
export const BN_TEACHERS_HUB: Translation<TeachersHubCopy> = {
  sourceHash: "51368e665c107e7a",
  translatedAt: "2026-10-30",
  content: {
    hero: {
      headline: "আপনি plan করেন, পড়ান, যাচাই করেন।",
      headlineMuted: "কাগজের কাজটা Claude সামলাবে।",
      lead: "প্রতি সপ্তাহে শিক্ষকদের অনেক ঘণ্টা যায় এমন কাজে যেটা পড়ানো না: lesson plan লেখা, quiz-এর প্রশ্ন বানানো, অভিভাবককে email লেখা, খাতা দেখে feedback দেওয়া। এই guide-গুলো দেখায় এসব কাজে Claude কীভাবে ব্যবহার করবেন, যাতে আপনার সময়টা আবার ক্লাসরুমে ফেরে।",
      journeys: [
        {
          id: "lesson-planning",
          label: "Lesson planning",
          tagline: "Plan, activity আর unit",
          note: "Topic থেকে গোছানো lesson plan, কয়েক মিনিটে। যেকোনো বিষয়, যেকোনো class।",
        },
        {
          id: "assessment",
          label: "Assessment",
          tagline: "প্রশ্ন, rubric, feedback",
          note: "Quiz-এর প্রশ্ন, marking rubric, আর ছাত্রছাত্রীদের কাজের ওপর লেখা feedback।",
        },
        {
          id: "communication",
          label: "যোগাযোগ",
          tagline: "Email আর report",
          note: "অভিভাবকের email, report-এর মন্তব্য আর স্পর্শকাতর বার্তা, আপনার জন্য draft করা।",
        },
      ],
      ctaPrimary: "Lesson planning দিয়ে শুরু করুন",
      ctaSecondary: "সব guide দেখুন",
    },
    demo: {
      folder: "Class 7 বিজ্ঞান",
      prompt: "Class 7-এর জন্য পানিচক্র নিয়ে ৪৫ মিনিটের একটা lesson plan করে দিন",
      reply:
        "**শুরু (৫ মিনিট):** জানালার বৃষ্টির পানি কোথা থেকে এল?\n**মূল অংশ (২৫ মিনিট):** চক্রের প্রতিটা ধাপ label করুন, তারপর চারটা group-এ অভিনয় করে দেখান।\n**যাচাই (১০ মিনিট):** পাঁচটা ছোট প্রশ্ন, উত্তরসহ।\n**শেষ (৫ মিনিট):** বাষ্পীভবন নিয়ে প্রত্যেকে এক বাক্য।",
    },
    strip: {
      heading: "Claude-এর সাথে একজন শিক্ষকের দিন",
      slots: [
        { time: "08:00", label: "সকাল", title: "আজ ছাত্রছাত্রীরা কোথায় আটকাবে, আগেই বুঝে নিন" },
        { time: "10:00", label: "Assessment", title: "কয়েক মিনিটে quiz-এর প্রশ্ন আর rubric বানান" },
        { time: "12:00", label: "যোগাযোগ", title: "অভিভাবকদের জন্য সহানুভূতিশীল, পরিষ্কার update লিখুন" },
        { time: "14:00", label: "Planning", title: "প্রত্যেক ছাত্রছাত্রীর মতো করে activity সাজান" },
        { time: "17:00", label: "Feedback", title: "রচনার ওপর আরও ভালো feedback দিন, আরও তাড়াতাড়ি" },
      ],
    },
    cards: {
      heading: "আপনার কাজের জায়গা বেছে নিন",
      introBefore: "তিনটা জায়গায় Claude শিক্ষকদের সবচেয়ে বেশি সময় বাঁচায়। একটা বেছে নিলে সেই কাজের",
      introCount: "{n}টা guide",
      introAfter: "দেখতে পাবেন।",
      open: "খুলুন",
      difficulty: { beginner: "নতুনদের জন্য", intermediate: "মাঝারি" },
      journeys: [
        {
          id: "lesson-planning",
          label: "Lesson planning",
          tagline: "Plan আর activity",
          note: "Claude-কে topic, class আর learning objective দিন। Plan-টা Claude বানাবে।",
          cluster: "Planning",
        },
        {
          id: "assessment",
          label: "Assessment",
          tagline: "প্রশ্ন, rubric, feedback",
          note: "প্রশ্নের bank, marking rubric, আর আপনার bullet-point note থেকে লেখা feedback।",
          cluster: "Assessment",
        },
        {
          id: "communication",
          label: "যোগাযোগ",
          tagline: "Email আর report",
          note: "অভিভাবকের email, স্পর্শকাতর বার্তা আর report-এর মন্তব্য, এক মিনিটের কম সময়ে draft।",
          cluster: "যোগাযোগ",
        },
      ],
    },
    gettingStarted: {
      heading: "শুরু করবেন যেভাবে",
      lead: "কিছু install করতে হবে না, কোনো setup নেই। আপনার planning doc-এর পাশে একটা browser tab খুললেই চলবে।",
      needHeading: "যা লাগবে",
      need: ["claude.ai-তে একটা free Claude account", "একটা browser", "কোনো technical setup লাগবে না: যেকোনো browser-এ চলে"],
      tierNote:
        "এখানকার সব guide শেষ করতে Claude-এর free plan-ই যথেষ্ট। প্রতিদিন Claude ব্যবহার করলে Pro ($20/month) নিলে ব্যবহারের সীমা উঠে যায়।",
      howHeading: "কীভাবে কাজ করে",
      how: [
        "আপনার কাজের পাশে Claude.ai খুলুন।",
        "কী বানাতে চান, সেটা লিখে বলুন।",
        "Claude-এর লেখাটা copy করুন।",
        "অন্য যেকোনো resource-এর মতো edit করে ব্যবহার করুন।",
      ],
      cta: "Guide 1 দিয়ে শুরু করুন: Lesson plan",
    },
  },
};
