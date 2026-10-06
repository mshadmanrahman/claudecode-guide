import type { Tutorial } from "@/lib/tutorials";
import type { Translation } from "@/lib/i18n/bn/tutorials";

export const BN_TUTORIALS_G5: Partial<Record<string, Translation<Tutorial>>> = {
  "meeting-to-jira": {
    sourceHash: "dc3bc5a08a3ec4a0",
    translatedAt: "2026-10-06",
    content: {
      title: "Meeting notes থেকে Jira ticket বানান",
      slug: "meeting-to-jira",
      duration: "১৫ মিনিট",
      difficulty: "intermediate",
      availableRoutes: ["app", "terminal", "ide"],
      description:
        "এলোমেলো meeting notes paste করুন। হাতে পাবেন acceptance criteria-সহ গোছানো ticket। Notes দেখে দেখে নিজে বসে ticket লেখার কাজ আর করতে হবে না।",
      intro:
        "প্রত্যেক PM-ই এই অবস্থায় পড়েছেন। Meeting থেকে বের হলেন এক পাতা এলোমেলো notes নিয়ে, তারপর পরের এক ঘণ্টা গেল সেগুলো থেকে Jira ticket বানাতে। চলুন কাজটা automate করি। আপনি একটা skill বানাবেন, যেটা raw meeting notes নিয়ে file করার জন্য ready, পরিষ্কার আর structured ticket বের করে দেবে।",
      steps: [
        {
          title: "PM context দিয়ে একটা CLAUDE.md setup করুন",
          description:
            "শুরুতে Claude-কে আপনার কাজের একটু context দিন। খুব বেশি লাগবে না, শুধু এটুকু যাতে Claude বোঝে আপনি কী ধরনের ticket বানান।",
          code: {
            snippet: `cat > CLAUDE.md << 'EOF'
# CLAUDE.md

## Role
Product Manager workspace। আমি একটা SaaS product manage করি, যার একটা web app আর একটা mobile app আছে।

## Ticket Format
- সব ticket যাবে Jira project KEY-তে
- Story point: 1, 2, 3, 5, 8
- Acceptance criteria checkbox হিসেবে দিন
- Team label দিন: frontend, backend, design, mobile

## আমার Team
- Frontend: React/Next.js
- Backend: Node.js/PostgreSQL
- Mobile: React Native
EOF`,
            language: "bash",
          },
          demo: {
            title: "PM workspace setup",
            steps: [
              { type: "cmd", text: "cat > CLAUDE.md << 'EOF'" },
              { type: "out", text: "(writing PM context...)", delay: 300 },
              {
                type: "success",
                text: "Created CLAUDE.md with PM workspace context",
              },
              { type: "out", text: "" },
              {
                type: "warn",
                text: "Claude এখন আপনার ticket format আর team structure জানে।",
              },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "একটা CLAUDE.md বানিয়ে দিন: আমি PM, Jira project KEY, point 1/2/3/5/8, AC checkbox হিসেবে" },
              { kind: "thinking", verb: "Writing", ms: 800 },
              {
                kind: "tool",
                name: "Write",
                arg: "CLAUDE.md",
                result: "Wrote 14 lines to CLAUDE.md",
                lines: [
                  "# CLAUDE.md",
                  "",
                  "## Role",
                  "Product Manager workspace। SaaS product, web app আর mobile app।",
                  "",
                  "## Ticket Format",
                  "- সব ticket যাবে Jira project KEY-তে",
                  "- Story point: 1, 2, 3, 5, 8",
                  "- Acceptance criteria checkbox হিসেবে দিন",
                  "- Team label দিন: frontend, backend, design, mobile",
                  "",
                  "## আমার Team",
                  "- Frontend: React/Next.js, Backend: Node.js/PostgreSQL",
                  "- Mobile: React Native",
                ],
              },
              { kind: "say", text: "Save হয়ে গেছে। এই folder-এ আমি যত ticket লিখব, সব এই format মেনে চলবে।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি meeting notes থেকে Jira ticket বানাতে চাই। Notes paste করার আগে আমার context বলে রাখি। আমি একটা SaaS app-এর PM, web আর mobile দুটোই আছে। Ticket যায় Jira project KEY-তে। Story point: 1, 2, 3, 5, 8। Team: frontend (React), backend (Node), mobile (React Native)। Acceptance criteria সব সময় checkbox হিসেবে দেবেন।",
              },
              {
                role: "claude",
                text: "বুঝেছি। এই conversation-এ যত ticket বানাব, সবগুলোতে এই context ব্যবহার করব।\n\nযে format follow করব:\n• Type: Story / Bug / Task\n• Points: 1, 2, 3, 5, 8\n• Labels: frontend, backend, design, mobile\n• Acceptance criteria: checkbox\n\nReady হলে meeting notes paste করুন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "PM context দিয়ে একটা CLAUDE.md বানান: SaaS product, web + mobile। Jira project KEY। Story point 1/2/3/5/8। Team: frontend (React), backend (Node), mobile (React Native)। Acceptance criteria checkbox হিসেবে।",
              },
              {
                role: "claude",
                text: "আপনার PM workspace context দিয়ে `CLAUDE.md` বানিয়ে দিয়েছি।\n\nপুরো session-এ এটাই ব্যবহার করব। আমি যে ticket-ই বানাই, সেটা আপনার format আর label structure মেনে চলবে। এবার meeting notes দিন।",
              },
            ],
          },
        },
        {
          title: "Meeting processor skill বানান",
          description:
            "এই skill Claude-কে ঠিক করে বলে দেয় meeting notes কীভাবে পড়তে হবে। এটা action item বের করে, কোনটার owner কে তা ঠিক করে, effort estimate করে, তারপর সেগুলো ticket আকারে সাজায়।",
          code: {
            snippet: `mkdir -p .claude/skills/meeting-to-tickets
cat > .claude/skills/meeting-to-tickets/SKILL.md << 'EOF'
---
name: meeting-to-tickets
description: Meeting notes থেকে story point, label আর acceptance criteria-সহ ticket বানায়। Meeting notes দিলে এটা ব্যবহার করুন।
---

# Meeting to Tickets Skill

Meeting notes দিলে action item বের করে সেগুলো structured ticket-এ convert করুন।

## Process
1. Raw meeting notes পড়ুন
2. প্রতিটা action item, decision আর follow-up খুঁজে বের করুন
3. একই ধরনের item মিলিয়ে logical ticket বানান
4. Complexity দেখে story point estimate করুন
5. কাজের ধরন দেখে team label দিন

## Output Format
প্রতিটা ticket-এর জন্য:

### [TICKET-TITLE]
**Type**: Story | Bug | Task
**Points**: 1 | 2 | 3 | 5 | 8
**Labels**: frontend, backend, design, mobile
**Description**: কাজটা কী, এক paragraph-এ।

**Acceptance Criteria**:
- [ ] প্রথম criteria
- [ ] দ্বিতীয় criteria
- [ ] তৃতীয় criteria

## Rules
- আলাদা আলাদা কাজের জন্য আলাদা ticket
- সম্পর্ক নেই এমন item এক ticket-এ মেশাবেন না
- কিছু clear না হলে "needs clarification" flag দিন
- Effort clear না হলে default 3 point
- সব সময় অন্তত 3টা acceptance criteria দিন
EOF`,
            language: "bash",
          },
          demo: {
            title: "Skill তৈরি",
            steps: [
              { type: "cmd", text: "cat > .claude/skills/meeting-to-tickets/SKILL.md" },
              {
                type: "success",
                text: "Created meeting-to-tickets.md",
                delay: 300,
              },
              {
                type: "out",
                text: "  Process: extract, group, estimate, format",
              },
              {
                type: "out",
                text: "  Output: acceptance criteria-সহ structured ticket",
              },
              { type: "out", text: "" },
              { type: "warn", text: "এবার কিছু এলোমেলো notes process করার পালা।" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "একটা skill লিখে দিন যেটা meeting notes থেকে ticket বানাবে" },
              { kind: "tool", name: "Bash", arg: "mkdir -p .claude/skills/meeting-to-tickets", result: "(No content)" },
              {
                kind: "tool",
                name: "Write",
                arg: ".claude/skills/meeting-to-tickets/SKILL.md",
                result: "Wrote 16 lines to .claude/skills/meeting-to-tickets/SKILL.md",
                lines: [
                  "---",
                  "name: meeting-to-tickets",
                  "description: Meeting notes থেকে story point, label আর acceptance criteria-সহ ticket বানায়। Meeting notes দিলে এটা ব্যবহার করুন।",
                  "---",
                  "",
                  "# Meeting to Tickets Skill",
                  "",
                  "Meeting notes দিলে action item বের করে সেগুলো ticket-এ convert করুন।",
                  "",
                  "## Process",
                  "1. প্রতিটা action item, decision আর follow-up খুঁজে বের করুন",
                  "2. একই ধরনের item মিলিয়ে logical ticket বানান",
                  "3. Complexity দেখে story point estimate করুন",
                  "4. কাজের ধরন দেখে team label দিন",
                  "5. প্রতিটা ticket-এ অন্তত 3টা acceptance criteria লিখুন",
                  "6. Clear না এমন item-এ \"needs clarification\" flag দিন",
                ],
              },
              { kind: "say", text: "Ready। আপনার meeting notes paste করুন।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Meeting notes থেকে ticket আমি এভাবে চাই:\n\n1. প্রতিটা action item আর decision বের করবেন\n2. একই ধরনের item মিলিয়ে একটা করে ticket বানাবেন\n3. Complexity দেখে story point (1/2/3/5/8) দেবেন\n4. Team label দেবেন (frontend/backend/mobile/design)\n5. প্রতিটা ticket-এ অন্তত তিনটা acceptance criteria লিখবেন\n6. Clear না এমন item-এ \"needs clarification\" flag দেবেন\n\nবোঝা গেছে?",
              },
              {
                role: "claude",
                text: "পুরোপুরি clear। আপনি যত meeting-এর notes paste করবেন, প্রতিটাতে এই process follow করব।\n\nএকটা কথা: ৩ নম্বর ধাপে effort যদি সত্যিই clear না হয়, আমি default 3 point দেব। আর কোনো ticket-এ 8 point দিলে কেন দিলাম, সেটা বুঝিয়ে বলব।\n\nপ্রথম meeting-এর notes paste করুন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "`.claude/skills/meeting-to-tickets/SKILL.md` বানান। Skill-টা meeting notes থেকে action item বের করবে, সেগুলো ticket-এ group করবে, story point (1/2/3/5/8) estimate করবে, team label (frontend/backend/mobile/design) দেবে, প্রতিটা ticket-এ 3+ acceptance criteria লিখবে, আর clear না এমন item flag করবে।",
              },
              {
                role: "claude",
                text: "পুরো process definition দিয়ে `.claude/skills/meeting-to-tickets/SKILL.md` বানিয়ে দিয়েছি।\n\nSkill-এ output format, estimate-এর default আর clarification flag-এর rule আছে। Test করার জন্য ready। আপনার meeting notes paste করুন।",
              },
            ],
          },
        },
        {
          title: "এলোমেলো meeting notes paste করুন",
          description:
            "এবার আসল test। আপনার নিজের কিছু এলোমেলো meeting notes paste করুন (অথবা নিচের sample ব্যবহার করুন), আর দেখুন Claude কীভাবে গোলমেলে notes থেকে গোছানো structure বানায়।",
          code: {
            snippet: `claude "এই meeting notes থেকে ticket বানান:

Sprint planning - ২৯ মার্চ
---
sarah বলল mobile-এ checkout flow আবার ভেঙে গেছে,
user-রা pay button-এ tap করতে পারছে না। আর Q2-এর আগে
apple pay add করতে হবে। jake বলল product listing page-এ
API অনেক slow - 3 second লাগে। আমরা caching add করার
decision নিলাম। ও হ্যাঁ, marketing spring sale-এর জন্য
homepage-এ একটা banner চায়, শুক্রবারের মধ্যে লাগবে। আর কাউকে
onboarding flow update করতে হবে - user-রা step 3-এ drop করছে।"`,
            language: "bash",
          },
          demo: {
            title: "এলোমেলো notes দিলেন, গোছানো ticket পেলেন",
            steps: [
              {
                type: "cmd",
                text: 'claude "এই meeting notes থেকে ticket বানান: ..."',
              },
              {
                type: "out",
                text: "Loading skill: meeting-to-tickets.md",
                delay: 400,
              },
              { type: "out", text: "Parsing meeting notes..." },
              { type: "out", text: "Found 5 action items across 3 teams" },
              { type: "out", text: "" },
              { type: "error", text: "### Mobile checkout-এর pay button ঠিক করা" },
              {
                type: "out",
                text: "  Type: Bug | Points: 3 | Labels: mobile, frontend",
              },
              {
                type: "out",
                text: "  AC: tap target size, iOS+Android-এ test, regression test",
              },
              { type: "out", text: "" },
              { type: "warn", text: "### Apple Pay integration add করা" },
              {
                type: "out",
                text: "  Type: Story | Points: 8 | Labels: backend, mobile",
              },
              { type: "out", text: "" },
              { type: "warn", text: "### Product listing-এ caching add করা" },
              { type: "out", text: "  Type: Task | Points: 5 | Labels: backend" },
              { type: "out", text: "" },
              { type: "success", text: "5টা ticket তৈরি। File করার জন্য ready।" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "এই notes থেকে ticket বানান: mobile-এ pay button কাজ করছে না, Q2-এর মধ্যে Apple Pay, listing API slow, শুক্রবারের মধ্যে sale banner, onboarding-এ drop-off" },
              { kind: "tool", name: "Read", arg: ".claude/skills/meeting-to-tickets/SKILL.md", result: "Read 16 lines" },
              { kind: "thinking", verb: "Extracting", ms: 900 },
              { kind: "say", text: "3টা team মিলিয়ে 5টা ticket:\n- Bug: Mobile checkout-এর pay button ঠিক করা (3 pts, mobile, frontend)\n- Story: Apple Pay integration add করা (8 pts, backend, mobile)\n- Task: Product listing-এ caching add করা (5 pts, backend)\n- Task: Spring sale-এর homepage banner (2 pts, frontend, deadline শুক্রবার)\n- Story: Onboarding step 3-এর drop-off ঠিক করা (3 pts, needs clarification)\n\nপ্রতিটাতে 3টা করে acceptance criteria আছে।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এই meeting notes থেকে ticket বানান:\n\nSprint planning ২৯ মার্চ। Sarah বলল mobile-এ checkout ভাঙা, user-রা pay-তে tap করতে পারছে না। Q2-এর আগে apple pay add করতে হবে। Jake বলল product listing-এ API খুব slow - 3 second, caching লাগবে। Marketing শুক্রবারের মধ্যে homepage-এ spring sale banner চায়। কাউকে onboarding step 3-এর dropoff ঠিক করতে হবে।",
              },
              {
                role: "claude",
                text: "5টা ticket বের করেছি:\n\n### Bug: Mobile checkout-এর pay button ঠিক করা\n**Type**: Bug | **Points**: 3 | **Labels**: mobile, frontend\n**AC**: - [ ] Tap target কমপক্ষে 44px - [ ] iOS আর Android-এ test করা - [ ] Regression test add করা\n\n### Story: Apple Pay integration add করা\n**Type**: Story | **Points**: 8 | **Labels**: backend, mobile\n**AC**: - [ ] Apple Pay entitlement configure করা - [ ] Sandbox-এ payment flow test করা - [ ] Apple Pay support না করলে card-এর option দেখানো\n\n### Task: Product listing API-তে caching add করা\n**Type**: Task | **Points**: 5 | **Labels**: backend\n**AC**: - [ ] p95 response 500ms-এর নিচে - [ ] Product update হলে cache invalidate হয় - [ ] Staging-এ cache hit rate >80%\n\n### Task: Spring sale-এর homepage banner\n**Type**: Task | **Points**: 2 | **Labels**: frontend, design\n⚠️ Deadline: শুক্রবার (priority ঠিক করার জন্য flag করা)\n\n### Story: Onboarding step 3-এর drop-off কমানো\n**Type**: Story | **Points**: 3 | **Labels**: frontend\n⚠️ Needs clarification: success কোন metric দিয়ে মাপা হবে?",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "এই meeting notes process করুন: mobile-এ checkout ভাঙা, Q2-এর আগে apple pay add করতে হবে, API অনেক slow (3s), caching লাগবে, শুক্রবারের মধ্যে spring sale banner, onboarding step 3-এর dropoff ঠিক করতে হবে।",
              },
              {
                role: "claude",
                text: "`meeting-to-tickets` skill ব্যবহার করছি। 5টা ticket বের করেছি:\n\n**BUG** Mobile checkout button ঠিক করা (3pts, mobile+frontend)\n**STORY** Apple Pay integration (8pts, backend+mobile)\n**TASK** Product listing caching (5pts, backend)\n**TASK** Spring sale banner (2pts, frontend) ⚠️ deadline শুক্রবার\n**STORY** Onboarding step 3 (3pts, frontend) ⚠️ success metric লাগবে\n\nসবগুলোতে 3টা করে acceptance criteria আছে। Jira-তে paste করার জন্য markdown হিসেবে export করে দেব?",
              },
            ],
          },
        },
        {
          title: "Structured output review করুন",
          description:
            "Claude আপনাকে পুরোপুরি তৈরি ticket দেয়: type, story point, label আর acceptance criteria-সহ। প্রতিটা সরাসরি Jira-তে paste করার জন্য ready। কী decision হয়েছিল মনে করতে notes-এর দিকে আর তাকিয়ে থাকতে হবে না।",
          demo: {
            title: "যা পাবেন",
            steps: [
              { type: "out", text: "6 লাইনের এলোমেলো notes থেকে:", delay: 400 },
              { type: "out", text: "" },
              { type: "success", text: "5টা structured ticket" },
              { type: "success", text: "15টা acceptance criteria" },
              { type: "success", text: "মোট 24 story point" },
              { type: "success", text: "3টা team label দেওয়া হয়েছে" },
              { type: "success", text: "1টা item clarification-এর জন্য flag করা" },
              { type: "out", text: "" },
              {
                type: "warn",
                text: "সময় বাঁচল: হাতে ticket লেখার প্রায় 45 মিনিট।",
              },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "সবগুলো একটা markdown file-এ export করে দিন, যেটা আমি Jira-তে paste করতে পারি" },
              {
                kind: "tool",
                name: "Write",
                arg: "tickets/sprint-planning-03-29.md",
                result: "Wrote 58 lines to tickets/sprint-planning-03-29.md",
                lines: [
                  "# Sprint planning, ২৯ মার্চ",
                  "",
                  "### Mobile checkout-এর pay button ঠিক করা",
                  "**Type**: Bug | **Points**: 3 | **Labels**: mobile, frontend",
                  "- [ ] Tap target কমপক্ষে 44px",
                  "- [ ] iOS আর Android-এ test করা",
                  "- [ ] Regression test add করা",
                ],
              },
              { kind: "say", text: "6 লাইনের notes থেকে: 5টা ticket, 15টা acceptance criteria, 1টা item clarification-এর জন্য flag করা।\nFile-টা Jira-র issue creator-এ paste করুন।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এটা তো আসলেই ভালো হয়েছে। হাতে করলে কতক্ষণ লাগত?",
              },
              {
                role: "claude",
                text: "5টা ticket, প্রতিটাতে 3টা acceptance criteria, এমন কাজে সাধারণত 30–45 মিনিট লাগে:\n\n• সব action item খুঁজতে notes পড়া: 5 মিনিট\n• কোনটা কোনটার সঙ্গে group হবে ঠিক করা: 5 মিনিট\n• প্রতিটা ticket-এর title আর description লেখা: 10 মিনিট\n• Acceptance criteria লেখা: 15 মিনিট\n• Point আর label দেওয়া: 5 মিনিট\n\nএই process-এ: paste করতে মোটামুটি 30 second, পড়তে 20 second।\n\nসময় তো বাঁচেই, তবে বড় লাভ হলো কিছুই বাদ পড়ে না। Meeting notes এলোমেলো থাকে, ticket থাকে complete।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "claude",
                text: "5টা ticket-ই structured আর ready।\n\nসবগুলো একটা markdown file হিসেবে export করে দেব, যেটা Jira-তে paste করতে পারবেন? নাকি Linear বা GitHub Issues-এর মতো অন্য কোনো tool-এর জন্য format করব?",
              },
            ],
          },
        },
        {
          title: "Optional: auto-creation-এর জন্য একটা MCP connect করুন",
          description:
            "আরও এগোতে চাইলে একটা GitHub বা Linear MCP server connect করতে পারেন, তাহলে Claude নিজেই ticket বানিয়ে দেবে। Copy-paste লাগবে না।",
          code: {
            snippet: `# GitHub Issues চালু করতে আপনার .mcp.json-এ এটা add করুন:
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token-here"
      }
    }
  }
}`,
            language: "json",
          },
          demo: {
            title: "MCP দিয়ে auto-creation",
            steps: [
              { type: "cmd", text: 'claude "ওই ticket-গুলো GitHub-এ বানিয়ে দিন"' },
              { type: "out", text: "Using MCP: github", delay: 500 },
              {
                type: "success",
                text: "Created issue #142: Mobile checkout-এর pay button ঠিক করা",
              },
              {
                type: "success",
                text: "Created issue #143: Apple Pay integration add করা",
              },
              {
                type: "success",
                text: "Created issue #144: Product listing-এ caching add করা",
              },
              {
                type: "success",
                text: "Created issue #145: Spring sale-এর homepage banner",
              },
              {
                type: "success",
                text: "Created issue #146: Onboarding step 3 optimize করা",
              },
              { type: "out", text: "" },
              {
                type: "warn",
                text: "5টা ticket file হয়ে গেছে। Label আর point set করা। কাজ শেষ।",
              },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "ওই ticket-গুলো GitHub-এ বানিয়ে দিন" },
              { kind: "tool", name: "github - create_issue (MCP)", arg: "title: \"Mobile checkout-এর pay button ঠিক করা\"", result: "Created issue #142" },
              { kind: "tool", name: "github - create_issue (MCP)", arg: "title: \"Apple Pay integration add করা\"", result: "Created issue #143" },
              { kind: "tool", name: "github - create_issue (MCP)", arg: "title: \"Product listing-এ caching add করা\"", result: "Created issue #144" },
              { kind: "tool", name: "github - create_issue (MCP)", arg: "title: \"Spring sale-এর homepage banner\"", result: "Created issue #145" },
              { kind: "tool", name: "github - create_issue (MCP)", arg: "title: \"Onboarding step 3 optimize করা\"", result: "Created issue #146" },
              { kind: "say", text: "Label আর acceptance criteria-সহ 5টা issue বানিয়েছি। আপনার repo চেক করুন।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Claude কি শুধু লিখে দেওয়া না, সরাসরি Jira ticket বানিয়েও দিতে পারে?",
              },
              {
                role: "claude",
                text: "claude.ai থেকে সরাসরি না। তার জন্য Jira connect করা থাকতে হবে।\n\nআপনার option:\n1. **Copy-paste**: আমি যে markdown বানাই, সেটা Jira-র issue creator-এ paste করার মতো করেই format করা। 5টা ticket-এ 2 মিনিট লাগে।\n2. **Zapier/Make**: এমন একটা automation setup করুন যেটা একটা Google Doc পড়ে Jira ticket বানায়, কোনো coding লাগবে না।\n3. **Claude Code + MCP**: Terminal-এ comfortable হলে, GitHub বা Linear MCP server-সহ Claude Code নিজে থেকেই issue বানাতে পারে। এটা পরের ধাপ।\n\nআপাতত copy-paste দিয়েই কাজের 80% বেঁচে যায়। সরাসরি বানানোর setup আলাদা একটা project।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "এই ticket-গুলো কি সরাসরি GitHub Issues-এ বানিয়ে দিতে পারবেন?",
              },
              {
                role: "claude",
                text: "হ্যাঁ। GitHub MCP connect করা আছে। এখনই 5টা issue বানাচ্ছি...\n\n✓ #142: Mobile checkout-এর pay button ঠিক করা\n✓ #143: Apple Pay integration add করা\n✓ #144: Product listing-এ caching add করা\n✓ #145: Spring sale-এর homepage banner\n✓ #146: Onboarding step 3 optimize করা\n\nসবগুলো label, assignee আর description-এ acceptance criteria-সহ বানানো হয়েছে। আপনার repo চেক করুন।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "পুরো PM workflow guide দেখুন",
        href: "/docs/workflows/pm-workflow",
      },
    },
  },
  "weekly-status": {
    sourceHash: "3fd349c688826ca6",
    translatedAt: "2026-10-06",
    content: {
      title: "Weekly status report generator বানান",
      slug: "weekly-status",
      duration: "১৫ মিনিট",
      difficulty: "intermediate",
      availableRoutes: ["app", "terminal", "ide"],
      description:
        "আপনার project-গুলো থেকে তথ্য নিয়ে কয়েক second-এ stakeholder-দের পাঠানোর মতো status report বানান।",
      intro:
        "Status report লিখতে কারোরই ভালো লাগে না, কিন্তু সবারই এটা লাগে। চলুন এমন একটা skill বানাই, যেটা আপনার project-গুলো থেকে context জোগাড় করে কয়েক second-এ একটা পরিষ্কার, stakeholder-ready report বানিয়ে দেবে। \"আমাকে weekly update লিখতে হবে\" ভাবার কয়েক মিনিটের মধ্যেই দেখবেন কাজটা শেষ।",
      steps: [
        {
          title: "Project context দিয়ে memory setup করুন",
          description:
            "প্রথমে Claude-কে দরকারি context দিন: আপনার project, আপনার team, আর stakeholder-রা কী জানতে চান। এগুলো যাবে আপনার CLAUDE.md-তে।",
          code: {
            snippet: `cat > CLAUDE.md << 'EOF'
# CLAUDE.md

## Role
Product Manager। প্রতি সপ্তাহে leadership-এর কাছে report করি।

## আমার Project
- **Project Alpha**: User authentication redesign (Q2 deadline)
- **Project Beta**: Mobile app v2.0 (beta testing চলছে)
- **Project Gamma**: API performance optimization (চলছে)

## Stakeholder
- VP of Product: high-level progress আর risk জানতে চান
- Engineering Director: technical detail আর blocker জানতে চান
- CEO: প্রতিটা project-এর এক লাইনের status চান

## Status Report Format
প্রতি শুক্রবার weekly status পাঠানো হয়।
যা থাকবে: এই সপ্তাহে কী হলো, পরের সপ্তাহ, risk, metric।
EOF`,
            language: "bash",
          },
          demo: {
            title: "Context load হয়েছে",
            steps: [
              { type: "cmd", text: "cat > CLAUDE.md" },
              {
                type: "success",
                text: "Created CLAUDE.md with project context",
                delay: 300,
              },
              { type: "out", text: "  3টা project track হচ্ছে" },
              { type: "out", text: "  3টা stakeholder profile ঠিক করা" },
              { type: "out", text: "  Report format ঠিক করা" },
              {
                type: "warn",
                text: "Claude জানে আপনার stakeholder-রা কী জানতে চান।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি একটা weekly status report generator বানাতে চাই। আমার context: আমি PM, প্রতি সপ্তাহে leadership-এর কাছে report করি। Project: Alpha (auth redesign, Q2 deadline), Beta (mobile app v2, beta চলছে), Gamma (API perf, চলছে)। Stakeholder: VP Product চান high-level আর risk, Engineering Director চান technical detail, CEO চান প্রতি project-এ এক লাইন।",
              },
              {
                role: "claude",
                text: "আপনার context পেয়েছি। Report-গুলো আপনার তিনটা stakeholder profile অনুযায়ী সাজাব।\n\nপ্রতিটা project-এর জন্য track করব:\n• এই সপ্তাহে কী শেষ হয়েছে\n• পরের সপ্তাহে কী plan\n• কোনো risk বা blocker (স্পষ্ট করে flag করা)\n• Status: On track / At risk / Blocked\n\nReport format কেমন হবে বলে দিন, অথবা আমি একটা suggest করতে পারি। এটা কি Slack, email, নাকি doc হিসেবে পাঠান?",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "CLAUDE.md বানান: PM workspace, প্রতি সপ্তাহে report করি। Project: Alpha (auth redesign, Q2), Beta (mobile v2, beta), Gamma (API perf)। Stakeholder: VP Product (high-level+risk), Eng Director (technical), CEO (এক লাইন)।",
              },
              {
                role: "claude",
                text: "আপনার project আর stakeholder context দিয়ে `CLAUDE.md` বানিয়ে দিয়েছি।\n\nReport বানানোর জন্য ready। আপনার weekly update দিলে আমি সেটা stakeholder profile অনুযায়ী সাজাব: CEO-র জন্য এক পাতার একটা format, VP-র জন্য একটা, Eng Director-এর জন্য আরেকটা।",
              },
            ],
          },
        },
        {
          title: "weekly-status skill বানান",
          description:
            "এই skill আপনার status report-এর structure ঠিক করে দেয়। কোন কোন section থাকবে, tone কেমন হবে, আর কোনো তথ্য না থাকলে কী করতে হবে, সব Claude-কে বলে দেয়।",
          code: {
            snippet: `mkdir -p .claude/skills/weekly-status
cat > .claude/skills/weekly-status/SKILL.md << 'EOF'
---
name: weekly-status
description: Leadership-এর জন্য weekly status report বানায়। Weekly status বা update চাইলে এটা ব্যবহার করুন।
---

# Weekly Status Report Skill

Leadership-এর জন্য একটা weekly status report বানান।

## Process
1. CLAUDE.md থেকে project context পড়ুন
2. এই সপ্তাহে কী শেষ হয়েছে জিজ্ঞেস করুন (অথবা সাম্প্রতিক file/commit দেখুন)
3. নিচের report format-এ সাজান
4. কোনো risk বা blocker থাকলে স্পষ্ট করে flag করুন

## Report Template

# Weekly Status : [তারিখ]

## TL;DR
প্রতি project-এ এক লাইন। Green/Yellow/Red status।

## Project Alpha: [Status Emoji] [এক লাইনে]
**এই সপ্তাহে**: কী শেষ হয়েছে
**পরের সপ্তাহে**: কী plan করা আছে
**Risk**: কোনো blocker বা চিন্তার বিষয় (না থাকলে "নেই")

## Project Beta: [Status Emoji] [এক লাইনে]
(একই format)

## Project Gamma: [Status Emoji] [এক লাইনে]
(একই format)

## Key Metrics
- Metric 1: value (trend)
- Metric 2: value (trend)

## যে Decision লাগবে
- [ ] Decision 1 (কবের মধ্যে, কার কাছ থেকে)

## Status Emoji
- On track = সবুজ circle
- At risk = হলুদ circle
- Blocked = লাল circle

## Rules
- এক নজরে পড়া যায় এমন রাখুন, leadership 30 second-এ পড়ে
- শুরুতেই TL;DR দিন
- খারাপ খবর Risk section-এ দিন, update-এর ভেতরে লুকাবেন না
- Vague progress-এর কথা না, concrete number দিন
- কোনো কিছু নিয়ে sure না হলে সেটা স্পষ্ট করে বলুন
EOF`,
            language: "bash",
          },
          demo: {
            title: "Skill তৈরি",
            steps: [
              { type: "cmd", text: "cat > .claude/skills/weekly-status/SKILL.md" },
              { type: "success", text: "Created weekly-status.md", delay: 300 },
              {
                type: "out",
                text: "  Template: TL;DR, প্রতি project-এর status, metric, decision",
              },
              {
                type: "out",
                text: "  Rules: scannable, concrete, risk নিয়ে honest",
              },
              { type: "warn", text: "আপনার report format এখন ঠিক হয়ে গেল।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এই আমার report format:\n\nপ্রতি শুক্রবার weekly status যায়।\nStructure: TL;DR (প্রতি project-এ এক লাইন, 🟢/🟡/🔴 status-সহ), প্রতি project-এর section (এই সপ্তাহে / পরের সপ্তাহে / risk), আর একদম নিচে কোন decision লাগবে।\nRules: scannable, concrete number, vague progress-এর কথা না, খারাপ খবর Risk-এ দিতে হবে, লুকানো যাবে না।",
              },
              {
                role: "claude",
                text: "Format ঠিক হয়ে গেল। এই conversation-এ যখনই status report চাইবেন, এই template ব্যবহার করব।\n\nপরের session-গুলোর জন্য এটা আপনার permanent \"status report prompt\" হিসেবে save করে রাখতে চান? আমি পুরো reusable instruction লিখে দিচ্ছি, আপনি copy করে রাখবেন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "`.claude/skills/weekly-status/SKILL.md` বানান। Template: 🟢/🟡/🔴-সহ TL;DR, প্রতি project (এই সপ্তাহে / পরের সপ্তাহে / risk), কোন decision লাগবে। Rules: scannable, concrete number, খারাপ খবর সামনে রাখতে হবে।",
              },
              {
                role: "claude",
                text: "`.claude/skills/weekly-status/SKILL.md` বানিয়ে দিয়েছি।\n\nএই project-এ skill-টা active। চালাতে চাইলে বলুন \"আমার weekly status বানিয়ে দিন\", সঙ্গে কী কী হয়েছে তার কয়েকটা bullet point দিন। Formatting আমি দেখে নেব।",
              },
            ],
          },
        },
        {
          title: "Skill চালিয়ে report দেখুন",
          description:
            "এবার শুধু Claude-কে বলুন এই সপ্তাহে কী হয়েছে। যত এলোমেলো করে খুশি লিখতে পারেন: bullet point, অর্ধেক বাক্য, যেভাবে সুবিধা। Formatting skill নিজেই সামলাবে।",
          code: {
            snippet: `claude "আমার weekly status বানিয়ে দিন। এই সপ্তাহে যা হয়েছে:
- Alpha: password reset flow শেষ, SSO integration শুরু করেছি। SSO যতটা ভেবেছিলাম তার চেয়ে complex, হয়তো আরেকটা sprint লাগবে।
- Beta: এই সপ্তাহে 200 জন beta tester পেয়েছি, crash rate কমে 0.3%। Android-এ push notification নিয়ে একটা critical bug আছে।
- Gamma: API p95 800ms থেকে 340ms-এ নামিয়েছি। Search endpoint নিয়ে এখনও কাজ চলছে।"`,
            language: "bash",
          },
          demo: {
            title: "আপনার status report তৈরি",
            steps: [
              { type: "cmd", text: 'claude "আমার weekly status বানিয়ে দিন..."' },
              {
                type: "out",
                text: "Loading skill: weekly-status.md",
                delay: 400,
              },
              { type: "out", text: "Processing updates for 3 projects..." },
              { type: "out", text: "" },
              { type: "success", text: "# Weekly Status : ২৯ মার্চ, ২০২৬" },
              { type: "out", text: "" },
              { type: "out", text: "## TL;DR" },
              {
                type: "warn",
                text: "Alpha: At risk। SSO-র complexity-র কারণে Q2 deadline পিছিয়ে যেতে পারে।",
              },
              {
                type: "success",
                text: "Beta: On track। 200 tester, 0.3% crash rate।",
              },
              { type: "success", text: "Gamma: On track। p95 57% improve হয়েছে।" },
              { type: "out", text: "" },
              { type: "out", text: "## যে Decision লাগবে" },
              {
                type: "warn",
                text: "- SSO-র জন্য extra sprint? (বুধবারের মধ্যে VP-র approval লাগবে)",
              },
              { type: "out", text: "" },
              { type: "success", text: "Report তৈরি। পাঠানোর জন্য ready।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমার weekly status বানিয়ে দিন। এই সপ্তাহে যা হয়েছে:\n- Alpha: password reset শেষ, SSO শুরু। SSO যতটা ভেবেছিলাম তার চেয়ে complex, হয়তো extra sprint লাগবে।\n- Beta: 200 জন beta tester, crash rate 0.3%। Android push notification-এ critical bug।\n- Gamma: p95 800ms থেকে 340ms-এ নেমেছে। Search endpoint-এর কাজ এখনও চলছে।",
              },
              {
                role: "claude",
                text: "# Weekly Status : ২৯ মার্চ\n\n## TL;DR\n🟡 **Alpha** : At risk। SSO-র scope estimate-এর চেয়ে বড়, Q2 deadline পিছাতে পারে।\n🟢 **Beta** : On track। 200 tester live, crash rate 0.3%। একটা critical bug triage-এ আছে।\n🟢 **Gamma** : On track। API p95 57% improve হয়েছে।\n\n## Project Alpha\n**এই সপ্তাহে**: Password reset flow ship হয়েছে। SSO integration শুরু হয়েছে।\n**পরের সপ্তাহে**: SSO implementation চালিয়ে যাওয়া।\n**Risk**: SSO-র complexity scope-এ যা ধরা হয়েছিল তার চেয়ে বেশি, extra sprint লাগতে পারে। বুধবারের মধ্যে VP-র decision লাগবে।\n\n## Project Beta\n**এই সপ্তাহে**: 200 জন beta user onboard হয়েছে। Crash rate কমে 0.3%।\n**পরের সপ্তাহে**: Android push notification bug fix (critical)। Beta আরও বাড়ানো।\n**Risk**: Android push bug-এর কারণে notification ঠিকমতো আসছে না। এই সপ্তাহে এটাই priority।\n\n## Project Gamma\n**এই সপ্তাহে**: API p95 800ms → 340ms (57% improvement)।\n**পরের সপ্তাহে**: Search endpoint optimization।\n**Risk**: নেই।\n\n## যে Decision লাগবে\n- [ ] Alpha SSO-র জন্য extra sprint? → VP Product, বুধবারের মধ্যে",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Weekly status বানান। Alpha: password reset শেষ, SSO শুরু কিন্তু বেশি complex, extra sprint লাগতে পারে। Beta: 200 tester, crash 0.3%, Android push bug critical। Gamma: p95 800ms→340ms, search এখনও চলছে।",
              },
              {
                role: "claude",
                text: "`weekly-status` skill ব্যবহার করছি। Report তৈরি:\n\n🟡 **Alpha**: At risk (SSO scope)\n🟢 **Beta**: On track (200 tester, 0.3% crash)\n🟢 **Gamma**: On track (p95 57% faster)\n\n**যে decision লাগবে**: SSO-র জন্য extra sprint → VP Product, বুধবারের মধ্যে\n\nপুরো report format করে ready। Slack version বা email version-ও বানিয়ে দেব?",
              },
            ],
          },
        },
        {
          title: "Output format customize করুন",
          description:
            "হয়তো আপনার team Slack use করে। হয়তো আপনার Confluence-এ বসানোর মতো একটা version লাগবে। Skill-টা একটু বদলে নিন, যাতে আপনার team আসলে যে format পড়ে, output সেই format-এই আসে।",
          code: {
            snippet: `# আপনার weekly-status.md skill-এ এটা add করুন:

## Output Variants
"slack format" চাইলে:
- Slack markdown ব্যবহার করুন (bold-এর জন্য *, ** না)
- Status বোঝাতে emoji reaction দিন
- প্রতি project 500 character-এর মধ্যে রাখুন
- শেষে thread-friendly একটা "প্রশ্ন থাকলে এখানে reply করুন" দিন

"email format" চাইলে:
- Professional একটা subject line দিন
- "Hi team," দিয়ে শুরু করুন
- Detailed report-টা quote block হিসেবে দিন
- শেষে "কোনো প্রশ্ন থাকলে জানাবেন" দিন`,
            language: "markdown",
          },
          demo: {
            title: "একাধিক format-এ output",
            steps: [
              { type: "cmd", text: 'claude "slack format-এ দিন"' },
              { type: "out", text: "Reformatting for Slack...", delay: 400 },
              { type: "out", text: "" },
              { type: "success", text: "*Weekly Status : ২৯ মার্চ*" },
              { type: "out", text: "" },
              {
                type: "warn",
                text: ":large_yellow_circle: *Alpha*: SSO integration শুরু হয়েছে, extra sprint লাগবে",
              },
              {
                type: "success",
                text: ":large_green_circle: *Beta*: 200 tester, crash rate 0.3%",
              },
              {
                type: "success",
                text: ":large_green_circle: *Gamma*: API p95 57% কমে 340ms",
              },
              { type: "out", text: "" },
              { type: "out", text: "প্রশ্ন থাকলে thread-এ reply করুন।" },
              { type: "out", text: "" },
              { type: "warn", text: "Data একই, format আলাদা, skill-ও সেই একটাই।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "একই report Slack-এর জন্য format করে দিন। Short রাখবেন, status বোঝাতে emoji দেবেন, প্রতি project 500 character-এর মধ্যে।",
              },
              {
                role: "claude",
                text: "*Weekly Status : ২৯ মার্চ*\n\n:large_yellow_circle: *Alpha*: SSO শুরু হয়েছে, complexity scope-এর চেয়ে বেশি। Extra sprint-এর decision বুধবারের মধ্যে VP-র কাছ থেকে লাগবে।\n:large_green_circle: *Beta*: 200 tester live, crash rate 0.3%। Android push bug triage-এ (critical)।\n:large_green_circle: *Gamma*: API p95 57% কমে 340ms। Search endpoint-এর কাজ চলছে।\n\nযে decision লাগবে: Alpha-র জন্য extra sprint? → বুধবারের মধ্যে thread-এ reply করুন বা আমাকে DM করুন।\n\nপ্রশ্ন থাকলে এখানে reply করুন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              { role: "user", text: "এবার Slack format-এ দিন।" },
              {
                role: "claude",
                text: "Slack format:\n\n:large_yellow_circle: *Alpha* : SSO-র scope estimate-এর চেয়ে বড়, Q2 risk-এ। বুধবারের মধ্যে extra sprint-এর decision লাগবে।\n:large_green_circle: *Beta* : 200 tester, 0.3% crash rate। Android push bug (critical) triage-এ।\n:large_green_circle: *Gamma* : p95 57% faster। এরপর search endpoint।\n\n_যে decision লাগবে: Alpha-র sprint বাড়ানো → VP Product, বুধবারের মধ্যে_\n\nপ্রশ্ন থাকলে thread-এ reply করুন।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "Claude Code দিয়ে আপনার daily practice গড়ে তুলুন",
        href: "/docs/workflows/daily-practice",
      },
    },
  },
  "product-discovery-ost": {
    sourceHash: "e9f08f752138129a",
    translatedAt: "2026-10-06",
    content: {
      title: "Opportunity Solution Tree দিয়ে product discovery চালান",
      slug: "product-discovery-ost",
      duration: "২০ মিনিট",
      difficulty: "intermediate",
      availableRoutes: ["app", "terminal", "ide"],
      description:
        "Teresa Torres-এর Opportunity Solution Tree framework দিয়ে customer interview থেকে validated experiment পর্যন্ত যান, পুরোটা Claude Code-এর ভেতরেই।",
      intro:
        "Product discovery কোনো রহস্য হওয়া উচিত না। Teresa Torres-এর Opportunity Solution Tree (OST) আপনাকে একটা পরিষ্কার structure দেয়: একটা outcome দিয়ে শুরু করুন, customer-এর opportunity-গুলো map করুন, solution-এর idea বের করুন, তারপর assumption test design করুন। সমস্যা হলো, একটা OST বানানো আর update রাখতে হাতে বসে অনেক ঘণ্টার synthesis লাগে। Claude Code সেটা কয়েক মিনিটে নামিয়ে আনে। আপনি raw interview notes paste করবেন, আর হাতে পাবেন একটা structured tree আর experiment design। OST আপনার জন্য নতুন হলে Teresa-র original framework পড়ে নিন: producttalk.org/opportunity-solution-trees।",
      steps: [
        {
          title: "আপনার discovery workspace setup করুন",
          description:
            "একটা CLAUDE.md বানান, যেটা Claude-কে আপনার product context আর discovery goal জানাবে। কোন outcome-এ পৌঁছাতে চান, সেটা এখানেই ঠিক করবেন। এটাই আপনার OST-র একদম ওপরের ধাপ।",
          code: {
            snippet: `cat > CLAUDE.md << 'EOF'
# CLAUDE.md

## Role
Product Manager, continuous discovery চালাচ্ছি।
Framework: Opportunity Solution Trees (Teresa Torres)।
Reference: https://www.producttalk.org/opportunity-solution-trees/

## Product Context
- B2B SaaS project management tool
- 2,400টা active team, 85% retention
- Target outcome: weekly active usage সপ্তাহে 3.2 দিন থেকে 4.5 দিনে নেওয়া

## Discovery State
- প্রতি সপ্তাহে customer interview নিচ্ছি
- এই cycle-এ 12টা interview শেষ
- Focus: team-গুলো সপ্তাহের মাঝখানে tool ব্যবহার বন্ধ করে দেয় কেন

## Output Preference
- সবকিছু Outcome → Opportunities → Solutions → Tests হিসেবে সাজান
- Visual hierarchy-র জন্য markdown tree ব্যবহার করুন
- Specific থাকুন, কোনো opportunity statement যেন vague না হয়
EOF`,
            language: "bash",
          },
          demo: {
            title: "Discovery workspace ready",
            steps: [
              {
                type: "cmd",
                text: "mkdir product-discovery && cd product-discovery",
              },
              { type: "cmd", text: "cat > CLAUDE.md << 'EOF'", delay: 400 },
              {
                type: "success",
                text: "Created CLAUDE.md with discovery context",
              },
              {
                type: "out",
                text: "  Outcome: weekly active usage 3.2 → 4.5 দিন",
              },
              { type: "out", text: "  Framework: Opportunity Solution Trees" },
              {
                type: "warn",
                text: "Claude এখন OST ধরে চিন্তা করে। চলুন data দিই।",
              },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "discovery-র জন্য একটা CLAUDE.md বানান: B2B SaaS, 2,400 team, outcome হলো সপ্তাহে active দিন 3.2 থেকে 4.5, OST" },
              { kind: "thinking", verb: "Writing", ms: 800 },
              {
                kind: "tool",
                name: "Write",
                arg: "CLAUDE.md",
                result: "Wrote 14 lines to CLAUDE.md",
                lines: [
                  "# CLAUDE.md",
                  "",
                  "## Role",
                  "Product Manager, continuous discovery চালাচ্ছি।",
                  "Framework: Opportunity Solution Trees (Teresa Torres)।",
                  "",
                  "## Product Context",
                  "- B2B SaaS project management tool",
                  "- 2,400টা active team, 85% retention",
                  "- Target outcome: weekly active usage সপ্তাহে 3.2 থেকে 4.5 দিন",
                  "",
                  "## Discovery State",
                  "- এই cycle-এ 12টা interview শেষ",
                  "- Focus: team-গুলো সপ্তাহের মাঝখানে tool ব্যবহার বন্ধ করে দেয় কেন",
                ],
              },
              { kind: "say", text: "Save হয়ে গেছে। আমি যে opportunity-ই বের করি, সেটা এই outcome-এর সঙ্গে connect করা থাকবে।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি Teresa Torres-এর Opportunity Solution Tree framework দিয়ে product discovery চালাতে চাই। আমার product context: B2B SaaS project management tool, 2,400 active team, 85% retention। Target outcome: weekly active usage সপ্তাহে 3.2 দিন থেকে 4.5 দিনে নেওয়া। এই cycle-এ 12টা customer interview করেছি।",
              },
              {
                role: "claude",
                text: "ভালো framing। Measurable outcome ঠিক করে ফেলেছেন, এটাই সবচেয়ে কঠিন অংশ ছিল। OST framework ঠিকভাবে ব্যবহার করছি কি না, একবার মিলিয়ে নিই:\n\n🎯 **Outcome**: Weekly active usage সপ্তাহে 3.2 → 4.5 দিন\n\nএই session-এর সব কাজে আমি এগুলো আলাদা রাখব:\n- **Opportunities** = customer-এর problem, need বা desire (তারা যা experience করে)\n- **Solutions** = আমাদের idea (আমরা যা বানাতে পারি)\n- **Assumption tests** = কিছু বানানোর আগে validate করার জন্য ছোট experiment\n\nReady হলে প্রথম interview paste করুন। আমি opportunity-গুলো বের করে দেব।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "একটা product discovery workspace-এর জন্য CLAUDE.md বানান। B2B SaaS, 2400 active team। Outcome: weekly active usage সপ্তাহে 3.2 → 4.5 দিন। Framework: OST (Teresa Torres)। 12টা interview হয়ে গেছে, focus হলো team-গুলো সপ্তাহের মাঝখানে use করা বন্ধ করে কেন।",
              },
              {
                role: "claude",
                text: "আপনার discovery context আর OST framework reference দিয়ে `CLAUDE.md` বানিয়ে দিয়েছি।\n\nপুরো session-এ এটাই ব্যবহার করব। যত opportunity বের করব, সব আপনার দেওয়া outcome-এর সঙ্গে বাঁধা থাকবে। এবার interview notes দিন।",
              },
            ],
          },
        },
        {
          title: "একটা discovery skill বানান",
          description:
            "এই skill Claude-কে OST framework শেখায়: interview থেকে কীভাবে opportunity বের করতে হয়, opportunity আর solution কীভাবে আলাদা করতে হয়, আর সবকিছু কীভাবে একটা tree-তে সাজাতে হয়। পুরো কাজটা এই skill-এর ওপরেই চলে।",
          code: {
            snippet: `mkdir -p .claude/skills/discovery-ost
cat > .claude/skills/discovery-ost/SKILL.md << 'EOF'
---
name: discovery-ost
description: Customer interview থেকে opportunity বের করে একটা Opportunity Solution Tree বানায়। Interview notes দিলে এটা ব্যবহার করুন।
---

# Product Discovery : OST Skill

Teresa Torres-এর Opportunity Solution Tree framework দিয়ে
customer interview-এর data process করুন।

## Framework Reference
- Source: https://www.producttalk.org/opportunity-solution-trees/
- Book: "Continuous Discovery Habits", Teresa Torres

## Key Definitions
- **Outcome**: যে measurable business/product result-এর দিকে আমরা যাচ্ছি
- **Opportunity**: customer-এর একটা need, pain point বা desire (solution না)
- **Solution**: এমন একটা idea যা এক বা একাধিক opportunity address করে
- **Assumption Test**: risky একটা assumption validate করার ছোট experiment

## Process
1. Interview notes থেকে raw quote আর observation বের করুন
2. Opportunity (need, pain, desire) খুঁজুন, কখনো solution না
3. একই ধরনের opportunity মিলিয়ে theme বানান
4. প্রতিটা opportunity-র জন্য 3+ solution brainstorm করুন
5. প্রতিটা promising solution-এর সবচেয়ে risky assumption খুঁজুন
6. সেই assumption test করার জন্য একটা ছোট experiment design করুন

## Opportunity Rules (Critical)
- Opportunity হলো CUSTOMER-এর problem, আমাদের idea না
- "User-রা একটা dashboard চায়" হলো SOLUTION, opportunity না
- "User-রা এক নজরে team-এর progress দেখতে পায় না" হলো opportunity
- যতটা পারেন customer-এর নিজের ভাষা ব্যবহার করুন
- প্রতিটা opportunity-কে target outcome-এর সঙ্গে connect করতে হবে

## Output: Markdown Tree
\`\`\`
🎯 OUTCOME: [target metric]
├── 🔍 Opportunity: [customer need]
│   ├── 💡 Solution: [idea 1]
│   │   └── 🧪 Test: [experiment]
│   ├── 💡 Solution: [idea 2]
│   │   └── 🧪 Test: [experiment]
│   └── 💡 Solution: [idea 3]
├── 🔍 Opportunity: [customer need]
│   ├── 💡 Solution: [idea 1]
│   └── 💡 Solution: [idea 2]
\`\`\`
EOF`,
            language: "bash",
          },
          demo: {
            title: "Discovery skill load হয়েছে",
            steps: [
              { type: "cmd", text: "cat > .claude/skills/discovery-ost/SKILL.md" },
              { type: "success", text: "Created discovery-ost.md", delay: 300 },
              { type: "out", text: "  Framework: Opportunity Solution Trees" },
              {
                type: "out",
                text: "  Process: interviews → opportunities → solutions → tests",
              },
              {
                type: "out",
                text: "  Guard: opportunity আর solution আলাদা রাখে",
              },
              {
                type: "warn",
                text: 'Claude আর "dashboard চায়" কথাটাকে আসল need ভেবে ভুল করবে না।',
              },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "একটা skill লিখে দিন যেটা interview থেকে শুধু opportunity বের করবে, কখনো solution না" },
              { kind: "thinking", verb: "Writing", ms: 800 },
              {
                kind: "tool",
                name: "Write",
                arg: ".claude/skills/discovery-ost/SKILL.md",
                result: "Wrote 17 lines to .claude/skills/discovery-ost/SKILL.md",
                lines: [
                  "---",
                  "name: discovery-ost",
                  "description: Customer interview থেকে opportunity বের করে একটা Opportunity Solution Tree বানায়। Interview notes দিলে এটা ব্যবহার করুন।",
                  "---",
                  "",
                  "# Product Discovery: OST Skill",
                  "",
                  "Teresa Torres-এর Opportunity Solution Tree framework দিয়ে",
                  "interview-এর data process করুন।",
                  "",
                  "## Key Definitions",
                  "- Outcome: যে measurable result-এর দিকে আমরা যাচ্ছি",
                  "- Opportunity: customer-এর need, pain বা desire (solution না)",
                  "- Solution: এমন একটা idea যা কোনো opportunity address করে",
                  "",
                  "## Rules",
                  "- কোনো solution পেলে সেটা তার পেছনের need হিসেবে আবার লিখুন",
                ],
              },
              { kind: "say", text: "Save হয়ে গেছে। কোনো solution opportunity সেজে ঢুকে পড়লে আমি সেটা flag করব আর need হিসেবে আবার লিখব।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: 'এই rule-টা আপনাকে strictly মানতে হবে: interview থেকে শুধু OPPORTUNITY (customer-এর need, pain, desire) বের করবেন, কখনো solution না। কিছু solution-এর মতো লাগলে সেটাকে পেছনের need হিসেবে আবার লিখবেন। যেমন: "dashboard চায়" → "এক নজরে team-এর progress দেখতে পায় না"। পারবেন?',
              },
              {
                role: "claude",
                text: "হ্যাঁ, আর OST-র কাজে এটাই সবচেয়ে জরুরি discipline।\n\nআমি যে rule মানব:\n✓ \"কে blocked আছে, সেটা যদি দেখতে পেতাম\" → Opportunity: teammate-দের status দেখার কোনো উপায় নেই\n✗ \"আমাদের একটা blocker dashboard বানানো উচিত\" → এটা solution। আমি এটা reframe করব বা flag করব।\n\nযখনই কিছু খুঁজে পাব, customer-এর দিক থেকে লিখব, যতটা পারি তাদের নিজের ভাষায়।\n\nInterview-গুলো paste করুন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "`.claude/skills/discovery-ost/SKILL.md` বানান। এই rule-গুলো মানতে হবে: opportunity মানে শুধু customer-এর need (solution না), customer-এর ভাষা ব্যবহার করতে হবে, সবকিছু CLAUDE.md-এর outcome-এর সঙ্গে বাঁধা থাকবে, output হবে 🎯/🔍/💡/🧪 icon-সহ markdown tree।",
              },
              {
                role: "claude",
                text: "পুরো OST process দিয়ে `.claude/skills/discovery-ost/SKILL.md` বানিয়ে দিয়েছি।\n\nসবচেয়ে জরুরি rule-টা skill-এর ভেতরেই আছে: কোনো solution opportunity সেজে এলে আমি সেটা flag করব আর customer-এর আসল need হিসেবে আবার লিখব। এবার interview-এর data দিন।",
              },
            ],
          },
        },
        {
          title: "Raw interview notes দিন",
          description:
            "আসল কাজটা এখানেই হয়। আপনার এলোমেলো, unstructured interview notes paste করুন। Conversation-এর ভেতরে লুকিয়ে থাকা customer-এর need, pain আর desire, মানে opportunity-গুলো Claude বের করে আনবে।",
          code: {
            snippet: `claude "এই interview notes থেকে opportunity বের করুন:

Interview: Sarah, 50 জনের একটা startup-এর PM (২৫ মার্চ)
---
'সোমবার আর মঙ্গলবার আমরা sprint planning-এর জন্য tool-টা use করি, কিন্তু
বুধবার আসতে আসতে সবাই আবার Slack-এ ফিরে যায়। Notification এত বেশি
যে সবাই mute করে রাখে। তারপর আসল update-গুলোই miss করে।
শেষবার দেখার পর থেকে কী কী বদলেছে, শুধু সেটা দেখার একটা উপায় থাকলে ভালো হতো। আর
mobile app-টা প্রায় কোনো কাজেরই না। Phone থেকে কিছু approve করতে পারি না,
তাই desk-এ না যাওয়া পর্যন্ত বসে থাকতে হয়। আমার Berlin-এর team 6 ঘণ্টা
এগিয়ে, তাই আমি যখন ওদের PR approve করি, ততক্ষণে ওদের দিন শেষ।'

Interview: Jake, 200 জনের একটা company-র Eng Lead (২৭ মার্চ)
---
'Weekly view ঠিক আছে, কিন্তু আমার একটা daily standup view লাগে। সকালে
সবার আগে tool-টা check করি, কিন্তু রাতে কী হয়েছে শুধু সেটা দেখার কোনো
উপায় নেই। শেষে Slack-এ সবাইকে জিজ্ঞেস করতেই হয়। আর search একদম বাজে।
পুরনো decision কখনো খুঁজে পাই না। শুধু এর জন্যই আমরা আলাদা একটা wiki use করা শুরু করেছি।'"`,
            language: "bash",
          },
          demo: {
            title: "Interview থেকে opportunity বের করা",
            steps: [
              {
                type: "cmd",
                text: 'claude "এই interview notes থেকে opportunity বের করুন..."',
              },
              {
                type: "out",
                text: "Loading skill: discovery-ost.md",
                delay: 400,
              },
              { type: "out", text: "Processing 2 interviews..." },
              { type: "out", text: "Extracting customer language..." },
              { type: "out", text: "" },
              { type: "success", text: "6টা opportunity পাওয়া গেছে:" },
              { type: "out", text: "" },
              {
                type: "warn",
                text: "1. User-রা notification-এ signal আর noise আলাদা করতে পারে না",
              },
              {
                type: "out",
                text: '   Source: Sarah, "notification এত বেশি যে সবাই mute করে রাখে"',
              },
              {
                type: "warn",
                text: "2. শেষবার দেখার পর থেকে কী বদলেছে, দেখার কোনো উপায় নেই",
              },
              {
                type: "out",
                text: '   Source: Sarah, "শুধু কী কী বদলেছে সেটা দেখার উপায় থাকলে ভালো হতো"',
              },
              { type: "warn", text: "3. Mobile থেকে কোনো action নেওয়া যায় না" },
              {
                type: "out",
                text: '   Source: Sarah, "phone থেকে কিছু approve করতে পারি না"',
              },
              { type: "warn", text: "4. Timezone gap-এর কারণে async team আটকে যায়" },
              {
                type: "warn",
                text: "5. Daily standup-এর জন্য রাতের activity-র কোনো summary নেই",
              },
              { type: "warn", text: "6. পুরনো decision খুঁজে পাওয়া যায় না" },
              { type: "out", text: "" },
              {
                type: "success",
                text: "সবগুলো customer need হিসেবে লেখা, solution হিসেবে না।",
              },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "interviews/sarah.md আর interviews/jake.md থেকে opportunity বের করুন" },
              { kind: "tool", name: "Read", arg: "interviews/sarah.md", result: "Read 18 lines" },
              { kind: "tool", name: "Read", arg: "interviews/jake.md", result: "Read 15 lines" },
              { kind: "thinking", verb: "Extracting", ms: 900 },
              { kind: "say", text: "6টা opportunity, সবগুলো customer need হিসেবে লেখা:\n1. Notification-এ signal আর noise আলাদা করা যায় না (Sarah)\n2. শেষবার দেখার পর থেকে কী বদলেছে, দেখার উপায় নেই (Sarah)\n3. Mobile থেকে action নেওয়া যায় না (Sarah)\n4. Timezone gap-এর কারণে async team আটকে যায় (Sarah)\n5. Daily standup-এর জন্য রাতের কোনো summary নেই (Jake)\n6. পুরনো decision খুঁজে পাওয়া যায় না (Jake)" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এই interview notes থেকে opportunity বের করুন:\n\nSarah, 50 জনের startup-এর PM: \"সোম আর মঙ্গলবার আমরা tool-টা use করি, কিন্তু বুধবারের মধ্যে সবাই আবার Slack-এ। Notification এত বেশি যে সবাই mute করে রাখে। শেষবার দেখার পর থেকে কী বদলেছে, শুধু সেটা যদি দেখতে পেতাম। আর mobile app কোনো কাজের না। Phone থেকে কিছু approve করতে পারি না, তাই desk-এ যাওয়া পর্যন্ত বসে থাকি। আমার Berlin-এর team 6 ঘণ্টা এগিয়ে, তাই ওদের PR approve করতে করতে ওদের দিন শেষ।\"",
              },
              {
                role: "claude",
                text: "Sarah-র interview থেকে বের করছি। 4টা opportunity পাওয়া গেছে:\n\n🔍 **1. Notification-এ signal আর noise আলাদা করা যায় না**\n→ Source: \"notification এত বেশি যে সবাই mute করে রাখে\"\n→ Impact: সপ্তাহের মাঝখানে tool ব্যবহার বন্ধ হয়ে যায়\n\n🔍 **2. শেষবার দেখার পর থেকে কী বদলেছে, সেটা দেখা যায় না**\n→ Source: \"শুধু কী বদলেছে সেটা যদি দেখতে পেতাম\"\n\n🔍 **3. Mobile-এ action নেওয়া যায় না**\n→ Source: \"phone থেকে কিছু approve করতে পারি না\"\n→ Note: এটা mobile-এর একটা limitation হিসেবে লেখা, \"আরও ভালো mobile app বানাও\" হিসেবে না (ওটা solution)\n\n🔍 **4. Approval workflow-এ timezone gap-এর কারণে async team আটকে যায়**\n→ Source: \"Berlin-এর team, approve করতে করতে ওদের দিন শেষ\"\n\nসবগুলো আপনার outcome (weekly active usage)-এর সঙ্গে connect করা। আরও interview নিয়ে এগোবেন?",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "এই দুটো interview notes থেকে OST opportunity বের করুন: [Sarah, PM, notification অনেক বেশি, mute করে রাখে, কী বদলেছে দেখতে পায় না, approval-এর জন্য mobile কোনো কাজের না, Berlin-এর timezone-এর কারণে আটকে যায়] [Jake, Eng Lead, daily standup view লাগে, রাতের কোনো summary নেই, search একদম বাজে, team আলাদা wiki use করে]",
              },
              {
                role: "claude",
                text: "`discovery-ost` skill ব্যবহার করছি। 6টা opportunity বের করেছি:\n\n🔍 Notification-এ signal আর noise আলাদা করা যায় না (Sarah)\n🔍 শেষবার দেখার পর থেকে কী বদলেছে, দেখার উপায় নেই (Sarah)\n🔍 Mobile থেকে action নেওয়া যায় না (Sarah)\n🔍 Timezone gap-এর কারণে async team আটকে যায় (Sarah)\n🔍 Daily standup-এর জন্য রাতের activity-র কোনো summary নেই (Jake)\n🔍 পুরনো decision খুঁজে পাওয়া যায় না (Jake)\n\nসবগুলো customer need হিসেবে লেখা, weekly active usage outcome-এর সঙ্গে বাঁধা। Tree বানানো শুরু করব?",
              },
            ],
          },
        },
        {
          title: "পুরো Opportunity Solution Tree বানান",
          description:
            "এবার Claude-কে পুরো tree বানাতে বলুন: আপনার outcome-কে opportunity-গুলোর সঙ্গে connect করবে, প্রতিটার জন্য solution বের করবে, আর সবচেয়ে risky assumption-গুলো flag করবে। হাতে করলে এই কাজেই ঘণ্টার পর ঘণ্টা লাগে।",
          code: {
            snippet:
              'claude "পুরো OST বানান। প্রতিটা opportunity-র জন্য 3টা solution brainstorm করুন, আর সবচেয়ে promising solution-টার সবচেয়ে risky assumption কোনটা, সেটা বলুন।"',
            language: "bash",
          },
          demo: {
            title: "আপনার Opportunity Solution Tree",
            steps: [
              { type: "cmd", text: 'claude "পুরো OST বানান..."' },
              {
                type: "out",
                text: "Structuring tree from 6 opportunities...",
                delay: 600,
              },
              { type: "out", text: "" },
              {
                type: "success",
                text: "🎯 OUTCOME: Weekly active usage সপ্তাহে 3.2 → 4.5 দিন",
              },
              { type: "out", text: "├── 🔍 Signal আর noise আলাদা করা যায় না" },
              {
                type: "out",
                text: "│   ├── 💡 Smart notification digest (batch করা, priority অনুযায়ী)",
              },
              {
                type: "out",
                text: '│   ├── 💡 প্রতিটা project-এর "What\'s new" changelog',
              },
              {
                type: "out",
                text: "│   └── 💡 রাতের activity-র AI summary",
              },
              {
                type: "out",
                text: "│       └── 🧪 Riskiest: User-রা কি daily digest email পড়বে?",
              },
              { type: "out", text: "├── 🔍 Mobile থেকে action নেওয়া যায় না" },
              {
                type: "out",
                text: "│   ├── 💡 Mobile approval flow (1-tap approve/reject)",
              },
              {
                type: "out",
                text: "│   ├── 💡 Slack থেকে approval (app লাগবে না)",
              },
              { type: "out", text: "│   └── 💡 Email-এ reply দিয়ে approval" },
              {
                type: "out",
                text: "│       └── 🧪 Riskiest: Mobile-এ আসল দরকারি action কি approval-ই?",
              },
              { type: "out", text: "├── 🔍 পুরনো decision খুঁজে পাওয়া যায় না" },
              { type: "out", text: "│   └── (test-সহ 3টা solution...)" },
              { type: "out", text: "" },
              {
                type: "success",
                text: "পুরো tree: 6টা opportunity, 18টা solution, 6টা experiment।",
              },
              { type: "warn", text: "Saved to discovery/ost-2026-03-29.md" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "পুরো OST বানান: প্রতিটা opportunity-তে তিনটা solution, সবচেয়ে ভালোটার riskiest assumption" },
              { kind: "thinking", verb: "Building", ms: 1000 },
              {
                kind: "tool",
                name: "Write",
                arg: "discovery/ost-2026-03-29.md",
                result: "Wrote 64 lines to discovery/ost-2026-03-29.md",
                lines: [
                  "# Outcome: weekly active usage সপ্তাহে 3.2 → 4.5 দিন",
                  "",
                  "├── Signal আর noise আলাদা করা যায় না",
                  "│   ├── Smart notification digest",
                  "│   ├── \"আপনি যাওয়ার পর থেকে নতুন যা\" view",
                  "│   └── প্রতিটা project-এর activity feed",
                  "│       └── Test: user-রা digest খুলবে, নাকি ignore করবে?",
                  "├── Mobile থেকে action নেওয়া যায় না",
                  "│   └── Mobile app-এ 1-tap approval",
                ],
              },
              { kind: "say", text: "6টা opportunity, 18টা solution, 6টা assumption test।\nসবচেয়ে risky: user-রা digest পড়বে, নাকি email newsletter-এর মতো ignore করবে?" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এবার পুরো OST বানান। ছয়টা opportunity-র প্রতিটার জন্য তিনটা solution brainstorm করুন, আর সবচেয়ে promising solution-টার riskiest assumption বলুন।",
              },
              {
                role: "claude",
                text: "🎯 **OUTCOME**: Weekly active usage সপ্তাহে 3.2 → 4.5 দিন\n\n├── 🔍 Signal আর noise আলাদা করা যায় না\n│   ├── 💡 Smart notification digest (priority অনুযায়ী batch করা)\n│   ├── 💡 \"আপনি যাওয়ার পর থেকে নতুন যা\" view\n│   └── 💡 প্রতিটা project-এর activity feed\n│       └── 🧪 Riskiest: User-রা কি আসলেই digest দেখবে, নাকি email newsletter-এর মতো ignore করবে?\n\n├── 🔍 Mobile থেকে action নেওয়া যায় না\n│   ├── 💡 Mobile app-এ 1-tap approval\n│   ├── 💡 Slack থেকে approval (app লাগবে না)\n│   └── 💡 Email-এ reply দিয়ে approval\n│       └── 🧪 Riskiest: Mobile-এ approval-ই কি #1 action, নাকি শুধু সবচেয়ে বেশি চোখে পড়া complaint?\n\n├── 🔍 Timezone gap-এর কারণে async team আটকে যায়\n│   ├── 💡 Deadline আর auto-escalation-সহ async approval\n│   ├── 💡 দিনের শুরুতে \"আপনার approval-এর অপেক্ষায়\" Slack reminder\n│   └── 💡 Delegation: অনুপস্থিত teammate-এর হয়ে approve করা\n\n(solution-সহ আরও 3টা opportunity...)\n\n**পুরো tree: 6টা opportunity, 18টা solution, 6টা assumption test।**",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "যে ছয়টা opportunity বের করেছি, সেগুলো থেকে পুরো OST বানান। প্রতিটা opportunity-তে তিনটা solution, আর প্রতিটার সবচেয়ে promising solution-এর riskiest assumption।",
              },
              {
                role: "claude",
                text: "পুরো OST বানাচ্ছি...\n\n`discovery/ost-2026-03-29.md`-এ save করেছি\n\n6টা opportunity → 18টা solution → 6টা assumption test\n\nসবচেয়ে risky assumption-গুলো flag করেছি:\n1. User-রা কি notification digest পড়বে, নাকি ignore করবে?\n2. Mobile approval কি আসল দরকারি action, নাকি শুধু সবচেয়ে জোরালো complaint?\n3. Search ভালো হলে কি user-রা পুরনো decision খুঁজবে, নাকি wiki-তেই অভ্যস্ত হয়ে গেছে?\n\nপুরো tree দেখতে file-টা খুলুন। Assumption test design করা শুরু করব?",
              },
            ],
          },
        },
        {
          title: "আপনার সেরা solution-গুলোর জন্য assumption test বানান",
          description:
            'যে solution-গুলো নিয়ে আপনি সবচেয়ে excited, সেগুলো বেছে নিন, আর Claude-কে দিয়ে হালকা experiment design করিয়ে নিন। Teresa Torres এগুলোকে বলেন "assumption tests": কিছু বানানোর আগে risk কমানোর জন্য ছোট, দ্রুত experiment।',
          code: {
            snippet: `claude "এই দুটো solution-এর জন্য assumption test design করুন:
1. Smart notification digest (batch করা, priority অনুযায়ী)
2. Mobile approval flow (1-tap approve/reject)

প্রতিটার জন্য আমাকে দিন:
- সবচেয়ে risky assumption
- এই সপ্তাহেই চালাতে পারি এমন একটা test
- 'Success' দেখতে কেমন হবে (একটা number-সহ)
- আনুমানিক effort"`,
            language: "bash",
          },
          demo: {
            title: "Experiment design হয়ে গেছে",
            steps: [
              { type: "cmd", text: 'claude "Assumption test design করুন..."' },
              {
                type: "out",
                text: "Analyzing riskiest assumptions...",
                delay: 500,
              },
              { type: "out", text: "" },
              { type: "warn", text: "## Test 1: Smart Notification Digest" },
              {
                type: "out",
                text: "Assumption: User-রা daily digest email খুলবে",
              },
              {
                type: "out",
                text: "Test: 5 দিন ধরে 50 জন user-কে হাতে বানানো digest email পাঠান",
              },
              {
                type: "out",
                text: "Success: >40% open rate, tool-এ ফেরার click-through >15%",
              },
              {
                type: "out",
                text: "Effort: 2 ঘণ্টা (Mailchimp দিয়ে manual email)",
              },
              { type: "out", text: "" },
              { type: "warn", text: "## Test 2: Mobile Approval Flow" },
              {
                type: "out",
                text: "Assumption: Mobile-এ সবচেয়ে দরকারি action হলো approval",
              },
              {
                type: "out",
                text: 'Test: 20 জন user-কে জিজ্ঞেস করুন, "Mobile-এ কী করতে পারলে ভালো হতো?"',
              },
              { type: "out", text: "Success: >50% নিজে থেকেই approval-এর কথা বলে" },
              {
                type: "out",
                text: "Effort: 1 ঘণ্টা (পরের 20টা interview-এ প্রশ্নটা add করুন)",
              },
              { type: "out", text: "" },
              {
                type: "success",
                text: "দুটো test-ই এই সপ্তাহে চালানো যায়। মোট effort: 3 ঘণ্টা।",
              },
              { type: "warn", text: "আগে experiment ship করুন, feature পরে।" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "notification digest আর mobile approval-এর জন্য এই সপ্তাহে চালানো যায় এমন test design করুন" },
              { kind: "thinking", verb: "Designing", ms: 900 },
              {
                kind: "tool",
                name: "Write",
                arg: "discovery/assumption-tests.md",
                result: "Wrote 24 lines to discovery/assumption-tests.md",
                lines: [
                  "## Test 1: Smart notification digest",
                  "Assumption: user-রা digest ignore না করে খুলবে",
                  "Test: 5 দিন ধরে 50 জন user-এর জন্য হাতে বাছাই করা daily digest email",
                  "Success: >40% open rate আর tool-এ ফেরার click >15%",
                  "",
                  "## Test 2: Mobile approval flow",
                  "Assumption: mobile-এ মানুষের সবচেয়ে বেশি দরকার approval",
                  "Test: 20টা interview-এ একটা open-ended প্রশ্ন add করা",
                  "Success: >50% নিজে থেকেই approval-এর কথা বলে",
                ],
              },
              { kind: "say", text: "দুটোই এই সপ্তাহে চালানো যায়, কোনো engineering লাগবে না, মোট প্রায় 3 ঘণ্টা।\nআগে experiment ship করুন, feature পরে।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Smart notification digest আর mobile approval flow-এর জন্য assumption test design করুন। প্রতিটার জন্য: riskiest assumption, এই সপ্তাহেই চালাতে পারি এমন test, number-সহ success criteria, আর আনুমানিক effort।",
              },
              {
                role: "claude",
                text: "**Test 1: Smart Notification Digest**\n\n*Riskiest assumption*: User-রা marketing email-এর মতো ignore না করে আসলেই digest খুলবে\n\n*Test*: 5 দিন ধরে 50 জন active user-এর জন্য হাতে বাছাই করে একটা daily digest email পাঠান। Tool-এর domain থেকে না, আপনার personal email থেকে পাঠান।\n\n*Success*: >40% open rate এবং tool-এ ফেরার click >15%\n\n*Effort*: মোট 2 ঘণ্টা (1 ঘণ্টা setup, দিনে 20 মিনিট বাছাই)\n\n---\n\n**Test 2: Mobile Approval Flow**\n\n*Riskiest assumption*: Mobile-এ মানুষ আসলেই সবচেয়ে বেশি approval করতে চায়, এটা শুধু সবচেয়ে বেশি চোখে পড়া complaint না\n\n*Test*: পরের 20টা user interview-এ একটা প্রশ্ন add করুন: \"এখন phone থেকে পারেন না এমন একটা কাজ যদি করতে পারতেন, সেটা কী হতো?\" Approval-এর কথা নিজে থেকে তুলবেন না।\n\n*Success*: >50% নিজে থেকেই approval বা কোনো action নেওয়ার কথা বলে\n\n*Effort*: 1 ঘণ্টা (প্রশ্নটা লেখা, interview schedule করা)\n\nদুটোই এই সপ্তাহে চালানো যায়, কোনো engineering লাগবে না।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Notification digest আর mobile approval solution-এর জন্য assumption test design করুন। Riskiest assumption, এই সপ্তাহের test, success metric, effort estimate।",
              },
              {
                role: "claude",
                text: "Test design `discovery/assumption-tests.md`-এ save করেছি:\n\n**Digest**: 5 দিন ধরে 50 জন user-কে manual email → >40% open আর >15% click-through হলে success\n**Mobile approval**: 20টা interview-এ open-ended প্রশ্ন → >50% নিজে থেকে approval-এর কথা বললে success\n\nদুটোই এই সপ্তাহে চালানো যায়, কোনো engineering লাগবে না। মোট effort: প্রায় 3 ঘণ্টা।",
              },
            ],
          },
        },
        {
          title: "আপনার tree নিয়মিত update রাখুন",
          description:
            "OST একবার বানিয়ে ফেলে রাখার জিনিস না। আপনি যত শিখবেন, প্রতি সপ্তাহে এটা বদলাবে। এটা একটা file-এ save করুন, আর প্রতিটা interview-এর পর update করুন। Claude context ধরে রাখে, আর file-এ যা আছে তার ওপরেই build করে।",
          code: {
            snippet: `# পরের round-এর interview-এর পর:
claude "discovery/ost-2026-03-29.md-এর OST এই নতুন finding দিয়ে update করুন:

Interview: Maria, 30 জনের একটা agency-র Designer (১ এপ্রিল)
---
'Notification আমার আসলে ভালোই লাগে, কিন্তু সবগুলো দেখতে একই রকম।
কোনটা urgent আর কোনটা শুধু একটা comment, বুঝতে পারি না। Color
coding বা priority level থাকলে সুবিধা হতো। আর খেয়াল করলাম, কেউ
@mention করলেই শুধু app খুলি, নাহলে এটার কথা মনেই থাকে না।'"`,
            language: "bash",
          },
          demo: {
            title: "সব সময় update থাকা discovery tree",
            steps: [
              {
                type: "cmd",
                text: 'claude "নতুন finding দিয়ে OST update করুন..."',
              },
              {
                type: "out",
                text: "Reading existing tree (6 opportunities, 18 solutions)...",
                delay: 400,
              },
              {
                type: "out",
                text: "Processing new interview (Maria, Designer)...",
              },
              { type: "out", text: "" },
              {
                type: "success",
                text: 'Updated: "Signal আর noise আলাদা করা যায় না"',
              },
              {
                type: "out",
                text: '  নতুন evidence: "সবগুলো দেখতে একই রকম, কোনটা urgent বুঝতে পারি না"',
              },
              {
                type: "out",
                text: "  নতুন solution: Priority অনুযায়ী notification styling",
              },
              { type: "out", text: "" },
              { type: "warn", text: "নতুন opportunity পাওয়া গেছে:" },
              {
                type: "out",
                text: '  🔍 "@mention ছাড়া tool-এ ফিরে আসার কোনো trigger নেই"',
              },
              {
                type: "out",
                text: '  Source: Maria, "কেউ @mention করলেই শুধু app খুলি"',
              },
              { type: "out", text: "" },
              {
                type: "success",
                text: "Tree update হয়েছে: 7টা opportunity, 21টা solution।",
              },
              {
                type: "warn",
                text: "প্রতিটা interview-এর পর আপনার OST আরও পরিষ্কার হয়।",
              },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "interviews/maria.md দিয়ে OST update করুন" },
              { kind: "tool", name: "Read", arg: "interviews/maria.md", result: "Read 9 lines" },
              {
                kind: "tool",
                name: "Update",
                arg: "discovery/ost-2026-03-29.md",
                result: "Updated discovery/ost-2026-03-29.md with 4 additions",
                lines: [
                  "│   ├── Priority অনুযায়ী notification styling",
                  "│   │   └── Evidence: \"সবগুলো দেখতে একই রকম\" (Maria)",
                  "├── @mention ছাড়া ফিরে আসার কোনো trigger নেই",
                  "│   └── Source: \"কেউ @mention করলেই শুধু app খুলি\" (Maria)",
                ],
              },
              { kind: "say", text: "Maria-র evidence দিয়ে \"signal আর noise আলাদা করা যায় না\" আরও জোরালো হলো।\nনতুন opportunity: @mention ছাড়া ফিরে আসার কোনো trigger নেই।\nTree-তে এখন 7টা opportunity আর 21টা solution।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: 'নতুন interview: Maria, 30 জনের একটা agency-র Designer। "Notification আমার আসলে ভালোই লাগে, কিন্তু সবগুলো দেখতে একই রকম। কোনটা urgent আর কোনটা শুধু comment, বুঝতে পারি না। Color coding থাকলে সুবিধা হতো। আর কেউ @mention করলেই শুধু app খুলি, নাহলে এটার কথা মনেই থাকে না।"',
              },
              {
                role: "claude",
                text: 'Maria-র interview দিয়ে OST update করছি:\n\n✅ **Updated**: "Signal আর noise আলাদা করা যায় না"\nনতুন evidence: "সবগুলো দেখতে একই রকম, কোনটা urgent বুঝতে পারি না"\nনতুন solution add করেছি: Urgency অনুযায়ী visual styling (color/icon দিয়ে আলাদা করা)\n\n🆕 **নতুন opportunity পাওয়া গেছে**: "সরাসরি @mention ছাড়া tool-এ ফিরে আসার কোনো trigger নেই"\nSource: Maria, "কেউ @mention করলেই শুধু app খুলি"\nএটা notification বেশি হওয়ার সমস্যা থেকে আলাদা। এখানে user-কে tool-এ ফিরিয়ে আনার মতো কিছুই নেই।\n\nTree update হয়েছে: **7টা opportunity, 21টা solution।**\n\nContinuous discovery ঠিক এভাবেই কাজ করে। প্রতিটা interview হয় আগের opportunity-কে আরও জোরালো করে, নয়তো নতুন opportunity সামনে আনে।',
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "নতুন একটা interview দিয়ে OST update করুন: Maria, Designer : সব notification দেখতে একই রকম, urgent আর comment আলাদা করতে পারে না, শুধু @mention হলে app খোলে।",
              },
              {
                role: "claude",
                text: '`discovery/ost-2026-03-29.md` update করেছি:\n\n✅ জোরালো হলো: "Signal আর noise আলাদা করা যায় না।" Maria-র evidence add করেছি।\n✅ নতুন solution: Priority অনুযায়ী notification styling\n🆕 নতুন opportunity: "সরাসরি @mention ছাড়া ফিরে আসার কোনো trigger নেই"\n\nTree: 7টা opportunity, 21টা solution। File save হয়েছে।',
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "Teresa Torres-এর continuous discovery সম্পর্কে জানুন",
        href: "https://www.producttalk.org/opportunity-solution-trees/",
      },
    },
  },
};
