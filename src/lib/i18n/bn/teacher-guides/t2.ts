import type { TeacherGuide } from "@/lib/teacher-guides";
import type { Translation } from "@/lib/i18n/bn/tutorials";

export const BN_TEACHER_GUIDES_T2: Partial<Record<string, Translation<TeacherGuide>>> = {
  "write-parent-emails-with-claude": {
    sourceHash: "009df00e2b3b46c2",
    translatedAt: "2026-10-31",
    content: {
      title: "Claude দিয়ে অভিভাবকদের email লিখুন",
      slug: "write-parent-emails-with-claude",
      duration: "৫ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["communication"],
      description:
        "অভিভাবকদের যেকোনো email এক মিনিটের মধ্যে draft করুন। চিন্তার কথা, ভালো খবর, meeting-এর অনুরোধ, কিংবা স্পর্শকাতর কোনো বিষয়।",
      intro:
        "অভিভাবকদের email লিখতে যতটা সময় লাগা উচিত, তার চেয়ে বেশি লাগে, কারণ ব্যাপারটা যতটা ঝুঁকির তার চেয়ে বেশি ঝুঁকির মনে হয়। ফাঁকা পাতা থেকে শুরু করার ঝামেলাটা Claude সরিয়ে দেয়। আপনি তথ্য আর দরকারি tone দেবেন। Claude draft করবে। আপনি দেখে নিয়ে পাঠাবেন।",
      situation: {
        scene:
          "একটা চিন্তার বিষয় নিয়ে আপনাকে একজন অভিভাবককে email করতে হবে, কিন্তু কীভাবে লিখলে সেটা দোষারোপের মতো শোনাবে না, বুঝতে পারছেন না।",
        outcome:
          "এই guide-এর পর আপনার হাতে একটা drafting process থাকবে, যাতে অভিভাবকদের যেকোনো email লেখা দ্রুত আর কম চাপের হয়।",
      },
      outcomes: [
        "অভিভাবকদের যেকোনো email এক মিনিটের মধ্যে draft",
        "যেকোনো পরিস্থিতির জন্য ঠিক tone: positive, neutral, বা স্পর্শকাতর",
        "একটা process, যেটা সেই email-গুলোর জন্যও কাজ করে যেগুলো আপনি এতদিন এড়িয়ে যাচ্ছিলেন",
      ],
      promptContrast: {
        bad: "একজন অভিভাবককে তাঁর সন্তানের ব্যাপারে একটা email লিখে দিন",
        good: "Class 8-এর এক ছাত্রের অভিভাবককে email করতে হবে। গত ৩ সপ্তাহ ধরে সে নিয়মিত homework জমা দিচ্ছে না। ক্লাসে কিন্তু সে ভালো কাজ করে। আমি pattern-টা জানাতে চাই, বাসায় কিছু হচ্ছে কি না সেটা শেয়ার করতে অভিভাবককে আমন্ত্রণ জানাতে চাই, আর একটা ছোট call ঠিক করার কথা বলতে চাই। Tone: আন্তরিক আর গঠনমূলক, দোষারোপের মতো নয়। ১৮০ শব্দের মধ্যে।",
        why: "পরিস্থিতি, ছাত্র সম্পর্কে context, অভিভাবকের কাছ থেকে আপনি কী চান, tone আর দৈর্ঘ্য: এমন একটা email লিখতে Claude-এর এটুকুই লাগে, যেটা পেয়ে অভিভাবক ভালোভাবে সাড়া দেবেন।",
      },
      steps: [
        {
          title: "Draft করার আগে তিনটা জিনিস ঠিক করুন",
          description:
            "অভিভাবকদের বেশিরভাগ খারাপ email ভুল দিকে যায়, কারণ লেখার আগে লেখকের কাছে এই তিনটা জিনিস পরিষ্কার ছিল না।",
          list: [
            "পরিস্থিতিটা কী: নির্দিষ্ট তথ্যগুলো, আপনার ব্যাখ্যা নয়",
            "এই email থেকে আপনি কী চান: একটা call, একটা কথাবার্তা, আচরণে পরিবর্তন, বা অভিভাবকের কাছ থেকে কোনো তথ্য",
            "এই পরিবারের জন্য কোন tone ঠিক: তাঁদের আপনি চেনেন, Claude চেনে না",
          ],
        },
        {
          title: "Prompt-এ ছাত্রছাত্রীর দরকারি context দিন",
          description:
            "ছাত্রছাত্রী সম্পর্কে context দিলে email-এর সুর বদলে যায়। সাধারণত ভালো করে এমন কেউ হঠাৎ মনোযোগ হারালে তাকে নিয়ে email, আর বারবার আচরণের সমস্যা নিয়ে email, পড়তে একদম আলাদা লাগে।",
          code: {
            snippet: `Class 6-এর ফাতিমা নামের এক ছাত্রীর অভিভাবককে email করতে হবে। Context: ফাতিমা সাধারণত মনোযোগী আর পরিশ্রমী। গত দুই সপ্তাহ ধরে সে ক্লাসে চুপচাপ, আর দুটো homework জমা দেয়নি, যেটা ওর স্বভাবের সঙ্গে মেলে না। পড়াশোনা নিয়ে আমি চিন্তিত নই, শুধু খোঁজ নিতে চাই বাসায় সব ঠিক আছে কি না। Tone: আন্তরিক, ভয় ধরানো নয়। ১৫০ শব্দের মধ্যে। Homework নিয়ে লজ্জা দেওয়ার মতো কোনো কথা নয়।`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Class 6-এর ফাতিমা নামের এক ছাত্রীর অভিভাবককে email করতে হবে। Context: ফাতিমা সাধারণত মনোযোগী আর পরিশ্রমী। গত দুই সপ্তাহ ধরে সে ক্লাসে চুপচাপ, আর দুটো homework জমা দেয়নি, যেটা ওর স্বভাবের সঙ্গে মেলে না। পড়াশোনা নিয়ে আমি চিন্তিত নই, শুধু খোঁজ নিতে চাই বাসায় সব ঠিক আছে কি না। Tone: আন্তরিক, ভয় ধরানো নয়। ১৫০ শব্দের মধ্যে। Homework নিয়ে লজ্জা দেওয়ার মতো কোনো কথা নয়।",
              },
              {
                role: "claude",
                text: "Subject: ফাতিমার খোঁজ নিতে লিখছি\n\nপ্রিয় [অভিভাবকের নাম],\n\nআশা করি ভালো আছেন। লিখছি কারণ গত দুই সপ্তাহ ধরে ফাতিমাকে একটু বেশি চুপচাপ মনে হচ্ছে। ও খুব চিন্তাশীল আর পরিশ্রমী, তাই ছোট একটা পরিবর্তনও চোখে পড়ে।\n\nওর পড়াশোনা নিয়ে আমার কোনো দুশ্চিন্তা নেই। ও ভালোই করছে। শুধু জানতে চাইছিলাম বাসায় এমন কিছু হচ্ছে কি না যা আমার জানা দরকার, বা স্কুলে ওকে সাপোর্ট করতে আমি কিছু করতে পারি কি না।\n\nএই email-এর উত্তর দিতে পারেন, অথবা একটা ছোট call সুবিধা হলে জানাবেন।\n\nশুভেচ্ছা রইল,\n[আপনার নাম]",
                delay: 500,
              },
            ],
          },
        },
        {
          title: "Draft copy করুন, পাঠানোর আগে নিজের মতো করে নিন",
          description:
            "Claude লেখে একজন সাধারণ অভিভাবকের কথা ভেবে। এই পরিবারকে আপনি চেনেন। দুই মিনিট নিজের মতো করে নিলে email-টা আপনার লেখা মনে হবে, template নয়।",
          list: [
            "ছাত্রছাত্রী সম্পর্কে এমন একটা নির্দিষ্ট কথা যোগ করুন যা শুধু আপনিই জানেন",
            "এই পরিবারের সঙ্গে আপনি যতটা formal ভাষায় কথা বলেন, সেটাই রাখুন",
            "যে কথা automated বা অতিরিক্ত ঘষামাজা করা শোনায়, বাদ দিন",
            "Subject line দেখুন: অস্পষ্ট নয়, পরিষ্কার আর নির্দিষ্ট রাখুন (\"ফাতিমার ব্যাপারে ছোট একটা কথা\" \"আপনার সন্তান প্রসঙ্গে\"-এর চেয়ে ভালো)",
          ],
        },
        {
          title: "স্পর্শকাতর পরিস্থিতিতে: আগে Claude-কে জিজ্ঞেস করুন কী এড়াবেন",
          description:
            "কঠিন একটা email final করার আগে আরও একটা prompt দিন। এতে এমন কথা ধরা পড়ে যা অভিভাবকের কাছে খারাপভাবে পৌঁছাতে পারে।",
          code: {
            snippet: `আচরণের একটা সমস্যা নিয়ে আমি এই email-টা একজন অভিভাবককে পাঠাতে যাচ্ছি। Tone গঠনমূলক আর দোষারোপহীন রাখতে কোন কথা বা কোন ধরনের framing এড়ানো উচিত? আগের যোগাযোগে এই অভিভাবক defensive ছিলেন।

[এখানে আপনার draft paste করুন]`,
            language: "text",
          },
        },
      ],
      nextLink: {
        label: "Claude দিয়ে আলাদা আলাদা শিক্ষার্থীর জন্য পড়ানো সাজান",
        href: "/bn/for-teachers/differentiate-instruction-with-claude",
      },
    },
  },

  "differentiate-instruction-with-claude": {
    sourceHash: "65f5e8b628b005ba",
    translatedAt: "2026-10-31",
    content: {
      title: "Claude দিয়ে আলাদা আলাদা শিক্ষার্থীর জন্য পড়ানো সাজান",
      slug: "differentiate-instruction-with-claude",
      duration: "১৫ মিনিট",
      difficulty: "intermediate",
      availableRoutes: ["lesson-planning"],
      description:
        "যেকোনো task, text বা activity-র scaffolded, extended আর adapted version বানান, আলাদা আলাদা শিক্ষার্থীর জন্য।",
      intro:
        "Lesson-এর প্রস্তুতিতে সবচেয়ে বেশি সময় যায় যে কাজগুলোয়, differentiation তার একটা। একটা prompt থেকেই Claude যেকোনো activity-র তিনটা version বানাতে পারে, যদি আপনি বলে দেন প্রতিটা version-কে আসলে কী আলাদা করতে হবে।",
      situation: {
        scene:
          "আপনার lesson plan একটাই, কিন্তু ক্লাসে তিনটা আলাদা দল: যাদের সাপোর্ট লাগে, যারা ঠিক পথে আছে, আর যারা আরও চ্যালেঞ্জ নিতে ready।",
        outcome:
          "এই guide-এর পর আপনার হাতে একটা system থাকবে, যা দিয়ে planning-এর সময় তিনগুণ না করেই যেকোনো activity-র differentiated version বানাতে পারবেন।",
      },
      outcomes: [
        "একটা prompt থেকে যেকোনো activity-র তিনটা differentiated version",
        "যারা পিছিয়ে আছে তাদের জন্য scaffolded সাপোর্ট material",
        "এমন extension task, যা ভালো শিক্ষার্থীদের সত্যিই চ্যালেঞ্জ করে",
      ],
      promptContrast: {
        bad: "এই activity-টা differentiate করে দিন",
        good: "এই যে Class 7-এর একটা English task: এই extract-এ লেখক কীভাবে tension তৈরি করেছেন, analyse করো। আমার তিনটা version লাগবে: ১) যারা level-এর নিচে কাজ করছে তাদের জন্য একটা scaffolded version, sentence starter আর literary technique-এর একটা word bank সহ। ২) যেমন লেখা আছে তেমন standard version। ৩) একটা extension version, যেখানে শিক্ষার্থীরা technique-টা তাদের পড়া আরেকটা text-এর সঙ্গে তুলনা করবে আর সেটা কতটা কার্যকর তা evaluate করবে। তিনটা version-এই learning objective এক রাখুন।",
        why: "নির্দিষ্ট version-গুলোর নাম আর প্রতিটা কী করবে তা বলে দিলে Claude এমন structure পায়, যা দিয়ে সত্যিই কাজের differentiated material বানানো যায়, শুধু একই জিনিসের কঠিন বা সহজ version নয়।",
      },
      steps: [
        {
          title: "আপনার core task দিয়ে শুরু করুন",
          description:
            "Core task হলো প্রত্যাশিত level-এ কাজ করা শিক্ষার্থীদের version। এটা আগে লিখুন বা prompt-এ paste করুন। বাকি সব এখান থেকেই বানানো হবে।",
          list: [
            "প্রত্যাশিত standard-এ কাজ করা একজন শিক্ষার্থীর জন্য যেভাবে লিখতেন, task-টা সেভাবে লিখুন",
            "Learning objective দিন, শিক্ষার্থীরা সেটা না দেখলেও",
            "Format লিখে দিন: লিখিত উত্তর, আলোচনা, worksheet, হাতে-কলমে activity",
            "সময়ের সীমা থাকলে লিখুন: ১০ মিনিটের task, নাকি ৩০ মিনিটের বড় উত্তর",
          ],
        },
        {
          title: "Scaffolded version চান, কী ধরনের সাপোর্ট লাগবে তা বলে দিয়ে",
          description:
            "Scaffolding মানে task সহজ করা নয়। মানে বাধাগুলো সরিয়ে দেওয়া, যাতে শিক্ষার্থীরা একই learning objective-এ পৌঁছাতে পারে। কী ধরনের সাপোর্ট চান, নির্দিষ্ট করে বলুন।",
          code: {
            snippet: `এই যে আমার Class 7-এর English task: এই extract-এ লেখক কীভাবে tension তৈরি করেছেন, অন্তত দুটো literary technique দিয়ে analyse করো। নির্দিষ্ট quotation উল্লেখ করো।

যারা level-এর নিচে কাজ করছে তাদের জন্য একটা scaffolded version বানান। এতে রাখুন:
- ৪টা sentence starter, যা উত্তরের structure ধরে এগোতে সাহায্য করবে
- ৮টা literary technique-এর একটা word bank, প্রতিটার এক লাইনের definition সহ
- text থেকে আগে বেছে রাখা ২টা quotation, যা নিজেরা খুঁজে না পেলে তারা ব্যবহার করতে পারবে
Learning objective এক রাখুন। চিন্তার কঠিনতা কমাবেন না; ঢোকার বাধাটা কমান।`,
            language: "text",
          },
        },
        {
          title: "Extension version চান, বাড়তি দাবিটা পরিষ্কার করে",
          description:
            "Extension task ব্যর্থ হয় যখন সেটা শুধু একই task-এর আরও বেশি পরিমাণ। আসল extension-এ লাগে উঁচু স্তরের চিন্তা, বাড়তি পরিমাণ নয়।",
          code: {
            snippet: `এবার একই task-এর একটা extension version বানান, যারা চ্যালেঞ্জ নিতে ready তাদের জন্য। Standard task থেকে Bloom's taxonomy-তে অন্তত এক level ওপরে যেতে হবে। Option: দ্বিতীয় একটা text-এর সঙ্গে তুলনা, প্রসঙ্গের মধ্যে technique-টা কতটা কার্যকর তা evaluate করা, অন্য কোনো পাঠক একই technique কীভাবে বুঝতে পারেন তা ভাবা, বা পাল্টা যুক্তি দেওয়া।

শিক্ষার্থী তবুও লিখিত উত্তর দেবে। বাড়তি instruction ৫০ শব্দের বেশি নয়।`,
            language: "text",
          },
        },
        {
          title: "প্রতিটা version-এর জন্য Claude-কে ছোট instruction লিখতে বলুন",
          description:
            "Differentiated material তখনই কাজ করে যখন শিক্ষার্থীরা জানে সেটা দিয়ে কী করতে হবে। আরও একটা prompt দিলেই প্রতিটা worksheet-এর ওপরে দেওয়ার মতো task instruction পেয়ে যাবেন।",
          code: {
            snippet: `ওপরের তিনটা version-এর প্রতিটার জন্য একটা ছোট task instruction লিখুন, যা আমি worksheet-এর ওপরে দিতে পারি। প্রতি version-এ সর্বোচ্চ ৩টা বাক্য। Class 7-এর শিক্ষার্থীদের উপযোগী ভাষা। "below level", "standard" আর "extension" label দেবেন না; "Task A", "Task B", "Task C"-এর মতো neutral নাম দিন।`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "ওপরের তিনটা version-এর প্রতিটার জন্য একটা ছোট task instruction লিখুন, যা আমি worksheet-এর ওপরে দিতে পারি। প্রতি version-এ সর্বোচ্চ ৩টা বাক্য। Class 7-এর শিক্ষার্থীদের উপযোগী ভাষা। \"below level\", \"standard\" আর \"extension\" label দেবেন না; \"Task A\", \"Task B\", \"Task C\"-এর মতো neutral নাম দিন।",
              },
              {
                role: "claude",
                text: "Task A\nExtract-টা পড়ো, তারপর sentence starter আর word bank-এর সাহায্য নিয়ে লেখো লেখক কীভাবে tension তৈরি করেছেন। অন্তত দুটো literary technique রাখার চেষ্টা করো। দেওয়া quotation ব্যবহার করো, অথবা text থেকে নিজে খুঁজে নাও।\n\nTask B\nএই extract-এ লেখক কীভাবে tension তৈরি করেছেন, analyse করো। অন্তত দুটো literary technique ব্যবহার করো, আর প্রতিটা point-এর পক্ষে text থেকে quotation দাও। পূর্ণ paragraph-এ লেখো।\n\nTask C\nএই extract-এ লেখক কীভাবে tension তৈরি করেছেন, অন্তত দুটো literary technique দিয়ে analyse করো। তারপর এর একটা technique আগে পড়া কোনো text-এর সঙ্গে তুলনা করো। কোন লেখক technique-টা বেশি কার্যকরভাবে ব্যবহার করেছেন, আর কেন? দুটো text থেকেই প্রমাণ দিয়ে তোমার যুক্তি দাঁড় করাও।",
                delay: 500,
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "সব শিক্ষক guide-এ ফিরে যান",
        href: "/bn/for-teachers",
      },
    },
  },

  "improve-your-course-batch-by-batch": {
    sourceHash: "9c4817ab9034b238",
    translatedAt: "2026-10-31",
    content: {
      title: "Claude দিয়ে batch-এর পর batch আপনার course আরও ভালো করুন",
      slug: "improve-your-course-batch-by-batch",
      duration: "১৫ মিনিট",
      difficulty: "intermediate",
      availableRoutes: ["lesson-planning"],
      description:
        "আগের batch-এর student feedback পরের batch-এর lesson plan-এ কাজে লাগান। Claude score গোনে, আপনি প্রতিটা অভিযোগ যাচাই করেন, আর plan শুধু সেখানেই বদলায় যেখানে প্রমাণ সেটা বলে।",
      intro:
        "আমি Ostad-এ একটা design course পড়াই, বাংলাদেশের একটা online learning platform। আমার দ্বিতীয় batch-এর গড় ছিল ১০-এ 9.22 (166/18), কিন্তু প্রথম ক্লাসের পর দুজন শিক্ষার্থী 6 দিয়েছিল। দুজনেই মোটামুটি একই কথা বলেছিল: ক্লাস অনেক লম্বা হয়েছে আর বিষয় থেকে সরে গেছে। কিছু বদলানোর আগে আমি যাচাই করে দেখলাম কথাটা সত্যি কি না। সত্যিই। একটা ক্লাস ৯০ মিনিটের plan-এর জায়গায় ১৭৮ মিনিট চলেছিল। সেই finding ধরে আমি তৃতীয় batch নতুন করে সাজালাম, আর তার গড় দাঁড়াল 9.64 (135/14), কোনো score 8-এর নিচে নয়। এই guide সেই loop-টাই, এমনভাবে লেখা যাতে আপনি নিজের course-এ চালাতে পারেন।",
      situation: {
        scene:
          "একটা term বা batch এইমাত্র শেষ হয়েছে। আপনার হাতে একটা feedback export, একটা lesson plan যেটা ঠিক plan মতো চলেনি, আর কয়েকটা comment যেগুলো গায়ে লেগেছে।",
        outcome:
          "এই guide-এর পর আপনার হাতে থাকবে পরের batch-এর জন্য যাচাই করা পরিবর্তনের একটা list, আর একটা skill যা প্রতিবার এই process আবার চালায়।",
      },
      outcomes: [
        "হিসাব দেখিয়ে গোনা score, যাতে সংখ্যা নিয়ে কেউ তর্ক না করে",
        "প্রতিটা অভিযোগ plan বদলানোর আগে প্রমাণ দিয়ে যাচাই করা",
        "একটা change table, যা co-teacher বা program lead-কে দিতে পারেন",
      ],
      promptContrast: {
        bad: "এই যে আমার student feedback, আমার course কীভাবে ভালো করব?",
        good: "এই যে আমার শেষ batch-এর feedback export, ওরা যে lesson plan পেয়েছিল সেটা, আর যা আমি বদলাতে পারব না (৯০ মিনিটের ক্লাস, platform-এ quiz বাধ্যতামূলক)। গড়টা একটা যোগফল ভাগ সংখ্যা হিসেবে দিন, 7-এর নিচের প্রতিটা score তার comment আর তারিখসহ list করুন, আর প্রতিটা অভিযোগের জন্য আমাকে একটা প্রশ্ন করুন যা সেটা প্রমাণ বা বাতিল করবে। এখনই কোনো পরিবর্তন suggest করবেন না।",
        why: "অস্পষ্ট prompt দিলে \"আরও interaction যোগ করুন\"-এর মতো generic পরামর্শ আসে। নির্দিষ্ট prompt Claude-কে দিয়ে আগে গোনায়, সবচেয়ে খারাপ score-গুলো দেখায়, আর কিছু প্রস্তাব করার আগে প্রতিটা অভিযোগ যাচাই করায়।",
      },
      steps: [
        {
          title: "শুরুর আগে তিনটা জিনিস জোগাড় করুন",
          description:
            "শিক্ষার্থীরা কী পেয়েছে আর আপনি কোন জিনিসগুলো বদলাতে পারবেন না, তা না জানলে Claude বলতে পারবে না কী বদলাতে হবে।",
          list: [
            "Feedback: একটা spreadsheet export, paste করা survey row, বা আপনার নিজের note",
            "আগের plan: শিক্ষার্থীরা আসলে যে lesson plan বা schedule পেয়েছিল",
            "যা বদলানো যাবে না: ক্লাসের দৈর্ঘ্য, platform-এর নিয়ম, বাধ্যতামূলক quiz, তারিখ",
          ],
        },
        {
          title: "Claude-কে গুনতে বলুন, আর হিসাবটা দেখাতে বলুন",
          description:
            "হিসাব ছাড়া একটা গড় তর্ক ডেকে আনে। যোগফল ভাগ সংখ্যা আনে না। কম score-গুলো আর সেগুলোর তারিখও চান, কারণ কখন এসেছে সেটা গুরুত্বপূর্ণ।",
          code: {
            snippet: `এই যে আমার feedback export। প্রতিটা batch-এর জন্য গড় rating দিন যোগফল ভাগ সংখ্যা হিসেবে (যেমন 9.22 = 166/18), সবচেয়ে কম score, আর কতজন সেটা দিয়েছে। তারপর 7-এর নিচের প্রতিটা score তার তারিখ আর comment-সহ list করুন। কোনো নাম বা phone number রাখবেন না।`,
            language: "text",
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এই যে আমার feedback export। প্রতিটা batch-এর জন্য গড় rating দিন যোগফল ভাগ সংখ্যা হিসেবে, সবচেয়ে কম score, আর কতজন সেটা দিয়েছে। তারপর 7-এর নিচের প্রতিটা score তার তারিখ আর comment-সহ list করুন।",
              },
              {
                role: "claude",
                text: "Batch 2: 9.22 = 166/18। সবচেয়ে কম score 6, দিয়েছে 2 জন।\nBatch 3: 9.64 = 135/14। সবচেয়ে কম score 8, দিয়েছে 2 জন।\n\n7-এর নিচের score (দুটোই Batch 2-এর, দুটোই 12 August, Class 1-এর রাতে):\n১. 6: ক্লাস module থেকে সরে যায় আর অনেক লম্বা হয়; আরও সরাসরি চায়।\n২. 6: সব প্রশ্নের উত্তর ক্লাসের শেষে দেওয়া হলে ভালো হতো।\n\nদুটো কম score-ই প্রথম দিনে এসেছে। পরের ক্লাসগুলোতেও একই সমস্যা ছিল কি না, যাচাই করবেন?",
                delay: 800,
              },
            ],
          },
        },
        {
          title: "কিছু বদলানোর আগে প্রতিটা অভিযোগ যাচাই করুন",
          description:
            "একটা অভিযোগ একটা সূত্র, রায় নয়। প্রতিটার জন্য এমন একটা তথ্য খুঁজুন যা সেটা প্রমাণ বা বাতিল করে। আমার ক্ষেত্রে \"ক্লাস অনেক লম্বা হয়\" কথাটা আসল শুরু আর শেষের সময় দিয়ে যাচাই করা হয়েছিল, আর একটা ক্লাস ৯০ মিনিটের plan-এর জায়গায় ১৭৮ মিনিট চলেছিল। তাতে বোঝা গেল এটা আসল সমস্যা, একজন শিক্ষার্থীর মেজাজ নয়।",
          code: {
            snippet: `প্রতিটা অভিযোগের জন্য আমাকে একটা প্রশ্ন করুন যা সেটা প্রমাণ বা বাতিল করবে। আমার উত্তরের জন্য অপেক্ষা করুন, তারপর প্রতিটাকে confirmed, not confirmed, বা can't tell yet হিসেবে mark করুন, প্রমাণসহ।`,
            language: "text",
          },
        },
        {
          title: "Confirmed অভিযোগগুলোকে একটা change table-এ রূপ দিন",
          description:
            "শুধু confirmed অভিযোগগুলোই পরিবর্তন হয়। প্রতিটা পরিবর্তনের সঙ্গে এমন একটা উপায় লাগে যাতে পরের বার বোঝা যায় সেটা কাজ করেছে কি না।",
          code: {
            snippet: `তিন column-এর একটা table বানান: প্রমাণে কী দেখা গেল | পরের batch-এ পরিবর্তন | কাজ করেছে কি না কীভাবে বুঝব। প্রতিটা confirmed অভিযোগের জন্য এক row। প্রতিটা পরিবর্তন যেন আমার বলা না-বদলানো জিনিসগুলোর মধ্যেই থাকে। তারপর আমার lesson plan-এর শুধু সেই অংশগুলো নতুন করে লিখুন যেগুলো table বদলায়।`,
            language: "text",
          },
          list: [
            "ক্লাস plan-এর প্রায় দ্বিগুণ সময় চলেছিল, তাই troubleshooting ক্লাস থেকে সরিয়ে প্রতিটা lesson-এর জন্য লিখিত একটা \"problem, cause, fix\" sheet-এ নেওয়া হলো",
            "Setup আটকে দেওয়ায় প্রায় কেউই প্রথম assignment শেষ করতে পারেনি, তাই setup হয়ে গেল homework আর প্রথম assignment-এ এখন শুধু একটা browser লাগে",
            "শিক্ষার্থীরা AI দিয়ে quiz-এর উত্তর দিচ্ছিল, তাই quiz-এর প্রশ্ন এখন tool নিয়ে তথ্য নয়, শিক্ষার্থীর নিজের কাজ নিয়ে",
          ],
        },
        {
          title: "Loop-টা skill হিসেবে save করুন, যাতে প্রতিবার একইভাবে চলে",
          description:
            "Skill হলো save করা কিছু instruction, যেটা কাজটা এলেই Claude follow করে। এটা ওপরের চারটা ধাপ ধরে এগোয়, যাচাইয়ের ধাপ বাদ দিতে দেয় না, আর কখনো শিক্ষার্থীদের নাম আবার লেখে না। Install করতে Claude desktop app-এ Code tab খুলুন আর নিচের prompt-টা paste করুন। Browser-এ Claude ব্যবহার করেন? তাহলে file-টা খুলে তার লেখা আপনার chat-এর শুরুতে paste করুন।",
          code: {
            snippet: `https://claudecodeguide.dev/skills/lesson-retro/SKILL.md download করে ~/.claude/skills/lesson-retro/SKILL.md হিসেবে save করুন, তারপর ready হলে আমাকে জানান।`,
            language: "text",
          },
          download: {
            label: "lesson-retro skill download করুন (SKILL.md, 3 KB)",
            href: "/skills/lesson-retro/SKILL.md",
          },
        },
      ],
      nextLink: {
        label: "Claude দিয়ে lesson plan লিখুন",
        href: "/bn/for-teachers/write-lesson-plans-with-claude",
      },
    },
  },
};
