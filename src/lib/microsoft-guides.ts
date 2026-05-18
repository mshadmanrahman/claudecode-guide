export type MicrosoftRoute = 'word' | 'excel' | 'powerpoint';

export interface MicrosoftGuideStep {
  title: string;
  description: string;
  list?: string[];
  code?: { snippet: string; language?: string };
  appDemo?: { steps: Array<{ role: 'user' | 'claude'; text: string; delay?: number }> };
}

export interface MicrosoftGuide {
  title: string;
  slug: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate';
  description: string;
  intro: string;
  situation?: { scene: string; outcome: string };
  outcomes?: string[];
  promptContrast?: { bad: string; good: string; why?: string };
  steps: MicrosoftGuideStep[];
  nextLink: { label: string; href: string };
  availableRoutes?: MicrosoftRoute[];
}

export const MICROSOFT_GUIDES: Record<string, MicrosoftGuide> = {
  'write-faster-in-word-with-claude': {
    title: 'Write Faster in Word with Claude',
    slug: 'write-faster-in-word-with-claude',
    duration: '5 min',
    difficulty: 'beginner',
    description:
      'Stop starting from a blank page. Give Claude the brief and get a first draft in Word in under a minute.',
    intro:
      'The blank page is not a writing problem. It is a thinking problem. Claude solves it by turning a brief into a working draft that you can edit, not a finished document you accept. This guide shows you the exact workflow.',
    situation: {
      scene:
        'The cursor is blinking in an empty Word document. The report is due Friday.',
      outcome:
        "After this guide you'll have a reliable process for going from blank page to first draft without the paralysis.",
    },
    outcomes: [
      'A first draft ready to edit, not a blank page to dread',
      'A process that works for any Word document: reports, memos, proposals, emails',
      'Cut your drafting time by more than half',
    ],
    promptContrast: {
      bad: 'write a business proposal',
      good: "Write a 400-word executive summary for a business proposal. We're a B2B SaaS company proposing a 3-month pilot of our HR analytics tool to a 500-person manufacturing company. Key benefits: reduce turnover by 15%, cut HR admin time by 30%. Audience: the CFO and HR Director. Tone: confident but not pushy. End with a clear call to action.",
      why: "Claude doesn't know your business, your audience, or your goal until you tell it. The more specific the brief, the less generic the output.",
    },
    steps: [
      {
        title: 'Open Claude.ai alongside Word',
        description:
          'Go to claude.ai in your browser. Keep Word open on the same screen or in a side-by-side window. You will be moving between the two. No plugins, no add-ins, no installation.',
      },
      {
        title: 'Write your brief before you write anything else',
        description:
          'Before you type in Claude, answer four questions in your head: What am I writing? Who reads it? What are the two or three key points? How long should it be? Then write that as your prompt.',
        list: [
          'What are you writing: a report, a memo, a proposal, an email, a cover letter?',
          'Who reads it: a specific person, a team, a board, a client? What do they care about?',
          'What are the key points: the two or three things that must land, not everything you know?',
          'What constraints apply: word count, tone, structure, deadline context?',
        ],
      },
      {
        title: 'Copy the output and paste it into Word',
        description:
          'Once Claude gives you a draft, select all of it, copy, and paste into your Word document. Do not overthink the paste. The point is to go from blank page to something on the page. Everything from here is editing, not writing from scratch.',
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "Write a 400-word executive summary for a business proposal. We're a B2B SaaS company proposing a 3-month pilot of our HR analytics tool to a 500-person manufacturing company. Key benefits: reduce turnover by 15%, cut HR admin time by 30%. Audience: the CFO and HR Director. Tone: confident but not pushy. End with a clear call to action.",
            },
            {
              role: 'claude',
              text: "Executive Summary\n\nWorkforce turnover costs manufacturers an average of 33% of a role's annual salary, and most HR teams are tracking it in spreadsheets. Meridian Analytics changes that.\n\nWe're proposing a 3-month pilot of Meridian's HR Analytics platform at your facility. The pilot gives your HR Director visibility into the leading indicators of turnover before people hand in their notice, and cuts the administrative burden of reporting by automating the work that currently happens manually.\n\nBased on results at comparable manufacturing facilities, you can expect to see a 15% reduction in voluntary turnover within the first two quarters of full deployment, and a 30% reduction in HR admin hours within the first month.\n\nThe 3-month pilot requires no long-term commitment and minimal IT involvement. Our implementation team handles setup. Your HR Director gets a working dashboard in week one.\n\nWe would welcome 30 minutes with your team to walk through the pilot structure and answer questions. I have attached our implementation overview and a reference from a similar engagement for your review.",
              delay: 1200,
            },
          ],
        },
      },
      {
        title: "Edit from there: Claude is a first draft, not a final one",
        description:
          "Read it. Change what doesn't sound like you. Add the specific details Claude couldn't know: a name, a reference to last quarter's results, the exact number from your spreadsheet. The draft gets you past the hardest part. You own it from here.",
        list: [
          'Replace any placeholder detail Claude had to guess with your real information',
          'Adjust the tone if it is slightly off: Claude calibrates on your instructions, not on knowing your voice',
          'Add anything specific you left out of the brief',
          'Cut anything generic that does not serve the actual audience',
        ],
      },
    ],
    nextLink: {
      label: 'Edit and improve your Word docs with Claude',
      href: '/for-microsoft/edit-and-improve-word-documents-with-claude',
    },
    availableRoutes: ['word'],
  },

  'edit-and-improve-word-documents-with-claude': {
    title: 'Edit and Improve Any Word Document with Claude',
    slug: 'edit-and-improve-word-documents-with-claude',
    duration: '10 min',
    difficulty: 'beginner',
    description:
      "Paste your draft into Claude and get it back tighter, clearer, and more professional, with specific explanations for every change.",
    intro:
      "The hardest thing about editing your own writing is that you've read it so many times the problems disappear. Claude hasn't read it before. That's the advantage.",
    situation: {
      scene:
        "You've got a draft but something's off. You've read it so many times you can't see the problems anymore.",
      outcome:
        "After this guide you'll have a fresh-eyes editing workflow that makes any document better in under 10 minutes.",
    },
    outcomes: [
      "A cleaner, clearer document without the 'too close to see it' problem",
      'Specific edits with explanations, not just rewrites',
      'A repeatable editing process for every document you write',
    ],
    promptContrast: {
      bad: 'improve this document [paste]',
      good: `Here's a memo I've written. Please edit it for:
1) Clarity: cut sentences that don't add anything.
2) Tone: confident but not aggressive.
3) Structure: most important information first.

Format your edits as "Before:" and "After:" with a one-line explanation for each change.

[paste document]`,
      why: 'Without direction, Claude rewrites everything. With specific criteria, it edits on your terms.',
    },
    steps: [
      {
        title: 'Select all text in your Word doc and copy it',
        description:
          'Use Ctrl+A (or Cmd+A on Mac) to select everything, then Ctrl+C to copy. You will paste this into Claude along with your editing instructions. Do not worry about formatting: plain text is fine.',
      },
      {
        title: 'Open Claude.ai and paste with a structured editing prompt',
        description:
          "Don't just paste the document. Paste it with specific editing criteria so Claude edits on your terms, not its own. The structured format returns changes you can act on one at a time.",
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "Here's a memo I've written. Please edit it for:\n1) Clarity: cut sentences that don't add anything.\n2) Tone: confident but not aggressive.\n3) Structure: most important information first.\n\nFormat your edits as \"Before:\" and \"After:\" with a one-line explanation for each change.\n\n[MEMO TEXT]\nThe purpose of this communication is to inform all relevant stakeholders that we will be implementing new procedures for the approval process related to budget expenditures, which will come into effect from the first of next month and will require all department heads to submit requests through the new system.",
            },
            {
              role: 'claude',
              text: 'Here are the edits:\n\nBefore: "The purpose of this communication is to inform all relevant stakeholders that we will be implementing new procedures for the approval process related to budget expenditures, which will come into effect from the first of next month and will require all department heads to submit requests through the new system."\n\nAfter: "Starting next month, all budget approval requests must go through the new system. Department heads: please submit through the new process from [date]."\n\nExplanation: Cut the passive construction and buried lead. The important fact (what changes and when) now comes first. Reduced from 51 words to 22.',
              delay: 1000,
            },
          ],
        },
      },
      {
        title: 'Review the before/after pairs and apply the changes you agree with',
        description:
          "Claude shows you the original and the edit side by side. You decide which changes to accept. You don't have to take all of them. Reject any edit that removes something intentional: Claude doesn't know the difference between a long sentence for emphasis and a long sentence by accident.",
        list: [
          'Copy the "After" text for edits you want to keep',
          'Find and replace the original text in Word',
          'Skip any edit that removes nuance you put there deliberately',
          'Keep your own voice: if Claude makes it sound like everyone else, revert it',
        ],
      },
      {
        title: "Ask follow-up questions about what is still bothering you",
        description:
          "Claude's first pass catches the obvious problems. Your instinct catches the subtle ones. Name them and ask specifically.",
        list: [
          '"Is the intro too long before I get to the main point?"',
          '"Does paragraph 3 feel repetitive? What would you cut?"',
          '"The conclusion feels weak: can you give me three options for how to end this?"',
          '"Does the tone shift somewhere in the middle? Where?"',
        ],
      },
    ],
    nextLink: {
      label: 'Draft Outlook emails with Claude',
      href: '/for-microsoft/draft-outlook-emails-with-claude',
    },
    availableRoutes: ['word'],
  },

  'create-excel-formulas-with-claude': {
    title: 'Create Excel Formulas with Claude (No Formula Knowledge Required)',
    slug: 'create-excel-formulas-with-claude',
    duration: '10 min',
    difficulty: 'beginner',
    description:
      'Describe what you want to calculate in plain English, and Claude writes the Excel formula. Works every time.',
    intro:
      "Excel formulas have their own syntax, their own logic, their own error messages. You don't need to learn any of it. Claude translates plain English into working formulas and explains how they work.",
    situation: {
      scene:
        "You need a formula more complex than SUM but you don't speak Excel syntax.",
      outcome:
        "After this guide you'll never be stuck on an Excel formula again: Claude becomes your formula translator.",
    },
    outcomes: [
      'Any Excel formula you need, written and explained',
      'No more searching Stack Overflow for formula help',
      'Confidence to tackle any calculation problem in Excel',
    ],
    promptContrast: {
      bad: 'give me an Excel formula for commission',
      good: `I have an Excel spreadsheet with these columns:
A = Date
B = Product Name
C = Sales Rep
D = Sale Amount

I want a formula in column E that calculates commission. Commission rate: 8% if the sale amount is under $5,000, and 12% if it's $5,000 or more.

Write the formula and explain how each part works.`,
      why: "Column names and the exact logic you want: that's what Claude needs to write a formula that actually fits your spreadsheet.",
    },
    steps: [
      {
        title: 'Identify your column names or labels before you start',
        description:
          "Claude needs to know how your spreadsheet is laid out to write a formula that works in it. Before you open Claude, look at your spreadsheet and note the column letters and what each one contains. This takes 30 seconds and makes the formula immediately usable.",
        list: [
          'Which column letter is the value you want to calculate from?',
          'Which column should the result appear in?',
          'Do you have a header row? (Row 1 or row 2 typically)',
          'Are there any other columns the formula needs to reference?',
        ],
      },
      {
        title: 'Describe what you want to calculate in plain English',
        description:
          "Write your prompt the way you would explain it to a non-technical colleague. Include the column layout, the specific logic or conditions, and which row you want to start from. The more specific you are, the more directly usable the formula will be.",
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "I have a spreadsheet tracking monthly expenses. Columns are:\nA = Month\nB = Category (Food, Travel, Office, Other)\nC = Amount\n\nI want a formula in D2 that shows the total for the \"Travel\" category across all rows. The data starts at row 2 and goes to row 500.",
            },
            {
              role: 'claude',
              text: 'Here\'s the formula for D2:\n\n=SUMIF(B:B,"Travel",C:C)\n\nHow it works:\n- SUMIF adds up values based on a condition\n- B:B is the range Claude checks (your Category column)\n- "Travel" is the condition: it only counts rows where column B says Travel\n- C:C is the range it adds up when the condition is true (your Amount column)\n\nYou can change "Travel" to any category name to get that category\'s total. If you want to make it dynamic (so you can type the category in a cell and the formula updates), put your category name in E2 and use =SUMIF(B:B,E2,C:C) instead.',
              delay: 900,
            },
          ],
        },
      },
      {
        title: 'Copy the formula and paste it into the correct Excel cell',
        description:
          "Select only the formula text from Claude's response (starting with the = sign), copy it, click the target cell in Excel, and paste. Press Enter. If you see a result, it worked. If you see the formula as text, click the cell, press F2 to edit, and check that it starts with = and has no extra characters before it.",
        list: [
          'Click the cell where you want the result to appear',
          'Press Ctrl+V (or Cmd+V) to paste',
          'Press Enter to confirm',
          'If the result looks wrong, check that your column letters match what you described to Claude',
        ],
      },
      {
        title: 'If it returns an error, describe the error to Claude and it will debug it',
        description:
          "Excel errors are normal. They are not a sign you did something wrong. Copy the error message exactly and tell Claude what you see. Claude will diagnose the problem and give you the corrected formula.",
        appDemo: {
          steps: [
            {
              role: 'user',
              text: 'I pasted the formula you gave me and I\'m getting a #REF! error. The formula is =SUMIF(B:B,"Travel",C:C) and it\'s in cell D2.',
            },
            {
              role: 'claude',
              text: 'A #REF! error in SUMIF usually means one of the column references is pointing to a column that no longer exists, or the formula is in a column that overlaps with one of its own ranges.\n\nMost likely cause: your formula is in column D, which is fine since your SUMIF references B:B and C:C. But if the error persists, check this first: click on cell D2 and look at the formula bar. If it shows =SUMIF(#REF!,"Travel",C:C) then a column was deleted after you wrote the formula. In that case, re-enter it:\n\n=SUMIF(B:B,"Travel",C:C)\n\nIf the error persists, tell me what your column layout looks like now and I\'ll rewrite it to fit.',
              delay: 700,
            },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Analyze spreadsheet data with Claude',
      href: '/for-microsoft/analyze-data-in-excel-with-claude',
    },
    availableRoutes: ['excel'],
  },

  'analyze-data-in-excel-with-claude': {
    title: 'Make Sense of Spreadsheet Data with Claude',
    slug: 'analyze-data-in-excel-with-claude',
    duration: '15 min',
    difficulty: 'intermediate',
    description:
      "Give Claude your data and get clear insights, chart recommendations, and the narrative to tell, without becoming a data analyst.",
    intro:
      "Data without a story is just a table. Claude's job here is to find the story: the trends, the anomalies, the one sentence that leads your presentation.",
    situation: {
      scene:
        'You have a spreadsheet full of numbers and a presentation tomorrow that asks you to explain the trends.',
      outcome:
        "After this guide you'll be able to turn any dataset into a clear story using Claude as your analyst.",
    },
    outcomes: [
      'The key trends and patterns in your data explained in plain English',
      'Specific chart recommendations for your data type',
      'The one-sentence headline finding to lead with in any presentation',
    ],
    promptContrast: {
      bad: 'analyze my data [paste]',
      good: `I'm pasting 3 months of sales data. Columns: Date, Region, Product, Revenue, Units Sold, Sales Rep.

I need to present this to leadership next week. Tell me:
1) The top 3 trends or patterns you see.
2) Any anomalies I should be prepared to explain.
3) The charts that would make this story clearest.
4) In one sentence, what's the headline finding?

[paste data]`,
      why: "Without context Claude does generic statistics. With your goal ('present to leadership') it tells you what matters.",
    },
    steps: [
      {
        title: 'Copy a sample of your data',
        description:
          "50 to 200 rows is usually enough for Claude to find patterns. If your dataset is larger, copy a representative sample across the full time range, not just the most recent rows. Include the header row so Claude knows what each column contains.",
        list: [
          'Include the header row in your copy',
          '50 to 200 rows is the right range for pattern detection',
          'If you have a large dataset, sample across the full time range rather than just recent data',
          'Exclude any columns with personal information (names, emails, addresses)',
        ],
      },
      {
        title: 'Paste with context: what the data represents and what decisions it informs',
        description:
          "The same data means something completely different depending on what you are trying to do with it. Tell Claude what the data is, why it exists, and what question you are trying to answer. This changes what it highlights.",
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "Here is 3 months of customer support ticket data. Columns: Date, Ticket ID, Category, Priority, Resolution Time (hours), Agent, Customer Segment (SMB or Enterprise).\n\nContext: we're preparing for a quarterly review and need to decide whether to add headcount to the support team. Tell me:\n1) The top 3 patterns you see.\n2) Any anomalies worth flagging.\n3) The one-sentence headline for the \"should we hire\" question.\n\n[DATA PASTED]",
            },
            {
              role: 'claude',
              text: "Top 3 patterns:\n\n1. Enterprise tickets take 2.4x longer to resolve than SMB tickets on average, but Enterprise volume has grown 40% over the period while SMB stayed flat. The team is absorbing a disproportionate complexity increase.\n\n2. Resolution times spike every Friday afternoon and do not recover until Tuesday. This is likely a weekend staffing gap: tickets created late Friday sit until Monday morning, inflating the overall averages.\n\n3. The \"Billing\" category has the highest resolution time (avg 18.3 hours) despite being the third most common category. This is likely a routing or escalation issue, not a volume issue.\n\nAnomaly: Week of [date], resolution times for Priority 1 tickets tripled. Check whether a specific agent was out that week or whether a system outage created a backlog.\n\nHeadline for the headcount question: Enterprise growth is outpacing team capacity, and Friday gaps are hiding in the averages, so the case for headcount is stronger than the mean resolution time alone suggests.",
              delay: 1300,
            },
          ],
        },
      },
      {
        title: 'Ask for patterns and anomalies, not just summaries',
        description:
          "A summary tells you what you already know (revenue was up 12%). A pattern tells you something you missed (revenue was up in three regions and flat in the fourth, which drove the average). Ask Claude specifically for what is unusual, not what is typical.",
        list: [
          '"What is the most surprising thing in this data?"',
          '"Are there any outliers I should investigate before I present this?"',
          '"What is driving the number that looks best? What is driving the one that looks worst?"',
          '"If I only had 60 seconds to present this, what would I say?"',
        ],
      },
      {
        title: 'Ask for chart recommendations and how to build them in Excel',
        description:
          "Once you know what story you are telling, ask Claude which chart type tells it best. Different stories need different chart types, and the wrong chart actively makes your point harder to see.",
        list: [
          'Trends over time: line chart or area chart',
          'Comparing categories: bar chart (not pie chart)',
          'Part-to-whole: stacked bar or treemap',
          'Relationship between two variables: scatter plot',
          'Ask Claude: "Given this story, what chart type makes the point fastest?"',
        ],
      },
      {
        title: 'Ask Claude to write the narrative for your presentation',
        description:
          "The chart shows the data. The narrative tells people what to think about it. Ask Claude to write the two or three sentences you say when each slide appears.",
        list: [
          '"Give me 3 sentences I can say when presenting the trend slide."',
          '"Write the setup line that makes the anomaly feel significant, not random."',
          '"How do I explain the Friday spike without it sounding like an excuse?"',
        ],
      },
    ],
    nextLink: {
      label: 'Create presentations with Claude',
      href: '/for-microsoft/create-presentations-with-claude-for-powerpoint',
    },
    availableRoutes: ['excel'],
  },

  'create-presentations-with-claude-for-powerpoint': {
    title: 'Create PowerPoint Presentations with Claude',
    slug: 'create-presentations-with-claude-for-powerpoint',
    duration: '10 min',
    difficulty: 'beginner',
    description:
      'Turn a topic or a brief into a complete slide-by-slide outline. No blank deck. No structure paralysis.',
    intro:
      "A blank PowerPoint is harder to start than a blank Word document because you're not just writing: you're structuring, sequencing, and making decisions about what belongs on each slide before you've even thought about what you want to say. Claude handles the structure first so you can focus on the content.",
    situation: {
      scene:
        'You need to present something next week and the blank PowerPoint is staring back at you.',
      outcome:
        "After this guide you'll have a complete deck outline and talking points ready to build.",
    },
    outcomes: [
      'A complete slide outline ready to build in PowerPoint',
      'Talking points for every slide',
      'The right structure for your specific audience',
    ],
    promptContrast: {
      bad: 'make me a presentation about our product',
      good: `Create a 10-slide PowerPoint outline for a product update presentation.
Audience: our internal sales team of 25 people.
Purpose: update them on Q2 features and help them talk about those features in customer calls.

Include: opening hook, problem statement, 3 feature deep-dives, objection handling, Q3 roadmap preview, call to action.

For each slide: slide title, 3 bullet points, and a 30-second talking point.`,
      why: "Audience and purpose change everything about a presentation. Without them, Claude writes a generic deck that nobody remembers.",
    },
    steps: [
      {
        title: 'Define three things before you start: audience, purpose, and format',
        description:
          "These three variables change almost every decision Claude makes about your deck. Get them clear before you write anything in Claude.",
        list: [
          'Audience: who is in the room? What do they already know? What do they care about most?',
          'Purpose: are you informing, persuading, or asking for a decision? The purpose changes the structure.',
          'Format: how many slides, how long, what medium (live presentation, emailed deck, self-serve PDF)?',
        ],
      },
      {
        title: 'Use the structured prompt and replace the specifics with your own',
        description:
          "The prompt above works for almost any presentation. Change the slide count, audience, purpose, and the specific sections to match your context. The more specific you are, the more immediately usable the outline will be.",
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "Create a 7-slide PowerPoint outline for a project kickoff meeting.\nAudience: 6 engineers and 2 designers who haven't heard of this project before.\nPurpose: get everyone aligned on what we're building and why before we start.\n\nSections: why this project exists, what we're building (not what we're not building), key constraints, success metrics, team roles, first milestone, open questions.\n\nFor each slide: title, 3 bullets, one talking point.",
            },
            {
              role: 'claude',
              text: "Slide 1: Why This Project Exists\n- [Problem you are solving: 1 sentence]\n- [Who is affected by this problem and how]\n- [Why now: what changed or what was the trigger]\nTalking point: \"Before we talk about what we're building, I want us to agree on the problem. If we're not solving the same problem, the rest of this deck doesn't matter.\"\n\nSlide 2: What We're Building (and What We're Not)\n- [Core capability in plain English]\n- [Two explicit out-of-scope items]\n- [The one decision that was hardest to make]\nTalking point: \"The 'not building' list is as important as the 'building' list. If something isn't on that list, it's still on the table: let's call that out now.\"\n\nSlide 3: Key Constraints\n- [Time constraint and hard deadline]\n- [Resource constraint: team size, budget, tooling]\n- [Technical constraint: platform, dependencies, non-negotiables]\nTalking point: \"These aren't excuses, they're the frame. Everything we decide in the next few weeks needs to fit inside these.\"\n\n[Slides 4-7 continue in the same format...]",
              delay: 1100,
            },
          ],
        },
      },
      {
        title: 'Ask Claude to expand any slide you want to go deeper on',
        description:
          "The first outline is a skeleton. Once you have it, identify the two or three slides where you need more depth: more specific bullet points, more context, a concrete example. Ask Claude to expand each one separately.",
        list: [
          '"Expand slide 3 with more specific bullets. I need each point to be something the audience hasn\'t already assumed."',
          '"Give me 5 different options for the opening hook on slide 1."',
          '"Rewrite the objection handling slide assuming the main objection is cost, not timeline."',
        ],
      },
      {
        title: 'Copy the outline into PowerPoint and build from there',
        description:
          "Paste each slide's content into a new slide in PowerPoint. Treat the outline as your working structure: move slides around, cut what doesn't fit, add the visuals and data you already have. The hard part (structure and talking points) is done.",
        list: [
          'Use the slide titles as-is until you have a reason to change them',
          'Replace placeholder bullets with your specific data and examples',
          'Add visuals after the content is locked, not before',
          'Keep the talking points somewhere accessible during rehearsal',
        ],
      },
    ],
    nextLink: {
      label: 'Improve existing PowerPoint slides with Claude',
      href: '/for-microsoft/improve-powerpoint-slides-with-claude',
    },
    availableRoutes: ['powerpoint'],
  },

  'improve-powerpoint-slides-with-claude': {
    title: 'Improve and Sharpen Your PowerPoint Slides with Claude',
    slug: 'improve-powerpoint-slides-with-claude',
    duration: '10 min',
    difficulty: 'intermediate',
    description:
      "Paste your slide content into Claude and get sharper headlines, tighter bullet points, and a cleaner narrative flow through the deck.",
    intro:
      "A deck that feels off usually has one of three problems: slide headlines that describe instead of communicate, bullet points that list facts instead of making an argument, or a sequence that loses the audience before the end. Claude can find all three.",
    situation: {
      scene:
        "You've built the deck but something isn't clicking. The slides feel dense, the narrative isn't clear, and you've been too close to it to see the problems.",
      outcome:
        "After this guide you'll have a sharpened deck and a fresh way to look at slide structure you can use forever.",
    },
    outcomes: [
      'Sharper slide headlines that communicate faster',
      'Bullet points rewritten as insights, not lists',
      'A cleaner narrative arc through the whole deck',
    ],
    promptContrast: {
      bad: 'improve my slides [paste all text]',
      good: `I'm going to paste my slides one at a time. For each slide, give me:
1) A punchier headline under 8 words.
2) The bullet points rewritten to start with the "so what," not the fact.
3) One flag if this slide should be cut or merged.

Here's slide 1: [paste slide 1 text]`,
      why: "One slide at a time keeps Claude focused and gives you output you can actually act on, slide by slide.",
    },
    steps: [
      {
        title: 'Copy your slide text and decide your review approach',
        description:
          "Two options. One slide at a time for surgical edits on each individual slide. All slides at once for high-level narrative flow feedback first. Both work. Choose based on whether you know the structure is right (slide by slide) or whether you are unsure the structure is right (all at once first).",
        list: [
          'Structure unsure: paste all slide titles plus bullet points together, ask for narrative flow review first',
          'Structure confident: paste slides one at a time with the surgical editing prompt',
          'In both cases: copy only the text. Visuals and formatting do not need to come through.',
        ],
      },
      {
        title: 'Use the one-at-a-time prompt for detailed edits',
        description:
          "The structured prompt above works on any slide. Paste each slide's text in sequence. Claude returns specific rewrite options, not vague suggestions.",
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "I'm going to paste my slides one at a time. For each slide:\n1) A punchier headline under 8 words.\n2) Bullet points rewritten to lead with the \"so what.\"\n3) One flag if this slide should be cut or merged.\n\nSlide 2:\nTitle: \"Overview of Current Customer Acquisition Trends\"\nBullets:\n- Customer acquisition cost has increased by 23% year-over-year\n- Organic search continues to drive the highest conversion rate at 4.2%\n- Paid social has declined as a proportion of total conversions\n- Email remains a consistent acquisition channel",
            },
            {
              role: 'claude',
              text: "Headline option: \"CAC is up 23%, but one channel is holding\"\n(8 words, leads with the tension, sets up the rest of the slide)\n\nBullet rewrites:\n- We're paying 23% more to acquire customers than last year, and it's not spread evenly across channels\n- Organic search is our best-performing channel at 4.2% conversion: it costs nothing per click and converts better than anything we pay for\n- Paid social is declining as a conversion source. Worth reviewing budget allocation here.\n- Email is consistent. Not growing, but reliable enough to protect.\n\nFlag: This slide is doing two jobs: showing that CAC is rising AND showing which channels are working. Consider splitting into two slides if this is a strategic discussion, or cutting the email bullet if you need to tighten.",
              delay: 1000,
            },
          ],
        },
      },
      {
        title: 'Apply rewrites to your deck',
        description:
          "Copy each revised headline and bullet point directly into PowerPoint. You do not have to accept every change. Accept the ones that are clearly sharper. Leave the ones that lose something specific you put there intentionally.",
        list: [
          'Update headlines first: they change how the audience reads every bullet below them',
          'Rewrite bullets to lead with the implication, not the data',
          'Cut anything flagged for removal unless you have a specific reason to keep it',
          'Read the deck start to finish after applying edits to check the flow',
        ],
      },
      {
        title: 'Final check: ask Claude whether the deck has a clear arc',
        description:
          "After you've applied individual slide edits, paste all the slide titles in order and ask Claude one question. This catches the narrative problem that slide-by-slide editing misses.",
        list: [
          '"Here are my slide titles in order. Does this deck have a clear beginning, middle, and end?"',
          '"Where does the audience lose the thread?"',
          '"What is the deck arguing for? Is that clear by slide 3?"',
        ],
      },
    ],
    nextLink: {
      label: 'Back to all Microsoft guides',
      href: '/for-microsoft',
    },
    availableRoutes: ['powerpoint'],
  },

  'draft-outlook-emails-with-claude': {
    title: 'Draft Outlook Emails Faster with Claude',
    slug: 'draft-outlook-emails-with-claude',
    duration: '5 min',
    difficulty: 'beginner',
    description:
      'Get a polished Outlook email draft in under 60 seconds. Open Claude.ai alongside Outlook and stop rewriting the same email three times.',
    intro:
      "The emails people avoid writing are not the long ones. They are the ones where the situation is delicate, the relationship matters, or you are not sure how to phrase something without it landing wrong. Claude is good at exactly this.",
    situation: {
      scene:
        "There's an email you've been avoiding because you're not sure how to handle it diplomatically, or you just can't find the words.",
      outcome:
        "After this guide you'll have a 60-second email drafting workflow and you'll never stare at a blank compose window again.",
    },
    outcomes: [
      'Any email drafted in under a minute',
      'The right tone for any situation: from difficult conversations to sensitive requests',
      'A process that scales to every inbox situation you will ever face',
    ],
    promptContrast: {
      bad: 'write a work email',
      good: "I need to email my team about pushing our project deadline by two weeks. Reason: a key stakeholder gave us late feedback that requires significant rework. I want to: acknowledge the delay honestly, explain without making excuses, give the new timeline, and express confidence we'll deliver quality work. Tone: direct and reassuring. Under 200 words.",
      why: "Context makes the difference between a template and an actual email. The more you tell Claude about the situation, the less it sounds like everyone else.",
    },
    steps: [
      {
        title: 'Open Claude.ai in a tab alongside Outlook',
        description:
          'Go to claude.ai in your browser. Keep Outlook (web or desktop) open at the same time. You will move between the two once: Claude to drafting, Outlook to composing. The workflow is: brief Claude, copy the draft, paste and send.',
      },
      {
        title: 'Describe the email with enough context for Claude to get the tone right',
        description:
          "Five pieces of context turn a generic draft into one that sounds like you wrote it. You do not need all five for a simple email, but they all matter for anything sensitive.",
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "I need to email my manager asking for feedback on my performance review draft before the formal submission deadline next week. Context: I submitted a draft three weeks ago and haven't heard back. I want to ask again without sounding impatient or like I'm putting pressure on her. She's been visibly busy with a product launch. Tone: casual but professional. Under 100 words.",
            },
            {
              role: 'claude',
              text: "Subject: Performance review, any early thoughts?\n\nHi [Name],\n\nI know this has been a hectic few weeks with the launch, hope it's going well.\n\nWhen you have a moment, I'd love any quick thoughts on the performance review draft I sent over. Even a few pointers before the formal submission would be really helpful.\n\nHappy to work around your schedule.\n\n[Your name]\n\n---\nNote: I kept this deliberately short and gave her an easy out (\"when you have a moment\"). The subject line is casual and signals it's a low-pressure ask. If you want a slightly more formal version, let me know.",
              delay: 900,
            },
          ],
        },
        list: [
          'Who you are writing to and your relationship with them',
          'What the situation is: what happened, what you need them to know or do',
          'What tone you want: formal, casual, direct, diplomatic',
          'Any constraint on length or format',
          'What outcome you want: a reply, an action, acknowledgment',
        ],
      },
      {
        title: "Copy the draft and paste it into Outlook",
        description:
          "Select all of Claude's draft output, copy it, open a new compose window in Outlook, and paste. The subject line and body should land cleanly as plain text. Adjust the greeting to match your actual relationship with the recipient.",
        list: [
          'Replace [Name] with the actual name',
          'Adjust the greeting warmth if Claude got it slightly off',
          'Check the sign-off matches how you normally end emails to this person',
          'Read the whole thing once before you send it',
        ],
      },
      {
        title: "Always read it before sending: Claude writes the draft, you write the email",
        description:
          "Claude does not know the full history of your relationship with this person. It does not know the subtext. It does not know that the last time you asked this question it went badly. Read the draft as yourself and adjust anything that does not fit the actual situation. A 10-second read is always worth it.",
        list: [
          'Does this sound like you, or does it sound like a template?',
          "Is anything in there that could be misread given context Claude doesn't have?",
          'Is the tone right for this specific relationship?',
          'Did you say what you actually need, clearly enough that the recipient knows what to do?',
        ],
      },
    ],
    nextLink: {
      label: 'Write faster in Word with Claude',
      href: '/for-microsoft/write-faster-in-word-with-claude',
    },
    availableRoutes: ['word'],
  },
};
