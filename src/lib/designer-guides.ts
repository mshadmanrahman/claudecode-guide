import type { DesignerRoute } from '@/components/designer-route-switcher';

export interface DesignerGuideStep {
  title: string;
  description: string;
  list?: string[];
  code?: { snippet: string; language?: string };
  demo?: {
    title?: string;
    steps: Array<{ type: 'cmd' | 'out' | 'success' | 'warn' | 'error'; text: string; delay?: number }>;
  };
  appDemo?: { steps: Array<{ role: 'user' | 'claude'; text: string; delay?: number }> };
  ideDemo?: { steps: Array<{ role: 'user' | 'claude'; text: string; delay?: number }> };
}

export interface DesignerGuideContrast {
  bad: string;
  good: string;
  why: string;
}

export interface DesignerGuideSituation {
  scene: string;
  outcome: string;
}

export interface DesignerGuide {
  title: string;
  slug: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate';
  description: string;
  intro: string;
  situation?: DesignerGuideSituation;
  outcomes?: string[];
  promptContrast?: DesignerGuideContrast;
  steps: DesignerGuideStep[];
  nextLink: { label: string; href: string };
  availableRoutes?: DesignerRoute[];
}

export const DESIGNER_GUIDES: Record<string, DesignerGuide> = {
  'set-up-claude': {
    title: 'Set Up Claude for Your Design Work',
    slug: 'set-up-claude',
    duration: '10 min',
    difficulty: 'beginner',
    availableRoutes: ['claude-ai', 'co-work', 'claude-code'],
    description:
      'Give Claude permanent context about your role, your users, and your output preferences. Every session starts already knowing your work.',
    intro:
      'This guide is for UX and UI designers who want Claude to know their work without re-explaining it every session. By the end, you will have a working agreement that loads your role, users, and output preferences automatically. Claude does not know you are a designer until you tell it. Without context, every session starts from scratch: generic answers, generic feedback, generic output. You write the agreement once. Claude reads it every time.',
    situation: {
      scene: 'You have been using Claude like a search engine. You ask a question, get a generic answer, and close the tab. It helps sometimes. But it does not know you are a designer, who you design for, or how you like to receive feedback.',
      outcome: 'Every future Claude session will start already knowing your role, your users, and how you want output delivered. You write it once. It loads every time.',
    },
    outcomes: [
      'A working agreement that tells Claude who you are, who you design for, and how you like to work',
      'The exact template filled with your real context, not a generic placeholder',
      'A test prompt that confirms your agreement is specific enough to produce useful output',
    ],
    steps: [
      {
        title: 'Create your workspace',
        description:
          'Set up the folder or Project that will hold your working agreement. Follow the demo for your journey. CLAUDE.md is a plain text file Claude reads automatically at the start of every session.',
        code: {
          snippet: `# First: confirm Claude Code is installed
# (if you see "command not found", install it at claude.ai/download first)
claude --version

# Then: create your project folder and start Claude Code
mkdir -p ~/my-design-project
cd ~/my-design-project
touch CLAUDE.md
claude`,
          language: 'bash',
        },
        demo: {
          title: 'Create your design workspace',
          steps: [
            { type: 'cmd', text: 'cd ~/my-design-project' },
            { type: 'cmd', text: 'touch CLAUDE.md', delay: 300 },
            { type: 'cmd', text: 'claude', delay: 300 },
            { type: 'out', text: 'Reading CLAUDE.md...', delay: 500 },
            { type: 'warn', text: 'CLAUDE.md is empty. Add your context and it loads every session.' },
            { type: 'success', text: 'Claude Code session started.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I want to set Claude up so it understands my design work every session without me re-explaining. Where do I start?' },
            { role: 'claude', text: 'Start with a Project. Go to the left sidebar, then Projects, then New Project.\n\nName it specifically: "Mobile Banking UX" beats "Design Work."\n\nOnce you are in the project, you will see a Project Instructions field at the top. That is where your working agreement goes. Claude reads it at the start of every conversation in this project. What kind of design work are you doing? I will help you write it.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I want to use Claude Co-Work. How do I set up a local folder so Claude reads my design files automatically?' },
            { role: 'claude', text: 'Create a folder anywhere on your machine for your design project. Name it something specific: "banking-app-ux" is better than "design-work".\n\nInside that folder, create a file called CLAUDE.md at the top level, same level as any briefs or notes you put there. Claude Code reads it at the start of every session in that folder. You do not reference it manually; it just loads.\n\nOnce you have the folder and CLAUDE.md, we will write the working agreement together.' },
          ],
        },
      },
      {
        title: 'Write your working agreement',
        description:
          'Paste this template and fill in your actual details. Generic answers come from generic context. The more specific you are about your users and constraints, the more useful Claude becomes.',
        code: {
          snippet: `# Paste this into Project Instructions (app) or CLAUDE.md (terminal/IDE)

You are assisting a UI/UX designer. Here is the context you need.

ROLE
I am a [junior / mid / senior] UI/UX designer working [at an agency / in-house / freelance].
My day-to-day includes [e.g. mobile app design, dashboard UX, e-commerce checkout flows].

USERS
The people I design for are [describe: e.g. first-time smartphone users on
low-end Android devices in Bangladesh, enterprise procurement managers in Europe].
Key constraints: [e.g. limited data plans, low digital literacy, RTL support].

TOOLS AND WORKFLOW
My primary design tool is [Figma / Adobe XD / Sketch].
I hand off to [developers / a no-code team / build it myself].

OUTPUT RULES
- Write in plain English. Define jargon on first use.
- When I ask for copy, give me 2-3 variants.
- When critiquing my work, be direct. Skip encouragement.
- When I paste a brief, ask clarifying questions before generating anything.
- Flag when a suggestion depends on something you cannot verify.`,
          language: 'markdown',
        },
        demo: {
          title: 'Working agreement saved',
          steps: [
            { type: 'cmd', text: '# Open CLAUDE.md and paste the template' },
            { type: 'out', text: 'ROLE: mid-level designer, fintech app, in-house', delay: 400 },
            { type: 'out', text: 'USERS: low-bandwidth Android, Bangladesh, first-time users' },
            { type: 'out', text: 'TOOLS: Figma, hand off to dev team' },
            { type: 'success', text: 'Saved. Claude reads this at the start of every session.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Here is my working agreement:\n\nROLE: Mid-level UI/UX designer, in-house at a fintech startup in Dhaka.\nUSERS: First-time smartphone users on low-end Android devices. Limited data plans. Low digital literacy.\nTOOLS: Figma. Hand off to a frontend dev team.\nOUTPUT RULES: Be direct. Give 2-3 copy variants. Ask before generating. Flag unverifiable assumptions.' },
            { role: 'claude', text: 'Saved. I will carry this context through every conversation in this project.\n\nA few things now locked in:\n- I will assume Android-first, not iOS parity\n- I will flag anything that requires JS-heavy interaction (low-end device risk)\n- Copy variants will be short-form, low reading level\n- I will ask about affordances before suggesting anything gesture-based\n\nReady whenever you are.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I have pasted the working agreement into CLAUDE.md. Does it look right?' },
            { role: 'claude', text: 'I can see it. A few notes on what I will carry forward:\n\n- "First-time smartphone users on low-end Android" changes how I evaluate interactions. I will flag anything that assumes gesture fluency or fast hardware.\n- "Limited data plans" means I will question heavy image or video recommendations.\n- "Hand off to dev team" means I will frame design decisions in terms developers can act on.\n\nLooks solid. Want to test it with a real prompt?' },
          ],
        },
      },
      {
        title: 'Test it before moving on',
        description:
          'Send this prompt now. If the response feels generic, your USERS section needs more specificity. Iterate until Claude\'s questions feel like they came from a colleague who knows your work.',
        code: {
          snippet: `# Paste this into your Claude session:
I've just been handed a brief. The client wants "a modern, clean app for managing invoices."
What questions should I be asking before I open Figma?`,
          language: 'text',
        },
        demo: {
          title: 'Working agreement in action',
          steps: [
            { type: 'cmd', text: 'claude "I have a brief: modern invoice app. What should I ask before opening Figma?"' },
            { type: 'out', text: 'Reading CLAUDE.md context...', delay: 500 },
            { type: 'out', text: '' },
            { type: 'out', text: 'Before touching Figma:', delay: 300 },
            { type: 'warn', text: '-> Do users receive or send invoices? (or both?)' },
            { type: 'warn', text: '-> What device do they use most? Your users are Android-first.' },
            { type: 'warn', text: '-> Is connectivity reliable when they are invoicing? Offline states?' },
            { type: 'warn', text: '-> What is the literacy level for financial terminology?' },
            { type: 'success', text: 'Context-aware questions. Not generic ones.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I have just been handed a brief. The client wants "a modern, clean app for managing invoices." What questions should I be asking before I open Figma?' },
            { role: 'claude', text: 'Given your users (first-time smartphone users, low-end Android, limited data), here is what I would push back on before touching Figma:\n\n1. Do your users send invoices, receive them, or both? The flow is completely different.\n2. What does "modern" mean to this client? To first-time users, familiar beats modern.\n3. Is there a data connection assumed? Invoice apps often get used on-site where connectivity drops.\n4. What is the expected literacy level for financial terms like "net 30" or "VAT"?\n5. Who approves the invoice on the other end, and do they use the same app?\n\nNotice what is not on this list: color palette, font choices, whether to use cards or lists. Those come later. Get the above answered first.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I have just been handed a brief: "modern, clean invoice management app." What should I ask before opening Figma?' },
            { role: 'claude', text: 'Your CLAUDE.md context changes which questions matter most here.\n\nFor your specific users (low-end Android, low digital literacy, Bangladesh):\n\n- Send or receive invoices? Defines the primary flow entirely.\n- Is connectivity assumed? Offline-first might be table stakes.\n- What financial vocabulary do your users already know? Do not assume "invoice" means the same thing to them.\n- Who else is in the loop? If a shop owner sends and a bank or buyer receives, you have two audiences.\n- What is the failure state? User fills in wrong amount: what happens?\n\nThese are the questions your context actually demands. A designer working on enterprise SaaS would get a completely different list.' },
          ],
        },
      },
      {
        title: 'Keep it under 300 words and update it when context changes',
        description:
          'Most designers find that shorter agreements work as well as longer ones. Beyond 300 words you are likely adding noise rather than signal. Stale context is worse than no context: when you change clients, platforms, or roles, update it. Review your USERS section right now: if it says "general audience" or nothing specific, rewrite it before moving to the next guide.',
        list: [
          'Leaving USERS vague. "General audience" gives Claude no user constraints to apply. Name who they are and what they are trying to do.',
          'Copying someone else\'s template without adapting it to your actual users. The agreement only works if it describes your context, not a generic designer.',
          'Never revisiting it after the first session. When you change clients, platforms, or roles, update it. A stale agreement is worse than none.',
        ],
        appDemo: {
          steps: [
            { role: 'user', text: 'What should I leave out of the working agreement to keep it lean?' },
            { role: 'claude', text: 'Leave out anything Claude can find itself by reading your files or asking.\n\nCut:\n- Company history and background\n- Tools you might use someday but do not\n- Aspirational statements ("produce world-class work")\n- Anything that changes week to week (current client name, sprint goals)\n\nKeep:\n- Your seniority level (changes how much I explain)\n- Your end users: specifically who they are and what constraints they have\n- Platform constraints (mobile-first? RTL? low-bandwidth?)\n- How you want feedback delivered\n\nUnder 300 words is the target. Beyond that you are adding signal noise, not signal.' },
          ],
        },
        demo: {
          steps: [
            { type: 'out', text: 'What to include:', delay: 200 },
            { type: 'success', text: 'Seniority level, user description, platform constraints' },
            { type: 'success', text: 'How you want feedback delivered' },
            { type: 'out', text: '' },
            { type: 'out', text: 'What to cut:' },
            { type: 'warn', text: 'Company history, aspirational statements' },
            { type: 'warn', text: 'Tools you might use someday' },
            { type: 'warn', text: 'Anything that changes week to week' },
            { type: 'out', text: '' },
            { type: 'success', text: 'Target: under 300 words. Update when context changes.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'My agreement is getting long. What can I cut?' },
            { role: 'claude', text: 'Cut anything I can discover by reading your files or that changes frequently.\n\nSafe to remove:\n- Detailed project descriptions (I can read them)\n- Tool-specific config (I can detect Figma vs XD from file references)\n- Sprint goals or current deliverables (stale by next week)\n\nKeep:\n- User constraints I cannot infer (literacy, connectivity, device capability)\n- Your feedback preferences\n- Non-obvious rules ("never suggest gesture-heavy interactions")\n\nIf you are over 300 words, trim the project description first. That is usually the bloat.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Decode any design brief',
      href: '/for-designers/decode-a-brief',
    },
  },

  'decode-a-brief': {
    title: 'Decode Any Design Brief',
    slug: 'decode-a-brief',
    duration: '15 min',
    difficulty: 'beginner',
    availableRoutes: ['claude-ai', 'co-work', 'claude-code'],
    description:
      'A brief is never the real problem. Use Claude to interrogate it like a skeptical PM and surface what is actually being asked for.',
    intro:
      'This guide is for UX and UI designers who receive vague briefs and need to know what is actually being asked before opening Figma. After reading it, you will be able to interrogate any brief with Claude, surface the real problem behind the vague language, and send back a concise list of clarifying questions. Clients hand you briefs that say "modern and clean" and "intuitive and user-friendly." These phrases mean nothing. Behind every vague brief is a real problem: a business pressure, a user frustration, a constraint nobody mentioned. This guide shows you how to use Claude to break open a brief before you touch Figma, so you are solving the right problem from the start. Throughout this guide, PM means product manager: the person who defines requirements and speaks for the business.',
    situation: {
      scene: 'A brief just landed. Three sentences, no data, and the word "modern" used twice. The PM wants wireframes by Friday and has already moved on to the next thing.',
      outcome: 'You\'ll send back a set of sharp clarifying questions before you open Figma, and you\'ll know exactly what problem you\'re actually solving.',
    },
    outcomes: [
      'The vague words in your brief decoded — what each one is actually hiding',
      'The real problem behind the ask, stated in one sentence',
      'Five sharp clarifying questions ready to send before you open Figma',
    ],
    promptContrast: {
      bad: 'Can you help me with this brief? "Redesign the onboarding flow. More modern, cleaner, friendlier."',
      good: 'Interrogate this brief as a skeptical PM. List: undefined terms, missing data, unstated assumptions, and the three questions to send back before designing anything.\n\n"Redesign the onboarding flow. More modern, cleaner, friendlier."',
      why: 'Claude defaults to agreement. "Help me with this" gets encouragement. Giving Claude a role ("skeptical PM") and an output format ("list: undefined terms...") eliminates the default and forces it to push back.',
    },
    steps: [
      {
        title: 'Paste the brief exactly as you received it',
        description:
          'Do not clean it up or interpret it. Paste it raw. The vagueness is the point: that is what Claude is going to interrogate. Then use this prompt to start the interrogation.',
        code: {
          snippet: `# Example brief (paste yours instead):
"We need a redesign of our onboarding flow. It should be more modern,
cleaner, and friendlier. Users keep dropping off and we want to fix that."

# Then send this interrogation prompt:
Interrogate this brief as a skeptical PM. List: undefined terms,
missing data, unstated assumptions, and the three questions to send
back before designing anything.`,
          language: 'text',
        },
        demo: {
          title: 'Paste the raw brief',
          steps: [
            { type: 'cmd', text: 'claude "Interrogate this brief as a skeptical PM: [paste brief]"' },
            { type: 'out', text: 'Reading brief...', delay: 400 },
            { type: 'out', text: 'Identifying vague language...' },
            { type: 'out', text: 'Checking for missing context...' },
            { type: 'success', text: 'Found 4 assumptions, 3 undefined terms, 2 missing data points.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I have just received this brief. Before I start designing, interrogate it as a skeptical PM:\n\n"We need a redesign of our onboarding flow. It should be more modern, cleaner, and friendlier. Users keep dropping off and we want to fix that."' },
            { role: 'claude', text: 'This brief tells me almost nothing about the actual problem. Here is what is missing:\n\nUndefined terms:\n- "Modern": relative to what? To competitors? To the current design?\n- "Cleaner": is clutter the actual complaint, or is this a proxy for confusion?\n- "Friendlier": this usually means the copy is bad, not the layout\n\nMissing data:\n- Where in the onboarding flow are users dropping off? Step 1? Step 5? After email verification?\n- What is the current drop-off rate and what is the target?\n- Have you talked to users who dropped off?\n\nUnstated assumptions:\n- That a visual redesign will fix the drop-off (it might be a technical or copy problem)\n- That all users are dropping off for the same reason\n\nWhat to ask the client before doing anything:\n1. Can you show me the analytics? Where exactly do users leave?\n2. Have you done any user research on why they are leaving?\n3. What does success look like in 3 months? Give me a number.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Interrogate this brief as a skeptical PM before I start designing:\n\n"Redesign the onboarding flow. More modern, cleaner, friendlier. Users keep dropping off."' },
            { role: 'claude', text: 'Red flags before touching Figma:\n\nVague adjectives: "Modern," "cleaner," "friendlier" are unmeasurable. Each hides a real requirement. Ask: modern compared to what? Cleaner how: fewer fields, or less visual noise?\n\nMissing drop-off data: "Users keep dropping off" with no step specified means nobody knows where the real problem is. A redesign might fix the wrong screen entirely.\n\nNo success metric: without a target (drop-off rate, completion rate, time-to-first-action), you have no way to know if the redesign worked.\n\nThree questions to send back before you open Figma:\n1. Where exactly is the drop-off? Share the analytics.\n2. What does a successful redesign look like in numbers?\n3. Has anyone spoken to users who left? What did they say?\n\nDo not start until you have those answers.' },
          ],
        },
      },
      {
        title: 'Extract the real problem',
        description:
          'After the interrogation, ask Claude to name what is actually being asked for. Often the real brief is hiding under one of the vague words. Use this prompt to pull it out.',
        code: {
          snippet: `# Use this prompt after the interrogation:
Based on your interrogation, what is the real brief hiding under
the vague language? State it in one sentence.`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Given your analysis, what do you think the real problem actually is?' },
            { role: 'claude', text: '"Users keep dropping off" is the real brief. Everything else, modern, clean, friendly, is the client\'s guess at the solution.\n\nDrop-off problems are usually caused by one of three things:\n1. Friction: too many steps, too many required fields, too much cognitive load\n2. Trust: users do not understand what they are signing up for, or do not trust the product yet\n3. Value: users hit a wall before they see why this product is worth their time\n\nA visual redesign fixes none of these directly. Before you design anything, you need to know which of these three you are actually solving.\n\nIf you had to guess right now based on "modern, clean, friendly": the client probably means trust. "Friendly" is almost always a trust signal.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "What is the real problem behind this brief?"' },
            { type: 'out', text: 'Analysing symptom vs root cause...', delay: 500 },
            { type: 'out', text: '' },
            { type: 'warn', text: 'Surface request: visual redesign' },
            { type: 'warn', text: 'Likely real problem: drop-off due to friction, trust, or no perceived value' },
            { type: 'out', text: '' },
            { type: 'success', text: '"Friendly" = probably a trust problem. Start there.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'What is the real problem this brief is actually describing?' },
            { role: 'claude', text: 'The brief says "redesign" but the actual problem is drop-off: that is what needs solving.\n\nDrop-off in onboarding is usually:\n- Friction (too many steps, required fields that feel invasive)\n- Trust gap (users do not understand what they are committing to)\n- No value before the wall (signup required before anything useful is shown)\n\n"Modern, clean, friendly" maps closest to trust. The client is describing how they want users to feel, not what they want the design to do.\n\nRecommendation: before Figma, audit the current onboarding for (1) number of required steps, (2) what is asked before value is shown, (3) where trust signals appear. That is your diagnosis. The redesign follows from it.' },
          ],
        },
      },
      {
        title: 'Generate your list of clarifying questions',
        description:
          'Turn the analysis into a professional, concise list of questions you can send back to the client or PM. Specific questions land better than vague ones. Sending these before designing prevents you from locking into one interpretation of a problem that may not exist.',
        code: {
          snippet: `# Ask Claude to format the questions for sending:
"Write 5 clarifying questions I can send to the client.
Professional tone. Short. Each question has a one-line explanation of why it matters."`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Write 5 clarifying questions I can send to the client. Professional tone. Each question gets a one-line explanation of why it matters.' },
            { role: 'claude', text: '5 questions to send before you start:\n\n1. Where in the onboarding flow do users drop off?\nWithout this, the redesign might focus on the wrong screen entirely.\n\n2. What does success look like in measurable terms?\nA target completion rate gives us something to design toward.\n\n3. Have users who dropped off been interviewed?\nTheir actual words will tell us more than any heuristic audit.\n\n4. What has already been tried?\nAvoids repeating work and signals what the team has ruled out.\n\n5. Who is the primary user persona, and how would they describe the current experience?\n"Modern and friendly" means different things depending on the audience.\n\nSend these before any wireframing. You will get a better brief back.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "Write 5 clarifying questions to send back to the client"' },
            { type: 'out', text: 'Drafting questions from brief analysis...', delay: 400 },
            { type: 'success', text: '1. Where exactly does drop-off occur? (Targets the right screen)' },
            { type: 'success', text: '2. Success metric in numbers? (Gives us a target)' },
            { type: 'success', text: '3. Any user interviews on why they left? (Real data)' },
            { type: 'success', text: '4. What has already been tried? (Avoids repeating)' },
            { type: 'success', text: '5. Who is the primary persona? (Defines "friendly")' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Write 5 clarifying questions I can send to the PM before I start. Professional, concise. Each one has a one-line rationale.' },
            { role: 'claude', text: '5 questions to send:\n\n1. Where in the flow is drop-off highest? (Prevents designing the wrong screen)\n2. What is the target completion rate? (Gives the redesign a measurable goal)\n3. Do we have data on why users drop off? (Interview quotes beat assumptions)\n4. What is the timeline and launch constraint? (Scopes whether we do a full redesign or targeted fixes)\n5. Who approved "modern, cleaner, friendlier" as the direction? (Surfaces whose opinion we are designing to)\n\nSend these before touching anything. You will save 2 weeks of wrong-direction work.' },
          ],
        },
      },
      {
        title: 'Common mistakes',
        description: 'Four failure modes designers hit when using this process.',
        list: [
          'Cleaning the brief before pasting it. When you paraphrase or tidy up the brief, you remove the vagueness Claude needs to interrogate. Paste it raw, exactly as received, including typos. The imprecision is the signal.',
          'Skipping to solutions. Running the interrogation and then immediately opening Figma defeats the point. Send the clarifying questions first and wait for answers before touching any design tool.',
          'Asking too many questions. If Claude gives you 12 questions and you send them all, the client stops responding. Pick the 3 that would most change what you design. Everything else can wait.',
          'Treating the interrogation as the final brief. The interrogation output is a diagnosis, not a brief. Once you have answers from the client, run Step 3 to rewrite it into something designable.',
        ],
      },
    ],
    nextLink: {
      label: 'Write a sharper brief',
      href: '/for-designers/write-a-sharper-brief',
    },
  },

  'write-a-sharper-brief': {
    title: 'Write a Sharper Brief',
    slug: 'write-a-sharper-brief',
    duration: '15 min',
    difficulty: 'beginner',
    availableRoutes: ['claude-ai', 'co-work', 'claude-code'],
    description:
      'Turn a vague creative brief into something you can actually design from. Get Claude to act as a skeptical product manager (PM) and help you push back like a collaborator, not a critic.',
    intro:
      'This guide is for UX and UI designers who receive briefs that are too vague to design from and need to push back without creating friction. After reading it, you will be able to flag vague language, generate a professional pushback message, and rewrite the brief once you have answers. The best designers think like product managers (PMs). They do not just receive briefs: they interrogate them, sharpen them, and push back when something is missing. The problem is that pushback feels risky, especially when the client outranks you. This guide shows you how to use Claude to generate a reframe that sounds like collaboration, not friction, and gives you a design brief you can actually work from.',
    situation: {
      scene: 'A brief arrived. It uses the words "modern," "intuitive," and "user-friendly." There is no data, no user description, and no success metric. You have a design review in two weeks and nothing concrete to design from.',
      outcome: 'You\'ll flag every undefined term, send a professional pushback message, and walk away with a brief specific enough to open Figma.',
    },
    outcomes: [
      'Every vague word in the brief flagged and named, with what each one is hiding',
      'A professional pushback message ready to send, framed as collaboration not criticism',
      'A specific, designable brief built from client answers, not your assumptions',
    ],
    steps: [
      {
        title: 'Flag every vague or missing piece',
        description:
          'Paste the brief you received and ask Claude to mark every phrase that is unmeasurable, undefined, or contradictory. Do not fix anything yet. Separating flagging from fixing keeps the analysis honest. If you fix as you go, you stop seeing problems.',
        code: {
          snippet: `# Prompt to use:
"Read this brief. Mark every word or phrase that is vague, unmeasurable,
or could mean different things to different people. Don't suggest fixes yet. Just flag."`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Read this brief. Mark every vague, unmeasurable, or ambiguous phrase. Do not fix anything yet, just flag.\n\n"We want a dashboard that gives our sales team a clear picture of performance. It should be intuitive and easy to use, with all the key metrics front and centre. Something that feels premium and modern."' },
            { role: 'claude', text: 'Flagged phrases:\n\n"Clear picture of performance": Performance measured how? By rep? By region? By deal stage? Revenue vs. activity?\n\n"Intuitive and easy to use": Relative to what? What is the current tool? What makes it hard?\n\n"All the key metrics": Which metrics? Defined by whom? This is probably the entire design problem hidden in four words.\n\n"Front and centre": Priority order decided by who? The sales lead? The VP? Individual reps?\n\n"Premium and modern": Aesthetic direction given without a reference. Premium to a fintech dashboard looks different from premium to a SaaS startup.\n\nNone of these are answerable from the brief as written. Each one is a design decision disguised as a requirement.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "Flag every vague phrase in this brief: [paste brief]"' },
            { type: 'out', text: 'Scanning for unmeasurable language...', delay: 400 },
            { type: 'warn', text: '"Clear picture": clear by whose definition?' },
            { type: 'warn', text: '"Intuitive": relative to what current tool?' },
            { type: 'warn', text: '"Key metrics": defined by whom?' },
            { type: 'warn', text: '"Premium and modern": aesthetic direction without a reference' },
            { type: 'success', text: '4 phrases flagged. Each one hides a design decision.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Flag every vague or ambiguous phrase in this brief without suggesting fixes:\n\n"Dashboard for the sales team. Clear performance picture. Intuitive. Key metrics front and centre. Premium and modern."' },
            { role: 'claude', text: 'Flagged:\n\n"Clear performance picture": what metrics, what time range, compared to what baseline?\n"Intuitive": benchmarked against the current tool or a competitor?\n"Key metrics": this is probably the entire design problem. Who decides which are key?\n"Front and centre": hierarchy decided by whom, and does it vary by user role?\n"Premium and modern": no visual reference provided. Will mean different things to designer, PM, and CEO.\n\n5 phrases flagged. None of them give you enough to start designing.' },
          ],
        },
      },
      {
        title: 'Generate the pushback message',
        description:
          'Now ask Claude to write the message you will send back. Frame it as "I want to get this right," not "your brief is wrong." The goal is to sound like a thoughtful collaborator. Framing as collaboration rather than a list of questions reduces the chance the stakeholder gets defensive and stops responding.',
        code: {
          snippet: `# Prompt to use:
"Write a short, professional message I can send to the client.
Raise the key gaps in the brief, but frame each question as needing
clarity so I can design something that actually works.
Tone: collaborative, not combative. Max 150 words."`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Write a short professional message I can send to the client about this dashboard brief. Raise the key gaps. Frame them as needing clarity to design something that works. Collaborative, not combative. Under 150 words.' },
            { role: 'claude', text: 'Hi [Name],\n\nThanks for the brief. Before I move into wireframes, a few things I want to get right:\n\nMetrics: Which performance metrics matter most to the sales team, and who decides the priority order? This shapes almost every layout decision.\n\nCurrent tool: What do reps use now, and what is the main frustration? Understanding "intuitive" in context of the current experience will help me land the right simplification.\n\nVisual reference: Do you have examples of dashboards that feel "premium" to you, competitors or tools you admire? Helps align on aesthetic direction before I commit to one.\n\nHappy to jump on a quick call to work through these if easier.\n\nThat is 107 words. It cuts the vague terms without making the client feel attacked.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "Write a pushback message for this brief. Collaborative tone. Under 150 words."' },
            { type: 'out', text: 'Drafting message...', delay: 500 },
            { type: 'success', text: '"Before I move to wireframes, a few things I want to get right:"' },
            { type: 'out', text: '-> Which metrics matter most, and who prioritises them?' },
            { type: 'out', text: '-> What is the current tool and what frustrates reps about it?' },
            { type: 'out', text: '-> Can you share a visual reference for "premium"?' },
            { type: 'out', text: '' },
            { type: 'success', text: '107 words. Collaborative, not combative.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Write the pushback message. Collaborative, not combative. Under 150 words. Raise the 3 most important gaps without making the client feel criticised.' },
            { role: 'claude', text: 'Hi [Name],\n\nGreat brief to work from. Before I start wireframing, three things I want to nail down:\n\n1. Metrics: Which performance metrics are most important to the team, and does the priority differ by role (rep vs. manager)?\n\n2. "Intuitive": What is the current tool they use, and what is the friction? That context shapes where simplification matters most.\n\n3. Visual direction: Any dashboards you admire, competitors or otherwise? "Premium" reads very differently across industries.\n\nAnswers to these will cut a lot of back-and-forth in the wireframe stage.\n\n112 words. The framing "nail down" and "cut back-and-forth" positions the questions as efficiency, not criticism.' },
          ],
        },
      },
      {
        title: 'Rewrite the brief with the answers',
        description:
          'Once the client responds, paste their answers and ask Claude to write a tight, specific brief you can actually design from. This becomes your design north star. Rewriting after you have answers prevents you from designing around assumptions: the revised brief is only as strong as the information it is built from.',
        code: {
          snippet: `# Paste the client answers, then use this prompt:
"Here are the answers to my questions: [paste answers]

Rewrite the original brief into a specific, actionable design brief.
Include: the real problem, users and their constraints, what 'done'
looks like in measurable terms, visual direction, and out of scope."`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Client answers came back:\n\n- Metrics: closed deals, pipeline value, quota attainment. Priority set by sales lead. Reps see their own data; managers see team view.\n- Current tool: Excel. Reps hate scrolling and manual updates.\n- Visual reference: They sent screenshots of Linear and Notion.\n\nRewrite the brief based on these answers. Make it specific and actionable.' },
            { role: 'claude', text: 'Revised Brief: Sales Performance Dashboard\n\nProblem: Sales reps and managers currently track performance in Excel. The manual update process creates friction; reps disengage when the tool feels like admin rather than insight.\n\nUsers:\n- Reps: personal view of closed deals, pipeline value, and quota attainment. No manual entry.\n- Managers: team-level view of the same metrics, with individual rep drill-down.\n\nWhat "done" looks like: A rep opens the dashboard at the start of their day and closes it within 60 seconds, having seen exactly what they need to know.\n\nVisual direction: Low-chrome, minimal. Reference: Linear and Notion.\n\nOut of scope: complex filtering, custom date ranges, export tools. That is scope 2.\n\nThis brief is designable. The original was not.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "Rewrite the brief using the client\'s answers. Make it actionable."' },
            { type: 'out', text: 'Synthesising client answers into brief...', delay: 500 },
            { type: 'success', text: 'Problem: Excel-based tracking creates admin friction' },
            { type: 'success', text: 'Users: reps (personal view) + managers (team view)' },
            { type: 'success', text: 'Done: rep opens, sees what they need, closes in 60s' },
            { type: 'success', text: 'Visual: low-chrome, reference Linear + Notion' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'This brief is designable. The original was not.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Answers came back: metrics are closed deals + pipeline + quota. Priority set by sales lead. Reps see own data, managers see team. Current tool is Excel, reps hate manual updates. Visual reference: Linear and Notion. Rewrite the brief.' },
            { role: 'claude', text: 'Revised Brief\n\nProblem: Excel-based performance tracking creates manual update burden and disengages reps from their own data.\n\nUsers: Sales reps (personal metrics, no manual entry) and managers (team-level with rep drill-down).\n\nMetrics in priority order: closed deals, pipeline value, quota attainment.\n\nSuccess: A rep opens the dashboard, reads their status, and closes it in under 60 seconds.\n\nAesthetic direction: Low-chrome, minimal. Reference: Linear and Notion.\n\nOut of scope: custom filtering, date ranges, CSV export.\n\nThis is the brief. Design to this, not the original.' },
          ],
        },
      },
      {
        title: 'Common mistakes',
        description: 'Four failure modes that derail this process.',
        list: [
          'Fixing problems as you flag them. The flagging step should produce a list of issues, not a revised brief. If you start fixing in the same pass, you stop catching problems in the parts you have already touched.',
          'Sending too many questions. If the list runs to 8 or 10 items, the client sees an interrogation. Cut to the 3 that would most change what you design. A shorter list gets a faster, more useful reply.',
          'Starting the rewrite before you have answers. The revised brief is only as good as the answers it is built from. Writing it from assumptions defeats the purpose of the whole process.',
          'Using vague framing in the pushback message. "I want to make sure I understand" works. "Your brief is unclear" does not. Claude can generate the message, but you should read it before sending to confirm the tone matches your relationship with the client.',
        ],
      },
    ],
    nextLink: {
      label: 'Evaluate your own designs',
      href: '/for-designers/evaluate-your-designs',
    },
  },

  'evaluate-your-designs': {
    title: 'Evaluate Your Own Designs',
    slug: 'evaluate-your-designs',
    duration: '20 min',
    difficulty: 'beginner',
    availableRoutes: ['claude-ai', 'co-work', 'claude-code'],
    description:
      'Run three forced-perspective critiques on any design: the confused user, the skeptical engineer, the impatient PM. Get specific problems, not encouragement.',
    intro:
      'This guide is for UX and UI designers who want honest critique of their work instead of generic praise. After reading it, you will be able to run three forced-perspective critiques on any screen and produce a prioritised list of real problems to fix. Claude flatters by default. Ask it to review your design and it will find things to praise before it finds things to fix. This guide shows you how to break that pattern using three forced-perspective prompts that make Claude take a specific viewpoint and stay in it. You will end up with a prioritised list of actual problems, not a list of "great job, but consider..."',
    situation: {
      scene: 'You have finished a design and want honest feedback before sharing it. You know what happens when you ask Claude "what do you think?": positives first, two gentle suggestions buried at the end, nothing you can actually act on.',
      outcome: 'You\'ll run three forced-perspective critiques and walk away with a prioritised list of real problems ranked by user impact, not a list of encouragement.',
    },
    outcomes: [
      'Three forced-perspective critiques: the confused user, the skeptical engineer, the impatient PM',
      'A ranked list of real problems sorted by user impact, not design effort',
      'A synthesis you can present to a team without making the design sound broken',
    ],
    steps: [
      {
        title: 'Set up the critique',
        description:
          'If you are in the app, paste a screenshot or describe the screen in detail. In the terminal or IDE, describe the interface: what is on it, what the user is trying to do, what the flow looks like.',
        code: {
          snippet: `# Describe the design for Claude to critique:
"Here is the design I want you to critique.

Screen: [Name of screen, e.g. 'onboarding step 2 - account setup']
User goal: [What the user is trying to accomplish on this screen]
What's on the screen: [List the UI elements, labels, layout]
Platform: [Mobile / web / tablet]
User: [Brief description of the target user]"`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I want you to critique this design. Here is the context:\n\nScreen: Onboarding step 2, account setup\nUser goal: Enter name, phone number, and create a PIN\nWhat is on the screen: App logo at top, 3 input fields (Name, Phone, PIN), a "Continue" button, and small grey text that says "Your data is safe with us"\nPlatform: Android mobile\nUser: First-time smartphone user, low digital literacy, 25-40, urban Bangladesh' },
            { role: 'claude', text: 'Got the context. Which perspective do you want first?\n\n1. Confused user: I act as someone unfamiliar with digital forms, no assumed literacy\n2. Skeptical engineer: I look at implementation complexity, edge cases, error states\n3. Impatient PM: I look at conversion, friction, and whether this screen earns its place in the flow\n\nPick one, or I can run all three in sequence.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "Critique this screen: [design description]"' },
            { type: 'out', text: 'Reading design context...', delay: 400 },
            { type: 'out', text: 'Preparing forced-perspective critiques...' },
            { type: 'success', text: 'Ready to run: confused user / skeptical engineer / impatient PM' },
            { type: 'warn', text: 'Specify a perspective or run all three.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Set up a 3-perspective critique on this screen:\n\nOnboarding step 2. Name, phone, PIN fields. Android. First-time smartphone user, low digital literacy, urban Bangladesh.' },
            { role: 'claude', text: 'Context loaded. Three perspectives ready:\n\n1. Confused user: evaluates from a low-literacy, first-time-phone perspective\n2. Skeptical engineer: evaluates implementation and error state gaps\n3. Impatient PM: evaluates friction and conversion risk\n\nWhich do you want first, or should I run them in sequence?' },
          ],
        },
      },
      {
        title: 'Run the confused user perspective',
        description:
          'This perspective takes the viewpoint of a real user who does not understand digital conventions. It surfaces copy problems, interaction confusion, and assumed knowledge that should not be assumed.',
        code: {
          snippet: `# Prompt for the confused user:
"You are a first-time smartphone user with low digital literacy.
You have never set up an account before. You don't know what a PIN is or why you need one.
Review this screen and tell me every point of confusion you would experience.
Stay in character. Don't suggest solutions. Just describe the confusion."`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Run the confused user perspective. You are a first-time smartphone user in Bangladesh with low digital literacy. You have never set up an account before. You do not know what a PIN is or why you need one. Review the screen and tell me every point of confusion. Stay in character. Do not suggest solutions.' },
            { role: 'claude', text: 'In character as a first-time user:\n\nI open the app and see my name at the top. Okay. Then it asks for my phone number. I know that, but I am not sure why the app needs it. Is it going to call me? Share it with someone?\n\nThen it says "PIN." I do not know what that is. Is it a password? How many digits? The field does not say. I try typing my name but it only lets me enter numbers. I do not understand why.\n\nThe button says "Continue." Where am I going? What happens after I press it?\n\nAt the bottom it says "Your data is safe with us." This makes me more nervous, not less. It implies there was a reason to worry.\n\nPoints of confusion identified:\n- Why is my phone number needed? Purpose unstated\n- "PIN" is undefined: no label, no hint, no character count\n- No indication of what happens after "Continue"\n- The safety disclaimer creates anxiety rather than reassurance\n- No way back visible: feels like a trap' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "[confused user prompt]"' },
            { type: 'out', text: 'Taking confused user perspective...', delay: 500 },
            { type: 'warn', text: '"PIN" is undefined: no hint, no character count visible' },
            { type: 'warn', text: 'Phone number purpose not stated: creates distrust' },
            { type: 'warn', text: '"Continue" button gives no indication of what happens next' },
            { type: 'warn', text: 'Safety disclaimer creates anxiety, not reassurance' },
            { type: 'warn', text: 'No visible back option: feels like a trap' },
            { type: 'success', text: '5 confusion points identified.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Run the confused user perspective. First-time smartphone user, Bangladesh, low literacy. Stay in character. Only describe confusion, no solutions.' },
            { role: 'claude', text: 'In character:\n\n"I see fields for my name and phone. That is okay. But then it says PIN. I do not know what that is. Is it my phone\'s PIN? A new one I am supposed to invent? How many digits? The field accepts only numbers but does not tell me how many.\n\nThe Continue button worries me. Where does it take me? If I press it and something goes wrong, can I come back?\n\nAnd the text at the bottom: \'Your data is safe\'. Why is it telling me this? Did something happen to other people\'s data?"\n\nConfusion points:\n1. PIN is undefined (label, purpose, format)\n2. Phone number purpose unstated\n3. No indication of what Continue does\n4. No visible back path\n5. Safety message reads as warning, not reassurance' },
          ],
        },
      },
      {
        title: 'Run the engineer and PM perspectives',
        description:
          'The engineer catches what you will have to build that you have not designed for. The PM asks whether this screen earns its place in the flow.',
        code: {
          snippet: `# Prompt for the skeptical engineer:
"You are a frontend developer who has to build this screen.
Tell me every edge case, error state, and implementation problem you see.
What have I not designed for?"

# Prompt for the impatient PM:
"You are a PM focused on conversion and retention.
Is this screen earning its place in the flow?
What friction would you cut? What would you move to later?"`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Now run the skeptical engineer and the impatient PM perspectives back to back.' },
            { role: 'claude', text: 'Skeptical engineer:\n\n- PIN field: what is the min/max length? What happens if they enter 3 digits and hit Continue? No error state designed.\n- Phone number: is it validated? What country code format is expected? If a user enters without the country code, what happens?\n- Name field: what is the character limit? What about names with non-Latin characters?\n- What happens if the network drops during submission? No loading or error state visible.\n- PIN confirmation: the user enters a PIN once. How do you catch typos? No confirm field.\n\nImpatient PM:\n\n- You are asking for 3 things on step 2 of onboarding. Is name needed right now? Can it be collected later?\n- PIN creation is high-friction. Could you defer this until the user has seen value?\n- The "Your data is safe" copy is costing you more trust than it is earning. Remove it or replace with something specific.\n- What is the completion rate on this step? If it is under 70%, PIN is probably the culprit.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "[engineer perspective prompt]"' },
            { type: 'error', text: 'PIN: no min/max length, no confirmation field, no typo catch' },
            { type: 'error', text: 'Phone: no country code format, no validation error state' },
            { type: 'error', text: 'No network error state designed' },
            { type: 'out', text: '' },
            { type: 'cmd', text: 'claude "[PM perspective prompt]"', delay: 300 },
            { type: 'warn', text: 'Can name be collected later? Reduces step-2 friction.' },
            { type: 'warn', text: 'PIN creation is high-friction: defer until value shown?' },
            { type: 'warn', text: 'Safety copy costs more trust than it earns. Cut it.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Run engineer and PM perspectives back to back.' },
            { role: 'claude', text: 'Engineer:\n- PIN: no length constraint shown, no confirm field, no error state for wrong format\n- Phone: country code handling undefined, no validation message designed\n- Name: character limit? Non-Latin characters?\n- Network failure during submit: no loading or error state\n\nPM:\n- Step 2 has 3 asks. Is name required at this point in the funnel?\n- PIN creation is the highest-friction element. Consider deferring until after first value delivery.\n- "Your data is safe" creates anxiety, not reassurance. Remove or make specific: "We never share your phone number."\n- If step 2 drop-off is high, PIN is the most likely cause. Check the analytics before redesigning anything else.' },
          ],
        },
      },
      {
        title: 'Synthesise into a prioritised action list',
        description:
          'Ask Claude to take everything across all three perspectives and produce a ranked list of fixes, ranked by user impact, not design effort.',
        code: {
          snippet: `Turn your three-perspective critique into a prioritised action list.
Group by: must fix before sharing, should fix before handoff,
consider for next iteration.
Include the heuristic or principle each item violates.`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Synthesise everything from all three critiques into a prioritised fix list. Rank by user impact. Top 5.' },
            { role: 'claude', text: 'Top 5 fixes by user impact:\n\n1. Add PIN confirmation field. A typo on a PIN locks the user out immediately. No other single issue has a harder failure mode. [Engineer + User]\n\n2. Define and label the PIN. "4-digit security code" is clearer than "PIN" for a first-time user. Add a hint below the field. [User]\n\n3. State why you need the phone number. One line: "We will use this to recover your account." Removes a major trust blocker. [User + PM]\n\n4. Design the error states. At minimum: wrong phone format, PIN too short, network failure. None of these are currently designed. [Engineer]\n\n5. Remove the "Your data is safe" copy or make it specific. Replace with: "We never share your phone number." Specificity builds trust. Vagueness destroys it. [PM + User]\n\nEverything else is friction reduction: valid, but these 5 are blocking.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "Synthesise all critiques. Top 5 fixes by user impact."' },
            { type: 'out', text: 'Synthesising 3 perspectives...', delay: 500 },
            { type: 'error', text: '1. Add PIN confirmation: typo = immediate lockout' },
            { type: 'warn', text: '2. Label PIN as "4-digit security code": first-time user' },
            { type: 'warn', text: '3. State phone number purpose in one line' },
            { type: 'warn', text: '4. Design error states (phone, PIN, network)' },
            { type: 'warn', text: '5. Make safety copy specific or remove it' },
            { type: 'success', text: '5 fixes. Ranked by impact, not effort.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Synthesise all three critiques into a top-5 fix list, ranked by user impact.' },
            { role: 'claude', text: 'Top 5 by impact:\n\n1. PIN confirmation field: typo without confirmation = permanent lockout. Highest failure severity. [Engineer/User]\n2. Relabel PIN as "4-digit code": first-time users do not know the word PIN. One label change, big comprehension gain. [User]\n3. State the phone number purpose: "Used to recover your account" removes the biggest trust gap on the screen. [User/PM]\n4. Design error states: phone format, PIN length, network drop. None exist currently. [Engineer]\n5. Cut or rewrite the safety copy: "Your data is safe" is anxiety-inducing. "We never share your number" is trust-building. [PM/User]\n\nFixes 1-3 are copy and form changes. Fast. Fix 4 is an engineering ask. Fix 5 is one line.' },
          ],
        },
      },
      {
        title: 'Common mistakes',
        description: 'Four failure modes for this process.',
        list: [
          'Asking for a general review instead of a forced perspective. "Review my design" produces hedged praise. "You are a confused first-time user: describe every point of confusion" produces usable findings. The perspective constraint is the mechanism.',
          'Letting Claude out of character. If Claude starts suggesting solutions mid-critique, bring it back: "Stay in character. Only describe the problem, not the fix." Solutions come in the synthesis step.',
          'Running all three perspectives in one prompt. If you ask for all three at once without separating them, the output blends perspectives and the engineer issues get mixed with the user issues. Run them separately, then synthesise.',
          'Skipping the synthesis step. Three separate critiques are hard to act on. The synthesis groups them by urgency and gives you something you can put in a sprint. Do not skip it even if the critiques feel complete on their own.',
        ],
      },
    ],
    nextLink: {
      label: 'Do a heuristic evaluation',
      href: '/for-designers/heuristic-evaluation',
    },
  },

  'heuristic-evaluation': {
    title: 'Do a Heuristic Evaluation',
    slug: 'heuristic-evaluation',
    duration: '25 min',
    difficulty: 'intermediate',
    availableRoutes: ['claude-ai', 'co-work', 'claude-code'],
    description:
      'Run Nielsen\'s 10 usability heuristics against any interface using Claude as your evaluation partner. Get a prioritised findings report you can act on.',
    intro:
      'This guide is for UX and UI designers who need to evaluate an interface for usability problems and produce a findings report they can act on or present to a team. After reading it, you will be able to run a full 10-heuristic evaluation using Claude as a consistent evaluation partner and generate a prioritised findings report grouped by severity. A heuristic evaluation is one of the most powerful tools in a designer\'s kit, and one of the most tedious to do manually. Running all 10 of Nielsen\'s heuristics against an interface, documenting violations, and prioritising findings typically takes hours. This guide shows you how to do it in 25 minutes. The 10 heuristics you will evaluate against: Visibility of system status, Match between system and real world, User control and freedom, Consistency and standards, Error prevention, Recognition rather than recall, Flexibility and efficiency of use, Aesthetic and minimalist design, Help users recognise and recover from errors, Help and documentation. Severity tiers: Critical (blocks task completion), Major (causes significant confusion or error), Minor (annoys or slows), Cosmetic (visual preference only).',
    situation: {
      scene: 'An interface needs a usability review before it ships. Your gut says something is wrong. You need specific findings with severity ratings, not a list of impressions, and something a PM can actually prioritise.',
      outcome: 'You\'ll produce a full heuristic report against all 10 Nielsen heuristics, grouped by severity, in about 25 minutes.',
    },
    outcomes: [
      'A full evaluation against all 10 Nielsen usability heuristics with a specific violation example for each',
      'Every finding rated: Critical, Major, Minor, or Cosmetic',
      'A prioritised report grouped by severity tier, ready for sprint planning or a stakeholder review',
    ],
    promptContrast: {
      bad: 'Review this design for usability problems.',
      good: 'Evaluate this 4-field payment form against Nielsen\'s Error Prevention heuristic only. List each place where the user could make an irreversible mistake without a confirmation or undo option. Format: [screen element] + [risk] + [severity: Critical / Major / Minor].',
      why: 'A role-scoped heuristic prompt forces Claude to apply a single lens instead of generating a generic usability checklist. One heuristic at a time produces specific, actionable findings.',
    },
    steps: [
      {
        title: 'Describe the interface you are evaluating',
        description:
          'Paste the template below and fill in your interface. Claude will confirm it has enough context and ask whether to run all 10 heuristics at once or one by one. Answer "all 10 at once" — that is the prompt for step 2.',
        code: {
          snippet: `# Interface context template:
"I am running a heuristic evaluation using Nielsen's 10 usability heuristics.

Interface: [What it is: app, website, feature]
Primary user: [Who uses it, what they know, what device they use]
Core task: [The main thing a user is trying to accomplish]
Screens to evaluate: [List the screens or flows]

Description: [Describe the screens, layout, labels, interactions]"`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I am running a heuristic evaluation using Nielsen\'s 10 heuristics.\n\nInterface: Mobile banking app, account top-up flow\nPrimary user: First-time smartphone user, low financial literacy, Android\nCore task: Add money to the account from a mobile wallet\nFlow: Home screen -> "Add money" -> select source -> enter amount -> confirm -> success\n\nDescription: Home shows balance and a grid of 6 icons. "Add Money" is the 4th icon. Tapping opens a screen with a single field: "Enter Amount (BDT)." No minimum or maximum shown. A blue "Proceed" button. Next screen: "Confirm Top-up" with amount, a fee line, total, and "Confirm" button. Success screen shows a tick and "Top-up Successful."' },
            { role: 'claude', text: 'Got it. I will evaluate each of Nielsen\'s 10 heuristics against this flow. I will note violations with severity: Critical (blocks task), Major (causes significant friction), Minor (small friction), and Cosmetic (low impact).\n\nShall I run all 10 at once, or go through them one by one?' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "Run a Nielsen heuristic evaluation on: [interface description]"' },
            { type: 'out', text: 'Reading interface context...', delay: 400 },
            { type: 'out', text: 'Preparing evaluation against all 10 heuristics...' },
            { type: 'success', text: 'Ready. Running evaluation now.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Set up a heuristic evaluation. Mobile banking top-up flow. Android. First-time user, low financial literacy. Flow: Home -> Add Money -> Amount entry -> Confirm -> Success. No minimum or maximum shown. Fee appears only on confirm screen.' },
            { role: 'claude', text: 'Context loaded. Evaluating against Nielsen\'s 10 heuristics. I will flag violations by severity: Critical, Major, Minor, Cosmetic.\n\nReady to run. All 10 at once or one by one?' },
          ],
        },
      },
      {
        title: 'Run the evaluation',
        description:
          'Paste the evaluation prompt. Claude works through all 10 heuristics and returns a verdict for each — comply, partial, or violation — with a specific example and a severity rating. At the end you will have a list of violations with counts: something like "1 Critical, 3 Major, 3 Minor." That list is what step 3 turns into a report.',
        code: {
          snippet: `# Prompt to run the evaluation:
"Evaluate this interface against all 10 of Nielsen's usability heuristics.
For each heuristic, state: comply, partially comply, or violation.
For any violation: describe it specifically, give an example from the interface,
and rate severity (Critical / Major / Minor / Cosmetic)."`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Evaluate the interface against all 10 Nielsen heuristics. For each: comply / partial / violation, with a specific example and severity rating.' },
            { role: 'claude', text: 'H1: Visibility of system status\nViolation, Major. The top-up flow gives no feedback during processing. After tapping "Confirm," the user sees nothing until the success screen appears. For a financial transaction, a loading indicator is mandatory: without it, users tap again and risk duplicate submissions.\n\nH2: Match between system and real world\nViolation, Major. "Proceed" is developer language. Users in this context are more likely to recognise "Next" or "Continue." The bKash icon assumes the user knows the brand: if they do not, "Add Money" is opaque.\n\nH3: User control and freedom\nViolation, Minor. No visible Cancel or Back option on the Confirm screen. Users who entered the wrong amount must use the OS back button.\n\nH4: Consistency and standards\nComplies. The flow follows standard mobile payment conventions.\n\nH5: Error prevention\nViolation, Critical. No minimum or maximum amount is shown on the entry screen. A user who enters 0 or an amount exceeding their balance receives an error only after tapping Proceed.\n\nH6: Recognition rather than recall\nViolation, Minor. The fee is only shown on the Confirm screen. The user must remember what they entered to evaluate whether the total is acceptable.\n\nH7: Flexibility and efficiency of use\nMinor gap. No quick-amount shortcuts (100 / 500 / 1000 BDT) for repeat users.\n\nH8: Aesthetic and minimalist design\nComplies. The interface is appropriately minimal.\n\nH9: Help users recognise and recover from errors\nViolation, Major. The error message for an invalid amount says "Transaction failed." No cause, no next step.\n\nH10: Help and documentation\nMinor gap. No help link or tooltip available on any screen.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "Evaluate against all 10 Nielsen heuristics..."' },
            { type: 'out', text: 'H1 Visibility of system status...', delay: 300 },
            { type: 'error', text: 'MAJOR: No loading state after Confirm tap: duplicate risk' },
            { type: 'out', text: 'H5 Error prevention...' },
            { type: 'error', text: 'CRITICAL: No min/max shown: error only after tap' },
            { type: 'out', text: 'H9 Error recovery...' },
            { type: 'error', text: 'MAJOR: "Transaction failed": no cause, no next step' },
            { type: 'success', text: '10 heuristics evaluated. 1 Critical, 3 Major, 3 Minor.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Run all 10 heuristics. Comply / partial / violation for each. Specific example and severity per violation.' },
            { role: 'claude', text: 'H1: MAJOR violation. No loading state after Confirm. Financial transactions need processing feedback or users retry.\nH2: MAJOR violation. "Proceed" is technical. "Next" maps better to user vocabulary.\nH3: MINOR violation. No explicit Cancel on Confirm screen.\nH4: PASS.\nH5: CRITICAL violation. No min/max on amount entry. Error only appears after submit.\nH6: MINOR violation. Fee shown only on Confirm, not on entry.\nH7: MINOR gap. No quick-amount shortcuts for repeat users.\nH8: PASS.\nH9: MAJOR violation. "Transaction failed" with no cause and no path forward.\nH10: MINOR gap. No help available on any screen.\n\nSummary: 1 Critical, 3 Major, 3 Minor, 2 Pass.' },
          ],
        },
      },
      {
        title: 'Generate the prioritised findings report',
        description:
          'Paste the consolidation prompt. Claude groups all violations by severity — Critical down to Minor — and adds a one-line fix for each. What comes back is paste-ready: you can drop it directly into a Jira ticket, share it with your PM, or bring it to sprint planning.',
        code: {
          snippet: `# Prompt to generate the report:
"Consolidate all findings into a prioritised report.
Format: severity tier, heuristic violated, specific issue, one-sentence fix.
Group by severity."`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Consolidate all findings into a report sorted by severity. For each: heuristic, issue, one-line fix.' },
            { role: 'claude', text: 'CRITICAL\n\nH5: Error prevention. No min/max amount shown on entry screen: error appears only after submit. Fix: show constraints inline, "Min 10 BDT, Max 10,000 BDT" below the field.\n\nMAJOR\n\nH1: System status. No loading state after Confirm: duplicate tap risk. Fix: add a spinner and disable the Confirm button on first tap.\nH2: Real world match. "Proceed" is technical language. Fix: change to "Next" or "Continue."\nH9: Error recovery. "Transaction failed" gives no cause or next step. Fix: "We could not complete this top-up. Check your bKash balance and try again."\n\nMINOR\n\nH3: User control. No explicit Cancel on Confirm screen. Fix: add a text link, "Change amount," that navigates back.\nH6: Recognition. Fee shown only on Confirm, not on entry. Fix: show estimated fee below the amount field.\nH7: Flexibility. No quick-amount shortcuts. Fix: add tappable chips, 100 / 500 / 1000 / 2000 BDT.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "Generate prioritised findings report"' },
            { type: 'out', text: 'Consolidating findings...', delay: 400 },
            { type: 'error', text: 'CRITICAL: H5, no amount constraints shown -> show min/max inline' },
            { type: 'warn', text: 'MAJOR: H1, no loading state -> add spinner, disable button on tap' },
            { type: 'warn', text: 'MAJOR: H9, "Transaction failed" -> add cause + next step' },
            { type: 'out', text: 'MINOR: H3, H6, H7: Cancel link, fee preview, quick amounts' },
            { type: 'success', text: 'Report ready. 7 findings. Ready for sprint planning.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Generate a prioritised findings report. Severity then heuristic then issue then one-line fix.' },
            { role: 'claude', text: 'CRITICAL\n- H5: No min/max on amount entry -> show constraints inline below field\n\nMAJOR\n- H1: No loading state after Confirm -> add spinner, disable button on first tap\n- H2: "Proceed" is developer language -> change to "Next"\n- H9: "Transaction failed" with no cause -> rewrite: "Could not top up: check your bKash balance and try again"\n\nMINOR\n- H3: No explicit Cancel on Confirm -> add "Change amount" link\n- H6: Fee hidden until Confirm -> show estimated fee on entry screen\n- H7: No quick-amount shortcuts -> add 100/500/1000/2000 BDT chips\n\n7 findings. 1 Critical (form fix), 3 Major (copy + loading), 3 Minor (nav + disclosure).' },
          ],
        },
      },
      {
        title: 'Common mistakes',
        description: 'Four failure modes in heuristic evaluations.',
        list: [
          'Describing the interface too vaguely. Claude evaluates what you describe. "A form with some fields" produces generic heuristic observations. "A 4-field payment form with amount, phone, PIN, and a confirm button on Android mobile" produces specific, actionable findings. Put the time in on the description.',
          'Conflating Minor with Cosmetic. Minor friction slows users down or causes recoverable errors. Cosmetic issues are visual preferences that have no functional impact. Labelling a Minor issue as Cosmetic means it gets deprioritised and never fixed.',
          'Skipping heuristics where the interface "obviously" complies. The most dangerous assumption in a heuristic evaluation is that a heuristic does not apply. Check all 10, including the ones that look fine. Violations in "passing" heuristics are easy to miss.',
          'Presenting the evaluation without the severity grouping. A list of 10 raw findings is hard to act on. The report step groups by Critical, Major, Minor so stakeholders know what to fix before the next release versus what to consider next quarter.',
        ],
      },
    ],
    nextLink: {
      label: 'Prepare your Figma for AI handoff',
      href: '/for-designers/figma-for-ai-handoff',
    },
  },

  'figma-for-ai-handoff': {
    title: 'Prepare Your Figma for AI Handoff',
    slug: 'figma-for-ai-handoff',
    duration: '20 min',
    difficulty: 'intermediate',
    availableRoutes: ['co-work', 'claude-code'],
    description:
      'Clean up your Figma file so Claude Code can read it accurately. Proper layer naming, annotations, and token exports reduce ambiguity in handoff.',
    intro:
      'This guide is for UX and UI designers who use Figma and hand off to developers using Claude Code. After reading it, you will be able to rename layers for semantic clarity, add annotations for behaviour Claude cannot infer from pixels, and export design tokens (the named variables for your colors, spacing, and typography) to use as a source of truth in code generation. When you paste Figma layer names and annotations into a Claude Code session, Claude reads them as context for generating code. A file with layers named "Rectangle 42" and "Group 7" produces confused code. A file with descriptive names and semantic annotations produces code you can actually ship. This guide walks you through the three cleanup passes that matter most.',
    situation: {
      scene: 'You are handing a Figma file to a developer using Claude Code. Your layers are named "Frame 14" and "Group 7." The last handoff produced code that looked nothing like the design, and the back-and-forth took three days.',
      outcome: 'You\'ll clean up your file so Claude Code reads it accurately and generates code you can recognise without a second round of corrections.',
    },
    outcomes: [
      'Layer names that describe component intent, not shape, so Claude infers nothing by accident',
      'Annotations for the behaviour pixels cannot show: validation rules, transitions, and error states',
      'A token export and component spec ready to paste directly into a Claude Code session',
    ],
    steps: [
      {
        title: 'Rename layers to describe intent, not shape',
        description:
          'Claude reads your layer names and annotations as context when you paste them into a session. Generic names like "Frame 3" produce generic code. Rename every interactive element using the pattern: component/state/variant. For example: button/primary/default, input/error/filled, card/product/selected.',
        code: {
          snippet: `# Poorly named layers (what Claude has to guess from):
Frame 14
Group 7
Rectangle 3
Vector 2

# Well-named layers (what Claude can use directly):
button/primary/default
form/amount-entry
input/bkash-number
icon/chevron-right`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I have a payment screen in Figma. My layers are named things like "Frame 14", "Group 7", "Rectangle 3". When I hand this to a dev using Claude Code, what does Claude actually see?' },
            { role: 'claude', text: 'It sees "Frame 14" and has to guess what that is. It will infer from context (position, size, color) but that inference is often wrong, especially for complex components.\n\nThe fix is simple: rename layers to describe intent. Use this pattern: component/state/variant.\n\n"Frame 14" that contains a pay button becomes: button/primary/default\n"Rectangle 3" that is an amount input becomes: input/amount/default\n"Group 7" that is an error message becomes: alert/error/inline\n\nDo the rename pass in Figma before handoff. It takes 20 minutes and saves the developer 2 hours of back-and-forth.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Audit my Figma export and flag any layers that will confuse you during code generation. The component is a mobile payment flow.' },
            { role: 'claude', text: 'From the export, I can see the following layers that will cause ambiguity:\n\n- "Frame 14" (contains a button shape and label, no semantic name)\n- "Group 7" (contains 3 text elements, unclear purpose)\n- "Rectangle 3" (styled as an input, but named as a shape)\n- "Vector 2" (an icon with no label, I cannot infer which icon)\n\nRename these before I generate code. Use: button/primary/default, form/amount-entry, input/bkash-number, icon/chevron-right. Once renamed, re-export and I will generate accurate component code.' },
          ],
        },
      },
      {
        title: 'Add annotations for behaviour Claude cannot infer from pixels',
        description:
          'Visual design shows states but not transitions, error conditions, or edge cases. Use Figma annotations (or a sticky note layer named "AI-NOTES") to document: what triggers state changes, what validation rules apply, what happens on error, and which fields are optional.',
        code: {
          snippet: `# Example AI-NOTES layer content (paste into Figma as a sticky note):

button/primary/default
- Disabled until: amount > 0 AND phone field passes validation
- On tap: disable button, show spinner, call /api/send-money
- Loading state: spinner replaces label for duration of API call

input/amount/default
- Min: 10 BDT, Max: 5000 BDT
- Error state: show "Minimum is 10 BDT" inline below field
- On blur: validate and show error immediately (do not wait for submit)

input/bkash-number/default
- Format: 11 digits, must start with 01
- Error: "Enter a valid 11-digit bKash number"`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'What kinds of things should I annotate in my Figma that Claude cannot figure out from looking at the design?' },
            { role: 'claude', text: 'Four categories that are invisible from pixels:\n\n1. Triggers and transitions: "This button only activates when amount > 0 and phone field is valid." The design shows both states but not the condition.\n\n2. Validation rules: "Phone number must be 11 digits, starting with 01." A text field looks the same whether validation is strict or loose.\n\n3. Error messages: If you have an error state, annotate what triggers it. "Shows when API returns payment_failed code."\n\n4. Loading and async: "Spinner replaces button label during API call. Button stays disabled for 3s after tap to prevent double-submit."\n\nAdd these as a layer named AI-NOTES directly next to the component they describe. I read that layer before generating any logic.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I have added an AI-NOTES layer to my payment form. It says: "Amount field: min 10, max 5000 BDT. Phone: 11 digits, 01-prefix. Submit: disabled until both valid. Error: show inline below field that failed." Generate the validation logic.' },
            { role: 'claude', text: 'Based on the annotations:\n\n```typescript\nconst MIN_AMOUNT = 10;\nconst MAX_AMOUNT = 5000;\nconst PHONE_REGEX = /^01[3-9]\\d{8}$/;\n\nfunction validateAmount(value: string): string | null {\n  const n = Number(value);\n  if (!value) return "Enter an amount";\n  if (n < MIN_AMOUNT) return `Minimum is ${MIN_AMOUNT} BDT`;\n  if (n > MAX_AMOUNT) return `Maximum is ${MAX_AMOUNT} BDT`;\n  return null;\n}\n\nfunction validatePhone(value: string): string | null {\n  if (!value) return "Enter your bKash number";\n  if (!PHONE_REGEX.test(value)) return "Enter a valid 11-digit number starting with 01";\n  return null;\n}\n\nconst isFormValid = !validateAmount(amount) && !validatePhone(phone);\n```\n\nInline error display and button disable state wired to `isFormValid`.' },
          ],
        },
      },
      {
        title: 'Export tokens and write a component spec',
        description:
          'Before handing off, export your design tokens (colors, spacing, type) and write a one-page component spec. Paste both into Claude and ask it to generate the code. This is faster than describing the design verbally and more accurate than hoping Claude infers correctly from a screenshot.',
        code: {
          snippet: `# Export tokens from Figma using the Tokens Studio plugin
# or manually copy them into a JSON file

{
  "colors": {
    "primary": "#E2136E",
    "error": "#D32F2F",
    "surface": "#F5F5F5"
  },
  "spacing": {
    "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px"
  },
  "typography": {
    "body": { "size": "14px", "weight": "400", "lineHeight": "20px" },
    "label": { "size": "12px", "weight": "500", "lineHeight": "16px" }
  }
}`,
          language: 'json',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Here are my design tokens [paste JSON]. Here is the component spec: a bKash payment entry form. Two fields: amount (number, BDT) and phone (tel, 11 digits). One CTA button. Inline validation errors. Mobile-first. Generate the React component.' },
            { role: 'claude', text: 'Using your tokens:\n\n```tsx\nexport function PaymentForm() {\n  const [amount, setAmount] = useState("");\n  const [phone, setPhone] = useState("");\n  const [errors, setErrors] = useState<{amount?: string; phone?: string}>({});\n\n  return (\n    <div style={{ padding: "24px", background: "#F5F5F5" }}>\n      <label style={{ fontSize: "12px", fontWeight: 500 }}>Amount (BDT)</label>\n      <input type="number" value={amount} onChange={e => setAmount(e.target.value)}\n        style={{ display: "block", width: "100%", marginTop: "8px", padding: "16px" }} />\n      {errors.amount && <span style={{ color: "#D32F2F", fontSize: "12px" }}>{errors.amount}</span>}\n\n      <label style={{ fontSize: "12px", fontWeight: 500, marginTop: "16px", display: "block" }}>bKash Number</label>\n      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}\n        style={{ display: "block", width: "100%", marginTop: "8px", padding: "16px" }} />\n      {errors.phone && <span style={{ color: "#D32F2F", fontSize: "12px" }}>{errors.phone}</span>}\n\n      <button disabled={!isFormValid}\n        style={{ background: "#E2136E", color: "#fff", width: "100%", marginTop: "24px", padding: "16px" }}>\n        Pay Now\n      </button>\n    </div>\n  );\n}\n```\n\nReplace inline styles with your CSS/Tailwind token classes to keep it DRY.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I have exported my Figma tokens to tokens.json in the project root. Use them as the source of truth and generate a PaymentForm component for the bKash flow we have been building.' },
            { role: 'claude', text: 'Read tokens.json, mapped to CSS custom properties, generated PaymentForm:\n\n- colors.primary mapped to --color-primary\n- spacing.md mapped to --space-md\n- typography.body mapped to body text styles\n\nComponent at src/components/PaymentForm.tsx. Validation logic from your AI-NOTES annotations. Token usage is isolated in a tokens.css import so swapping the brand later is a one-file change.' },
          ],
        },
      },
      {
        title: 'Common mistakes',
        description: 'Four failure modes in Figma-to-Claude handoffs.',
        list: [
          'Renaming only the top-level frames. Layer naming matters most at the component and element level, not the page or frame level. "Payment Screen" as a frame name helps nothing. "button/primary/disabled" inside that frame is what changes the code.',
          'Skipping the AI-NOTES layer for simple components. Simple components still have non-obvious behaviour: hover states, disabled conditions, error triggers. If you do not annotate them, Claude infers from common patterns, which may not match your product.',
          'Exporting tokens without mapping them to the codebase. A token export that uses Figma variable names your codebase does not recognise adds a translation step for the developer. Check that the token names in the export match what the dev team uses before handing off.',
          'Handing off a file mid-design. Annotations and layer names added to a file that is still changing create confusion. Do the handoff prep pass once, when the design is stable.',
        ],
      },
    ],
    nextLink: {
      label: 'Build your first flow with Claude Code',
      href: '/for-designers/build-your-first-flow',
    },
  },

  'build-your-first-flow': {
    title: 'Build Your First Flow with Claude Code',
    slug: 'build-your-first-flow',
    duration: '30 min',
    difficulty: 'intermediate',
    availableRoutes: ['claude-code'],
    description:
      'Turn a design into a working UI prototype using Claude Code. No frontend experience required. Just a Figma file, a description, and a terminal.',
    intro:
      'This guide is for UX and UI designers who want to turn a finished Figma screen into working, interactive code without handing it to a developer. After reading it, you will be able to scaffold a reusable React component (a self-contained piece of UI code) from a design description, add validation and interaction states, and iterate with plain English prompts. You designed a flow. Now you want to see it work, not just as a static prototype, but as actual code in a browser. Claude Code can bridge that gap faster than handing off to a developer and waiting. This guide takes you from a finished Figma screen to a running React component, step by step, using only plain English and a terminal.',
    situation: {
      scene: 'You have a finished Figma screen and you want to see it work in a browser. Not a static prototype. Actual interactive code. But you have never opened a terminal and do not know where to start.',
      outcome: 'You\'ll build a working React component from a plain English description of your design, with validation and loading states, without editing a single line of code yourself.',
    },
    outcomes: [
      'A working React component scaffolded from a plain English description of your Figma design',
      'Validation, interaction states, and loading behaviour added through prompts, not code edits',
      'A prototype you can hand to a developer as a working starting point, not a static file',
    ],
    steps: [
      {
        title: 'Describe your design in plain text',
        description:
          'Before touching any code, describe the screen you want to build. Be specific: layout, components, interactions, states. The more precise your description, the less back-and-forth you need. Write this description in a file called DESIGN.md in your project root.',
        code: {
          snippet: `# DESIGN.md example

## Screen: bKash Send Money

Layout: single-column, mobile (375px). White background.

Header
- Back arrow (left), "Send Money" title (center), no right action

Form
- Amount field: large number input, BDT label on right, placeholder "0"
- Phone field: tel input, label "bKash Number", placeholder "01XXXXXXXXX"
- Inline error: appears below each field if invalid, red #D32F2F

CTA
- "Send Money" button, full width, primary pink #E2136E
- Disabled until both fields pass validation
- Loading state: spinner replaces label during API call

States: default, field-error, loading, success`,
          language: 'markdown',
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'mkdir bkash-flow && cd bkash-flow' },
            { type: 'cmd', text: 'touch DESIGN.md' },
            { type: 'cmd', text: 'claude' },
            { type: 'out', text: 'Reading DESIGN.md...' },
            { type: 'success', text: 'Claude Code session started. DESIGN.md loaded.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I have created DESIGN.md describing the Send Money screen. Read it and confirm you understand the layout and states before writing any code.' },
            { role: 'claude', text: 'Read DESIGN.md. Confirmed:\n\n- Single-column mobile layout, 375px\n- Three sections: header (back + title), form (amount + phone with inline errors), CTA (primary button)\n- Four states: default, field-error, loading, success\n- Validation: amount > 0, phone matches 01XXXXXXXXX pattern\n- Token: primary #E2136E, error #D32F2F\n\nReady to scaffold. Should I start with the component shell or validation logic first?' },
          ],
        },
      },
      {
        title: 'Scaffold one component at a time',
        description:
          'Do not ask Claude to build the whole screen in one go. Start with the form fields, then add validation, then the button state, then the loading state. Small requests produce clean, reviewable output. Large requests produce code you cannot reason about.',
        code: {
          snippet: `Build a mobile checkout step indicator. Three steps: Cart, Payment, Confirm.
Show active step highlighted, completed steps with a checkmark,
upcoming steps dimmed. No framework preferences yet.`,
          language: 'text',
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "Scaffold SendMoneyForm.tsx with amount and phone fields. No validation yet. Use DESIGN.md for layout and token values."' },
            { type: 'out', text: 'Scaffolding SendMoneyForm.tsx...', delay: 600 },
            { type: 'out', text: 'Created: src/components/SendMoneyForm.tsx' },
            { type: 'out', text: 'Created: src/components/SendMoneyForm.css' },
            { type: 'success', text: 'Shell ready. Run: npm start to preview.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Scaffold SendMoneyForm.tsx with just the two fields and the button. Use the tokens from DESIGN.md. No validation logic yet, I will add that in the next step.' },
            { role: 'claude', text: 'Created src/components/SendMoneyForm.tsx:\n\n- Amount input with BDT label, controlled via useState\n- Phone input, type="tel", controlled via useState\n- Primary button, always enabled for now (we will wire disable logic next)\n- Inline error slots below each field, empty for now\n- Tokens applied: #E2136E button, #F5F5F5 background, 16px body type\n\nThe component renders. Add validation next.' },
          ],
        },
      },
      {
        title: 'Add validation, loading states, and iterate',
        description:
          'Now layer in behaviour. Ask Claude to add validation first, test it in the browser, then ask for the loading state. Each iteration should be small enough that you can manually verify it worked before moving on. You do not need to understand the code. Read it for structure: does it match what you described? Ask Claude to explain any part you want to verify.',
        code: {
          snippet: `The spacing on the active step indicator is too tight on mobile.
Increase the padding and make the checkmark icon 4px larger.`,
          language: 'text',
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "Add validation to SendMoneyForm: amount min 10 max 5000, phone 11 digits starting 01. Show inline errors. Disable button until both valid."' },
            { type: 'out', text: 'Adding validation...', delay: 400 },
            { type: 'out', text: 'Updated: src/components/SendMoneyForm.tsx' },
            { type: 'success', text: 'Validation added. Test in browser before continuing.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'The form works. Now add the loading state: when the button is tapped, disable it and replace the label with a spinner for 2 seconds, then show a success message.' },
            { role: 'claude', text: 'Added loading state:\n\n- `isLoading` state drives button disable + label swap\n- Spinner: CSS border-animation, 20px, white, centered in button\n- `setTimeout(2000)` simulates API call (replace with real fetch when ready)\n- Success message: green checkmark + "Money sent!" replaces form on resolve\n\nAll four states from DESIGN.md are now implemented: default, field-error, loading, success. The component is ready for real API wiring.' },
          ],
        },
      },
      {
        title: 'Common mistakes',
        description: 'Four failure modes when building your first flow.',
        list: [
          'Asking Claude to build the whole screen at once. Large requests produce large, unreadable output. Break the build into: shell first, then validation, then interaction states. Each step should produce something you can open in a browser and verify.',
          'Not writing DESIGN.md before starting. Without a written description, Claude has to infer your intent from the prompts in real time. Every ambiguity in your prompts costs a correction round. Write the description first; it takes 10 minutes and saves 30.',
          'Editing the code directly instead of prompting changes. If you open the generated file and edit it by hand, you break the feedback loop. Claude does not know what you changed, so the next prompt may undo your edit. Describe the change in plain English and let Claude make it.',
          'Treating the prototype as production code. The code Claude generates from a design description is a working prototype, not production-ready. Before shipping, ask Claude to add TypeScript types, replace placeholder API calls with real ones, and handle edge cases the prototype skips.',
        ],
      },
    ],
    nextLink: {
      label: 'Get started with Claude Design',
      href: '/for-designers/get-started-with-claude-design',
    },
  },

  'get-started-with-claude-design': {
    title: 'Get Started with Claude Design',
    slug: 'get-started-with-claude-design',
    duration: '15 min',
    difficulty: 'beginner',
    availableRoutes: ['claude-ai', 'co-work', 'claude-code'],
    description:
      'Claude Design is Anthropic\'s text-to-prototype tool. Describe a screen, get a working interactive prototype back. This guide shows you how to prompt it effectively.',
    intro:
      'This guide is for UX and UI designers who want to use Claude Design to turn a screen description into a working interactive prototype. After reading it, you will be able to write prompts that produce useful, specific output, iterate on a prototype with targeted changes, and export the result as a written component specification (reference spec) for developers. Claude Design (launched April 2026) lets you describe a UI and get back a running prototype, not a mockup, not a wireframe, but actual interactive code rendered in the browser. For designers, it is the fastest way to test an idea without opening Figma or writing a line of code. This guide covers the prompt patterns that produce useful output versus generic filler.',
    situation: {
      scene: 'You have tried Claude Design. Every prototype came back looking like a generic SaaS dashboard with a blue header and a grid of cards. You know the tool can do better but your prompts are not working.',
      outcome: 'You\'ll learn the prompt pattern that produces specific, context-aware output and how to iterate on one thing at a time without losing what was already working.',
    },
    outcomes: [
      'The prompt structure that produces specific, context-aware prototypes instead of generic templates',
      'How to iterate on one change at a time without triggering a full rewrite',
      'A live prototype URL and a written component spec ready to hand to a developer',
    ],
    steps: [
      {
        title: 'Write a brief that specifies context, not just appearance',
        description:
          'The most common mistake with Claude Design is describing how the screen should look instead of what it needs to do. A prompt that says "clean, modern, minimal" produces every other SaaS dashboard. A prompt that specifies audience, flow, and constraints produces something useful.',
        code: {
          snippet: `Design a mobile onboarding screen for a savings app.
Target: first-time smartphone users in Bangladesh.
Show a progress bar at the top (step 1 of 3), a friendly illustration
placeholder, a headline ("Save a little every day"), a subtext line,
and a large primary CTA button.`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Design a mobile payment confirmation screen for bKash users in Bangladesh. The user has just entered an amount (500 BDT) and a recipient phone number. They need to confirm before the money moves. Primary action: Confirm. Secondary: Go back. Show the recipient number and amount clearly. The brand color is #E2136E. Users are on low-end Android, small screens, often outdoors.' },
            { role: 'claude', text: 'Here is your payment confirmation screen:\n\n[Rendered prototype]\n\nDesign decisions made:\n- Large amount (500 BDT) centered and bold, easy to verify at a glance outdoors\n- Recipient number in a distinct monospace block to reduce misread errors\n- Confirm button full-width, primary pink, large tap target for outdoor/gloved use\n- Back link as text below the button, not a competing button (reduces accidental taps)\n- High contrast throughout (WCAG AA on small screens)\n\nWant me to add a loading state or error state?' },
          ],
        },
      },
      {
        title: 'Iterate on one thing at a time',
        description:
          'Claude Design generates working code, which means you can iterate on it. Ask for one change at a time: adjust the layout, swap the color, add a state. Asking for five changes at once produces a rewrite that drifts from what was working.',
        code: {
          snippet: `The illustration is too large on small screens. Replace it with an icon
(piggy bank or similar). Keep the progress bar and reduce overall padding
so the CTA button is always above the fold on a 5-inch screen.`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'The layout is right. Now add a warning if the amount is over 2000 BDT: a yellow banner saying "Large transfer: verify the recipient number before confirming." Keep everything else the same.' },
            { role: 'claude', text: 'Added the warning banner. It appears conditionally when amount > 2000 BDT.\n\n[Updated rendered prototype]\n\nThe banner sits between the recipient info and the Confirm button so it intercepts the user\'s eye path before they tap. Yellow #FFF3CD with a warning icon. Text matches your requested copy exactly.\n\nThe rest of the screen is unchanged.' },
          ],
        },
      },
      {
        title: 'Export the prototype and hand it off',
        description:
          'Once the prototype does what you need, export the generated code or copy it directly. You can paste it into a Claude Code session for further development, share the live URL for stakeholder review, or use the code as a written component specification (reference spec) for the development team.',
        code: {
          snippet: `Generate a written spec for the developer. Include: component list,
exact copy for each text element, color tokens used (use my working
agreement for the token names), and the mobile breakpoint assumptions.`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'The prototype is approved. How do I get the code out so I can give it to the developer?' },
            { role: 'claude', text: 'Two options:\n\n1. Copy the source code: click the code view icon in the top right of the prototype panel. Copy the full component.\n\n2. Share the live URL: the prototype runs at a shareable URL. Send it to stakeholders or developers as a live reference. It stays active as long as this conversation exists.\n\nIf the developer is using Claude Code, the most efficient handoff is to paste the component code into a new Claude Code session with this prompt: "This is a Claude Design prototype. Clean it up for production: replace inline styles with Tailwind, add proper TypeScript types, wire the Confirm button to [your API endpoint]." That gets you from prototype to production-ready in one more step.' },
          ],
        },
      },
      {
        title: 'Common mistakes',
        description: 'Four failure modes when using Claude Design.',
        list: [
          'Describing appearance instead of purpose. "Clean and modern with a blue header" gives Claude aesthetic direction but no functional constraints. Describe who uses it, what they are trying to do, and what constraints they are under. The aesthetic follows from that.',
          'Iterating in batches. Asking for five changes at once produces a rewrite. Each change you request touches different parts of the prototype. One at a time keeps each iteration reviewable and reversible.',
          'Treating the prototype as final. Claude Design prototypes are fast to generate and fast to throw away. They are for testing an idea, not shipping a product. Before the code goes to a developer, it needs a cleanup pass: proper types, real API calls, accessibility attributes.',
          'Not exporting the spec. A live prototype URL works for demos but not as a handoff document. The written component specification (reference spec) is what a developer can build from without needing to open the prototype. Generate it before closing the session.',
        ],
      },
    ],
    nextLink: {
      label: 'Synthesize user research with Claude',
      href: '/for-designers/research-synthesis',
    },
  },

  'research-synthesis': {
    title: 'Synthesize User Research with Claude',
    slug: 'research-synthesis',
    duration: '20 min',
    difficulty: 'beginner',
    availableRoutes: ['claude-ai', 'co-work', 'claude-code'],
    description:
      'Turn raw interview notes, session recordings, and survey responses into prioritised findings in one session. Claude handles the pattern-matching; you handle the judgment.',
    intro:
      'This guide is for UX and UI designers who have completed user interviews and need to turn raw notes into a structured findings report. After reading it, you will be able to format notes for synthesis, run a structured thematic analysis with Claude, and challenge the output before presenting it. You ran five user interviews. You have 40 pages of raw notes. You need a findings report by Friday. Without Claude, this is hours of manual affinity mapping (grouping related observations into themes) and theme extraction. With Claude, it is a focused session where you paste the raw material, run the synthesis, and then review and challenge the output. The review step matters: Claude finds patterns, but you know which patterns are real and which are artifacts of who you recruited.',
    situation: {
      scene: 'You ran five user interviews. You have 40 pages of raw notes and a findings report due Friday. Manual affinity mapping takes hours you do not have.',
      outcome: 'You\'ll turn raw notes into a structured findings report with themes, participant counts, and verbatim quotes, then challenge it before you present anything.',
    },
    outcomes: [
      'A thematic synthesis of your raw notes with participant counts and verbatim quotes per theme',
      'Three to five prioritised design implications ready to take into a sprint',
      'A challenge pass that flags sampling artifacts before you present to stakeholders',
    ],
    promptContrast: {
      bad: 'Summarise these user research notes.',
      good: 'Here are verbatim notes from 6 user interviews. Research question: why do users abandon the checkout flow? Identify the top 3 themes, include one verbatim quote per theme, and flag any theme raised by only one participant.',
      why: 'The research question anchors synthesis to a decision, not a summary. Asking for quote counts surfaces thin themes before you present them as validated findings.',
    },
    steps: [
      {
        title: 'Prepare your raw notes for paste',
        description:
          'Claude works best on structured raw material. Before pasting, add a one-line header to each participant\'s notes with their ID, role, and key context. You do not need to clean up the notes themselves: verbatim quotes and fragmented observations are fine.',
        code: {
          snippet: `# Format for paste-in synthesis

## P01 | Role: Small business owner | Device: Android, 4G | Session: 45 min
[raw notes verbatim here]

## P02 | Role: Freelance driver | Device: Feature phone, 2G | Session: 30 min
[raw notes verbatim here]

# Keep the headers consistent -- Claude uses them to
# cross-reference findings across participants`,
          language: 'markdown',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I have 5 interview transcripts from bKash users. What format should I paste them in so you can run a reliable synthesis?' },
            { role: 'claude', text: 'Use this structure: one section per participant, with a one-line header that includes their ID, role, and any context that affects interpretation (device type, experience level, location).\n\n## P01 | Role: market vendor | Device: Android, low-end | Location: Dhaka\n[raw notes]\n\n## P02 | Role: garment worker | Device: feature phone | Location: Chittagong\n[raw notes]\n\nDo not clean the notes before pasting. Verbatim quotes are more useful than paraphrased summaries because I can identify the precise language users reach for. Fragmented observations are fine.\n\nOnce pasted, tell me: what is the research question this study was trying to answer?' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'cat notes-p01.md notes-p02.md notes-p03.md notes-p04.md notes-p05.md > all-notes.md' },
            { type: 'cmd', text: 'claude' },
            { type: 'out', text: 'Session started. all-notes.md available in working directory.' },
            { type: 'success', text: 'Ready. Reference all-notes.md in your synthesis prompt.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I have saved all 5 interview transcripts as all-notes.md in the project root. Read it and confirm you can see all 5 participants before I run the synthesis.' },
            { role: 'claude', text: 'Read all-notes.md. Confirmed 5 participants:\n\n- P01: small business owner, Dhaka, Android\n- P02: garment worker, Chittagong, feature phone\n- P03: freelance driver, Sylhet, Android\n- P04: market vendor, Rajshahi, feature phone\n- P05: domestic worker, Dhaka, Android\n\nTotal: 47 pages of notes. Ready for synthesis. What was the research question?' },
          ],
        },
      },
      {
        title: 'Run the synthesis prompt',
        description:
          'Give Claude a specific synthesis task, not a general "summarise these notes" request. Specify the output structure you need: themes, supporting quotes, participant counts, and a severity or frequency marker. A structured output is easier to review and easier to present.',
        code: {
          snippet: `Here are my raw interview notes. Identify the top 5 themes.
For each theme: name it, write one sentence describing it,
list the 2-3 quotes that support it, and rate confidence
(high/medium/low based on how many participants mentioned it).
Do not invent themes that are not in the notes.`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Research question: Why do bKash users abandon the Send Money flow before confirming? Run a thematic synthesis. For each theme: name it, count which participants mentioned it, include one verbatim quote, and rate frequency (all/most/some/one). Then list the top 3 design implications.' },
            { role: 'claude', text: 'Synthesis complete. 4 themes found:\n\n**Theme 1: Amount entry anxiety** (all 5 participants)\nUsers hesitate on the amount field because there is no indication of fees, limits, or reversal policy until after they confirm.\nQuote (P03): "I always type less than I mean to send because I am not sure if there is a charge on top."\n\n**Theme 2: Recipient number uncertainty** (4/5 participants)\nUsers double-check the phone number 2-3 times before tapping Confirm. The number is displayed in a small, light font that is hard to read outdoors.\nQuote (P01): "I sent money to the wrong number once. Now I write it on paper first."\n\n**Theme 3: Confirmation step distrust** (3/5 participants)\nUsers are not sure if tapping Confirm immediately moves money or if there is another step. Several tapped then immediately looked for a Cancel button.\nQuote (P04): "After I tap, I do not know if it is done or if I can still stop it."\n\n**Theme 4: Success state ambiguity** (2/5 participants)\nThe success screen does not clearly show the final amount with fees included. Users are unsure what was actually deducted.\nQuote (P02): "The green tick appears but I check my balance separately to know if it worked."\n\n**Top 3 design implications:**\n1. Show fee and final amount before confirmation, not after\n2. Increase recipient number display size and contrast\n3. Add explicit "Transfer in progress" state and clear success with final deduction' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "Read all-notes.md. Run thematic synthesis for: why do users abandon the Send Money flow? Output: theme name, participant count, one verbatim quote, frequency rating. Top 3 design implications."' },
            { type: 'out', text: 'Reading all-notes.md...', delay: 300 },
            { type: 'out', text: 'Identifying themes across 5 participants...', delay: 800 },
            { type: 'out', text: 'Theme 1: Amount entry anxiety (all 5)' },
            { type: 'out', text: 'Theme 2: Recipient number uncertainty (4/5)' },
            { type: 'out', text: 'Theme 3: Confirmation step distrust (3/5)' },
            { type: 'out', text: 'Theme 4: Success state ambiguity (2/5)' },
            { type: 'success', text: 'Synthesis complete. 4 themes, 3 design implications.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Run the thematic synthesis on all-notes.md. Research question: why do users abandon Send Money before confirming? I need: theme name, participant count, verbatim quote, frequency. Top 3 design implications at the end.' },
            { role: 'claude', text: 'Synthesis complete. 4 themes across 5 participants.\n\nSaved to synthesis-output.md in the project root for review.\n\nShort version:\n1. Amount entry anxiety (5/5): no fee visibility before confirm\n2. Recipient uncertainty (4/5): number too small to verify outdoors\n3. Confirmation distrust (3/5): unclear if tap is final or has another step\n4. Success ambiguity (2/5): green tick does not show final deducted amount\n\nTop 3 design implications: pre-confirm fee display, larger recipient number with high contrast, explicit in-progress state with clear success summary.' },
          ],
        },
      },
      {
        title: 'Challenge the synthesis before presenting it',
        description:
          'Claude finds patterns in what you gave it. It cannot know if your participant sample was skewed, if a quote was taken out of context, or if a theme is real versus a product of your recruitment criteria. Before you present the findings, interrogate them.',
        code: {
          snippet: `Play devil\'s advocate on theme 2. What evidence in the notes
contradicts it or suggests a different interpretation? What would
a skeptic say about this finding?`,
          language: 'text',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Devil\'s advocate: which of these 4 themes is most likely to be a sampling artifact rather than a real user problem? All 5 of my participants were urban Android users with prior bKash experience.' },
            { role: 'claude', text: 'Theme 4 (success state ambiguity) is the most suspect.\n\nReasoning: experienced urban users with Android have a mental model of mobile payments. They have been burned once or twice and learned to check their balance. That learned behaviour masks a problem that first-time or rural users may experience much more acutely.\n\nYour sample may have muted the signal on success state issues precisely because your participants have worked around it.\n\nRecommendation: weight Theme 4 as "requires validation with first-time users" rather than a confirmed finding. Do not drop it, but flag it. The other three themes (amount anxiety, recipient uncertainty, confirmation distrust) are less likely to be sample artifacts since experienced users mentioning them suggests the friction is real, not a literacy issue.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "All 5 participants were urban Android users with prior bKash experience. Which theme is most likely a sampling artifact? Which finding needs validation with a different user group?"' },
            { type: 'out', text: 'Evaluating sample bias...', delay: 400 },
            { type: 'warn', text: 'Theme 4 most likely artifact: experienced users have workarounds' },
            { type: 'out', text: 'Themes 1-3: confirmed by experienced users -> likely understate severity' },
            { type: 'success', text: 'Flag Theme 4 as needs-validation. Proceed with Themes 1-3 as confirmed.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'My sample was all urban, Android, experienced bKash users. Which of the 4 themes needs a caveat before I present it? I do not want to overstate findings.' },
            { role: 'claude', text: 'Flag Theme 4 (success state ambiguity) as "preliminary, requires validation with first-time users."\n\nThe experienced sample likely underreports this because they have a compensation strategy (checking balance separately). First-time users do not have that workaround and may experience much higher anxiety.\n\nFor Themes 1-3: if anything, experienced urban users mentioning them is a stronger signal than you might expect. These are people who have worked around the app\'s friction for months and are still hitting it. Severity in the real user base is probably higher.\n\nSuggested caveat for your report: "Findings validated with experienced urban users. Theme 4 requires follow-up sessions with first-time users in peri-urban and rural contexts."' },
          ],
        },
      },
      {
        title: 'Common mistakes',
        description: 'Four failure modes in research synthesis with Claude.',
        list: [
          'Cleaning the notes before pasting them. Paraphrasing your own notes before synthesis removes the raw language participants used and replaces it with your interpretation. Paste verbatim. Messy is fine.',
          'Not specifying the research question. "Summarise these notes" produces a surface-level summary. "Identify themes related to why users abandon the checkout flow" produces findings you can act on. Always give Claude the research question before running the synthesis.',
          'Presenting the synthesis without the challenge step. Claude will find the most statistically prominent patterns in your notes. It cannot tell you which patterns are sample artifacts, which quotes are outliers, or which themes your recruitment criteria inflated. The challenge step is not optional if you are presenting to stakeholders.',
          'Using Claude to generate themes you then present as your own analysis. The synthesis is a starting point for your judgment, not the final analysis. If a theme Claude found does not ring true to you based on being in the room, flag it as tentative or drop it. Your presence in the sessions is data that Claude does not have.',
        ],
      },
    ],
    nextLink: {
      label: 'Automate repetitive design tasks',
      href: '/for-designers/automate-design-tasks',
    },
  },

  'automate-design-tasks': {
    title: 'Automate Repetitive Design Tasks',
    slug: 'automate-design-tasks',
    duration: '20 min',
    difficulty: 'beginner',
    availableRoutes: ['claude-ai', 'co-work', 'claude-code'],
    description:
      'Build a personal prompt library for the tasks you run every week: writing copy variants, formatting specs, generating accessibility checklists, and more.',
    intro:
      'This guide is for UX and UI designers who spend time each week on mechanical, repeatable tasks: writing microcopy variants, formatting specs, generating accessibility checklists. After reading it, you will be able to identify your highest-repeat tasks, build a personal prompt library, and run each task in seconds instead of minutes. You probably do the same five things in every project: write microcopy variants, format design specs, check accessibility, write handoff notes, and generate placeholder content. These are not creative tasks. They are mechanical. Claude handles them in seconds if you give it a precise prompt. Key terms used in accessibility prompts in this guide: WCAG AA (the accessibility standard for color contrast and interaction), ARIA label (a text label screen readers announce for interactive elements), CTA (call-to-action button or link), focus order (the sequence keyboard users navigate through interactive elements).',
    situation: {
      scene: 'You spend an hour every week writing the same types of content: error message variants, accessibility rationales, handoff notes. It is mechanical, it is repetitive, and it happens in every project.',
      outcome: 'You\'ll build a personal prompt library for your five highest-repeat tasks and run each one in under 30 seconds.',
    },
    outcomes: [
      'Your five highest-repeat design tasks turned into reusable prompt templates',
      'Each prompt refined until the output needs zero editing before use',
      'A maintenance routine so the library stays lean and does not get stale',
    ],
    promptContrast: {
      bad: 'Write the error message for this form field.',
      good: 'Write 3 variants of the inline error message for an invalid email field. Tone: direct, not apologetic. Max 12 words each. Do not start with "Oops" or "Sorry". Return as a numbered list.',
      why: 'A reusable prompt template specifies tone, length, constraints, and format. Running it produces output you can use without editing. That is the difference between a task and a prompt library entry.',
    },
    steps: [
      {
        title: 'Identify your most repeated tasks',
        description:
          'Think about the last three projects. What tasks did you do more than twice that felt like wasted time? Common answers: writing 3 variants of a button label, reformatting a design spec for a dev ticket, generating placeholder text that fits the layout, writing an accessibility rationale for a component. Create that file now and add one prompt for a task you do every week.',
        appDemo: {
          steps: [
            { role: 'user', text: 'I am a mid-level product designer working on mobile fintech apps. What are the 5 most common design tasks I probably do every week that Claude could handle in under 30 seconds each?' },
            { role: 'claude', text: '1. Microcopy variants: "Write 3 versions of this error message. Current: Transaction failed. Make each progressively more specific about cause and next step."\n\n2. Placeholder content: "Generate 8 realistic transaction labels for a bKash statement. Mix merchants, transfers, and top-ups. Bengali names for merchants. Amounts between 50 and 5000 BDT."\n\n3. Accessibility rationale: "Write the accessibility rationale for this component: [description]. Cover: touch target size, contrast ratio, screen reader label, and keyboard navigation."\n\n4. Handoff notes: "Write developer handoff notes for this component: [spec]. Cover: states, transitions, edge cases, copy strings, token references."\n\n5. Spec reformatting: "Convert this Figma spec into a Jira ticket description with acceptance criteria and definition of done."\n\nSave each of these as a named prompt in your project. Run, edit once, done.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'mkdir ~/design-prompts && touch ~/design-prompts/library.md' },
            { type: 'cmd', text: 'claude "What are 5 design tasks I likely repeat weekly that you can handle in under 30 seconds? I work on mobile fintech."' },
            { type: 'out', text: 'Generating prompt library suggestions...' },
            { type: 'success', text: 'Suggestions ready. Save the ones that fit to ~/design-prompts/library.md' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I want to build a personal prompt library. Start by listing the 5 design tasks I most likely repeat every week. I work on mobile fintech apps, mid-level designer, Figma user, handing off to a React dev team.' },
            { role: 'claude', text: 'Five high-repeat tasks for your context:\n\n1. Microcopy variants (button labels, error messages, empty states): 3 variants per string, each with a different voice or specificity level.\n\n2. Dev handoff spec from Figma notes: structured Markdown with states, copy strings, token references, edge cases.\n\n3. Accessibility checklist per component: touch targets, contrast, ARIA labels, keyboard nav, focus order.\n\n4. Placeholder transaction data: realistic Bengali merchant names, varied amounts, mixed categories.\n\n5. Test scenario generation: given a flow, generate 6 test scenarios covering happy path + 5 edge cases.\n\nI will create prompt templates for each in your project. Save them to a PROMPTS.md file and paste directly next time you need them.' },
          ],
        },
      },
      {
        title: 'Write and refine each prompt once',
        description:
          'Run each task with a specific example from your current project. Refine the prompt until the output is something you would actually use without edits. That refined prompt is the one you save. A prompt that needs output editing every time is not done yet.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Run the microcopy variant task. Current error message: "Transaction failed." Product: bKash mobile app. User just tried to send 500 BDT and got an error. Write 3 variants: one for network failure, one for insufficient balance, one for recipient not registered.' },
            { role: 'claude', text: 'Three variants:\n\n**Network failure**\nCould not connect. Check your internet and try again.\n[Retry] [Cancel]\n\n**Insufficient balance**\nYour bKash balance is too low for this transfer. Top up and try again.\n[Top Up] [Cancel]\n\n**Recipient not registered**\n01XXXXXXXXX is not registered on bKash. Check the number and try again.\n[Edit Number] [Cancel]\n\nEach variant: cause stated in plain language, one clear next step, CTA label matches the action. If these are ready to use, save this prompt structure to your library.' },
            { role: 'user', text: 'The output is good. Here is the prompt I will save:\n\n"Write 3 error message variants for [product name]. Context: [what the user was doing]. Errors: [error type 1], [error type 2], [error type 3]. Format: message + CTA label. Cause in plain language, one next step."' },
            { role: 'claude', text: 'That is a clean template. The bracketed placeholders make it reusable across any flow. One addition to consider: add "Tone: [calm/urgent/neutral]" as a parameter so you can adjust severity by context. But if your product always uses the same tone, drop it. A simpler prompt you will actually use beats a comprehensive one you will skip.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'claude "Error message: Transaction failed. Product: bKash. Variants: network failure, low balance, recipient not registered. Format: message + CTA label. Plain language, one next step each."' },
            { type: 'out', text: 'Generating 3 error message variants...', delay: 300 },
            { type: 'out', text: 'Variant 1 (network): Could not connect. Check internet and retry.' },
            { type: 'out', text: 'Variant 2 (balance): Balance too low. Top up and try again.' },
            { type: 'out', text: 'Variant 3 (unregistered): Number not on bKash. Check and retry.' },
            { type: 'success', text: 'All 3 ready. Save the prompt structure to library.md.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Run: error message variants. Product: bKash. Action: sending 500 BDT. Three errors: network failure, low balance, recipient not registered. Plain language, cause + next step + CTA for each.' },
            { role: 'claude', text: 'Three variants:\n\nNetwork failure: "Could not connect. Check your internet and try again." | [Retry]\n\nLow balance: "Your balance is too low for this transfer. Top up first." | [Top Up]\n\nNot registered: "01XXXXXXXXX is not on bKash. Check the number." | [Edit Number]\n\nAll three follow: cause (plain) + action (specific) + CTA (matches action). Ready to use without edits?' },
          ],
        },
      },
      {
        title: 'Build and maintain your prompt library',
        description:
          'Create a PROMPTS.md file in your project (or in a personal notes app). For each prompt: give it a name, record the exact text, and note what good output looks like. Review it every month. Remove prompts that have stopped working or that Claude now handles without instruction. Add prompts for any new task types you have started doing repeatedly. A stale prompt library is worse than no library: you waste time running prompts that produce output you have to edit, which defeats the purpose.',
        code: {
          snippet: `# PROMPTS.md -- Design Prompt Library

## error-message-variants
**When to use:** Writing error states for mobile flows
**Prompt:**
Write 3 error message variants for [product].
Context: user was [action].
Errors: [type 1], [type 2], [type 3].
Format: message + CTA label. Cause in plain language, one next step each.
**Good output looks like:** specific cause, one CTA, no jargon

## a11y-checklist
**When to use:** Before handing off any interactive component
**Prompt:**
Write an accessibility checklist for this component: [description].
Cover: touch target (min 44x44px), contrast (WCAG AA),
ARIA label, keyboard nav, focus order.
Flag any item that needs a design decision, not just a dev fix.
**Good output looks like:** checklist with pass/flag/fix per item`,
          language: 'markdown',
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I want to maintain this library over time without it getting bloated. What is a good review process for a prompt library?' },
            { role: 'claude', text: 'Monthly review, three questions per prompt:\n\n1. Did I use this in the last 30 days? If no, mark it [UNUSED]. If unused for 60 days, delete it.\n\n2. Did the output ever need significant editing? If yes, the prompt is not done. Revise it or drop it.\n\n3. Is the context still accurate? Prompts tied to a specific product or team change as the product changes. Update the context variables.\n\nKeep the library under 10 prompts. If you have more than 10, you are saving prompts you think you might use instead of prompts you actually use. The smaller the library, the more often you reach for it.' },
          ],
        },
        demo: {
          steps: [
            { type: 'cmd', text: 'cat ~/design-prompts/library.md | wc -l' },
            { type: 'out', text: '47 lines (about 8 prompts)' },
            { type: 'cmd', text: 'claude "Review my prompt library. Flag any that are too vague to produce consistent output or that overlap with another prompt."' },
            { type: 'warn', text: 'Prompt 3 (spec-writer) overlaps with Prompt 7 (handoff-notes). Consider merging.' },
            { type: 'warn', text: 'Prompt 5 (copy-review) is too vague: no format or success criteria defined.' },
            { type: 'success', text: 'Review complete. 2 prompts to clean up.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Read PROMPTS.md and flag any prompts that are too vague to produce consistent output without edits, or that overlap so much that I should merge them.' },
            { role: 'claude', text: 'Read PROMPTS.md. Two issues:\n\n1. `spec-writer` and `handoff-notes` produce nearly identical output. The difference is format (Markdown vs Jira). Merge them into one prompt with a `[format: markdown | jira]` parameter.\n\n2. `copy-review` has no success criteria: "improve the copy" produces inconsistent results because "improve" means different things each time. Add: "Flag: clarity, length, tone. Suggest one specific rewrite per flag."\n\nThe other 6 prompts are tight. Run them as-is.' },
          ],
        },
      },
      {
        title: 'Common mistakes',
        description: 'Four failure modes in building a prompt library.',
        list: [
          'Saving prompts that need output editing. A prompt is not done until the output is usable without changes. If you save a prompt and then edit the result every time, the prompt has not solved the problem. Iterate on the prompt until it produces clean output, then save it.',
          'Building the library too fast. Adding all your tasks at once produces a library you never refine. Add one prompt at a time, run it on a real task, and only save it once it produces output you would use. Quality over completeness.',
          'Using vague task names. "Copy" and "spec" are not usable names when you are scanning a list of 8 prompts under deadline pressure. Use names that say what the prompt does: "error-message-variants" and "a11y-checklist-per-component" are findable. "Copy" and "Check" are not.',
          'Never running the monthly review. Prompts that worked six months ago may produce worse output now because Claude has improved and handles certain requests differently. Remove prompts Claude now handles well without instruction, and update prompts where the output quality has drifted.',
        ],
      },
    ],
    nextLink: {
      label: 'Back to all designer guides',
      href: '/for-designers',
    },
  },

  'git-for-designers': {
    title: 'Git for Designers',
    slug: 'git-for-designers',
    duration: '25 min',
    difficulty: 'beginner',
    availableRoutes: ['claude-code'],
    description:
      'Commits, branches, pull requests, and undo explained for designers working with Claude Code. Read this before Guide 07.',
    intro:
      'This guide is for UX and UI designers with no prior Git experience. After reading it, you will be able to start a new project repo, save and share your work, undo a commit, and open a pull request for a developer to review. You do not need to understand version control theory. You need to understand what each command does in plain English. Claude Code can commit changes as it works, but you control when that happens. Six concepts: setting up a repo, commits, push, pull, undoing mistakes, and pull requests. If you are starting from scratch, begin at Step 1. If your project already has a repo (a .git folder exists), skip to Step 2.',
    situation: {
      scene: 'You are working with Claude Code and it keeps mentioning commits, branches, and pull requests. You do not know what those mean. You are worried about breaking something or losing your work.',
      outcome: 'You\'ll understand enough Git to work confidently with Claude Code: save your work, undo mistakes, and share files with a developer without memorising commands.',
    },
    outcomes: [
      'A working Git repo set up and connected to GitHub in under 5 minutes',
      'The six Git concepts you actually need: repo, commit, push, pull, undo, and pull request',
      'Enough vocabulary to follow what Claude Code is doing and tell it what you want',
    ],
    steps: [
      {
        title: 'Start a new project repo',
        description:
          'Before Claude Code can save your work, you need a Git repository. Open Terminal (Mac: press Command + Space, type Terminal, press Enter. Windows: press Windows key, type PowerShell, press Enter). Every command in this guide is typed there and run with Enter. You also need a free GitHub account at github.com and a new empty repo created there before running git remote add (go to github.com/new, click New repository, leave it empty). The last command, claude, starts your Claude Code session. If it shows "command not found", install Claude Code at claude.ai/download first.',
        code: {
          snippet: `# 1. Create your project folder and enter it
mkdir my-design-project
cd my-design-project

# 2. Initialise Git (creates the .git folder)
git init

# 3. Go to github.com/new, create an empty repo, then paste its URL below
git remote add origin https://github.com/your-username/my-design-project.git

# 4. Start Claude Code (install at claude.ai/download if needed)
claude`,
          language: 'bash',
        },
        demo: {
          title: 'git : init-and-connect',
          steps: [
            { type: 'cmd', text: 'git init' },
            { type: 'out', text: 'Initialized empty Git repository in ./my-design-project/.git/' },
            { type: 'cmd', text: 'git remote add origin https://github.com/you/my-design-project.git', delay: 300 },
            { type: 'success', text: 'Remote connected. Commits will push here.' },
            { type: 'cmd', text: 'claude', delay: 300 },
            { type: 'success', text: 'Claude Code ready. Git is live.' },
          ],
        },
      },
      {
        title: 'What a commit is',
        description:
          'A commit is a named save point. When Claude edits a file and commits the change, that save point exists permanently in your project history. Think of it like Google Docs version history, except permanent and navigable from any point. If you have made any commits already, run git log --oneline to see them. On a brand-new project, this returns nothing yet and that is expected.',
        code: {
          snippet: `# See your commit history (one line per commit)
# On a brand-new project this returns nothing -- that is normal
git log --oneline`,
          language: 'bash',
        },
        demo: {
          title: 'git : what-is-a-commit',
          steps: [
            { type: 'cmd', text: 'git log --oneline' },
            { type: 'out', text: 'a3f92c1  Add mobile nav hover states' },
            { type: 'out', text: 'b19e44d  Fix checkout button spacing' },
            { type: 'out', text: 'c880f2a  Initial design system setup' },
            { type: 'success', text: 'Each line is a commit. Short ID + message.' },
          ],
        },
      },
      {
        title: 'Make a commit',
        description:
          'After Claude edits your files, you commit those changes to save them to history. Three commands: check what changed, stage the files you want to save, commit with a message.',
        code: {
          snippet: `# See what Claude changed
git status

# Stage all changed files
git add .

# Commit with a message
git commit -m "Update button component spacing"`,
          language: 'bash',
        },
        demo: {
          title: 'git : making-a-commit',
          steps: [
            { type: 'cmd', text: 'git status' },
            { type: 'out', text: 'Modified: src/components/Button.tsx' },
            { type: 'out', text: 'Modified: src/styles/tokens.css' },
            { type: 'cmd', text: 'git add .' },
            { type: 'cmd', text: 'git commit -m "Update button component spacing"' },
            { type: 'success', text: 'Committed. Changes saved to history.' },
          ],
        },
      },
      {
        title: 'Push and pull',
        description:
          'Your local commits only exist on your machine until you push them. The first time you push a new project, use git push -u origin main. The -u links your local branch to GitHub so all future pushes in this project can use plain git push. Pull brings in commits from GitHub. Working solo: push after each session and pull when you start a new one.',
        code: {
          snippet: `# First push on a new project (use -u to link your branch to GitHub)
git push -u origin main

# All future pushes in the same project
git push

# Get the latest commits from GitHub
git pull`,
          language: 'bash',
        },
        demo: {
          title: 'git : push-and-pull',
          steps: [
            { type: 'cmd', text: 'git push -u origin main' },
            { type: 'out', text: 'Writing objects: 100% (5/5)' },
            { type: 'success', text: 'Pushed. Branch linked to GitHub.' },
            { type: 'cmd', text: 'git pull', delay: 300 },
            { type: 'success', text: 'Already up to date.' },
          ],
        },
      },
      {
        title: 'Undo a commit',
        description:
          'If Claude made changes you want to reverse, git revert creates a new commit that undoes a previous one. It does not delete history. It adds an undo on top. Safer than git reset for anything already pushed to GitHub. The --no-edit flag skips the commit message editor (otherwise Git opens vim, which requires typing :wq to exit).',
        code: {
          snippet: `# See recent commits and find the one to undo
git log --oneline

# Undo that commit (replace the ID with yours, --no-edit skips the editor)
git revert a3f92c1 --no-edit

# Push the undo to GitHub
git push`,
          language: 'bash',
        },
        demo: {
          title: 'git : undo-a-commit',
          steps: [
            { type: 'cmd', text: 'git log --oneline' },
            { type: 'out', text: 'a3f92c1  Add mobile nav hover states  ← want to undo this' },
            { type: 'out', text: 'b19e44d  Fix checkout button spacing' },
            { type: 'cmd', text: 'git revert a3f92c1 --no-edit', delay: 300 },
            { type: 'out', text: 'Revert "Add mobile nav hover states"', delay: 200 },
            { type: 'success', text: 'Reverted. Files restored. History preserved.' },
          ],
        },
      },
      {
        title: 'What a pull request is',
        description:
          'A branch is an isolated copy of your project where changes happen without affecting the main version. When you work with Claude Code on a new feature, Claude creates a branch. When the work is ready, you open a pull request: a proposal to merge the branch\'s changes into the main version. A developer reviews it, then merges it. That is how changes move from "Claude built this" to "this is in the product". The gh pr create command requires the GitHub CLI (install at cli.github.com).',
        code: {
          snippet: `# Create a branch for a new feature
git checkout -b feature/new-checkout-flow

# ... Claude Code works here and commits changes ...

# Open a pull request (requires GitHub CLI: cli.github.com)
gh pr create --title "New checkout flow" --body "Built with Claude Code"`,
          language: 'bash',
        },
        demo: {
          title: 'git : pull-request-flow',
          steps: [
            { type: 'cmd', text: 'git checkout -b feature/new-checkout-flow' },
            { type: 'out', text: 'Switched to new branch "feature/new-checkout-flow"' },
            { type: 'out', text: 'Claude Code working on this branch...' },
            { type: 'success', text: 'Changes committed to branch.' },
            { type: 'cmd', text: 'gh pr create --title "New checkout flow" --body "Built with Claude Code"' },
            { type: 'success', text: 'PR created. Share the link with your dev for review.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Build your first flow with Claude Code',
      href: '/for-designers/build-your-first-flow',
    },
  },
};
