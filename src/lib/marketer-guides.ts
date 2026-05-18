export type MarketerRoute = 'content' | 'campaigns' | 'strategy';

export interface MarketerGuideStep {
  title: string;
  description: string;
  list?: string[];
  code?: { snippet: string; language?: string };
  appDemo?: { steps: Array<{ role: 'user' | 'claude'; text: string; delay?: number }> };
}

export interface MarketerGuide {
  title: string;
  slug: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate';
  description: string;
  intro: string;
  situation?: { scene: string; outcome: string };
  outcomes?: string[];
  promptContrast?: { bad: string; good: string; why?: string };
  steps: MarketerGuideStep[];
  nextLink: { label: string; href: string };
  availableRoutes?: MarketerRoute[];
}

export const MARKETER_GUIDES: Record<string, MarketerGuide> = {
  'give-claude-your-brand-voice': {
    title: 'Give Claude Your Brand Voice',
    slug: 'give-claude-your-brand-voice',
    duration: '10 min',
    difficulty: 'beginner',
    description:
      'Train Claude to write in your brand\'s tone so every output sounds like you, not like a chatbot.',
    intro:
      'Claude writes in its default voice until you show it yours. This guide walks you through creating a brand voice prompt you paste at the start of any session, so every draft needs less editing.',
    situation: {
      scene:
        'Every piece of Claude\'s output sounds the same. Generic. Clean. Forgettable. Not you.',
      outcome:
        'After this guide Claude will write in your brand voice, and everything it produces will need far less editing.',
    },
    outcomes: [
      'A brand voice prompt you can paste into any Claude session',
      'Output that sounds like your brand, not a template',
      'Less editing on every piece Claude writes for you',
    ],
    promptContrast: {
      bad: 'write a LinkedIn post about our new product launch',
      good: 'Here is our brand voice guide: [paste voice guide]. Here are three examples of our best-performing LinkedIn posts: [paste examples]. Now write a LinkedIn post announcing our new product launch. Key message: [describe launch]. Target audience: [describe audience]. Keep it under 200 words and match the voice of the examples exactly.',
      why: "Claude learns your voice from examples, not from adjectives like 'professional but friendly.' Real samples always beat descriptions.",
    },
    steps: [
      {
        title: 'Collect 3 to 5 pieces of your best existing content',
        description:
          'Pull the content that feels most on-brand: a LinkedIn post that got strong engagement, an email your team was proud of, a product page section that nails your tone. These become Claude\'s training samples. Quality matters more than quantity. Three great examples beat ten mediocre ones.',
      },
      {
        title: 'Identify what makes them sound like you',
        description:
          'Read the pieces back to back and ask: what do they have in common? Look at sentence length (short and punchy or longer and considered?), formality (do you use contractions? slang?), use of humour (dry wit, none, or playful?), and how you make claims (direct assertions or qualified statements?). Write down 4 to 6 specific observations.',
      },
      {
        title: 'Write a brief voice summary',
        description:
          'Turn your observations into 3 to 4 sentences that describe the voice, including what to avoid. Example: "Our voice is direct and confident without being arrogant. We use short sentences and avoid corporate jargon. We occasionally use dry humour but never at the expense of clarity. We do not use exclamation marks." The "what to avoid" line is as important as what to include.',
      },
      {
        title: 'Create your brand voice prompt template',
        description:
          'Combine the voice summary, your sample content, and the task into one prompt block. The structure: voice guide first, then examples, then the specific ask. Claude needs all three to write in your voice rather than defaulting to its own.',
        appDemo: {
          steps: [
            {
              role: 'user',
              text: 'Here is our brand voice guide: Our voice is direct and confident without being arrogant. We use short sentences and avoid corporate jargon. We occasionally use dry humour but never at the expense of clarity. We do not use exclamation marks.\n\nHere are two examples of our best LinkedIn posts:\n[Example 1: "Most project management software is designed for the tool, not the team. We built Notion differently."]\n[Example 2: "We shipped 47 updates last quarter. Your team noticed 3 of them. That\'s by design."]\n\nNow write a LinkedIn post announcing our new AI-powered reporting feature. Key message: board-ready reports in one click. Target audience: Operations Managers at mid-market B2B companies. Under 180 words.',
            },
            {
              role: 'claude',
              text: 'Here is a draft matching your voice:\n\nBoard reports used to take half a day.\n\nNot because the data was hard to find. Because formatting it was a full-time job.\n\nWe changed that. Our new reporting feature turns your raw data into board-ready slides in one click. No Excel gymnastics. No manual formatting. No Sunday night dread.\n\nOperations teams at companies like [yours] are running their first board report in under 10 minutes.\n\nThe feature is live. If you want to see it in action, the link is in the comments.\n\n---\n\nTwo alternative angles if you want something more direct or more data-led, just say the word.',
              delay: 800,
            },
          ],
        },
      },
      {
        title: 'Save this as a reusable template',
        description:
          'Create a Claude Project and paste your brand voice prompt into the Project Instructions field. Every new conversation in that project starts with Claude already knowing your voice. Alternatively, save the prompt in a notes app or doc you can copy from at the start of any session. This is the one setup that compounds: every piece Claude writes for you gets better without any extra effort.',
      },
    ],
    nextLink: {
      label: 'Write social media posts with Claude',
      href: '/for-marketers/write-social-media-posts-with-claude',
    },
  },

  'write-social-media-posts-with-claude': {
    title: 'Write Social Media Posts with Claude',
    slug: 'write-social-media-posts-with-claude',
    duration: '5 min',
    difficulty: 'beginner',
    description:
      'Generate LinkedIn, Twitter/X, and Instagram posts that sound human, get engagement, and stay on brand.',
    intro:
      'Social drafting should take 5 minutes, not 45. Claude gets you there if you brief it with your angle, not just your topic.',
    situation: {
      scene:
        'The content calendar has 15 posts due this week. You have ideas but not words.',
      outcome:
        'After this guide you\'ll have a social media drafting process that\'s faster than writing from scratch and produces better first drafts.',
    },
    outcomes: [
      'A drafting process for any social platform in under 2 minutes',
      'Posts that require editing, not rewrites',
      'A consistent output rate that keeps your calendar full',
    ],
    promptContrast: {
      bad: 'write a LinkedIn post about AI in marketing',
      good: 'Write a LinkedIn post sharing an insight about AI in marketing. My take: most marketers are using AI wrong by focusing on volume instead of quality. Target audience: marketing managers and directors at B2B SaaS companies. Tone: direct and slightly contrarian, like a practitioner sharing a hard-won lesson. End with a question that invites comments. Under 180 words. No hashtags. No generic opener like "In today\'s world..."',
      why: 'Platform, audience, your specific angle, tone, format constraints, and what to avoid gives Claude enough to write a post you won\'t immediately delete.',
    },
    steps: [
      {
        title: 'Start with your angle, not the topic',
        description:
          'The topic is "AI in marketing." The angle is "most marketers are doing it wrong by chasing volume." The angle is what makes the post worth reading. Before you open Claude, write one sentence: "My specific take on this is: [...]." If you can\'t fill that in, the post isn\'t ready to write yet.',
      },
      {
        title: 'Specify platform and format constraints',
        description:
          'Tell Claude the platform, the character or word limit, whether you want hashtags, and how the post should be structured. LinkedIn tolerates longer posts with line breaks; Twitter/X needs each sentence to earn its place; Instagram leads with a hook before the caption. These conventions are different. Claude needs to know which one it\'s writing for.',
      },
      {
        title: 'Ask for 3 variations',
        description:
          'Always request 3 options rather than 1. Ask for variations in structure or tone, not just word choices. One punchy, one more considered, one that leads with a question. You\'ll pick the one that feels most natural and often discover the approach you hadn\'t thought of.',
        appDemo: {
          steps: [
            {
              role: 'user',
              text: 'Write 3 LinkedIn post variations about why most marketers are using AI wrong by chasing volume instead of quality. My audience is marketing directors and managers at B2B SaaS companies. Tone: direct and slightly contrarian. End each with a question that invites comments. Under 180 words each. No hashtags. No generic openers.',
            },
            {
              role: 'claude',
              text: 'Here are three variations:\n\n**Variation 1 (Direct assertion)**\nAI didn\'t make content marketing harder. Marketers did.\n\nThe tools got faster, so the output tripled. The strategy didn\'t. Now most teams are producing three times the content to get the same results, because reach without relevance is just noise at scale.\n\nThe marketers winning with AI aren\'t publishing more. They\'re publishing better. One piece that actually answers a buyer question beats ten that fill the calendar.\n\nWhat\'s your ratio looking like right now?\n\n---\n\n**Variation 2 (Story-led)**\n...\n\n**Variation 3 (Question-led)**\n...',
              delay: 600,
            },
          ],
        },
      },
      {
        title: 'Test the hook before you publish',
        description:
          'Paste just the first line of your chosen post into a new Claude message and ask: "Would you stop scrolling for this?" Claude will tell you honestly if the opener is weak. This single check catches more bad posts than any other review step. A post with a weak hook fails before anyone reads the substance.',
      },
    ],
    nextLink: {
      label: 'Write blog posts with Claude',
      href: '/for-marketers/write-blog-posts-with-claude',
    },
  },

  'write-blog-posts-with-claude': {
    title: 'Write Blog Posts with Claude',
    slug: 'write-blog-posts-with-claude',
    duration: '15 min',
    difficulty: 'intermediate',
    description:
      'Go from topic and brief to a full first draft. Use Claude as your co-writer, not a replacement for thinking.',
    intro:
      'Claude cannot write a blog post worth reading from a topic alone. It needs a brief. This guide shows you how to write that brief so the first draft is something you\'re proud to edit, not embarrassed to read.',
    situation: {
      scene:
        'The brief is approved. The keyword is picked. The draft is due Thursday and it\'s still blank.',
      outcome:
        'After this guide you\'ll have a process that turns a brief into a draft you\'re proud to edit, not embarrassed to read.',
    },
    outcomes: [
      'A complete first draft from a brief in under 20 minutes',
      'A blog post structure that works for any topic',
      'A co-writing workflow you\'ll use for every article',
    ],
    promptContrast: {
      bad: 'write a blog post about content marketing trends',
      good: 'Write the first draft of a blog post for our B2B marketing blog. Topic: why most content marketing fails to generate leads. Target keyword: "B2B content strategy." Target reader: Marketing Directors at companies with 50-500 employees who have a content team but aren\'t seeing ROI. Angle: the problem isn\'t content volume, it\'s that content is disconnected from buyer intent. Structure: intro with a provocative stat or claim, 3 core sections with subheadings, concrete examples in each section, conclusion with actionable next steps. Tone: direct, no buzzwords, uses "you" to address the reader. 1,200 words.',
      why: 'A complete brief (audience, angle, structure, tone, word count, keyword) produces a draft that needs editing, not a rewrite.',
    },
    steps: [
      {
        title: 'Write the brief before you open Claude',
        description:
          'The brief is not optional prep work. It is the actual work. Before you type anything into Claude, write down: the topic, your specific angle on it, the target reader (role, company size, pain point), the primary keyword, the structure you want, the tone, and the target word count. If any of these are vague, the draft will be vague. 10 minutes on the brief saves 40 minutes of rewriting.',
      },
      {
        title: 'Ask Claude to generate 5 possible angles first',
        description:
          'Before committing to your angle, ask Claude: "Here is my topic and target audience. Give me 5 different angles I could take for this article, with a one-sentence explanation of what makes each one interesting." You might find a sharper angle than the one you started with. Pick the one that feels most true to what you actually believe, not the most provocative one.',
      },
      {
        title: 'Ask for the outline before the full draft',
        description:
          'Give Claude your full brief and ask for an outline: section headings, one sentence per section explaining what it covers, and the opening hook. Review the outline before you ask for the draft. If a section heading is weak or the structure is wrong, fix it here rather than editing 1,200 words later.',
      },
      {
        title: 'Draft section by section for better quality',
        description:
          'Do not ask Claude to write the full 1,200 words in one pass. Ask for the intro and first section, review it, then continue. This lets you catch tone drift early, steer the argument if it goes off-track, and add your own examples or data before Claude invents ones you\'d have to remove. The extra 10 minutes of oversight produces a noticeably better draft.',
        appDemo: {
          steps: [
            {
              role: 'user',
              text: 'Write the intro and first section of this article. Approved outline:\n\n- Hook: stat or bold claim about content ROI\n- Intro: the disconnect between content volume and lead generation\n- Section 1: Why most content is written for search engines, not buyers\n- [2 more sections follow]\n\nTone: direct, no buzzwords, addresses the reader as "you." Target keyword: B2B content strategy. 350 words for intro + section 1.',
            },
            {
              role: 'claude',
              text: 'Here is the intro and first section:\n\n**Why Most B2B Content Doesn\'t Generate Leads (And What to Do Instead)**\n\n70% of B2B buyers consume 3 to 5 pieces of content before talking to a salesperson. Most of them never find yours.\n\nNot because you\'re not publishing. Most marketing teams are publishing more than ever. The problem is that the content is optimised for search rankings, not buyer decisions.\n\n**Section 1: The Search Engine Trap**\n\nHere\'s what happens in most B2B content teams...',
              delay: 700,
            },
          ],
        },
      },
      {
        title: 'Ask Claude to generate 5 title options',
        description:
          'Never use the title you started with. Once the draft is done, paste it back to Claude and ask: "Generate 5 title options for this article. Prioritise search intent and clarity over cleverness. Include the target keyword in at least 3 of the 5." Pick the one that most clearly matches what the article actually delivers and what a reader would type into Google.',
      },
    ],
    nextLink: {
      label: 'Write email campaigns with Claude',
      href: '/for-marketers/write-email-campaigns-with-claude',
    },
  },

  'write-email-campaigns-with-claude': {
    title: 'Write Email Campaigns with Claude',
    slug: 'write-email-campaigns-with-claude',
    duration: '10 min',
    difficulty: 'beginner',
    description:
      'Draft subject lines, preview text, and email body copy for any campaign. From nurture sequences to product launches.',
    intro:
      'Email copy stalls when you try to write everything at once. Claude handles it better when you give it a campaign brief and ask for each element separately.',
    situation: {
      scene:
        'The email campaign needs to go out next week and you have a campaign brief but no copy.',
      outcome:
        'After this guide you\'ll have a full campaign draft including subject lines, body copy, and CTAs ready to drop into your ESP.',
    },
    outcomes: [
      'Subject lines that get tested, not agonised over',
      'Email body copy in your brand voice from a brief',
      'A full multi-email sequence from one session',
    ],
    promptContrast: {
      bad: 'write a marketing email about our new feature',
      good: 'Write a promotional email announcing our new AI-powered reporting feature. Audience: existing customers who are on our Pro plan and regularly use our analytics dashboard. Goal: get them to try the new feature within 7 days. Key message: they can now generate board-ready reports in one click instead of spending 2 hours in Excel. Structure: subject line + preview text (5 options each), opening that references their current pain, 3-bullet feature benefit section, single CTA button text and surrounding sentence, sign-off. Tone: warm and enthusiastic but not over-the-top. 300 words max for the body.',
      why: 'Audience segment, their current behaviour, the goal, the key message, the structure, and the CTA. That is a campaign brief Claude can actually work with.',
    },
    steps: [
      {
        title: 'Write the campaign brief first',
        description:
          'Before asking Claude to write anything, answer four questions: Who is receiving this email (not "our customers" but "Pro plan customers who use analytics weekly")? What is the offer or message? What action do you want them to take? What is the one value proposition that matters to this audience right now? These four answers are your brief. Claude writes from the brief, not from telepathy.',
      },
      {
        title: 'Always ask for 5 subject line options',
        description:
          'Never use the first subject line. Ask for 5 options with different approaches: one curiosity-driven, one direct benefit, one that references a specific pain point, one with a number, one that calls out the audience directly. Pick the best one based on your list\'s history, not just what sounds good. Test two if your platform supports it.',
        appDemo: {
          steps: [
            {
              role: 'user',
              text: 'Write 5 subject line options and 5 preview text options for this email. Audience: existing Pro plan customers who use our analytics dashboard. Goal: get them to try the new one-click reporting feature. Key message: board-ready reports in one click, no more Excel. Keep subject lines under 50 characters. Preview text under 90 characters.',
            },
            {
              role: 'claude',
              text: 'Subject lines:\n1. Your board report just got shorter\n2. One click. Board-ready report. No Excel.\n3. Stop spending Sundays in spreadsheets\n4. New: reports your board will actually read\n5. Your analytics just got an upgrade\n\nPreview text options:\n1. Generate a complete board report from your dashboard in under 60 seconds.\n2. The 2-hour Excel job is now a one-click export. Here\'s how to try it.\n3. New reporting feature is live. Your next board meeting just got easier.\n4. Turn your analytics data into a board presentation. One click.\n5. Pro plan perk: board-ready reports, no formatting required.',
              delay: 500,
            },
          ],
        },
      },
      {
        title: 'Ask for the full sequence, not just one email',
        description:
          'A campaign is rarely one email. Ask Claude to write the sequence at once: email 1 (announce), email 2 (value reminder for non-openers, 3 days later), email 3 (last chance or social proof, 5 days later). Briefing all three together keeps the narrative consistent and saves you from three separate sessions.',
      },
      {
        title: 'A/B test the opening line',
        description:
          'Ask Claude to write two versions of the first two sentences of the email body using different approaches. One that opens with the pain point, one that opens with the outcome. Your open rate gets determined by the subject line. Your click-through rate gets determined by the first 20 words. This one step improves the click-through rate more than any other edit.',
      },
    ],
    nextLink: {
      label: 'Write ad copy with Claude',
      href: '/for-marketers/write-ad-copy-with-claude',
    },
  },

  'write-ad-copy-with-claude': {
    title: 'Write Ad Copy with Claude',
    slug: 'write-ad-copy-with-claude',
    duration: '10 min',
    difficulty: 'intermediate',
    description:
      'Generate Google Ads headlines, Facebook ad copy, and landing page headers. Test more variations in less time.',
    intro:
      'Ad copy fails when it ignores funnel stage. Claude generates the right kind of copy for where the audience is in the buying journey, if you tell it where that is.',
    situation: {
      scene:
        'The campaign goes live next week and you need 5 ad variations for A/B testing and you\'re staring at a blank doc.',
      outcome:
        'After this guide you\'ll have more ad copy variations in 10 minutes than most people write in a day.',
    },
    outcomes: [
      'Multiple ad variations ready for A/B testing',
      'Copy matched to the right funnel stage',
      'Google Ads and Meta-ready character counts met without counting manually',
    ],
    promptContrast: {
      bad: 'write Facebook ad copy for our software',
      good: 'Write 3 Facebook ad variations for our project management software targeting Operations Managers at companies with 100-500 employees. These are cold-audience ads (awareness stage). Pain point we\'re addressing: too many tools causing team confusion and missed deadlines. Format for each variation: Primary text (125 chars max), Headline (40 chars max), Description (30 chars max). Voice: straightforward and empathetic, not hype-y. Avoid words like "revolutionary" or "game-changing."',
      why: 'Stage of funnel (awareness), platform (Facebook), character limits, and what to avoid. Those three inputs alone dramatically improve the output.',
    },
    steps: [
      {
        title: 'Identify funnel stage before you write anything',
        description:
          'Awareness (cold): The audience does not know your product. Lead with the problem. Consideration (warm): The audience knows the problem and is comparing options. Lead with differentiation. Conversion (retargeting): The audience has been to your site or started a trial. Lead with the specific objection or incentive. Funnel stage changes everything. The same product with the same audience needs a completely different ad depending on where they are.',
      },
      {
        title: 'Give Claude the character limits for the specific platform',
        description:
          'Google Ads: 30 characters per headline, 90 characters per description. Meta (Facebook/Instagram): 125 characters primary text, 40 characters headline, 30 characters description. LinkedIn: 150 characters introductory text, 70 characters headline. Paste the limits into your prompt. Claude will respect them without you having to count.',
        appDemo: {
          steps: [
            {
              role: 'user',
              text: 'Write 5 Google Ads headline variations and 3 description variations for our project management tool. Target audience: Operations Managers at mid-market B2B companies. Funnel stage: consideration (they\'re actively comparing tools). Key differentiator: we replace 3 tools with one. Character limits: headlines 30 chars max, descriptions 90 chars max. Avoid "all-in-one" as a phrase.',
            },
            {
              role: 'claude',
              text: 'Headlines (under 30 chars):\n1. Replace 3 Tools With One\n2. One Tool. Zero Chaos.\n3. Simplify Your Stack Today\n4. Operations Without the Overlap\n5. Cut the Tool Sprawl Now\n\nDescriptions (under 90 chars):\n1. Stop switching between apps. Manage projects, comms, and reporting in one place. Free trial.\n2. Operations teams at 200+ companies dropped 3 tools after switching. See why.\n3. One platform for projects, tasks, and reporting. 14-day free trial, no credit card needed.',
              delay: 500,
            },
          ],
        },
      },
      {
        title: 'Always ask for 3 to 5 variations',
        description:
          'Do not go live with one version. Request variations and test what you did not expect to work. The ad that sounds too direct or too plain often outperforms the clever one. Claude can generate 5 variations in seconds. Your media budget deserves 5 options, not 1.',
      },
      {
        title: 'Ask Claude to evaluate its own output',
        description:
          'After generating the variations, ask: "Which of these would you click and why? Which one is weakest and why?" Claude will often catch a weak hook or a claim that does not land. This takes 30 seconds and frequently surfaces the real problem before it goes into your ad account.',
      },
    ],
    nextLink: {
      label: 'Repurpose content with Claude',
      href: '/for-marketers/repurpose-content-with-claude',
    },
  },

  'repurpose-content-with-claude': {
    title: 'Repurpose Content with Claude',
    slug: 'repurpose-content-with-claude',
    duration: '10 min',
    difficulty: 'beginner',
    description:
      'Turn one piece of content into five. Blog to LinkedIn to email to Twitter thread to video script. One prompt per format.',
    intro:
      'Most content is published once and forgotten. Claude can turn a good piece of content into a full week of channel-specific formats in one session.',
    situation: {
      scene:
        'You just published a good blog post. It took 4 hours. It\'ll get read by 200 people and never surface again.',
      outcome:
        'After this guide, one blog post becomes a week of content across every channel.',
    },
    outcomes: [
      'One piece of content turned into 5 to 6 channel-specific formats',
      'Less time creating, more consistency publishing',
      'A repurposing workflow you run after every major piece',
    ],
    promptContrast: {
      bad: 'turn this blog post into social media posts',
      good: 'Here is a blog post I wrote: [paste post]. Repurpose it into: 1) A LinkedIn article (600 words, keep the key arguments but optimise for LinkedIn\'s reader who skims), 2) A LinkedIn post teasing the article (150 words, hooks readers without giving away the conclusion), 3) A Twitter/X thread (8 tweets, each tweet a standalone insight), 4) An email to our newsletter list introducing the article (200 words, personal tone like I\'m talking to one person), 5) A 90-second video script summarising the main point for a short-form video.',
      why: 'The target format matters. LinkedIn reads differently to Twitter. Email reads differently to a blog. Claude needs the format specified to match the convention.',
    },
    steps: [
      {
        title: 'Start with hero content worth repurposing',
        description:
          'Repurposing works when the source material has substance: a long blog post with a clear argument, a podcast transcript with real insights, a detailed report with data. Repurposing a thin 400-word post produces thin social content. Before you run the repurpose workflow, check that the source piece actually has 5 or 6 ideas worth extracting. If not, strengthen the source first.',
      },
      {
        title: 'Run the full repurpose prompt in one pass',
        description:
          'Paste the source content and request all formats in one message. Specify the platform, the word or character count, and the job each format needs to do. Claude will produce all 5 formats in one output, which you can then review and edit rather than generating each one separately.',
        appDemo: {
          steps: [
            {
              role: 'user',
              text: 'Here is a blog post I wrote: [1,200-word post about why B2B content fails to generate leads].\n\nRepurpose it into:\n1. LinkedIn article (600 words, skimmable with subheadings, optimised for LinkedIn readers)\n2. LinkedIn post teasing the article (150 words, hook without giving away the conclusion)\n3. Twitter/X thread (8 tweets, each one a standalone insight from the post)\n4. Email to our newsletter list introducing the article (200 words, personal tone, first-person)\n5. 90-second video script (key point only, conversational, no jargon)',
            },
            {
              role: 'claude',
              text: '**1. LinkedIn Article (600 words)**\n\nWhy Your Content Team Is Busy and Your Pipeline Is Empty\n\nMost B2B marketing teams are publishing more content than ever. Most of them are seeing less pipeline from it than two years ago...\n\n---\n\n**2. LinkedIn Post (150 words)**\n\nWe spent a year publishing 3 articles a week.\n\nOrganic traffic went up. Pipeline stayed flat.\n\nThe problem wasn\'t the content. It was where in the funnel it sat...\n\n---\n\n**3. Twitter/X Thread (8 tweets)**\n\nTweet 1: Most B2B content fails at the same point. Not at distribution. Not at SEO. At buyer intent.\n\nTweet 2: Here\'s the pattern I see over and over...',
              delay: 800,
            },
          ],
        },
      },
      {
        title: 'Review for tone drift across channels',
        description:
          'Read all 5 formats back to back. If the Twitter thread sounds like a blog post, or the email sounds like a press release, ask Claude to adjust the tone: "The Twitter thread sounds too formal. Rewrite it to be more casual and direct, like a practitioner sharing a quick observation." Each channel has a different register. Tone drift is the most common repurposing failure.',
      },
      {
        title: 'Batch this weekly',
        description:
          'Build repurposing into the weekly publishing rhythm. Publish the hero piece on Monday. Repurpose on Tuesday. Schedule the remaining formats for the rest of the week. One session produces a full week of content. The alternative is spending a full week producing the same amount of content from scratch.',
      },
    ],
    nextLink: {
      label: 'Do market research with Claude',
      href: '/for-marketers/do-market-research-with-claude',
    },
  },

  'do-market-research-with-claude': {
    title: 'Do Market Research with Claude',
    slug: 'do-market-research-with-claude',
    duration: '15 min',
    difficulty: 'intermediate',
    description:
      'Use Claude for competitive analysis, customer persona research, and market landscape summaries. Faster first-pass research before you go to primary sources.',
    intro:
      'Claude is a useful research starting point, not a research endpoint. This guide shows you how to use it to generate hypotheses and frameworks fast, then validate them with current primary sources.',
    situation: {
      scene:
        'You need a competitive landscape summary for a new campaign and you have 2 hours, not 2 weeks.',
      outcome:
        'After this guide you\'ll have a market research workflow that gives you a solid first draft to validate, not a starting point of nothing.',
    },
    outcomes: [
      'A competitive landscape in under 30 minutes',
      'Customer persona drafts to validate with real data',
      'Research hypotheses to test, not just open questions',
    ],
    promptContrast: {
      bad: 'research the project management software market',
      good: 'I\'m launching a campaign for a project management tool targeting Operations teams at mid-market B2B companies. Give me: 1) The top 5 competitors in this space with their positioning and what they emphasise in their marketing. 2) The three most common pain points Operations teams report when evaluating project management tools (based on what you know from public reviews and forums). 3) The language and phrases Operations Managers tend to use when describing these problems. 4) Three positioning angles our campaign could take that aren\'t already saturated in the market.',
      why: 'A specific segment (Operations teams, mid-market B2B) and a clear deliverable (positioning angles, not just "information") turns Claude into a useful starting point rather than a rambling overview.',
    },
    steps: [
      {
        title: 'Ask for market overview first',
        description:
          'Start with the landscape: who are the main players and how do they position themselves? Ask Claude to give you each competitor\'s primary positioning in one sentence, and what they emphasise in their marketing (price, ease of use, integrations, enterprise features, etc.). This tells you where the space is crowded and where the gaps are.',
      },
      {
        title: 'Ask for customer language directly',
        description:
          'The most useful output Claude can give a marketer is the language real customers use. Ask: "What words and phrases do [target audience] tend to use in reviews and forum posts when describing this problem?" That language feeds your copy, your landing page, and your ad creative directly. People click on ads that use their own words back to them.',
        appDemo: {
          steps: [
            {
              role: 'user',
              text: 'What language and phrases do Operations Managers at mid-market B2B companies tend to use in reviews and forums when describing frustrations with project management tools? Give me the specific words and phrases, not a summary.',
            },
            {
              role: 'claude',
              text: 'Based on patterns from public review sites and forums, Operations Managers in this segment commonly use:\n\nFor tool overload: "too many tabs open," "tool sprawl," "living in 4 different apps," "nothing talks to each other"\n\nFor visibility problems: "I never know what\'s actually done," "status updates are always wrong," "nobody updates the project board"\n\nFor adoption failure: "the team stops using it after week 2," "too complicated for the ops team," "IT loves it, ops hates it"\n\nFor accountability gaps: "things fall through the cracks," "unclear who owns what," "no single source of truth"\n\nThese phrases tend to appear in G2 and Capterra reviews from 2022-2024. Validate currency with current reviews before using in copy.',
              delay: 700,
            },
          ],
        },
      },
      {
        title: 'Ask for gaps and positioning opportunities',
        description:
          'Once you have the landscape and the customer language, ask: "Based on how the top competitors position themselves, what pain points are they NOT addressing in their marketing? Where is there a gap in how this market is being spoken to?" This generates positioning angles your campaign can own rather than fighting for crowded territory.',
      },
      {
        title: 'Validate everything with current primary sources',
        description:
          'Claude\'s knowledge has a cutoff date. Use this output as hypotheses, not facts. Before you put anything into a campaign brief, check it against current G2 or Capterra reviews, recent Reddit or LinkedIn threads from your target audience, and any customer interviews you can run. Claude gives you a fast starting framework. Primary research tells you if it\'s still true.',
      },
    ],
    nextLink: {
      label: 'Back to all marketer guides',
      href: '/for-marketers',
    },
  },
};
