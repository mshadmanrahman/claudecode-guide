import type { Tutorial } from "@/lib/tutorials";
import type { Translation } from "@/lib/i18n/bn/tutorials";

export const BN_TUTORIALS_G3: Partial<Record<string, Translation<Tutorial>>> = {
  "job-application-assistant": {
    sourceHash: "1610bc9d26bb3a78",
    translatedAt: "2026-10-06",
    content: {
      title: "২০ মিনিটে একটা Job Application Assistant বানান",
      slug: "job-application-assistant",
      duration: "২০ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "ide"],
      description:
        "Job description আর আপনার background paste করুন। যেকোনো role-এর জন্য পাবেন match analysis, tailored cover letter আর interview prep।",
      intro:
        "বেশিরভাগ cover letter generic হয়, কারণ প্রতিটা application ঠিকমতো tailor করতে এক ঘণ্টা লেগে যায়। Matching, gap analysis আর first draft Claude কয়েক মিনিটেই করে দিতে পারে, তাই আপনার সময় যাবে interview-এ, কাগজপত্রে নয়। যেকোনো role, যেকোনো level-এ এটা কাজ করে।",
      steps: [
        {
          title: "Job description paste করুন",
          description:
            'পুরো job description copy করুন: requirement, responsibility, আর "about us" অংশ থাকলে সেটাও। Claude যত বেশি তথ্য পাবে, match analysis তত ভালো হবে।',
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি একটা Senior Product Manager role-এ apply করতে চাই। আমার application-টা tailor করতে help করবেন?",
              },
              {
                role: "claude",
                text: 'হ্যাঁ। শুধু আপনার এখনকার CV polish না করে, চলুন কাজটা ঠিকভাবে করি।\n\nআগে পুরো job description paste করুন ("about the company" অংশ থাকলে সেটাসহ)। আপনার background দেখার আগেই আমি বের করব ওরা আসলে কোন signal খুঁজছে। তাহলে আমি শুধু summary না করে সত্যিকারের matching করতে পারব।',
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "একটা Senior PM role-এ apply করতে help চাই। Job description দিয়ে শুরু করছি।",
              },
              {
                role: "claude",
                text: "পুরো JD paste করুন: requirement, responsibility, about the company। আপনার background দেখার আগে আমি বের করব ওরা আসলে কী খুঁজছে।",
              },
            ],
          },
        },
        {
          title: "Claude-কে job description decode করতে দিন",
          description:
            "আপনার CV দেওয়ার আগেই Claude JD পড়ে বের করে hiring manager আসলে কী নিয়ে ভাবেন, মানে bullet point-গুলোর আড়ালে লুকানো signal।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: 'Series B fintech-এ Senior PM role। JD-তে লেখা: 5+ বছরের PM experience, B2B SaaS product-এ experience, 0→1 product launch lead করেছেন, data আর SQL basics-এ comfortable, strong stakeholder management, financial services client নিয়ে কাজের experience থাকলে plus। কোম্পানিতে 80 জন, কিছুদিন আগে $30M raise করেছে, নিজেদের বলে "fast-moving and scrappy"।',
              },
              {
                role: "claude",
                text: 'লাইনগুলোর আড়ালে আমি যা পড়ছি:\n\n**ওরা আসলে যা চাইছে**:\n• "Led 0→1 launches" = ওদের এমন কাউকে দরকার যিনি ambiguity সামলাতে পারেন আর যার playbook লাগে না। Interview-এ এটা বারবার আসবে।\n• "Comfortable with SQL basics" = ওরা এমন PM চায় যিনি data-র প্রশ্নে bottleneck হবেন না। Analyst হওয়ার দরকার নেই, কিন্তু নিজের কাজ নিজে চালাতে পারতে হবে।\n• 80 জনের fintech-এ "Stakeholder management" = সম্ভবত strong opinion-ওয়ালা engineer আর founder সামলানো, বড় কোম্পানির hierarchy নয়।\n• "Financial services clients a plus" = domain knowledge নিয়ে ওরা চিন্তিত। আপনার থাকলে সেটা দিয়েই শুরু করুন। না থাকলে, ওরা খেয়াল করবে না ভেবে বসে না থেকে নিজে থেকেই বিষয়টা address করুন।\n\n**Vibe**: Series B-তে "fast-moving and scrappy" মানে ওরা growth mode-এ, কিন্তু এখনো process-এ ভারী হয়নি। ওরা এমন কাউকে চায় যিনি ship করেন, শুধু নিয়ম চালান না।\n\nএবার আপনার background paste করুন। আমি এই নির্দিষ্ট signal-গুলোর সঙ্গে মেলাব।',
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: 'JD: Series B fintech-এ Senior PM, 80 জন, $30M raise করেছে। Requirement: 5+ বছর PM, B2B SaaS, 0→1 launch lead করা, SQL basics, stakeholder management, fintech experience থাকলে plus। "Fast-moving and scrappy"।',
              },
              {
                role: "claude",
                text: 'লাইনগুলোর আড়ালে যা আছে:\n\n• **0→1 launches** = ambiguity সামলাতে পারা, playbook লাগবে না\n• **SQL basics** = data-তে নিজে চলতে পারা, query-র জন্য engineer-দের আটকে রাখবেন না\n• **80 জনের কোম্পানিতে stakeholder mgmt** = opinionated founder/engineer সামলানো, corporate hierarchy নয়\n• **Fintech a plus** = domain নিয়ে দুশ্চিন্তা, আপনার না থাকলে নিজে থেকেই address করুন\n• **"Scrappy"** = নিয়ম চালানোর চেয়ে ship করা বেশি জরুরি\n\nআপনার background paste করুন। আমি এই signal-গুলোর সঙ্গে মেলাব।',
              },
            ],
          },
        },
        {
          title: "আপনার background paste করুন",
          description:
            "আপনার CV, LinkedIn summary, বা শুধু আপনার role আর মূল achievement-গুলোর একটা list দিন। কোথায় strong match আর কোন gap address করতে হবে, Claude সেটা বের করবে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমার background: product-এ 7 বছর। এখন একটা B2B HR tech কোম্পানিতে Senior PM (300 জন)। একদম শূন্য থেকে নতুন একটা employee engagement module launch lead করেছি, 18 মাসে 0 থেকে $2M ARR। Data-তে comfortable, রোজ Mixpanel আর Amplitude use করি, ad hoc query-র জন্য basic SQL করেছি। Fintech-এ সরাসরি experience নেই, তবে enterprise HR client নিয়ে কাজ করেছি (CHRO-level stakeholder)। আগের role ছিল একটা SaaS startup-এ PM (40 জন)।",
              },
              {
                role: "claude",
                text: '**Match Analysis**\n\n✅ Strong match:\n• 7 বছরের PM experience (requirement: 5+)\n• আসল metric-সহ 0→1 launch (18 মাসে $2M ARR), এটাই আপনার মূল গল্প\n• Data-তে comfort (Mixpanel, Amplitude, SQL), data requirement সরাসরি পূরণ করে\n• আগের startup experience (40 জন), "scrappy" culture-এর সঙ্গে সরাসরি relevant\n\n⚠️ আংশিক match:\n• Stakeholder management: CHRO-level experience দারুণ, কিন্তু সেটা HR, fintech নয়। এভাবে reframe করুন: "প্রতিষ্ঠানের ভেতরে senior, non-technical buyer-দের কাছে জটিল software বিক্রি করা"। এই skill অন্য industry-তেও কাজে লাগে।\n\n❌ যে gap address করতে হবে:\n• Fintech experience নেই: ওদের "a plus"-এর মধ্যে শুধু এটাই আপনার নেই। Cover letter-এ নিজে থেকেই address করুন: আপনার enterprise client experience-কে এমনভাবে দেখান যে regulated, ঝুঁকি এড়িয়ে চলা buyer-দের আপনি সামলাতে পারেন। দুটো একই জিনিস, এমন ভান করবেন না। দেখান যে আপনি dynamic-টা বোঝেন।\n\n**সব মিলিয়ে**: Strong candidate। 0→1 গল্পটাই আপনার ভিত্তি। ওটা দিয়েই শুরু করুন।',
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "আমার background: 7 বছর PM। এখন B2B HR tech-এ Sr PM (300 জন)। নতুন module 0→1 launch lead করেছি, 18 মাসে $2M ARR। Mixpanel/Amplitude/basic SQL use করি। Fintech নেই, তবে CHRO-level enterprise client নিয়ে কাজ করেছি। আগে: 40 জনের SaaS startup-এ PM।",
              },
              {
                role: "claude",
                text: "**Match**:\n✅ 7 বছর (req: 5+)\n✅ Metric-সহ 0→1 (18 মাসে $2M ARR), এটাই আপনার headline\n✅ Data-তে comfort (Mixpanel, SQL)\n✅ ছোট startup-এর experience (scrappy culture-এ fit)\n⚠️ CHRO stakeholder = senior, non-technical buyer, অন্য জায়গায়ও কাজে লাগে কিন্তু reframe করতে হবে\n❌ Fintech নেই: নিজে থেকেই address করুন, এড়িয়ে যাবেন না\n\n**0→1 গল্প দিয়ে শুরু করুন। এটাই আপনার সবচেয়ে বড় শক্তি।**",
              },
            ],
          },
        },
        {
          title: "Tailored cover letter বানান",
          description:
            "Claude এমন একটা cover letter লেখে যেটা আপনার সবচেয়ে strong signal-গুলোকে ওরা ঠিক যা খুঁজছে তার সঙ্গে মেলায়। Generic self-introduction নয়।",
          appDemo: {
            steps: [
              { role: "user", text: "Cover letter-টা লিখে দিন।" },
              {
                role: "claude",
                text: 'প্রিয় [Hiring Manager],\n\nআমি সাত বছর ধরে B2B SaaS product বানাচ্ছি, যার শেষ চার বছর 300 জনের একটা HR tech কোম্পানিতে product lead করছি। এই সময়ে যে কাজটা নিয়ে আমি সবচেয়ে গর্বিত, সেটা হলো একটা employee engagement module-কে একদম ফাঁকা whiteboard থেকে 18 মাসে $2M ARR-এ নিয়ে যাওয়া। সেই পুরো পথটা (কী বানানো ঠিক হবে তা বের করা, তারপর সেটা বানানোর জন্য ঠিক team গড়া) ঠিক সেই ধরনের কাজ, যা আমি [Company]-তে করতে চাই।\n\nকয়েকটা নির্দিষ্ট কারণে আমি এই role নিয়ে confident:\n\n**দ্রুত বদলানো পরিবেশে 0→1**: Engagement module-এর কোনো playbook ছিল না। আমরা দ্রুত discovery চালিয়েছি, কাজ না করা দুটো feature direction বাদ দিয়েছি, আর এমন একটা MVP ship করেছি যা প্রথম quarter-এ 40টা enterprise client adopt করেছে। Ambiguity-তে আমি comfortable, আর আগের কোনো উদাহরণ না থাকলেও "done" দেখতে কেমন, তা আমি জানি।\n\n**Data-driven, কিন্তু analyst-এর ওপর নির্ভরশীল নই**: আমি রোজ নিজেই Mixpanel আর Amplitude analysis চালাই, ad hoc প্রশ্নের জন্য basic SQL লিখি, আর prioritization decision নেওয়ার জন্য data pull-এর অপেক্ষায় খুব কমই বসে থাকি। Decision নিতে data ব্যবহার করা আর আগেই নেওয়া decision-কে justify করতে data ব্যবহার করার পার্থক্য আমি জানি।\n\n**Enterprise client experience**: বড় enterprise-এর CHRO-level buyer-দের সঙ্গে কাজ করেছি, যারা ঝুঁকি এড়িয়ে চলেন, compliance নিয়ে সচেতন, আর যাদের procurement cycle লম্বা। Fintech-এ সরাসরি এটা করিনি, কিন্তু dynamic-টা একই রকম: regulated industry-র buyer-দের trust জেতা একটা skill, আর সেটা আমি তৈরি করেছি।\n\n[Company]-তে এই experience কীভাবে কাজে লাগাতে পারি, তা নিয়ে কথা বলতে পারলে খুশি হব। আমি [তারিখ/সময়]-এ available।\n\n[আপনার নাম]',
              },
            ],
          },
          ideDemo: {
            steps: [
              { role: "user", text: "Cover letter-টা লিখে দিন।" },
              {
                role: "claude",
                text: "প্রিয় [Hiring Manager],\n\nB2B SaaS product-এ সাত বছর, সবশেষে একটা 0→1 module launch lead করেছি, concept থেকে 18 মাসে $2M ARR। [Company]-তে আমি এই ধরনের কাজই করতে চাই।\n\nএই role-এ আমি সরাসরি তিনটা জিনিস নিয়ে আসি:\n\n**0→1 experience**: কোনো playbook ছিল না, ঠিক direction পাওয়ার আগে দুটো direction বাদ দিয়েছি, launch-এর প্রথম quarter-এ 40টা enterprise client। আগের উদাহরণ না থাকলেও কীভাবে বানাতে হয়, আমি জানি।\n\n**Data-তে নিজে চলতে পারা**: রোজ Mixpanel আর Amplitude, ad hoc query-র জন্য SQL। Decision নিতে আমি data pull-এর অপেক্ষায় থাকি না।\n\n**Enterprise buyer experience**: CHRO-level stakeholder, ঝুঁকি এড়িয়ে চলা, compliance-সচেতন, লম্বা cycle। Fintech-এ সরাসরি নয়, কিন্তু dynamic-টা একই রকম।\n\nকথা বলতে পারলে খুশি হব। Available [তারিখ]।\n\n[আপনার নাম]",
              },
            ],
          },
        },
        {
          title: "Interview-এর top ৩টা উত্তর prep করুন",
          description:
            "Claude-কে বলুন কোন প্রশ্নগুলো আপনাকে নিশ্চিতভাবে করা হবে তা আন্দাজ করতে, আর আপনার আসল experience দিয়ে strong উত্তর সাজাতে help করতে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "কোন তিনটা interview প্রশ্ন আমাকে নিশ্চিতভাবে করবে, আর সেগুলোর উত্তর কীভাবে দেব?",
              },
              {
                role: "claude",
                text: '**প্রশ্ন 1: "আপনার launch করা একটা 0→1 product-এর কথা বলুন।"**\nএটাই আপনার সবচেয়ে বড় শক্তি। পুরোপুরি কাজে লাগান। Structure: Situation (ফাঁকা whiteboard, কোনো playbook নেই) → Discovery (কী শিখেছেন, কী বাদ দিয়েছেন) → Launch (কীভাবে ship করেছেন) → Outcome ($2M ARR, 40টা client)। যে detail-টা অবশ্যই রাখবেন: কী বাদ দিয়েছেন আর কেন। এটা শুধু execution না, আপনার judgment-এর signal দেয়।\n\n---\n\n**প্রশ্ন 2: "আপনি ঠিক বলে মনে হলে stakeholder-দের pushback কীভাবে সামলান?"**\nআসলে জানতে চাওয়া হচ্ছে: "Strong opinion-ওয়ালা founder আর engineer-দের আপনি কি সামলাতে পারবেন?" একটা নির্দিষ্ট গল্প দিয়ে উত্তর দিন। সবচেয়ে ভালো উত্তর মেনে নেয় যে আপনি সব সময় নিশ্চিত জানেন না আপনিই ঠিক, তবে decision-টাকে কীভাবে যুক্তি দিয়ে মজবুত করতে হয়, সেটা জানেন। Opinion-নির্ভর তর্ককে personal না বানিয়ে data আর user evidence দিয়ে কীভাবে ঠান্ডা করেন, সেটা বলুন।\n\n---\n\n**প্রশ্ন 3: "আপনার fintech experience নেই, কীভাবে দ্রুত শিখে নেবেন?"**\nএটা ওরা জিজ্ঞেস করবেই। Defensive হবেন না। উত্তর দিন: "আমি এর মধ্যেই শুরু করেছি, [আপনার করা নির্দিষ্ট কিছু, যেমন [regulation] নিয়ে পড়েছি, [person]-এর সঙ্গে কথা বলেছি]। তার চেয়েও বড় কথা, regulated industry-র enterprise buyer-দের সঙ্গে কাজের experience থাকায় আমি dynamic-টা বুঝি। ঝুঁকি এড়িয়ে চলা buyer-রা কীভাবে software যাচাই করেন, আমি জানি, আর এটাও জানি যে fintech customer-রা HR client-দের মতোই কাজ করেন, এমন ধরে নেওয়া যাবে না। শুরুতে নির্দিষ্ট কিছু বিষয়ে ভুল হবে; মূল বিষয়গুলোতে ভুল হবে না।"',
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "যে তিনটা interview প্রশ্ন নিশ্চিতভাবে আসবে, আর সেগুলোর উত্তর কীভাবে দেব।",
              },
              {
                role: "claude",
                text: '**Q1: "একটা 0→1 launch-এর পুরো গল্পটা বলুন।"**\nEngagement module-টা ব্যবহার করুন। যা যা বলবেন: ফাঁকা শুরু → কী বাদ দিয়েছেন → কীভাবে ship করেছেন → $2M ARR। কী বাদ দিয়েছেন, সেটা অবশ্যই রাখুন। ওটাই judgment-এর signal।\n\n**Q2: "Engineer/founder-দের pushback কীভাবে সামলান?"**\nওরা জানতে চাইছে hierarchy-র আড়ালে না লুকিয়ে আপনি opinionated মানুষদের সামলাতে পারেন কি না। উত্তর: গল্প + data/evidence দিয়ে উত্তেজনা কমানো + বিষয়টা personal না রেখে যুক্তিনির্ভর করা।\n\n**Q3: "আপনার fintech experience নেই।"**\nএটা ওরা বলবেই। Defensive হবেন না। "আমি এর মধ্যেই [নির্দিষ্ট কাজ] শুরু করেছি। Enterprise client experience থাকায় regulated industry-র buyer-দের আমি বুঝি। শুরুতে খুঁটিনাটিতে ভুল হবে। মূল বিষয়ে ভুল হবে না।"',
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "আপনার workflow-এর জন্য প্রথম CLAUDE.md বানান",
        href: "/tutorials/your-first-claude-md",
      },
    },
  },
  "personal-finance-manager": {
    sourceHash: "6d048a458dea684c",
    translatedAt: "2026-10-06",
    content: {
      title: "২০ মিনিটে একটা Personal Finance Manager বানান",
      slug: "personal-finance-manager",
      duration: "২০ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "ide"],
      description:
        "আপনার খরচের data paste করুন। পাবেন একটা breakdown, honest analysis, savings plan আর monthly review template, কোনো spreadsheet ছাড়াই।",
      intro:
        "বেশিরভাগ মানুষের একটা আবছা ধারণা থাকে যে কিছু জিনিসে খরচ বেশি হচ্ছে, আর কিছুতে কম। Personal finance review সেই আবছা ধারণাটাকে পরিষ্কার সংখ্যায় নিয়ে আসে। Claude আপনার খরচ analyze করতে পারে, যে pattern-গুলো আপনি এড়িয়ে যাচ্ছিলেন সেগুলো খুঁজে বের করতে পারে, আর একটা plan বানাতে help করতে পারে। কোনো judgment ছাড়া, আর finance-এ degree ছাড়াই।",
      steps: [
        {
          title: "আপনার financial context set করুন",
          description:
            "শুরুতে Claude-কে basic তথ্যগুলো দিন (income, fixed খরচ, আর আপনি কী achieve করতে চান)। এটা কোনো bank-এর জন্য নয়। এতে Claude বাঁধাধরা budgeting উপদেশের বদলে আপনার কাজে লাগে এমন advice দিতে পারবে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি আমার personal finance-টা control-এ আনতে চাই। আমার খরচ analyze করে একটা savings plan বানাতে help করবেন?",
              },
              {
                role: "claude",
                text: 'হ্যাঁ, চলুন generic না রেখে সত্যিই কাজে লাগে এমনভাবে করি।\n\nকাজের advice দিতে আমার কয়েকটা basic তথ্য লাগবে:\n1. মাসে মোটামুটি হাতে কত পান (tax কাটার পরে)\n2. প্রতি মাসের fixed খরচ, যা বদলায় না (rent/mortgage, loan-এর কিস্তি, subscription)\n3. আপনি কী চান (emergency fund, নির্দিষ্ট কিছুর জন্য saving, debt শোধ, নাকি শুধু "খরচ কম, টাকা বেশি")\n\nএটাকে আমরা সত্যিকারের financial review হিসেবে দেখব, নিজেকে দোষ দেওয়ার জায়গা হিসেবে নয়। শুধু সংখ্যা, কোনো judgment নয়।',
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "আমি একটা personal finance review চাই। আমার খরচ analyze করুন, টাকা কোথায় বেরিয়ে যাচ্ছে খুঁজে বের করুন, একটা savings plan বানান।",
              },
              {
                role: "claude",
                text: "চলুন ঠিকভাবে করি। আমার লাগবে:\n1. মাসিক take-home income\n2. Fixed খরচ (rent, loan, standing order)\n3. আপনার goal (emergency fund, নির্দিষ্ট goal, debt শোধ, নাকি সার্বিক control)\n\nতারপর আপনার খরচের data paste করুন, আমি analysis বানিয়ে দেব।",
              },
            ],
          },
        },
        {
          title: "আপনার খরচের data দিন",
          description:
            "Bank statement copy করুন, transaction-এর list paste করুন, অথবা category ধরে আন্দাজে লিখুন। আপনার কাছে যতটুকু detail আছে, Claude সেটা দিয়েই কাজ করবে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Take-home: £3,800/মাস। Fixed খরচ: rent £1,200, student loan £180, phone £45, gym £45। Goal: মাসে £500 save করা। আমি 3 বছরের মধ্যে বাড়ির deposit জমাতে চাই।\n\nগত মাসের খরচ মোটামুটি: Groceries £320, বাইরে খাওয়া/takeaway £380, Coffee shop £95, Uber/transport £140, Amazon/online shopping £260, Streaming service £48, Night out £220, কাপড়চোপড় £180, অন্যান্য/random £150।",
              },
              {
                role: "claude",
                text: "হিসাব করছি...\n\n**Fixed খরচের পরে income**: £3,800 - £1,470 (fixed) = **£2,330 হাতে থাকে**\n**গত মাসের আসল খরচ**: £1,793\n**Surplus**: £537 (technically আপনি এখনই £500 target-এর কাছাকাছি)\n\nকিন্তু honest ছবিটা এমন:\n\n| Category | গত মাস | হাতে থাকা টাকার % | Flag |\n|---|---|---|---|\n| Groceries | £320 | 14% | Normal |\n| বাইরে খাওয়া / takeaway | £380 | 16% | ⚠️ বেশি |\n| Coffee shop | £95 | 4% | একবার দেখা দরকার |\n| Transport | £140 | 6% | Normal |\n| Amazon/online shopping | £260 | 11% | ⚠️ বেশি |\n| Streaming | £48 | 2% | ঠিক আছে |\n| Night out | £220 | 9% | Lifestyle choice |\n| কাপড়চোপড় | £180 | 8% | ⚠️ প্রতি মাসে হলে বেশি |\n| অন্যান্য/random | £150 | 6% | Track করা দরকার |\n\n**অস্বস্তিকর সত্যিটা**: খাবারে আপনার খরচ (groceries + বাইরে খাওয়া + coffee) মাসে £795, হাতে থাকা income-এর 34%। টাকার বড় অংশ এখানেই যাচ্ছে।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Take-home: £3,800। Fixed খরচ: rent £1,200, loan £180, phone £45, gym £45। Goal: 3 বছরে বাড়ির deposit-এর জন্য মাসে £500 save। খরচ: groceries £320, বাইরে খাওয়া £380, coffee £95, Uber £140, Amazon £260, streaming £48, night out £220, কাপড় £180, অন্যান্য £150।",
              },
              {
                role: "claude",
                text: "হিসাব হয়ে গেছে:\n\nFixed খরচের পরে হাতে থাকে: £2,330\nমোট variable খরচ: £1,793\nSurplus: £537 (আপনি আগে থেকেই target-এর কাছাকাছি)\n\n⚠️ বেশি খরচের category:\n• মোট খাবার (grocery + বাইরে খাওয়া + coffee): £795, হাতে থাকা income-এর 34%\n• Amazon/online: £260, সাধারণত এটাই কমানো সবচেয়ে সহজ\n• কাপড়: £180, প্রতি মাসে হলে বেশি\n\nDeposit-এর হিসাব: £500/মাস × 36 মাস = 3 বছরে £18,000, interest বাদে। Reality check: আপনার কি এই সাইজের deposit-ই লাগবে? Plan বানানোর আগে এটা check করে নিই।",
              },
            ],
          },
        },
        {
          title: "Honest analysis নিন",
          description:
            "আপনার টাকার আসলে কী হচ্ছে, Claude সেটাই বলে। আপনি যা শুনতে চান তা নয়, data যা দেখায় তা।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমাকে honest analysis দিন। আমার টাকা কোথায় বেরিয়ে যাচ্ছে?",
              },
              {
                role: "claude",
                text: '**Honest Analysis**\n\n**আসল সমস্যা খাবারের খরচ, যাদের সন্দেহ করছিলেন তারা নয়**\nখাবারে আপনি মাসে £795 খরচ করছেন (groceries + বাইরে খাওয়া + coffee)। এটা প্রায় ঠিক আপনার হাতে থাকা income-এর তিন ভাগের এক ভাগ। বাইরে খাওয়ায় £380 বিশেষ করে বেশি। এটা আসলে দ্বিতীয় একটা grocery bill, তবে restaurant-এর দামে। এটা কোনো moral judgment নয়। এটাই শুধু সবচেয়ে বড় সংখ্যা।\n\n**Amazon-এ একবারে বড় কেনাকাটা নয়, টাকা বেরোয় ধীরে ধীরে**\nAmazon-এ £260 মানে নিয়মিত ছোট ছোট কেনাকাটা, যেগুলো আলাদাভাবে তুচ্ছ মনে হয় কিন্তু জমে বড় হয়। এটা classic "invisible spend"। আসলে কী কী কিনেছেন, একবার audit করে দেখুন।\n\n**আপনি savings target-এর কাছাকাছি, কিন্তু একদম টায়টায়**\n£537 surplus শুনতে ভালো, কিন্তু "অন্যান্য/random £150" প্রায় নিশ্চিতভাবে বোঝায় যে কিছু মাসে এই হিসাব ভেঙে যাচ্ছে। বাস্তবে প্রতি 2–3 মাসে হঠাৎ খরচ আসে (গাড়ি, travel, জন্মদিনের gift ইত্যাদি)।\n\n**কাপড়ের সংখ্যাটার context দরকার**\nযদি শুধু এই মাসেই কাপড় কেনা হয়ে থাকে, তাহলে ঠিক আছে। যদি প্রতি মাসে হয়, তাহলে বছরে £2,160, যেটা বেশ বড় সংখ্যা।\n\n**এর মানে**: সবকিছু কাটতে হবে না। একটা জিনিস ভালোভাবে কমাতে হবে। খাবারেই হাত দিলে সবচেয়ে বেশি ফল পাবেন।',
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "আমাকে honest analysis দিন। টাকা কোথায় যাচ্ছে?",
              },
              {
                role: "claude",
                text: '**Honest ছবি**\n\n1. **খাবারই মূল leak**: মোট £795/মাস (groceries + বাইরে খাওয়া + coffee) = হাতে থাকা income-এর 34%। বাইরে খাওয়ার £380 মানে restaurant-এর দামে দ্বিতীয় একটা grocery bill।\n\n2. **Amazon হলো invisible spend**: £260 ছোট ছোট কেনাকাটায়, যেগুলো খরচ বলে মনেই হয় না। জমে বড় হওয়ার classic pattern।\n\n3. **আপনার surplus নড়বড়ে**: £537 দেখতে ভালো, কিন্তু "অন্যান্য £150" মানে হঠাৎ খরচের মাসগুলোতে (travel, gift, repair) এটা প্রায়ই ভেঙে যাবে।\n\n4. **সবকিছু কাটার দরকার নেই।** খাবারের খরচ মাসে ~£150–200 কমাতে হবে। নড়বড়ে আর শক্ত হিসাবের মধ্যে পার্থক্য এটুকুই।',
              },
            ],
          },
        },
        {
          title: "Savings plan বানান",
          description:
            "Analysis-কে একটা concrete মাসিক plan-এ পরিণত করুন, এমন target দিয়ে যা বাস্তবে সম্ভব, শুধু স্বপ্নের নয়।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমাকে একটা realistic savings plan বানিয়ে দিন। আমি প্রতি মাসে consistently £500 জমাতে চাই, শুধু ভালো মাসগুলোতে না।",
              },
              {
                role: "claude",
                text: '**আপনার Savings Plan**\n\n**Target**: প্রতি মাসে £500 save, consistently (শুধু ভালো মাসে নয়)\n\n**যে তিনটা পরিবর্তন আপনাকে সেখানে নিয়ে যাবে**:\n\n1. **বাইরে খাওয়া + takeaway: £380 → £220** (-£160)\nএই একটা পরিবর্তনেই সবচেয়ে বেশি ফল। বাইরে খাওয়া বন্ধ করতে হবে না, অর্ধেক করতে হবে। সপ্তাহে দুইবার কম বাইরে খাওয়া। তারপরও সপ্তাহে এক-দুইবারের জায়গা থাকে।\n\n2. **Amazon: £260 → £150** (-£110)\nসবকিছু cart-এ রাখুন। 48 ঘণ্টা অপেক্ষা করুন। তার অর্ধেক কিনুন। যতটুকু effort লাগে, তার তুলনায় এই একটা পরিবর্তনেই সবচেয়ে বেশি লাভ।\n\n3. **£300-এর একটা buffer বানান**: "অন্যান্য/random £150" category-টা কিছু মাসে হঠাৎ বেড়ে যাবে। মাসিক float হিসেবে আলাদা একটা current account-এ £300 রাখুন। মাস শেষে যা খরচ হয়নি, তা deposit fund-এ যাবে।\n\n**নতুন হিসাব**:\n• হাতে থাকে: £2,330\n• নতুন খরচ: £1,793 - £270 (কমানো) = £1,523\n• Surplus: £807\n• Savings-এ (buffer-এর পরে): **£507/মাস** ✅\n\n**3 বছরের হিসাব**: £507 × 36 = **£18,252** + interest। এটা কি আপনার deposit target-এর সঙ্গে মেলে?',
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "একটা realistic savings plan বানান। প্রতি মাসে consistently £500, শুধু ভালো মাসে না।",
              },
              {
                role: "claude",
                text: "**£500+/মাসের জন্য 3-পরিবর্তনের Plan**\n\n1. **বাইরে খাওয়া: £380 → £220** (-£160), অর্ধেক করুন, একদম বাদ না\n2. **Amazon: £260 → £150** (-£110), 48 ঘণ্টার cart rule\n3. **£300 float buffer**, যাতে হঠাৎ খরচের মাসে surplus শেষ না হয়ে যায়\n\nনতুন surplus: £2,330 - £1,523 = **£807**\nBuffer-এর পরে: **~£507/মাস deposit fund-এ** ✅\n\n3 বছর: £507 × 36 = **£18,252**, interest বাদে।\n\nআপনার কি এই সাইজের deposit-ই লাগবে?",
              },
            ],
          },
        },
        {
          title: "আপনার monthly review template বানান",
          description:
            "Plan তখনই কাজ করে যখন নিয়মিত check করেন। Claude-কে বলুন ১০ মিনিটের একটা monthly review template বানাতে, যেটা আপনি সত্যিই ব্যবহার করবেন।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমাকে একটা monthly review template বানিয়ে দিন। এমন কিছু যেটা আমি সত্যিই 10 মিনিটে করব, 2 ঘণ্টার spreadsheet session না।",
              },
              {
                role: "claude",
                text: '**আপনার Monthly Finance Review (10 মিনিট, মাসের প্রথম weekend)**\n\n**Step 1: হিসাবটা দেখুন (3 মিনিট)**\nBanking app খুলুন। লিখে রাখুন:\n• গত মাসের মোট variable খরচ: £___\n• বাইরে খাওয়া + takeaway মোট: £___\n• Amazon / online মোট: £___\n• Savings-এ transfer করা টাকা: £___\n\n**Step 2: Plan-এর সঙ্গে মেলান (2 মিনিট)**\n• বাইরে খাওয়া কি £220-এর নিচে ছিল? ✅ / ❌\n• Amazon কি £150-এর নিচে ছিল? ✅ / ❌\n• Savings-এ কি £500+ transfer করেছি? ✅ / ❌\n\n**Step 3: একটা honest লাইন (2 মিনিট)**\nকী হয়েছিল, এক লাইনে লিখুন। "দুইটা অফিস dinner ছিল, track করিনি" কাজের কথা। "জানি না টাকা কোথায় গেল" মানে আপনাকে app check করতে হবে।\n\n**Step 4: পরের মাসের জন্য adjust করুন (3 মিনিট)**\n• তিনটাই হলে: কিছু বদলাবেন না\n• বাইরে খাওয়া বেশি হলে: এখনই ঠিক করুন এই মাসের কোন সপ্তাহে বাইরে না খেয়ে রান্না করবেন\n• Amazon বেশি হলে: order history দেখুন, যেগুলো কিনে আফসোস হচ্ছে সেগুলোর নাম লিখুন\n\n**নিয়ম**: পরপর দুই মাস miss করলে target কমাবেন না। কী বদলেছে, খুঁজে বের করুন।\n\n---\n\nএটা phone-এর একটা note-এ paste করুন। প্রতি মাসের প্রথম শনিবারের জন্য একটা recurring reminder দিন। পুরো system এটুকুই।',
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "একটা monthly review template বানান। 10 মিনিটের, realistic, যেটা আমি সত্যিই করব।",
              },
              {
                role: "claude",
                text: "**Monthly Review (10 মিনিট, প্রথম weekend)**\n\n**3 মিনিট: হিসাব দেখুন**\n• Variable খরচ: £___\n• বাইরে খাওয়া মোট: £___\n• Amazon মোট: £___\n• Savings-এ transfer: £___\n\n**2 মিনিট: Plan check করুন**\n• বাইরে খাওয়া < £220? ✅❌\n• Amazon < £150? ✅❌\n• Savings ≥ £500? ✅❌\n\n**2 মিনিট: কী হয়েছিল, তা নিয়ে একটা honest লাইন**\n\n**3 মিনিট: পরের মাসের জন্য একটা adjustment** (সব green হলে কিছুই না)\n\n**নিয়ম**: পরপর দুই মাস miss → কারণ খুঁজুন, target কমাবেন না।\n\nএটা phone-এ save করুন। মাসিক reminder দিন।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "Reusable workflow-এর জন্য আপনার প্রথম skill বানান",
        href: "/tutorials/your-first-skill",
      },
    },
  },
  "quiz-game": {
    sourceHash: "f46b40caeaa8058c",
    translatedAt: "2026-10-06",
    content: {
      title: "যেকোনো বিষয়ে একটা Quiz Game বানান",
      slug: "quiz-game",
      duration: "১০ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "terminal"],
      description:
        "Claude-কে একটা topic বলুন। পেয়ে যাবেন scoring, hint আর multiple choice-সহ পুরোপুরি খেলার মতো একটা quiz। কোনো coding লাগবে না। কোনো setup নেই। শুধু মজা।",
      intro:
        "আপনি একটা সত্যিকারের game বানাতে যাচ্ছেন। Prototype না, mockup না: এমন একটা quiz যা এখনই browser-এ খুলে খেলতে পারবেন। যেকোনো topic বেছে নিন (বিশ্ব ইতিহাস, Taylor Swift-এর album, Premier League trivia, আপনার প্রিয় TV show, যা খুশি), আর Claude আপনার জন্য সব code লিখে দেবে। দশ মিনিট পরে আপনি নিজের বানানো একটা জিনিস খেলবেন।",
      steps: [
        {
          title: "আপনার topic বেছে নিন",
          description:
            'সবচেয়ে ভালো quiz game হয় এমন কিছু নিয়ে, যাতে আপনার সত্যিই আগ্রহ আছে। এমন একটা topic ভাবুন যা আপনি ভালো জানেন, বা যা আপনার বন্ধুদের ভালো লাগবে। এটা "world geography"-র মতো বড় হতে পারে, আবার "SpongeBob SquarePants-এর season 3-এর episode"-এর মতো নির্দিষ্টও হতে পারে। যত নির্দিষ্ট, তত মজা। আপনি ঠিক কী চান, সেটাই Claude-কে বলবেন।',
          demo: {
            title: "Quiz topic-এর কিছু idea",
            steps: [
              { type: "out", text: "শুরু করার জন্য কিছু idea:" },
              { type: "out", text: "" },
              {
                type: "out",
                text: "  Classic: বিভিন্ন দেশের রাজধানী, science fact, ইতিহাসের তারিখ",
              },
              {
                type: "out",
                text: "  Pop culture: Marvel movie, Taylor Swift, The Office",
              },
              {
                type: "out",
                text: "  Niche: আপনার শহর, আপনার football club, আপনার পোষা প্রাণীর breed",
              },
              {
                type: "out",
                text: "  Weird: 90s-এর অচেনা cartoon, fast food menu-র item",
              },
              { type: "out", text: "" },
              {
                type: "warn",
                text: "Pro tip: topic যত অদ্ভুত, quiz তত বেশি share হয়।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি একটা quiz game বানাতে চাই। কোন topic-গুলো ভালো কাজ করে?",
              },
              {
                role: "claude",
                text: "প্রায় সবকিছুই চলে! কয়েকটা দিক থেকে ভাবতে পারেন:\n\nবড় topic party-র জন্য দারুণ: world geography, science trivia, ইতিহাস, movie।\n\nNiche topic share করতে বেশি মজা: নির্দিষ্ট কোনো TV show, আপনার শহর, কোনো sports team, কোনো music artist।\n\nPersonal topic সবচেয়ে হাসির: বন্ধুদের group-এর inside joke, আপনার team নিয়ে office trivia।\n\nআপনি কী নিয়ে quiz বানাতে চান? বললেই আমি এক বারে পুরোটা বানিয়ে দেব।",
              },
            ],
          },
        },
        {
          title: "Game-টা বানিয়ে নিন",
          description:
            "একটা prompt। এটুকুই লাগে। Claude-কে আপনার quiz topic বলুন, আর multiple choice প্রশ্ন, scoring, hint system আর একটা results screen-সহ একটা self-contained HTML quiz game চান। Claude সব লিখে দেবে: HTML structure, CSS styling, আর JavaScript logic। আপনাকে কোনো code ছুঁতে হবে না।",
          code: {
            snippet: `claude "The Office (US TV show) নিয়ে আমাকে একটা self-contained HTML quiz game বানিয়ে দিন।
এগুলো রাখবেন:
- ১০টা multiple choice প্রশ্ন, প্রতিটায় ৪টা option
- একটা scoring system, যেটা সঠিক উত্তর গুনবে
- প্রতিটা প্রশ্নে একটা hint button (use করলে ১ point কাটবে)
- শেষে একটা results screen, score অনুযায়ী rating
- মজার, রঙিন styling, Office-এর theme-এর সঙ্গে মিলিয়ে
- একটা restart button

সবকিছু office-quiz.html নামের একটা file-এ রাখবেন"`,
            language: "bash",
          },
          demo: {
            title: "Claude আপনার quiz বানাচ্ছে",
            steps: [
              {
                type: "cmd",
                text: 'claude "The Office নিয়ে আমাকে একটা HTML quiz game বানিয়ে দিন..."',
              },
              { type: "out", text: "Reading prompt...", delay: 400 },
              {
                type: "out",
                text: "Planning: 10 questions, 4 options each, hint system...",
                delay: 600,
              },
              { type: "out", text: "Writing HTML structure..." },
              {
                type: "out",
                text: "Writing CSS (Office-themed colors, progress bar)...",
                delay: 500,
              },
              {
                type: "out",
                text: "Writing JavaScript (scoring, hints, results logic)...",
                delay: 700,
              },
              { type: "success", text: "Created office-quiz.html (487 lines)" },
              { type: "warn", text: "Browser-এ খুলে খেলা শুরু করুন!" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "The Office (US TV show) নিয়ে আমাকে একটা self-contained HTML quiz game বানিয়ে দিন। ১০টা multiple choice প্রশ্ন রাখবেন, প্রতিটায় ৪টা option, একটা scoring system, একটা hint button যেটা use করলে ১ point কাটবে, আর শেষে একটা মজার results screen। সবকিছু office-quiz.html নামের একটা file-এ।",
              },
              {
                role: "claude",
                text: 'এই নিন আপনার পুরো quiz game। এটা `office-quiz.html` নামে save করে যেকোনো browser-এ খুলুন। কোনো installation নেই, কোনো server নেই, পুরোপুরি offline-এ চলে।\n\nfile-এ যা আছে:\n- The Office নিয়ে ১০টা trivia প্রশ্ন, প্রতিটায় ৪টা option\n- একটা score tracker, যেটা ১০ থেকে শুরু হয় আর সঠিক উত্তরে বাড়ে\n- প্রতিটা প্রশ্নে একটা hint button, যেটা একটা clue দেখায় (১ point কাটে)\n- একটা progress bar, quiz-এর কতদূর এসেছেন তা দেখায়\n- শেষে একটা results screen আর rating (সবচেয়ে বেশি score-এর জন্য "Dunder Mifflin Employee of the Month")\n- আবার খেলার জন্য একটা restart button\n\nপুরোটা The Office-এর color palette-এ সাজানো: navy blue, warm white আর হালকা grey।\n\n[পুরো HTML file copy করার জন্য ready]',
              },
            ],
          },
        },
        {
          title: "নিজে খেলে দেখুন",
          description:
            "file-টা browser-এ খুলে পুরোটা খেলে দেখুন। প্রতিটা feature try করুন: একটা প্রশ্নের সঠিক উত্তর দিন, একটা ভুল দিন, একটা hint use করুন, results screen পর্যন্ত যান। এই step-টাই সবচেয়ে জরুরি, কারণ এরপর আপনি Claude-কে এটা customize করতে বলবেন, আর তার আগে জানতে হবে কোনটা এখনই ঠিকমতো কাজ করছে।",
          code: {
            snippet: `# Mac-এ
open office-quiz.html

# Windows-এ
start office-quiz.html

# অথবা file-টা যেকোনো browser window-তে drag করে ছেড়ে দিন`,
            language: "bash",
          },
          demo: {
            title: "Browser-এ আপনার quiz খোলা",
            steps: [
              { type: "cmd", text: "open office-quiz.html" },
              { type: "success", text: "Opened in Chrome", delay: 400 },
              { type: "out", text: "" },
              { type: "out", text: "The Office Quiz" },
              { type: "out", text: "Question 1 of 10 | Score: 10" },
              { type: "out", text: "" },
              {
                type: "out",
                text: "What is the name of the paper company in The Office?",
              },
              { type: "out", text: "  (A) Dunder Mifflin" },
              { type: "out", text: "  (B) Staples Inc." },
              { type: "out", text: "  (C) Paper King" },
              { type: "out", text: "  (D) Scott Paper Co." },
              {
                type: "success",
                text: "সত্যিই কাজ করছে। এটা আপনিই বানিয়েছেন।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "file-টা save করে Chrome-এ খুলেছি। কাজ করছে! বন্ধুদের দেখানোর জন্য phone-এ কীভাবে খুলব?",
              },
              {
                role: "claude",
                text: "কয়েকটা সহজ উপায় আছে:\n\n1. file-টা AirDrop করুন (iPhone আর Mac): file-এ right-click করুন, Share, তারপর phone-এ AirDrop। Safari-তে খুলুন।\n\n2. নিজেকে email করুন: file-টা খুব ছোট, attach করতে সমস্যা হবে না। Phone-এ email খুলে attachment-এ tap করুন।\n\n3. WhatsApp বা Telegram: HTML file-টা document হিসেবে পাঠান। যিনি পাবেন, তিনি download করে browser-এ খুলবেন।\n\n4. Free-তে deploy করুন (২ মিনিট লাগে): পরের step-এ দেখাব কীভাবে একটা shareable link-সহ এটা internet-এ তুলবেন।\n\nএখন আপনার জন্য কোনটা সবচেয়ে কাজের মনে হচ্ছে?",
              },
            ],
          },
        },
        {
          title: "Customize করুন",
          description:
            "Quiz কাজ করছে। এবার এটাকে নিজের মতো করে নিন। Claude-কে বলতে পারেন একটা countdown timer, difficulty level, একই topic-এ আরও প্রশ্ন, অন্য visual theme, sound effect (হ্যাঁ, সত্যিই), বা প্রতিবার খেলার পরেও থেকে যায় এমন high score tracker যোগ করতে। প্রতিটা customization মানে একটা message।",
          code: {
            snippet: `# একটা countdown timer যোগ করুন
claude "office-quiz.html-এ ২০ সেকেন্ডের একটা countdown timer দিন।
৫ সেকেন্ডের নিচে নামলে রং লাল হয়ে যাবে, এমনভাবে দেখাবেন।
সময় শেষ হলে নিজে থেকেই পরের প্রশ্নে চলে যাবে আর উত্তরটা ভুল ধরবে।"

# Difficulty level যোগ করুন
claude "office-quiz.html-এর শুরুতে একটা Easy/Medium/Hard selector দিন।
Easy: প্রতি প্রশ্নে ৩০ সেকেন্ড, hint free।
Medium: ২০ সেকেন্ড, hint-এ ১ point কাটবে (এখন যেমন আছে)।
Hard: ১০ সেকেন্ড, কোনো hint নেই।"

# Theme বদলান
claude "office-quiz.html-কে Dunder Mifflin-এর website-এর মতো করে সাজান।
ওদের navy blue আর grey color scheme use করুন। উপরে company-র logo text হিসেবে দিন।"`,
            language: "bash",
          },
          demo: {
            title: "একটা countdown timer যোগ করা",
            steps: [
              {
                type: "cmd",
                text: 'claude "office-quiz.html-এ ২০ সেকেন্ডের একটা countdown timer দিন"',
              },
              { type: "out", text: "Reading office-quiz.html...", delay: 400 },
              { type: "out", text: "Adding timer state variable..." },
              { type: "out", text: "Adding setInterval for countdown..." },
              {
                type: "out",
                text: "Adding visual timer bar with color transitions...",
              },
              { type: "out", text: "Adding auto-advance logic on timeout..." },
              { type: "success", text: "Updated office-quiz.html" },
              {
                type: "warn",
                text: "Browser refresh করুন। Timer সঙ্গে সঙ্গে শুরু হবে।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Quiz দারুণ চলছে। এগুলো যোগ করে দেবেন: একটা countdown timer (প্রতি প্রশ্নে ২০ সেকেন্ড), শুরুতে একটা difficulty selector, আর browser বন্ধ করার পরেও যেন high score save থাকে?",
              },
              {
                role: "claude",
                text: "তিনটাই হবে। কোনটা কী করে:\n\nCountdown timer: প্রতিটা প্রশ্নের নিচে একটা progress bar ২০ সেকেন্ড থেকে কমতে থাকে। ১০ সেকেন্ডে এটা কমলা হয়, ৫-এ লাল। সময় শেষ হলে প্রশ্নটা ভুল ধরা হয় আর পরেরটা নিজে থেকেই চলে আসে।\n\nDifficulty selector: Quiz শুরুর আগে একটা screen আসে। Easy-তে ৩০ সেকেন্ড আর free hint। Medium এখনকার setup (২০ সেকেন্ড, hint-এ ১ point কাটে)। Hard-এ ১০ সেকেন্ড, আর hint পুরোপুরি বন্ধ।\n\nHigh score storage: localStorage দিয়ে আপনার সেরা score browser-এ save থাকে আর results screen-এ দেখায়। কোনো server ছাড়াই এক session থেকে আরেক session-এ থেকে যায়।\n\nUpdated file নিচে দিলাম। আপনার এখনকার office-quiz.html এটা দিয়ে replace করুন।",
              },
            ],
          },
        },
        {
          title: "Share করুন",
          description:
            "যে quiz আর কেউ খেলে না, সেটা বানিয়ে লাভ নেই। সবচেয়ে সহজ উপায়: HTML file-টা সরাসরি email করুন। এটা একটাই file, কোনো server লাগে না, আর যে কেউ খুলতে পারে। যেকোনো জায়গায় post করার মতো shareable link চাইলে, Vercel আর Netlify দুটোই মোটামুটি দুই মিনিটে free-তে static HTML file deploy করে দেয়।",
          code: {
            snippet: `# Option 1: Vercel-এ deploy করুন (shareable link পাবেন)
npx vercel office-quiz.html

# Option 2: Netlify Drop (কোনো account লাগবে না)
# 1. app.netlify.com/drop-এ যান
# 2. আপনার office-quiz.html file-টা drag করে ছেড়ে দিন
# 3. সঙ্গে সঙ্গে link পেয়ে যাবেন

# Option 3: GitHub Pages (free, স্থায়ী)
# 1. github.com-এ একটা repo বানান
# 2. office-quiz.html-কে main file হিসেবে upload করুন
# 3. Settings > Pages > Deploy from main branch-এ যান
# 4. আপনার URL: https://yourusername.github.io/your-repo-name`,
            language: "bash",
          },
          demo: {
            title: "Vercel-এ deploy করা",
            steps: [
              { type: "cmd", text: "npx vercel office-quiz.html" },
              { type: "out", text: "Vercel CLI 37.x", delay: 300 },
              {
                type: "out",
                text: "Deploying office-quiz.html...",
                delay: 600,
              },
              { type: "success", text: "Build complete" },
              {
                type: "success",
                text: "Deployed to: https://office-quiz-abc123.vercel.app",
              },
              {
                type: "warn",
                text: "এই link যেকোনো জায়গায় share করুন। সব device-এ কাজ করে।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এই quiz-টা online-এ তুলে link share করব কীভাবে? আমার কোনো hosting setup নেই।",
              },
              {
                role: "claude",
                text: "কোনো setup ছাড়া সবচেয়ে দ্রুত উপায় Netlify Drop:\n\n1. Browser-এ app.netlify.com/drop-এ যান\n2. আপনার office-quiz.html file-টা page-এর ওপর drag করে ছেড়ে দিন\n3. মোটামুটি ১০ সেকেন্ড অপেক্ষা করুন\n4. ওরা যে link দেবে, সেটা copy করুন\n\nএটুকুই। কোনো account লাগে না (তবে free account খুললে URL-টা চিরকাল রাখতে পারবেন)। Link-টা phone-সহ যেকোনো device-এ কাজ করে।\n\n`my-office-quiz.netlify.app`-এর মতো custom URL চাইলে, একটা free account খুলুন, file upload করুন, আর settings-এ গিয়ে site-এর নাম বদলে দিন।\n\nআরেক ধাপ এগিয়ে quiz-টার জন্য নিজস্ব domain name নিতে চান? সেটায় আরও মোটামুটি ২০ মিনিট লাগবে।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "একটা meme generator বানান",
        href: "/tutorials/meme-generator",
      },
    },
  },
  "meme-generator": {
    sourceHash: "ea78c01bc19e7020",
    translatedAt: "2026-10-06",
    content: {
      title: "একটা Meme Generator বানান",
      slug: "meme-generator",
      duration: "১৫ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "terminal"],
      description:
        "আপনি কেমন meme চান, বলুন। Claude এমন একটা page বানিয়ে দেবে যেটা যেকোনো ছবির ওপর আপনার নিজের লেখা বসিয়ে meme বানায়।",
      intro:
        "আপনি সত্যিকারের, কাজ করে এমন একটা meme generator বানাতে যাচ্ছেন। যেকোনো ছবি upload করুন, ওপরে কিছু লেখা বসান, result download করুন। কোনো coding লাগবে না। Canvas API-র সব কাজ Claude আপনার হয়ে লিখে দেবে। শেষে আপনার হাতে থাকবে সত্যিই ব্যবহার করার মতো একটা tool, আর বন্ধুদের শোনানোর মতো একটা গল্প।",
      steps: [
        {
          title: "Claude-কে বলুন আপনি কী চান",
          description:
            "আপনি কেমন meme generator বানাতে চান, describe করুন। নির্দিষ্ট করে বলুন: একটা ছবি upload করবেন, ওপরে আর নিচে লেখা বসাবেন, আর result download করবেন। একটা লাইন code লেখার আগেই Claude পুরো plan করে নেবে।",
          code: {
            snippet: `আমাকে একটা HTML file-এ একটা meme generator বানিয়ে দিন।
এতে থাকবে:
- আমার কম্পিউটার থেকে যেকোনো ছবি upload করার option
- ওপরে আর নিচে bold সাদা লেখা (classic meme style)
- টাইপ করার সঙ্গে সঙ্গে live preview
- একটা Download button, যেটা final meme PNG হিসেবে save করবে
- পুরোটা browser-এই চলবে, কোনো server লাগবে না`,
            language: "text",
          },
          demo: {
            title: "আপনার meme generator describe করা",
            steps: [
              { type: "cmd", text: "claude" },
              { type: "success", text: "Claude Code ready" },
              {
                type: "cmd",
                text: '"আমাকে একটা HTML file-এ একটা meme generator বানিয়ে দিন..."',
                delay: 600,
              },
              { type: "out", text: "Planning meme generator...", delay: 400 },
              {
                type: "out",
                text: "Components: file upload, Canvas renderer, text overlay, download",
              },
              {
                type: "out",
                text: "Approach: HTML5 Canvas API, no dependencies needed",
              },
              {
                type: "warn",
                text: "Build শুরু হচ্ছে। মোটামুটি ৩০ সেকেন্ড লাগবে।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমাকে একটা HTML file-এ একটা meme generator বানিয়ে দিন। একটা ছবি upload করব, ওপরে আর নিচে কালো outline-সহ bold সাদা লেখা বসাব, টাইপ করার সময় live preview দেখব, আর result PNG হিসেবে download করব। কোনো server না, শুধু browser।",
              },
              {
                role: "claude",
                text: "দারুণ project। কিছু লেখার আগে আমার plan এটা:\n\n1. একটা file input, যেটা ছবিকে HTML Canvas-এ load করবে\n2. দুটো text field: top text আর bottom text\n3. আপনি টাইপ করার সঙ্গে সঙ্গে Canvas নতুন করে render হবে (সাদা লেখা, কালো stroke, Impact font)\n4. একটা Download button, যেটা canvas.toDataURL() call করে save শুরু করবে\n\nসবকিছু Canvas API দিয়ে ১০০% browser-এই চলবে। কোনো library নেই, server নেই, একটাই file।\n\nবানিয়ে ফেলব?",
              },
              { role: "user", text: "হ্যাঁ, বানান!" },
            ],
          },
        },
        {
          title: "বানানো দেখুন",
          description:
            "Claude একসঙ্গে HTML, CSS আর Canvas API-র code লেখে। দেখুন কীভাবে file-টা তৈরি হয়, আর প্রতিটা অংশ কী করে, Claude সেটাও বুঝিয়ে দেয়। Canvas API দিয়েই browser-এ ছবির ওপর লেখা আঁকা যায়।",
          demo: {
            title: "Claude meme generator বানাচ্ছে",
            steps: [
              {
                type: "out",
                text: "Creating meme-generator.html...",
                delay: 300,
              },
              {
                type: "out",
                text: "Writing Canvas setup: 800x600 default size",
              },
              {
                type: "out",
                text: "Adding file reader: FileReader API for local images",
              },
              {
                type: "out",
                text: "Writing text renderer: Impact font, white fill, black stroke",
              },
              {
                type: "out",
                text: "Adding live preview: re-renders on every keystroke",
              },
              {
                type: "out",
                text: 'Wiring download button: canvas.toDataURL("image/png")',
              },
              {
                type: "success",
                text: "Created meme-generator.html (187 lines)",
              },
              {
                type: "warn",
                text: "meme-generator.html browser-এ খুলে try করুন।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "claude",
                text: 'এই নিন আপনার পুরো meme-generator.html। file-টা desktop-এ save করে যেকোনো browser-এ খুলুন।\n\n```html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Meme Generator</title>\n  <style>\n    body { font-family: sans-serif; max-width: 860px; margin: 2rem auto; padding: 1rem; background: #111; color: #fff; }\n    canvas { border: 2px solid #333; display: block; margin: 1rem 0; max-width: 100%; }\n    input[type=text] { width: 100%; padding: .5rem; margin: .25rem 0; font-size: 1rem; background: #222; color: #fff; border: 1px solid #444; border-radius: 4px; }\n    button { padding: .6rem 1.2rem; background: #e63; color: #fff; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Meme Generator</h1>\n  <input type="file" id="imgInput" accept="image/*">\n  <input type="text" id="topText" placeholder="TOP TEXT">\n  <input type="text" id="bottomText" placeholder="BOTTOM TEXT">\n  <canvas id="canvas" width="800" height="500"></canvas>\n  <button onclick="download()">Download Meme</button>\n  <script>\n    const canvas = document.getElementById("canvas");\n    const ctx = canvas.getContext("2d");\n    let img = null;\n    document.getElementById("imgInput").addEventListener("change", e => {\n      const reader = new FileReader();\n      reader.onload = ev => {\n        const image = new Image();\n        image.onload = () => { img = image; canvas.width = image.width; canvas.height = image.height; render(); };\n        image.src = ev.target.result;\n      };\n      reader.readAsDataURL(e.target.files[0]);\n    });\n    ["topText","bottomText"].forEach(id => document.getElementById(id).addEventListener("input", render));\n    function render() {\n      if (!img) return;\n      ctx.drawImage(img, 0, 0);\n      const fs = Math.floor(canvas.height / 10);\n      ctx.font = `bold ${fs}px Impact, Arial Black, sans-serif`;\n      ctx.fillStyle = "white"; ctx.strokeStyle = "black"; ctx.lineWidth = fs / 8; ctx.textAlign = "center";\n      const top = document.getElementById("topText").value.toUpperCase();\n      const bot = document.getElementById("bottomText").value.toUpperCase();\n      if (top) { ctx.strokeText(top, canvas.width/2, fs*1.1); ctx.fillText(top, canvas.width/2, fs*1.1); }\n      if (bot) { ctx.strokeText(bot, canvas.width/2, canvas.height - fs*.3); ctx.fillText(bot, canvas.width/2, canvas.height - fs*.3); }\n    }\n    function download() {\n      if (!img) return alert("Upload an image first!");\n      const a = document.createElement("a"); a.download = "meme.png"; a.href = canvas.toDataURL(); a.click();\n    }\n  <\/script>\n</body>\n</html>\n```\n\n`meme-generator.html` নামে save করে browser-এ খুলুন। একটা ছবি upload করুন, লেখা টাইপ করুন, Download চাপুন।',
              },
            ],
          },
        },
        {
          title: "Try করে দেখুন",
          description:
            "file-টা browser-এ খুলুন। আপনার কম্পিউটার থেকে যেকোনো ছবি upload করুন, top আর bottom text field-এ কিছু লিখুন, আর দেখুন preview সঙ্গে সঙ্গে update হচ্ছে। তারপর Download চেপে আপনার masterpiece save করুন।",
          demo: {
            title: "আপনার meme generator খোলা",
            steps: [
              { type: "cmd", text: "open meme-generator.html" },
              { type: "out", text: "Opening in browser...", delay: 400 },
              { type: "success", text: "Browser opened meme-generator.html" },
              { type: "out", text: "" },
              { type: "out", text: "এরপর যা করবেন:" },
              {
                type: "out",
                text: '  1. "Choose File"-এ click করে যেকোনো ছবি বেছে নিন',
              },
              { type: "out", text: "  2. আপনার TOP TEXT আর BOTTOM TEXT লিখুন" },
              {
                type: "out",
                text: "  3. Preview-তে meme live update হতে দেখুন",
              },
              {
                type: "out",
                text: "  4. Download-এ click করে meme PNG হিসেবে save করুন",
              },
              {
                type: "warn",
                text: "Try করুন: আপনার বিড়ালের একটা ছবি upload করে caption দিন।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "file-টা save করে খুলেছি। Canvas ফাঁকা, টাইপ করলেও কিছু দেখাচ্ছে না।",
              },
              {
                role: "claude",
                text: "আগে একটা ছবি upload করতে হবে। ছবি load না হওয়া পর্যন্ত canvas কিছু render করে না।\n\nধাপগুলো:\n1. ওপরের file input-এ click করুন\n2. আপনার কম্পিউটার থেকে যেকোনো ছবি বেছে নিন (JPG, PNG, WebP সবই চলে)\n3. Canvas-এ ছবি দেখা গেলে text field-এ টাইপ শুরু করুন\n\nটাইপ করার সঙ্গে সঙ্গে preview update হয়। Safari-তে এখনো ফাঁকা দেখালে Chrome বা Firefox-এ try করুন।",
              },
              {
                role: "user",
                text: "হয়েছে! একটা ছবি upload করলাম, সঙ্গে সঙ্গে লেখা চলে এলো। দারুণ ব্যাপার।",
              },
              {
                role: "claude",
                text: "এটাই Canvas API-র কাজ। আপনি প্রতিটা অক্ষর টাইপ করলে এটা পুরো canvas আবার আঁকে: আগে ছবি, তারপর ওপরে লেখা। সাদা fill আর কালো stroke হলো classic meme look (Impact font, outline-সহ লেখা)।\n\nআরও ভালো করতে চান?",
              },
            ],
          },
        },
        {
          title: "আরও ভালো করুন",
          description:
            "Basic version কাজ করছে। এবার এটাকে আরও জমিয়ে তোলা যাক। Claude-কে আরও feature যোগ করতে বলুন: font size slider, লেখার জন্য color picker, built-in meme template, বা ছবির যেকোনো জায়গায় লেখা drag করে সরানোর সুবিধা।",
          code: {
            snippet: `আমার meme generator-এ এই feature-গুলো যোগ করুন:
1. একটা font size slider (20px থেকে 120px)
2. একটা text color picker (default সাদা)
3. click করে load করার মতো তিনটা preset meme template
4. Canvas-এ drag-and-drop করে লেখা সরানোর option`,
            language: "text",
          },
          demo: {
            title: "Feature যোগ করা",
            steps: [
              {
                type: "cmd",
                text: '"একটা font size slider, color picker, তিনটা meme template যোগ করুন..."',
                delay: 200,
              },
              {
                type: "out",
                text: "Reading meme-generator.html...",
                delay: 500,
              },
              {
                type: "out",
                text: "Adding font size slider: range input 20-120px",
              },
              {
                type: "out",
                text: "Adding color picker: input[type=color] for text fill",
              },
              {
                type: "out",
                text: "Adding template buttons: preset images with captions",
              },
              {
                type: "out",
                text: "Adding drag support: mousedown, mousemove, mouseup events",
              },
              {
                type: "success",
                text: "Updated meme-generator.html with 4 new features",
              },
              {
                type: "warn",
                text: "Update দেখতে browser-এ page reload করুন।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমার meme generator-এ একটা font size slider (20 থেকে 120px) আর একটা text color picker যোগ করে দেবেন?",
              },
              {
                role: "claude",
                text: 'আপনার bottom text input-এর পরে এই control-গুলো যোগ করুন:\n\n```html\n<label>Font Size: <span id="sizeVal">60</span>px\n  <input type="range" id="fontSize" min="20" max="120" value="60"\n    oninput="document.getElementById(\'sizeVal\').textContent=this.value;render()">\n</label>\n<label>Text Color:\n  <input type="color" id="textColor" value="#ffffff" oninput="render()">\n</label>\n```\n\nতারপর আপনার render() function-এ hardcoded font size আর fill color-এর লাইনগুলো এটা দিয়ে replace করুন:\n\n```javascript\nconst fs = parseInt(document.getElementById("fontSize").value);\nctx.fillStyle = document.getElementById("textColor").value;\n```\n\nএখন slider আর color picker সঙ্গে সঙ্গে লেখা control করবে।',
              },
              {
                role: "user",
                text: "Perfect। কয়েকটা built-in meme template-ও যোগ করে দেবেন?",
              },
              {
                role: "claude",
                text: "Canvas-এর ওপরে template button যোগ করুন:\n\n```html\n<div style=\"display:flex;gap:.5rem;margin:.5rem 0;flex-wrap:wrap\">\n  <button onclick=\"loadTemplate('https://i.imgflip.com/30b1gx.jpg','ONE DOES NOT SIMPLY','WALK INTO MORDOR')\">One Does Not Simply</button>\n  <button onclick=\"loadTemplate('https://i.imgflip.com/1bij.jpg','NOT SURE IF','OR JUST BEING DRAMATIC')\">Not Sure If</button>\n  <button onclick=\"loadTemplate('https://i.imgflip.com/zow0h.jpg','CHANGE MY MIND','')\">Change My Mind</button>\n</div>\n```\n\nআর আপনার script-এ এই function যোগ করুন:\n\n```javascript\nfunction loadTemplate(url, top, bottom) {\n  document.getElementById(\"topText\").value = top;\n  document.getElementById(\"bottomText\").value = bottom;\n  const image = new Image();\n  image.crossOrigin = \"anonymous\";\n  image.onload = () => { img = image; canvas.width = image.width; canvas.height = image.height; render(); };\n  image.src = url;\n}\n```\n\nযেকোনো button-এ click করলে ছবিটা caption-সহ load হবে, তারপর নিজের মতো বদলে নিতে পারবেন।",
              },
            ],
          },
        },
        {
          title: "পছন্দের meme-গুলো save করুন",
          description:
            'Download button একবারে একটা meme save করে। কিন্তু যদি একটা gallery চান? Claude-কে একটা "Save to Gallery" feature যোগ করতে বলুন, যেটা আপনার বানানো meme-গুলো একই page-এ রেখে দেবে, যাতে যেকোনো সময় দেখে আবার download করতে পারেন।',
          code: {
            snippet: `Canvas-এর নিচে একটা meme gallery যোগ করুন।
"Save to Gallery"-তে click করলে এখনকার meme-টা
নিচে thumbnail preview-এর একটা grid-এ যোগ হবে।
কোনো thumbnail-এ click করলে সেটা আবার download হবে।
Gallery memory-তেই রাখুন (কোনো server লাগবে না)।`,
            language: "text",
          },
          demo: {
            title: "Gallery যোগ করা",
            steps: [
              {
                type: "cmd",
                text: '"Canvas-এর নিচে একটা meme gallery যোগ করুন..."',
                delay: 200,
              },
              {
                type: "out",
                text: "Adding gallery array: stores canvas.toDataURL() snapshots",
                delay: 500,
              },
              {
                type: "out",
                text: "Adding Save to Gallery button: captures current canvas state",
              },
              {
                type: "out",
                text: "Rendering thumbnails: img grid with click-to-download",
              },
              {
                type: "success",
                text: "Gallery feature added. 0 memes saved (go make some!)",
              },
              {
                type: "warn",
                text: "Refresh করলে gallery মুছে যায়। localStorage চান? শুধু বলুন।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: 'একটা "Save to Gallery" button যোগ করে দেবেন? আমার সব meme যেন page-এ থেকে যায়, পরে download করব।',
              },
              {
                role: "claude",
                text: 'আপনার দরকার এই দুটো অংশ।\n\nHTML-এ একটা gallery section যোগ করুন:\n\n```html\n<button onclick="saveToGallery()">Save to Gallery</button>\n<div id="gallery" style="display:flex;flex-wrap:wrap;gap:1rem;margin-top:1.5rem"></div>\n```\n\nআপনার script-এ এই function যোগ করুন:\n\n```javascript\nconst savedMemes = [];\n\nfunction saveToGallery() {\n  if (!img) return alert("Upload an image first!");\n  const dataUrl = canvas.toDataURL("image/png");\n  savedMemes.push(dataUrl);\n  const thumb = document.createElement("img");\n  thumb.src = dataUrl;\n  thumb.style = "width:160px;height:auto;cursor:pointer;border:2px solid #333;border-radius:4px";\n  thumb.title = "Click to download";\n  thumb.onclick = () => { const a = document.createElement("a"); a.download = `meme-${savedMemes.length}.png`; a.href = dataUrl; a.click(); };\n  document.getElementById("gallery").appendChild(thumb);\n}\n```\n\nযতবার Save to Gallery-তে click করবেন, নিচে একটা thumbnail আসবে। যেকোনো thumbnail-এ click করলে সেটা আবার download হবে।',
              },
              {
                role: "user",
                text: "localStorage দিয়ে gallery-টা এমন করে দেবেন, যেন page refresh করলেও থেকে যায়?",
              },
              {
                role: "claude",
                text: 'savedMemes array আর saveToGallery function-কে এই version দিয়ে replace করুন:\n\n```javascript\nlet savedMemes = JSON.parse(localStorage.getItem("memeGallery") || "[]");\n\nfunction renderGallery() {\n  const container = document.getElementById("gallery");\n  container.innerHTML = "";\n  savedMemes.forEach((dataUrl, i) => {\n    const thumb = document.createElement("img");\n    thumb.src = dataUrl;\n    thumb.style = "width:160px;height:auto;cursor:pointer;border:2px solid #333;border-radius:4px";\n    thumb.title = "Click to download";\n    thumb.onclick = () => { const a = document.createElement("a"); a.download = `meme-${i+1}.png`; a.href = dataUrl; a.click(); };\n    container.appendChild(thumb);\n  });\n}\n\nfunction saveToGallery() {\n  if (!img) return alert("Upload an image first!");\n  savedMemes.push(canvas.toDataURL("image/png"));\n  localStorage.setItem("memeGallery", JSON.stringify(savedMemes));\n  renderGallery();\n}\n\nrenderGallery();\n```\n\nএখন page refresh করলেও আপনার gallery থেকে যাবে। file-টা আবার খুললে save করা meme-গুলো নিজে থেকেই load হবে।',
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "পরের tutorial: একটা Spotify Playlist Analyzer বানান",
        href: "/tutorials/playlist-analyzer",
      },
    },
  },
};
