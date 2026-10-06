import type { Tutorial } from "@/lib/tutorials";
import type { Translation } from "@/lib/i18n/bn/tutorials";

export const BN_TUTORIALS_G4: Partial<Record<string, Translation<Tutorial>>> = {
  "playlist-analyzer": {
    sourceHash: "3f97005ee8f5496a",
    translatedAt: "2026-10-06",
    content: {
      title: "একটা Spotify Playlist Analyzer বানান",
      slug: "playlist-analyzer",
      duration: "১০ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "terminal"],
      description:
        "আপনার playlist paste করুন। Mood, energy আর tempo-র pattern নিয়ে stats পাবেন, সঙ্গে share করার মতো একটা vibe summary।",
      intro:
        "আপনার playlist-এর একটা vibe আছে, আপনি সেটা টের পান। কিন্তু সেটা আসলে কী? এই tutorial-এ আপনি গানের একটা list paste করবেন, আর Claude সেগুলোর mood, energy আর pattern analyze করবে। তারপর আপনাকে একটা visual breakdown আর share করার মতো একটা playlist personality card বানিয়ে দেবে। Spotify API লাগবে না। Code লাগবে না। শুধু গান।",
      steps: [
        {
          title: "আপনার playlist হাতে নিন",
          description:
            "Spotify-তে গিয়ে একটা playlist link copy করুন, অথবা artist-এর নামসহ কিছু গানের list লিখে ফেলুন। Claude দুটো থেকেই কাজ করতে পারে। যত বেশি গান দেবেন, analysis তত ভালো হবে। ১০ থেকে ৩০টা গান দিলে সবচেয়ে ভালো হয়।",
          demo: {
            title: "গানগুলো জোগাড় করুন",
            steps: [
              { type: "cmd", text: "claude" },
              { type: "success", text: "Claude Code ready" },
              {
                type: "cmd",
                text: '"আমার playlist-টা analyze করে দিন: Blinding Lights - The Weeknd, As It Was - Harry Styles, Levitating - Dua Lipa, Golden Hour - JVKE, Unholy - Sam Smith, Anti-Hero - Taylor Swift, Bad Guy - Billie Eilish, Watermelon Sugar - Harry Styles, Stay - The Kid LAROI, Peaches - Justin Bieber"',
                delay: 600,
              },
              { type: "out", text: "Analyzing 10 tracks...", delay: 800 },
              {
                type: "out",
                text: "Mood: pop-ঘেঁষা, emotional range মেশানো",
              },
              {
                type: "out",
                text: "Energy distribution: high ৬০%, mid ৩০%, low ১০%",
              },
              {
                type: "success",
                text: "Analysis শেষ। Visual breakdown বানানো হচ্ছে...",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি আমার Spotify playlist-টা analyze করতে চাই। শুধু গান আর artist-এর একটা list দিলেই হবে?",
              },
              {
                role: "claude",
                text: "হ্যাঁ, তাতেই হবে। শুধু আপনার গানের list paste করুন (গানের নাম + artist দিলেই চলবে), আমি পুরো playlist-এর vibe, mood, energy level আর tempo pattern analyze করে দেব।\n\nএকটা কথা: আমি এই গানগুলো নিয়ে আমার নিজের জানা থেকে কাজ করি, live Spotify data থেকে নয়। তাই পরিচিত গানগুলোর analysis সবচেয়ে ভালো হবে। আপনার list paste করুন।",
              },
            ],
          },
        },
        {
          title: "Claude-কে analyze করতে বলুন",
          description:
            "আপনার playlist paste করুন আর Claude-এর কাছে পুরো breakdown চান। নির্দিষ্ট করে বলুন: mood, energy, tempo, emotional arc। যত নির্দিষ্ট করে চাইবেন, output তত ভালো হবে। নিচের prompt-টা copy করে নিতে পারেন।",
          code: {
            snippet: `এই playlist-টা analyze করে আমাকে দিন:
১. Overall vibe / mood (২-৩ শব্দে)
২. Energy level breakdown (high / mid / low কত percent)
৩. Tempo feel (uptempo, midtempo, downtempo কেমন মেশানো)
৪. Emotional arc (উঠছে, নামছে, নাকি একই রকম থাকছে?)
৫. অবাক করার মতো কোনো pattern চোখে পড়লে সেটাও বলুন

Playlist:
Blinding Lights - The Weeknd
As It Was - Harry Styles
Levitating - Dua Lipa
Golden Hour - JVKE
Unholy - Sam Smith
Anti-Hero - Taylor Swift
Bad Guy - Billie Eilish
Watermelon Sugar - Harry Styles
Stay - The Kid LAROI
Peaches - Justin Bieber`,
            language: "text",
          },
          demo: {
            title: "Claude আপনার playlist পড়ছে",
            steps: [
              { type: "out", text: "Reading playlist...", delay: 400 },
              {
                type: "out",
                text: "Cross-referencing 10 tracks with known audio profiles",
              },
              { type: "out", text: "" },
              { type: "out", text: "Overall vibe: feel-good confidence" },
              { type: "out", text: "Energy: high ৬০% / mid ৩০% / chill ১০%" },
              {
                type: "out",
                text: "Tempo: বেশিরভাগই uptempo, মাঝে কয়েকটা midtempo গানে একটু দম নেওয়া",
              },
              {
                type: "out",
                text: "Emotional arc: শুরুতেই peak, তারপর উঁচুতেই থাকে, শেষে নরম হয়",
              },
              {
                type: "out",
                text: "Pattern পাওয়া গেছে: ১০টার মধ্যে ৪টা গান nostalgic synthpop-এর দিকে ঝোঁকা",
              },
              {
                type: "success",
                text: "Analysis তৈরি। এবার আপনার HTML visual বানানো হচ্ছে...",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এই যে আমার playlist:\nBlinding Lights - The Weeknd\nAs It Was - Harry Styles\nLevitating - Dua Lipa\nGolden Hour - JVKE\nUnholy - Sam Smith\nAnti-Hero - Taylor Swift\nBad Guy - Billie Eilish\nWatermelon Sugar - Harry Styles\nStay - The Kid LAROI\nPeaches - Justin Bieber\n\nআমাকে mood, energy breakdown, tempo feel, emotional arc, আর যা যা pattern চোখে পড়ে, সব বলুন।",
              },
              {
                role: "claude",
                text: "এই নিন আপনার playlist analysis:\n\nOverall vibe: feel-good confidence, ভেতরে একটা emotional টান আছে।\n\nEnergy breakdown:\n- High energy: ৬০% (Blinding Lights, Levitating, Bad Guy, Stay)\n- Mid energy: ৩০% (Anti-Hero, Unholy, Watermelon Sugar)\n- Low/chill: ১০% (Golden Hour)\n\nTempo feel: বেশিরভাগই uptempo। এই playlist থেমে থাকে না।\n\nEmotional arc: The Weeknd দিয়ে শুরুতেই জোরালো peak, মাঝখানে confidence ধরে রাখে, আর শেষের দিকে Peaches আর Golden Hour দিয়ে একটু নরম হয়ে আসে।\n\nPattern পাওয়া গেছে: ১০টার মধ্যে ৪টা গানের production-এ ৮০-এর দশকের synthpop-এর ছাপ খুব বেশি (Blinding Lights, Levitating, As It Was, Watermelon Sugar)। Lyrics এখনকার সময়ের হলেও আপনার পুরো playlist-জুড়ে একটা nostalgia-র সুতো চলেছে।\n\nVisual breakdown বানাব?",
              },
            ],
          },
        },
        {
          title: "একটা visual breakdown নিন",
          description:
            "এবার Claude-কে বলুন analysis-টাকে সহজ visual chart সহ একটা HTML page বানিয়ে দিতে। এটা শুধু HTML আর CSS ব্যবহার করবে, কোনো জটিল library নয়, তাই যেকোনো browser-এ সঙ্গে সঙ্গে খুলতে পারবেন।",
          code: {
            snippet: `এবার আমাকে একটা HTML page বানিয়ে দিন, যেখানে থাকবে:
- Energy distribution (high/mid/low) দেখানো একটা bar chart
- একটা mood color palette (vibe-এর সঙ্গে মেলে এমন color)
- যে pattern-গুলো পাওয়া গেছে তার list
- Clean, dark design, যেন music-এর feel আসে

শুধু HTML আর CSS ব্যবহার করুন। কোনো external library না। আমি এখনই browser-এ খুলতে চাই।`,
            language: "text",
          },
          demo: {
            title: "Claude আপনার chart page বানাচ্ছে",
            steps: [
              {
                type: "cmd",
                text: 'claude "এই analysis-এর একটা HTML visual breakdown বানিয়ে দিন। Dark theme, energy-র জন্য bar chart, mood color swatch, কোনো external library না।"',
              },
              { type: "out", text: "Building HTML page...", delay: 600 },
              {
                type: "out",
                text: "Creating energy distribution bar chart with CSS",
              },
              {
                type: "out",
                text: "Generating mood color palette: #1a1a2e, #e94560, #f5a623",
              },
              { type: "out", text: "Adding pattern cards and arc visualization" },
              { type: "success", text: "Created playlist-analysis.html" },
              {
                type: "warn",
                text: "Browser-এ খুলুন: open playlist-analysis.html",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Visual breakdown সহ একটা HTML page বানিয়ে দিন। Dark theme, energy distribution-এর bar chart, mood color palette, আর পাওয়া pattern-গুলোর list। শুধু HTML আর CSS, কোনো library না।",
              },
              {
                role: "claude",
                text: 'এই নিন আপনার HTML page। পুরোটা copy করে `playlist-analysis.html` নামে save করুন, তারপর browser-এ খুলুন।\n\n```html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Playlist Analysis</title>\n  <style>\n    body { background: #0d0d0d; color: #e0e0e0; font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }\n    h1 { font-size: 1.5rem; color: #fff; }\n    .vibe { font-size: 2rem; font-weight: bold; color: #e94560; margin: 8px 0; }\n    .bar-wrap { margin: 24px 0; }\n    .bar-label { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px; }\n    .bar { height: 24px; border-radius: 4px; margin-bottom: 8px; }\n    .bar.high { width: 60%; background: #e94560; }\n    .bar.mid { width: 30%; background: #f5a623; }\n    .bar.low { width: 10%; background: #4ecdc4; }\n    .palette { display: flex; gap: 8px; margin: 24px 0; }\n    .swatch { width: 48px; height: 48px; border-radius: 8px; }\n    .patterns li { margin: 6px 0; font-size: 0.9rem; }\n  </style>\n</head>\n<body>\n  <h1>Your Playlist Vibe</h1>\n  <div class="vibe">feel-good confidence</div>\n  <div class="bar-wrap">\n    <h2>Energy Distribution</h2>\n    <div class="bar-label"><span>High</span><span>60%</span></div>\n    <div class="bar high"></div>\n    <div class="bar-label"><span>Mid</span><span>30%</span></div>\n    <div class="bar mid"></div>\n    <div class="bar-label"><span>Chill</span><span>10%</span></div>\n    <div class="bar low"></div>\n  </div>\n  <h2>Mood Palette</h2>\n  <div class="palette">\n    <div class="swatch" style="background:#e94560"></div>\n    <div class="swatch" style="background:#f5a623"></div>\n    <div class="swatch" style="background:#4ecdc4"></div>\n    <div class="swatch" style="background:#1a1a2e"></div>\n  </div>\n  <h2>Patterns</h2>\n  <ul class="patterns">\n    <li>4 of 10 tracks lean into 80s-influenced synthpop</li>\n    <li>Nostalgic thread runs through present-tense lyrics</li>\n    <li>Emotional arc peaks early, stays high, softens at end</li>\n  </ul>\n</body>\n</html>\n```\n\nSave করে Chrome-এ খুলুন, আপনার visual breakdown দেখতে পাবেন।',
              },
            ],
          },
        },
        {
          title: "আপনার vibe summary বানান",
          description:
            'এবার মজার অংশ। Claude-এর কাছে share করার মতো একটা "playlist personality" card চান। তাতে থাকবে একটা জোরালো headline, আপনার stats, আর আপনার গানের পছন্দ নিয়ে এক লাইনের একটা description। এই অংশটারই screenshot নিয়ে আপনি বন্ধুদের পাঠাবেন।',
          code: {
            snippet: `এবার আমাকে একটা "Playlist Personality" card দিন, যেটার screenshot নিয়ে share করতে পারব:
- "The Nostalgic Hypeman"-এর মতো একটা bold title
- তিনটা stat badge (যেমন 60% High Energy, 40% Synthpop Vibes)
- আমার পছন্দ নিয়ে এক লাইনের একটা মজার roast
- Dark card format-এ দেখতে দারুণ হতে হবে, এবারও শুধু HTML/CSS`,
            language: "text",
          },
          demo: {
            title: "Share করার মতো আপনার personality card",
            steps: [
              {
                type: "cmd",
                text: 'claude "share করার মতো একটা playlist personality card বানিয়ে দিন। Bold title, তিনটা stat badge, এক লাইনের একটা roast। Dark card, শুধু HTML/CSS।"',
              },
              { type: "out", text: "Generating personality card...", delay: 500 },
              { type: "out", text: 'Title: "The Nostalgic Hypeman"' },
              { type: "out", text: "Stat 1: 60% High Energy" },
              { type: "out", text: "Stat 2: 40% Synthpop Soul" },
              { type: "out", text: "Stat 3: 100% Main Character Energy" },
              {
                type: "out",
                text: 'One-liner: "You cry to 80s beats while pretending you\'re fine."',
              },
              { type: "success", text: "Card added to playlist-analysis.html" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "HTML-এ share করার মতো একটা Playlist Personality card যোগ করুন। Bold title, তিনটা stat badge, আর আমার পছন্দ নিয়ে এক লাইনের একটা roast। Dark রাখুন, শুধু HTML/CSS।",
              },
              {
                role: "claude",
                text: 'Update করেছি। `</body>`-এর ঠিক আগে এই personality card section-টা বসান:\n\n```html\n<div style="border: 1px solid #333; border-radius: 12px; padding: 24px; margin-top: 32px; text-align: center;">\n  <div style="font-size: 0.75rem; letter-spacing: 0.1em; color: #888; text-transform: uppercase; margin-bottom: 8px;">Playlist Personality</div>\n  <div style="font-size: 2rem; font-weight: 900; color: #fff; line-height: 1.1;">The Nostalgic<br>Hypeman</div>\n  <div style="display: flex; justify-content: center; gap: 10px; margin: 20px 0; flex-wrap: wrap;">\n    <span style="background: #e94560; border-radius: 20px; padding: 6px 14px; font-size: 0.8rem; font-weight: 600;">60% High Energy</span>\n    <span style="background: #7b2fd4; border-radius: 20px; padding: 6px 14px; font-size: 0.8rem; font-weight: 600;">40% Synthpop Soul</span>\n    <span style="background: #f5a623; color: #000; border-radius: 20px; padding: 6px 14px; font-size: 0.8rem; font-weight: 600;">100% Main Character</span>\n  </div>\n  <div style="color: #aaa; font-style: italic; font-size: 0.9rem;">"You cry to 80s beats while pretending you\'re absolutely fine."</div>\n</div>\n```\n\nএই section-টার screenshot নিয়ে আপনার group chat-এ পাঠিয়ে দিন।',
              },
            ],
          },
        },
        {
          title: "Recommendation নিন",
          description:
            "শেষটা জোরালো করুন। Claude-কে জিজ্ঞেস করুন কোন গানগুলো আপনার playlist-এর vibe-এর সঙ্গে একদম মিলে যাবে। এখানেই এটা সত্যিই কাজে লাগে: যোগ করার মতো গানের একটা আসল list নিয়ে আপনি ফিরবেন।",
          code: {
            snippet: `এই playlist-এর vibe (feel-good confidence, synthpop-ঘেঁষা, high energy, ভেতরে একটা nostalgic টান) দেখে আমাকে পাঁচটা গান recommend করুন। এমন গান, যেগুলো হয়তো আমার list-এ নেই কিন্তু একদম মিলে যাবে। প্রতিটা কেন মেলে, সেটাও বলুন।`,
            language: "text",
          },
          demo: {
            title: "আপনার vibe-এর সঙ্গে মেলানো recommendation",
            steps: [
              {
                type: "cmd",
                text: 'claude "এই playlist-এর vibe-এর সঙ্গে মেলে এমন পাঁচটা গান recommend করুন। প্রতিটা কেন মেলে, বলুন।"',
              },
              {
                type: "out",
                text: "Matching recommendations to vibe profile...",
                delay: 600,
              },
              { type: "out", text: "" },
              { type: "out", text: "1. Midnight Rain - Taylor Swift" },
              {
                type: "out",
                text: "   Synthpop production, nostalgic tone, arc-এর সঙ্গে একদম মিলে যায়",
              },
              { type: "out", text: "" },
              { type: "out", text: "2. Don't Start Now - Dua Lipa" },
              {
                type: "out",
                text: "   Disco-র ছাপওয়ালা uptempo, একই রকম confident energy",
              },
              { type: "out", text: "" },
              { type: "out", text: "3. Save Your Tears - The Weeknd" },
              {
                type: "out",
                text: "   ৮০-এর দশকের synthwave, আপনার আগের Weeknd গানটার সঙ্গে জোড়া লাগায়",
              },
              { type: "out", text: "" },
              { type: "out", text: "4. Heat Waves - Glass Animals" },
              {
                type: "out",
                text: "   উষ্ণ indie-pop, flow-এর মাঝে midtempo-র দারুণ একটা break",
              },
              { type: "out", text: "" },
              { type: "out", text: "5. Electricity - Silk City ft. Dua Lipa" },
              {
                type: "out",
                text: "   পুরোপুরি euphoric energy, vibe-এর loop-টা পূর্ণ করে",
              },
              {
                type: "success",
                text: "হয়ে গেল। আপনার playlist-এ যোগ হলো আরও পাঁচটা ভালো গান।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আপনি এইমাত্র যে vibe analyze করলেন (feel-good confidence, synthpop-ঘেঁষা, high energy, ভেতরে একটা nostalgic টান), সেটা দেখে পাঁচটা গান recommend করুন। এমন গান, যেগুলো হয়তো আমার list-এ নেই। প্রতিটা কেন মেলে, বলুন।",
              },
              {
                role: "claude",
                text: "এই নিন পাঁচটা গান, যেগুলো আপনার playlist-এ একদম মানিয়ে যাবে:\n\n১. Midnight Rain by Taylor Swift: এর synthpop production, আর nostalgia বনাম এখনকার সময়ের টানাপোড়েন আপনার playlist-এর emotional সুতোর সঙ্গে মেলে। Anti-Hero-র পরে একদম ঠিক বসবে।\n\n২. Don't Start Now by Dua Lipa: Disco-র ছাপওয়ালা uptempo energy, Levitating-এর মতোই confident, কোনো কিছু গায়ে না লাগানো tone। খুব স্বাভাবিক জুটি।\n\n৩. Save Your Tears by The Weeknd: ৮০-এর দশকের synthwave, lyrics-এর মানে একটু ধোঁয়াশা, আপনার আগের Weeknd গানটার সঙ্গে জোড়া লাগায়, কিন্তু repeat করে না।\n\n৪. Heat Waves by Glass Animals: উষ্ণ indie-pop। আপনার playlist-কে midtempo-তে একটু দম নেওয়ার সুযোগ দেয়, সঙ্গে সত্যিকারের emotional ওজন। অনেকটা Golden Hour যা করে তেমন, তবে আরও গতি নিয়ে।\n\n৫. Electricity by Silk City feat. Dua Lipa: পুরোপুরি euphoric house energy। Workout-এর শেষে বা রাতে বাইরে থাকার সময় একটা peak-energy মুহূর্ত চাইলে, এটাই সেই গান।\n\nএর যেকোনোটা Spotify-তে যোগ করুন, আপনার playlist-এর vibe আরও পরিষ্কার হয়ে উঠবে।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "৫ মিনিটে আপনার প্রথম CLAUDE.md বানান",
        href: "/tutorials/your-first-claude-md",
      },
    },
  },

  "ship-a-landing-page": {
    sourceHash: "3d6d8fab20b02711",
    translatedAt: "2026-10-06",
    content: {
      title: "৩০ মিনিটে একটা Landing Page live করুন",
      slug: "ship-a-landing-page",
      availableRoutes: ["app", "terminal", "ide"],
      duration: "৩০ মিনিট",
      difficulty: "beginner",
      description:
        "খালি folder থেকে শুরু করে internet-এ একটা live website পর্যন্ত। কোনো coding experience লাগবে না।",
      intro:
        "HTML জানার দরকার নেই। CSS জানার দরকার নেই। কোনো framework-ও লাগবে না। শুধু Claude Code আর একটা idea থাকলেই হবে। ৩০ মিনিটের মধ্যে internet-এ আপনার একটা real website live থাকবে। চলুন বানাই।",
      steps: [
        {
          title: "নতুন একটা folder বানান",
          description:
            "একদম নতুন করে শুরু করুন। আপনার project-এর জন্য একটা নতুন folder বানান। এটাই হবে আপনার portfolio site।",
          code: {
            snippet: "mkdir my-site && cd my-site",
            language: "bash",
          },
          demo: {
            title: "নতুন শুরু",
            steps: [
              { type: "cmd", text: "mkdir my-site && cd my-site" },
              { type: "cmd", text: "ls -la", delay: 400 },
              { type: "out", text: "total 0" },
              {
                type: "out",
                text: "drwxr-xr-x  2 you  staff  64 Mar 29 10:00 .",
              },
              { type: "success", text: "খালি folder। শুরু করার জন্য একদম ঠিক।" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "আমি একটা personal portfolio site চাই। এই folder-এ কী আছে?" },
              { kind: "tool", name: "Bash", arg: "ls -la", result: "total 0" },
              { kind: "say", text: "Folder খালি, তাই একদম পরিষ্কারভাবে শুরু করা যাবে। আমাকে বলুন:\n১. আপনার নাম আর tagline\n২. কোন কোন section চান\n৩. Style: dark, minimal, নাকি bold" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি একটা personal portfolio landing page বানাতে চাই। আপনার আমার কাছ থেকে কী কী information লাগবে?",
              },
              {
                role: "claude",
                text: "আপনি শুধু বলুন কী চান, পুরো HTML, CSS আর JS আমি বানিয়ে দেব।\n\nআমাকে বলুন:\n১. আপনার নাম আর tagline\n২. কোন কোন section চান (about, projects, contact?)\n৩. Style নিয়ে কোনো preference: dark mode, minimal, bold, এরকম কিছু",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "এই খালি folder-এ একটা নতুন portfolio landing page project বানান।",
              },
              {
                role: "claude",
                text: "ঠিক আছে। একদম শুরু থেকে করছি। এই folder-এ `index.html`, `styles.css` আর `script.js` বানাব।\n\nছোট একটা প্রশ্ন: hero section-এ কোনো নাম বা tagline দিতে চান, নাকি placeholder দিয়ে রাখব, পরে আপনি বসিয়ে নেবেন?",
              },
            ],
          },
        },
        {
          title: "Claude Code চালু করুন",
          description:
            "শুধু claude লিখুন। এটুকুই। এখন আপনি এমন একটা AI-এর সঙ্গে কথা বলছেন, যেটা file বানাতে পারে, command চালাতে পারে, আর জিনিস বানিয়ে দিতে পারে।",
          code: {
            snippet: "claude",
            language: "bash",
          },
          demo: {
            title: "Claude Code চালু হয়ে গেছে",
            steps: [
              { type: "cmd", text: "claude" },
              { type: "out", text: "", delay: 400 },
              { type: "success", text: "Claude Code v1.0" },
              { type: "out", text: "Working directory: ~/my-site" },
              { type: "out", text: "No CLAUDE.md found (আপাতত এতে সমস্যা নেই)" },
              { type: "out", text: "" },
              { type: "warn", text: "নিচে আপনার প্রথম prompt লিখুন।" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "আমি Alex Rivera, UX designer। Dark আর minimal চাই: hero, তিনটা project card, আর contact" },
              { kind: "thinking", verb: "Planning", ms: 1000 },
              { kind: "say", text: "Plan এরকম, এই folder-এ তিনটা file:\n- index.html: page-এর structure\n- styles.css: dark theme আর card grid\n- script.js: smooth scroll আর contact form\n\nআর কিছু চাইলে বলুন, তারপর আমি file-গুলো লিখে ফেলব।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমার নাম Alex Rivera। আমি UX designer। আমি একটা dark portfolio চাই। একটা hero থাকবে, তিনটা card-এর projects grid, আর একটা contact section। Minimal আর clean।",
              },
              {
                role: "claude",
                text: "এই নিন আপনার পুরো portfolio। তিনটা file save করতে হবে:\n\n📄 `index.html`: পুরো page-এর structure\n🎨 `styles.css`: dark theme, card grid, hover effect\n⚡ `script.js`: smooth scroll, form handling\n\nনিচে প্রতিটা file দিচ্ছি। Copy করে একই folder-এ save করুন, তারপর browser-এ `index.html` খুলুন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "এখনই portfolio-টা বানান। আমার নাম Alex Rivera, আমি UX designer। Dark minimal look চাই, hero + projects grid + contact।",
              },
              {
                role: "claude",
                text: "তিনটা file বানাচ্ছি...\n\n✓ `index.html` বানানো হয়েছে\n✓ `styles.css` বানানো হয়েছে (dark theme, card grid)\n✓ `script.js` বানানো হয়েছে (smooth scroll + form)\n\nPreview দেখতে browser-এ `index.html` খুলুন, অথবা চাইলে আমি একটা local dev server চালু করে দিতে পারি।",
              },
            ],
          },
        },
        {
          title: "আপনি কী চান, বলুন",
          description:
            "এবার মজার অংশ। Claude-কে সহজ ভাষায় বলুন আপনি কী চান। কোন কোন section আর কেমন style, সেটা নির্দিষ্ট করে বলুন। Code-এর দিকটা Claude নিজেই সামলে নেবে।",
          code: {
            snippet: `একটা personal portfolio-র জন্য সুন্দর একটা landing page বানান:
- Default-এ dark mode
- Hero section-এ আমার নাম আর একটা tagline
- About me section-এ ছোট একটা bio
- Projects grid-এ তিনটা placeholder project
- Email আর message field সহ একটা contact form
- Responsive design, যেন mobile-এও ঠিকঠাক চলে
- Modern, clean look, সঙ্গে হালকা কিছু animation`,
            language: "text",
          },
          demo: {
            title: "Claude আপনার site বানাচ্ছে",
            steps: [
              {
                type: "cmd",
                text: '"একটা personal portfolio-র জন্য সুন্দর একটা landing page বানান..."',
              },
              { type: "out", text: "Planning the page structure...", delay: 600 },
              {
                type: "out",
                text: "Designing: hero, about, projects, contact sections",
              },
              { type: "out", text: "" },
              { type: "success", text: "Creating index.html..." },
              {
                type: "out",
                text: "  Hero: gradient background, animation সহ entrance",
              },
              {
                type: "out",
                text: "  About: avatar placeholder সহ two-column layout",
              },
              {
                type: "out",
                text: "  Projects: hover effect সহ responsive card grid",
              },
              { type: "out", text: "  Contact: validation সহ styled form" },
              { type: "success", text: "Created index.html (287 lines)" },
              { type: "success", text: "Created styles.css (194 lines)" },
              {
                type: "success",
                text: "Created script.js (42 lines : form handling + animations)",
              },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "বানিয়ে ফেলুন: default-এ dark, hero, about, তিনটা project, contact form, responsive, হালকা animation" },
              { kind: "thinking", verb: "Designing", ms: 900 },
              {
                kind: "tool",
                name: "Write",
                arg: "index.html",
                result: "Wrote 287 lines to index.html",
                lines: [
                  "<!DOCTYPE html>",
                  "<html lang=\"en\">",
                  "<head>",
                  "  <meta charset=\"UTF-8\">",
                  "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
                  "  <title>Alex Rivera · UX Designer</title>",
                  "  <link rel=\"stylesheet\" href=\"styles.css\">",
                  "</head>",
                ],
              },
              { kind: "tool", name: "Write", arg: "styles.css", result: "Wrote 194 lines to styles.css" },
              { kind: "tool", name: "Write", arg: "script.js", result: "Wrote 42 lines to script.js" },
              { kind: "say", text: "হয়ে গেছে: একটা hero, একটা about section, তিনটা card-এর project grid, আর validation সহ একটা contact form।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Hero-র font-টা খুব পাতলা লাগছে। একটু bold করুন, আর tagline-এর font size বাড়ান।",
              },
              {
                role: "claude",
                text: "CSS update করেছি। আপনার `styles.css`-এ এই change-টা করুন:\n\n```css\n.hero h1 {\n  font-weight: 700;  /* আগে ছিল 400 */\n  font-size: clamp(2.5rem, 6vw, 5rem);  /* আগে ছিল 3rem */\n}\n.hero .tagline {\n  font-size: 1.25rem;  /* আগে ছিল 1rem */\n}\n```\n\nশুধু এই selector-গুলো খুঁজে value-গুলো বদলে দিন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Hero-র font-টা খুব পাতলা লাগছে। একটু bold করুন, আর tagline-টা বড় করুন।",
              },
              {
                role: "claude",
                text: "`styles.css` update করেছি। `font-weight` 700 করেছি, আর tagline বাড়িয়ে `1.25rem` করেছি। Change দেখতে browser refresh করুন।",
              },
            ],
          },
        },
        {
          title: "Claude-কে file বানাতে দেখুন",
          description:
            "Claude একটা HTML file, একটা CSS file, আর হয়তো ছোট একটা JavaScript file বানাবে। প্রতিটা file তৈরি হওয়া আপনি সঙ্গে সঙ্গে দেখতে পাবেন। Code বোঝা নিয়ে চিন্তা করবেন না, যেকোনো অংশ Claude-কে explain করতে বলতে পারেন।",
          demo: {
            title: "File তৈরি হয়ে গেছে",
            steps: [
              { type: "cmd", text: "ls -la" },
              {
                type: "out",
                text: "index.html   : আপনার পুরো landing page",
                delay: 300,
              },
              { type: "out", text: "styles.css   : সব visual styling" },
              {
                type: "out",
                text: "script.js    : smooth scroll + form handling",
              },
              { type: "out", text: "" },
              { type: "success", text: "তিনটা file। এটাই আপনার পুরো website।" },
              { type: "warn", text: "চলুন browser-এ দেখি।" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "আপনি এইমাত্র কী কী বানালেন?" },
              { kind: "tool", name: "Bash", arg: "ls", result: "index.html  script.js  styles.css" },
              { kind: "say", text: "তিনটা file, আর এটাই আপনার পুরো website:\n- index.html: page নিজে\n- styles.css: সব visual styling\n- script.js: smooth scroll আর form handling\n\nএরপর browser-এ খুলে দেখুন।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "claude",
                text: "এখন আপনার কাছে তিনটা file আছে। Preview দেখতে `index.html` টেনে Chrome-এ ছেড়ে দিন, অথবা Finder/File Explorer-এ double-click করুন।\n\nInternet-এ তুলতে চান? Vercel-এ deploy করার পুরো process আমি দেখিয়ে দেব। এটা free, আর ২ মিনিট লাগে।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "claude",
                text: "File-গুলো আপনার workspace-এ আছে। Hot reload সহ preview দেখার জন্য একটা local dev server চালু করে দেব?\n\nচালান: `npx serve .`, অথবা আমি একটা ঠিকঠাক live-reload environment setup করে দিতে পারি।",
              },
            ],
          },
        },
        {
          title: "Browser-এ খুলুন",
          description:
            "এবার আসল মুহূর্ত। HTML file-টা সরাসরি browser-এ খুলুন, অথবা পুরো experience-এর জন্য একটা quick local server চালান।",
          code: {
            snippet: `# Option 1: সরাসরি খুলুন
open index.html

# Option 2: একটা local server চালান (recommended)
npx serve .`,
            language: "bash",
          },
          demo: {
            title: "আপনার site এখন local-এ চলছে",
            steps: [
              { type: "cmd", text: "npx serve ." },
              { type: "out", text: "", delay: 600 },
              { type: "out", text: "  Serving!" },
              { type: "out", text: "" },
              { type: "success", text: "  Local:    http://localhost:3000" },
              { type: "success", text: "  Network:  http://192.168.1.42:3000" },
              { type: "out", text: "" },
              {
                type: "warn",
                text: "ওই URL-টা খুলুন। আপনার portfolio ওখানেই আছে।",
              },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "একটা local server চালু করুন, আমি preview দেখব" },
              { kind: "tool", name: "Bash", arg: "npx serve .", result: "Serving! Local: http://localhost:3000" },
              { kind: "say", text: "আপনার site চলছে http://localhost:3000-এ।\nখুলে দেখুন, আর কী বদলাতে চান আমাকে বলুন।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আপনি যে file-গুলো দিলেন, সেগুলোর preview কীভাবে দেখব?",
              },
              {
                role: "claude",
                text: "দুটো option:\n\n১. **সবচেয়ে দ্রুত**: তিনটা file একটা folder-এ save করুন, তারপর `index.html` টেনে Chrome/Safari-তে ছেড়ে দিন। সঙ্গে সঙ্গে খুলে যাবে, কোনো server লাগবে না।\n\n২. **ভালো preview**: Terminal খুলুন, ওই folder-এ যান, আর `npx serve .` চালান। এতে ঠিকঠাক URL handling সহ একটা local server চালু হবে।\n\nদেখতে পেলে ফিরে এসে বলুন কী বদলাতে চান।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "claude",
                text: "আপনার file-গুলো তৈরি। Preview দেখতে:\n\n```bash\nnpx serve .\n```\n\nঅথবা আমি সরাসরি খুলে দিতে পারি, শুধু বলুন। Browser-এ দেখার পর বলুন কী কী ঠিক করতে হবে। এখনই server চালিয়ে দেব?",
              },
            ],
          },
        },
        {
          title: "Vercel-এ deploy করুন (optional)",
          description:
            "Real URL সহ আসল internet-এ রাখতে চান? একটাই command। Vercel সঙ্গে সঙ্গে আপনাকে একটা free .vercel.app domain দেবে।",
          code: {
            snippet: "npx vercel",
            language: "bash",
          },
          demo: {
            title: "Internet-এ deploy হচ্ছে",
            steps: [
              { type: "cmd", text: "npx vercel" },
              {
                type: "out",
                text: "Vercel CLI : deploying ~/my-site",
                delay: 500,
              },
              { type: "out", text: "? Set up and deploy? Yes" },
              { type: "out", text: "? Which scope? your-username" },
              { type: "out", text: "? Link to existing project? No" },
              { type: "out", text: "? Project name? my-site" },
              { type: "out", text: "" },
              { type: "out", text: "Uploading [====================] 100%" },
              { type: "success", text: "Deployed to https://my-site.vercel.app" },
              {
                type: "warn",
                text: "এটুকুই। আপনার site live। Link-টা share করুন।",
              },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "এটা Vercel-এ deploy করে দিন" },
              { kind: "thinking", verb: "Deploying", ms: 900 },
              { kind: "tool", name: "Bash", arg: "npx vercel --yes", result: "Production: https://my-site.vercel.app [18s]" },
              { kind: "say", text: "Site live হয়ে গেছে https://my-site.vercel.app-এ, HTTPS সহ।\nLink-টা share করুন।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "দেখতে আমার পছন্দ হয়েছে। এটা internet-এ কীভাবে তুলব?",
              },
              {
                role: "claude",
                text: 'সবচেয়ে সহজ free option: **Vercel**। মোটামুটি ২ মিনিট লাগে।\n\n১. vercel.com-এ যান, GitHub দিয়ে sign up করুন\n২. "Add New Project"-এ click করুন\n৩. আপনার তিনটা file upload করুন (index.html, styles.css, script.js)\n৪. Deploy-এ click করুন\n\nসঙ্গে সঙ্গে একটা free `.vercel.app` URL পাবেন। Share করা যায়, HTTPS আছে, আর সারা দুনিয়ায় দ্রুত চলে।\n\nঅথবা terminal খোলা থাকলে project folder-এ `npx vercel` চালান, তারপর যা যা জিজ্ঞেস করে সেগুলোর উত্তর দিন।',
              },
            ],
          },
          ideDemo: {
            steps: [
              { role: "user", text: "এটা Vercel-এ deploy করুন।" },
              {
                role: "claude",
                text: "এখনই deploy করছি...\n\n```bash\nnpx vercel --yes\n```\n\nএটা setup-এর প্রশ্নগুলোর উত্তর নিজে থেকেই দিয়ে দেবে। ৩০ সেকেন্ড অপেক্ষা করুন।",
              },
              {
                role: "claude",
                text: "হয়ে গেছে। আপনার site live:\n\nhttps://my-site-abc123.vercel.app\n\nLink-টা share করুন। Site এই মুহূর্তে internet-এ live।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "আপনার জন্য কোন Claude interface ঠিক, জেনে নিন",
        href: "/docs/foundations/which-interface",
      },
    },
  },

  "decision-memo": {
    sourceHash: "266699d70ee4f719",
    translatedAt: "2026-10-06",
    content: {
      title: "১৫ মিনিটে যেকোনো decision থেকে একটা পরিষ্কার memo",
      slug: "decision-memo",
      duration: "১৫ মিনিট",
      difficulty: "intermediate",
      availableRoutes: ["app", "ide"],
      description:
        "একটা এলোমেলো decision নিয়ে মাথায় যা আছে সব লিখে ফেলুন। শেষে হাতে পাবেন একটা structured memo: problem, option, recommendation, risk আর next step।",
      intro:
        "বেশিরভাগ decision আটকে যায় চিন্তা ভুল ছিল বলে নয়, চিন্তাটা কখনো পরিষ্কার করে লেখা হয়নি বলে। একটা decision memo আপনার মাথার logic বাইরে এনে এমন একটা রূপ দেয়, যেটা অন্যরা challenge করতে পারে, approve করতে পারে, আর সেই অনুযায়ী কাজ করতে পারে। Structure-এর দায়িত্ব Claude-এর। আপনি শুধু যা জানেন, সেটা brain dump করে ফেলুন।",
      steps: [
        {
          title: "Decision নিয়ে brain dump করুন",
          description:
            "এলোমেলোভাবেই শুরু করুন। যা জানেন সব লিখে ফেলুন: পরিস্থিতি কী, আপনি কোন দিকে ঝুঁকছেন, কোথায় আটকে আছেন। এখনই structure করতে যাবেন না।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমাকে decide করতে হবে, আমাদের authentication system একদম নতুন করে বানাব, নাকি Auth0-তে migrate করব। ৪ বছর ধরে আমরা একটা custom system চালাচ্ছি। এটা দিন দিন fragile হয়ে যাচ্ছে, আর team এটা maintain করতে একদম পছন্দ করে না। আমাদের scale-এ Auth0-র খরচ মাসে ~$২k। Rebuild করতে ৩–৪ মাস লাগবে, আর সম্ভবত আমরা আবার একই ভুলগুলো করব। কিন্তু Auth0 নিলে মনে হয় একটা core system-এর control ছেড়ে দিচ্ছি। ৩ সপ্তাহ পরে board review, তার আগেই decision লাগবে।",
              },
              {
                role: "claude",
                text: "শুরু করার জন্য ভালো material। মূল টানাপোড়েনটা দেখতে পাচ্ছি: একদিকে খরচ/control, অন্যদিকে maintenance-এর বোঝা + risk।\n\nএটাকে memo-তে সাজানোর আগে দুটো ছোট প্রশ্ন, যেগুলোর ওপর recommendation নির্ভর করবে:\n১. Custom system maintain করতে এখন কত খরচ হচ্ছে? (Engineering time, incident, on-call-এর চাপ)\n২. Compliance বা data residency নিয়ে এমন কোনো requirement আছে কি, যেটা Auth0-র পথে বাধা হতে পারে?\n\nএই সংখ্যাগুলো হাতে না থাকলে memo-তে আমি এগুলোকে assumption হিসেবে mark করে দেব। তবে financial case-টা মূলত এগুলোর ওপরই দাঁড়িয়ে।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Auth system নিয়ে একটা decision memo লাগবে: একদম নতুন করে rebuild, নাকি Auth0-তে migrate। Custom system-টা ৪ বছরের পুরনো, fragile, team এটা পছন্দ করে না। Auth0-র খরচ মাসে ~$২k। Rebuild মানে ৩-৪ মাস, risk একই। ৩ সপ্তাহ পরে board review।",
              },
              {
                role: "claude",
                text: "Structure করার মতো যথেষ্ট তথ্য পেয়েছি। মূল টানাপোড়েন হলো control/খরচ বনাম maintenance-এর বোঝা। Memo-তে থাকবে: problem statement, তিনটা option (rebuild, Auth0, hybrid), tradeoff, আর একটা recommendation।\n\nএকটা financial comparison রাখব, নাকি আপাতত qualitative রাখব?",
              },
            ],
          },
        },
        {
          title: "Problem statement ঠিক করুন",
          description:
            "Claude আপনার brain dump থেকে এক paragraph-এর একটা ধারালো problem statement বানাবে। যেকোনো memo-র সবচেয়ে জরুরি অংশ এটাই।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "কোনো compliance constraint নেই। ওদিক থেকে Auth0 ঠিক আছে। এখনকার maintenance খরচ মাপা কঠিন। তবে incident আর debt-এর কাজ মিলিয়ে সম্ভবত একজন senior engineer-এর ১৫–২০% সময় এতে যায়।",
              },
              {
                role: "claude",
                text: "ভালো। এই নিন ধারালো problem statement:\n\n---\n**Problem Statement**\nচার বছর আগে in-house বানানো আমাদের authentication system-এ অনেক technical debt জমে গেছে, আর এখন maintenance ও incident response-এ একজন senior engineer-এর আনুমানিক ১৫–২০% capacity চলে যাচ্ছে। Scale বাড়ার সঙ্গে এই বোঝা আরও বাড়বে। আমাদের decide করতে হবে rebuild-এ invest করব, managed solution (Auth0)-এ migrate করব, নাকি একটা hybrid পথ খুঁজব। Decision-টা নিতে হবে তিন সপ্তাহ পরের board review-এর আগেই।\n\n**Decision owner**: [আপনি]\n**Deadline**: [Board review-এর তারিখ]\n**Stakeholders**: Engineering, Product, Finance\n---\n\nএতে কি পুরোটা ধরা পড়েছে? Option-এ যাওয়ার আগে framing বদলাতে চাইলে বলুন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              { role: "user", text: "Problem statement-টা draft করুন।" },
              {
                role: "claude",
                text: "**Problem Statement**\nIn-house auth system (২০২১-এ বানানো)-এ অনেক technical debt জমেছে, আর maintenance ও incident-এ একজন senior engineer-এর ~১৫–২০% capacity চলে যায়। Scale বাড়লে এই বোঝাও বাড়ে। তিন সপ্তাহ পরের board review-এর আগে rebuild, managed migration (Auth0), নাকি hybrid, সেই decision নিতে হবে।\n\n**Decision owner**: [আপনি] | **Stakeholders**: Eng, Product, Finance\n\nএবার option বানানো যায়।",
              },
            ],
          },
        },
        {
          title: "Tradeoff সহ option বানান",
          description:
            "ভালো decision memo কখনো একটা মাত্র option দেখায় না। Claude তিনটা পথ বানাবে, আর প্রতিটার honest tradeoff সামনে রাখবে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এবার honest tradeoff সহ options section-টা বানান।",
              },
              {
                role: "claude",
                text: "**Options**\n\n**Option A: Auth0-তে migrate**\n→ খরচ: মাসে ~$২,০০০ (বছরে ~$২৪k)\n→ Timeline: ৬–৮ সপ্তাহের migration\n→ Pros: সঙ্গে সঙ্গে maintenance-এর বোঝা চলে যায়, MFA, SSO, SOC2 compliance আগে থেকেই থাকে, engineer-এর সময় free হয়\n→ Cons: চলমান খরচ, vendor-এর ওপর নির্ভরতা, customisation-এ কিছু limit\n→ Risk: Migration bug; phased rollout দিয়ে কমানো যায়\n\n**Option B: পুরোটা in-house rebuild**\n→ খরচ: ১–২ জন engineer-এর ৩–৪ মাস (market rate-এ engineering time-এ ~$৮০–১২০k)\n→ Timeline: সবচেয়ে আগে হলেও Q3\n→ Pros: পুরো control, vendor খরচ নেই, আপনার spec মতো বানানো\n→ Cons: Opportunity cost অনেক বেশি, আবার debt জমার একই risk, এবার ভালো হবে এমন কোনো guarantee নেই\n→ Risk: Scope creep, timeline পিছিয়ে যাওয়া, team আবার একই ভুল করে বসে\n\n**Option C: ধাপে ধাপে hardening (নতুন কিছু না করা)**\n→ খরচ: এখনকার মতোই ~১৫–২০% engineering time, চলতেই থাকবে\n→ Timeline: N/A\n→ Pros: Migration risk নেই, শুরুতে কোনো খরচ নেই\n→ Cons: সমস্যা জমতেই থাকে; scale বাড়লে incident বাড়বে\n→ Risk: Production-এ auth incident, তিনটা option-এর মধ্যে সবচেয়ে বড় tail risk",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Honest tradeoff সহ তিনটা option বানান।",
              },
              {
                role: "claude",
                text: "**Option A: Auth0-তে migrate**: বছরে $২৪k, ৬–৮ সপ্তাহের migration, সঙ্গে সঙ্গে debt শেষ। Tradeoff হলো vendor-এর ওপর নির্ভরতা।\n\n**Option B: পুরো rebuild**: ~$৮০–১২০k engineering time, ৩–৪ মাস, পুরো control। Opportunity cost বেশি, আবার debt জমার একই risk।\n\n**Option C: যেমন আছে তেমন (ধাপে ধাপে hardening)**: এখনকার ~১৫–২০% engineering খরচ, migration risk নেই, কিন্তু scale বাড়লে সমস্যাও বাড়ে। সবচেয়ে বড় tail risk (auth incident)।\n\nRecommendation লিখব?",
              },
            ],
          },
        },
        {
          title: "Recommendation লিখুন",
          description:
            'Memo-তে লাগবে rationale সহ একটা পরিষ্কার recommendation, "পরিস্থিতির ওপর নির্ভর করে" টাইপের উত্তর নয়। Option-গুলো দেখে Claude একটা call নেবে।',
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Recommendation-টা লিখুন। আমি Auth0-র দিকে ঝুঁকছি, কিন্তু ১০০% sure না।",
              },
              {
                role: "claude",
                text: "**Recommendation: Option A: Auth0-তে migrate**\n\nবছরে $২৪k খরচে Auth0 মোটামুটি একটা পুরো rebuild-এর শুধু engineering time-এর খরচের ২০–৩০%, আর result দেয় এখনই, চার মাস পরে নয়। Rebuild-এর মূল আকর্ষণ (control) অনেকটাই কাগজে-কলমে: গতবার আমরা ভালো system বানাতে পারিনি, আর এবার পারব এমন কোনো structural কারণ নেই।\n\nUser volume বাড়ার সঙ্গে maintenance-এর বোঝা শুধু বাড়বেই। Scale-এ একটা auth incident পুরো company-র জন্য risk। মাসে $২k দিয়ে সেই risk সরানো আর একজন senior engineer-এর সময় free করা সোজা হিসাবেই ভালো economics।\n\nMigration-এ risk শূন্য নয়। Rollout bug-ই মূল চিন্তা, তবে phased migration (তিন সপ্তাহে traffic-এর ৫% → ২০% → ১০০%) দিয়ে সেই exposure ভালোভাবে সামলানো যায়।\n\n**Recommended path**: Auth0 migration approve করুন। একজন lead engineer assign করুন। Approval-এর দুই সপ্তাহের মধ্যে phased rollout শুরু করুন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Recommendation লিখুন। Auth0-র দিকে রাখুন।",
              },
              {
                role: "claude",
                text: "**Recommendation: Auth0-তে migrate (Option A)**\n\nবছরে $২৪k-তে Auth0-র খরচ শুধু engineering time ধরলেই rebuild-এর ২০–৩০%, আর result দেয় এখনই, Q3-তে নয়। Rebuild-এর মূল আকর্ষণ (control) অনেকটাই কাগজে-কলমে; গতবার আমরা ভালো system বানাতে পারিনি।\n\nScale বাড়লে maintenance-এর বোঝাও বাড়ে। একটা auth incident পুরো company-র জন্য risk। মাসে $২k দিয়ে সেটা সরানো আর একজন senior engineer-এর সময় free করা ভালো economics।\n\n**Path**: Migration approve, lead assign, risk সামলাতে phased rollout (৩ সপ্তাহে ৫→২০→১০০%)।",
              },
            ],
          },
        },
        {
          title: "Risk যোগ করুন, sign-off-এর জন্য ready করুন",
          description:
            "প্রতিটা memo-তে একটা risk register আর একটা পরিষ্কার ask লাগে। Claude শেষ করবে risk, mitigation, আর ঠিক কোন decision আপনার দরকার, সেটা দিয়ে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "একটা risk register আর একটা sign-off section যোগ করুন।",
              },
              {
                role: "claude",
                text: "**Risks & Mitigations**\n\n| Risk | Likelihood | Impact | Mitigation |\n|---|---|---|---|\n| Migration bug-এর কারণে auth fail করে | Medium | High | Phased rollout; revert করার জন্য feature flag |\n| Auth0 অনেক দাম বাড়িয়ে দেয় | Low | Medium | Annual contract lock-in; renewal-এর সময় review |\n| Team auth system-এর knowledge হারিয়ে ফেলে | Low | Low | Migration-এর আগে internal docs; বড় risk নয় |\n| Auth0 outage-এ আমাদের availability-তে প্রভাব পড়ে | Low | High | Auth0-র SLA ৯৯.৯৯%; এখনকার system-এর কোনো SLA নেই |\n\n---\n\n**Decision Required**\n\nমাসে ~$২,০০০-এ Auth0 migration approve করা।\n\n**Decision owner**: [আপনার নাম]\n**Needed by**: [Board review-এর ৩ দিন আগে]\n**Approve হলে**: Engineering সঙ্গে সঙ্গে migration planning শুরু করবে\n**Approve না হলে**: Option B-এর scope আবার দেখতে একটা working session রাখা হবে\n\n---\n\nMemo পাঠানোর জন্য ready। শুরুতে এক paragraph-এর একটা executive summary লিখে দেব?",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Risk, mitigation আর sign-off section যোগ করুন।",
              },
              {
                role: "claude",
                text: "**Risks**\n• Migration bug → phased rollout + revert flag (likelihood Medium, mitigated)\n• Auth0-র দাম বাড়া → annual contract (Low, mitigated)\n• Auth0 outage → ৯৯.৯৯% SLA, এখনকার চেয়ে ভালো (Low)\n\n**Decision Required**\nমাসে ~$২k-এ Auth0 migration approve করা।\nDecision owner: [আপনি] | Needed by: [তারিখ]\n\nMemo ready। শুরুতে একটা exec summary paragraph চান?",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "আপনার project-এর জন্য একটা stakeholder map বানান",
        href: "/tutorials/stakeholder-map",
      },
    },
  },

  "competitive-analysis": {
    sourceHash: "2f0e5146f66a5705",
    translatedAt: "2026-10-06",
    content: {
      title: "৩০ মিনিটে একটা Competitive Analysis করুন",
      slug: "competitive-analysis",
      duration: "৩০ মিনিট",
      difficulty: "intermediate",
      availableRoutes: ["app", "ide"],
      description:
        "Claude-কে আপনার product আর competitor-দের তথ্য দিন। শেষে পাবেন একটা structured comparison matrix, আর positioning-এ কোথায় gap আছে তার পরিষ্কার ছবি।",
      intro:
        "বেশিরভাগ competitive analysis হয় ৪০টা tab-এর একটা Notion page, যেটা কেউ আর update করে না, নয়তো শুধু feeling থেকে বলা একটা কথা: \"আমরা আলাদা, কারণ আমরা customer-এ focus করি।\" এর কোনোটাই decision নিতে সাহায্য করে না। কাজের competitive analysis হয় specific আর structured, আর সেটা বলে দেয় আপনি কোথায় জিততে পারেন, শুধু market-এ আর কে কে আছে তা নয়। চলুন একটা বানাই।",
      steps: [
        {
          title: "কী compare করছেন আর কেন, ঠিক করুন",
          description:
            "Analysis কতটা কাজে লাগবে, তা নির্ভর করে এর scope-এর ওপর। শুরুতে Claude-কে বলুন আপনার product কী, কোন decision নিতে চাইছেন, আর relevant competitor কারা।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমার একটা competitive analysis লাগবে। আমি agency-দের জন্য একটা B2B project management tool-এর PM। আমরা বুঝতে চাই native time tracking বানাব, নাকি project management-এই focus রাখব। মূল competitor: Asana, Monday.com, ClickUp, আর Teamwork (ওদের time tracking built-in আছে)।",
              },
              {
                role: "claude",
                text: "ভালো framing। এটা শুধু market-এ কে কে আছে তার survey না, এটা build বনাম differentiate-এর প্রশ্ন। তাতে analysis অনেক বেশি কাজের হবে।\n\nঠিকভাবে করতে আমার দুটো জিনিস লাগবে:\n১. আপনার product-এর ছোট একটা description (আপনারা কীসের জন্য পরিচিত, typical customer কে, এখনকার positioning কী)\n২. প্রতিটা competitor-এর time tracking নিয়ে আপনি যা জানেন (rough notes হলেও চলবে: কোন pricing tier-এ আছে, কীভাবে position করা, কোনো feedback শুনেছেন কি না)\n\nCompetitor-এর details না থাকলে আমি general knowledge থেকে কাজ করতে পারি, ভুল থাকলে আপনি ঠিক করে দেবেন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Agency-দের জন্য একটা B2B project management tool-এর competitive analysis। Decision: native time tracking বানাব, নাকি focus ধরে রাখব? Competitor: Asana, Monday.com, ClickUp, Teamwork (ওদের time tracking আছে)।",
              },
              {
                role: "claude",
                text: "বুঝেছি। আপনার product আর প্রতিটা competitor নিয়ে যা জানেন paste করুন, অথবা আমি general knowledge থেকে শুরু করি, gap-গুলো আপনি ঠিক করে দেবেন। এই decision-এর জন্য কোন dimension সবচেয়ে জরুরি: feature depth, pricing, target customer, নাকি positioning?",
              },
            ],
          },
        },
        {
          title: "আপনার product আর competitor-দের কথা বলুন",
          description:
            "Claude-কে raw material দিন: আপনার positioning, pricing, আর competitor-দের নিয়ে যা জানেন। এলোমেলো হলেও সমস্যা নেই।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমাদের product: creative agency-দের জন্য project management। Client portal আর approval workflow-এ আমরা strong, এটাই আমাদের differentiator। Mid-market, প্রতি user মাসে $২৫–৫০। এখন কোনো time tracking নেই। Asana: general purpose, native time tracking নেই (শুধু integration)। Monday: column type হিসেবে basic time tracking আছে, agency-focused না। ClickUp: time tracking আছে, feature-এ ঠাসা, non-technical user-দের কাছে confusing। Teamwork: specifically agency-দের জন্য, full time tracking আছে, invoicing-এও strong।",
              },
              {
                role: "claude",
                text: "ছবিটা পরিষ্কার। Matrix বানানোর আগে কয়েকটা জিনিস চোখে পড়ছে:\n\n• Teamwork-এর সঙ্গেই আপনার overlap সবচেয়ে বেশি। একই ICP (agency), time tracking আছে, invoicing আছে। আপনি যেখানে আছেন সেখানেই থেকে গেলে এরাই মূল competitive threat।\n• ClickUp-এ time tracking আছে, কিন্তু ওরা নিজেদের \"everything tool\" হিসেবে position করে। ওদের complexity-ই আপনার সুযোগ।\n• আপনার moat (client portal + approval) Teamwork বা ClickUp কেউই ভালো করে না।\n\nRecommendation এই framing থেকেই আসবে। এখন matrix বানাচ্ছি।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "আমাদের product: creative agency-দের জন্য project mgmt। Differentiator: client portal + approval workflow। প্রতি user $২৫-৫০। Time tracking নেই। Asana: native time tracking নেই। Monday: basic time tracking column। ClickUp: time tracking আছে, feature-এ ঠাসা, confusing। Teamwork: agency-focused, full time tracking + invoicing।",
              },
              {
                role: "claude",
                text: "মূল signal: ICP (agency) আর time tracking, দুটোতেই direct competitor শুধু Teamwork। ClickUp-এর feature আছে, কিন্তু positioning নেই। আপনার moat (client portal)-এর জায়গাটা চারটা competitor-এর কেউই ঠিকমতো cover করে না।\n\nএখন comparison matrix বানাচ্ছি, এই dimension-গুলো ধরে: target customer, time tracking depth, client collaboration, pricing, positioning।",
              },
            ],
          },
        },
        {
          title: "Comparison matrix বানান",
          description:
            "আপনার decision-এর জন্য যে dimension-গুলো জরুরি, সেগুলো ধরে Claude পাশাপাশি একটা structured তুলনা বানায়।",
          appDemo: {
            steps: [
              { role: "user", text: "Comparison matrix-টা বানান।" },
              {
                role: "claude",
                text: "| Dimension | আপনার Product | Asana | Monday.com | ClickUp | Teamwork |\n|---|---|---|---|---|---|\n| **Target ICP** | Creative agency | General B2B | General B2B | SMB/General | Agency |\n| **Time Tracking** | ❌ নেই | ❌ শুধু integration | ⚠️ Basic (column) | ✅ Full, native | ✅ Full + invoicing |\n| **Client Portals** | ✅ Core feature | ❌ | ⚠️ Limited | ❌ | ⚠️ Basic |\n| **Approval Workflows** | ✅ Core feature | ⚠️ Basic | ⚠️ Basic | ⚠️ Basic | ❌ |\n| **Invoicing** | ❌ | ❌ | ❌ | ❌ | ✅ |\n| **Pricing (প্রতি user)** | $২৫–৫০ | $১৩–২৫ | $১২–২৪ | $৭–১৯ | $১৩–১৮ |\n| **Complexity** | Medium | Medium | Medium | High | Medium |\n| **Positioning** | Agency-specific | General | Flexible | Everything | Agency-specific |\n\n**কীভাবে পড়বেন**: ICP-তে আপনি সরাসরি Teamwork-এর সঙ্গে compete করছেন, কিন্তু client collaboration-এ জিতছেন। ClickUp-এর time tracking আছে, কিন্তু clarity-তে পিছিয়ে। Monday/Asana general-purpose, আপনার agency customer-দের জন্য কম relevant।",
              },
            ],
          },
          ideDemo: {
            steps: [
              { role: "user", text: "Comparison matrix-টা বানিয়ে দিন।" },
              {
                role: "claude",
                text: "| | আপনার Product | Asana | Monday | ClickUp | Teamwork |\n|---|---|---|---|---|---|\n| ICP | Agency ✅ | General | General | SMB | Agency ✅ |\n| Time tracking | নেই ❌ | Integration | Basic ⚠️ | Full ✅ | Full+invoicing ✅ |\n| Client portals | Core ✅ | নেই | Limited ⚠️ | নেই | Basic ⚠️ |\n| Approval flows | Core ✅ | Basic | Basic | Basic | নেই ❌ |\n| Invoicing | নেই ❌ | নেই | নেই | নেই | Full ✅ |\n| Price/user | $২৫–৫০ | $১৩–২৫ | $১২–২৪ | $৭–১৯ | $১৩–১৮ |\n\nমূল gap: time tracking + invoicing-এ Teamwork জেতে, client collaboration-এ আপনি জেতেন। ClickUp-এর feature আছে, কিন্তু ICP ভুল। এবার positioning gap বের করা যায়।",
              },
            ],
          },
        },
        {
          title: "Positioning gap বের করুন",
          description:
            "Matrix হলো data। এবার Claude-কে জিজ্ঞেস করুন এর মানে কী: কোথায় আপনি জিততে পারেন, যে জায়গা আর কারও দখলে নেই।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Positioning gap-গুলো কী? আমরা আসলে কোথায় জিততে পারি?",
              },
              {
                role: "claude",
                text: "**Positioning Gaps: কোথায় আপনি জিততে পারেন**\n\n**১. Agency-দের জন্য client-facing PM tool (এই জায়গা পরিষ্কারভাবে কারও দখলে নেই)**\nAsana আর Monday internal tool। Teamwork agency-PM, কিন্তু client-কে সামনে রেখে বানানো নয়। Client-কে কাজের মধ্যে রাখার positioning-এ আপনার client portal + approval workflow-এর combination এই space-এ সবচেয়ে strong। Time tracking যোগ করার চেয়ে এখানে আরও জোর দেওয়া বেশি defensible।\n\n**২. Agency ops-এর জন্য simplicity (ClickUp-এর দুর্বলতা)**\nClickUp-এ time tracking আছে, কিন্তু এর complexity ঠিক সেই non-technical project manager আর account manager-দের দূরে সরিয়ে দেয়, যারা agency operations চালান। Built-in time tracking সহ একটা clean, opinionated tool ClickUp-এর customer নিয়ে নিতে পারে।\n\n**৩. Agency workflow-এর gap হিসেবে time tracking**\nTime tracking যোগ করলে invoicing থেকে আপনি এক ধাপ দূরে। তখন আপনি হবেন ভালো client collaboration সহ Teamwork। এটা একটা legitimate land-and-expand strategy। প্রশ্ন হলো, time tracking আপনার আসল moat থেকে মনোযোগ সরিয়ে দেবে, নাকি সেটারই স্বাভাবিক পরের ধাপ।\n\n**অস্বস্তিকর সত্যি কথা**: যে competitor-এর দিকে নজর রাখতে হবে, সেটা Teamwork। ওদের কাছে আপনার ICP আছে, time tracking আছে, আর ওরা client feature যোগ করছে। আপনি time tracking না বানালে আপনার differentiator এতটা strong হতে হবে যে agency-রা আপনাকেই বেছে নেবে, আর আলাদা একটা time tracker integrate করে নেবে।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Positioning gap-গুলো বের করুন। আমরা আসলে কোথায় জিততে পারি?",
              },
              {
                role: "claude",
                text: "**কোথায় আপনি জিততে পারেন:**\n\n১. **Client-forward agency PM**: এই জায়গা পরিষ্কারভাবে কারও দখলে নেই। Client-কে কাজের মধ্যে রাখার গল্পে আপনার portal + approval এই space-এ সবচেয়ে strong। সবচেয়ে defensible position।\n\n২. **Agency-দের জন্য ClickUp-এর উল্টো**: ClickUp-এর feature আছে, কিন্তু non-technical agency ops-এর মানুষদের কাছে complexity একটা বোঝা। এখানে clean + opinionated জেতে।\n\n৩. **পরের স্বাভাবিক ধাপ হিসেবে time tracking**: এটা বানালে invoicing থেকে আপনি এক ধাপ দূরে, তখন আপনি ভালো client collab সহ Teamwork। এটা সত্যিকারের land-and-expand play।\n\n**Risk**: Teamwork আপনার সবচেয়ে বিপজ্জনক competitor। একই ICP, time tracking আছে, client feature যোগ করছে। আপনার moat-কে ওদের roadmap-এর চেয়ে দ্রুত এগোতে হবে।",
              },
            ],
          },
        },
        {
          title: "Strategic summary লিখুন",
          description:
            "Analysis-টাকে এক পাতার একটা summary বানান, যেটা leadership-এর সঙ্গে share করা যায়, আর যেখানে মূল decision নিয়ে একটা পরিষ্কার recommendation থাকবে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Time tracking বানাব কি না, সেটা নিয়ে recommendation সহ strategic summary-টা লিখুন।",
              },
              {
                role: "claude",
                text: "**Competitive Analysis Summary: Time Tracking Decision**\n\n**Context**: Native time tracking বানাব কি না, সেই decision-এর জন্য আমরা চারটা competitor (Asana, Monday.com, ClickUp, Teamwork)-কে target customer, feature depth, positioning আর pricing ধরে evaluate করেছি।\n\n**মূল findings**:\n• ICP আর time tracking, দুটোতেই direct competitor শুধু Teamwork। Threat ওরাই।\n• ClickUp-এ time tracking আছে, কিন্তু complexity-তে হারে। আমরা clean আর opinionated থাকলে এই market আমরা নিতে পারি।\n• আমাদের client portal + approval workflow-ই সবচেয়ে strong differentiator, আর পুরো market-এ এই জায়গাটা এখনও ঠিকমতো cover হয়নি।\n\n**Recommendation: Time tracking বানান, তবে ধাপে ধাপে।**\n\nPhase 1 (এই quarter): Task-এর সঙ্গে যুক্ত basic time logging। এই feature-এর জন্য Teamwork-এর কাছে deal হারানো বন্ধ করতে এটুকুই যথেষ্ট।\nPhase 2 (পরের quarter): Time-কে project budget-এর সঙ্গে connect করা। আমাদের এখনকার project structure-এর সঙ্গে মিলে এটা একটা unique combination।\nInvoicing এখনই বানাবেন না। ওটা Teamwork-এর জায়গা, আর ওখানে compete করতে গেলে আমরা নিজেদের positioning থেকে সরে যাব।\n\n**এটা যা করে না**: এটা আমাদের \"feature complete\" বানায় না। এটা আমাদের সেই agency-দের জন্য সেরা tool বানায়, যাদের client collaboration আর basic time accountability লাগে। Teamwork-কে ওদের নিজের খেলায় হারানোর চেষ্টার চেয়ে এই position বেশি defensible।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Time tracking বানানো নিয়ে recommendation সহ strategic summary লিখুন।",
              },
              {
                role: "claude",
                text: "**Competitive Analysis: Time Tracking Decision**\n\n**Recommendation: বানান, ধাপে ধাপে।**\n\nPhase 1: Task-এ basic time logging, এই gap-এর কারণে Teamwork-এর কাছে deal হারানো বন্ধ হবে।\nPhase 2: Time-to-budget reporting, আমাদের project structure-এর সঙ্গে unique, client-facing কাজের জন্য কোনো competitor এটা করে না।\nInvoicing আপাতত থাক। ওটা Teamwork-এর খেলা, আমাদের নয়।\n\n**Strategic logic**: আমাদের moat হলো client collaboration। Time tracking সেটাকে replace না করে আরও বাড়িয়ে দেয়। Teamwork-কে ওদের নিজের খেলায় হারানোর চেষ্টা খারাপ bet; time accountability সহ সেরা client-forward PM tool হওয়া ভালো bet।\n\n**Risk**: Teamwork client feature-এ দ্রুত এগোচ্ছে। Phase 1 এই quarter-এই ship করতে হবে।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "Meeting notes থেকে structured ticket বানান",
        href: "/tutorials/meeting-to-jira",
      },
    },
  },
};
