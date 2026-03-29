export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-most-people-use-claude-code-wrong",
    title: "Why Most People Use Claude Code Wrong",
    description: "You installed Claude Code, typed a prompt, got a mid answer, and walked away. Here's what you missed.",
    date: "2026-03-01",
    author: "Shadman Rahman",
    tags: ["claude-code", "tutorial", "productivity"],
    content: `<p>Most people install Claude Code, type a question, get a mediocre answer, and walk away thinking "AI isn't that useful yet."</p>
<p>But the problem isn't Claude Code. It's that they skipped the one file that makes it actually work.</p>

<h2>The CLAUDE.md Gap</h2>
<p>Without a <code>CLAUDE.md</code> file, every session starts blind. Claude Code doesn't know your stack, your coding style, or your preferences. It's guessing. And guessing produces mid results.</p>
<p>With CLAUDE.md, the same prompt produces dramatically different output. Your stack, your conventions, your communication preferences — all loaded before you even type.</p>

<h2>The 5-Minute Fix</h2>
<ol>
<li>Run <code>claude /init</code> in your project root</li>
<li>It generates a basic CLAUDE.md from your codebase</li>
<li>Add your communication preferences ("be direct, no fluff")</li>
<li>Add your session lifecycle ("read memory at start, write handoff at end")</li>
</ol>
<p>That's it. Four steps. Under 5 minutes. The improvement is immediate and honestly kind of wild.</p>

<h2>What Changes</h2>
<table>
<thead><tr><th>Before</th><th>After</th></tr></thead>
<tbody>
<tr><td><code>.jsx</code> files in a TypeScript project</td><td><code>.tsx</code> every time</td></tr>
<tr><td>Inline styles when you use Tailwind</td><td>Tailwind classes automatically</td></tr>
<tr><td>Verbose explanations</td><td>Direct answers matching your style</td></tr>
<tr><td>Every session starts cold</td><td>Memory + handoffs = zero re-explanation</td></tr>
</tbody>
</table>

<h2>The Compound Effect</h2>
<p>The real magic isn't day one. It's week three.</p>
<p>By then, Claude Code has accumulated your corrections, your preferences, and your project context. It stops making the mistakes you've already fixed. Sessions start faster. The gap between "using Claude Code" and "having Claude Code as an operating system" gets wider every day.</p>

<h2>Start Here</h2>
<p>Read the full <a href="/docs/foundations/claude-md">CLAUDE.md Guide</a> for the five-layer architecture. Or jump straight to the <a href="/guide">Interactive Setup Guide</a> and follow the 9 steps.</p>
<p>Either way, don't use Claude Code without a CLAUDE.md. The difference is night and day.</p>`,
  },
  {
    slug: "claude-md-is-not-optional",
    title: "CLAUDE.md Is Not Optional",
    description: "Skipping CLAUDE.md is like hiring a developer and never telling them about the project. Stop doing it.",
    date: "2026-03-02",
    author: "Shadman Rahman",
    tags: ["claude-code", "claude-md", "tutorial"],
    content: `<p>Here's a hot take: if you're using Claude Code without a CLAUDE.md file, you're not really using Claude Code. You're using a fancy autocomplete with a terminal UI.</p>

<h2>What CLAUDE.md Actually Does</h2>
<p>Think of it as the onboarding doc for your AI pair programmer. It tells Claude Code:</p>
<ul>
<li>What stack you're using (so it stops suggesting Express when you use Hono)</li>
<li>Your coding conventions (tabs vs spaces, naming patterns, file structure)</li>
<li>How you want responses formatted (direct, no fluff, code-first)</li>
<li>What to read at session start and what to write at session end</li>
</ul>
<p>Without this file, Claude Code starts every single session from zero. No memory. No preferences. No context. Every. Single. Time.</p>

<h2>The Five Layers</h2>
<p>CLAUDE.md isn't just one file. It's a <a href="/docs/foundations/claude-md">five-layer architecture</a>:</p>
<ol>
<li><strong>Enterprise</strong> — org-wide rules everyone follows</li>
<li><strong>Project root</strong> — your repo's CLAUDE.md</li>
<li><strong>Feature-scoped</strong> — nested CLAUDE.md in subdirectories</li>
<li><strong>User-level</strong> — your personal ~/.claude/CLAUDE.md</li>
<li><strong>Session-level</strong> — memory and handoffs that persist</li>
</ol>

<h2>The One-Minute Version</h2>
<p>If you do nothing else today, run <code>claude /init</code> in your project. It auto-generates a starter CLAUDE.md by scanning your codebase. Then spend 60 seconds adding your preferences.</p>
<p>That single file is the difference between "Claude Code is meh" and "Claude Code is my operating system."</p>
<p>Not optional. Foundational.</p>`,
  },
  {
    slug: "the-cold-start-problem",
    title: "The Cold Start Problem and How to Fix It",
    description: "Every Claude Code session starts from zero unless you set up the session lifecycle. Here's the 3-step fix.",
    date: "2026-03-03",
    author: "Shadman Rahman",
    tags: ["claude-code", "tutorial", "productivity", "session-lifecycle"],
    content: `<p>You open Claude Code. You explain your project. You remind it about the bug you were fixing yesterday. You re-paste the error message. You describe the file structure. Again.</p>
<p>Sound familiar? That's the cold start problem. And it's eating 10-15 minutes of every session.</p>

<h2>Why It Happens</h2>
<p>Claude Code doesn't have persistent memory by default. Each session is a blank slate. The model doesn't remember yesterday's conversation, your preferences, or where you left off.</p>
<p>But here's the thing — it <em>can</em> remember. You just have to set it up.</p>

<h2>The 3-Step Fix</h2>
<p><strong>Step 1: Memory files.</strong> Create a <code>memory/</code> directory. At the end of each session, Claude writes what it learned. At the start of the next session, it reads those files. Zero re-explanation needed.</p>
<p><strong>Step 2: Handoffs.</strong> When you finish a work block, write a <a href="/docs/foundations/memory-system">handoff document</a> — what was done, what's next, what's blocked. Next session picks up exactly where you left off.</p>
<p><strong>Step 3: Session lifecycle in CLAUDE.md.</strong> Add instructions to your <a href="/docs/foundations/claude-md">CLAUDE.md</a>: "At session start, read memory/. At session end, write a handoff." Now it happens automatically.</p>

<h2>The Result</h2>
<p>Sessions that used to start with 10 minutes of context-setting now start with "continue from the handoff." That's it. One line. Full context restored.</p>
<p>The <a href="/docs/foundations/session-lifecycle">session lifecycle</a> isn't a nice-to-have. It's the difference between using Claude Code as a stateless tool and using it as a continuous collaborator.</p>
<p>Fix the cold start. Everything else gets easier.</p>`,
  },
  {
    slug: "claude-code-vs-chatgpt",
    title: "Claude Code vs ChatGPT: They're Not the Same Thing",
    description: "Stop treating Claude Code like a chatbot. It's a CLI-native development environment. Here's why that matters.",
    date: "2026-03-04",
    author: "Shadman Rahman",
    tags: ["claude-code", "comparison", "chatgpt"],
    content: `<p>Every week someone asks me: "Is Claude Code just ChatGPT in a terminal?" No. And treating it that way is exactly why you're not getting results.</p>

<h2>The Core Difference</h2>
<p>ChatGPT is a conversation. Claude Code is a <strong>development environment</strong>.</p>
<p>ChatGPT lives in a browser tab. It can't read your files, run your tests, or edit your code. You copy-paste snippets back and forth like it's 2019.</p>
<p>Claude Code lives in your terminal. It reads your entire codebase. It edits files directly. It runs commands. It sees your git history. It's not chatting with you — it's working alongside you.</p>

<h2>What This Means in Practice</h2>
<ul>
<li><strong>Context:</strong> ChatGPT knows what you paste. Claude Code knows your whole project.</li>
<li><strong>Actions:</strong> ChatGPT suggests code. Claude Code writes, tests, and commits it.</li>
<li><strong>Memory:</strong> ChatGPT remembers within a chat. Claude Code has <a href="/docs/foundations/memory-system">structured memory</a> across sessions.</li>
<li><strong>Workflow:</strong> ChatGPT is ask-and-receive. Claude Code is plan-execute-verify.</li>
</ul>

<h2>When to Use What</h2>
<p>Use ChatGPT for brainstorming, explaining concepts, and quick questions. Use Claude Code for building features, debugging, refactoring, and anything that touches your actual codebase.</p>
<p>They're complementary, not competitors. But if you're using Claude Code like a chatbot, you're using maybe 10% of what it can do.</p>
<p>Check out the full <a href="/docs/comparisons">comparison guides</a> if you want the detailed breakdown. But the TL;DR is simple: Claude Code is a tool that <em>does</em> things. Treat it that way.</p>`,
  },
  {
    slug: "your-first-hour-with-claude-code",
    title: "Your First Hour with Claude Code: A Realistic Timeline",
    description: "What actually happens in your first 60 minutes. No hype, no fluff — just a realistic walkthrough.",
    date: "2026-03-05",
    author: "Shadman Rahman",
    tags: ["claude-code", "tutorial", "getting-started"],
    content: `<p>Most tutorials show you the highlight reel. Here's what your first hour with Claude Code actually looks like.</p>

<h2>Minutes 0-5: Installation</h2>
<p>Run <code>npm install -g @anthropic-ai/claude-code</code>. Set your API key. Type <code>claude</code> in your terminal. You're in. This part is genuinely fast.</p>
<p>Full <a href="/docs/foundations/installation">installation guide here</a> if you hit snags.</p>

<h2>Minutes 5-15: The "Whoa" Phase</h2>
<p>You ask it to explain a file. It reads the whole thing and gives you a breakdown. You ask it to fix a bug. It reads the file, finds the issue, and edits it in place. You feel powerful.</p>

<h2>Minutes 15-25: The "Wait" Phase</h2>
<p>You ask something more complex. The answer is... okay. Not great. It suggests a pattern you don't use. It creates a file in the wrong directory. The magic fades slightly.</p>

<h2>Minutes 25-35: The Setup Phase</h2>
<p>This is where most people quit. Don't. Instead, run <code>claude /init</code> and set up your <a href="/docs/foundations/claude-md">CLAUDE.md</a>. Add your stack, conventions, and preferences. This is the investment that pays off.</p>

<h2>Minutes 35-50: The "Oh, NOW I Get It" Phase</h2>
<p>You ask the same complex question again. This time, with CLAUDE.md loaded, the answer matches your stack, your style, your conventions. The difference is jarring.</p>

<h2>Minutes 50-60: Building Momentum</h2>
<p>You start using <a href="/docs/foundations/plan-mode">Plan Mode</a> for bigger tasks. You set up a memory file. You write your first handoff. You realize this isn't a chatbot — it's a workflow.</p>
<p>The first hour is a rollercoaster. Push through the "wait" phase. Everything after minute 35 is where it clicks.</p>`,
  },
  {
    slug: "3-prompts-that-changed-everything",
    title: "The 3 Prompts That Changed How I Use Claude Code",
    description: "Specific, copy-paste-ready prompts that immediately level up your Claude Code workflow.",
    date: "2026-03-06",
    author: "Shadman Rahman",
    tags: ["claude-code", "prompting", "tips", "productivity"],
    content: `<p>I've sent thousands of prompts to Claude Code. These three changed my entire workflow.</p>

<h2>Prompt 1: The Context Dump</h2>
<p><code>"Read the CLAUDE.md, then read the last 3 files I modified (check git status). Summarize what I was working on and suggest what to do next."</code></p>
<p>This replaces 10 minutes of "where was I?" with 30 seconds of automatic context recovery. Use it at the start of every session.</p>

<h2>Prompt 2: The Plan-First Pattern</h2>
<p><code>"Before writing any code, create a plan. List the files you'll modify, what changes you'll make to each, and what could go wrong. Wait for my approval."</code></p>
<p>This is <a href="/docs/foundations/plan-mode">Plan Mode</a> in spirit, even if you don't use the formal toggle. It prevents Claude from charging ahead and making changes you'll spend 20 minutes undoing.</p>

<h2>Prompt 3: The Handoff Writer</h2>
<p><code>"Write a handoff document. Include: what was accomplished, what's in progress, what's blocked, and the exact next step for the next session."</code></p>
<p>This prompt, used at session end, is worth its weight in gold. It creates the <a href="/docs/foundations/memory-system">memory artifact</a> that makes tomorrow's session start instantly.</p>

<h2>Why These Work</h2>
<p>Notice the pattern? None of these prompts ask Claude to be clever. They ask it to be <strong>structured</strong>. Context in, plan first, handoff out. That's the entire <a href="/docs/foundations/session-lifecycle">session lifecycle</a> in three prompts.</p>
<p>Good <a href="/docs/foundations/prompting">prompting</a> isn't about magic words. It's about giving Claude Code the right structure to work within.</p>`,
  },
  {
    slug: "context-beats-cleverness",
    title: "Why Context Beats Cleverness Every Time",
    description: "Stop trying to write the perfect prompt. Start giving Claude Code the right context instead.",
    date: "2026-03-07",
    author: "Shadman Rahman",
    tags: ["claude-code", "claude-md", "prompting", "productivity"],
    content: `<p>There's a whole cottage industry around "prompt engineering." People sharing 200-word prompts with precise instructions, chain-of-thought triggers, and role-playing setups.</p>
<p>Here's the truth: a mediocre prompt with great context beats a perfect prompt with no context. Every single time.</p>

<h2>The Experiment</h2>
<p>I tested this. Same task — "add a dark mode toggle to the settings page." Two approaches:</p>
<p><strong>Approach A:</strong> Elaborate prompt. "You are a senior React developer. Think step by step. Consider accessibility. Use best practices..." No CLAUDE.md.</p>
<p><strong>Approach B:</strong> Simple prompt. "Add a dark mode toggle to the settings page." Full <a href="/docs/foundations/claude-md">CLAUDE.md</a> with stack info, conventions, and file structure.</p>
<p>Approach B won. By a lot. It used the right components, the right styling system, and put the file in the right place. Approach A produced technically correct code that didn't match the project at all.</p>

<h2>Why Context Wins</h2>
<p>Clever prompts tell Claude <em>how to think</em>. Context tells Claude <em>what to work with</em>. The model is already good at thinking. What it lacks is information about YOUR project.</p>
<ul>
<li>Your file structure (so it puts things in the right place)</li>
<li>Your component library (so it uses your existing components)</li>
<li>Your conventions (so the code looks like your code)</li>
<li>Your recent changes (so it understands current state)</li>
</ul>

<h2>The Takeaway</h2>
<p>Spend your time on <a href="/docs/foundations/claude-md">CLAUDE.md</a> and <a href="/docs/foundations/memory-system">memory</a>, not on crafting the perfect prompt. Context is the multiplier. Cleverness is the rounding error.</p>`,
  },
  {
    slug: "sub-agents-the-feature-nobody-uses",
    title: "Sub-Agents: The Feature Nobody Uses (But Should)",
    description: "Claude Code can delegate tasks to specialized sub-agents. Most people don't know this exists.",
    date: "2026-03-08",
    author: "Shadman Rahman",
    tags: ["claude-code", "agents", "advanced", "productivity"],
    content: `<p>Quick poll: do you know Claude Code can spawn sub-agents? Agents that run in parallel, each focused on a specific task, reporting back to a main orchestrator?</p>
<p>If not, you're in the majority. And you're leaving serious productivity on the table.</p>

<h2>What Are Sub-Agents?</h2>
<p>A <a href="/docs/patterns/agents">sub-agent</a> is a focused Claude Code instance that handles one specific job. Think of them as specialists you delegate to:</p>
<ul>
<li>A code reviewer that checks your changes</li>
<li>A test writer that generates test cases</li>
<li>A security scanner that audits for vulnerabilities</li>
<li>A documentation writer that updates docs</li>
</ul>
<p>You define them in agent files, give them specific instructions, and let them run.</p>

<h2>The Delegation Pattern</h2>
<p>Here's the workflow that changed my game:</p>
<ol>
<li>Write the feature code yourself (or with Claude's help)</li>
<li>Kick off 3 sub-agents in parallel: code review, test generation, docs update</li>
<li>Each agent focuses on its specialty and writes output</li>
<li>You review the combined results</li>
</ol>
<p>What used to take 45 minutes of switching between tasks now takes 10 minutes of parallel execution.</p>

<h2>Getting Started</h2>
<p>Start simple. Create one agent file for code review. Put it in <code>.claude/agents/code-reviewer.md</code>. Give it clear instructions about what to check. Use it after every feature.</p>
<p>Then expand. Add a test writer. A security checker. A refactoring assistant. Each agent compounds the value of the others.</p>
<p>Read the full <a href="/docs/patterns/agents">agents guide</a> to set up your first sub-agent in under 5 minutes.</p>`,
  },
  {
    slug: "pm-shipped-feature-without-code",
    title: "How a PM Shipped a Feature Without Writing Code",
    description: "A product manager used Claude Code to go from requirements to deployed feature. No engineering handoff needed.",
    date: "2026-03-10",
    author: "Shadman Rahman",
    tags: ["claude-code", "pm", "productivity", "story"],
    content: `<p>I'm a product manager. I don't write production code. But last week, I shipped a feature to production using Claude Code. No engineering handoff. No ticket. No sprint planning.</p>

<h2>The Context</h2>
<p>Our docs site needed a cost calculator. Engineers were busy with the main product. The feature sat in the backlog for three weeks. I got impatient.</p>

<h2>What I Did</h2>
<p>I opened Claude Code, loaded the project, and described what I wanted: "Build an interactive cost calculator that compares Pro, Max, and API plans. Use the existing component library. Put it on the /pricing page."</p>
<p>Then I let Claude Code work. It read the codebase, understood the component system, built the calculator, styled it to match, and created the page.</p>

<h2>The PM Workflow</h2>
<p>Here's the thing — I wasn't "coding." I was doing what PMs do:</p>
<ul>
<li><strong>Defining requirements</strong> — telling Claude Code what the feature should do</li>
<li><strong>Reviewing output</strong> — checking if the result matched my vision</li>
<li><strong>Iterating</strong> — "make the comparison table wider" / "add a monthly toggle"</li>
<li><strong>Testing</strong> — clicking through the feature to verify it works</li>
</ul>
<p>The full <a href="/docs/workflows/pm-workflow">PM workflow guide</a> breaks this down in detail.</p>

<h2>The Point</h2>
<p>Claude Code isn't just for engineers. It's for anyone who can clearly describe what they want built. Requirements are the input. Working features are the output.</p>
<p>If you're a PM sitting on a backlog of "nice to haves" that never get prioritized, you now have a new option. Build it yourself. Claude Code makes that possible.</p>`,
  },
  {
    slug: "memory-system-that-compounds",
    title: "The Memory System That Makes Sessions Compound",
    description: "How to set up structured memory so every Claude Code session builds on the last one.",
    date: "2026-03-11",
    author: "Shadman Rahman",
    tags: ["claude-code", "memory", "tutorial", "productivity"],
    content: `<p>Session 1: you explain everything. Session 2: you explain everything again. Session 3: you explain everything again. See the pattern?</p>
<p>Without memory, Claude Code has amnesia. With memory, sessions compound. Each one starts where the last one ended.</p>

<h2>The Memory Architecture</h2>
<p>The <a href="/docs/foundations/memory-system">memory system</a> has three layers:</p>
<p><strong>Layer 1: CLAUDE.md</strong> — Static context. Your stack, conventions, preferences. Doesn't change session to session.</p>
<p><strong>Layer 2: Memory files</strong> — Accumulated knowledge. What Claude learned about your project, your corrections, your patterns. Grows over time.</p>
<p><strong>Layer 3: Handoffs</strong> — Session-specific state. What was done, what's next, what's blocked. Written at session end, read at session start.</p>

<h2>Setting It Up</h2>
<ol>
<li>Add to your CLAUDE.md: "At session start, read memory/ directory. At session end, write to memory/ with today's date."</li>
<li>Create a <code>memory/</code> directory in your project</li>
<li>At the end of your first session, ask Claude to write a memory file</li>
<li>At the start of your next session, it reads that file automatically</li>
</ol>

<h2>What Compounds</h2>
<p>After a week, Claude knows your naming conventions without being told. After two weeks, it knows which files relate to which features. After a month, it anticipates what you need.</p>
<p>This is the unlock. Not smarter prompts. Not better models. Just <strong>persistent context</strong> that accumulates.</p>
<p>The <a href="/docs/foundations/session-lifecycle">session lifecycle</a> makes this automatic. Set it up once, benefit forever.</p>`,
  },
  {
    slug: "hooks-set-it-up-once",
    title: "Hooks: Set It Up Once, Never Think About It Again",
    description: "Hooks run automatically before or after Claude Code actions. Automate formatting, linting, and validation.",
    date: "2026-03-12",
    author: "Shadman Rahman",
    tags: ["claude-code", "hooks", "automation", "tutorial"],
    content: `<p>What if every file Claude Code creates was automatically formatted? What if every commit message was automatically validated? What if dangerous commands were automatically blocked?</p>
<p>That's hooks. And once you set them up, you never think about them again.</p>

<h2>What Are Hooks?</h2>
<p><a href="/docs/patterns/hooks">Hooks</a> are scripts that run automatically at specific points in Claude Code's execution:</p>
<ul>
<li><strong>PreToolUse</strong> — runs before Claude uses a tool (write file, run command)</li>
<li><strong>PostToolUse</strong> — runs after a tool completes (auto-format, validate)</li>
<li><strong>Stop</strong> — runs when a session ends (final checks, cleanup)</li>
</ul>

<h2>Three Hooks Everyone Should Have</h2>
<p><strong>1. Auto-format on write.</strong> Every time Claude writes a file, run your formatter (Prettier, Black, gofmt). No more "can you format that?" messages.</p>
<p><strong>2. Lint on write.</strong> Every file gets linted automatically. Catch issues before you even review the output.</p>
<p><strong>3. Dangerous command blocker.</strong> Prevent <code>rm -rf</code>, <code>git push --force</code>, and other commands you never want Claude to run unsupervised.</p>

<h2>How to Set Them Up</h2>
<p>Hooks go in your <code>.claude/settings.json</code>. Each hook specifies when it runs and what command to execute. The setup takes 5 minutes.</p>
<p>Once configured, hooks are invisible. They just work. You stop worrying about formatting, linting, and safety because the system handles it.</p>
<p>That's the philosophy: automate the repetitive, focus on the creative. Read the full <a href="/docs/patterns/hooks">hooks guide</a> to get started.</p>`,
  },
  {
    slug: "claude-code-cost-calculator",
    title: "Claude Code Cost Calculator: Pro vs Max vs API",
    description: "A real breakdown of what Claude Code costs depending on how you use it. Numbers, not vibes.",
    date: "2026-03-13",
    author: "Shadman Rahman",
    tags: ["claude-code", "cost", "comparison", "tips"],
    content: `<p>The number one question I get: "How much does Claude Code actually cost?" The answer depends entirely on how you use it. Let's break it down.</p>

<h2>The Three Tiers</h2>
<p><strong>Claude Pro ($20/mo):</strong> You get Claude Code included but with usage limits. Good for casual users — maybe 2-3 sessions a day. You'll hit the cap if you're doing heavy development.</p>
<p><strong>Claude Max ($100-200/mo):</strong> Higher limits, priority access. For daily drivers who use Claude Code as their primary dev tool. The sweet spot for most professionals.</p>
<p><strong>API Direct:</strong> Pay per token. No monthly cap. Best for teams, CI/CD, and heavy automation. Can be cheaper OR more expensive depending on volume.</p>

<h2>Real-World Cost Examples</h2>
<table>
<thead><tr><th>Usage Pattern</th><th>Pro</th><th>Max</th><th>API</th></tr></thead>
<tbody>
<tr><td>Light (30 min/day)</td><td>$20</td><td>Overkill</td><td>~$15-30</td></tr>
<tr><td>Medium (2-3 hrs/day)</td><td>Hits limits</td><td>$100</td><td>~$60-120</td></tr>
<tr><td>Heavy (6+ hrs/day)</td><td>Unusable</td><td>$200</td><td>~$150-400</td></tr>
</tbody>
</table>

<h2>The Hidden Cost: Context Window</h2>
<p>The real cost driver isn't time — it's <a href="/docs/foundations/context-window">context window</a> usage. Every file Claude reads, every command output it processes, every conversation turn — it all consumes tokens.</p>
<p>The <a href="/docs/foundations/cost-optimization">cost optimization guide</a> covers how to reduce token usage by 30-50% through smart context management, Plan Mode, and efficient prompting.</p>

<h2>My Recommendation</h2>
<p>Start with Pro. If you hit limits within the first week, upgrade to Max. If you're running automation or team workflows, go API.</p>
<p>The ROI math is simple: if Claude Code saves you 1 hour per day, that's worth $50-100/day in developer time. Even Max pays for itself in the first morning.</p>`,
  },
  {
    slug: "plan-mode-saves-tokens",
    title: "The Plan Mode Trick That Saves 40% of Your Tokens",
    description: "Plan Mode forces Claude Code to think before it acts. That single constraint saves massive token spend.",
    date: "2026-03-14",
    author: "Shadman Rahman",
    tags: ["claude-code", "plan-mode", "cost", "tips"],
    content: `<p>Here's something counterintuitive: making Claude Code do MORE work upfront actually costs LESS overall. Way less.</p>

<h2>The Problem</h2>
<p>Without <a href="/docs/foundations/plan-mode">Plan Mode</a>, Claude Code jumps straight into execution. It reads a file, makes an edit, realizes it needs a different approach, undoes the edit, reads three more files, tries again. Every one of those actions costs tokens.</p>
<p>Trial and error is expensive when you're paying per token.</p>

<h2>What Plan Mode Does</h2>
<p>Plan Mode (toggle with Shift+Tab or Option+T) forces Claude to create a plan before taking any action. It lists:</p>
<ul>
<li>Which files it will modify</li>
<li>What changes it will make</li>
<li>What order it will work in</li>
<li>What could go wrong</li>
</ul>
<p>You review the plan, approve it, and THEN it executes. One pass. No backtracking.</p>

<h2>The Numbers</h2>
<p>I tracked my token usage for two weeks. Week one: normal mode. Week two: Plan Mode for everything.</p>
<p>Week two used 40% fewer tokens for the same output. The plans themselves cost tokens, sure, but the elimination of retries, wrong paths, and undo-redo cycles more than compensated.</p>

<h2>When to Use It</h2>
<p>Always use Plan Mode for:</p>
<ul>
<li>Multi-file changes</li>
<li>Refactoring</li>
<li>New features</li>
<li>Anything you'd regret if it went wrong</li>
</ul>
<p>Skip Plan Mode for quick, single-file edits where the overhead isn't worth it.</p>
<p>Combine Plan Mode with <a href="/docs/foundations/cost-optimization">cost optimization</a> practices and your monthly bill drops dramatically. More signal, less waste.</p>`,
  },
  {
    slug: "mcp-servers-explained",
    title: "MCP Servers Explained in 2 Minutes",
    description: "MCP gives Claude Code superpowers by connecting it to external tools. Here's the no-jargon explanation.",
    date: "2026-03-15",
    author: "Shadman Rahman",
    tags: ["claude-code", "mcp", "tutorial"],
    content: `<p>MCP stands for Model Context Protocol. If that means nothing to you, don't worry. Here's the plain English version.</p>

<h2>The Simple Explanation</h2>
<p>Claude Code can read files and run terminal commands. That's great, but limited. What if it could also:</p>
<ul>
<li>Query your database directly?</li>
<li>Read your Slack messages for context?</li>
<li>Check your GitHub issues?</li>
<li>Search the web for documentation?</li>
</ul>
<p>That's what <a href="/docs/patterns/mcp-servers">MCP servers</a> do. They're plugins that give Claude Code access to external tools and data sources.</p>

<h2>How It Works</h2>
<p>An MCP server is a small program that runs locally and exposes a specific capability. Claude Code connects to it and can use it like any other tool.</p>
<ol>
<li>You install an MCP server (one command)</li>
<li>You configure it in <code>.mcp.json</code></li>
<li>Claude Code automatically discovers and uses it</li>
</ol>
<p>That's it. No complex setup. No API keys to manage (usually). No infrastructure.</p>

<h2>Top 5 MCP Servers to Start With</h2>
<ol>
<li><strong>GitHub</strong> — read issues, PRs, and code search</li>
<li><strong>Postgres/SQLite</strong> — query your database</li>
<li><strong>Slack</strong> — read channel context</li>
<li><strong>Browser</strong> — fetch web pages and documentation</li>
<li><strong>Filesystem</strong> — extended file operations</li>
</ol>

<h2>The Mental Model</h2>
<p>Think of Claude Code as a developer and MCP servers as the apps on their computer. The more apps available, the more the developer can do without leaving their desk.</p>
<p>Start with one. Add more as you need them. The <a href="/docs/patterns/mcp-servers">full MCP guide</a> has the complete list and setup instructions.</p>`,
  },
  {
    slug: "claude-code-overnight",
    title: "I Let Claude Code Run Overnight. Here's What Happened.",
    description: "Autonomous loops let Claude Code work while you sleep. The results were better than I expected.",
    date: "2026-03-16",
    author: "Shadman Rahman",
    tags: ["claude-code", "automation", "autonomous", "story"],
    content: `<p>At 11pm on a Tuesday, I gave Claude Code a task: "Refactor the authentication module. Split the monolithic auth.ts into separate files by concern. Write tests for each new module. Update all imports."</p>
<p>Then I went to sleep.</p>

<h2>The Setup</h2>
<p><a href="/docs/patterns/autonomous-loops">Autonomous loops</a> let Claude Code work without human approval for each step. You set guardrails — what it can and can't do — and let it run.</p>
<p>My guardrails:</p>
<ul>
<li>Can read and write files in the <code>src/auth/</code> directory</li>
<li>Can run tests</li>
<li>Cannot modify files outside the auth module</li>
<li>Cannot run deployment commands</li>
<li>Cannot delete files without creating replacements first</li>
</ul>

<h2>What I Found at 7am</h2>
<p>The monolithic 800-line <code>auth.ts</code> was split into 6 focused modules. Each had a clear responsibility. 47 new tests, all passing. All imports updated. Git log showed 12 clean commits with descriptive messages.</p>
<p>Was it perfect? No. I'd have named two files differently. One test was redundant. Minor stuff.</p>

<h2>The Risk/Reward</h2>
<p>Autonomous mode is powerful but requires trust. Start small — a well-scoped refactoring task with clear boundaries. Don't let it loose on your entire codebase on day one.</p>
<p>Set up a stop mechanism (I use a STOP file that halts execution). Limit the scope. Review everything in the morning.</p>
<p>The math is hard to argue with: 8 hours of compute time while I slept. That refactoring would have taken me two full days of focused work.</p>
<p>Read the <a href="/docs/patterns/autonomous-loops">autonomous loops guide</a> before trying this. Guardrails are not optional.</p>`,
  },
  {
    slug: "5-claude-md-mistakes",
    title: "5 CLAUDE.md Mistakes Everyone Makes",
    description: "Your CLAUDE.md is probably too long, too vague, or missing the parts that matter most. Here's how to fix it.",
    date: "2026-03-17",
    author: "Shadman Rahman",
    tags: ["claude-code", "claude-md", "tips"],
    content: `<p>You set up a CLAUDE.md. Good. But is it actually helping? Here are the five mistakes I see constantly.</p>

<h2>Mistake 1: Too Long</h2>
<p>If your CLAUDE.md is 500+ lines, Claude Code is spending tokens reading your novel instead of doing work. Keep it under 200 lines. Be ruthless about what's essential.</p>

<h2>Mistake 2: Too Vague</h2>
<p>"Use good coding practices" tells Claude nothing. "Use TypeScript strict mode, Tailwind for styling, and put components in src/components/" tells it everything. Be specific. Be opinionated.</p>

<h2>Mistake 3: No Session Lifecycle</h2>
<p>The most valuable section of <a href="/docs/foundations/claude-md">CLAUDE.md</a> is the session lifecycle — what to read at start, what to write at end. Without it, you lose the <a href="/docs/foundations/memory-system">memory system</a> entirely.</p>

<h2>Mistake 4: No Communication Preferences</h2>
<p>Tell Claude Code HOW to talk to you. "Be direct. No preamble. Code first, explanation after. Don't ask if I want you to proceed — just do it." This saves hundreds of back-and-forth messages.</p>

<h2>Mistake 5: Never Updating It</h2>
<p>Your CLAUDE.md should evolve. When Claude makes a mistake you've corrected before, add it to CLAUDE.md. When you discover a pattern that works, document it. A living CLAUDE.md gets more powerful every week.</p>

<h2>The Quick Fix</h2>
<p>Open your CLAUDE.md right now. Check:</p>
<ul>
<li>Under 200 lines?</li>
<li>Specific stack and conventions listed?</li>
<li>Session lifecycle defined?</li>
<li>Communication preferences included?</li>
<li>Updated in the last week?</li>
</ul>
<p>If any answer is no, spend 10 minutes fixing it. Your next 100 sessions will thank you.</p>`,
  },
  {
    slug: "claude-code-for-non-engineers",
    title: "Claude Code for Non-Engineers: Yes, Really",
    description: "You don't need to write code to use Claude Code. Designers, PMs, and writers are shipping features with it.",
    date: "2026-03-18",
    author: "Shadman Rahman",
    tags: ["claude-code", "pm", "getting-started", "non-technical"],
    content: `<p>"But I'm not a developer." I hear this every single day. And every single day, I tell people: that's not a disqualifier anymore.</p>

<h2>What Non-Engineers Actually Do</h2>
<p>Claude Code reads your codebase and writes code. YOUR job is to:</p>
<ul>
<li>Describe what you want (requirements — a PM skill)</li>
<li>Review what it built (QA — a PM skill)</li>
<li>Iterate on details (feedback — everyone's skill)</li>
<li>Test the result (clicking around — literally anyone)</li>
</ul>
<p>Does that sound like coding? No. It sounds like product management.</p>

<h2>Real Examples</h2>
<p><strong>Designer:</strong> "Update the spacing on the card component to match the Figma. The gap should be 16px between the title and description."</p>
<p><strong>PM:</strong> "Add a feature flag toggle to the admin settings. When off, hide the new recommendation engine."</p>
<p><strong>Content writer:</strong> "Update the copy on the onboarding flow. Here's the new text for each step."</p>
<p>None of these require writing code. They require describing what you want clearly.</p>

<h2>Getting Started Without Code Knowledge</h2>
<ol>
<li><a href="/docs/foundations/installation">Install Claude Code</a> (it's one command)</li>
<li>Navigate to your project directory</li>
<li>Describe what you want in plain English</li>
<li>Review and iterate</li>
</ol>
<p>The <a href="/docs/workflows/pm-workflow">PM workflow guide</a> is specifically designed for non-engineers. Start there.</p>

<h2>The Uncomfortable Truth</h2>
<p>The line between "technical" and "non-technical" is dissolving. Claude Code doesn't care about your job title. It cares about clear instructions. If you can write a good requirements doc, you can ship features.</p>`,
  },
  {
    slug: "handoff-protocol-saves-10-minutes",
    title: "The Handoff Protocol That Saves 10 Minutes Every Session",
    description: "A simple end-of-session ritual that eliminates cold starts forever. Copy this template.",
    date: "2026-03-19",
    author: "Shadman Rahman",
    tags: ["claude-code", "productivity", "session-lifecycle", "tutorial"],
    content: `<p>The single highest-ROI habit I've built with Claude Code: the handoff.</p>

<h2>What's a Handoff?</h2>
<p>A handoff is a structured document written at the end of every session. It contains:</p>
<ol>
<li><strong>What was accomplished</strong> — specific files changed, features built, bugs fixed</li>
<li><strong>What's in progress</strong> — partially completed work, open questions</li>
<li><strong>What's blocked</strong> — dependencies, decisions needed, external factors</li>
<li><strong>Next step</strong> — the exact first action for the next session</li>
</ol>

<h2>The Template</h2>
<p>Add this to your <a href="/docs/foundations/claude-md">CLAUDE.md</a>:</p>
<p><code>"At session end, write a handoff to memory/handoff-[date].md with: accomplishments, in-progress items, blockers, and the specific next step."</code></p>
<p>That's it. One line in your CLAUDE.md. Claude writes the handoff automatically.</p>

<h2>The Math</h2>
<p>Without handoffs: 10-15 minutes of context-setting per session. With handoffs: 30 seconds ("read the latest handoff and continue").</p>
<p>If you have 2 sessions per day, that's 20-30 minutes saved daily. Over a month, that's 10+ hours recovered.</p>

<h2>Why It Works</h2>
<p>The handoff isn't for you to read (though you can). It's for Claude Code to read at the start of the next session. It's the bridge between sessions that makes the <a href="/docs/foundations/memory-system">memory system</a> actually work.</p>
<p>No handoff = cold start. Every time. Handoff = warm start. Every time.</p>
<p>This is the <a href="/docs/foundations/session-lifecycle">session lifecycle</a> in its simplest form. Start reading, end writing. The compound effect is real.</p>`,
  },
  {
    slug: "skills-vs-prompts",
    title: "Skills vs Prompts: Why Workflows Win",
    description: "Stop copy-pasting the same prompts. Package them into reusable skills and never repeat yourself.",
    date: "2026-03-20",
    author: "Shadman Rahman",
    tags: ["claude-code", "skills", "automation", "advanced"],
    content: `<p>You have a prompt you use all the time. Maybe it's "review this code for security issues" or "write tests for the changed files." You copy-paste it every time.</p>
<p>Stop that. Turn it into a skill.</p>

<h2>What's a Skill?</h2>
<p>A <a href="/docs/patterns/skills">skill</a> is a reusable workflow that you can invoke with a slash command. Instead of typing your 50-word prompt, you type <code>/review</code> or <code>/test-changes</code> and the entire workflow runs.</p>

<h2>Prompt vs Skill</h2>
<table>
<thead><tr><th>Prompt</th><th>Skill</th></tr></thead>
<tbody>
<tr><td>Ad-hoc, typed each time</td><td>Defined once, reused forever</td></tr>
<tr><td>Varies each invocation</td><td>Consistent every time</td></tr>
<tr><td>Single action</td><td>Multi-step workflow</td></tr>
<tr><td>Your memory</td><td>Version controlled</td></tr>
<tr><td>Personal</td><td>Shareable with team</td></tr>
</tbody>
</table>

<h2>Building Your First Skill</h2>
<p>Create a markdown file in your skills directory. Define:</p>
<ol>
<li>The trigger (when should this run?)</li>
<li>The steps (what does it do, in order?)</li>
<li>The output (what should it produce?)</li>
</ol>
<p>A code review skill might: read git diff, check for security issues, verify test coverage, check for style violations, and produce a summary with action items.</p>

<h2>The Compounding Factor</h2>
<p>One skill saves you 2 minutes per use. Ten skills save you 20 minutes per session. Over a month, you've automated hours of repetitive work.</p>
<p>Skills are the bridge between "using Claude Code" and "having Claude Code as your operating system." They encode your workflow into reusable automation.</p>
<p>Start with your most-repeated prompt. Turn it into a skill. Then do another. The <a href="/docs/patterns/skills">skills guide</a> shows you exactly how.</p>`,
  },
  {
    slug: "cursor-vs-claude-code",
    title: "Cursor vs Claude Code: An Honest Take",
    description: "Both are great. They're just great at different things. Here's when to use which.",
    date: "2026-03-21",
    author: "Shadman Rahman",
    tags: ["claude-code", "comparison", "cursor"],
    content: `<p>I use both. That's the honest take upfront. They're not competitors — they're complements. But the internet loves a fight, so let's break it down.</p>

<h2>Cursor's Strengths</h2>
<ul>
<li><strong>Visual editor:</strong> If you like VS Code, Cursor feels natural. Inline diffs, visual code review, file tree.</li>
<li><strong>Tab completion:</strong> The autocomplete is genuinely fast and context-aware.</li>
<li><strong>Low learning curve:</strong> If you've used an IDE before, you can use Cursor.</li>
<li><strong>Multi-model:</strong> Switch between GPT-4, Claude, and others.</li>
</ul>

<h2>Claude Code's Strengths</h2>
<ul>
<li><strong>CLI-native:</strong> If you live in the terminal, Claude Code feels like home.</li>
<li><strong>Deep context:</strong> <a href="/docs/foundations/claude-md">CLAUDE.md</a>, memory, handoffs — the context system is unmatched.</li>
<li><strong>Automation:</strong> <a href="/docs/patterns/hooks">Hooks</a>, <a href="/docs/patterns/skills">skills</a>, <a href="/docs/patterns/autonomous-loops">autonomous loops</a> — build workflows, not just code.</li>
<li><strong>Agentic:</strong> <a href="/docs/patterns/agents">Sub-agents</a>, delegation, parallel execution.</li>
</ul>

<h2>When to Use Which</h2>
<p><strong>Use Cursor when:</strong> You want visual feedback. You're doing exploratory coding. You want inline suggestions while typing.</p>
<p><strong>Use Claude Code when:</strong> You want automated workflows. You need deep project context. You're doing multi-file refactoring. You want to delegate entire tasks.</p>

<h2>The Honest Answer</h2>
<p>Cursor is a better editor. Claude Code is a better agent. If your work is mostly "write code in files," Cursor might feel more natural. If your work is mostly "plan, execute, verify, and automate," Claude Code wins.</p>
<p>I use Cursor for quick edits and Claude Code for everything else. They coexist beautifully.</p>`,
  },
  {
    slug: "how-to-debug-with-claude-code",
    title: "How to Debug with Claude Code (Stop Guessing)",
    description: "A systematic approach to debugging with Claude Code. Stop guessing, start diagnosing.",
    date: "2026-03-22",
    author: "Shadman Rahman",
    tags: ["claude-code", "debugging", "tutorial", "tips"],
    content: `<p>Most people debug with Claude Code by saying "it's broken, fix it." That's not debugging. That's hoping.</p>

<h2>The Systematic Approach</h2>
<p>Follow the <a href="/docs/workflows/debugging">debugging workflow</a> in three phases:</p>

<h3>Phase 1: Reproduce</h3>
<p>"Here's the error message: [paste it]. Here's how to reproduce: [exact steps]. Here's what should happen: [expected behavior]."</p>
<p>Give Claude the full picture. Error message, reproduction steps, expected behavior. Don't make it guess.</p>

<h3>Phase 2: Diagnose</h3>
<p>"Read the relevant files and explain what's causing this. Don't fix it yet — just explain."</p>
<p>This is the step most people skip. They jump straight to "fix it" and Claude makes changes based on incomplete understanding. Force the diagnosis first.</p>

<h3>Phase 3: Fix and Verify</h3>
<p>"Now fix it. After fixing, run the relevant tests to verify the fix works and nothing else broke."</p>
<p>Fix AND verify in one step. Don't assume the fix works. Prove it.</p>

<h2>Pro Tips</h2>
<ul>
<li><strong>Paste the full error.</strong> Not a summary. The full thing. Stack trace included.</li>
<li><strong>Share the command that triggered it.</strong> Claude needs to reproduce the context.</li>
<li><strong>Use git diff.</strong> "Show me what changed since the last working commit" is a powerful diagnostic.</li>
<li><strong>Check the obvious first.</strong> "Is the dev server running? Are dependencies installed?" Saves embarrassment.</li>
</ul>

<h2>When Claude Gets Stuck</h2>
<p>If the first fix doesn't work, don't say "that didn't work, try again." Say "that didn't work, here's the new error message." Give it new data, not just another attempt.</p>
<p>Debugging is a conversation. Treat it like one.</p>`,
  },
  {
    slug: "weekly-status-writes-itself",
    title: "The Weekly Status Report That Writes Itself",
    description: "Use Claude Code to auto-generate your weekly status from git history, tickets, and notes.",
    date: "2026-03-23",
    author: "Shadman Rahman",
    tags: ["claude-code", "automation", "pm", "productivity"],
    content: `<p>Every Friday at 4pm, the same dread: "What did I even do this week?" Then 30 minutes of digging through Jira, Slack, and git logs to piece together a status update.</p>
<p>Never again.</p>

<h2>The Automation</h2>
<p>Here's what I set up (took 15 minutes):</p>
<ol>
<li>A <a href="/docs/patterns/skills">skill</a> called <code>/weekly-status</code></li>
<li>It reads: git log for the past 7 days, open tickets, completed tickets, and my notes</li>
<li>It outputs: a structured status report with accomplishments, in-progress, and next week priorities</li>
</ol>
<p>Every Friday, I type <code>/weekly-status</code> and get a polished report in 30 seconds.</p>

<h2>What It Produces</h2>
<p>A clean report with sections:</p>
<ul>
<li><strong>Completed:</strong> Features shipped, bugs fixed, PRs merged (pulled from git log)</li>
<li><strong>In Progress:</strong> Open branches, active tickets (pulled from git status + tickets)</li>
<li><strong>Blocked:</strong> Items waiting on others (pulled from notes and handoffs)</li>
<li><strong>Next Week:</strong> Planned priorities (pulled from backlog)</li>
</ul>

<h2>The Setup</h2>
<p>The skill template is simple. It runs git commands, reads structured files, and formats the output. No external integrations needed — everything comes from your local project state.</p>

<h2>Beyond Status Reports</h2>
<p>The same pattern works for:</p>
<ul>
<li>Sprint retrospectives (what went well, what didn't)</li>
<li>Release notes (changes since last tag)</li>
<li>Standup updates (what did I do yesterday, what's today)</li>
</ul>
<p>Any report that's derived from existing data can be automated. Stop spending time assembling information that already exists in your tools.</p>
<p>Check the <a href="/docs/workflows/daily-practice">daily practice guide</a> for more automation patterns like this.</p>`,
  },
  {
    slug: "team-adoption-what-works",
    title: "Team Adoption: What Actually Works",
    description: "Rolling out Claude Code to a team? Here's what I've learned from helping teams actually adopt it.",
    date: "2026-03-24",
    author: "Shadman Rahman",
    tags: ["claude-code", "team", "adoption", "tips"],
    content: `<p>You love Claude Code. You want your team to use it. You share a link, give a demo, and... nothing happens. Three weeks later, one person tried it and quit.</p>
<p>Team adoption is hard. Here's what actually works.</p>

<h2>What Doesn't Work</h2>
<ul>
<li><strong>Mandating it.</strong> "Everyone must use Claude Code by Friday." Guaranteed resistance.</li>
<li><strong>The big demo.</strong> Impressive demos create spectators, not practitioners.</li>
<li><strong>Sending docs.</strong> Nobody reads a 50-page setup guide voluntarily.</li>
</ul>

<h2>What Works</h2>
<p><strong>1. Start with one champion.</strong> Find the person on your team who's most curious about AI tools. Help them get set up properly — CLAUDE.md, memory, handoffs, the whole stack. Let them become the proof point.</p>
<p><strong>2. Solve a real pain point.</strong> Don't show Claude Code doing cool tricks. Show it solving something the team actually hates — writing tests, updating docs, migrating code. Pain-driven adoption sticks.</p>
<p><strong>3. Share the CLAUDE.md.</strong> A team-level <a href="/docs/foundations/claude-md">CLAUDE.md</a> is the single best adoption tool. When everyone shares the same context file, Claude Code is consistent across the team.</p>
<p><strong>4. Create team skills.</strong> Build <a href="/docs/patterns/skills">skills</a> for your team's specific workflows. Code review, PR creation, test generation — custom to your stack and conventions.</p>

<h2>The Rollout Timeline</h2>
<p>The <a href="/docs/workflows/team-adoption">team adoption guide</a> lays out a 4-week plan:</p>
<ul>
<li>Week 1: Champion setup + shared CLAUDE.md</li>
<li>Week 2: 2-3 early adopters with guided onboarding</li>
<li>Week 3: Team skills and shared workflows</li>
<li>Week 4: Full team with opt-in adoption</li>
</ul>
<p>Slow is smooth. Smooth is fast. Don't rush it.</p>`,
  },
  {
    slug: "keyboard-shortcuts-youre-missing",
    title: "Claude Code Keyboard Shortcuts You're Missing",
    description: "15 keyboard shortcuts that make Claude Code feel like a superpower instead of a chat window.",
    date: "2026-03-25",
    author: "Shadman Rahman",
    tags: ["claude-code", "shortcuts", "tips", "productivity"],
    content: `<p>Most people interact with Claude Code like it's a chat window. Type, enter, wait, repeat. But there's a whole layer of <a href="/docs/foundations/shortcuts">keyboard shortcuts</a> that make it dramatically faster.</p>

<h2>Essential Shortcuts</h2>
<table>
<thead><tr><th>Shortcut</th><th>What It Does</th></tr></thead>
<tbody>
<tr><td><code>Shift+Tab</code></td><td>Toggle Plan Mode (think before acting)</td></tr>
<tr><td><code>Option+T</code></td><td>Toggle extended thinking</td></tr>
<tr><td><code>Escape</code></td><td>Cancel current operation</td></tr>
<tr><td><code>Ctrl+C</code></td><td>Interrupt and get partial results</td></tr>
<tr><td><code>Ctrl+L</code></td><td>Clear conversation (fresh context)</td></tr>
</tbody>
</table>

<h2>Navigation Shortcuts</h2>
<table>
<thead><tr><th>Shortcut</th><th>What It Does</th></tr></thead>
<tbody>
<tr><td><code>Up Arrow</code></td><td>Edit last message</td></tr>
<tr><td><code>Ctrl+R</code></td><td>Search conversation history</td></tr>
<tr><td><code>/</code></td><td>Open command palette</td></tr>
</tbody>
</table>

<h2>Power User Shortcuts</h2>
<table>
<thead><tr><th>Shortcut</th><th>What It Does</th></tr></thead>
<tbody>
<tr><td><code>@file</code></td><td>Reference a specific file in your prompt</td></tr>
<tr><td><code>#</code></td><td>Add context from recent files</td></tr>
<tr><td><code>!</code> prefix</td><td>Run a shell command directly</td></tr>
</tbody>
</table>

<h2>The Ones That Matter Most</h2>
<p><strong>Shift+Tab</strong> (Plan Mode) and <strong>Escape</strong> (cancel) are the two you'll use constantly. Plan Mode prevents expensive mistakes. Escape saves you when Claude goes down a wrong path.</p>
<p><strong>Option+T</strong> (thinking toggle) is underrated. Turn it on for complex tasks where you want Claude to reason deeply. Turn it off for simple tasks to save tokens.</p>

<h2>Build the Muscle Memory</h2>
<p>Pick three shortcuts. Use them exclusively for a week. Then add three more. Within a month, Claude Code feels like an extension of your hands, not a thing you type into.</p>
<p>Full list in the <a href="/docs/foundations/shortcuts">shortcuts reference</a>.</p>`,
  },
  {
    slug: "the-compound-effect-30-days",
    title: "The Compound Effect: What Changes After 30 Days",
    description: "Day one is cool. Day seven is useful. Day thirty is transformative. Here's the progression.",
    date: "2026-03-29",
    author: "Shadman Rahman",
    tags: ["claude-code", "productivity", "story", "tips"],
    content: `<p>Everyone talks about Claude Code like it's a switch — you turn it on and suddenly you're 10x productive. That's not how it works. It's a compound curve.</p>

<h2>Day 1-3: The Novelty Phase</h2>
<p>Everything is new. You're asking Claude Code random questions, testing its limits, showing colleagues. Output quality is inconsistent because you haven't set up <a href="/docs/foundations/claude-md">CLAUDE.md</a> yet. Fun, but not productive.</p>

<h2>Day 4-7: The Setup Phase</h2>
<p>You create CLAUDE.md. You set up the <a href="/docs/foundations/session-lifecycle">session lifecycle</a>. You write your first handoff. Suddenly, sessions are coherent. The quality jump is immediate and noticeable.</p>

<h2>Day 8-14: The Integration Phase</h2>
<p>You start using Claude Code for real work. Not experiments — actual features, actual bugs, actual refactoring. You build your first <a href="/docs/patterns/skills">skill</a>. You configure your first <a href="/docs/patterns/hooks">hook</a>. The tool starts fitting your workflow instead of the other way around.</p>

<h2>Day 15-21: The Acceleration Phase</h2>
<p>Memory kicks in. Claude Code knows your patterns without being told. Sessions start in 30 seconds instead of 10 minutes. You're shipping features faster than you can write tickets for them. Other people notice.</p>

<h2>Day 22-30: The Operating System Phase</h2>
<p>Claude Code isn't a tool anymore. It's your development operating system. You have skills for every repeated task. Hooks automate your quality checks. <a href="/docs/patterns/agents">Sub-agents</a> handle reviews and tests. Your workflow has changed fundamentally.</p>

<h2>The Real Metric</h2>
<p>It's not "how much code can Claude write." It's "how much of my workflow is automated, consistent, and context-aware." That number goes up every single day if you invest in the system.</p>
<p>Day one is cool. Day thirty is a different way of working entirely. Stick with it. The compound effect is real.</p>`,
  },
];

// Sorted newest first for display
export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Get all unique tags
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

// Get related posts (matching tags, excluding current)
export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const currentTags = new Set(current.tags);

  const scored = blogPosts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const matchCount = post.tags.filter((tag) => currentTags.has(tag)).length;
      return { post, matchCount };
    })
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);

  return scored.slice(0, limit).map(({ post }) => post);
}

// Get posts filtered by tag
export function getPostsByTag(tag: string): BlogPost[] {
  return getSortedPosts().filter((post) => post.tags.includes(tag));
}
