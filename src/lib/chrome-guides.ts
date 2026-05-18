export type ChromeRoute = 'browser-basics' | 'chrome-extension' | 'google-workspace';

export interface ChromeGuideStep {
  title: string;
  description: string;
  list?: string[];
  code?: { snippet: string; language?: string };
  appDemo?: { steps: Array<{ role: 'user' | 'claude'; text: string; delay?: number }> };
}

export interface ChromeGuide {
  title: string;
  slug: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate';
  description: string;
  intro: string;
  situation?: { scene: string; outcome: string };
  outcomes?: string[];
  promptContrast?: { bad: string; good: string; why?: string };
  steps: ChromeGuideStep[];
  nextLink: { label: string; href: string };
  availableRoutes?: ChromeRoute[];
}

export const CHROME_GUIDES: Record<string, ChromeGuide> = {
  'get-started-with-claude-in-your-browser': {
    title: 'Get Started with Claude in Your Browser',
    slug: 'get-started-with-claude-in-your-browser',
    duration: '5 min',
    difficulty: 'beginner',
    availableRoutes: ['browser-basics'],
    description:
      'Open Claude.ai in Chrome, create your first conversation, and get something useful done in under five minutes.',
    intro:
      'This guide is for anyone who has heard about Claude but never actually used it. No setup beyond a web browser. By the end you will have a free account, a working conversation, and a prompt structure you can reuse for any task.',
    situation: {
      scene:
        "You've seen Claude mentioned everywhere but don't know where to actually begin. You just have a web browser.",
      outcome:
        "After this guide you'll have Claude open and have completed your first real task, not just said hello.",
    },
    outcomes: [
      'A free Claude account ready to use in your browser',
      'Your first successful conversation completed',
      'A reusable prompt structure you can use for any task',
    ],
    promptContrast: {
      bad: 'write an email',
      good: 'Write a follow-up email to a client I met at a networking event. They work in HR at a mid-size company. We talked about streamlining their employee onboarding process. I want to suggest a 20-minute call next week. Keep it under 120 words, professional but warm.',
      why: "Claude doesn't know your context. The more you give it: who, what, why, tone, length, the more useful the output.",
    },
    steps: [
      {
        title: 'Go to claude.ai and create a free account',
        description:
          'Open Chrome and navigate to claude.ai. Click "Sign up" and use your Google account or any email address. No credit card required. The free tier is genuinely useful and you can complete every guide on this page with it.',
        list: [
          'Open Chrome and go to claude.ai',
          'Click "Sign up" in the top right',
          'Choose "Continue with Google" for the fastest option, or enter your email',
          'Verify your email if prompted, then log in',
          'You are now looking at the Claude chat interface',
        ],
      },
      {
        title: 'Understand the interface without the jargon',
        description:
          "The main screen is a text box. You type something, Claude responds. That's the whole loop. A few things worth knowing before your first real message.",
        list: [
          'The text box at the bottom is where you write your prompt',
          'Each conversation is called a "thread" and it remembers everything said in that thread',
          'A new conversation means fresh memory: Claude will not remember your previous chats unless you use Projects',
          'The sidebar on the left holds your conversation history',
          'The model selector (top left) lets you switch between Claude versions. Sonnet is the default and handles most tasks well',
        ],
      },
      {
        title: 'Write your first useful prompt',
        description:
          "Skip 'hello' and go straight to something real. The prompt contrast above shows exactly what separates a generic output from a useful one. The pattern is: task + recipient + context + constraints.",
        appDemo: {
          steps: [
            {
              role: 'user',
              text: 'Write a follow-up email to a client I met at a networking event. They work in HR at a mid-size company. We talked about streamlining their employee onboarding process. I want to suggest a 20-minute call next week. Keep it under 120 words, professional but warm.',
              delay: 0,
            },
            {
              role: 'claude',
              text: "Hi [Name],\n\nGreat to meet you at the event last week. I really enjoyed our conversation about onboarding. It sounds like there's a real opportunity to make that process smoother for your team.\n\nI'd love to explore that further. Would you have 20 minutes next week for a quick call? I have flexibility Tuesday through Thursday, but happy to work around your schedule.\n\nLooking forward to connecting.\n\n[Your name]",
              delay: 800,
            },
          ],
        },
      },
      {
        title: 'Iterate: the first draft is a starting point, not the finish line',
        description:
          "If Claude's output isn't quite right, don't start over. Just tell it what to change. Claude holds the context of your conversation, so follow-up instructions are fast and precise.",
        list: [
          '"Make it shorter" means Claude will trim it',
          '"More formal" or "less formal" means Claude adjusts the tone',
          '"Add a specific detail about X" means Claude weaves it in',
          '"Try a different opening line" means Claude gives you alternatives',
          'You can ask for 3 versions and pick the one that fits best',
        ],
      },
    ],
    nextLink: {
      label: 'Add Claude to your browser toolbar',
      href: '/for-chrome/install-a-claude-chrome-extension',
    },
  },

  'install-a-claude-chrome-extension': {
    title: 'Add Claude to Your Chrome Toolbar',
    slug: 'install-a-claude-chrome-extension',
    duration: '10 min',
    difficulty: 'beginner',
    availableRoutes: ['chrome-extension'],
    description:
      'Install a Claude extension so you can open it on any webpage without switching tabs.',
    intro:
      'This guide covers installing a Chrome extension that puts Claude one click away on any webpage. Once installed, you can open Claude while staying on Gmail, a news article, a Google Doc, or any other page without any tab switching.',
    situation: {
      scene: 'You keep switching between Claude.ai and your work. There has to be a better way.',
      outcome:
        'After this guide, Claude is one click away on any page: Gmail, Google Docs, news articles, anything.',
    },
    outcomes: [
      'Claude accessible from any webpage with one click',
      'No more tab-switching interrupting your flow',
      'Set up to use Claude wherever you already work',
    ],
    steps: [
      {
        title: 'Open the Chrome Web Store',
        description:
          'The Chrome Web Store is where all Chrome extensions live. You access it directly from Chrome.',
        list: [
          'Open Chrome and go to chromewebstore.google.com',
          'Alternatively: click the three-dot menu (top right) then "Extensions" then "Visit Chrome Web Store"',
          'You are now on the official store where extensions are reviewed by Google before listing',
        ],
      },
      {
        title: 'Search for Claude extensions and pick one with good reviews',
        description:
          'There are both official and well-reviewed third-party Claude extensions available. Look for extensions with 4+ star ratings, a meaningful number of reviews, and recent update dates. A stale extension that has not been updated in a year is a warning sign.',
        list: [
          'Type "Claude" in the search bar at the top of the Chrome Web Store',
          'Look for extensions specifically listed as Claude or Anthropic integrations',
          'Check the star rating and number of reviews: more reviews from more recent users is a better signal than a perfect score with five reviews',
          'Click on an extension to read its full description and permissions list before installing',
          'A reputable Claude extension needs access to page content to work, but should not need access to passwords or payment info',
        ],
      },
      {
        title: 'Install the extension and pin it to your toolbar',
        description:
          'Installing takes one click. Pinning it means it stays visible in your toolbar instead of being buried in a menu.',
        list: [
          'Click "Add to Chrome" on the extension page',
          'A confirmation dialog shows you the permissions. Click "Add extension" to confirm',
          "Once installed, click the puzzle piece icon in Chrome's toolbar (top right)",
          'Find your new Claude extension in the list',
          'Click the pin icon next to it. This moves it from the extensions menu to your toolbar permanently',
          'The extension icon now appears next to your address bar on every Chrome page',
        ],
      },
      {
        title: 'Test it on a real webpage',
        description:
          'Open any webpage and try the extension. A good first test: open a news article or blog post and ask Claude to summarize it.',
        list: [
          'Navigate to any webpage. A news article works well for a first test',
          'Click your new Claude extension icon in the toolbar',
          'A sidebar or popup should open alongside the page',
          'Type a question or request related to the page you are on',
          'If the extension can read the page content, it will have context about what you are looking at without you needing to paste it',
          'If it does not auto-read the page, copy and paste the relevant text and ask your question',
        ],
      },
    ],
    nextLink: {
      label: 'Summarize any webpage with Claude',
      href: '/for-chrome/summarize-any-webpage-with-claude',
    },
  },

  'summarize-any-webpage-with-claude': {
    title: 'Summarize Any Webpage with Claude',
    slug: 'summarize-any-webpage-with-claude',
    duration: '5 min',
    difficulty: 'beginner',
    availableRoutes: ['browser-basics', 'chrome-extension'],
    description:
      'Turn any article, report, or long web page into a concise summary in under a minute.',
    intro:
      'This guide covers a fast, repeatable workflow for extracting what matters from any webpage without reading the whole thing. Works with claude.ai open in a tab or with a Chrome extension installed.',
    situation: {
      scene:
        'You opened a 4,000-word industry report and need the key points for a meeting in 20 minutes.',
      outcome:
        "After this guide you'll have a fast, repeatable workflow for reading the internet without reading all of it.",
    },
    outcomes: [
      'The 5 key takeaways from any article in under a minute',
      'Summaries formatted for your specific purpose',
      'A workflow you will use every single day',
    ],
    promptContrast: {
      bad: 'summarize this',
      good: "Here's an article. Give me: 1) The main argument in one sentence. 2) The three most important supporting points. 3) Any statistics I should remember. 4) Whether I need to read the full thing or if your summary is enough.\n\n[article text]",
      why: "Generic 'summarize this' gets a generic summary. Specifying the format you want gets exactly what you need for your next step.",
    },
    steps: [
      {
        title: 'Open the page you want to summarize',
        description:
          'Navigate to the article, report, or long webpage in Chrome. Before copying anything, skim the headline and any subheadings so you know roughly what you are dealing with. This helps you ask a sharper question.',
      },
      {
        title: 'Select all text on the page and copy it',
        description:
          'Use keyboard shortcuts to grab the full page text. You do not need to be precise: Claude handles messy copied text well.',
        list: [
          'Press Ctrl+A (Windows) or Cmd+A (Mac) to select all text on the page',
          'Press Ctrl+C (Windows) or Cmd+C (Mac) to copy it',
          'If the page has a lot of navigation and sidebar content mixed in, try selecting just the article body by clicking at the start of the text and shift-clicking at the end',
          'For PDFs opened in Chrome: Ctrl+A then Ctrl+C works the same way',
        ],
      },
      {
        title: 'Open Claude.ai or your extension and paste the text',
        description:
          'Open claude.ai in a new tab, or click your Chrome extension icon if you have one installed. Paste the copied text before writing your prompt.',
        list: [
          'Open claude.ai in a new tab (or click your extension icon)',
          'Click in the text box and paste with Ctrl+V (Windows) or Cmd+V (Mac)',
          'You will see the full article text appear. This is your raw material',
          'Now write your structured prompt above the pasted text',
        ],
      },
      {
        title: 'Use the structured prompt and get your summary',
        description:
          "The prompt contrast above gives you the exact format to use. The four-part structure gives you a summary you can actually use, not just a shorter version of what you already skimmed.",
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "Here's an article. Give me: 1) The main argument in one sentence. 2) The three most important supporting points. 3) Any statistics I should remember. 4) Whether I need to read the full thing or if your summary is enough.\n\n[The EU AI Act passed final vote this week, establishing the world's first comprehensive legal framework for artificial intelligence. The regulation categorizes AI systems by risk level: prohibited, high-risk, limited risk, and minimal risk, with different compliance requirements for each tier. High-risk systems including medical devices, critical infrastructure, and hiring tools face strict requirements for human oversight, data governance, and transparency. The Act includes a two-year phased rollout beginning in 2025, with penalties up to 35 million euros or 7% of global annual turnover for serious violations...]",
              delay: 0,
            },
            {
              role: 'claude',
              text: "1) Main argument: The EU AI Act creates a risk-tiered legal framework for AI that places strict obligations on high-stakes applications while leaving low-risk uses largely unregulated.\n\n2) Three most important points:\n   - Four risk tiers (prohibited, high-risk, limited, minimal) with compliance requirements scaled by tier\n   - High-risk categories include medical devices, critical infrastructure, and hiring tools, each requiring human oversight and data governance\n   - Phased rollout starting 2025 with significant financial penalties (up to 35M euros or 7% of global revenue)\n\n3) Statistics to remember: 35 million euros or 7% of global annual turnover for serious violations; two-year rollout beginning 2025.\n\n4) Verdict: Your summary covers the essentials for most discussions. Read the full thing if you work in a regulated industry (healthcare, HR, infrastructure) or need to know exact compliance timelines.",
              delay: 900,
            },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Write emails faster in Gmail',
      href: '/for-chrome/write-better-emails-in-gmail-with-claude',
    },
  },

  'write-better-emails-in-gmail-with-claude': {
    title: 'Write Better Emails in Gmail with Claude',
    slug: 'write-better-emails-in-gmail-with-claude',
    duration: '5 min',
    difficulty: 'beginner',
    availableRoutes: ['browser-basics', 'google-workspace'],
    description:
      'Stop staring at a blank compose window. Use Claude to draft professional emails faster than you can type them.',
    intro:
      'This guide covers a 60-second workflow for drafting any email using Claude alongside Gmail. The process works with claude.ai open in a tab and no extension is required.',
    situation: {
      scene:
        "Your inbox has three emails you've been avoiding because you're not sure how to phrase them.",
      outcome:
        "After this guide you'll have a 60-second process for drafting any email, and you'll never dread the blank compose window again.",
    },
    outcomes: [
      'Any email drafted in under 60 seconds',
      'Emails that say exactly what you mean in the right tone',
      'A process that works for every email type: awkward, formal, or time-sensitive',
    ],
    promptContrast: {
      bad: 'write a professional email',
      good: "Write a professional but friendly email declining a vendor's proposal. We've been working with a different vendor for 3 years and can't switch right now. Thank them for their time, be honest but kind, and leave the door open for next year. Under 150 words.",
      why: 'Without context, Claude writes a generic email that sounds like everyone else. With context, it writes your email.',
    },
    steps: [
      {
        title: 'Open Claude.ai in a new tab while Gmail is open',
        description:
          "The workflow is: Gmail in one tab, Claude in another. You will write your instructions in Claude, copy the output, and paste it into Gmail. The round trip takes about 30 seconds once you have done it a few times.",
        list: [
          'Open Gmail in Chrome as normal',
          'Press Ctrl+T (Windows) or Cmd+T (Mac) to open a new tab',
          'Go to claude.ai and make sure you are logged in',
          'Switch back and forth between tabs with Ctrl+Tab or just click each tab',
        ],
      },
      {
        title: 'Describe the email to Claude: who, what, tone, constraints',
        description:
          'The more specific your description, the better the output. Use the four-part structure from the prompt contrast: who you are writing to, what you are saying, the tone you want, and any constraints like word count or deadline.',
        list: [
          'Who are you writing to? (job title, relationship, context)',
          'What is the core message? (one sentence)',
          'What tone? (formal, warm, direct, apologetic, enthusiastic)',
          'Any constraints? (word count, must include a specific detail, avoid a specific phrase)',
        ],
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "Write a professional but friendly email declining a vendor's proposal. We've been working with a different vendor for 3 years and can't switch right now. Thank them for their time, be honest but kind, and leave the door open for next year. Under 150 words.",
              delay: 0,
            },
            {
              role: 'claude',
              text: "Subject: Re: Proposal\n\nHi [Name],\n\nThank you for putting together such a detailed proposal. It's clear your team has strong capability in this space.\n\nAfter careful consideration, we have decided to stay with our current vendor for now. We've been working with them for three years and have an existing agreement we're committed to honoring.\n\nThis is not a reflection of the quality of your proposal. We were genuinely impressed. I'd encourage you to reach out again next year as we reassess our vendor relationships. The timing may be much better.\n\nThanks again for your time and effort.\n\nBest,\n[Your name]",
              delay: 800,
            },
          ],
        },
      },
      {
        title: "Copy the draft and paste it into Gmail",
        description:
          "Select Claude's output, copy it, switch back to Gmail, and paste it into the compose window. Then read it before sending.",
        list: [
          "Click just before the first word of Claude's email draft",
          'Press Ctrl+A (Windows) or Cmd+A (Mac) to select it, or manually select just the email text',
          'Press Ctrl+C to copy',
          'Switch to your Gmail tab and click Compose',
          'Paste with Ctrl+V into the message body',
          'If Claude included a subject line suggestion, copy that into the subject field too',
        ],
      },
      {
        title: 'Always read and edit before sending',
        description:
          "Claude gives you a strong first draft, not the final word. Read it once. Check that the tone sounds like you. Add any specific names, dates, or details Claude could not know. A 30-second edit makes the difference between a draft and a sent email you feel good about.",
        list: [
          'Read the full draft out loud. You will catch anything that sounds off',
          'Add any specific details Claude did not have: names, project codes, specific dates',
          'Adjust any phrasing that does not sound like you',
          "Check the subject line. Claude's suggestion is a starting point; tweak it if needed",
          'Then send',
        ],
      },
    ],
    nextLink: {
      label: 'Use Claude with Google Docs',
      href: '/for-chrome/use-claude-with-google-docs',
    },
  },

  'use-claude-with-google-docs': {
    title: 'Use Claude Alongside Google Docs',
    slug: 'use-claude-with-google-docs',
    duration: '10 min',
    difficulty: 'beginner',
    availableRoutes: ['google-workspace'],
    description:
      'Run Claude and Google Docs side by side to draft, edit, and improve documents faster than writing alone.',
    intro:
      'This guide covers a side-by-side workflow where Google Docs holds your document and Claude handles the writing and editing. No extension required: just two browser windows.',
    situation: {
      scene:
        "You have a Google Doc that needs writing or a blank one that needs to be filled. The project brief is clear but the words aren't coming.",
      outcome:
        "After this guide you'll have a side-by-side workflow where Claude drafts and you direct.",
    },
    outcomes: [
      'A first draft in Google Docs without the blank-page paralysis',
      'Claude as your real-time writing collaborator',
      'A workflow for drafts, edits, and improvements',
    ],
    promptContrast: {
      bad: 'write a report about our project',
      good: "I'm writing a project status update for my team. The project is a new customer onboarding flow we launched last month. Key points: 3 weeks ahead of schedule, satisfaction scores up 18%, one remaining bug with bulk imports being fixed this week. Write a 200-word update that leads with the good news and ends with next steps.",
      why: 'The more Claude knows about your audience, your project, and your specific details, the less generic the output.',
    },
    steps: [
      {
        title: 'Set up side-by-side windows',
        description:
          'The most efficient setup is Google Docs on one side of your screen and Claude on the other. You want both visible at once so you can read, copy, and paste without full tab switching.',
        list: [
          'Open Google Docs in one Chrome window',
          'Open claude.ai in a second Chrome window',
          'On Windows: drag each window to one side of your screen. Windows will snap them to halves automatically',
          'On Mac: hold the green maximise button on one window and choose "Tile Window to Left of Screen," then do the same for Claude on the right',
          'Alternatively: use two monitors if you have them, one screen per app',
        ],
      },
      {
        title: 'For new documents: describe what you are writing to Claude',
        description:
          'Give Claude the same information you would give a writing assistant you just hired. Audience, purpose, key points, length, tone.',
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "I'm writing a project status update for my team. The project is a new customer onboarding flow we launched last month. Key points: 3 weeks ahead of schedule, satisfaction scores up 18%, one remaining bug with bulk imports being fixed this week. Write a 200-word update that leads with the good news and ends with next steps.",
              delay: 0,
            },
            {
              role: 'claude',
              text: "**Onboarding Flow: Status Update**\n\nThe new customer onboarding flow is performing well. We launched last month and are currently running 3 weeks ahead of the original schedule. Customer satisfaction scores have improved by 18% since launch, a strong early signal that the redesigned experience is landing well.\n\nThe main outstanding item is a bug affecting bulk imports, which the team is actively working on this week. We expect it resolved before the end of the sprint.\n\n**Next steps:**\n- Resolve bulk import bug (owner: engineering, target: end of week)\n- Complete 30-day post-launch review (owner: product, target: next Monday)\n- Share satisfaction score breakdown with stakeholders (target: this Friday)\n\nOverall the launch is in good shape. If you have questions or need more detail on any of the above, reply here or ping me directly.",
              delay: 900,
            },
          ],
        },
      },
      {
        title: 'For existing drafts: paste your text and ask Claude to improve it',
        description:
          "If you already have a draft that needs work, paste it into Claude with specific editing instructions. 'Make it shorter' or 'improve the structure' are too vague. Tell Claude what specifically needs fixing.",
        list: [
          'Select your existing text in Google Docs (Ctrl+A to select all, or select a specific section)',
          'Copy it and paste it into Claude',
          'Then add specific instructions after the paste: "This is too long, cut it to 150 words without losing the key points" or "The intro is weak, rewrite just the first paragraph to hook the reader faster"',
          'Claude will return only what you asked it to fix, which you then copy back into your Doc',
        ],
      },
      {
        title: "Copy Claude's output back into your Doc and edit from there",
        description:
          "Claude's output is a draft. Paste it in, then do a final read and edit pass in your Doc. Google Docs version history means you can always go back if you prefer an earlier version.",
        list: [
          "Select Claude's output and copy it",
          'Click where you want it in your Google Doc',
          'Paste with Ctrl+V',
          'Read the full document once from top to bottom',
          'Edit anything that breaks the flow or needs your specific details added',
          'Use File > Version History > Name Current Version to save a checkpoint before major edits',
        ],
      },
    ],
    nextLink: {
      label: 'Research any topic faster with Claude',
      href: '/for-chrome/research-any-topic-with-claude',
    },
  },

  'research-any-topic-with-claude': {
    title: 'Get Up to Speed on Any Topic with Claude',
    slug: 'research-any-topic-with-claude',
    duration: '10 min',
    difficulty: 'intermediate',
    availableRoutes: ['browser-basics'],
    description:
      'Use Claude to understand unfamiliar industries, prepare for meetings, and walk into any conversation sounding like you did your homework.',
    intro:
      'This guide covers a five-step research workflow that takes you from zero knowledge to credible preparation in under 20 minutes. Works with claude.ai in any browser tab.',
    situation: {
      scene:
        "You have a meeting tomorrow with a client in an industry you've never worked in. You have an hour.",
      outcome:
        "After this guide you'll have a repeatable research workflow that gets you from zero to credible in under 20 minutes.",
    },
    outcomes: [
      'A working understanding of any new topic in under 20 minutes',
      'The right questions to ask in any meeting or conversation',
      'A research workflow you will use constantly',
    ],
    promptContrast: {
      bad: 'tell me about supply chain management',
      good: "I'm meeting tomorrow with a VP of Supply Chain at a consumer goods company. I'm coming from a software background and have never worked in logistics. Give me: 1) The 5 concepts I must understand before walking in. 2) The jargon they'll use and what it means. 3) Three questions that show I did my homework. 4) The top problems companies like theirs are dealing with right now.",
      why: 'Generic questions get textbook answers. Framing your question around your specific situation gets actionable intelligence.',
    },
    steps: [
      {
        title: 'Give Claude your context upfront: who you are, what you know, what you need',
        description:
          "The most common research mistake is asking Claude a topic question without telling it why you need the answer. Claude can calibrate to your level and your goal if you tell it both. A software engineer preparing for a client meeting needs different information than a journalist writing a feature.",
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "I'm meeting tomorrow with a VP of Supply Chain at a consumer goods company. I'm coming from a software background and have never worked in logistics. Give me: 1) The 5 concepts I must understand before walking in. 2) The jargon they'll use and what it means. 3) Three questions that show I did my homework. 4) The top problems companies like theirs are dealing with right now.",
              delay: 0,
            },
            {
              role: 'claude',
              text: "**5 concepts to understand:**\n1. SKU (Stock Keeping Unit): a unique identifier for each product variant. When they say 'managing 40,000 SKUs' they mean 40,000 distinct items to track.\n2. Lead time: the time between ordering stock and it arriving. Longer lead times mean more risk if demand shifts.\n3. Safety stock: buffer inventory held to absorb demand spikes or supply delays. Too much ties up cash; too little causes stockouts.\n4. Fill rate: the percentage of customer orders fulfilled on time from available inventory. A KPI they live by.\n5. Last-mile delivery: the final leg from distribution center to customer. The most expensive and complex part of the chain.\n\n**Jargon you will hear:** 3PL (third-party logistics provider), OTIF (on-time in-full, a retailer compliance metric), demand forecasting, replenishment cycles, vendor-managed inventory (VMI).\n\n**Three questions that show you did your homework:**\n- 'How has your safety stock strategy changed since the 2021 supply chain disruptions?'\n- 'Where does your biggest lead time variability come from: upstream suppliers or last-mile?'\n- 'Are you seeing pressure from retailers on OTIF compliance, and how are you handling it?'\n\n**Top problems right now:** Nearshoring pressures (moving supply chains closer to home markets), inventory optimization after the overstock hangover of 2022-23, and real-time visibility across multi-tier suppliers.",
              delay: 1000,
            },
          ],
        },
      },
      {
        title: "Ask follow-up questions on anything that doesn't make sense",
        description:
          "Claude holds the full context of your conversation, so follow-up questions are fast. If it used a term you don't understand, just ask. If a concept needs more depth, say so. This is where Claude beats a Google search: you can drill down without losing context.",
        list: [
          '"What is OTIF and why do retailers care so much about it?"',
          '"Explain nearshoring like I have never heard of it"',
          '"How does safety stock calculation actually work? Give me an example with numbers"',
          '"What is the difference between 3PL and 4PL?"',
          'Keep asking until you feel confident explaining the concept back in your own words',
        ],
      },
      {
        title: 'Ask Claude to generate questions you are likely to be asked',
        description:
          "Flip the direction. Once you understand the topic, ask Claude to anticipate what the other person might ask you. This is especially useful for client meetings, job interviews, or presentations where you will face questions you did not prepare.",
        list: [
          '"Based on what we have covered, what are the 5 most likely questions this VP will ask me?"',
          '"What gaps in my understanding might come up in this conversation?"',
          '"If they ask me about our software supply chain integrations, what should I know?"',
          '"What would be a red flag answer, something I should avoid saying that would signal I do not understand their world?"',
        ],
      },
      {
        title: 'Ask Claude to run a practice session',
        description:
          "Have Claude play the other person and ask you questions. This is the fastest way to find the holes in your preparation. It feels awkward at first and it is worth it.",
        list: [
          '"Pretend you are the VP of Supply Chain I am meeting tomorrow. Ask me questions about how our software could help your operations."',
          'Answer each question as you would in the real meeting',
          'Claude will respond as the VP would, including pushback and follow-up questions',
          'After 3-4 exchanges, ask Claude to give you feedback: "What did I answer well? Where did I sound uncertain?"',
          'Repeat the weak areas until the answers feel natural',
        ],
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "Pretend you are the VP of Supply Chain I'm meeting tomorrow. Ask me questions about how our software could help your operations.",
              delay: 0,
            },
            {
              role: 'claude',
              text: "Good, let's do it.\n\nSo I've been getting pitched by a lot of software vendors lately. Most of them lead with dashboards and 'real-time visibility.' We have three systems already that promise that and our team still has to pull data manually every Monday morning.\n\nWhat specifically does your software do that's different? And I mean specifically. Don't give me the brochure version.",
              delay: 700,
            },
            {
              role: 'user',
              text: "We connect directly to your ERP and 3PL systems through native integrations. The Monday pull happens because your systems don't talk to each other. We fix that at the data layer, not by adding another dashboard on top.",
              delay: 1200,
            },
            {
              role: 'claude',
              text: "Okay, that's a better answer than most. Follow-up: which ERPs specifically? We run SAP S/4HANA and our 3PL uses Manhattan Associates. I've heard 'native integrations' before and it usually means a CSV export scheduled at 3am.",
              delay: 600,
            },
          ],
        },
      },
      {
        title: 'Summarize your preparation into a one-page brief',
        description:
          'Before the meeting, ask Claude to consolidate everything into a structured brief you can review in the 10 minutes before you walk in.',
        list: [
          '"Summarize everything we have covered into a one-page meeting prep brief. Include: key concepts, jargon I need, questions I will ask, and two things to avoid."',
          'Copy the brief into a Google Doc or Notes app',
          'Review it 10 minutes before the meeting',
          'Keep it open on your phone during the meeting if needed',
        ],
      },
    ],
    nextLink: {
      label: 'Back to all Chrome guides',
      href: '/for-chrome',
    },
  },
};
