export type TeacherRoute = 'lesson-planning' | 'assessment' | 'communication';

export interface TeacherGuideStep {
  title: string;
  description: string;
  list?: string[];
  code?: { snippet: string; language?: string };
  appDemo?: { steps: Array<{ role: 'user' | 'claude'; text: string; delay?: number }> };
}

export interface TeacherGuide {
  title: string;
  slug: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate';
  description: string;
  intro: string;
  situation?: { scene: string; outcome: string };
  outcomes?: string[];
  promptContrast?: { bad: string; good: string; why?: string };
  steps: TeacherGuideStep[];
  nextLink: { label: string; href: string };
  availableRoutes?: TeacherRoute[];
}

export const TEACHER_GUIDES: Record<string, TeacherGuide> = {
  'write-lesson-plans-with-claude': {
    title: 'Write Lesson Plans with Claude',
    slug: 'write-lesson-plans-with-claude',
    duration: '10 min',
    difficulty: 'beginner',
    availableRoutes: ['lesson-planning'],
    description:
      'Turn a topic and a learning objective into a complete, structured lesson plan. Works for any subject, any grade level.',
    intro:
      'Claude can write a full lesson plan in under a minute, but only if you give it the right inputs. A vague prompt produces a vague plan. This guide shows you exactly what to put in so what comes out is something you can actually use.',
    situation: {
      scene:
        'You have a unit coming up and a general idea of what to teach, but the detailed plan is not written yet.',
      outcome:
        'After this guide you will have a full lesson plan template that Claude can fill in for any topic you give it.',
    },
    outcomes: [
      'A complete lesson plan in under 5 minutes',
      'A reusable prompt template you can use for every new lesson',
      'More time for the parts of teaching Claude cannot do',
    ],
    promptContrast: {
      bad: 'write a lesson plan about fractions',
      good: 'Write a lesson plan for a 45-minute Year 5 maths lesson introducing equivalent fractions for the first time. My students can add and subtract fractions with the same denominator. Learning objective: students can identify and generate equivalent fractions using visual models. Include: warm-up (5 min), direct instruction (15 min), guided practice (15 min), independent practice (8 min), exit ticket (2 min). Format as a structured table.',
      why: 'Subject, year group, prior knowledge, learning objective, and time breakdown give Claude everything it needs to write a lesson plan a teacher would actually use.',
    },
    steps: [
      {
        title: 'Identify the five inputs before you start',
        description:
          'Before you open Claude, have these five things ready. Missing any one of them produces a generic plan.',
        list: [
          'Subject: the specific area within the subject (not just "maths" but "equivalent fractions")',
          'Year or grade level: so Claude calibrates complexity and vocabulary correctly',
          'Prior knowledge: what students can already do relevant to this topic',
          'Learning objective: one clear, measurable thing students will be able to do by the end',
          'Class duration: total time and, if you have them, time allocations for each section',
        ],
      },
      {
        title: 'Use the structured prompt with your content filled in',
        description:
          'Copy the template below and replace the example content with your own. The format works for any subject and any year group.',
        code: {
          snippet: `Write a lesson plan for a [duration]-minute [Year/Grade] [Subject] lesson on [specific topic].

Prior knowledge: [what students can already do]
Learning objective: [one measurable outcome]

Include these sections with approximate timings:
- Warm-up ([X] min)
- Direct instruction ([X] min)
- Guided practice ([X] min)
- Independent practice ([X] min)
- Exit ticket ([X] min)

Format as a structured table with: Time | Activity | Teacher does | Students do | Resources needed`,
          language: 'text',
        },
        appDemo: {
          steps: [
            {
              role: 'user',
              text: 'Write a lesson plan for a 45-minute Year 5 maths lesson introducing equivalent fractions for the first time. My students can add and subtract fractions with the same denominator. Learning objective: students can identify and generate equivalent fractions using visual models. Include: warm-up (5 min), direct instruction (15 min), guided practice (15 min), independent practice (8 min), exit ticket (2 min). Format as a structured table.',
            },
            {
              role: 'claude',
              text: "Here's your Year 5 equivalent fractions lesson plan:\n\n| Time | Activity | Teacher does | Students do | Resources |\n|------|----------|-------------|------------|----------|\n| 5 min | Warm-up: fraction recall | Show fraction wall, ask: \"What do you notice?\" | Name fractions they recognise | Fraction wall poster |\n| 15 min | Direct instruction | Model 1/2 = 2/4 = 4/8 with fraction strips. Use \"multiply numerator and denominator by the same number\" language | Watch, annotate notes, ask questions | Fraction strips, mini whiteboards |\n| 15 min | Guided practice | Work through 3 examples together, decreasing scaffolding | Complete with partners, explain reasoning | Worksheet set A |\n| 8 min | Independent practice | Circulate, note misconceptions | Complete 6 problems independently | Worksheet set B |\n| 2 min | Exit ticket | Collect slips | Write one equivalent fraction for 3/4 and explain how they know | Exit ticket slips |\n\nWant me to add a challenge task for early finishers or a scaffold for students who need support?",
              delay: 800,
            },
          ],
        },
      },
      {
        title: 'Ask Claude to differentiate the plan',
        description:
          'Once you have the core plan, one follow-up prompt adds materials for students at different levels.',
        code: {
          snippet: `Add a challenge task for early finishers and a scaffold for students who need support. Keep both tied to the same learning objective.`,
          language: 'text',
        },
      },
      {
        title: 'Generate the exit ticket questions separately for more depth',
        description:
          'Exit tickets written as an afterthought are usually too easy. A dedicated prompt produces questions that actually tell you what students understood.',
        code: {
          snippet: `Write 3 exit ticket questions for this lesson on equivalent fractions. One recall question, one application question, one question that surfaces a common misconception. Year 5 students. Keep each question to one sentence.`,
          language: 'text',
        },
      },
    ],
    nextLink: {
      label: 'Create quiz questions with Claude',
      href: '/for-teachers/create-quiz-questions-with-claude',
    },
  },

  'create-quiz-questions-with-claude': {
    title: 'Create Quiz and Test Questions with Claude',
    slug: 'create-quiz-questions-with-claude',
    duration: '5 min',
    difficulty: 'beginner',
    availableRoutes: ['assessment'],
    description:
      'Generate multiple-choice, short-answer, and essay questions for any topic in seconds. No more staring at a blank question bank.',
    intro:
      'Writing good assessment questions is time-consuming. Claude can produce a full question bank in the time it takes you to write two questions yourself. The key is specifying exactly what mix you need and at what cognitive level.',
    situation: {
      scene:
        'The unit test is next week and the question bank needs 30 questions covering 4 topics.',
      outcome:
        'After this guide you will have a system for generating varied, quality questions faster than you can type them manually.',
    },
    outcomes: [
      'A full question bank for any topic in under 5 minutes',
      'Mixed question types at the right difficulty level',
      'Questions you can actually use without heavy editing',
    ],
    promptContrast: {
      bad: 'give me quiz questions about photosynthesis',
      good: "Create 10 quiz questions on photosynthesis for Year 9 Biology students (age 13-14). Mix: 4 multiple-choice (with 4 options each, one clearly correct), 3 short-answer (requiring 2-3 sentences), 2 application questions (applying the concept to a new scenario), and 1 diagram-labelling question description. Difficulty should range from recall to application on Bloom's taxonomy. Avoid trick questions.",
      why: "Question type, student age, difficulty distribution, and taxonomy level tell Claude exactly what kind of assessment you need.",
    },
    steps: [
      {
        title: 'Decide your question type mix before prompting',
        description:
          'Different question types test different things. Decide the mix first, then put it in the prompt as a specific count for each type.',
        list: [
          'Multiple-choice: fast to mark, good for recall and comprehension, easy to abuse (avoid "all of the above")',
          'Short-answer: requires students to produce language, not just recognise it, harder to mark consistently',
          'Extended response or essay: tests argument construction and synthesis, slow to mark',
          'Application questions: the student applies the concept to a scenario they have not seen before',
          'Diagram-based: useful for science, geography, and any visual subject',
        ],
      },
      {
        title: "Specify Bloom's taxonomy levels",
        description:
          "Naming the cognitive level in your prompt is the single highest-leverage thing you can do. Most AI-generated questions default to recall. You often need application or analysis.",
        code: {
          snippet: `Create 8 questions on the water cycle for Year 7 Geography students.
- 3 recall questions (Bloom's: Remember) -- define or identify terms
- 3 comprehension questions (Bloom's: Understand) -- explain why or how
- 2 application questions (Bloom's: Apply) -- use the concept to explain a real-world example

Multiple-choice only. 4 options each. No trick questions.`,
          language: 'text',
        },
      },
      {
        title: 'Review and adjust specific questions',
        description:
          'Claude rarely gets every question right on the first pass. Use follow-up prompts to adjust individual questions rather than regenerating the whole set.',
        list: [
          '"Make question 3 harder. It is currently at recall level; push it to application."',
          '"Question 7 has two plausible correct answers. Rewrite so there is one clear correct answer."',
          '"Add a fifth question on evaporation specifically. Same format as the rest."',
        ],
      },
      {
        title: 'Ask Claude to write a marking guide',
        description:
          'For short-answer and essay questions, a marking guide saves time and makes your marking more consistent. One prompt does it.',
        code: {
          snippet: `Write a marking guide for the 3 short-answer questions above. For each question: the ideal answer (2-3 sentences), the key terms that should appear, and 1 mark / 2 marks / 3 marks criteria.`,
          language: 'text',
        },
      },
    ],
    nextLink: {
      label: 'Write grading rubrics with Claude',
      href: '/for-teachers/write-grading-rubrics-with-claude',
    },
  },

  'write-grading-rubrics-with-claude': {
    title: 'Write Grading Rubrics with Claude',
    slug: 'write-grading-rubrics-with-claude',
    duration: '10 min',
    difficulty: 'beginner',
    availableRoutes: ['assessment'],
    description:
      'Generate clear, consistent rubrics for any assignment: essays, projects, presentations, or lab reports.',
    intro:
      'A good rubric does two jobs: it helps students understand what you are looking for before they submit, and it makes your marking faster and more defensible. Claude can draft one from your criteria in minutes.',
    situation: {
      scene:
        'You have assigned an essay and now need to explain exactly how you will grade it. You want something fair and useful.',
      outcome:
        'After this guide you will have a rubric that is clear enough to share with students before they submit.',
    },
    outcomes: [
      'A professional rubric for any assignment in minutes',
      'Consistent, defensible criteria that students understand',
      'A template you can adapt for similar assignments all year',
    ],
    promptContrast: {
      bad: 'write a rubric for an essay',
      good: "Create a rubric for a Year 11 English essay on the theme of power in a novel of their choice. Assessment criteria: Argument & thesis (30%), Evidence & analysis (30%), Structure & organization (20%), Language & expression (20%). Four performance levels: Excellent, Proficient, Developing, Beginning. For each criterion and level, write 2-3 specific, observable descriptors. Format as a table I can share with students.",
      why: 'Criteria, weightings, grade levels, and specific descriptors turn the output into something you can actually hand to a student.',
    },
    steps: [
      {
        title: 'List your assessment criteria and weightings before prompting',
        description:
          'Claude needs your criteria upfront. If you have not decided them yet, here is a starting framework for common assignment types.',
        list: [
          'Essays: argument/thesis, evidence and analysis, structure, language and expression',
          'Projects: research quality, presentation, collaboration (if group), creativity or originality',
          'Presentations: content accuracy, delivery and clarity, visual aids, response to questions',
          'Lab reports: hypothesis, method, results and analysis, conclusion and evaluation',
          'Creative writing: idea and originality, structure and plot, character or setting, language and style',
        ],
      },
      {
        title: 'Decide how many performance levels you need',
        description:
          'Three levels works well for simpler assignments. Four or five levels gives more granularity for complex work. Name them in your prompt.',
        code: {
          snippet: `Create a rubric for a Year 8 Science lab report. Assessment criteria:
- Hypothesis (20%): clear prediction with reasoning
- Method (25%): logical sequence, controlled variables identified
- Results and analysis (35%): accurate data recording, graph interpretation
- Conclusion (20%): links back to hypothesis, acknowledges limitations

Four performance levels: Excellent (A), Proficient (B), Developing (C), Beginning (D).
For each criterion and level: 2 specific, observable descriptors.
Format as a table. Write descriptors so a student can self-assess.`,
          language: 'text',
        },
      },
      {
        title: 'Specify whether descriptors are for students or for your grading record',
        description:
          'Descriptors written for students use second-person and action language ("Your thesis clearly states..."). Descriptors for your grading record are more clinical. Tell Claude which you need.',
        list: [
          'For students: "write each descriptor in second person, as if talking directly to the student"',
          'For grading: "write each descriptor in third person as an observable statement"',
          'Both: "write two versions: one for the student-facing version of the rubric, one for my marking notes"',
        ],
      },
      {
        title: 'Ask Claude to generate sample work descriptions at each level',
        description:
          'Students often struggle to understand what "Excellent" means in practice. Concrete examples close that gap before submission, not after.',
        code: {
          snippet: `For the "Argument and thesis" criterion in the rubric above, describe what a real student response looks like at each of the four performance levels. 2-3 sentences per level. Be concrete enough that a Year 11 student can tell which level their draft belongs to.`,
          language: 'text',
        },
      },
    ],
    nextLink: {
      label: 'Give student feedback with Claude',
      href: '/for-teachers/give-student-feedback-with-claude',
    },
  },

  'give-student-feedback-with-claude': {
    title: 'Write Student Feedback Faster with Claude',
    slug: 'give-student-feedback-with-claude',
    duration: '15 min',
    difficulty: 'intermediate',
    availableRoutes: ['assessment', 'communication'],
    description:
      'Turn your margin notes and impressions into full written feedback. Claude drafts, you refine. Works for essays, projects, and report comments.',
    intro:
      'You already know what you think of each piece of work. The slow part is writing it up. This guide gives you a workflow where your quick notes become polished feedback comments without you having to write full sentences from scratch.',
    situation: {
      scene:
        'You have a stack of 30 essays to mark. You know what you think of each one, but writing it all out takes hours.',
      outcome:
        'After this guide you will have a marking workflow where your notes become full feedback comments in seconds.',
    },
    outcomes: [
      'Full written feedback from brief notes in seconds',
      'Consistent tone and structure across all students',
      'Time back for actually teaching instead of commenting',
    ],
    promptContrast: {
      bad: 'write feedback for this essay',
      good: "Here are my notes on a Year 10 student's essay on climate change: Strong intro and clear thesis. Good use of statistics in para 2. Para 3 argument is weak, makes a claim without evidence. Conclusion does not connect back to the thesis. Writing is clear but too informal in places. Turn these notes into full written feedback in a supportive, specific tone. 150-200 words. End with one action they should focus on for the next essay.",
      why: "Your notes contain the judgment. The prompt tells Claude its job: turn them into sentences the student can actually read and act on.",
    },
    steps: [
      {
        title: 'Write brief shorthand notes as you read each piece',
        description:
          'You do not need to write full sentences. The faster you can get your raw impressions down, the faster this workflow runs. Abbreviations and fragments are fine.',
        list: [
          'Use symbols: + for strength, - for weakness, ? for unclear',
          'Note paragraph numbers: "P2 strong evidence, P3 no source"',
          'Record the thing you want the student to do differently: "next time: topic sentences first"',
          'Note any pattern you see: "every paragraph starts with a quote, needs more own analysis"',
        ],
      },
      {
        title: 'Paste your notes into Claude with context',
        description:
          'The context you give tells Claude the register, the audience, and the length. All three affect the output significantly.',
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "Here are my notes on a Year 10 student's essay on climate change:\n\nStrong intro and clear thesis. Good use of statistics in para 2. Para 3 argument is weak, makes a claim without evidence. Conclusion does not connect back to the thesis. Writing is clear but too informal in places.\n\nTurn these notes into full written feedback in a supportive, specific tone. 150-200 words. End with one action they should focus on for the next essay.",
            },
            {
              role: 'claude',
              text: "Your introduction is one of the strongest parts of this essay. Your thesis is clear and specific, which gives your argument a solid foundation to build from.\n\nThe statistics in your second paragraph work well. You have chosen evidence that directly supports your point, and the way you have integrated it shows you understand how to use data in an argument.\n\nParagraph three is where the essay loses some of its momentum. You make a strong claim, but it needs evidence to back it up. Without a source or example, the reader has to take your word for it, and in an academic essay, that weakens the argument. Your conclusion would also benefit from a closer connection to your opening thesis.\n\nYour writing is clear and readable throughout, which is a real strength. For your next essay: before you move to a new paragraph, check that every claim you have made has at least one piece of supporting evidence. That single habit will make a noticeable difference to your overall mark.",
              delay: 600,
            },
          ],
        },
      },
      {
        title: 'Review and adjust for the individual student',
        description:
          'Claude writes for a generic student. You know this student. Adjust anything that does not fit their context, history, or what they need to hear.',
        list: [
          'If the student is struggling: soften the critique, lead more on what worked',
          'If the student is capable but coasting: make the action sharper and more direct',
          'Add a specific detail Claude could not know: "this is a big improvement from your last essay"',
          'Cut anything that sounds like it was written for everyone, not this person',
        ],
      },
      {
        title: "Use a 'next step' prompt for the most important action",
        description:
          'When the feedback is done, one more prompt pulls out the single highest-leverage action for that student.',
        code: {
          snippet: `Based on the notes above, what is the single most important thing this student should focus on for their next essay? One sentence. Be specific enough that they know exactly what to do differently.`,
          language: 'text',
        },
      },
      {
        title: 'For report writing: batch your notes and process them together',
        description:
          'Report comments follow a predictable structure. Once you have your per-student notes, Claude can turn a whole class set into draft comments faster than you can write three manually.',
        code: {
          snippet: `I need report comments for 5 Year 8 students in English. For each student, I will give you: their name, their overall performance level, 2-3 strengths, and 1 area to develop. Turn each set of notes into a 60-word report comment. Warm but specific tone. Start each comment with the student's name.

Student 1: Amara. Working at expected level. Strengths: clear paragraph structure, reads widely. Develop: more ambitious vocabulary.
Student 2: James. Working above expected level. Strengths: sophisticated analysis, strong thesis statements. Develop: spelling under timed conditions.`,
          language: 'text',
        },
      },
    ],
    nextLink: {
      label: 'Write parent emails with Claude',
      href: '/for-teachers/write-parent-emails-with-claude',
    },
  },

  'write-parent-emails-with-claude': {
    title: 'Write Parent Emails with Claude',
    slug: 'write-parent-emails-with-claude',
    duration: '5 min',
    difficulty: 'beginner',
    availableRoutes: ['communication'],
    description:
      'Draft any parent communication in under a minute. Concerns, celebrations, meeting requests, or sensitive situations.',
    intro:
      'Parent emails take longer than they should because the stakes feel higher than they are. Claude removes the blank-page problem. You supply the facts and the tone you need. Claude drafts. You review and send.',
    situation: {
      scene:
        'You need to email a parent about a concern but are not sure how to word it so it does not come across as accusatory.',
      outcome:
        'After this guide you will have a drafting process that makes any parent communication quicker and less stressful.',
    },
    outcomes: [
      'Any parent email drafted in under a minute',
      'The right tone for any situation: positive, neutral, or sensitive',
      'A process that works for the emails you have been avoiding',
    ],
    promptContrast: {
      bad: 'write an email to a parent about their child',
      good: "I need to email a parent about their Year 8 child who has been consistently not submitting homework for the past 3 weeks. The student does good work in class. I want to flag the pattern, invite the parent to share if there's anything going on at home, and suggest we schedule a brief call. Tone: warm and constructive, not accusatory. Under 180 words.",
      why: "Situation, context about the student, what you want the parent to do, tone, and length: that is all Claude needs to write an email the parent will actually respond to well.",
    },
    steps: [
      {
        title: 'Identify the three things before you draft',
        description:
          'Most bad parent emails go wrong because the writer was not clear on these three things before they started.',
        list: [
          'What is the situation: the specific facts, not your interpretation of them',
          'What outcome you want from this email: a call, a conversation, a change in behaviour, information from the parent',
          'The tone appropriate for this family: you know them, Claude does not',
        ],
      },
      {
        title: 'Include any relevant student context in the prompt',
        description:
          'Context about the student shifts the register of the email. An email about a usually-strong student who has suddenly disengaged reads very differently from one about persistent behaviour issues.',
        code: {
          snippet: `I need to email the parent of a Year 6 student named Fatima. Context: Fatima is usually engaged and works hard. Over the past two weeks she has been quiet in class and missed two homework submissions, which is unusual for her. I am not concerned about her academically, but I want to check in and see if everything is okay at home. Tone: warm, not alarming. Under 150 words. No homework-shaming language.`,
          language: 'text',
        },
        appDemo: {
          steps: [
            {
              role: 'user',
              text: "I need to email the parent of a Year 6 student named Fatima. Context: Fatima is usually engaged and works hard. Over the past two weeks she has been quiet in class and missed two homework submissions, which is unusual for her. I am not concerned about her academically, but I want to check in and see if everything is okay at home. Tone: warm, not alarming. Under 150 words. No homework-shaming language.",
            },
            {
              role: 'claude',
              text: "Subject: Checking in on Fatima\n\nDear [Parent name],\n\nI hope you are well. I wanted to reach out because I have noticed Fatima has seemed a little quieter than usual over the past couple of weeks. She is a thoughtful and hardworking student, and even a small shift in how she is doing stands out.\n\nI am not writing with any concerns about her learning. She is doing well. I just wanted to check in and see if there is anything happening at home I should be aware of, or anything I can do to support her at school.\n\nPlease do not hesitate to reply to this email or let me know if a quick call would be easier.\n\nWarm regards,\n[Your name]",
              delay: 500,
            },
          ],
        },
      },
      {
        title: 'Copy the draft and personalise before sending',
        description:
          'Claude writes for a generic parent. You know this family. Two minutes of personalisation makes the email feel like it came from you, not a template.',
        list: [
          'Add a specific detail about the student that only you would know',
          'Match the formality level you already use with this family',
          'Remove any phrase that sounds automated or over-polished',
          'Check the subject line: make it clear and specific, not vague ("A quick note about Fatima" beats "Regarding your child")',
        ],
      },
      {
        title: 'For sensitive situations: ask Claude what to avoid first',
        description:
          'Before you finalise a difficult email, one more prompt surfaces language that could land badly.',
        code: {
          snippet: `I am about to send this email to a parent about a behaviour concern. What phrases or framings should I avoid to keep the tone constructive and non-accusatory? The parent has been defensive in previous communications.

[paste your draft here]`,
          language: 'text',
        },
      },
    ],
    nextLink: {
      label: 'Differentiate instruction with Claude',
      href: '/for-teachers/differentiate-instruction-with-claude',
    },
  },

  'differentiate-instruction-with-claude': {
    title: 'Differentiate Instruction with Claude',
    slug: 'differentiate-instruction-with-claude',
    duration: '15 min',
    difficulty: 'intermediate',
    availableRoutes: ['lesson-planning'],
    description:
      'Generate scaffolded, extended, and adapted versions of any task, text, or activity for different learners.',
    intro:
      'Differentiation is one of the most time-consuming parts of lesson preparation. Claude can produce three versions of any activity from one prompt, provided you tell it what each version actually needs to do differently.',
    situation: {
      scene:
        'You have one lesson plan but three distinct groups in the room: students who need support, students on track, and students who are ready to be extended.',
      outcome:
        'After this guide you will have a system for creating differentiated versions of any activity without tripling your planning time.',
    },
    outcomes: [
      'Three differentiated versions of any activity from one prompt',
      'Scaffolded support materials for struggling learners',
      'Extension tasks that actually challenge high achievers',
    ],
    promptContrast: {
      bad: 'differentiate this activity',
      good: "Here's a Year 7 English task: analyse how the author creates tension in this extract. I need three versions: 1) A scaffolded version for students working below level, with sentence starters and a word bank of literary techniques. 2) The standard version as written. 3) An extension version that asks students to compare the technique to another text they've read and evaluate its effectiveness. Keep the same learning objective across all three versions.",
      why: 'Naming the specific versions and what each one should do gives Claude the structure to create genuinely useful differentiated materials, not just harder or easier versions of the same thing.',
    },
    steps: [
      {
        title: 'Start with your core task',
        description:
          'The core task is the version for students working at the expected level. Write or paste it into your prompt first. Everything else is built from this.',
        list: [
          'Write the task as you would for a student working at the expected standard',
          'Include the learning objective, even if students will not see it',
          'Note the format: written response, discussion, worksheet, practical activity',
          'Note any time constraint: 10-minute task or 30-minute extended response',
        ],
      },
      {
        title: 'Ask for the scaffolded version with specific support types',
        description:
          'Scaffolding is not about making the task easier. It is about removing barriers so students can access the same learning objective. Be specific about what kind of support.',
        code: {
          snippet: `Here is my Year 7 English task: Analyse how the author creates tension in this extract using at least two literary techniques. Reference specific quotations.

Create a scaffolded version for students working below level. Include:
- 4 sentence starters that guide them through the structure
- A word bank of 8 literary techniques with a one-line definition for each
- 2 pre-selected quotations from the text they can use if they cannot find their own
Keep the learning objective the same. Do not reduce the cognitive demand; reduce the access barrier.`,
          language: 'text',
        },
      },
      {
        title: 'Ask for the extension version with a clear additional demand',
        description:
          "Extension tasks fail when they are just more of the same task. A genuine extension requires higher-order thinking, not extra quantity.",
        code: {
          snippet: `Now create an extension version of the same task for students who are ready to be challenged. The extension should move up at least one level on Bloom's taxonomy from the standard task. Options: compare to a second text, evaluate the effectiveness of the technique in context, consider how a different reader might interpret the same technique, or make a counter-argument.

The student should still produce a written response. No more than 50 words of additional instruction.`,
          language: 'text',
        },
      },
      {
        title: 'Ask Claude to write brief instructions for each version',
        description:
          'Differentiated materials only work if students know what to do with them. One more prompt produces the task instructions you put on each worksheet.',
        code: {
          snippet: `For each of the three versions above, write a brief task instruction I can put at the top of the worksheet. Maximum 3 sentences per version. Use language appropriate for Year 7 students. Do not label them "below level", "standard", and "extension" -- use neutral language like "Task A", "Task B", "Task C".`,
          language: 'text',
        },
        appDemo: {
          steps: [
            {
              role: 'user',
              text: 'For each of the three versions above, write a brief task instruction I can put at the top of the worksheet. Maximum 3 sentences per version. Use language appropriate for Year 7 students. Do not label them "below level", "standard", and "extension" -- use neutral language like "Task A", "Task B", "Task C".',
            },
            {
              role: 'claude',
              text: "Task A\nRead the extract and use the sentence starters and word bank to help you write about how the author creates tension. Try to include at least two literary techniques. Use the quotations provided or find your own from the text.\n\nTask B\nAnalyse how the author creates tension in this extract. Use at least two literary techniques and support each point with a quotation from the text. Write in full paragraphs.\n\nTask C\nAnalyse how the author creates tension in this extract using at least two literary techniques. Then compare one of these techniques to a text you have studied before. Which writer uses the technique more effectively, and why? Support your argument with evidence from both texts.",
              delay: 500,
            },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Back to all teacher guides',
      href: '/for-teachers',
    },
  },
};
