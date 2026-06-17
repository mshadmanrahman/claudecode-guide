export type HrRoute = "recruiting" | "people-ops" | "communication";

export interface HrGuideStep {
  title: string;
  description: string;
  list?: string[];
  code?: { snippet: string; language?: string };
  appDemo?: {
    steps: Array<{ role: "user" | "claude"; text: string; delay?: number }>;
  };
}

export interface HrGuide {
  title: string;
  slug: string;
  duration: string;
  difficulty: "beginner" | "intermediate";
  description: string;
  intro: string;
  situation?: { scene: string; outcome: string };
  outcomes?: string[];
  promptContrast?: { bad: string; good: string; why?: string };
  steps: HrGuideStep[];
  nextLink: { label: string; href: string };
  availableRoutes?: HrRoute[];
}

export const HR_GUIDES: Record<string, HrGuide> = {
  "write-job-descriptions-with-claude": {
    title: "Write Job Descriptions That Attract the Right Candidates",
    slug: "write-job-descriptions-with-claude",
    duration: "10 min",
    difficulty: "beginner",
    availableRoutes: ["recruiting"],
    description:
      "Turn a hiring brief into a clear, specific job description that filters in strong candidates and filters out mismatches — without the usual boilerplate.",
    intro:
      "Most job descriptions read like legal disclaimers. They are exhaustive on requirements, vague on role, and silent on why anyone would want the job. Claude can write a better one, but only if you give it the real hiring context. This guide walks through exactly what to include.",
    situation: {
      scene:
        "You have a new role to fill and a rough idea of what the person will do. The job description is not written yet, or the existing one has not been updated in two years.",
      outcome:
        "After this guide you will have a job description that is honest about the role, specific about requirements, and readable by the kind of candidate you actually want.",
    },
    outcomes: [
      "A complete job description in under 10 minutes",
      "A reusable prompt template for any future hire",
      "Fewer irrelevant applications to screen",
    ],
    promptContrast: {
      bad: "write a job description for a product manager",
      good: `Write a job description for a mid-level Product Manager at a B2B SaaS company (Series B, 80 people). The PM owns our search product — a site-search tool used by e-commerce clients. They will work directly with 2 engineers and a designer, report to the VP Product, and own the roadmap. Must-have: 3+ years of PM experience, comfort with SQL for data pulls, and experience shipping search or discovery features. Nice-to-have: experience at a marketplace or e-commerce company. Avoid corporate jargon. Include a short "About the role" paragraph, responsibilities (6-8 bullets), requirements split into must-have and nice-to-have, and one paragraph on what makes this role interesting.`,
      why: 'Company stage, team size, reporting line, must-have vs nice-to-have, and the "why this role is interesting" paragraph are the inputs that produce a description worth reading.',
    },
    steps: [
      {
        title: "Gather the five real inputs before you start",
        description:
          "A generic job description comes from generic inputs. Have these ready before opening Claude.",
        list: [
          "Role level and scope: what the person owns, not just what they do (owns the roadmap, manages vendors, etc.)",
          "Team context: who they work with, who they report to, team size",
          "Must-have requirements: the short list of things a candidate cannot succeed without",
          "Nice-to-have requirements: genuinely optional, not hidden requirements",
          "Why this role is interesting: the one or two real reasons a strong candidate would want it",
        ],
      },
      {
        title: "Use the structured prompt template",
        description:
          "Copy the template below and replace the placeholders with your real inputs. Works for any function.",
        code: {
          snippet: `Write a job description for a [level] [role title] at [company description — stage, size, industry].

This person will [what they own and do in 1-2 sentences].
They will work with [team composition] and report to [manager title].

Must-have requirements:
- [requirement 1]
- [requirement 2]
- [requirement 3]

Nice-to-have:
- [requirement 1]
- [requirement 2]

What makes this role interesting: [1-2 honest reasons]

Format: short "About the role" intro, 6-8 responsibility bullets, requirements split into must-have and nice-to-have, and a closing paragraph about the team or company. Avoid filler phrases like "fast-paced environment" or "passionate about excellence."`,
          language: "text",
        },
      },
      {
        title: "Review for two failure modes",
        description:
          "Before posting, check for the two patterns that undermine most job descriptions.",
        list: [
          'Inflated requirements: "10+ years required" for a role that a strong 4-year candidate could do. This filters out people you want.',
          'Vague responsibility language: "Collaborate cross-functionally to drive alignment" tells a candidate nothing. Replace each vague bullet with something measurable or observable.',
        ],
      },
      {
        title: "Iterate with a specific follow-up",
        description:
          "If the first draft is too formal, too long, or missing something, tell Claude exactly what to fix.",
        code: {
          snippet: `The tone is too corporate. Rewrite the responsibilities section in plain language — short sentences, no passive voice. Keep the same information but write it the way a hiring manager would explain the role in a 10-minute call.`,
          language: "text",
        },
      },
    ],
    nextLink: {
      label: "Next: Generate interview questions for this role",
      href: "/for-hr/generate-interview-questions-with-claude",
    },
  },

  "generate-interview-questions-with-claude": {
    title: "Generate Interview Questions for Any Role",
    slug: "generate-interview-questions-with-claude",
    duration: "8 min",
    difficulty: "beginner",
    availableRoutes: ["recruiting"],
    description:
      "Build a bank of behavioral and situational interview questions tailored to the specific role, level, and competencies you are actually hiring for.",
    intro:
      "Generic interview questions produce generic answers. 'Tell me about a time you showed leadership' will get you a rehearsed story that tells you almost nothing. Claude can generate role-specific questions tied to the exact competencies you care about — but only if you name them.",
    situation: {
      scene:
        "An interview is coming up and you need a set of questions that will actually help you evaluate the candidate against what the role requires.",
      outcome:
        "After this guide you will have a structured question bank with behavioral, situational, and role-specific questions, plus follow-up probes for each.",
    },
    outcomes: [
      "A full question bank in under 10 minutes",
      "Questions mapped to the competencies that matter for this role",
      "Follow-up probes that surface real evidence, not rehearsed answers",
    ],
    promptContrast: {
      bad: "give me interview questions for a product manager",
      good: `Generate interview questions for a mid-level Product Manager hiring for a search product at a B2B SaaS company. The three competencies I most need to assess are: (1) data-driven decision making, (2) managing competing stakeholder priorities, and (3) experience shipping discovery or search features. For each competency, give me one behavioral question (STAR format), one situational question, and two follow-up probes I can use if the initial answer is too vague. Also include two questions specifically about their approach to working with engineers.`,
      why: "Naming the three competencies and the role context produces questions you can actually use to compare candidates. Follow-up probes matter most — they are what separates a real answer from a coached one.",
    },
    steps: [
      {
        title: "Name the three competencies you most need to assess",
        description:
          "The single biggest improvement you can make is being specific about what you are measuring. Pick three that are genuinely important for this role, not a generic skills list.",
        list: [
          'Avoid naming soft skills you would want in anyone ("communication," "teamwork"). These produce generic questions.',
          'Name role-specific behaviors: "ability to diagnose underperforming campaigns from data" or "managing a migration project with multiple technical dependencies."',
          'If you are unsure what the role requires, ask Claude to help: "What are the three highest-signal competencies to assess for [role description]?"',
        ],
      },
      {
        title: "Use the structured prompt with your competencies",
        description:
          "Give Claude the role context and your three competencies, and ask for behavioral questions, situational questions, and follow-up probes.",
        code: {
          snippet: `Generate interview questions for [role title and level] at [company/team context].

The three competencies I most need to assess are:
1. [Competency 1]
2. [Competency 2]
3. [Competency 3]

For each competency give me:
- One behavioral question (starting with "Tell me about a time...")
- One situational question (starting with "Imagine you are...")
- Two follow-up probes to use if the first answer is too surface-level

Also give me two questions about [specific role requirement, e.g. "working with a remote engineering team" or "prioritising under a tight deadline"].`,
          language: "text",
        },
      },
      {
        title: "Add a debrief rubric",
        description:
          "Ask Claude to generate a simple scoring rubric alongside the questions so interviewers are comparing candidates on the same criteria.",
        code: {
          snippet: `For each of the three competencies above, add a simple 3-level rubric: what a weak answer looks like, what a strong answer looks like, and what a exceptional answer looks like. Keep each level to one sentence.`,
          language: "text",
        },
      },
    ],
    nextLink: {
      label: "Next: Create an onboarding plan",
      href: "/for-hr/create-onboarding-plans-with-claude",
    },
  },

  "create-onboarding-plans-with-claude": {
    title: "Create Onboarding Plans and Welcome Materials",
    slug: "create-onboarding-plans-with-claude",
    duration: "12 min",
    difficulty: "beginner",
    availableRoutes: ["people-ops"],
    description:
      "Build a 30-60-90 day onboarding plan, a first-week schedule, and a new joiner welcome email — tailored to the specific role and team.",
    intro:
      'A new hire\'s first 90 days shape whether they stay, perform, and engage. Most onboarding plans are either too generic ("read the handbook, meet the team") or too overwhelming. Claude can structure a useful plan, but you need to give it the real context: what success looks like by 90 days and what the person needs to learn to get there.',
    situation: {
      scene:
        "Someone accepted an offer and starts in two weeks. You need to prepare materials so their first days are structured and useful, not just a series of unconnected meetings.",
      outcome:
        "After this guide you will have a 30-60-90 plan, a first-week schedule, and a welcome email — all specific to the role.",
    },
    outcomes: [
      "A 30-60-90 day plan with clear milestones",
      "A structured first-week schedule",
      "A welcome email that sets the right tone from day one",
    ],
    steps: [
      {
        title: "Define what success looks like by day 90",
        description:
          "This is the input most onboarding plans skip. Before writing anything, answer: what should this person be doing independently by the end of month three? That answer structures everything else.",
        list: [
          "Month 1 goal: understand the context — product, team, processes, key stakeholders",
          "Month 2 goal: contribute — take on a real deliverable with support",
          "Month 3 goal: own — run something end-to-end without being managed step by step",
        ],
      },
      {
        title: "Generate the 30-60-90 plan",
        description:
          "Give Claude the role and your success milestones and ask it to structure the plan.",
        code: {
          snippet: `Write a 30-60-90 day onboarding plan for a new [role title] joining [team/department] at [company type].

Context:
- The team is [team size and what they do]
- Key stakeholders they need to know: [list 3-4]
- The tools and systems they will use: [list main ones]
- By day 90 they should be able to: [describe the 1-2 main things they should own independently]

Structure the plan into three phases:
- Days 1-30: Learning and context
- Days 31-60: Contributing with support
- Days 61-90: Owning independently

For each phase, list 4-6 specific activities or milestones. Keep it concrete — "shadow the weekly planning meeting" not "learn the planning process."`,
          language: "text",
        },
      },
      {
        title: "Generate the first-week schedule",
        description:
          "A detailed day-by-day schedule for the first week prevents the new joiner from feeling lost.",
        code: {
          snippet: `Write a day-by-day first week schedule for the new [role title]. They start on [Monday/Tuesday]. Key meetings to include: [list any fixed meetings they should attend]. Key people to meet 1:1: [list 3-5 names or roles].

Keep each day to a realistic load — half their time should be unstructured so they can read, absorb, and ask questions. Format as a table with Day, Time blocks, and Description.`,
          language: "text",
        },
      },
      {
        title: "Generate the welcome email",
        description:
          "A welcome email sent a few days before the start date reduces first-day anxiety.",
        code: {
          snippet: `Write a welcome email to send to [name] joining as [role] on [start date]. Include: practical details (where to go / how to join if remote, who to ask for), what to expect on day one, and one sentence about why we are excited to have them specifically. Tone: warm and direct, not corporate. Keep it under 200 words.`,
          language: "text",
        },
      },
    ],
    nextLink: {
      label: "Next: Draft performance review templates",
      href: "/for-hr/draft-performance-reviews-with-claude",
    },
  },

  "draft-performance-reviews-with-claude": {
    title: "Draft Performance Review Templates and Feedback",
    slug: "draft-performance-reviews-with-claude",
    duration: "10 min",
    difficulty: "intermediate",
    availableRoutes: ["people-ops"],
    description:
      "Build review templates for any role, turn bullet-point notes into written feedback, and create self-assessment prompts that actually surface useful information.",
    intro:
      "Performance reviews are one of the most time-consuming parts of people management — and the output is often vague, inconsistent, or both. Claude can help on three fronts: designing the review template, turning rough notes into polished feedback, and generating self-assessment questions that give reviewers something to actually work with.",
    situation: {
      scene:
        "Review season is coming. You need to write feedback for several direct reports, and you have rough notes but no polished write-ups.",
      outcome:
        "After this guide you will have a review template for your team, a process for turning notes into written reviews, and self-assessment questions to send before review conversations.",
    },
    outcomes: [
      "A review template calibrated to your team's level and function",
      "Written reviews drafted from your bullet-point notes",
      "Self-assessment prompts that surface useful context before the review",
    ],
    promptContrast: {
      bad: "write performance review feedback for an engineer",
      good: `I am a engineering manager writing a mid-year review for a mid-level software engineer on my team. Here are my rough notes from the past six months:
- Shipped the search API refactor on time, handled a tricky edge case on their own
- Sometimes goes quiet in design reviews — doesn't push back even when they have a view
- Mentored the new grad well, proactively set up weekly 1:1s
- Two incidents in Q1 where they merged without adequate review, fixed quickly but flagged by team
- Strong technically, wants to grow into a senior role

Write a review in three sections: Strengths (what to continue), Areas for development (specific and constructive, not just "improve communication"), and a closing paragraph on their path to senior. Tone: direct, specific, and encouraging. No filler like "continues to demonstrate" or "leverages their skills."`,
      why: "The raw notes are the key input. Claude turns them into structured, readable feedback. Without the notes, the output is generic. The section structure and tone instruction keep the format consistent.",
    },
    steps: [
      {
        title: "Build a review template for your team's level",
        description:
          "Before review season, create a template everyone uses. A consistent structure makes reviews easier to write and fairer to compare.",
        code: {
          snippet: `Create a performance review template for [role level, e.g. "mid-level individual contributors"] in a [function, e.g. "product and engineering team"].

The review should cover:
- Impact: what they shipped or achieved
- How they work: collaboration, process, reliability
- Growth: progress on development goals, areas to build
- Manager summary: one short paragraph on overall trajectory

For each section include 2-3 guiding questions to help the reviewer write. The template should take about 30 minutes to complete. Avoid rating scales — we use written narrative only.`,
          language: "text",
        },
      },
      {
        title: "Turn your bullet-point notes into written feedback",
        description:
          "Write your raw observations for one person, then ask Claude to structure them into a review.",
        code: {
          snippet: `I am a [your role] writing a [mid-year / annual] review for [report's role and level]. Here are my notes from the past [time period]:

[paste your raw bullet points — observations, incidents, patterns, wins, concerns]

Write a review with three sections: Strengths (what to keep doing and why it matters), Development areas (specific and actionable — name the behavior, not just the outcome), and a closing paragraph on their trajectory. Tone: direct and honest, not diplomatic-to-the-point-of-useless. No filler phrases.`,
          language: "text",
        },
      },
      {
        title: "Generate self-assessment prompts to send beforehand",
        description:
          "A good self-assessment gives the manager real material to work with. Most self-assessment templates produce answers that are either a brag sheet or a false-modesty exercise.",
        code: {
          snippet: `Write a self-assessment form to send to [role level] before their performance review. It should have 4-5 questions that surface: their most meaningful contributions, something they found genuinely hard, how they think they are developing, and one thing they want their manager to know that might not be visible. Keep questions open-ended and specific. Avoid "what are your strengths and weaknesses."`,
          language: "text",
        },
      },
    ],
    nextLink: {
      label: "Next: Write employee communications",
      href: "/for-hr/write-employee-communications-with-claude",
    },
  },

  "write-hr-policies-with-claude": {
    title: "Draft and Update HR Policies",
    slug: "write-hr-policies-with-claude",
    duration: "15 min",
    difficulty: "intermediate",
    availableRoutes: ["communication"],
    description:
      "Write clear, usable HR policy documents — from PTO and remote work to code of conduct — without the legal-department wall of text that no one reads.",
    intro:
      "Most HR policies are written for legal protection, not employee use. The result is a document that is technically complete and practically ignored. Claude can help you write policies that are readable, clear about what actually applies, and honest about the reasoning behind the rules. You still need legal review for anything compliance-critical, but the first draft can be far better than what most teams start with.",
    situation: {
      scene:
        "You need to create or update a policy document. It might be a new PTO policy, a remote work framework, or a code of conduct that has not been touched since 2018.",
      outcome:
        "After this guide you will have a draft policy that is clear, readable, and structured in a way employees will actually follow.",
    },
    outcomes: [
      "A clear, readable policy draft in under 20 minutes",
      "A structure that answers the questions employees actually have",
      "Language that sounds human, not like a legal disclaimer",
    ],
    steps: [
      {
        title: "Decide what the policy actually needs to answer",
        description:
          "Before writing, list the three to five questions employees most commonly ask about this topic. Those questions ARE the policy structure.",
        list: [
          "For PTO: How much do I get? How do I request it? What happens if I don't use it? Can I take unpaid leave?",
          "For remote work: Who is eligible? What are the expectations around availability? What does the company provide?",
          "For code of conduct: What specific behaviors are in scope? What is the reporting process? What happens after a report?",
        ],
      },
      {
        title: "Use the structured prompt for any policy type",
        description:
          "Give Claude the policy topic, your context, and the key questions to answer.",
        code: {
          snippet: `Write a [policy type, e.g. "remote work policy"] for a [company size and type, e.g. "60-person B2B SaaS company, fully distributed across Europe"].

Key things this policy needs to address:
- [Question 1 employees ask]
- [Question 2 employees ask]
- [Question 3]

Context:
- [Any relevant constraints, e.g. "we have employees in 4 countries with different labor laws"]
- [Any decisions already made, e.g. "we've agreed on a core hours model of 10am-3pm CET"]

Tone: clear and direct, written for the employee reading it, not for legal protection. Use plain language. Structure with headers and short paragraphs. Include a one-paragraph "the intent behind this policy" section at the top.`,
          language: "text",
        },
      },
      {
        title: "Add an FAQ section",
        description:
          "After the main policy, an FAQ handles the edge cases that always come up. Ask Claude to generate it from the policy draft.",
        code: {
          snippet: `Based on the policy above, write a 5-question FAQ that covers the situations employees are most likely to ask about. Include one question about an edge case or grey area that the policy does not fully resolve, and give an honest answer about how to handle it.`,
          language: "text",
        },
      },
    ],
    nextLink: {
      label: "Next: Write employee communications",
      href: "/for-hr/write-employee-communications-with-claude",
    },
  },

  "write-employee-communications-with-claude": {
    title: "Write Employee Communications and Announcements",
    slug: "write-employee-communications-with-claude",
    duration: "8 min",
    difficulty: "beginner",
    availableRoutes: ["communication"],
    description:
      "Draft all-staff announcements, change communications, and sensitive HR messages that land the right way — honest, clear, and appropriately human.",
    intro:
      "Employee communications fail in two directions: too corporate (distant, passive voice, 'we are pleased to announce') or too casual (people doubt whether you took it seriously). Claude can find the right register for any message, from a benefits change to a restructure announcement. The key input is telling it what employees are actually likely to feel or worry about.",
    situation: {
      scene:
        "You need to communicate a change — a policy update, an org change, a benefit change, or a sensitive message. The communication needs to be honest and clear without creating unnecessary anxiety.",
      outcome:
        "After this guide you will have a communication that says what needs to be said, anticipates the questions employees will have, and does not sound like it was written by a committee.",
    },
    outcomes: [
      "A draft communication ready to send in under 15 minutes",
      "A version that is honest about the change and its impact",
      "Anticipates the top 2-3 questions employees will have",
    ],
    promptContrast: {
      bad: "write an email announcing that we are changing our parental leave policy",
      good: `Write an all-staff email announcing that we are changing our parental leave policy. The change: we are increasing primary carer leave from 12 to 20 weeks, fully paid, effective September 1st. Secondary carer leave stays at 2 weeks. Anyone currently pregnant or on leave gets the new policy automatically.

The likely employee questions are: does this apply to adoptive parents (yes), does it affect secondary carer leave (no), and is there a catch (genuinely no, this is just a budget decision we finally made room for).

Tone: warm and direct. No "we are delighted to announce" openings. Lead with the change and what it means for people, not with the company's process for making the decision. Under 200 words.`,
      why: 'The likely employee questions and the honest "is there a catch" answer are what makes the communication land. Without them, Claude writes the press-release version, not the one people will actually read.',
    },
    steps: [
      {
        title: "Before writing, answer three questions",
        description:
          "Give Claude the answers to these before asking for the communication draft.",
        list: [
          'What exactly is changing? State the specific, concrete change — not "we are evolving our approach" but "the PTO policy changes from X to Y."',
          "What are the top 2-3 questions employees will have, and what are the honest answers?",
          "What is the tone calibration: formal (a restructure) vs. warm (a benefits improvement) vs. matter-of-fact (a systems migration)?",
        ],
      },
      {
        title: "Use the all-staff communication template",
        description:
          "This template works for any company-wide or team communication.",
        code: {
          snippet: `Write a [all-staff email / team Slack message / manager brief] announcing [specific change].

The change in plain language: [describe what is actually changing, for whom, and from when]

What employees are likely to wonder or worry about:
- [Question 1 and answer]
- [Question 2 and answer]
- [Question 3 and answer]

Tone: [formal / warm / matter-of-fact]
Length: [under 150 words / under 300 words]
Do not start with "I am pleased to announce" or any variant. Lead with what is changing and what it means for the reader.`,
          language: "text",
        },
      },
      {
        title: "Handle sensitive messages separately",
        description:
          "For difficult communications — a redundancy, a departure, a serious incident — give Claude more context about what you cannot say and what you must.",
        code: {
          snippet: `Write a [message type, e.g. "all-staff email announcing a layoff affecting 8 people"].

What I can say: [e.g. "the business rationale, the number of people affected, the support we are offering"]
What I cannot say: [e.g. "individual names before those conversations happen, specific financials"]
What employees will be feeling: [e.g. "anxious about their own roles, sad about colleagues leaving"]

The message should be honest about the difficulty of the situation without being maudlin. Include: what happened, why, what support is available, what happens next, and how to ask questions. Avoid passive voice and avoid euphemisms like "let go" or "transition."`,
          language: "text",
        },
      },
    ],
    nextLink: {
      label: "Start over: Write a job description",
      href: "/for-hr/write-job-descriptions-with-claude",
    },
  },

  "analyze-exit-interviews-with-claude": {
    title: "Analyze Exit Interview Notes and Find Patterns",
    slug: "analyze-exit-interviews-with-claude",
    duration: "12 min",
    difficulty: "intermediate",
    availableRoutes: ["people-ops"],
    description:
      "Turn a collection of exit interview notes into a structured analysis: the recurring themes, the honest signal vs. the noise, and what the data suggests about retention risk.",
    intro:
      "Exit interview notes are one of the most underused sources of organizational signal. Most teams collect them and do nothing — the notes sit in a folder, the themes stay invisible. Claude can read a batch of exit notes and find patterns quickly, but the output is only as good as the notes. This guide shows how to structure the analysis.",
    situation: {
      scene:
        'You have exit interview notes from the past 6-12 months and you want to understand what they actually show — not just count "left for money" vs "left for growth."',
      outcome:
        "After this guide you will have a structured analysis identifying the top themes, the split between controllable and uncontrollable attrition, and a short list of specific things worth investigating.",
    },
    outcomes: [
      "A themed analysis of your exit notes in under 20 minutes",
      "Separation of signal from noise (exit interview hygiene is imperfect)",
      "A short list of specific retention risks to investigate further",
    ],
    steps: [
      {
        title: "Prepare the notes before pasting",
        description:
          "Remove names and identifying details before sharing with Claude. Anonymize to role level and tenure bracket.",
        list: [
          'Replace names with role and level: "Sarah, Senior Designer, 2 years" becomes "Senior Designer, 2 years"',
          'Remove names of specific managers or colleagues — keep the theme, not the person ("felt micromanaged" not "felt micromanaged by John")',
          "Group notes by time period if you have more than 10 (e.g. H1 2025, H2 2025) so patterns over time are visible",
        ],
      },
      {
        title: "Use the analysis prompt",
        description:
          "Paste your anonymized notes and ask Claude to structure the analysis.",
        code: {
          snippet: `Below are anonymized exit interview notes from [number] employees who left [team/company] between [date range]. Roles range from [range, e.g. "junior to senior ICs across engineering and product"].

[paste your notes here]

Analyze these notes and produce:
1. Top 3-5 recurring themes with specific examples from the notes
2. Split between likely-controllable reasons (management, growth, culture) vs. likely-uncontrollable (compensation vs. market, relocation, life change)
3. Any patterns by role level or tenure bracket if visible in the data
4. Two or three specific things worth investigating further based on what the notes suggest
5. One honest caveat about what exit interviews tend to underreport (people don't always say the real reason when they are trying to preserve a reference)`,
          language: "text",
        },
      },
      {
        title: "Turn the analysis into a brief for leadership",
        description:
          "Once you have the analysis, ask Claude to turn it into a one-page brief you can share.",
        code: {
          snippet: `Turn the analysis above into a one-page brief for [e.g. "the leadership team / the CHRO"]. Include: the headline finding (one sentence), the top three themes with supporting evidence, the controllable vs. uncontrollable split, and two or three specific recommendations. Keep it under 400 words. Do not pad with methodology — they want the signal.`,
          language: "text",
        },
      },
    ],
    nextLink: {
      label: "Start over: Write a job description",
      href: "/for-hr/write-job-descriptions-with-claude",
    },
  },
};
