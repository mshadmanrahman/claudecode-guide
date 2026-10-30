import type { TeacherGuide } from "@/lib/teacher-guides";
import type { Translation } from "@/lib/i18n/bn/tutorials";

export const BN_TEACHER_GUIDES_T1: Partial<Record<string, Translation<TeacherGuide>>> = {
  "write-lesson-plans-with-claude": {
    sourceHash: "933b1b6434382ab8",
    translatedAt: "2026-10-31",
    content: {
      title: "Claude দিয়ে lesson plan লিখুন",
      slug: "write-lesson-plans-with-claude",
      duration: "১০ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["lesson-planning"],
      description:
        "একটা topic আর একটা learning objective থেকে পুরো, গোছানো একটা lesson plan বানিয়ে নিন। যেকোনো subject, যেকোনো class-এর জন্য কাজ করে।",
      intro:
        "Claude এক মিনিটের কম সময়ে পুরো একটা lesson plan লিখে দিতে পারে, তবে শুধু তখনই, যখন আপনি ঠিক input দেন। অস্পষ্ট prompt দিলে plan-ও অস্পষ্ট আসে। এই guide দেখাবে ঠিক কী কী দিতে হবে, যাতে যা বের হয় সেটা আপনি সত্যিই ক্লাসে ব্যবহার করতে পারেন।",
      situation: {
        scene:
          "সামনে একটা নতুন unit আসছে। কী পড়াবেন তার মোটামুটি ধারণা আছে, কিন্তু বিস্তারিত plan এখনও লেখা হয়নি।",
        outcome:
          "এই guide শেষ করলে আপনার হাতে থাকবে পুরো একটা lesson plan template, যেটা আপনি যে topic-ই দেন, Claude ভরে দিতে পারবে।",
      },
      outcomes: [
        "৫ মিনিটের কম সময়ে পুরো একটা lesson plan",
        "একটা reusable prompt template, যেটা প্রতিটা নতুন lesson-এ ব্যবহার করতে পারবেন",
        "পড়ানোর যে অংশগুলো Claude করতে পারে না, সেগুলোর জন্য বেশি সময়",
      ],
      promptContrast: {
        bad: "ভগ্নাংশ নিয়ে একটা lesson plan লিখে দিন",
        good: "Class 5-এর একটা 45 মিনিটের গণিত ক্লাসের জন্য lesson plan লিখে দিন, যেখানে প্রথমবার সমতুল ভগ্নাংশ (equivalent fractions) শেখানো হবে। আমার student-রা একই হরের ভগ্নাংশ যোগ-বিয়োগ করতে পারে। Learning objective: student-রা visual model দিয়ে সমতুল ভগ্নাংশ চিনতে আর বানাতে পারবে। রাখুন: warm-up (5 মিনিট), direct instruction (15 মিনিট), guided practice (15 মিনিট), independent practice (8 মিনিট), exit ticket (2 মিনিট)। একটা গোছানো table আকারে দিন।",
        why: "Subject, class, আগের জ্ঞান, learning objective আর সময়ের ভাগ পেলে Claude এমন একটা lesson plan লিখতে পারে, যেটা একজন শিক্ষক সত্যিই ব্যবহার করবেন।",
      },
      steps: [
        {
          title: "শুরুর আগে পাঁচটা input ঠিক করে নিন",
          description:
            "Claude খোলার আগে এই পাঁচটা জিনিস হাতে রাখুন। এর যেকোনো একটা বাদ পড়লে plan generic হয়ে যায়।",
          list: [
            "Subject: subject-এর ঠিক কোন অংশ (শুধু \"গণিত\" নয়, \"সমতুল ভগ্নাংশ\")",
            "Class বা grade: যাতে Claude কঠিনতা আর শব্দ ঠিকমতো মেলাতে পারে",
            "আগের জ্ঞান: এই topic-এর সঙ্গে জড়িত কী কী student-রা আগে থেকেই পারে",
            "Learning objective: ক্লাস শেষে student-রা মাপা যায় এমন একটা নির্দিষ্ট কাজ পারবে",
            "ক্লাসের সময়: মোট সময়, আর থাকলে প্রতিটা অংশের জন্য কত মিনিট",
          ],
        },
        {
          title: "নিজের content বসিয়ে structured prompt-টা ব্যবহার করুন",
          description:
            "নিচের template copy করুন আর উদাহরণের জায়গায় নিজের content বসান। এই format যেকোনো subject আর যেকোনো class-এ কাজ করে।",
          code: {
            snippet: `[Class] [Subject]-এর [সময়] মিনিটের একটা ক্লাসের জন্য lesson plan লিখে দিন। Topic: [নির্দিষ্ট topic]।

আগের জ্ঞান: [student-রা আগে থেকে কী পারে]
Learning objective: [মাপা যায় এমন একটা outcome]

এই অংশগুলো আনুমানিক সময়সহ রাখুন:
- Warm-up ([X] মিনিট)
- Direct instruction ([X] মিনিট)
- Guided practice ([X] মিনিট)
- Independent practice ([X] মিনিট)
- Exit ticket ([X] মিনিট)

একটা গোছানো table আকারে দিন, column হবে: সময় | Activity | শিক্ষক যা করবেন | Student-রা যা করবে | যা যা লাগবে`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Class 5-এর একটা 45 মিনিটের গণিত ক্লাসের জন্য lesson plan লিখে দিন, যেখানে প্রথমবার সমতুল ভগ্নাংশ (equivalent fractions) শেখানো হবে। আমার student-রা একই হরের ভগ্নাংশ যোগ-বিয়োগ করতে পারে। Learning objective: student-রা visual model দিয়ে সমতুল ভগ্নাংশ চিনতে আর বানাতে পারবে। রাখুন: warm-up (5 মিনিট), direct instruction (15 মিনিট), guided practice (15 মিনিট), independent practice (8 মিনিট), exit ticket (2 মিনিট)। একটা গোছানো table আকারে দিন।",
              },
              {
                role: "claude",
                text: "এই নিন আপনার Class 5-এর সমতুল ভগ্নাংশের lesson plan:\n\n| সময় | Activity | শিক্ষক যা করবেন | Student-রা যা করবে | যা যা লাগবে |\n|------|----------|-------------|------------|----------|\n| 5 মিনিট | Warm-up: ভগ্নাংশ মনে করা | Fraction wall দেখিয়ে জিজ্ঞেস করুন: \"কী খেয়াল করছ?\" | চেনা ভগ্নাংশগুলোর নাম বলবে | Fraction wall poster |\n| 15 মিনিট | Direct instruction | Fraction strip দিয়ে 1/2 = 2/4 = 4/8 দেখান। \"লব আর হরকে একই সংখ্যা দিয়ে গুণ করো\" কথাটা ব্যবহার করুন | দেখবে, খাতায় note নেবে, প্রশ্ন করবে | Fraction strip, ছোট whiteboard |\n| 15 মিনিট | Guided practice | একসঙ্গে 3টা উদাহরণ করুন, ধীরে ধীরে সাহায্য কমিয়ে আনুন | জোড়ায় বসে করবে, কেন এমন হলো ব্যাখ্যা করবে | Worksheet set A |\n| 8 মিনিট | Independent practice | ঘুরে ঘুরে দেখুন, ভুল ধারণাগুলো note করুন | নিজে নিজে 6টা অঙ্ক করবে | Worksheet set B |\n| 2 মিনিট | Exit ticket | কাগজগুলো জমা নিন | 3/4-এর একটা সমতুল ভগ্নাংশ লিখবে আর কীভাবে বুঝল তা বলবে | Exit ticket কাগজ |\n\nযারা আগে শেষ করবে তাদের জন্য একটা challenge task, বা যাদের সাহায্য লাগবে তাদের জন্য একটা scaffold যোগ করে দেব?",
                delay: 800,
              },
            ],
          },
        },
        {
          title: "Claude-কে বলুন plan-টা differentiate করতে",
          description:
            "মূল plan হাতে আসার পর একটা follow-up prompt দিলেই আলাদা আলাদা level-এর student-দের জন্য material যোগ হয়ে যায়।",
          code: {
            snippet: `যারা আগে শেষ করবে তাদের জন্য একটা challenge task আর যাদের সাহায্য লাগবে তাদের জন্য একটা scaffold যোগ করুন। দুটোই একই learning objective-এর সঙ্গে মিলিয়ে রাখুন।`,
            language: "text",
          },
        },
        {
          title: "আরও গভীর exit ticket প্রশ্নের জন্য আলাদা prompt দিন",
          description:
            "শেষ মুহূর্তে তাড়াহুড়ো করে লেখা exit ticket সাধারণত খুব সহজ হয়। আলাদা একটা prompt দিলে এমন প্রশ্ন আসে, যা থেকে সত্যিই বোঝা যায় student-রা কী বুঝেছে।",
          code: {
            snippet: `সমতুল ভগ্নাংশের এই lesson-এর জন্য 3টা exit ticket প্রশ্ন লিখুন। একটা মনে করার প্রশ্ন, একটা প্রয়োগের প্রশ্ন, আর একটা প্রশ্ন যেটা একটা common ভুল ধারণা বের করে আনে। Class 5-এর student। প্রতিটা প্রশ্ন এক বাক্যে রাখুন।`,
            language: "text",
          },
        },
      ],
      nextLink: {
        label: "Claude দিয়ে quiz-এর প্রশ্ন বানান",
        href: "/bn/for-teachers/create-quiz-questions-with-claude",
      },
    },
  },

  "create-quiz-questions-with-claude": {
    sourceHash: "51d75277d40ff480",
    translatedAt: "2026-10-31",
    content: {
      title: "Claude দিয়ে quiz আর পরীক্ষার প্রশ্ন বানান",
      slug: "create-quiz-questions-with-claude",
      duration: "৫ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["assessment"],
      description:
        "যেকোনো topic-এর জন্য কয়েক সেকেন্ডে MCQ, short-answer আর রচনামূলক প্রশ্ন বানিয়ে নিন। ফাঁকা question bank-এর দিকে আর তাকিয়ে থাকতে হবে না।",
      intro:
        "ভালো assessment প্রশ্ন লিখতে অনেক সময় লাগে। আপনি নিজে দুটো প্রশ্ন লিখতে যে সময় নেন, Claude সেই সময়ে পুরো একটা question bank বানিয়ে দিতে পারে। আসল কথা হলো, ঠিক কোন mix-এর প্রশ্ন চান আর কোন cognitive level-এ চান, সেটা পরিষ্কার করে বলা।",
      situation: {
        scene:
          "সামনের সপ্তাহে unit test, আর question bank-এ 4টা topic মিলিয়ে 30টা প্রশ্ন লাগবে।",
        outcome:
          "এই guide শেষ করলে আপনার কাছে এমন একটা পদ্ধতি থাকবে, যেটা দিয়ে হাতে টাইপ করার চেয়েও দ্রুত নানা ধরনের, মানসম্মত প্রশ্ন বানাতে পারবেন।",
      },
      outcomes: [
        "যেকোনো topic-এর পুরো question bank ৫ মিনিটের কম সময়ে",
        "ঠিক কঠিনতায় নানা ধরনের প্রশ্নের mix",
        "এমন প্রশ্ন, যা খুব বেশি edit না করেই ব্যবহার করতে পারবেন",
      ],
      promptContrast: {
        bad: "সালোকসংশ্লেষণ নিয়ে কিছু quiz প্রশ্ন দিন",
        good: "Class 9-এর জীববিজ্ঞানের student-দের (বয়স 13-14) জন্য সালোকসংশ্লেষণ নিয়ে 10টা quiz প্রশ্ন বানান। Mix: 4টা MCQ (প্রতিটায় 4টা option, একটাই স্পষ্টভাবে সঠিক), 3টা short-answer (2-3 বাক্যে উত্তর), 2টা application প্রশ্ন (নতুন কোনো পরিস্থিতিতে concept-টা প্রয়োগ), আর 1টা diagram-labelling প্রশ্নের বর্ণনা। Bloom's taxonomy অনুযায়ী কঠিনতা recall থেকে application পর্যন্ত থাকবে। কোনো trick প্রশ্ন দেবেন না।",
        why: "প্রশ্নের ধরন, student-দের বয়স, কঠিনতার ভাগ আর taxonomy level বলে দিলে Claude ঠিক বোঝে আপনার কেমন assessment দরকার।",
      },
      steps: [
        {
          title: "Prompt দেওয়ার আগে প্রশ্নের ধরনের mix ঠিক করুন",
          description:
            "আলাদা ধরনের প্রশ্ন আলাদা জিনিস যাচাই করে। আগে mix ঠিক করুন, তারপর prompt-এ প্রতিটা ধরনের জন্য নির্দিষ্ট সংখ্যা লিখে দিন।",
          list: [
            "MCQ: দ্রুত খাতা দেখা যায়, মনে রাখা আর বোঝা যাচাইয়ে ভালো, তবে সহজেই খারাপভাবে লেখা হয় (\"উপরের সবগুলো\" এড়িয়ে চলুন)",
            "Short-answer: student-কে শুধু চিনলে হয় না, নিজে লিখতে হয়; একইভাবে নম্বর দেওয়া তুলনামূলক কঠিন",
            "বড় উত্তর বা রচনা: যুক্তি সাজানো আর বিভিন্ন ধারণা মেলানো যাচাই করে, খাতা দেখতে সময় লাগে",
            "Application প্রশ্ন: student আগে দেখেনি এমন পরিস্থিতিতে concept-টা প্রয়োগ করে",
            "Diagram-ভিত্তিক: বিজ্ঞান, ভূগোল আর যেকোনো visual subject-এ কাজে লাগে",
          ],
        },
        {
          title: "Bloom's taxonomy level বলে দিন",
          description:
            "Prompt-এ cognitive level-এর নাম লিখে দেওয়াই সবচেয়ে বেশি ফল দেয়। AI-এর বানানো বেশিরভাগ প্রশ্ন নিজে থেকে recall level-এ থাকে। আপনার প্রায়ই application বা analysis level লাগে।",
          code: {
            snippet: `Class 7-এর ভূগোলের student-দের জন্য পানিচক্র নিয়ে 8টা প্রশ্ন বানান।
- 3টা recall প্রশ্ন (Bloom's: Remember) -- term-এর সংজ্ঞা বা চিহ্নিত করা
- 3টা comprehension প্রশ্ন (Bloom's: Understand) -- কেন বা কীভাবে, ব্যাখ্যা করা
- 2টা application প্রশ্ন (Bloom's: Apply) -- concept দিয়ে বাস্তব জীবনের একটা উদাহরণ ব্যাখ্যা করা

শুধু MCQ। প্রতিটায় 4টা option। কোনো trick প্রশ্ন নয়।`,
            language: "text",
          },
        },
        {
          title: "নির্দিষ্ট প্রশ্নগুলো দেখে ঠিক করে নিন",
          description:
            "প্রথমবারেই Claude সব প্রশ্ন ঠিক করে খুব কমই দেয়। পুরো set আবার বানানোর বদলে follow-up prompt দিয়ে আলাদা আলাদা প্রশ্ন ঠিক করুন।",
          list: [
            "\"3 নম্বর প্রশ্নটা আরও কঠিন করুন। এখন এটা recall level-এ আছে, application level-এ নিয়ে যান।\"",
            "\"7 নম্বর প্রশ্নে দুটো উত্তরই ঠিক মনে হতে পারে। এমনভাবে আবার লিখুন যাতে একটাই স্পষ্ট সঠিক উত্তর থাকে।\"",
            "\"শুধু বাষ্পীভবন নিয়ে পঞ্চম একটা প্রশ্ন যোগ করুন। বাকিগুলোর মতো একই format-এ।\"",
          ],
        },
        {
          title: "Claude-কে একটা marking guide লিখতে বলুন",
          description:
            "Short-answer আর রচনামূলক প্রশ্নের জন্য marking guide থাকলে সময় বাঁচে, আর নম্বর দেওয়াও বেশি consistent হয়। একটা prompt-ই যথেষ্ট।",
          code: {
            snippet: `ওপরের 3টা short-answer প্রশ্নের জন্য একটা marking guide লিখুন। প্রতিটা প্রশ্নের জন্য: আদর্শ উত্তর (2-3 বাক্য), যে key term-গুলো উত্তরে থাকা উচিত, আর 1 নম্বর / 2 নম্বর / 3 নম্বরের criteria।`,
            language: "text",
          },
        },
      ],
      nextLink: {
        label: "Claude দিয়ে grading rubric লিখুন",
        href: "/bn/for-teachers/write-grading-rubrics-with-claude",
      },
    },
  },

  "write-grading-rubrics-with-claude": {
    sourceHash: "d76122c0df78ec3a",
    translatedAt: "2026-10-31",
    content: {
      title: "Claude দিয়ে grading rubric লিখুন",
      slug: "write-grading-rubrics-with-claude",
      duration: "১০ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["assessment"],
      description:
        "যেকোনো assignment-এর জন্য পরিষ্কার, consistent rubric বানিয়ে নিন: রচনা, project, presentation বা lab report।",
      intro:
        "একটা ভালো rubric দুটো কাজ করে: জমা দেওয়ার আগেই student-রা বোঝে আপনি কী চাইছেন, আর আপনার খাতা দেখা দ্রুত হয় এবং নম্বরের পক্ষে যুক্তি দেখানো সহজ হয়। আপনার criteria থেকে Claude কয়েক মিনিটে একটা draft বানিয়ে দিতে পারে।",
      situation: {
        scene:
          "আপনি একটা রচনা লিখতে দিয়েছেন, আর এখন ঠিক কীভাবে নম্বর দেবেন সেটা বুঝিয়ে বলতে হবে। আপনি এমন কিছু চান যা ন্যায্য আর কাজের।",
        outcome:
          "এই guide শেষ করলে আপনার কাছে এমন পরিষ্কার একটা rubric থাকবে, যেটা জমা দেওয়ার আগেই student-দের দিয়ে দিতে পারবেন।",
      },
      outcomes: [
        "যেকোনো assignment-এর জন্য কয়েক মিনিটে professional একটা rubric",
        "Consistent, যুক্তিসঙ্গত criteria, যা student-রা বোঝে",
        "একটা template, যেটা সারা বছর একই রকম assignment-এ বদলে বদলে ব্যবহার করতে পারবেন",
      ],
      promptContrast: {
        bad: "একটা রচনার জন্য rubric লিখে দিন",
        good: "Class 11-এর ইংরেজি রচনার জন্য একটা rubric বানান। বিষয়: student-এর পছন্দের একটা উপন্যাসে ক্ষমতা (power)-র theme। Assessment criteria: যুক্তি ও thesis (30%), প্রমাণ ও বিশ্লেষণ (30%), গঠন ও বিন্যাস (20%), ভাষা ও প্রকাশভঙ্গি (20%)। চারটা performance level: Excellent, Proficient, Developing, Beginning। প্রতিটা criterion আর level-এর জন্য 2-3টা নির্দিষ্ট, চোখে দেখা যায় এমন descriptor লিখুন। এমন table আকারে দিন যেটা student-দের দিতে পারি।",
        why: "Criteria, weighting, grade level আর নির্দিষ্ট descriptor থাকলে output এমন হয়, যেটা আপনি সরাসরি student-এর হাতে দিতে পারেন।",
      },
      steps: [
        {
          title: "Prompt দেওয়ার আগে assessment criteria আর weighting-এর list করুন",
          description:
            "Claude-এর শুরুতেই আপনার criteria লাগবে। এখনও ঠিক না করে থাকলে, common assignment-গুলোর জন্য শুরু করার মতো একটা কাঠামো নিচে দেওয়া হলো।",
          list: [
            "রচনা: যুক্তি/thesis, প্রমাণ ও বিশ্লেষণ, গঠন, ভাষা ও প্রকাশভঙ্গি",
            "Project: research-এর মান, উপস্থাপন, দলগত কাজ (group হলে), সৃজনশীলতা বা মৌলিকতা",
            "Presentation: content-এর নির্ভুলতা, বলার ধরন ও স্পষ্টতা, visual aid, প্রশ্নের উত্তর",
            "Lab report: hypothesis, পদ্ধতি, ফলাফল ও বিশ্লেষণ, উপসংহার ও মূল্যায়ন",
            "সৃজনশীল লেখা: ভাবনা ও মৌলিকতা, গঠন ও কাহিনি, চরিত্র বা পটভূমি, ভাষা ও স্টাইল",
          ],
        },
        {
          title: "কয়টা performance level লাগবে, ঠিক করুন",
          description:
            "সহজ assignment-এ তিনটা level ভালো কাজ করে। জটিল কাজে চার বা পাঁচটা level দিলে আরও সূক্ষ্মভাবে ভাগ করা যায়। Prompt-এ level-গুলোর নাম লিখে দিন।",
          code: {
            snippet: `Class 8-এর বিজ্ঞানের lab report-এর জন্য একটা rubric বানান। Assessment criteria:
- Hypothesis (20%): যুক্তিসহ স্পষ্ট অনুমান
- পদ্ধতি (25%): যৌক্তিক ধাপ, controlled variable চিহ্নিত
- ফলাফল ও বিশ্লেষণ (35%): নির্ভুলভাবে data লেখা, graph ব্যাখ্যা
- উপসংহার (20%): hypothesis-এর সঙ্গে মেলানো, সীমাবদ্ধতা স্বীকার

চারটা performance level: Excellent (A), Proficient (B), Developing (C), Beginning (D)।
প্রতিটা criterion আর level-এর জন্য: 2টা নির্দিষ্ট, চোখে দেখা যায় এমন descriptor।
Table আকারে দিন। Descriptor এমনভাবে লিখুন যাতে student নিজেই নিজেকে যাচাই করতে পারে।`,
            language: "text",
          },
        },
        {
          title: "Descriptor student-দের জন্য নাকি আপনার নম্বরের রেকর্ডের জন্য, বলে দিন",
          description:
            "Student-দের জন্য লেখা descriptor সরাসরি তাকে উদ্দেশ করে আর কাজের ভাষায় লেখা হয় (\"তোমার thesis স্পষ্টভাবে বলে...\")। আপনার নম্বরের রেকর্ডের descriptor হয় বেশি নিরপেক্ষ। কোনটা লাগবে, Claude-কে বলুন।",
          list: [
            "Student-দের জন্য: \"প্রতিটা descriptor সরাসরি student-কে উদ্দেশ করে লিখুন, যেন তার সঙ্গে কথা বলছেন\"",
            "নম্বর দেওয়ার জন্য: \"প্রতিটা descriptor তৃতীয় পুরুষে, চোখে দেখা যায় এমন বক্তব্য হিসেবে লিখুন\"",
            "দুটোই: \"দুটো version লিখুন: একটা rubric-এর student-দের version-এর জন্য, একটা আমার marking note-এর জন্য\"",
          ],
        },
        {
          title: "Claude-কে প্রতিটা level-এর নমুনা কাজের বর্ণনা দিতে বলুন",
          description:
            "বাস্তবে \"Excellent\" মানে কী, student-রা প্রায়ই সেটা বুঝতে পারে না। Concrete উদাহরণ থাকলে এই ফাঁক জমা দেওয়ার আগেই পূরণ হয়, পরে নয়।",
          code: {
            snippet: `ওপরের rubric-এর "যুক্তি ও thesis" criterion-এর জন্য, চারটা performance level-এর প্রতিটায় একজন student-এর আসল উত্তর কেমন দেখায় তা বর্ণনা করুন। প্রতিটা level-এ 2-3 বাক্য। এতটা concrete রাখুন যাতে Class 11-এর একজন student বুঝতে পারে তার draft কোন level-এ পড়ে।`,
            language: "text",
          },
        },
      ],
      nextLink: {
        label: "Claude দিয়ে student-দের feedback দিন",
        href: "/bn/for-teachers/give-student-feedback-with-claude",
      },
    },
  },

  "give-student-feedback-with-claude": {
    sourceHash: "2c9ea16615030e86",
    translatedAt: "2026-10-31",
    content: {
      title: "Claude দিয়ে দ্রুত student feedback লিখুন",
      slug: "give-student-feedback-with-claude",
      duration: "১৫ মিনিট",
      difficulty: "intermediate",
      availableRoutes: ["assessment", "communication"],
      description:
        "খাতার পাশে লেখা ছোট note আর আপনার মনের ধারণা থেকে পুরো লিখিত feedback বানিয়ে নিন। Claude draft করে, আপনি ঘষেমেজে ঠিক করেন। রচনা, project আর report-এর মন্তব্যে কাজ করে।",
      intro:
        "প্রতিটা কাজ নিয়ে আপনি কী ভাবছেন, তা আপনি আগে থেকেই জানেন। ধীর অংশটা হলো সেটা লিখে ফেলা। এই guide আপনাকে এমন একটা workflow দেবে, যেখানে আপনার ছোট note-গুলো গোছানো feedback হয়ে যায়, আপনাকে শুরু থেকে পুরো বাক্য লিখতে হয় না।",
      situation: {
        scene:
          "সামনে 30টা রচনার খাতা দেখার আছে। প্রতিটা নিয়ে আপনার মত কী, জানেন, কিন্তু সব লিখে ফেলতে কয়েক ঘণ্টা লাগে।",
        outcome:
          "এই guide শেষ করলে আপনার কাছে খাতা দেখার এমন একটা workflow থাকবে, যেখানে কয়েক সেকেন্ডে আপনার note পুরো feedback হয়ে যায়।",
      },
      outcomes: [
        "ছোট note থেকে কয়েক সেকেন্ডে পুরো লিখিত feedback",
        "সব student-এর জন্য একই রকম tone আর কাঠামো",
        "মন্তব্য লেখার বদলে আসল পড়ানোর জন্য বাড়তি সময়",
      ],
      promptContrast: {
        bad: "এই রচনার জন্য feedback লিখে দিন",
        good: "জলবায়ু পরিবর্তন নিয়ে Class 10-এর এক student-এর রচনার ওপর আমার note: শুরুটা শক্তিশালী, thesis স্পষ্ট। Para 2-তে পরিসংখ্যানের ভালো ব্যবহার। Para 3-এর যুক্তি দুর্বল, প্রমাণ ছাড়া দাবি করেছে। উপসংহার thesis-এর সঙ্গে মেলেনি। লেখা পরিষ্কার, তবে কিছু জায়গায় বেশি informal। এই note-গুলোকে সহায়ক, নির্দিষ্ট tone-এ পুরো লিখিত feedback-এ রূপ দিন। 150-200 শব্দ। শেষে পরের রচনার জন্য একটা কাজ বলে দিন, যেটায় সে মন দেবে।",
        why: "বিচারটা আপনার note-এই আছে। Prompt শুধু Claude-কে তার কাজ বলে দেয়: note-গুলোকে এমন বাক্যে রূপ দাও, যা student পড়ে কাজে লাগাতে পারে।",
      },
      steps: [
        {
          title: "প্রতিটা কাজ পড়ার সময় ছোট ছোট shorthand note লিখুন",
          description:
            "পুরো বাক্য লেখার দরকার নেই। যত দ্রুত আপনার প্রথম ধারণাগুলো লিখে ফেলতে পারবেন, এই workflow তত দ্রুত চলবে। সংক্ষেপ আর ভাঙা ভাঙা বাক্য চলবে।",
          list: [
            "চিহ্ন ব্যবহার করুন: শক্তির জন্য +, দুর্বলতার জন্য -, অস্পষ্টের জন্য ?",
            "Paragraph নম্বর লিখুন: \"P2 প্রমাণ ভালো, P3-এ source নেই\"",
            "Student-কে কী অন্যভাবে করতে বলবেন, লিখে রাখুন: \"পরের বার: আগে topic sentence\"",
            "কোনো pattern চোখে পড়লে লিখুন: \"প্রতিটা paragraph quote দিয়ে শুরু, নিজের বিশ্লেষণ আরও লাগবে\"",
          ],
        },
        {
          title: "Context সহ note-গুলো Claude-এ paste করুন",
          description:
            "আপনি যে context দেন, তা থেকে Claude বোঝে ভাষার ধরন, কে পড়বে, আর কত লম্বা হবে। এই তিনটাই output-কে অনেকখানি বদলে দেয়।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "জলবায়ু পরিবর্তন নিয়ে Class 10-এর এক student-এর রচনার ওপর আমার note:\n\nশুরুটা শক্তিশালী, thesis স্পষ্ট। Para 2-তে পরিসংখ্যানের ভালো ব্যবহার। Para 3-এর যুক্তি দুর্বল, প্রমাণ ছাড়া দাবি করেছে। উপসংহার thesis-এর সঙ্গে মেলেনি। লেখা পরিষ্কার, তবে কিছু জায়গায় বেশি informal।\n\nএই note-গুলোকে সহায়ক, নির্দিষ্ট tone-এ পুরো লিখিত feedback-এ রূপ দিন। 150-200 শব্দ। শেষে পরের রচনার জন্য একটা কাজ বলে দিন, যেটায় সে মন দেবে।",
              },
              {
                role: "claude",
                text: "তোমার শুরুর অংশটা এই রচনার সবচেয়ে শক্তিশালী জায়গাগুলোর একটা। তোমার thesis স্পষ্ট আর নির্দিষ্ট, তাই পুরো যুক্তি দাঁড় করানোর জন্য একটা মজবুত ভিত তৈরি হয়েছে।\n\nদ্বিতীয় paragraph-এর পরিসংখ্যানগুলো ভালো কাজ করেছে। তুমি এমন প্রমাণ বেছেছ যা সরাসরি তোমার কথাকে সমর্থন করে, আর যেভাবে সেটা লেখায় মিশিয়েছ, তাতে বোঝা যায় যুক্তিতে data কীভাবে ব্যবহার করতে হয় তা তুমি জানো।\n\nতৃতীয় paragraph-এ এসে রচনার গতি কিছুটা কমে যায়। তুমি একটা জোরালো দাবি করেছ, কিন্তু সেটার পক্ষে প্রমাণ দরকার। কোনো source বা উদাহরণ না থাকলে পাঠককে শুধু তোমার কথার ওপর ভরসা করতে হয়, আর academic রচনায় এতে যুক্তি দুর্বল হয়ে যায়। তোমার উপসংহারও শুরুর thesis-এর সঙ্গে আরেকটু ঘনিষ্ঠভাবে মেলানো দরকার।\n\nপুরো লেখা জুড়ে তোমার ভাষা পরিষ্কার আর সহজে পড়া যায়, এটা সত্যিই তোমার শক্তি। পরের রচনার জন্য: নতুন paragraph-এ যাওয়ার আগে দেখে নাও, তুমি যত দাবি করেছ তার প্রতিটার পক্ষে অন্তত একটা প্রমাণ আছে কি না। শুধু এই একটা অভ্যাসই তোমার মোট নম্বরে চোখে পড়ার মতো পার্থক্য আনবে।",
                delay: 600,
              },
            ],
          },
        },
        {
          title: "নির্দিষ্ট student-এর জন্য দেখে ঠিক করে নিন",
          description:
            "Claude একজন generic student-এর জন্য লেখে। এই student-কে আপনি চেনেন। তার পরিস্থিতি, আগের কাজ, বা তার যা শোনা দরকার, তার সঙ্গে যা মেলে না, বদলে দিন।",
          list: [
            "Student যদি পিছিয়ে থাকে: সমালোচনা নরম করুন, যা ভালো হয়েছে সেটা দিয়ে বেশি শুরু করুন",
            "Student যদি পারে কিন্তু চেষ্টা কম করে: কাজটা আরও ধারালো আর সরাসরি বলুন",
            "এমন একটা নির্দিষ্ট কথা যোগ করুন যা Claude জানতে পারে না: \"তোমার আগের রচনার তুলনায় এটা অনেক উন্নতি\"",
            "যা শুনে মনে হয় সবার জন্য লেখা, এই মানুষটার জন্য নয়, সেটা কেটে দিন",
          ],
        },
        {
          title: "সবচেয়ে জরুরি কাজটার জন্য একটা 'next step' prompt দিন",
          description:
            "Feedback লেখা শেষ হলে আরেকটা prompt দিয়ে ওই student-এর জন্য সবচেয়ে বেশি ফল দেবে এমন একটা কাজ বের করে নিন।",
          code: {
            snippet: `ওপরের note-গুলোর ভিত্তিতে, পরের রচনার জন্য এই student-এর সবচেয়ে জরুরি কোন একটা জিনিসে মন দেওয়া উচিত? এক বাক্যে বলুন। এতটা নির্দিষ্ট করে বলুন যাতে সে ঠিক বোঝে কী অন্যভাবে করতে হবে।`,
            language: "text",
          },
        },
        {
          title: "Report লেখার জন্য: সব note একসঙ্গে জমিয়ে একবারে process করুন",
          description:
            "Report-এর মন্তব্য একটা চেনা কাঠামো মেনে চলে। প্রতিটা student-এর note হাতে থাকলে, আপনি নিজে তিনটা লিখতে যে সময় নেন, তার চেয়ে কম সময়ে Claude পুরো ক্লাসের draft মন্তব্য বানিয়ে দিতে পারে।",
          code: {
            snippet: `Class 8-এর ইংরেজি বিষয়ের 5 জন student-এর জন্য report-এর মন্তব্য লাগবে। প্রতিটা student-এর জন্য আমি দেব: নাম, সার্বিক performance level, 2-3টা শক্তির দিক, আর উন্নতির 1টা জায়গা। প্রতিটা note-কে 60 শব্দের একটা report মন্তব্যে রূপ দিন। Tone আন্তরিক কিন্তু নির্দিষ্ট। প্রতিটা মন্তব্য student-এর নাম দিয়ে শুরু করুন।

Student 1: Amara। প্রত্যাশিত level-এ আছে। শক্তি: paragraph-এর গঠন পরিষ্কার, অনেক পড়ে। উন্নতি: আরও সমৃদ্ধ শব্দভান্ডার।
Student 2: James। প্রত্যাশিত level-এর ওপরে আছে। শক্তি: গভীর বিশ্লেষণ, জোরালো thesis statement। উন্নতি: সময় বাঁধা পরীক্ষায় বানান।`,
            language: "text",
          },
        },
      ],
      nextLink: {
        label: "Claude দিয়ে অভিভাবকদের email লিখুন",
        href: "/bn/for-teachers/write-parent-emails-with-claude",
      },
    },
  },
};
