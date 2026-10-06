import type { Tutorial } from "@/lib/tutorials";
import type { Translation } from "@/lib/i18n/bn/tutorials";

export const BN_TUTORIALS_G2: Partial<Record<string, Translation<Tutorial>>> = {
  "slide-deck-outline": {
    sourceHash: "1a8353a4dca98a9b",
    translatedAt: "2026-10-06",
    content: {
      title: "১৫ মিনিটে একটা Slide Deck Outline বানান",
      slug: "slide-deck-outline",
      duration: "১৫ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "ide"],
      description:
        "Claude-কে আপনার goal, audience আর content জানান। PowerPoint খোলার আগেই হাতে পাবেন একটা narrative arc, slide ধরে ধরে outline, আর speaker notes।",
      intro:
        "যেকোনো presentation-এর সবচেয়ে কঠিন অংশ design নয়, structure। বেশিরভাগ মানুষ PowerPoint বা Keynote খুলে slide-এ bullet বসাতে শুরু করেন, তারপর মাঝপথে গিয়ে বোঝেন গল্পটা কাজ করছে না। Claude আপনাকে আগে narrative দাঁড় করাতে সাহায্য করে। ফলে design tool খোলার সময় আপনি ঠিক জানেন কোন জিনিস কোথায় যাবে।",
      steps: [
        {
          title: "আপনার goal, audience আর সময় ঠিক করুন",
          description:
            "৫ মিনিটের investor update আর ৪৫ মিনিটের team workshop-এর deck পুরোপুরি আলাদা জিনিস। শুরুতেই specific হোন।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "একটা board update-এর জন্য deck বানাতে হবে। ২০ মিনিট, board-এ ৮ জন (কিছু operator, কিছু investor)। Topic হলো আমাদের Q1 result আর Q2 priority। আমি চাই উনারা business নিয়ে confident হয়ে বের হোন, আর পরের quarter-এ আমরা কোথায় invest করছি সেটা clear থাকুক।",
              },
              {
                role: "claude",
                text: "ভালো brief। কয়েকটা জিনিস খেয়াল করছি:\n\n• Board audience detail চায় না, signal চায়। খুঁটিনাটি জানতে উনারা নিজেরাই প্রশ্ন করবেন।\n• \"Business নিয়ে confident + investment direction clear\" মানে দুটো আলাদা কাজ: Q1 অংশে বিশ্বাস অর্জন করতে হবে, Q2 অংশ হতে হবে crisp আর যুক্তি দিয়ে defend করার মতো\n• ৮ জনের সঙ্গে ২০ মিনিট মানে মাঝপথে প্রশ্ন আসবেই, তাই deck এমন হওয়া দরকার যাতে slide 3-এ আপনাকে script থেকে সরিয়ে নিলেও মূল কথাটা পৌঁছায়\n\nNarrative arc বানানোর আগে বলুন: আপনি কি একটা ভালো quarter report করছেন, mixed, নাকি কঠিন? এর ওপর narrative structure অনেকটাই বদলে যায়।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Board update deck। ২০ মিনিট, board-এ ৮ জন (operator + investor)। Q1 result + Q2 priority। Goal: business নিয়ে confidence, পরের quarter-এর investment নিয়ে clarity।",
              },
              {
                role: "claude",
                text: "বুঝেছি। Outline বানানোর আগে দুটো প্রশ্ন: (1) Quarter-টা কি strong, mixed, নাকি কঠিন? এর ওপর narrative arc পুরো বদলে যায়। (2) সাবধানে সামলাতে হবে এমন কোনো sensitive topic আছে কি (যেমন target miss, leadership change, strategic pivot)?",
              },
            ],
          },
        },
        {
          title: "আপনার সব content ঢেলে দিন",
          description:
            "এখনই structure করবেন না। যা যা cover করতে চান সব Claude-কে বলুন। ভালো খবর, খারাপ খবর, যে decision-গুলো লাগবে, সবকিছু।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Mixed quarter। Revenue plan মতো এসেছে ($2.4M, YoY +18%)। কিন্তু NRR target-এর নিচে (102%, target ছিল 115%)। Competitor-এর কাছে দুটো mid-market account হারিয়েছি। নতুন product launch ভালো হয়েছে, 60 জন beta customer, NPS strong। গত বছরের H2 খারাপ গেছে, এখন team full strength-এ আছে। Q2 priority: enterprise segment-এ আরও জোর দেওয়া, mid-market retention ঠিক করা, product-এর momentum ধরে রাখা। Sales headcount-এর জন্য board-এর কাছ থেকে আরও $300k approval লাগবে।",
              },
              {
                role: "claude",
                text: "ছবিটা পরিষ্কার। গল্পে আমি যা দেখছি:\n\n**Honest narrative**: Top-line strong, একটা চোখে পড়ার মতো miss, আর তার response আগে থেকেই চলছে। Board-এর কাছে এটা বিশ্বাসযোগ্য গল্প। দারুণ quarter নয়, কিন্তু সামলানো quarter।\n\n**Structure-এর challenge**: NRR miss-এর কথা বলতে হবে, কিন্তু পুরো আলোচনা যেন সেটা নিয়েই না হয়ে যায়। Sequence গুরুত্বপূর্ণ: উনারা জিজ্ঞেস করার আগেই তুলুন, দায় নিন, response-টা বলুন, তারপর Q2 আসলে কী নিয়ে সেখানে যান (enterprise + momentum)।\n\n**Ask**: $300k headcount approval আসবে confidence তৈরি হওয়ার পরে, আগে নয়। আমি এটা শেষে রাখব, strategy থেকে স্বাভাবিকভাবে যে সিদ্ধান্ত আসে সেভাবে, আলাদা কোনো budget request হিসেবে নয়।\n\nএখন narrative arc বানাচ্ছি।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Mixed quarter। Revenue: $2.4M, YoY +18% (plan মতো)। NRR: 102%, target 115%। Competitor-এর কাছে দুটো mid-market account গেছে। নতুন product: 60 জন beta customer, NPS strong। Team: full strength। Q2: enterprise focus, mid-market retention ঠিক করা, product momentum ধরে রাখা। Board approval লাগবে: sales headcount-এ +$300k।",
              },
              {
                role: "claude",
                text: "মূল গল্প: top-line strong, একটা চোখে পড়ার মতো miss, response আগে থেকেই ঠিক করা। একেবারে \"সামলানো quarter\"-এর narrative।\n\nStructure নিয়ে একটা কথা: উনারা জিজ্ঞেস করার আগেই NRR miss তুলুন। দায় নিন, কারণটা বলুন, তারপর Q2-এর response-এ যান। $300k-এর ask সবচেয়ে ভালো কাজ করবে শেষে, strategy-র স্বাভাবিক conclusion হিসেবে, আলাদা কোনো line item হিসেবে নয়।\n\nNarrative arc বানাচ্ছি।",
              },
            ],
          },
        },
        {
          title: "Narrative arc তৈরি করুন",
          description:
            "Slide বানানোর আগে Claude গল্পটা সাজায়: শুরু থেকে শেষ পর্যন্ত audience কোন অনুভূতির ভেতর দিয়ে যাবে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আগে narrative arc বানান, slide-এর আগে।",
              },
              {
                role: "claude",
                text: "**Narrative Arc : Q1 Board Update**\n\n1. **শুরু করুন confidence দিয়ে, caveat দিয়ে নয়** : প্রথমে revenue-র number দিন। Nuance আনার আগেই tone set করুন যে \"এই business আমাদের নিয়ন্ত্রণে আছে\"।\n\n2. **Miss-টা নিজে থেকেই তুলুন** : কেউ জিজ্ঞেস করার আগেই NRR-এর কথা বলুন। এভাবে বলুন: \"আমরা এটা দেখেছি, এই কারণে হয়েছে, আর এটা নিয়ে আমরা এরই মধ্যে কাজ করছি।\" প্রশ্নের মুখে পড়ার চেয়ে নিজে থেকে miss-এর দায় নিলে বেশি confidence তৈরি হয়।\n\n3. **Product momentum দিয়ে ভারসাম্য আনুন** : 60 জন beta customer + strong NPS হলো আপনার signal যে investment thesis এখনও ঠিক আছে। এটাই সেই মুহূর্ত: \"NRR-এর চাপ থাকলেও আমরা কিছু একটা দাঁড় করাচ্ছি।\"\n\n4. **Q2 strategy আসে Q1-এর গল্প থেকে** : Enterprise focus + mid-market retention + product momentum তিনটা আলাদা জিনিস নয়। Q1 থেকে আপনি যা শিখেছেন, এগুলো তার একটা গোছানো response।\n\n5. **Ask দিয়ে শেষ করুন, স্বাভাবিক conclusion হিসেবে** : Sales headcount-এর $300k কোনো budget request নয়; এইমাত্র যে Q2 strategy দেখালেন, সেটা execute করতে এই resource লাগবে। Sequence গুরুত্বপূর্ণ: আগে strategy, তারপর investment।",
              },
            ],
          },
          ideDemo: {
            steps: [
              { role: "user", text: "Narrative arc বানান।" },
              {
                role: "claude",
                text: "**Arc**: শুরুতে strong (revenue) → নিজে থেকেই miss-এর দায় নিন (NRR) → momentum-এ যান (product beta) → Q2-কে গোছানো response হিসেবে দেখান → শেষে headcount-এর ask, স্বাভাবিক conclusion হিসেবে।\n\nGoal: board যেন ভাবে \"এরা নিজেদের business বোঝে, এদের plan আছে, ask-টা যুক্তিসঙ্গত\", আর যেন না ভাবে \"NRR-এর কী হলো?\"",
              },
            ],
          },
        },
        {
          title: "Slide ধরে ধরে outline বানান",
          description:
            "এবার Claude narrative arc-কে একটা নির্দিষ্ট slide structure-এ নিয়ে আসে। প্রতিটা slide-এর থাকবে title, key message আর supporting content।",
          appDemo: {
            steps: [
              { role: "user", text: "এবার slide ধরে ধরে outline বানান।" },
              {
                role: "claude",
                text: "**Slide Deck Outline : Q1 Board Update**\n\n**Slide 1: Title** : Q1 2026 Business Update | [তারিখ]\n\n**Slide 2: এক slide-এ Q1** : Key message: \"ভালো quarter, একটা পরিষ্কার শিক্ষা।\"\n• Revenue: $2.4M (YoY +18%) ✅\n• NRR: 102% (target 115%) ⚠️\n• Beta customer: 60 | NPS: [score] ✅\n• Team: পুরো staffed ✅\n\n**Slide 3: Revenue-র গভীরে** : Key message: \"Top line healthy আর বাড়ছে।\"\n• MoM trend, YoY তুলনা, new বনাম expansion breakdown\n\n**Slide 4: NRR-এর গল্প** : Key message: \"আমরা কারণ জানি, আর এরই মধ্যে ঠিক করছি।\"\n• 2টা mid-market churn, competitor-এর নাম\n• Root cause: [আপনার analysis]\n• যে response শুরু হয়ে গেছে: [নেওয়া action]\n\n**Slide 5: Product Momentum** : Key message: \"নতুন product কাজ করছে।\"\n• 60 জন beta customer, NPS score, customer-দের 3টা quote\n• আমরা কী শিখছি, এরপর কী\n\n**Slide 6: Q2 Strategy** : Key message: \"তিনটা bet, পরিষ্কার যুক্তি।\"\n• Enterprise: [কেন, কীভাবে, target]\n• Mid-market retention: [fix plan]\n• Product: [পরের milestone]\n\n**Slide 7: Investment Case** : Key message: \"Q2 execute করতে আমাদের একটা জিনিস লাগবে।\"\n• $300k headcount: 2 জন enterprise AE\n• Revenue model: current ACV-তে payback period\n• Ask: [তারিখ]-এর মধ্যে approve\n\n**Slide 8: Q&A / Appendix pointer**",
              },
            ],
          },
          ideDemo: {
            steps: [
              { role: "user", text: "Slide ধরে ধরে outline বানান।" },
              {
                role: "claude",
                text: "8টা slide:\n\n1. **Title** : Q1 2026 Board Update\n2. **Q1 snapshot** : Revenue ✅, NRR ⚠️, Product ✅, Team ✅\n3. **Revenue** : Top line healthy, MoM/YoY trend\n4. **NRR-এর গল্প** : Miss-এর দায় নিন, কারণ বলুন, fix দেখান\n5. **Product momentum** : 60 জন beta customer, NPS, customer-দের 3টা quote\n6. **Q2 strategy** : Enterprise / retention / product (Q1-এর গোছানো response)\n7. **Investment case** : $300k headcount, payback model, formal ask\n8. **Q&A + appendix pointer**",
              },
            ],
          },
        },
        {
          title: "সবচেয়ে কঠিন slide-গুলোর speaker notes লিখুন",
          description:
            "NRR slide আর ask slide-এই presenter-রা বেশি ঝামেলায় পড়েন। ওই দুটোর speaker notes Claude-কে দিয়ে লিখিয়ে নিন।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Slide 4 (NRR slide) আর slide 7 (ask)-এর speaker notes লিখে দিন। এই দুটো নিয়েই আমি সবচেয়ে nervous।",
              },
              {
                role: "claude",
                text: "**Slide 4 : Speaker Notes (NRR)**\n\n*যা বলবেন*: \"NRR এসেছে 102%, target ছিল 115%। এটা miss, আর আমি এটা নিয়ে সরাসরি কথা বলতে চাই। আমরা দুটো mid-market account হারিয়েছি। দুই ক্ষেত্রেই [competitor-এর নাম] কম দামে এমন feature set নিয়ে এসেছে যা ওই segment-এর জন্য যথেষ্ট। Risk-টা আমরা দেখেছিলাম; response দিতে দেরি করেছি।\n\nএরই মধ্যে যা করেছি: [নির্দিষ্ট action, যেমন mid-market tier-এর দাম নতুন করে ঠিক করেছি, একজন dedicated CSM দিয়েছি]। [তারিখ]-এর পর থেকে এই segment-এ যে account-গুলো ধরে রেখেছি, সেগুলোর trend [metric]।\n\nআমি কেন বেশি চিন্তিত নই: আমাদের enterprise account-গুলোর NRR [NRR %], আর আমরা যে product bet নিচ্ছি সেগুলো সেই customer profile-কে ঘিরে যেখানে আমরা জিতি। তবে mid-market retention সত্যিই একটা সমস্যা, আর Q2-তে এর জন্য নির্দিষ্ট plan আছে।\"\n\n*যা বলবেন না*: ছোট করে দেখাবেন না (\"মাত্র দুটো account\")। বেশি ব্যাখ্যাও করবেন না। দায় নিন, তারপর এগিয়ে যান।\n\n---\n\n**Slide 7 : Speaker Notes (Ask)**\n\n*যা বলবেন*: \"এইমাত্র যে enterprise strategy দেখালাম, সেটা execute করতে আমাদের দুজন enterprise AE লাগবে। Current ACV আর ramp time ধরলে payback period [X মাস], যা আমাদের planning horizon-এর ভেতরেই।\n\nআমি board-এর কাছে $300k headcount-এর approval চাইছি। দুজন candidate ঠিক করা আছে, approval পেলে দ্রুত এগোতে পারব। না হলে Q2 ধীরে চলবে, কারণ যে segment-এ আমরা জিতছি সেখানে capacity কম থাকবে।\"\n\n*Tone*: Confident, ক্ষমা চাওয়ার সুরে নয়। আগের ছয়টা slide জুড়ে আপনি case তৈরি করেছেন। এটা তার স্বাভাবিক conclusion, কোনো surprise নয়।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Slide 4 (NRR) আর slide 7 (ask)-এর speaker notes লিখে দিন।",
              },
              {
                role: "claude",
                text: "**Slide 4 notes**: শুরু করুন \"আমি এটা নিয়ে সরাসরি কথা বলতে চাই\" দিয়ে। কারণ বলুন, যে action নেওয়া হয়েছে সেটা বলুন, সামনের দিকের একটা metric দিন। ছোট করে দেখাবেন না, বেশি ব্যাখ্যাও করবেন না। 90 সেকেন্ডের মধ্যে দায় নিয়ে এগিয়ে যান।\n\n**Slide 7 notes**: \"এইমাত্র যা দেখালাম সেটা execute করতে দুজন enterprise AE লাগবে। Current ACV-তে payback [X মাস]। আমি $300k-এর approval চাইছি। Candidate ঠিক করা আছে, দ্রুত এগোতে পারব। না হলে যে segment-এ আমরা জিতছি, সেখানে কম capacity নিয়ে Q2 চালাতে হবে।\" Confident থাকুন, ক্ষমা চাওয়ার সুরে নয়। আগের ছয়টা slide এই case তৈরি করে দিয়েছে।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "যেকোনো decision-কে একটা পরিষ্কার memo-তে আনুন",
        href: "/tutorials/decision-memo",
      },
    },
  },

  "newsletter-automator": {
    sourceHash: "81fd354c3d576151",
    translatedAt: "2026-10-06",
    content: {
      title: "১০ মিনিটে আপনার Newsletter Automate করুন",
      slug: "newsletter-automator",
      duration: "১০ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "ide"],
      description:
        "Claude-কে আপনার source দিন (URL, RSS feed বা topic), আর হাতে পান পুরো format করা একটা newsletter draft, পাঠানোর জন্য ready।",
      intro:
        "Newsletter লেখার বেশিরভাগটাই আসলে বাছাই করা: দশটা tab ঘাঁটেন, কোনটা গুরুত্বপূর্ণ ঠিক করেন, তারপর এক ঘণ্টা ধরে সেগুলো জোড়া দিয়ে লেখা দাঁড় করান। ঘাঁটা, summary করা আর প্রথম draft লেখা Claude করে দিতে পারে। শেষে editing আর আপনার নিজের voice যোগ করার কাজটা আপনার।",
      steps: [
        {
          title: "আপনার newsletter কী নিয়ে, Claude-কে বলুন",
          description:
            "Claude.ai খুলুন আর একটা message-এ আপনার newsletter-এর বর্ণনা দিন। যত specific হবেন, draft তত ভালো হবে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি product manager-দের জন্য \"PM Pulse\" নামে একটা weekly newsletter চালাই। এতে থাকে product strategy, interesting কিছু framework, আর try করার মতো একটা tool। আমার audience tech company-র mid থেকে senior লেভেলের PM। Tone smart, কিন্তু ভারী না। যেন একজন চৌকস PM বন্ধু আপনাকে text করছে।",
              },
              {
                role: "claude",
                text: "Brief-টা ভালো লাগল। \"চৌকস PM বন্ধু text করছে\", এই editorial voice-টা ধরে রাখার মতো।\n\nপ্রতিটা issue-র জন্য আমি এই structure suggest করব:\n1. The Insight (এই সপ্তাহে ভাবার মতো 1টা idea)\n2. The Framework (একটা mental model বা process, সহজ করে বোঝানো)\n3. The Tool (try করার মতো একটা জিনিস, real use case সহ)\n\nআপনি কি এখন এভাবেই চালান? আর প্রতিটা section কি ছোট, ধারালো take হিসেবে লিখব, নাকি লম্বা explanation?",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "আমি mid থেকে senior PM-দের জন্য \"PM Pulse\" নামে একটা weekly newsletter চালাই। Tone smart, ভারী না। Structure: The Insight, The Framework, The Tool। পুরো session জুড়ে এই context মাথায় রাখবেন।",
              },
              {
                role: "claude",
                text: "মনে রাখলাম। এই session-এ যা বানাব, সবকিছুতে এই voice আর structure ব্যবহার করব।\n\nReady হলে এই সপ্তাহের source paste করুন (URL, article-এর title, বা যে topic নিয়ে ভাবছেন), আমি তিনটা section-ই draft করে দেব।",
              },
            ],
          },
        },
        {
          title: "Claude-কে আপনার source দিন",
          description:
            "URL, article-এর title, বা যে topic নিয়ে ভাবছেন শুধু সেটাই paste করুন। Claude এগুলোকে newsletter content বানিয়ে দেবে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এই সপ্তাহের source:\n\n1. https://www.lennysnewsletter.com/p/the-arc-of-the-pm\n2. Teresa Torres এইমাত্র continuous discovery নিয়ে post করেছেন, output থেকে outcome metric-এ switch করা নিয়ে কিছু একটা\n3. এই সপ্তাহে meeting notes-এর জন্য Granola try করছি, দারুণ লাগছে\n4. একটা tweet দেখলাম, কয়েকটা company-তে \"shape-up\" methodology আবার ফিরে আসছে",
              },
              {
                role: "claude",
                text: "PM Pulse, Issue [#] draft করছি...\n\n**The Insight: PM-এর পথচলা**\nবেশিরভাগ PM ভাবেন তাঁদের কাজ feature ship করা। সেরা PM-রা জানেন কাজটা আসলে metric নড়ানো। এই সপ্তাহে Lenny-র লেখাটা দেখায় output-focused থেকে outcome-focused হওয়ার পথটা বাস্তবে কেমন, আর কেন অনেক smart PM দরকারের চেয়ে বেশি সময় feature ship করার stage-এ আটকে থাকেন।\n\nনিজেকে একবার আয়নায় দেখতে চাইলে 10 মিনিট দিন।\n[link]\n\n**The Framework: Continuous Discovery (Teresa Torres)**\nTeresa বহু বছর ধরে এটা নিয়ে বলে আসছেন, কিন্তু এই সপ্তাহের post-টা specific: আপনার north star হিসেবে \"আমরা X ship করেছি\" থেকে \"আমরা Y নড়িয়েছি\"-তে switch...",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "এই সপ্তাহের source: Lenny-র arc-of-the-PM লেখাটা (lennysnewsletter.com), outcome বনাম output metric নিয়ে Teresa Torres, এই সপ্তাহে meeting notes-এর জন্য Granola try করেছি (দারুণ), shape-up methodology ফিরে আসা নিয়ে একটা tweet।",
              },
              {
                role: "claude",
                text: "PM Pulse draft করছি...\n\n**The Insight**: বেশিরভাগ PM-কে মাপা হয় output দিয়ে, outcome দিয়ে নয়। Lenny-র লেখাটা দেখায় কেন smart মানুষও দরকারের চেয়ে বেশি সময় সেখানে আটকে থাকেন।\n\n**The Framework**: Teresa Torres-এর continuous discovery। North star হিসেবে \"আমরা X ship করেছি\" থেকে \"আমরা Y নড়িয়েছি\"-তে নির্দিষ্ট switch-টা।\n\n**The Tool**: Meeting notes-এর জন্য Granola। এই সপ্তাহে আপনার use case কী ছিল? আপনার experience থেকে লিখব।\n\nGranola নিয়ে 30 সেকেন্ডে কিছু বলুন, আমি draft শেষ করে দিচ্ছি।",
              },
            ],
          },
        },
        {
          title: "Claude-কে আপনার voice যোগ করতে বলুন",
          description:
            "প্রথম draft ঠিকঠাক, কিন্তু সম্ভবত একটু ম্যাড়মেড়ে। Claude-কে বলুন আরও ধার দিতে, একটা সাহসী মত যোগ করতে, শুরুটা আরও জোরালো করতে, যাতে লেখাটা আপনার মতো শোনায়।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Draft ভালো, কিন্তু বেশি safe। Insight section-টা আরও ধারালো করুন। একটা সাহসী মত যোগ করুন। প্রচলিত ধারণার সঙ্গে দ্বিমত করতে আমার আপত্তি নেই।",
              },
              {
                role: "claude",
                text: "এই নিন আরও ধারালো version:\n\n**The Insight: বেশিরভাগ PM ব্যস্ত থাকেন progress-এর ভান করতে**\nLenny-র নতুন লেখাটা ভদ্রভাবে একটা কড়া কথা বলে: বেশিরভাগ PM কাজের পেছনে ছোটেন, outcome-এর পেছনে নয়। Backlog ভরছেন, sprint ceremony চালাচ্ছেন, এমন PRD লিখছেন যা কেউ দ্বিতীয়বার পড়ে না, অথচ যে metric-এর owner বলে ধরা হয় সেগুলো প্রায় নড়ছেই না।\n\n\"ভালো PM\" থেকে \"দারুণ PM\" হওয়া ভালো framework দিয়ে হয় না। হয় এমন outcome-এর দায় নেওয়ার অস্বস্তি সহ্য করে, যা পুরোপুরি আপনার নিয়ন্ত্রণে নেই।\n\nFeature কম। দায় বেশি। বেশিরভাগ মানুষ এটা করবেন না।\n[link]\n\nতিনটা section-জুড়েই কি এই energy রাখব?",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "বেশি safe হয়ে গেছে। আরও ধার দিন। Insight section-এ একটা সাহসী মত যোগ করুন। উল্টো কথা বলতে আমার ভয় নেই।",
              },
              {
                role: "claude",
                text: "ধারালো Insight:\n\n**বেশিরভাগ PM ব্যস্ত থাকেন progress-এর ভান করতে**\nLenny-র লেখাটা diplomatic, কিন্তু সত্যিটা আরও কড়া: বেশিরভাগ PM backlog ভরছেন আর ceremony চালাচ্ছেন, অথচ যে metric-এর owner বলে ধরা হয় সেগুলো প্রায় নড়াচ্ছেন না। \"ভালো\" থেকে \"দারুণ\" হওয়া framework-এর সমস্যা নয়। ব্যাপারটা হলো এমন outcome-এর দায় নেওয়া সহ্য করা, যা পুরোপুরি আপনার নিয়ন্ত্রণে নেই।\n\nFeature কম। Ownership বেশি। বেশিরভাগ মানুষ এটা করবেন না।\n\nFramework আর tool section-এও কি এই energy রাখব?",
              },
            ],
          },
        },
        {
          title: "আপনার platform অনুযায়ী format করিয়ে নিন",
          description:
            "Substack, Beehiiv বা সাধারণ email, যেটাই ব্যবহার করুন, Claude-কে বলুন ঠিকভাবে format করে দিতে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এটা Substack-এর জন্য format করে দিন। Subject line, preview text আর ঠিকঠাক section header রাখবেন।",
              },
              {
                role: "claude",
                text: "Substack-এর জন্য ready version:\n\n**Subject line:** বেশিরভাগ PM ব্যস্ত থাকেন progress-এর ভান করতে\n**Preview text:** Output বনাম outcome ভাবনা নিয়ে অস্বস্তিকর সত্যি\n\n---\n\nহাই [first_name],\n\nএই সপ্তাহে আপনার মনোযোগ পাওয়ার মতো তিনটা জিনিস:\n\n## 📌 The Insight\n**বেশিরভাগ PM ব্যস্ত থাকেন progress-এর ভান করতে**\n[পুরো section]\n\n## 🧠 The Framework\n**Continuous Discovery: আপনার North Star বদলানো**\n[পুরো section]\n\n## 🛠 The Tool\n**Granola: Meeting Notes, যা বিরক্তিকর নয়**\n[পুরো section]\n\n---\nপরের সপ্তাহে দেখা হবে,\n[আপনার নাম]\n\n_কোনো বন্ধু forward করেছে? এখানে subscribe করুন।_",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Substack-এর জন্য format করুন। Subject line, preview text, [first_name] merge tag, section header।",
              },
              {
                role: "claude",
                text: "**Subject**: বেশিরভাগ PM ব্যস্ত থাকেন progress-এর ভান করতে\n**Preview**: Output বনাম outcome ভাবনা নিয়ে অস্বস্তিকর সত্যি\n\n---\n\nহাই [first_name],\n\n## 📌 The Insight\n**বেশিরভাগ PM ব্যস্ত থাকেন progress-এর ভান করতে**\n[পুরো ধারালো section]\n\n## 🧠 The Framework\n**Continuous Discovery: আপনার North Star বদলান**\n[Teresa Torres section]\n\n## 🛠 The Tool\n**Granola**\n[এই সপ্তাহে আপনার experience]\n\n---\nপরের সপ্তাহে দেখা হবে,\n[আপনার নাম]\n\n_কোনো বন্ধু forward করেছে? [এখানে subscribe করুন।]_",
              },
            ],
          },
        },
        {
          title: "আপনার newsletter prompt-টা reusable template হিসেবে save করুন",
          description:
            "এইমাত্র Claude-কে যে instruction-গুলো দিলেন, সেগুলো এখন একটা reusable recipe। এটাকে আপনার স্থায়ী \"newsletter prompt\" হিসেবে save করে রাখুন, যাতে আর কখনো একদম শুরু থেকে শুরু করতে না হয়।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি যত instruction দিয়েছি, সেগুলো summary করে একটা reusable prompt বানিয়ে দিন। ভবিষ্যতে প্রতিটা session-এর শুরুতে ওটা paste করব।",
              },
              {
                role: "claude",
                text: "এই নিন আপনার reusable newsletter prompt:\n\n---\nআপনি \"PM Pulse\"-এর editor। এটা tech company-র mid থেকে senior লেভেলের product manager-দের জন্য একটা weekly newsletter। Tone: smart, কিন্তু ভারী না, যেন একজন চৌকস PM বন্ধু text করছে।\n\nপ্রতিটা issue এভাবে সাজাবেন:\n1. The Insight: 1টা idea, সাথে একটা সাহসী মত, উল্টো কথা বলতে ভয় নেই\n2. The Framework: একটা mental model, সহজ করে বোঝানো, বাস্তবে কীভাবে কাজে লাগে সহ\n3. The Tool: try করার মতো একটা product, আমার সপ্তাহের real use case সহ\n\nআমি source URL বা topic দিলে তিনটা section-ই draft করবেন। তারপর জিজ্ঞেস করবেন tone আরও ধারালো চাই কি না। Substack-এর জন্য format করবেন: subject line, preview text, [first_name] merge tag, section header।\n---\n\nএটা save করে রাখুন। প্রতিটা newsletter session-এর শুরুতে paste করবেন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "আমার সব instruction summary করে একটা reusable prompt বানান, যেটা প্রতিটা নতুন session-এর শুরুতে paste করতে পারব।",
              },
              {
                role: "claude",
                text: "আপনার reusable newsletter prompt:\n\n---\nআপনি \"PM Pulse\"-এর editor, mid থেকে senior PM-দের জন্য একটা weekly newsletter। Tone: চৌকস PM বন্ধু text করছে।\n\nStructure: The Insight (সাহসী মত, উল্টো কথা চলবে) / The Framework (mental model, practical) / The Tool (আমার সপ্তাহের real use case)।\n\nআমি source দিলে: তিনটা section-ই draft করবেন, জিজ্ঞেস করবেন আরও ধারালো চাই কি না। Substack-এর জন্য format: subject, preview text, [first_name], emoji সহ section header।\n---\n\nযেকোনো জায়গায় save করে রাখুন। প্রতিটা newsletter session-এর শুরুতে paste করবেন।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "আপনার প্রথম reusable skill বানান",
        href: "/tutorials/your-first-skill",
      },
    },
  },

  "stakeholder-map": {
    sourceHash: "3c55051967f1fa84",
    translatedAt: "2026-10-06",
    content: {
      title: "১৫ মিনিটে একটা Stakeholder Map বানান",
      slug: "stakeholder-map",
      duration: "১৫ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "ide"],
      description:
        "নাম আর role-এর এলোমেলো একটা list থেকে বানান গোছানো stakeholder map, communication plan আর outreach message। কোনো spreadsheet লাগবে না।",
      intro:
        "প্রত্যেক PM, consultant আর অফিসে কাজ করা মানুষ stakeholder map হাতে বানান। একটা doc খোলেন, নাম লিখতে শুরু করেন, আর দুই ঘণ্টা পরে হাতে থাকে এমন একটা chart যা কেউ পড়ে না। চলুন ভাবনার কাজটা Claude-কে দিয়ে করাই। Context আনবেন আপনি, structure বানাবে Claude।",
      steps: [
        {
          title: "Claude.ai খুলে আপনার project-এর context দিন",
          description:
            "claude.ai-তে যান (অথবা Claude desktop app খুলুন)। এখানে কোনো command চালাবেন না, কথা বলবেন। শুরুতে Claude-কে বলুন আপনি কী নিয়ে কাজ করছেন।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "একটা নতুন project-এর জন্য stakeholder map বানাতে হবে। আপনি কি help করতে পারবেন?",
              },
              {
                role: "claude",
                text: "অবশ্যই পারব। Stakeholder map-এ help করতে আমার বেশ ভালো লাগে। শুরু করতে আমাকে বলুন:\n\n1. Project বা initiative-টা কী?\n2. কারা কারা জড়িত? (নাম + role, মোটামুটি হলেও চলবে)\n3. আপনার goal কী: decision করিয়ে নেওয়া, সবার সমর্থন আদায় করা, নাকি communication plan করা?",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "একটা নতুন project launch-এর জন্য stakeholder map বানাতে হবে। Structure করতে help করবেন?",
              },
              {
                role: "claude",
                text: "হ্যাঁ। ঠিকভাবে করি। আমাকে বলুন:\n\n1. Project-টা কী?\n2. যে stakeholder-দের চেনেন তাঁদের list দিন (মোটামুটি নাম আর role হলেই চলবে)\n3. তাঁদের কাছ থেকে কী চান: approval, সমর্থন, তথ্য, নাকি resource?\n\nএগুলো পেলে আমি influence/interest দিয়ে map করে একটা communication plan দেব।",
              },
            ],
          },
        },
        {
          title: "আপনার stakeholder list paste করুন (এলোমেলো হলেও চলবে)",
          description:
            "Format নিয়ে চিন্তা করবেন না। Email, org chart-এর screenshot, LinkedIn-এর title, যা আছে paste করুন। Claude নিজেই গুছিয়ে নেবে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Project: পুরো company-তে একটা নতুন employee onboarding tool launch করা।\n\nStakeholder: Sarah Chen (CHRO), Mike Torres (Head of IT), 3 জন HRBP (নাম এখনও ঠিক হয়নি), Finance থেকে Aisha, আর budget approve করবেন CEO।",
              },
              {
                role: "claude",
                text: "বুঝেছি। Influence আর interest অনুযায়ী সাজানো আপনার stakeholder map:\n\n🔴 High Influence, High Interest\n• Sarah Chen (CHRO) : Decision maker আর champion। নিয়মিত update লাগবে, উনিই CEO-র কাছে present করবেন।\n• CEO : Budget approver। Approval-এর সময় বড় ভূমিকা, রোজকার কাজে কম জড়িত।\n\n🟡 High Influence, Lower Interest\n• Mike Torres (Head of IT) : Security আর integration-এর technical gatekeeper। Blocker থাকলে আগেভাগে জানান।\n• Aisha (Finance) : Budget approval উনার হাতে। Implementation-এর খুঁটিনাটি নয়, ROI case লাগবে।\n\n🟢 Lower Influence, High Interest\n• 3 জন HRBP : রোজকার user। Result-এ আগ্রহ বেশি, decision-এর ক্ষমতা কম। Sarah-কে দিয়ে জানিয়ে রাখুন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Project: পুরো company-তে onboarding tool launch। Stakeholder: Sarah Chen (CHRO), Mike Torres (Head of IT), 3 জন HRBP (নাম এখনও ঠিক হয়নি), Finance থেকে Aisha, budget approval-এর জন্য CEO।",
              },
              {
                role: "claude",
                text: "Influence/interest অনুযায়ী stakeholder map:\n\n🔴 **High/High** : Sarah Chen (CHRO), CEO\nSarah আপনার মূল champion আর gatekeeper। CEO শুধু approval দেবেন; Sarah-কে দিয়ে যান।\n\n🟡 **High/Low** : Mike Torres (IT), Aisha (Finance)\nMike: technical gatekeeper, integration requirement নিয়ে উনাকে শুরুতেই যুক্ত করুন।\nAisha: budget approver, implementation detail নয়, ROI দিয়ে কথা বলতে হবে।\n\n🟢 **Low/High** : HRBP (x3)\nরোজকার user আর advocate। নিয়মিত জানিয়ে রাখুন, উনাদের feedback Sarah-র কাছে তুলে ধরুন।\n\nCommunication plan-এর জন্য ready?",
              },
            ],
          },
        },
        {
          title: "একটা communication plan চান",
          description:
            "এবার map-টাকে একটা কাজের weekly plan-এ পরিণত করুন: কাকে কী বলবেন, আর কোন channel-এ।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এটা থেকে একটা communication plan বানান। Weekly cadence। প্রত্যেককে কী বলব আর কত ঘন ঘন?",
              },
              {
                role: "claude",
                text: "Communication Plan : Weekly Cadence\n\nSarah Chen (CHRO)\n→ Channel: 1:1 বা async Slack\n→ Frequency: সপ্তাহে একবার\n→ Content: Milestone অনুযায়ী progress, risk আগেভাগে জানানো, celebrate করার মতো win\n\nCEO\n→ Channel: Sarah-কে দিয়ে email summary\n→ Frequency: মাসে একবার, বা শুধু approval-এর সময়\n→ Content: এক paragraph-এ budget খরচ আর মূল milestone-এর status\n\nMike Torres (IT)\n→ Channel: দুই সপ্তাহে একবার sync + async Slack\n→ Content: Integration checklist, security requirement, blocker\n\nAisha (Finance)\n→ Channel: Email\n→ Frequency: প্রতিটা approval-এর আগে\n→ Content: ROI summary + business case সহ budget request\n\nHRBP (x3)\n→ Channel: Group Slack channel\n→ Frequency: দুই সপ্তাহে একবার\n→ Content: Progress update, উনাদের জন্য কী বদলাচ্ছে, কীভাবে feedback দেবেন",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "প্রত্যেক stakeholder-এর জন্য একটা weekly communication plan বানান। Channel, frequency, কী বলব।",
              },
              {
                role: "claude",
                text: "Communication Plan:\n\n**Sarah (CHRO)** : সপ্তাহে একবার 1:1 বা Slack\nMilestone অনুযায়ী progress, risk আগেভাগে জানানো, ওপরে জানানোর মতো win\n\n**CEO** : মাসে একবার বা শুধু approval-এর সময়, Sarah-কে দিয়ে\nএক paragraph: budget খরচ + milestone status\n\n**Mike Torres (IT)** : দুই সপ্তাহে একবার sync\nIntegration checklist, security requirement, blocker\n\n**Aisha (Finance)** : প্রতিটা approval-এর আগে email\nROI summary + business case সহ budget-এর ask\n\n**HRBP (x3)** : Group Slack, দুই সপ্তাহে একবার\nউনাদের জন্য কী বদলাচ্ছে, কীভাবে feedback দেবেন",
              },
            ],
          },
        },
        {
          title: "গুরুত্বপূর্ণ একজন stakeholder-এর জন্য outreach message draft করুন",
          description:
            "এমন কোনো stakeholder বেছে নিন যাঁর সঙ্গে এখনও যোগাযোগ হয়নি। Claude-কে প্রথম message-টা draft করতে বলুন।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Finance-এর Aisha-র জন্য একটা outreach message লিখে দিন। Q3 budget request-টা উনাকে দিয়ে approve করাতে হবে। উনি আমাকে এখনও ভালো করে চেনেন না।",
              },
              {
                role: "claude",
                text: "এই নিন একটা ছোট, চাপ না দেওয়া message:\n\n---\nহাই Aisha,\n\nআমি HR-এর onboarding tool initiative-টা lead করছি। Sarah Chen বললেন Q3 budget request-এর জন্য Finance-এ আপনিই সঠিক মানুষ।\n\nApproval cycle শুরু হওয়ার আগে 20 মিনিট সময় পেলে business case-টা আপনাকে দেখাতে চাই। কাজে লাগলে time-to-productivity কতটা বেড়েছে আর IT support ticket কতটা কমেছে, সেই number-ও আমার কাছে আছে।\n\nবৃহস্পতিবার দুপুর 2টা বা শুক্রবার সকাল কি আপনার জন্য সুবিধা হবে?\n\n[আপনার নাম]\n---\n\nTone বদলাব, নির্দিষ্ট number যোগ করব, নাকি আরও ছোট করব?",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Finance-এর Aisha-কে প্রথম একটা outreach email draft করে দিন। Q3 budget approval লাগবে। উনি আমাকে এখনও চেনেন না।",
              },
              {
                role: "claude",
                text: "Draft:\n\n---\nহাই Aisha,\n\nআমি onboarding tool initiative-টা lead করছি। Q3 budget request-এর জন্য Sarah Chen আমাকে আপনার কাছে পাঠিয়েছেন।\n\nApproval cycle শুরু হওয়ার আগে কি 20 মিনিট সময় হবে? ROI case-টা আপনাকে দেখাতে পারব। Time-to-productivity আর IT support ticket কমা নিয়ে আমাদের কাছে data আছে।\n\nবৃহস্পতিবার দুপুর 2টা বা শুক্রবার সকাল চলবে?\n\n[আপনার নাম]\n---\n\nআরও ছোট version চান, নাকি নির্দিষ্ট ROI number যোগ করব?",
              },
            ],
          },
        },
        {
          title: "Notion বা Confluence-এর জন্য markdown হিসেবে export করুন",
          description:
            "Claude-কে বলুন সবকিছু একটা পরিষ্কার document-এ গুছিয়ে দিতে, যাতে আপনার team-এর tool-এ paste করতে পারেন।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "সবকিছু একটা পরিষ্কার markdown document হিসেবে format করে দিন, যাতে Notion-এ paste করতে পারি।",
              },
              {
                role: "claude",
                text: "# Stakeholder Map : Onboarding Tool Launch\n_সর্বশেষ update: [তারিখ]_\n\n## Stakeholder Matrix\n| নাম | Role | Influence | Interest | মূল দায়িত্বে |\n|---|---|---|---|---|\n| Sarah Chen | CHRO | High | High | আপনি |\n| CEO | Executive | High | Medium | Sarah |\n| Mike Torres | Head of IT | High | Low | আপনি |\n| Aisha | Finance Lead | High | Low | আপনি |\n| HRBP (x3) | HR Business Partner | Low | High | Sarah |\n\n## Communication Cadence\n[ওপরের পুরো weekly plan...]\n\n## মূল Risk\n1. IT approval-এ আটকে যাওয়া। Week 2-এর মধ্যে integration requirement সামনে আনুন।\n2. CEO approval। Week 6-এর মধ্যে Sarah-র হাতে one-pager পৌঁছানো নিশ্চিত করুন।\n\n✓ Notion-এ paste করার জন্য ready।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "সবকিছু Notion-এর জন্য একটা পরিষ্কার markdown document হিসেবে format করে দিন।",
              },
              {
                role: "claude",
                text: "# Stakeholder Map : Onboarding Tool Launch\n\n## Matrix\n| নাম | Role | Influence | Interest | Owner |\n|---|---|---|---|---|\n| Sarah Chen | CHRO | High | High | আপনি |\n| CEO | Executive | High | Med | Sarah |\n| Mike Torres | IT | High | Low | আপনি |\n| Aisha | Finance | High | Low | আপনি |\n| HRBP (x3) | HR BP | Low | High | Sarah |\n\n## Communication Cadence\n[weekly plan এখানে]\n\n## Risk\n1. IT approval-এ আটকে যাওয়া। Week 2-এর মধ্যে Mike-কে যুক্ত করুন।\n2. CEO approval। Week 6-এর মধ্যে Sarah-র one-pager লাগবে।\n\n✓ এটা Notion-এ paste করুন।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "আপনার PM workspace-এর জন্য একটা CLAUDE.md setup করুন",
        href: "/tutorials/your-first-claude-md",
      },
    },
  },

  "performance-review": {
    sourceHash: "14f5136c095415ce",
    translatedAt: "2026-10-06",
    content: {
      title: "২০ মিনিটে একটা Performance Review লিখুন",
      slug: "performance-review",
      duration: "২০ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "ide"],
      description:
        "Team-এর কোনো সদস্যকে নিয়ে আপনার এলোমেলো notes paste করুন। হাতে পাবেন গোছানো, balanced, specific একটা review, submit করার জন্য ready।",
      intro:
        "Performance review কষ্টের কারণ, কয়েক মাসের স্মৃতিকে গোছানো লিখিত feedback-এ আনতে হয়, আর সেটা হতে হয় fair, specific আর গঠনমূলক। বেশিরভাগ manager হয় অস্পষ্ট কিছু লেখেন (\"দারুণ collaborator!\"), নয়তো শব্দ বাছতে দুই ঘণ্টা কাটিয়ে দেন। Structure সামলাবে Claude। সত্যিটা দেবেন আপনি।",
      steps: [
        {
          title: "Claude-কে context দিন",
          description:
            "শুরুতে Claude-কে বলুন কার review লিখছেন, উনি কোন level-এ আছেন, আর কোন কোন dimension গুরুত্বপূর্ণ। যত specific হবেন, output তত কাজে লাগবে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমার একজন direct report-এর annual performance review লিখতে হবে। Structure করতে help করবেন?",
              },
              {
                role: "claude",
                text: "হ্যাঁ। ঠিকভাবে করি। Fair আর কাজের কিছু লিখতে আমাকে বলুন:\n\n1. উনার role আর level (যেমন Senior PM, L5 Engineer)\n2. Review period (6 মাস, নাকি annual)\n3. আপনার company কোন dimension ব্যবহার করে (impact, execution, collaboration, growth, বা আপনার company-র নিজস্ব rubric)\n4. সব মিলিয়ে: উনি কি high performer, expectation পূরণ করছেন, নাকি এটা একটা কঠিন আলাপ হবে?\n\nআপনি যত বেশি দেবেন, আমাকে তত কম বানিয়ে লিখতে হবে।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "আমার direct report-এর performance review লিখতে help করুন। Senior PM, annual review, company rubric: impact / execution / collaboration / growth।",
              },
              {
                role: "claude",
                text: "Structure পেয়ে গেছি। কিছু draft করার আগে আপনার raw observation লাগবে। আপনার notes paste করুন (bullet point হলেও চলবে, এলোমেলো হলেও চলবে), আমি ওই চারটা dimension ধরে একটা গোছানো review বানিয়ে দেব।",
              },
            ],
          },
        },
        {
          title: "আপনার raw observation paste করুন",
          description:
            "এখানে নিজেকে আটকাবেন না। এলোমেলো notes, bullet point, Slack message, যা আছে paste করুন। Claude সব মিলিয়ে গুছিয়ে নেবে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "উনার নাম Priya, Senior PM। Strong দিক: onboarding redesign lead করেছে, activation 40% বেড়েছে, সময়মতো ship করেছে। দুর্বল দিক: দুবার sprint-এর শেষ দিকে এসে change control ছাড়াই requirement বদলেছে। Engineering এটা flag করেছে। Technically strong, কিন্তু engineering-এর সঙ্গে collaborator হিসেবে আরও grow করতে হবে।",
              },
              {
                role: "claude",
                text: "ভালো material। আমার হাতে যা আছে:\n\n✅ Strong: বড় impact-এর delivery (onboarding, 40% activation), deadline মেনে চলেন, technical depth আছে\n⚠️ Growth area: process ছাড়া শেষ মুহূর্তে requirement বদলানো, engineering-এর সঙ্গে টানাপোড়েন তৈরি হয়েছে\n\nDraft করার আগে একটা প্রশ্ন: activation-এর উন্নতি কি সরাসরি উনার project-এর কারণেই, আর sprint-এর ঘটনাগুলো কোন সময়ে হয়েছিল জানেন? Specific থাকলে review বিশ্বাসযোগ্য হয় আর defend করা যায়। তবে থাকুক বা না থাকুক, আমি draft করব।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Priya-র highlight: onboarding redesign Q3-তে ship হয়েছে, activation 40% বেড়েছে। সমস্যা: sprint-এর মাঝখানে দুবার change control ছাড়া requirement বদলেছে, দুবারই engineering team টানাপোড়েন flag করেছে। Technically strong, cross-functional দিকে grow করতে হবে।",
              },
              {
                role: "claude",
                text: "বুঝেছি। চারটা dimension-জুড়ে draft করার মতো যথেষ্ট আছে। Collaboration section-এ change control-এর ঘটনাগুলোর কথা নির্দিষ্ট করে বলা থাকবে। এটা fair, আর এখান থেকে কাজ করার মতো কিছু পাওয়া যায়। পুরো draft বানানোর জন্য ready।",
              },
            ],
          },
        },
        {
          title: "গোছানো draft তৈরি করুন",
          description:
            "Claude পুরো review লেখে: সার্বিক summary, প্রতিটা dimension-এর rating আর মন্তব্য, আর সামনের দিকে তাকানো একটা শেষ অংশ।",
          appDemo: {
            steps: [
              { role: "user", text: "পুরো review-টা draft করুন।" },
              {
                role: "claude",
                text: "**Performance Review : Priya [Last Name]**\nPeriod: Jan–Dec 2025\n\n**Overall**: Delivery আর product impact-এ শক্তিশালী একটা বছর। Cross-functional process মেনে চলায় উন্নতির জায়গা পরিষ্কার।\n\n**Impact : Exceeds**\nএই বছর Priya-র সবচেয়ে বড় কাজ ছিল onboarding redesign শুরু থেকে শেষ পর্যন্ত lead করা। Activation-এ 40% উন্নতি business-এর জন্য অর্থবহ একটা result, দেখানোর জন্য metric নয়। উনি সমস্যাটা চিহ্নিত করেছেন, solution নিয়ে সবাইকে এক জায়গায় এনেছেন, আর Q3-এর deadline মেনে সময়মতো ship করেছেন।\n\n**Execution : Meets**\nযা commit করেন, তা deliver করেন। উন্নতির সুযোগ: timeline বা scope বদলালে, partner-দের ওপর তার প্রভাব পড়ার আগেই নিজে থেকে জানানো।\n\n**Collaboration : Developing**\nOnboarding project চলাকালে দুবার sprint-এর শেষ দিকে change control ছাড়াই requirement বদলেছে, যাতে engineering team হঠাৎ বিপাকে পড়েছে। এতে কাজ আবার করতে হয়েছে আর আস্থা কমেছে। এই আচরণ সম্ভবত user নিয়ে উনার জোরালো বোধ থেকে এসেছে, কিন্তু process-ও গুরুত্বপূর্ণ। আগামী বছরের expectation: development চলাকালে scope বদলালে, যত জরুরিই হোক, ঠিক করা channel দিয়েই যেতে হবে।\n\n**Growth : Meets**\nPriya-র technical depth একটা বড় শক্তি। Grow করার জায়গা হলো সেটা দিয়ে partner-দের সঙ্গে নিয়ে চলা, শুধু নিজে একা দ্রুত এগোনো নয়।\n\n**সামনের দিকে**: Priya বড় scope নেওয়ার জন্য ready। সেটার জন্য যা করতে হবে, তা নির্দিষ্ট আর করা সম্ভব।",
              },
            ],
          },
          ideDemo: {
            steps: [
              { role: "user", text: "পুরো review-টা বানিয়ে দিন।" },
              {
                role: "claude",
                text: "**Performance Review : Priya [Last Name]** · Annual · Reviewer: [আপনি]\n\n**Overall**: Delivery আর impact-এ শক্তিশালী। Collaboration হলো নির্দিষ্ট growth area।\n\n**Impact** : Exceeds\nOnboarding redesign lead করেছেন। Activation 40% বেড়েছে, Q3-তে সময়মতো ship। Business-এর জন্য বড় value।\n\n**Execution** : Meets\nCommitment-এ নির্ভরযোগ্য। সুযোগ: scope বদলালে partner-দের ওপর প্রভাব পড়ার আগেই নিজে থেকে জানানো।\n\n**Collaboration** : Developing\nSprint-এর মাঝখানে change control ছাড়া দুবার requirement বদল, দুবারই engineering flag করেছে। মূল কারণ: process discipline ছাড়া জোরালো product বোধ কাজ করছে। নির্দিষ্ট, ঠিক করা যায়।\n\n**Growth** : Meets\nTechnical depth একটা শক্তি। Grow করার জায়গা: সেটা দিয়ে partner-দের সঙ্গে নিয়ে চলা।\n\n**সামনে**: বেশি scope-এর জন্য ready। কী নিয়ে কাজ করতে হবে তা পরিষ্কার আর সীমিত।\n\nকোনো section বাড়াব, বা rating বদলাব?",
              },
            ],
          },
        },
        {
          title: "Specific তথ্য দিয়ে আরও ধারালো করুন",
          description:
            "সাধারণ feedback অন্যায্য মনে হয়। আসল result-এর সঙ্গে জোড়া আরও নির্দিষ্ট ভাষা দিয়ে যেকোনো section শক্ত করতে Claude-কে বলুন।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Impact section ভালো হয়েছে, কিন্তু আরও গল্পের মতো করুন। আমি চাই leadership বুঝুক কাজটা কেন কঠিন ছিল, শুধু result ভালো হয়েছে সেটা না।",
              },
              {
                role: "claude",
                text: "Update করা Impact section:\n\n**Impact: Exceeds**\nOnboarding redesign ছিল এই বছর Priya-র সবচেয়ে বড় অর্জন, আর সেটা সহজ জয় ছিল না। Project শুরুই হয়েছিল scope নিয়ে অনেক অস্পষ্টতা নিয়ে, ছয় নম্বর সপ্তাহে engineering-এর একটা সীমাবদ্ধতায় timeline ঝুঁকিতে পড়ে, আর অন্তত একবার stakeholder-রা scope কমানোর চাপ দেন। Priya leadership পর্যন্ত escalate না করেই তিনটাই সামলেছেন।\n\nShipping-এর headline হলো activation-এ 40% উন্নতি। কিন্তু এর পেছনে আছে চাপের মধ্যে একটা জটিল, cross-functional project ধরে রাখার ক্ষমতা: user research দিয়ে সমস্যা চিহ্নিত করা, সহজে চোখে পড়ে না এমন একটা solution নিয়ে সবাইকে এক জায়গায় আনা, আর সময়মতো ship করা। Senior PM level-এ আমরা ঠিক এমন স্বাধীন ownership আশা করি, আর উনি সেটাই দেখিয়েছেন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Impact section বাড়ান। আরও গল্পের মতো করুন, কাজটা কেন কঠিন ছিল বোঝান, শুধু result কী হয়েছে সেটা না।",
              },
              {
                role: "claude",
                text: "বাড়ানো version:\n\nOnboarding redesign গোছানো project ছিল না। শুরুতে scope অস্পষ্ট ছিল, ছয় নম্বর সপ্তাহে engineering-এর একটা সীমাবদ্ধতা timeline ঝুঁকিতে ফেলে, আর stakeholder-রা দুবার scope কমানোর চাপ দেন। Priya escalate না করেই সব সামলেছেন। Activation-এ 40% উন্নতি শুধু ভালো product বোধ নয়, Senior PM হিসেবে যে স্থিরতা আর স্বাধীন ownership আমাদের দরকার, তারও প্রমাণ। উনি একটা কঠিন project ভালোভাবে চালিয়েছেন।",
              },
            ],
          },
        },
        {
          title: "Tone ঠিক করুন",
          description:
            "Claude-কে balance বদলাতে বলুন। নাজুক আলাপের জন্য নরম, আর এমন high performer-এর জন্য আরও সরাসরি, যাঁর grow করতে honest feedback দরকার।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Review-এর বাকিটা এত strong, সেই তুলনায় collaboration section বেশি কড়া লাগছে। সব মিলিয়ে উনি high performer। আমি চাই tone-এ সেটা থাকুক, তবে growth area নিয়েও honest থাকুক।",
              },
              {
                role: "claude",
                text: "এই নিন balance করা version, feedback একই, শুধু বলার ধরন আলাদা:\n\n**Collaboration: Developing**\nPriya quality নিয়ে জোর দিয়ে লেগে থাকেন, আর এটা উনার শক্তি, দুর্বলতা নয়। যেটা আরও ধারালো করতে হবে তা হলো, চলমান sprint-এর মধ্যে কাজটা কীভাবে করেন। দুবার change control ছাড়া শেষ মুহূর্তে requirement বদলানোয় engineering-কে কাজ আবার করতে হয়েছে আর কিছুটা আস্থা কমেছে। এটা collaboration-এর বড় কোনো সমস্যা নয়, process-এর একটা নির্দিষ্ট অভ্যাস। PM-রা যখন বড়, বেশি চোখে পড়ার মতো project নেন, যেখানে stakeholder-এর আস্থা একবার গেলে ফেরানো সবচেয়ে কঠিন, তখন সাধারণত এটা ঠিক হয়ে যায়।\n\nআগামী বছরের expectation: user insight থেকে sprint-এর মাঝখানে scope বদলানো দরকার হলে, process দিয়ে আনুন। বোধটা ঠিক আছে; সময় আর channel-টা ঠিক করতে হবে।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Collaboration section একটু নরম করুন। সব মিলিয়ে উনি strong performer, আমি চাই না এটা বাকি সবকিছু ঢেকে দিক।",
              },
              {
                role: "claude",
                text: "Balance করা version:\n\n**Collaboration: Developing**\nPriya-র বোধ ঠিক। উনি product-এর সবচেয়ে ভালো result-এর জন্য চাপ দেন। যে অভ্যাসটা গড়তে হবে তা হলো দরকারের সময় সেই বোধকে process-এর ভেতর দিয়ে চালানো: change control ছাড়া sprint-এর মাঝখানে দুবার scope বদলানোয় engineering-কে এমন কাজ আবার করতে হয়েছে যা এড়ানো যেত। এটা নির্দিষ্ট, সীমিত একটা জিনিস যা ঠিক করা যায়, cross-functional কাজ করার ক্ষমতা নিয়ে বড় কোনো signal নয়। আগামী বছরের expectation: insight থেকে sprint-এর মাঝখানে কিছু বদলানো দরকার হলে, ঠিক করা channel দিয়ে আনুন।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "একটা weekly status report generator বানান",
        href: "/tutorials/weekly-status",
      },
    },
  },
};
