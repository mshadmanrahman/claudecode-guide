import type { DesignerGuide } from "@/lib/designer-guides";
import type { Translation } from "@/lib/i18n/bn/tutorials";

export const BN_DESIGNER_GUIDES_D1: Partial<Record<string, Translation<DesignerGuide>>> = {
  "set-up-claude": {
    sourceHash: "6d10a2288748a0db",
    translatedAt: "2026-10-06",
    content: {
      title: "আপনার design কাজের জন্য Claude setup করুন",
      slug: "set-up-claude",
      duration: "১০ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["web", "desktop"],
      description:
        "আপনার role, আপনার user আর output নিয়ে আপনার preference সম্পর্কে Claude-কে permanent context দিন। তাহলে প্রতিটি session শুরু হবে আপনার কাজ আগে থেকেই জেনে।",
      intro:
        "এই guide তাদের জন্য, যে UX আর UI designer-রা চান Claude প্রতিটি session-এ নতুন করে বুঝিয়ে না বললেও তাঁদের কাজ জানুক। শেষে আপনার হাতে থাকবে একটা working agreement, যেটা আপনার role, user আর output preference নিজে থেকেই load করে। আপনি না বলা পর্যন্ত Claude জানে না যে আপনি designer। Context ছাড়া প্রতিটি session শুরু হয় একদম শূন্য থেকে: generic উত্তর, generic feedback, generic output। Agreement-টা আপনি একবারই লিখবেন। Claude প্রতিবার সেটা পড়বে।",
      situation: {
        scene:
          "এতদিন আপনি Claude-কে search engine-এর মতো ব্যবহার করেছেন। একটা প্রশ্ন করেন, generic একটা উত্তর পান, তারপর tab বন্ধ করে দেন। মাঝে মাঝে কাজে লাগে। কিন্তু Claude জানে না যে আপনি designer, আপনি কাদের জন্য design করেন, বা feedback আপনি কীভাবে পেতে চান।",
        outcome:
          "এরপর থেকে প্রতিটি Claude session শুরু হবে আপনার role, আপনার user আর আপনি কীভাবে output চান, তা আগে থেকেই জেনে। আপনি একবার লিখবেন। প্রতিবার সেটা load হবে।",
      },
      outcomes: [
        "একটা working agreement, যেটা Claude-কে জানায় আপনি কে, কাদের জন্য design করেন, আর কীভাবে কাজ করতে পছন্দ করেন",
        "পুরো template-টা, তবে generic placeholder দিয়ে নয়, আপনার আসল context দিয়ে ভরা",
        "একটা test prompt, যেটা দেখিয়ে দেবে আপনার agreement এতটা specific কি না যে কাজের output আসে",
      ],
      steps: [
        {
          title: "আপনার workspace বানান",
          description:
            "যে Project-এ আপনার working agreement থাকবে, সেটা setup করুন। আপনি Claude যেখানে ব্যবহার করেন, সেই অনুযায়ী demo-টা follow করুন। Web-এ একটা Project আপনার instruction আর file একসঙ্গে রাখে। Desktop app-এ চাইলে সেই Project-কে আপনার কম্পিউটারের একটা folder-ও দিতে পারেন, তাহলে Claude আপনার brief আর note সরাসরি পড়তে পারবে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি Claude-কে এমনভাবে setup করতে চাই যাতে প্রতিটা session-এ আমার design কাজ বুঝে নেয়। বারবার বুঝিয়ে বলতে চাই না। কোথা থেকে শুরু করব?",
              },
              {
                role: "claude",
                text: "একটা Project দিয়ে শুরু করুন। বাঁ দিকের sidebar-এ যান, তারপর Projects, তারপর New Project।\n\nনামটা specific রাখুন: \"Design Work\"-এর চেয়ে \"Mobile Banking UX\" ভালো।\n\nProject-এ ঢোকার পর ওপরে একটা Project Instructions field দেখবেন। আপনার working agreement ওখানেই যাবে। এই project-এর প্রতিটি conversation-এর শুরুতে Claude সেটা পড়ে নেয়। আপনি কী ধরনের design কাজ করছেন? লিখতে আমি সাহায্য করব।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "আমি Claude desktop app ব্যবহার করি। কীভাবে setup করলে Claude আমার design file পড়তে পারবে? প্রতিবার upload করতে চাই না।",
              },
              {
                role: "claude",
                text: "আপনার কম্পিউটারে project-এর জন্য একটা folder বানান, আর আপনার brief আর note সেখানে রাখুন। নামটা specific দিন: \"design-work\"-এর চেয়ে \"banking-app-ux\" ভালো।\n\nতারপর এখানে app-এ একটা Project বানান, সেটাকে ওই folder-এর access দিন, আর Project Instructions field খুলুন। আপনার working agreement ওখানেই যাবে। এই project-এর প্রতিটি conversation-এর শুরুতে Claude সেটা পড়ে নেয়, আর দরকার হলে folder-এর file-গুলো খুলতে পারে।\n\nFolder connect হয়ে গেলে আমরা একসঙ্গে working agreement লিখে ফেলব।",
              },
            ],
          },
        },
        {
          title: "আপনার working agreement লিখুন",
          description:
            "এই template paste করুন আর আপনার আসল তথ্য দিয়ে ভরুন। Generic context দিলে generic উত্তর আসে। আপনার user আর constraint নিয়ে যত specific হবেন, Claude তত বেশি কাজে লাগবে।",
          code: {
            snippet: `# এটা আপনার Project Instructions-এ paste করুন (web বা desktop app)

আপনি একজন UI/UX designer-কে সাহায্য করছেন। আপনার যা context লাগবে, তা নিচে দেওয়া হলো।

ROLE
আমি একজন [junior / mid / senior] UI/UX designer, কাজ করি [agency-তে / in-house / freelance]।
আমার রোজকার কাজ [যেমন: mobile app design, dashboard UX, e-commerce checkout flow]।

USERS
আমি যাদের জন্য design করি, তারা [লিখুন: যেমন বাংলাদেশে low-end Android
ফোন ব্যবহার করা first-time smartphone user, ইউরোপের enterprise procurement manager]।
মূল constraint: [যেমন limited data plan, low digital literacy, RTL support]।

TOOLS AND WORKFLOW
আমার মূল design tool [Figma / Adobe XD / Sketch]।
আমি handoff দিই [developer-দের / no-code team-কে / নিজেই build করি]।

OUTPUT RULES
- সহজ ভাষায় লিখুন। কোনো jargon প্রথমবার এলে তার মানে বলে দিন।
- Copy চাইলে আমাকে ২-৩টা variant দিন।
- আমার কাজ critique করার সময় সরাসরি বলুন। উৎসাহ দেওয়ার কথা বাদ দিন।
- আমি brief paste করলে, কিছু বানানোর আগে clarifying প্রশ্ন করুন।
- কোনো suggestion যদি এমন কিছুর ওপর নির্ভর করে যা আপনি verify করতে পারেন না, সেটা বলে দিন।`,
            language: "markdown",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এই যে আমার working agreement:\n\nROLE: Mid-level UI/UX designer, ঢাকার একটা fintech startup-এ in-house।\nUSERS: First-time smartphone user, low-end Android ফোন। Data plan limited। Digital literacy কম।\nTOOLS: Figma। Frontend dev team-কে handoff দিই।\nOUTPUT RULES: সরাসরি বলবেন। Copy-র ২-৩টা variant দেবেন। কিছু বানানোর আগে জিজ্ঞেস করবেন। যা verify করা যায় না, সেটা flag করবেন।",
              },
              {
                role: "claude",
                text: "Save হয়ে গেছে। এই project-এর প্রতিটি conversation-এ আমি এই context মাথায় রাখব।\n\nএখন যেগুলো ঠিক হয়ে গেল:\n- আমি Android-first ধরে নেব, iOS-এর সঙ্গে সমান তাল রাখা নয়\n- JS-heavy interaction লাগে এমন কিছু থাকলে flag করব (low-end device-এ risk)\n- Copy variant হবে ছোট, পড়তে সহজ\n- Gesture-নির্ভর কিছু suggest করার আগে affordance নিয়ে জিজ্ঞেস করব\n\nআপনি যখন ready, আমিও ready।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "Working agreement-টা Project Instructions-এ paste করেছি। ঠিক লাগছে?",
              },
              {
                role: "claude",
                text: "দেখতে পাচ্ছি। আমি যা মাথায় রেখে এগোব, তার কয়েকটা note:\n\n- \"First-time smartphone user, low-end Android\" থাকায় interaction আমি অন্যভাবে evaluate করব। Gesture-এ অভ্যস্ত হওয়া বা fast hardware ধরে নেয় এমন কিছু থাকলে flag করব।\n- \"Data plan limited\" মানে ভারী image বা video-র recommendation নিয়ে আমি প্রশ্ন তুলব।\n- \"Frontend dev team-কে handoff\" মানে design decision-গুলো এমনভাবে বলব যাতে developer-রা সেটা ধরে কাজ করতে পারেন।\n\nঠিকঠাক লাগছে। একটা real prompt দিয়ে test করে দেখবেন?",
              },
            ],
          },
        },
        {
          title: "পরের ধাপে যাওয়ার আগে test করুন",
          description:
            "এই prompt-টা এখনই পাঠান। উত্তর generic লাগলে বুঝবেন আপনার USERS section আরও specific হওয়া দরকার। যতক্ষণ না Claude-এর প্রশ্নগুলো এমন লাগে যেন আপনার কাজ চেনে এমন কোনো colleague করছেন, ততক্ষণ ঠিক করতে থাকুন।",
          code: {
            snippet: `# এটা আপনার Claude session-এ paste করুন:
আমাকে এইমাত্র একটা brief দেওয়া হয়েছে। Client চায় "invoice manage করার জন্য একটা modern, clean app"।
Figma খোলার আগে আমার কী কী প্রশ্ন করা উচিত?`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমাকে এইমাত্র একটা brief দেওয়া হয়েছে। Client চায় \"invoice manage করার জন্য একটা modern, clean app\"। Figma খোলার আগে আমার কী কী প্রশ্ন করা উচিত?",
              },
              {
                role: "claude",
                text: "আপনার user-দের কথা মাথায় রেখে (first-time smartphone user, low-end Android, limited data), Figma ধরার আগে আমি এগুলো নিয়ে প্রশ্ন তুলতাম:\n\n১. আপনার user-রা কি invoice পাঠায়, পায়, নাকি দুটোই? Flow পুরো আলাদা হয়ে যায়।\n২. এই client-এর কাছে \"modern\" মানে কী? First-time user-দের কাছে modern-এর চেয়ে চেনা জিনিস বেশি কাজের।\n৩. Data connection আছে বলে ধরে নেওয়া হচ্ছে কি? Invoice app প্রায়ই এমন জায়গায় ব্যবহার হয় যেখানে connection চলে যায়।\n৪. \"net 30\" বা \"VAT\"-এর মতো financial term-এর সঙ্গে user-রা কতটা পরিচিত বলে ধরা হচ্ছে?\n৫. অন্য দিকে invoice approve করে কে, আর সে কি একই app ব্যবহার করে?\n\nখেয়াল করুন এই list-এ কী নেই: color palette, font, card নাকি list। ওগুলো পরে আসবে। আগে ওপরের প্রশ্নগুলোর উত্তর নিন।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "আমাকে এইমাত্র একটা brief দেওয়া হয়েছে: \"modern, clean invoice management app\"। Figma খোলার আগে কী জিজ্ঞেস করব?",
              },
              {
                role: "claude",
                text: "আপনার working agreement-এর কারণে এখানে কোন প্রশ্নগুলো সবচেয়ে জরুরি, সেটা বদলে যায়।\n\nআপনার নির্দিষ্ট user-দের জন্য (low-end Android, low digital literacy, বাংলাদেশ):\n\n- Invoice পাঠানো নাকি পাওয়া? এটাই পুরো primary flow ঠিক করে দেয়।\n- Connection আছে বলে ধরে নেওয়া হচ্ছে? Offline-first হয়তো একদম basic requirement।\n- User-রা কোন financial শব্দগুলো আগে থেকেই জানে? ধরে নেবেন না যে \"invoice\" শব্দটার মানে তাদের কাছেও একই।\n- Loop-এ আর কে আছে? দোকানের মালিক পাঠালে আর ব্যাংক বা buyer পেলে, আপনার audience দুটো।\n- Failure state কী? User ভুল amount লিখলে কী হবে?\n\nআপনার context আসলে এই প্রশ্নগুলোই চায়। Enterprise SaaS-এ কাজ করা একজন designer একদম আলাদা list পেতেন।",
              },
            ],
          },
        },
        {
          title: "৩০০ শব্দের মধ্যে রাখুন, আর context বদলালে update করুন",
          description:
            "বেশিরভাগ designer দেখেন, ছোট agreement লম্বাগুলোর মতোই ভালো কাজ করে। ৩০০ শব্দের বেশি হলে সম্ভবত আপনি signal-এর বদলে noise যোগ করছেন। পুরোনো context থাকার চেয়ে কোনো context না থাকা ভালো: client, platform বা role বদলালে এটা update করুন। এখনই আপনার USERS section-টা দেখুন: সেখানে যদি \"general audience\" লেখা থাকে বা specific কিছু না থাকে, পরের guide-এ যাওয়ার আগে নতুন করে লিখুন।",
          list: [
            "USERS vague রেখে দেওয়া। \"General audience\" লিখলে Claude কোনো user constraint কাজে লাগাতে পারে না। তারা কারা আর কী করতে চাইছে, নাম ধরে লিখুন।",
            "অন্য কারও template নিজের আসল user-দের মতো করে না বদলেই copy করা। Agreement তখনই কাজ করে যখন সেটা আপনার context বলে, কোনো generic designer-এর নয়।",
            "প্রথম session-এর পর আর কখনো ফিরে না দেখা। Client, platform বা role বদলালে update করুন। পুরোনো agreement থাকার চেয়ে না থাকা ভালো।",
          ],
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Working agreement lean রাখতে কী কী বাদ দেব?",
              },
              {
                role: "claude",
                text: "যা Claude নিজেই আপনার file পড়ে বা জিজ্ঞেস করে জেনে নিতে পারে, সেগুলো বাদ দিন।\n\nবাদ দিন:\n- Company-র ইতিহাস আর background\n- যে tool একদিন হয়তো ব্যবহার করবেন কিন্তু এখন করেন না\n- বড় বড় লক্ষ্যের কথা (\"world-class কাজ করুন\")\n- যা প্রতি সপ্তাহে বদলায় (এখনকার client-এর নাম, sprint goal)\n\nরাখুন:\n- আপনার seniority level (এতে আমি কতটা বুঝিয়ে বলব তা বদলায়)\n- আপনার end user: ঠিক কারা, আর তাদের কী constraint\n- Platform constraint (mobile-first? RTL? low-bandwidth?)\n- Feedback আপনি কীভাবে পেতে চান\n\nTarget হলো ৩০০ শব্দের কম। এর বেশি হলে আপনি signal নয়, noise যোগ করছেন।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "আমার agreement লম্বা হয়ে যাচ্ছে। কী কী কাটতে পারি?",
              },
              {
                role: "claude",
                text: "যা আমি আপনার file পড়ে জেনে নিতে পারি, বা যা ঘন ঘন বদলায়, সেগুলো কেটে দিন।\n\nনিশ্চিন্তে বাদ দিতে পারেন:\n- Project-এর বিস্তারিত description (আমি পড়ে নিতে পারি)\n- Tool-specific config (file reference দেখে আমি Figma না XD, ধরতে পারি)\n- Sprint goal বা এখনকার deliverable (পরের সপ্তাহেই পুরোনো হয়ে যাবে)\n\nরাখুন:\n- যে user constraint আমি নিজে আন্দাজ করতে পারি না (literacy, connectivity, device capability)\n- আপনার feedback preference\n- যে rule এমনিতে বোঝা যায় না (\"কখনো gesture-heavy interaction suggest করবেন না\")\n\n৩০০ শব্দের বেশি হলে আগে project description ছোট করুন। বাড়তি অংশ সাধারণত ওখানেই থাকে।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "যেকোনো design brief decode করুন",
        href: "/for-designers/decode-a-brief",
      },
    },
  },

  "decode-a-brief": {
    sourceHash: "58a81003c962972c",
    translatedAt: "2026-10-06",
    content: {
      title: "যেকোনো design brief decode করুন",
      slug: "decode-a-brief",
      duration: "১৫ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["web", "desktop"],
      description:
        "Brief কখনো আসল সমস্যা নয়। Claude দিয়ে একজন skeptical PM-এর মতো brief-টাকে জেরা করুন, আর আসলে কী চাওয়া হচ্ছে তা বের করে আনুন।",
      intro:
        "এই guide তাদের জন্য, যে UX আর UI designer-রা vague brief পান, আর Figma খোলার আগে জানতে চান আসলে কী চাওয়া হচ্ছে। পড়া শেষে আপনি Claude দিয়ে যেকোনো brief জেরা করতে পারবেন, vague কথার পেছনের আসল সমস্যা বের করতে পারবেন, আর ছোট একটা clarifying প্রশ্নের list ফেরত পাঠাতে পারবেন। Client-রা এমন brief দেন যেখানে লেখা থাকে \"modern and clean\" আর \"intuitive and user-friendly\"। এই কথাগুলোর কোনো মানে নেই। প্রতিটি vague brief-এর পেছনে একটা আসল সমস্যা থাকে: business-এর কোনো চাপ, user-দের কোনো বিরক্তি, বা এমন কোনো constraint যেটা কেউ বলেনি। Figma ধরার আগেই Claude দিয়ে কীভাবে brief খুলে দেখবেন, এই guide তা দেখায়, যাতে শুরু থেকেই আপনি ঠিক সমস্যাটা solve করেন। এই guide-এ PM মানে product manager: যিনি requirement ঠিক করেন আর business-এর হয়ে কথা বলেন।",
      situation: {
        scene:
          "এইমাত্র একটা brief এসেছে। তিন লাইন, কোনো data নেই, আর \"modern\" শব্দটা দুবার। PM শুক্রবারের মধ্যে wireframe চান, আর তিনি এর মধ্যেই অন্য কাজে চলে গেছেন।",
        outcome:
          "Figma খোলার আগেই আপনি কয়েকটা ধারালো clarifying প্রশ্ন ফেরত পাঠাবেন, আর ঠিক কোন সমস্যাটা solve করছেন তা পরিষ্কার জানবেন।",
      },
      outcomes: [
        "আপনার brief-এর vague শব্দগুলো decode করা: প্রতিটার পেছনে আসলে কী লুকিয়ে আছে",
        "চাওয়ার পেছনের আসল সমস্যা, এক বাক্যে বলা",
        "Figma খোলার আগে পাঠানোর জন্য পাঁচটা ধারালো clarifying প্রশ্ন, ready",
      ],
      promptContrast: {
        bad: "এই brief-টা নিয়ে একটু help করবেন? \"Onboarding flow redesign করতে হবে। আরও modern, cleaner, friendlier।\"",
        good: "এই brief-টা একজন skeptical PM-এর মতো জেরা করুন। List করুন: undefined term, কোন data নেই, কী কী ধরে নেওয়া হয়েছে কিন্তু বলা হয়নি, আর কিছু design করার আগে কোন তিনটা প্রশ্ন ফেরত পাঠাতে হবে।\n\n\"Onboarding flow redesign করতে হবে। আরও modern, cleaner, friendlier।\"",
        why: "Claude by default একমত হয়ে যায়। \"এটা নিয়ে help করুন\" বললে উৎসাহ পাবেন। Claude-কে একটা role (\"skeptical PM\") আর একটা output format (\"List করুন: undefined term...\") দিলে সেই default আর থাকে না, আর Claude আপত্তি তুলতে বাধ্য হয়।",
      },
      steps: [
        {
          title: "Brief যেভাবে পেয়েছেন, ঠিক সেভাবেই paste করুন",
          description:
            "গুছিয়ে নেবেন না, নিজের মতো ব্যাখ্যাও করবেন না। যেমন আছে তেমন paste করুন। Vague অংশগুলোই আসল জিনিস: Claude ঠিক সেগুলোকেই জেরা করবে। তারপর জেরা শুরু করতে এই prompt ব্যবহার করুন।",
          code: {
            snippet: `# উদাহরণ brief (এর জায়গায় আপনারটা paste করুন):
"আমাদের onboarding flow redesign করতে হবে। এটা আরও modern,
cleaner আর friendlier হওয়া উচিত। User-রা drop off করছে, আমরা এটা ঠিক করতে চাই।"

# তারপর এই জেরার prompt পাঠান:
এই brief-টা একজন skeptical PM-এর মতো জেরা করুন। List করুন: undefined term,
কোন data নেই, কী কী ধরে নেওয়া হয়েছে কিন্তু বলা হয়নি, আর কিছু design করার আগে
কোন তিনটা প্রশ্ন ফেরত পাঠাতে হবে।`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি এইমাত্র এই brief-টা পেয়েছি। Design শুরু করার আগে একজন skeptical PM-এর মতো এটা জেরা করুন:\n\n\"আমাদের onboarding flow redesign করতে হবে। এটা আরও modern, cleaner আর friendlier হওয়া উচিত। User-রা drop off করছে, আমরা এটা ঠিক করতে চাই।\"",
              },
              {
                role: "claude",
                text: "আসল সমস্যা নিয়ে এই brief প্রায় কিছুই বলে না। যা যা নেই:\n\nUndefined term:\n- \"Modern\": কীসের তুলনায়? Competitor-দের? নাকি এখনকার design-এর?\n- \"Cleaner\": আসল অভিযোগ কি clutter, নাকি এটা আসলে confusion-এর অন্য নাম?\n- \"Friendlier\": এর মানে সাধারণত copy খারাপ, layout নয়\n\nযে data নেই:\n- Onboarding flow-এর ঠিক কোথায় user-রা drop off করছে? Step 1-এ? Step 5-এ? Email verification-এর পরে?\n- এখন drop-off rate কত, আর target কত?\n- যারা drop off করেছে, তাদের সঙ্গে কি কথা বলেছেন?\n\nবলা হয়নি কিন্তু ধরে নেওয়া হয়েছে:\n- Visual redesign করলেই drop-off ঠিক হয়ে যাবে (সমস্যা technical বা copy-র হতে পারে)\n- সব user একই কারণে drop off করছে\n\nকিছু করার আগে client-কে যা জিজ্ঞেস করবেন:\n১. Analytics দেখাতে পারবেন? User-রা ঠিক কোথায় চলে যাচ্ছে?\n২. তারা কেন চলে যাচ্ছে, সেটা নিয়ে কোনো user research হয়েছে?\n৩. ৩ মাস পর success দেখতে কেমন হবে? একটা সংখ্যা বলুন।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "Design শুরু করার আগে একজন skeptical PM-এর মতো এই brief-টা জেরা করুন:\n\n\"Onboarding flow redesign। আরও modern, cleaner, friendlier। User-রা drop off করছে।\"",
              },
              {
                role: "claude",
                text: "Figma ধরার আগে যে red flag-গুলো দেখছি:\n\nVague adjective: \"Modern\", \"cleaner\", \"friendlier\" মাপা যায় না। প্রতিটার পেছনে একটা আসল requirement লুকিয়ে আছে। জিজ্ঞেস করুন: কীসের তুলনায় modern? Cleaner কীভাবে: কম field, নাকি কম visual noise?\n\nDrop-off data নেই: কোন step-এ, তা না বলে শুধু \"user-রা drop off করছে\" মানে আসল সমস্যা কোথায়, কেউ জানে না। Redesign হয়তো পুরো ভুল screen ঠিক করবে।\n\nকোনো success metric নেই: target ছাড়া (drop-off rate, completion rate, time-to-first-action) redesign কাজ করল কি না, বোঝার কোনো উপায় থাকবে না।\n\nFigma খোলার আগে যে তিনটা প্রশ্ন ফেরত পাঠাবেন:\n১. ঠিক কোথায় drop-off হচ্ছে? Analytics share করুন।\n২. সংখ্যায় একটা successful redesign দেখতে কেমন?\n৩. যারা চলে গেছে, তাদের সঙ্গে কেউ কথা বলেছে? তারা কী বলেছে?\n\nএই উত্তরগুলো না পাওয়া পর্যন্ত শুরু করবেন না।",
              },
            ],
          },
        },
        {
          title: "আসল সমস্যাটা বের করুন",
          description:
            "জেরা শেষ হলে Claude-কে বলুন আসলে কী চাওয়া হচ্ছে, তার নাম দিতে। প্রায়ই আসল brief কোনো একটা vague শব্দের নিচে লুকিয়ে থাকে। সেটা বের করতে এই prompt ব্যবহার করুন।",
          code: {
            snippet: `# জেরার পরে এই prompt ব্যবহার করুন:
আপনার জেরা থেকে বলুন, vague কথাগুলোর নিচে আসল brief কোনটা
লুকিয়ে আছে? এক বাক্যে বলুন।`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আপনার analysis দেখে কী মনে হচ্ছে, আসল সমস্যাটা কী?",
              },
              {
                role: "claude",
                text: "\"User-রা drop off করছে\", এটাই আসল brief। বাকি সব, modern, clean, friendly, হলো solution নিয়ে client-এর আন্দাজ।\n\nDrop-off সমস্যা সাধারণত এই তিনটার কোনো একটা থেকে আসে:\n১. Friction: অনেক বেশি step, অনেক বেশি required field, অনেক বেশি cognitive load\n২. Trust: user-রা বোঝে না তারা কীসে sign up করছে, বা product-টাকে এখনো বিশ্বাস করে না\n৩. Value: product-টা কেন সময় দেওয়ার মতো, সেটা দেখার আগেই user একটা দেয়ালে আটকে যায়\n\nVisual redesign এগুলোর কোনোটাই সরাসরি ঠিক করে না। কিছু design করার আগে জানতে হবে আপনি আসলে এই তিনটার কোনটা solve করছেন।\n\n\"Modern, clean, friendly\" দেখে এখনই যদি আন্দাজ করতে হয়: client সম্ভবত trust বোঝাচ্ছেন। \"Friendly\" প্রায় সব সময়ই একটা trust signal।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "এই brief আসলে কোন সমস্যার কথা বলছে?",
              },
              {
                role: "claude",
                text: "Brief বলছে \"redesign\", কিন্তু আসল সমস্যা drop-off: solve করতে হবে সেটাই।\n\nOnboarding-এ drop-off সাধারণত হয়:\n- Friction থেকে (অনেক step, এমন required field যেটা বেশি ব্যক্তিগত মনে হয়)\n- Trust gap থেকে (user বোঝে না সে কীসে রাজি হচ্ছে)\n- দেয়ালের আগে কোনো value না থাকায় (কাজের কিছু দেখানোর আগেই signup চাওয়া)\n\n\"Modern, clean, friendly\" সবচেয়ে বেশি মেলে trust-এর সঙ্গে। Client বলছেন user-রা কেমন feel করুক, design কী করুক তা নয়।\n\nRecommendation: Figma-র আগে এখনকার onboarding audit করুন: (১) কয়টা required step, (২) value দেখানোর আগে কী চাওয়া হচ্ছে, (৩) trust signal কোথায় কোথায় আছে। এটাই আপনার diagnosis। Redesign আসবে এর থেকেই।",
              },
            ],
          },
        },
        {
          title: "Clarifying প্রশ্নের list বানান",
          description:
            "Analysis-টাকে professional, ছোট একটা প্রশ্নের list-এ বদলে নিন, যেটা client বা PM-কে ফেরত পাঠাতে পারবেন। Vague প্রশ্নের চেয়ে specific প্রশ্ন বেশি কাজ করে। Design শুরুর আগে এগুলো পাঠালে, এমন একটা সমস্যার একটা ব্যাখ্যায় আটকে যাওয়া থেকে বাঁচবেন, যে সমস্যা হয়তো আসলে নেই।",
          code: {
            snippet: `# পাঠানোর মতো করে প্রশ্নগুলো format করতে Claude-কে বলুন:
"Client-কে পাঠানোর জন্য পাঁচটা clarifying প্রশ্ন লিখে দিন।
Professional tone। ছোট। প্রতিটা প্রশ্নের সঙ্গে এক লাইনে বলুন কেন এটা জরুরি।"`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Client-কে পাঠানোর জন্য পাঁচটা clarifying প্রশ্ন লিখে দিন। Professional tone। প্রতিটার সঙ্গে এক লাইনে বলুন কেন এটা জরুরি।",
              },
              {
                role: "claude",
                text: "শুরু করার আগে পাঠানোর জন্য ৫টা প্রশ্ন:\n\n১. Onboarding flow-এর কোথায় user-রা drop off করছে?\nএটা না জানলে redesign হয়তো পুরো ভুল screen-এ focus করবে।\n\n২. মাপা যায় এমনভাবে success দেখতে কেমন?\nএকটা target completion rate থাকলে আমরা সেদিকে design করতে পারি।\n\n৩. যারা drop off করেছে, তাদের কি interview করা হয়েছে?\nযেকোনো heuristic audit-এর চেয়ে তাদের নিজের কথা বেশি কিছু বলবে।\n\n৪. আগে কী কী চেষ্টা করা হয়েছে?\nএকই কাজ দুবার করা এড়ানো যায়, আর বোঝা যায় team কী কী বাদ দিয়েছে।\n\n৫. Primary user persona কে, আর তারা এখনকার experience-কে কীভাবে বর্ণনা করবে?\nAudience-এর ওপর নির্ভর করে \"modern and friendly\"-র মানে বদলে যায়।\n\nকোনো wireframe করার আগে এগুলো পাঠান। আরও ভালো একটা brief ফেরত পাবেন।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "শুরু করার আগে PM-কে পাঠানোর জন্য পাঁচটা clarifying প্রশ্ন লিখে দিন। Professional, ছোট। প্রতিটার সঙ্গে এক লাইনের কারণ।",
              },
              {
                role: "claude",
                text: "পাঠানোর জন্য ৫টা প্রশ্ন:\n\n১. Flow-এর কোথায় drop-off সবচেয়ে বেশি? (ভুল screen design করা আটকায়)\n২. Target completion rate কত? (Redesign-কে একটা মাপা যায় এমন goal দেয়)\n৩. User-রা কেন drop off করছে, সে নিয়ে কোনো data আছে? (Assumption-এর চেয়ে interview quote ভালো)\n৪. Timeline আর launch constraint কী? (পুরো redesign হবে নাকি নির্দিষ্ট কিছু fix, সেটা ঠিক করে)\n৫. \"Modern, cleaner, friendlier\" direction কে approve করেছেন? (আমরা কার মত অনুযায়ী design করছি, সেটা বেরিয়ে আসে)\n\nকিছু ধরার আগে এগুলো পাঠান। ভুল দিকে ২ সপ্তাহের কাজ বাঁচবে।",
              },
            ],
          },
        },
        {
          title: "সাধারণ ভুলগুলো",
          description: "এই process ব্যবহার করতে গিয়ে designer-রা যে চারটা ভুল করেন।",
          list: [
            "Paste করার আগে brief গুছিয়ে নেওয়া। Brief নিজের ভাষায় লিখলে বা পরিষ্কার করলে, Claude-এর জেরা করার জন্য যে vague অংশ দরকার, সেটাই মুছে যায়। যেমন পেয়েছেন ঠিক তেমন paste করুন, typo-সহ। এই অস্পষ্টতাই আসল signal।",
            "সরাসরি solution-এ চলে যাওয়া। জেরা শেষ করে সঙ্গে সঙ্গে Figma খুললে পুরো কাজটাই বৃথা। আগে clarifying প্রশ্ন পাঠান, আর কোনো design tool ধরার আগে উত্তরের জন্য অপেক্ষা করুন।",
            "অনেক বেশি প্রশ্ন করা। Claude ১২টা প্রশ্ন দিল আর আপনি সবগুলোই পাঠিয়ে দিলেন, তাহলে client উত্তর দেওয়া বন্ধ করে দেবেন। যে ৩টা প্রশ্ন আপনার design সবচেয়ে বেশি বদলে দেবে, সেগুলো বেছে নিন। বাকিগুলো পরে।",
            "জেরাকেই final brief ধরে নেওয়া। জেরার output হলো diagnosis, brief নয়। Client-এর উত্তর পেয়ে গেলে ধাপ ৩ চালিয়ে সেটাকে design করার মতো কিছুতে নতুন করে লিখুন।",
          ],
        },
      ],
      nextLink: {
        label: "আরও ধারালো brief লিখুন",
        href: "/for-designers/write-a-sharper-brief",
      },
    },
  },

  "write-a-sharper-brief": {
    sourceHash: "5d1a449af524960e",
    translatedAt: "2026-10-06",
    content: {
      title: "আরও ধারালো brief লিখুন",
      slug: "write-a-sharper-brief",
      duration: "১৫ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["web", "desktop"],
      description:
        "Vague একটা creative brief-কে এমন কিছুতে বদলে নিন, যেটা থেকে সত্যিই design করা যায়। Claude-কে একজন skeptical product manager (PM)-এর role দিন, আর critic-এর মতো নয়, collaborator-এর মতো আপত্তি তুলতে ওর সাহায্য নিন।",
      intro:
        "এই guide তাদের জন্য, যে UX আর UI designer-রা এত vague brief পান যে design করা যায় না, আর friction তৈরি না করে আপত্তি জানাতে চান। পড়া শেষে আপনি vague কথাগুলো flag করতে পারবেন, একটা professional pushback message বানাতে পারবেন, আর উত্তর পেলে brief নতুন করে লিখতে পারবেন। ভালো designer-রা product manager (PM)-দের মতো ভাবেন। তাঁরা শুধু brief নেন না: প্রশ্ন করেন, আরও ধারালো করেন, আর কিছু বাদ পড়লে আপত্তি তোলেন। সমস্যা হলো, আপত্তি তোলা risky মনে হয়, বিশেষ করে client যখন আপনার চেয়ে senior। Friction নয়, collaboration-এর মতো শোনায় এমন একটা reframe Claude দিয়ে কীভাবে বানাবেন, আর এমন একটা design brief কীভাবে পাবেন যেটা থেকে সত্যিই কাজ করা যায়, এই guide তা দেখায়।",
      situation: {
        scene:
          "একটা brief এসেছে। তাতে \"modern\", \"intuitive\" আর \"user-friendly\" শব্দগুলো আছে। কোনো data নেই, user-এর কোনো বর্ণনা নেই, কোনো success metric নেই। দুই সপ্তাহ পর design review, আর design করার মতো concrete কিছুই হাতে নেই।",
        outcome:
          "আপনি প্রতিটা undefined term flag করবেন, একটা professional pushback message পাঠাবেন, আর হাতে থাকবে এমন একটা brief, যেটা নিয়ে Figma খোলা যায়।",
      },
      outcomes: [
        "Brief-এর প্রতিটা vague শব্দ flag করা আর নাম দেওয়া, প্রতিটার পেছনে কী লুকিয়ে আছে তা-সহ",
        "পাঠানোর জন্য ready একটা professional pushback message, যেটা সমালোচনা নয়, collaboration হিসেবে লেখা",
        "আপনার assumption নয়, client-এর উত্তর থেকে বানানো একটা specific brief, যেটা থেকে design করা যায়",
      ],
      steps: [
        {
          title: "প্রতিটা vague বা বাদ পড়া অংশ flag করুন",
          description:
            "যে brief পেয়েছেন সেটা paste করুন, আর Claude-কে বলুন এমন প্রতিটা phrase flag করতে যেটা মাপা যায় না, undefined, বা নিজের সঙ্গেই contradict করে। এখনই কিছু ঠিক করবেন না। Flag করা আর ঠিক করা আলাদা রাখলে analysis সৎ থাকে। চলতে চলতে ঠিক করলে সমস্যাগুলো আর চোখে পড়ে না।",
          code: {
            snippet: `# এই prompt ব্যবহার করুন:
"এই brief-টা পড়ুন। যে শব্দ বা phrase vague, মাপা যায় না,
বা একেকজনের কাছে একেক মানে হতে পারে, সবগুলো flag করুন। এখনই fix suggest করবেন না। শুধু flag করুন।"`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এই brief-টা পড়ুন। Vague, মাপা যায় না, বা দুই রকম মানে হয় এমন প্রতিটা phrase flag করুন। এখনই কিছু ঠিক করবেন না, শুধু flag করুন।\n\n\"আমরা এমন একটা dashboard চাই যেটা আমাদের sales team-কে performance-এর একটা পরিষ্কার ছবি দেবে। এটা intuitive আর easy to use হবে, সব key metric থাকবে front and centre-এ। এমন কিছু যেটা premium আর modern লাগে।\"",
              },
              {
                role: "claude",
                text: "Flag করা phrase:\n\n\"Performance-এর পরিষ্কার ছবি\": Performance মাপা হবে কীভাবে? Rep অনুযায়ী? Region? Deal stage? Revenue নাকি activity?\n\n\"Intuitive আর easy to use\": কীসের তুলনায়? এখন কোন tool ব্যবহার হয়? সেটা কঠিন লাগে কেন?\n\n\"সব key metric\": কোন metric? কে ঠিক করেছে? পুরো design সমস্যাটাই সম্ভবত এই কয়টা শব্দে লুকিয়ে আছে।\n\n\"Front and centre\": Priority order কে ঠিক করবে? Sales lead? VP? নাকি প্রতিটা rep নিজে?\n\n\"Premium আর modern\": কোনো reference ছাড়া aesthetic direction। একটা fintech dashboard-এর কাছে premium আর একটা SaaS startup-এর কাছে premium দেখতে আলাদা।\n\nBrief যেভাবে লেখা, তা থেকে এর কোনোটারই উত্তর পাওয়া যায় না। প্রতিটা আসলে requirement-এর ছদ্মবেশে একটা design decision।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "এই brief-এর প্রতিটা vague বা দুই রকম মানে হয় এমন phrase flag করুন। কোনো fix suggest করবেন না:\n\n\"Sales team-এর জন্য dashboard। Performance-এর পরিষ্কার ছবি। Intuitive। Key metric front and centre-এ। Premium আর modern।\"",
              },
              {
                role: "claude",
                text: "Flag করা হলো:\n\n\"Performance-এর পরিষ্কার ছবি\": কোন metric, কোন time range, কোন baseline-এর তুলনায়?\n\"Intuitive\": এখনকার tool-এর তুলনায়, নাকি কোনো competitor-এর?\n\"Key metric\": পুরো design সমস্যাটা সম্ভবত এটাই। কোনগুলো key, কে ঠিক করবে?\n\"Front and centre\": hierarchy কে ঠিক করবে, আর user role অনুযায়ী কি বদলায়?\n\"Premium আর modern\": কোনো visual reference দেওয়া নেই। Designer, PM আর CEO-র কাছে এর মানে আলাদা হবে।\n\n৫টা phrase flag করা হলো। এর কোনোটাই design শুরু করার মতো যথেষ্ট তথ্য দেয় না।",
              },
            ],
          },
        },
        {
          title: "Pushback message বানান",
          description:
            "এবার Claude-কে বলুন যে message-টা ফেরত পাঠাবেন, সেটা লিখে দিতে। Message-এর সুর হবে \"আমি এটা ঠিকঠাক করতে চাই\", \"আপনার brief ভুল\" নয়। লক্ষ্য হলো একজন চিন্তাশীল collaborator-এর মতো শোনানো। প্রশ্নের list হিসেবে না পাঠিয়ে collaboration হিসেবে পাঠালে, stakeholder defensive হয়ে উত্তর দেওয়া বন্ধ করে দেওয়ার সম্ভাবনা কমে।",
          code: {
            snippet: `# এই prompt ব্যবহার করুন:
"Client-কে পাঠানোর মতো একটা ছোট, professional message লিখে দিন।
Brief-এর মূল gap-গুলো তুলুন, কিন্তু প্রতিটা প্রশ্ন এমনভাবে লিখুন যেন
সত্যিই কাজ করে এমন কিছু design করতে আমার clarity দরকার।
Tone: collaborative, ঝগড়াটে নয়। সর্বোচ্চ ১৫০ শব্দ।"`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এই dashboard brief নিয়ে client-কে পাঠানোর মতো একটা ছোট professional message লিখে দিন। মূল gap-গুলো তুলুন। এমনভাবে বলুন যে কাজ করে এমন কিছু design করতে আমার clarity দরকার। Collaborative হবে, ঝগড়াটে না। ১৫০ শব্দের কম।",
              },
              {
                role: "claude",
                text: "Hi [Name],\n\nBrief-এর জন্য ধন্যবাদ। Wireframe-এ যাওয়ার আগে কয়েকটা জিনিস আমি ঠিকঠাক বুঝে নিতে চাই:\n\nMetric: Sales team-এর কাছে কোন performance metric সবচেয়ে জরুরি, আর priority order কে ঠিক করবেন? প্রায় সব layout decision এর ওপর নির্ভর করে।\n\nএখনকার tool: Rep-রা এখন কী ব্যবহার করেন, আর মূল বিরক্তিটা কোথায়? এখনকার experience-এর তুলনায় \"intuitive\" মানে কী, সেটা বুঝলে ঠিক জায়গায় simplify করতে পারব।\n\nVisual reference: আপনার কাছে \"premium\" লাগে এমন কোনো dashboard-এর উদাহরণ আছে, competitor হোক বা আপনার পছন্দের কোনো tool? একটা direction বেছে নেওয়ার আগে aesthetic নিয়ে একমত হতে সুবিধা হবে।\n\nসুবিধা হলে এগুলো নিয়ে একটা ছোট call-এও বসতে পারি।\n\nএটা ৯৬ শব্দের। Client-কে আক্রমণ করা হচ্ছে মনে না করিয়েই vague term-গুলো কেটে দেয়।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "Pushback message-টা লিখে দিন। Collaborative হবে, ঝগড়াটে না। ১৫০ শব্দের কম। সবচেয়ে জরুরি তিনটা gap তুলুন। কিন্তু client যেন criticised feel না করেন।",
              },
              {
                role: "claude",
                text: "Hi [Name],\n\nকাজ শুরু করার জন্য ভালো একটা brief। Wireframing শুরু করার আগে তিনটা জিনিস পাকা করে নিতে চাই:\n\n১. Metric: Team-এর কাছে কোন performance metric সবচেয়ে জরুরি, আর role অনুযায়ী (rep বনাম manager) কি priority আলাদা?\n\n২. \"Intuitive\": তাঁরা এখন কোন tool ব্যবহার করেন, আর friction কোথায়? এই context জানলে বোঝা যাবে কোথায় simplify করা সবচেয়ে জরুরি।\n\n৩. Visual direction: আপনার পছন্দের কোনো dashboard আছে, competitor হোক বা অন্য কিছু? আলাদা industry-তে \"premium\" একদম আলাদা দেখায়।\n\nএগুলোর উত্তর পেলে wireframe stage-এ অনেক আসা-যাওয়া কমে যাবে।\n\n৮৫ শব্দ। \"পাকা করে নিতে চাই\" আর \"আসা-যাওয়া কমে যাবে\" কথাগুলো প্রশ্নগুলোকে সমালোচনা নয়, কাজ দ্রুত করার উপায় হিসেবে দেখায়।",
              },
            ],
          },
        },
        {
          title: "উত্তর দিয়ে brief নতুন করে লিখুন",
          description:
            "Client উত্তর দিলে সেগুলো paste করুন, আর Claude-কে বলুন এমন একটা tight, specific brief লিখে দিতে যেটা থেকে সত্যিই design করা যায়। পুরো কাজে এটাই হবে আপনার মূল reference। উত্তর পাওয়ার পরে নতুন করে লিখলে assumption-এর ওপর design করা আটকায়: নতুন brief ঠিক ততটাই শক্ত, যতটা শক্ত তার পেছনের তথ্য।",
          code: {
            snippet: `# Client-এর উত্তর paste করুন, তারপর এই prompt ব্যবহার করুন:
"আমার প্রশ্নগুলোর উত্তর এই: [উত্তর paste করুন]

মূল brief-টাকে একটা specific, কাজে লাগানোর মতো design brief-এ নতুন করে লিখুন।
এগুলো রাখুন: আসল সমস্যা, user আর তাদের constraint, মাপা যায় এমনভাবে 'done'
দেখতে কেমন, visual direction, আর কী scope-এর বাইরে।"`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Client-এর উত্তর এসেছে:\n\n- Metric: closed deal, pipeline value, quota attainment। Priority ঠিক করবেন sales lead। Rep-রা নিজের data দেখবে, manager-রা team view।\n- এখনকার tool: Excel। Rep-রা scroll করা আর হাতে update করা একদম পছন্দ করে না।\n- Visual reference: Linear আর Notion-এর screenshot পাঠিয়েছেন।\n\nএই উত্তরগুলো দিয়ে brief-টা নতুন করে লিখে দিন। Specific আর কাজে লাগানোর মতো করে।",
              },
              {
                role: "claude",
                text: "নতুন Brief: Sales Performance Dashboard\n\nসমস্যা: Sales rep আর manager-রা এখন Excel-এ performance track করেন। হাতে update করার process friction তৈরি করে; tool-টা insight না দিয়ে admin কাজের মতো লাগলে rep-রা আগ্রহ হারান।\n\nUser:\n- Rep: নিজের closed deal, pipeline value আর quota attainment-এর view। হাতে কোনো entry নয়।\n- Manager: একই metric-এর team-level view, প্রতিটা rep-এর drill-down-সহ।\n\n\"Done\" দেখতে কেমন: একজন rep দিনের শুরুতে dashboard খোলেন আর ৬০ সেকেন্ডের মধ্যে বন্ধ করেন, যা জানা দরকার ঠিক সেটা দেখে নিয়ে।\n\nVisual direction: Low-chrome, minimal। Reference: Linear আর Notion।\n\nScope-এর বাইরে: complex filtering, custom date range, export tool। ওগুলো scope 2।\n\nএই brief থেকে design করা যায়। আগেরটা থেকে যেত না।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "উত্তর এসেছে: metric হলো closed deal + pipeline + quota। Priority ঠিক করবেন sales lead। Rep-রা নিজের data দেখবে, manager-রা team-এর। এখন tool Excel, rep-রা হাতে update করা পছন্দ করে না। Visual reference: Linear আর Notion। Brief-টা নতুন করে লিখে দিন।",
              },
              {
                role: "claude",
                text: "নতুন Brief\n\nসমস্যা: Excel-এ performance track করায় হাতে update করার বোঝা তৈরি হয়, আর rep-রা নিজের data থেকেই দূরে সরে যান।\n\nUser: Sales rep (নিজের metric, হাতে কোনো entry নয়) আর manager (team-level, rep অনুযায়ী drill-down-সহ)।\n\nPriority অনুযায়ী metric: closed deal, pipeline value, quota attainment।\n\nSuccess: একজন rep dashboard খোলেন, নিজের অবস্থা দেখে নেন, আর ৬০ সেকেন্ডের মধ্যে বন্ধ করেন।\n\nAesthetic direction: Low-chrome, minimal। Reference: Linear আর Notion।\n\nScope-এর বাইরে: custom filtering, date range, CSV export।\n\nএটাই brief। আগেরটা নয়, এটা ধরে design করুন।",
              },
            ],
          },
        },
        {
          title: "সাধারণ ভুলগুলো",
          description: "যে চারটা ভুলে এই process ভেস্তে যায়।",
          list: [
            "Flag করার সময়ই সমস্যা ঠিক করতে থাকা। Flag করার ধাপে বেরোবে সমস্যার একটা list, revised brief নয়। একই pass-এ ঠিক করা শুরু করলে, যে অংশগুলো আগেই ছুঁয়েছেন সেখানকার সমস্যা আর ধরা পড়ে না।",
            "অনেক বেশি প্রশ্ন পাঠানো। List ৮ বা ১০টা item-এ গেলে client-এর মনে হবে জেরা চলছে। যে ৩টা আপনার design সবচেয়ে বেশি বদলাবে, সেখানে কেটে আনুন। ছোট list-এ উত্তর আসে দ্রুত, আর বেশি কাজের।",
            "উত্তর পাওয়ার আগেই নতুন করে লেখা শুরু করা। Revised brief ঠিক ততটাই ভালো, যতটা ভালো তার পেছনের উত্তরগুলো। Assumption থেকে লিখলে পুরো process-এর উদ্দেশ্যটাই নষ্ট।",
            "Pushback message-এ vague framing ব্যবহার করা। \"আমি নিশ্চিত হতে চাই যে ঠিক বুঝেছি\" কাজ করে। \"আপনার brief পরিষ্কার নয়\" করে না। Message Claude লিখে দিতে পারে, কিন্তু পাঠানোর আগে নিজে পড়ে দেখুন tone-টা client-এর সঙ্গে আপনার সম্পর্কের সঙ্গে মেলে কি না।",
          ],
        },
      ],
      nextLink: {
        label: "নিজের design নিজে evaluate করুন",
        href: "/for-designers/evaluate-your-designs",
      },
    },
  },

  "evaluate-your-designs": {
    sourceHash: "03315ab2301921c2",
    translatedAt: "2026-10-06",
    content: {
      title: "নিজের design নিজে evaluate করুন",
      slug: "evaluate-your-designs",
      duration: "২০ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["web", "desktop"],
      description:
        "যেকোনো design-এ তিনটা forced-perspective critique চালান: confused user, skeptical engineer, impatient PM। উৎসাহ নয়, specific সমস্যা পান।",
      intro:
        "এই guide তাদের জন্য, যে UX আর UI designer-রা নিজের কাজের generic প্রশংসা নয়, honest critique চান। পড়া শেষে আপনি যেকোনো screen-এ তিনটা forced-perspective critique চালাতে পারবেন, আর ঠিক করার মতো আসল সমস্যার একটা priority অনুযায়ী সাজানো list বানাতে পারবেন। Claude by default প্রশংসা করে। Design review করতে বললে ঠিক করার জিনিস খোঁজার আগে প্রশংসার জিনিস খুঁজবে। তিনটা forced-perspective prompt দিয়ে কীভাবে এই pattern ভাঙবেন, এই guide তা দেখায়: এই prompt-গুলো Claude-কে একটা নির্দিষ্ট viewpoint নিতে আর তাতেই থাকতে বাধ্য করে। শেষে হাতে থাকবে আসল সমস্যার priority অনুযায়ী সাজানো একটা list, \"great job, but consider...\" টাইপের list নয়।",
      situation: {
        scene:
          "একটা design শেষ করেছেন, share করার আগে honest feedback চান। Claude-কে \"কেমন হয়েছে?\" জিজ্ঞেস করলে কী হয়, আপনি জানেন: আগে ভালো দিকগুলো, শেষে চাপা পড়ে থাকা দুটো নরম suggestion, আর কাজে লাগানোর মতো কিছুই না।",
        outcome:
          "আপনি তিনটা forced-perspective critique চালাবেন, আর হাতে থাকবে user impact অনুযায়ী সাজানো আসল সমস্যার একটা list, উৎসাহের list নয়।",
      },
      outcomes: [
        "তিনটা forced-perspective critique: confused user, skeptical engineer, impatient PM",
        "Design effort নয়, user impact অনুযায়ী সাজানো আসল সমস্যার একটা ranked list",
        "একটা synthesis, যেটা design-টাকে ভাঙাচোরা না শুনিয়েই team-এর সামনে দেখাতে পারবেন",
      ],
      steps: [
        {
          title: "Critique-এর setup করুন",
          description:
            "একটা screenshot paste করুন, অথবা screen-টা বিস্তারিত বর্ণনা করুন: তাতে কী আছে, user কী করতে চাইছে, flow দেখতে কেমন। Desktop app-এ আপনার project folder-এ export করা file-টাও Claude-কে দেখিয়ে দিতে পারেন।",
          code: {
            snippet: `# Claude-এর critique-এর জন্য design-টা বর্ণনা করুন:
"এই design-টা আমি আপনাকে দিয়ে critique করাতে চাই।

Screen: [Screen-এর নাম, যেমন 'onboarding step 2 - account setup']
User goal: [এই screen-এ user কী করতে চাইছে]
Screen-এ যা আছে: [UI element, label, layout-এর list]
Platform: [Mobile / web / tablet]
User: [Target user-এর ছোট বর্ণনা]"`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি চাই আপনি এই design-টা critique করুন। Context এই:\n\nScreen: Onboarding step 2, account setup\nUser goal: নাম আর phone number দেওয়া, আর একটা PIN বানানো\nScreen-এ যা আছে: ওপরে app logo, তিনটা input field (Name, Phone, PIN), একটা \"Continue\" button, আর ছোট ধূসর লেখা \"Your data is safe with us\"\nPlatform: Android mobile\nUser: First-time smartphone user, digital literacy কম, বয়স ২৫-৪০, শহুরে বাংলাদেশ",
              },
              {
                role: "claude",
                text: "Context পেয়েছি। কোন perspective আগে চান?\n\n১. Confused user: আমি এমন একজনের মতো দেখব যে digital form-এর সঙ্গে পরিচিত নয়, কোনো literacy ধরে নেওয়া হবে না\n২. Skeptical engineer: implementation-এর জটিলতা, edge case, error state দেখব\n৩. Impatient PM: conversion, friction, আর flow-এ এই screen-টা থাকার মতো কি না, সেটা দেখব\n\nএকটা বেছে নিন, অথবা তিনটাই পরপর চালাতে পারি।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "এই screen-এ তিনটা perspective-এর critique setup করুন:\n\nOnboarding step 2। Name, phone, PIN field। Android। First-time smartphone user, digital literacy কম, শহুরে বাংলাদেশ।",
              },
              {
                role: "claude",
                text: "Context load হয়েছে। তিনটা perspective ready:\n\n১. Confused user: কম literacy আর প্রথমবার ফোন ব্যবহারের দৃষ্টিতে evaluate করে\n২. Skeptical engineer: implementation আর error state-এর gap evaluate করে\n৩. Impatient PM: friction আর conversion risk evaluate করে\n\nকোনটা আগে চান, নাকি পরপর চালিয়ে দেব?",
              },
            ],
          },
        },
        {
          title: "Confused user perspective চালান",
          description:
            "এই perspective এমন একজন real user-এর চোখে দেখে, যে digital convention বোঝে না। এতে copy-র সমস্যা, interaction নিয়ে confusion, আর যে জ্ঞান ধরে নেওয়া উচিত নয় অথচ ধরে নেওয়া হয়েছে, সেগুলো বেরিয়ে আসে।",
          code: {
            snippet: `# Confused user-এর prompt:
"আপনি একজন first-time smartphone user, digital literacy কম।
আগে কখনো account setup করেননি। PIN কী, বা কেন লাগে, জানেন না।
এই screen-টা দেখে বলুন কোথায় কোথায় আপনি confused হবেন।
Character-এ থাকুন। Solution suggest করবেন না। শুধু confusion-টা বর্ণনা করুন।"`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Confused user perspective চালান। আপনি বাংলাদেশের একজন first-time smartphone user, digital literacy কম। আগে কখনো account setup করেননি। PIN কী বা কেন লাগে, জানেন না। Screen-টা দেখে বলুন কোথায় কোথায় confused হচ্ছেন। Character-এ থাকবেন। Solution suggest করবেন না।",
              },
              {
                role: "claude",
                text: "First-time user হিসেবে, character-এ:\n\nApp খুলে ওপরে আমার নাম দেখি। ঠিক আছে। তারপর phone number চাইছে। Number তো জানি, কিন্তু app-এর এটা কেন লাগবে বুঝছি না। আমাকে কি call করবে? কারও সঙ্গে share করবে?\n\nতারপর লেখা \"PIN\"। এটা কী, জানি না। Password? কয় digit? Field-এ কিছু বলা নেই। নাম লিখতে চেষ্টা করি, কিন্তু শুধু number নিচ্ছে। কেন, বুঝি না।\n\nButton-এ লেখা \"Continue\"। কোথায় যাচ্ছি? চাপার পর কী হবে?\n\nনিচে লেখা \"Your data is safe with us\"। এটা পড়ে আমার ভয় কমে না, উল্টো বাড়ে। মনে হয় চিন্তার কোনো কারণ ছিল।\n\nযে confusion point-গুলো পাওয়া গেল:\n- Phone number কেন লাগবে? উদ্দেশ্য বলা নেই\n- \"PIN\" undefined: label নেই, hint নেই, কয় character তা নেই\n- \"Continue\" চাপার পর কী হবে, কোনো ইঙ্গিত নেই\n- Safety disclaimer আশ্বাস না দিয়ে উল্টো দুশ্চিন্তা তৈরি করে\n- ফেরার কোনো পথ চোখে পড়ে না: ফাঁদের মতো লাগে",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "Confused user perspective চালান। First-time smartphone user, বাংলাদেশ, literacy কম। Character-এ থাকবেন। শুধু confusion বলবেন, কোনো solution না।",
              },
              {
                role: "claude",
                text: "Character-এ:\n\n\"নাম আর phone-এর field দেখছি। এটা ঠিক আছে। কিন্তু তারপর লেখা PIN। এটা কী, জানি না। আমার ফোনের PIN? নাকি নতুন একটা বানাতে হবে? কয় digit? Field শুধু number নেয়, কিন্তু কয়টা, বলে না।\n\nContinue button দেখে চিন্তা হয়। এটা আমাকে কোথায় নিয়ে যাবে? চাপার পর কিছু ভুল হলে কি ফিরে আসতে পারব?\n\nআর নিচের লেখাটা: 'Your data is safe'। এটা আমাকে কেন বলছে? অন্যদের data-র কিছু হয়েছিল নাকি?\"\n\nConfusion point:\n১. PIN undefined (label, উদ্দেশ্য, format)\n২. Phone number-এর উদ্দেশ্য বলা নেই\n৩. Continue কী করে, তার কোনো ইঙ্গিত নেই\n৪. ফেরার কোনো পথ দেখা যায় না\n৫. Safety message আশ্বাসের বদলে warning-এর মতো পড়ে",
              },
            ],
          },
        },
        {
          title: "Engineer আর PM perspective চালান",
          description:
            "Engineer ধরবেন সেই জিনিসগুলো, যেগুলো build করতে হবে কিন্তু আপনি design করেননি। PM জিজ্ঞেস করবেন flow-এ এই screen-টা থাকার মতো কি না।",
          code: {
            snippet: `# Skeptical engineer-এর prompt:
"আপনি একজন frontend developer, এই screen-টা আপনাকে build করতে হবে।
যত edge case, error state আর implementation সমস্যা দেখছেন, সব বলুন।
আমি কোন কোন জিনিস design করিনি?"

# Impatient PM-এর prompt:
"আপনি একজন PM, যাঁর focus conversion আর retention।
Flow-এ এই screen-টা কি থাকার মতো?
কোন friction কেটে দেবেন? কী পরে সরিয়ে দেবেন?"`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এবার skeptical engineer আর impatient PM perspective পরপর চালান।",
              },
              {
                role: "claude",
                text: "Skeptical engineer:\n\n- PIN field: min/max length কত? কেউ ৩ digit দিয়ে Continue চাপলে কী হবে? কোনো error state design করা নেই।\n- Phone number: validate হয় কি? Country code কোন format-এ আশা করা হচ্ছে? User country code ছাড়া দিলে কী হবে?\n- Name field: character limit কত? Latin নয় এমন অক্ষরের নাম হলে?\n- Submit করার সময় network চলে গেলে কী হবে? কোনো loading বা error state দেখা যাচ্ছে না।\n- PIN confirmation: user একবারই PIN দিচ্ছে। Typo ধরবেন কীভাবে? Confirm field নেই।\n\nImpatient PM:\n\n- Onboarding-এর step 2-তেই ৩টা জিনিস চাইছেন। নাম কি এখনই লাগবে? পরে নেওয়া যায় না?\n- PIN বানানো high-friction। User value দেখার পর পর্যন্ত কি এটা পিছিয়ে দেওয়া যায়?\n- \"Your data is safe\" copy যতটা trust আনছে, তার চেয়ে বেশি নষ্ট করছে। সরিয়ে দিন, বা specific কিছু দিয়ে বদলান।\n- এই step-এর completion rate কত? ৭০%-এর নিচে হলে সম্ভবত PIN-ই দায়ী।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "Engineer আর PM perspective পরপর চালান।",
              },
              {
                role: "claude",
                text: "Engineer:\n- PIN: কোনো length constraint দেখানো নেই, confirm field নেই, ভুল format-এর error state নেই\n- Phone: country code কীভাবে handle হবে ঠিক নেই, কোনো validation message design করা নেই\n- Name: character limit? Latin নয় এমন অক্ষর?\n- Submit-এর সময় network failure: কোনো loading বা error state নেই\n\nPM:\n- Step 2-তে ৩টা চাওয়া। Funnel-এর এই জায়গায় নাম কি দরকার?\n- PIN বানানোই সবচেয়ে high-friction element। প্রথম value দেওয়ার পর পর্যন্ত পিছিয়ে দেওয়ার কথা ভাবুন।\n- \"Your data is safe\" আশ্বাস নয়, দুশ্চিন্তা তৈরি করে। সরিয়ে দিন, বা specific করুন: \"We never share your phone number.\"\n- Step 2-এ drop-off বেশি হলে সবচেয়ে likely কারণ PIN। অন্য কিছু redesign করার আগে analytics দেখুন।",
              },
            ],
          },
        },
        {
          title: "সব মিলিয়ে priority অনুযায়ী action list বানান",
          description:
            "Claude-কে বলুন তিনটা perspective-এর সবকিছু নিয়ে fix-এর একটা ranked list বানাতে, design effort নয়, user impact অনুযায়ী।",
          code: {
            snippet: `আপনার তিন perspective-এর critique-টাকে priority অনুযায়ী একটা action list-এ বদলে দিন।
ভাগ করুন: share করার আগেই ঠিক করতে হবে, handoff-এর আগে ঠিক করা উচিত,
পরের iteration-এ ভাবা যায়।
প্রতিটা item কোন heuristic বা principle ভাঙছে, সেটাও লিখুন।`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "তিনটা critique-এর সবকিছু মিলিয়ে priority অনুযায়ী একটা fix list বানান। User impact অনুযায়ী rank করুন। Top 5।",
              },
              {
                role: "claude",
                text: "User impact অনুযায়ী top 5 fix:\n\n১. PIN confirmation field যোগ করুন। PIN-এ একটা typo হলেই user সঙ্গে সঙ্গে lock out হয়ে যায়। এর চেয়ে কঠিন failure অন্য কোনো একক সমস্যায় নেই। [Engineer + User]\n\n২. PIN-এর মানে বলুন আর label দিন। First-time user-এর কাছে \"PIN\"-এর চেয়ে \"4-digit security code\" বেশি পরিষ্কার। Field-এর নিচে একটা hint দিন। [User]\n\n৩. Phone number কেন লাগবে, বলুন। এক লাইন: \"We will use this to recover your account.\" এতে trust-এর একটা বড় বাধা সরে যায়। [User + PM]\n\n৪. Error state design করুন। অন্তত: ভুল phone format, PIN খুব ছোট, network failure। এর কোনোটাই এখন design করা নেই। [Engineer]\n\n৫. \"Your data is safe\" copy সরিয়ে দিন বা specific করুন। বদলে লিখুন: \"We never share your phone number.\" Specific কথা trust বাড়ায়। Vague কথা trust নষ্ট করে। [PM + User]\n\nবাকি সব friction কমানোর কাজ: দরকারি, কিন্তু আটকে দিচ্ছে এই ৫টা।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "তিনটা critique মিলিয়ে top 5 fix-এর list দিন। User impact অনুযায়ী rank করবেন।",
              },
              {
                role: "claude",
                text: "Impact অনুযায়ী top 5:\n\n১. PIN confirmation field: confirmation ছাড়া typo = স্থায়ীভাবে lock out। সবচেয়ে গুরুতর failure। [Engineer/User]\n২. PIN-এর label বদলে \"4-digit code\" করুন: first-time user-রা PIN শব্দটা জানে না। একটা label বদল, বোঝার দিক থেকে বড় লাভ। [User]\n৩. Phone number-এর উদ্দেশ্য বলুন: \"Used to recover your account\" screen-এর সবচেয়ে বড় trust gap সরিয়ে দেয়। [User/PM]\n৪. Error state design করুন: phone format, PIN length, network drop। এখন একটাও নেই। [Engineer]\n৫. Safety copy কেটে দিন বা নতুন করে লিখুন: \"Your data is safe\" দুশ্চিন্তা তৈরি করে। \"We never share your number\" trust তৈরি করে। [PM/User]\n\nFix ১-৩ copy আর form-এর পরিবর্তন। দ্রুত হয়। Fix ৪ engineering team-এর কাছে চাইতে হবে। Fix ৫ এক লাইনের কাজ।",
              },
            ],
          },
        },
        {
          title: "সাধারণ ভুলগুলো",
          description: "এই process-এর চারটা সাধারণ ভুল।",
          list: [
            "Forced perspective-এর বদলে general review চাওয়া। \"আমার design review করুন\" বললে আসে ঘুরিয়ে-পেঁচিয়ে প্রশংসা। \"আপনি একজন confused first-time user: কোথায় কোথায় confused হচ্ছেন, সব বলুন\" বললে কাজের finding আসে। Perspective-এর এই বাঁধনটাই আসল trick।",
            "Claude-কে character থেকে বেরিয়ে যেতে দেওয়া। Critique-এর মাঝপথে Claude solution suggest করা শুরু করলে ফিরিয়ে আনুন: \"Character-এ থাকুন। শুধু সমস্যাটা বলুন, fix নয়।\" Solution আসবে synthesis-এর ধাপে।",
            "তিনটা perspective একই prompt-এ চালানো। আলাদা না করে তিনটা একসঙ্গে চাইলে output-এ perspective মিশে যায়, আর engineer-এর issue user-এর issue-র সঙ্গে গুলিয়ে যায়। আলাদা আলাদা চালান, তারপর synthesis করুন।",
            "Synthesis-এর ধাপ বাদ দেওয়া। তিনটা আলাদা critique ধরে কাজ করা কঠিন। Synthesis এগুলোকে urgency অনুযায়ী ভাগ করে, আর এমন কিছু দেয় যেটা sprint-এ তোলা যায়। Critique-গুলো নিজেরাই complete মনে হলেও এই ধাপ বাদ দেবেন না।",
          ],
        },
      ],
      nextLink: {
        label: "একটা heuristic evaluation করুন",
        href: "/for-designers/heuristic-evaluation",
      },
    },
  },

  "heuristic-evaluation": {
    sourceHash: "103f0cf1129287b9",
    translatedAt: "2026-10-06",
    content: {
      title: "একটা heuristic evaluation করুন",
      slug: "heuristic-evaluation",
      duration: "২৫ মিনিট",
      difficulty: "intermediate",
      availableRoutes: ["web", "desktop"],
      description:
        "Claude-কে evaluation partner বানিয়ে যেকোনো interface-এ Nielsen-এর ১০টা usability heuristic চালান। হাতে পাবেন priority অনুযায়ী সাজানো একটা findings report, যেটা ধরে কাজ করা যায়।",
      intro:
        "এই guide তাদের জন্য, যে UX আর UI designer-দের একটা interface-এর usability সমস্যা evaluate করতে হয়, আর এমন findings report বানাতে হয় যেটা ধরে কাজ করা যায় বা team-এর সামনে দেখানো যায়। পড়া শেষে আপনি Claude-কে একজন consistent evaluation partner হিসেবে ব্যবহার করে পুরো ১০-heuristic evaluation চালাতে পারবেন, আর severity অনুযায়ী ভাগ করা একটা findings report বানাতে পারবেন। Heuristic evaluation একজন designer-এর হাতের সবচেয়ে কাজের tool-গুলোর একটা, আবার হাতে করতে সবচেয়ে একঘেয়েগুলোরও একটা। একটা interface-এ Nielsen-এর ১০টা heuristic-ই চালানো, violation লিখে রাখা, আর finding-গুলো priority অনুযায়ী সাজাতে সাধারণত কয়েক ঘণ্টা লাগে। এই guide দেখায় কীভাবে ২৫ মিনিটে করবেন। যে ১০টা heuristic ধরে evaluate করবেন: Visibility of system status, Match between system and real world, User control and freedom, Consistency and standards, Error prevention, Recognition rather than recall, Flexibility and efficiency of use, Aesthetic and minimalist design, Help users recognise and recover from errors, Help and documentation। Severity tier: Critical (task শেষ করতে দেয় না), Major (বড় confusion বা error তৈরি করে), Minor (বিরক্ত করে বা ধীর করে দেয়), Cosmetic (শুধু দেখতে কেমন, সেই পছন্দের ব্যাপার)।",
      situation: {
        scene:
          "Ship হওয়ার আগে একটা interface-এর usability review দরকার। আপনার মন বলছে কোথাও গোলমাল আছে। আপনার দরকার severity rating-সহ specific finding, impression-এর list নয়, আর এমন কিছু যেটা একজন PM সত্যিই priority দিয়ে সাজাতে পারেন।",
        outcome:
          "মোটামুটি ২৫ মিনিটে আপনি Nielsen-এর ১০টা heuristic ধরে একটা পুরো heuristic report বানাবেন, severity অনুযায়ী ভাগ করা।",
      },
      outcomes: [
        "Nielsen-এর ১০টা usability heuristic ধরে পুরো evaluation, প্রতিটার জন্য একটা specific violation-এর উদাহরণসহ",
        "প্রতিটা finding-এর rating: Critical, Major, Minor, বা Cosmetic",
        "Severity tier অনুযায়ী ভাগ করা report, sprint planning বা stakeholder review-এর জন্য ready",
      ],
      promptContrast: {
        bad: "এই design-টা usability সমস্যার জন্য review করুন।",
        good: "এই চার field-এর payment form-টা শুধু Nielsen-এর Error Prevention heuristic ধরে evaluate করুন। যেখানে যেখানে user confirmation বা undo ছাড়া এমন ভুল করতে পারে যেটা আর ফেরানো যায় না, সব list করুন। Format: [screen element] + [risk] + [severity: Critical / Major / Minor]।",
        why: "একটা নির্দিষ্ট heuristic-এ বাঁধা prompt Claude-কে generic usability checklist বানানোর বদলে একটাই lens ব্যবহার করতে বাধ্য করে। একবারে একটা heuristic ধরলে specific, কাজের finding আসে।",
      },
      steps: [
        {
          title: "যে interface evaluate করছেন, সেটা বর্ণনা করুন",
          description:
            "নিচের template paste করুন আর আপনার interface দিয়ে ভরুন। Claude জানাবে যথেষ্ট context পেয়েছে কি না, আর জিজ্ঞেস করবে ১০টা heuristic একসঙ্গে চালাবে নাকি একটা একটা করে। উত্তর দিন \"১০টাই একসঙ্গে\": ধাপ ২-এর prompt সেটাই।",
          code: {
            snippet: `# Interface context template:
"আমি Nielsen-এর ১০টা usability heuristic দিয়ে একটা heuristic evaluation চালাচ্ছি।

Interface: [এটা কী: app, website, feature]
Primary user: [কে ব্যবহার করে, কী জানে, কোন device ব্যবহার করে]
Core task: [User মূলত কী করতে চাইছে]
যে screen evaluate করব: [Screen বা flow-গুলোর list]

বর্ণনা: [Screen, layout, label, interaction বর্ণনা করুন]"`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি Nielsen-এর ১০টা heuristic দিয়ে একটা heuristic evaluation চালাচ্ছি।\n\nInterface: Mobile banking app, account top-up flow\nPrimary user: First-time smartphone user, financial literacy কম, Android\nCore task: Mobile wallet থেকে account-এ টাকা যোগ করা\nFlow: Home screen -> \"Add money\" -> source বেছে নেওয়া -> amount দেওয়া -> confirm -> success\n\nবর্ণনা: Home-এ balance আর ছয়টা icon-এর একটা grid দেখায়। \"Add Money\" চার নম্বর icon। Tap করলে একটা screen খোলে, যেখানে একটাই field: \"Enter Amount (BDT).\" কোনো minimum বা maximum দেখানো নেই। একটা নীল \"Proceed\" button। পরের screen: \"Confirm Top-up\", তাতে amount, একটা fee-র লাইন, total, আর \"Confirm\" button। Success screen-এ একটা টিক চিহ্ন আর \"Top-up Successful.\"",
              },
              {
                role: "claude",
                text: "পেয়েছি। এই flow-এর ওপর Nielsen-এর ১০টা heuristic একটা একটা করে evaluate করব। Violation-গুলো severity-সহ লিখব: Critical (task আটকে দেয়), Major (বড় friction তৈরি করে), Minor (ছোট friction), আর Cosmetic (প্রভাব কম)।\n\n১০টা একসঙ্গে চালাব, নাকি একটা একটা করে?",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "একটা heuristic evaluation setup করুন। Mobile banking top-up flow। Android। First-time user, financial literacy কম। Flow: Home -> Add Money -> Amount entry -> Confirm -> Success। কোনো minimum বা maximum দেখানো নেই। Fee দেখা যায় শুধু confirm screen-এ।",
              },
              {
                role: "claude",
                text: "Context load হয়েছে। Nielsen-এর ১০টা heuristic ধরে evaluate করছি। Violation flag করব severity অনুযায়ী: Critical, Major, Minor, Cosmetic।\n\nচালানোর জন্য ready। ১০টা একসঙ্গে, নাকি একটা একটা করে?",
              },
            ],
          },
        },
        {
          title: "Evaluation চালান",
          description:
            "Evaluation prompt paste করুন। Claude ১০টা heuristic একে একে দেখবে আর প্রতিটার জন্য একটা verdict দেবে: comply, partial, বা violation, সঙ্গে একটা specific উদাহরণ আর severity rating। শেষে violation-গুলোর একটা list পাবেন, count-সহ: অনেকটা \"১টা Critical, ৩টা Major, ৩টা Minor\" ধরনের। ধাপ ৩ এই list-টাকেই report-এ বদলায়।",
          code: {
            snippet: `# Evaluation চালানোর prompt:
"এই interface-টা Nielsen-এর ১০টা usability heuristic ধরে evaluate করুন।
প্রতিটা heuristic-এর জন্য বলুন: comply, partially comply, নাকি violation।
যেকোনো violation-এর জন্য: specific করে বর্ণনা দিন, interface থেকে একটা উদাহরণ দিন,
আর severity rate করুন (Critical / Major / Minor / Cosmetic)।"`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Interface-টা Nielsen-এর ১০টা heuristic ধরে evaluate করুন। প্রতিটার জন্য: comply / partial / violation, সঙ্গে specific উদাহরণ আর severity rating।",
              },
              {
                role: "claude",
                text: "H1: Visibility of system status\nViolation, Major। Top-up flow processing-এর সময় কোনো feedback দেয় না। \"Confirm\" tap করার পর success screen আসা পর্যন্ত user কিছুই দেখে না। Financial transaction-এ loading indicator থাকতেই হবে: না থাকলে user আবার tap করে, আর duplicate submission-এর risk তৈরি হয়।\n\nH2: Match between system and real world\nViolation, Major। \"Proceed\" developer-এর ভাষা। এই context-এর user-রা \"Next\" বা \"Continue\" বেশি চিনবে। bKash icon ধরে নেয় user brand-টা চেনে: না চিনলে \"Add Money\" বোঝা যায় না।\n\nH3: User control and freedom\nViolation, Minor। Confirm screen-এ কোনো Cancel বা Back option দেখা যায় না। ভুল amount দিলে user-কে OS-এর back button ব্যবহার করতে হয়।\n\nH4: Consistency and standards\nComply করে। Flow-টা mobile payment-এর standard convention মেনে চলে।\n\nH5: Error prevention\nViolation, Critical। Entry screen-এ কোনো minimum বা maximum amount দেখানো নেই। কেউ 0 বা balance-এর চেয়ে বেশি amount দিলে error পায় শুধু Proceed tap করার পরে।\n\nH6: Recognition rather than recall\nViolation, Minor। Fee দেখানো হয় শুধু Confirm screen-এ। Total ঠিক আছে কি না বুঝতে user-কে মনে রাখতে হয় সে কত দিয়েছিল।\n\nH7: Flexibility and efficiency of use\nMinor gap। বারবার ব্যবহার করা user-দের জন্য কোনো quick-amount shortcut (100 / 500 / 1000 BDT) নেই।\n\nH8: Aesthetic and minimalist design\nComply করে। Interface যতটা minimal হওয়া দরকার, ততটাই।\n\nH9: Help users recognise and recover from errors\nViolation, Major। ভুল amount-এর error message বলে \"Transaction failed.\" কোনো কারণ নেই, পরের কোনো step নেই।\n\nH10: Help and documentation\nMinor gap। কোনো screen-এ help link বা tooltip নেই।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "১০টা heuristic-ই চালান। প্রতিটার জন্য comply / partial / violation। প্রতিটা violation-এ specific উদাহরণ আর severity দেবেন।",
              },
              {
                role: "claude",
                text: "H1: MAJOR violation। Confirm-এর পরে কোনো loading state নেই। Financial transaction-এ processing feedback লাগে, নইলে user আবার চেষ্টা করে।\nH2: MAJOR violation। \"Proceed\" technical শব্দ। User-এর ভাষার সঙ্গে \"Next\" বেশি মেলে।\nH3: MINOR violation। Confirm screen-এ আলাদা কোনো Cancel নেই।\nH4: PASS।\nH5: CRITICAL violation। Amount entry-তে min/max নেই। Error আসে শুধু submit-এর পরে।\nH6: MINOR violation। Fee দেখা যায় শুধু Confirm-এ, entry-তে নয়।\nH7: MINOR gap। বারবার ব্যবহার করা user-দের জন্য quick-amount shortcut নেই।\nH8: PASS।\nH9: MAJOR violation। \"Transaction failed\", কোনো কারণ নেই, এগোনোর পথ নেই।\nH10: MINOR gap। কোনো screen-এ help নেই।\n\nSummary: ১ Critical, ৩ Major, ৩ Minor, ২ Pass।",
              },
            ],
          },
        },
        {
          title: "Priority অনুযায়ী findings report বানান",
          description:
            "Consolidation prompt paste করুন। Claude সব violation severity অনুযায়ী ভাগ করবে, Critical থেকে Minor পর্যন্ত, আর প্রতিটার সঙ্গে এক লাইনের fix দেবে। যা ফেরত আসবে সেটা সরাসরি paste করার মতো: Jira ticket-এ বসিয়ে দিতে পারেন, PM-এর সঙ্গে share করতে পারেন, বা sprint planning-এ নিয়ে যেতে পারেন।",
          code: {
            snippet: `# Report বানানোর prompt:
"সব finding এক করে priority অনুযায়ী একটা report বানান।
Format: severity tier, কোন heuristic ভাঙছে, specific issue, এক বাক্যের fix।
Severity অনুযায়ী ভাগ করুন।"`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "সব finding এক করে severity অনুযায়ী সাজানো একটা report দিন। প্রতিটার জন্য: heuristic, issue, এক লাইনের fix।",
              },
              {
                role: "claude",
                text: "CRITICAL\n\nH5: Error prevention। Entry screen-এ min/max amount দেখানো নেই: error আসে শুধু submit-এর পরে। Fix: field-এর নিচে inline constraint দেখান, \"Min 10 BDT, Max 10,000 BDT\"।\n\nMAJOR\n\nH1: System status। Confirm-এর পরে loading state নেই: দুবার tap হওয়ার risk। Fix: একটা spinner যোগ করুন, আর প্রথম tap-এই Confirm button disable করুন।\nH2: Real world match। \"Proceed\" technical ভাষা। Fix: \"Next\" বা \"Continue\" করুন।\nH9: Error recovery। \"Transaction failed\" কোনো কারণ বা পরের step বলে না। Fix: \"We could not complete this top-up. Check your bKash balance and try again.\"\n\nMINOR\n\nH3: User control। Confirm screen-এ আলাদা কোনো Cancel নেই। Fix: \"Change amount\" নামে একটা text link দিন, যেটা পেছনে নিয়ে যায়।\nH6: Recognition। Fee দেখা যায় শুধু Confirm-এ, entry-তে নয়। Fix: amount field-এর নিচে আনুমানিক fee দেখান।\nH7: Flexibility। Quick-amount shortcut নেই। Fix: tap করা যায় এমন chip দিন, 100 / 500 / 1000 / 2000 BDT।",
              },
            ],
          },
          desktopDemo: {
            steps: [
              {
                role: "user",
                text: "Priority অনুযায়ী একটা findings report বানান। আগে severity, তারপর heuristic, তারপর issue, তারপর এক লাইনের fix।",
              },
              {
                role: "claude",
                text: "CRITICAL\n- H5: Amount entry-তে min/max নেই -> field-এর নিচে inline constraint দেখান\n\nMAJOR\n- H1: Confirm-এর পরে loading state নেই -> spinner দিন, প্রথম tap-এ button disable করুন\n- H2: \"Proceed\" developer-এর ভাষা -> \"Next\" করুন\n- H9: কারণ ছাড়া \"Transaction failed\" -> নতুন করে লিখুন: \"Could not top up: check your bKash balance and try again\"\n\nMINOR\n- H3: Confirm-এ আলাদা Cancel নেই -> \"Change amount\" link দিন\n- H6: Confirm-এর আগে fee লুকানো -> entry screen-এ আনুমানিক fee দেখান\n- H7: Quick-amount shortcut নেই -> 100/500/1000/2000 BDT chip দিন\n\n৭টা finding। ১টা Critical (form fix), ৩টা Major (copy + loading), ৩টা Minor (navigation + disclosure)।",
              },
            ],
          },
        },
        {
          title: "সাধারণ ভুলগুলো",
          description: "Heuristic evaluation-এর চারটা সাধারণ ভুল।",
          list: [
            "Interface খুব vague-ভাবে বর্ণনা করা। আপনি যা বর্ণনা করবেন, Claude সেটাই evaluate করে। \"কয়েকটা field-সহ একটা form\" দিলে আসে generic heuristic observation। \"Android mobile-এ amount, phone, PIN আর একটা confirm button-সহ ৪-field-এর payment form\" দিলে আসে specific, কাজের finding। বর্ণনায় সময় দিন।",
            "Minor আর Cosmetic গুলিয়ে ফেলা। Minor friction user-কে ধীর করে, বা এমন error ঘটায় যেটা থেকে ফেরা যায়। Cosmetic issue হলো দেখতে কেমন, সেই পছন্দের ব্যাপার, কাজে কোনো প্রভাব নেই। একটা Minor issue-কে Cosmetic label দিলে সেটা priority-তে নিচে নামে, আর কখনো ঠিক হয় না।",
            "যেসব heuristic interface \"দেখেই বোঝা যায়\" মেনে চলে, সেগুলো বাদ দেওয়া। Heuristic evaluation-এ সবচেয়ে বিপজ্জনক assumption হলো, কোনো heuristic এখানে খাটে না। ১০টাই check করুন, যেগুলো ঠিক দেখায় সেগুলোও। \"Pass\" করা heuristic-এর violation সহজেই চোখ এড়িয়ে যায়।",
            "Severity অনুযায়ী ভাগ না করে evaluation present করা। ১০টা কাঁচা finding-এর list ধরে কাজ করা কঠিন। Report-এর ধাপ Critical, Major, Minor অনুযায়ী ভাগ করে, যাতে stakeholder-রা জানেন কোনগুলো পরের release-এর আগে ঠিক করতে হবে আর কোনগুলো পরের quarter-এ ভাবা যায়।",
          ],
        },
      ],
      nextLink: {
        label: "AI handoff-এর জন্য আপনার Figma ready করুন",
        href: "/for-designers/figma-for-ai-handoff",
      },
    },
  },
};
