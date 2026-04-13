import type { OsType } from '@/hooks/use-os-detect';

export type TrackId = 'build' | 'organize' | 'analyze';
export type InterfaceId = 'web' | 'desktop' | 'terminal' | 'vscode';

interface TrackConfig {
  id: TrackId;
  verb: string;
  headline: string;
  prompt: string;
  /** Simplified prompt for web/desktop users (no mkdir, cd, or claude prefix) */
  webPrompt: string;
  expectation: string[];
  resultCommand: string;
  resultExplanation: string;
  whatHappened: string;
  whatYouBuilt: string;
  vocabBridge?: { term: string; explanation: string };
}

interface InterfaceConfig {
  id: InterfaceId;
  name: string;
  description: string;
  setupSteps: string[];
  /** Whether this interface needs the terminal install flow */
  needsTerminal: boolean;
}

interface OsConfig {
  name: string;
  terminalName: string;
  openTerminal: string;
  terminalExplanation: string;
  installCommand: string;
  nodeInstall: string;
}

export const OS_CONFIGS: Record<OsType, OsConfig> = {
  mac: {
    name: 'Mac',
    terminalName: 'Terminal',
    openTerminal: 'Press \u2318 + Space, type "Terminal", and hit Enter.',
    terminalExplanation: 'Terminal is like a chat window, but for your computer. You type commands, it does things.',
    installCommand: 'npm install -g @anthropic-ai/claude-code',
    nodeInstall: 'If you see "npm: command not found", install Node.js first:\n\nbrew install node\n\nDon\'t have brew? Visit https://brew.sh and paste the one-line install command first.',
  },
  windows: {
    name: 'Windows',
    terminalName: 'PowerShell',
    openTerminal: 'Press Windows key, type "PowerShell", and click "Run as Administrator".',
    terminalExplanation: 'PowerShell is like a chat window, but for your computer. You type commands, it does things.',
    installCommand: 'npm install -g @anthropic-ai/claude-code',
    nodeInstall: 'If you see "npm is not recognized", install Node.js first:\n\nVisit https://nodejs.org and download the LTS installer. Run it, then reopen PowerShell.',
  },
  linux: {
    name: 'Linux',
    terminalName: 'Terminal',
    openTerminal: 'Press Ctrl + Alt + T to open a terminal window.',
    terminalExplanation: 'Terminal is like a chat window, but for your computer. You type commands, it does things.',
    installCommand: 'npm install -g @anthropic-ai/claude-code',
    nodeInstall: 'If you see "npm: command not found", install Node.js first:\n\nsudo apt install nodejs npm\n\n(or your distro\'s equivalent)',
  },
};

export const TRACK_CONFIGS: Record<TrackId, TrackConfig> = {
  build: {
    id: 'build',
    verb: 'Build',
    headline: 'Let\u2019s build a quiz game',
    prompt: 'mkdir my-quiz && cd my-quiz && claude "create a fun quiz game about world history with 10 questions, a score tracker, and a colorful UI. Use HTML, CSS, and JavaScript so I can open it in a browser."',
    webPrompt: 'Create a fun quiz game about world history with 10 questions, a score tracker, and a colorful UI. Use HTML, CSS, and JavaScript so I can open it in a browser.',
    expectation: [
      'Create the project files',
      'Write the quiz questions',
      'Build the game logic and scoring',
      'Style the interface',
    ],
    resultCommand: 'open index.html',
    resultExplanation: 'This opens the quiz game in your browser. On Windows, use: start index.html',
    whatHappened: 'You typed a sentence in English. Claude turned that into real HTML, CSS, and JavaScript code, organized it into files, and built a working quiz game. The code is on your computer right now.',
    whatYouBuilt: 'A working quiz game with 10 questions, score tracking, and a styled interface.',
    vocabBridge: { term: 'HTML, CSS, and JavaScript', explanation: 'The three languages every website is made of. HTML is the structure, CSS is the design, JavaScript is the interactivity.' },
  },
  organize: {
    id: 'organize',
    verb: 'Organize',
    headline: 'Let\u2019s organize some notes',
    webPrompt: 'I had a meeting today. Here are my rough notes:\n\n- talked about Q3 launch timeline, Sarah thinks July is too aggressive\n- need to finalize the design by end of month\n- budget approved for contractor, John will find someone\n- mobile app v2 pushed to August\n- Sarah will send competitor analysis by Friday\n- we might need to revisit the pricing page copy\n\nPlease organize these into a clean summary with decisions, action items with owners and deadlines, and open questions.',
    prompt: 'claude "I had a meeting today. Here are my rough notes:\n\n- talked about Q3 launch timeline, Sarah thinks July is too aggressive\n- need to finalize the design by end of month\n- budget approved for contractor, John will find someone\n- mobile app v2 pushed to August\n- Sarah will send competitor analysis by Friday\n- we might need to revisit the pricing page copy\n\nPlease organize these into a clean summary with decisions, action items with owners and deadlines, and open questions. Save it to meeting-summary.md"',
    expectation: [
      'Read your messy notes',
      'Identify decisions, action items, and open questions',
      'Organize everything with owners and deadlines',
      'Save it to a clean file',
    ],
    resultCommand: 'cat meeting-summary.md',
    resultExplanation: 'This displays the organized file Claude created. You can also open it in any text editor.',
    whatHappened: 'You pasted messy notes. Claude structured them into a clean document with clear sections, assigned owners, and deadlines. The file is saved on your computer.',
    whatYouBuilt: 'A structured meeting summary with decisions, action items, owners, and deadlines.',
  },
  analyze: {
    id: 'analyze',
    verb: 'Analyze',
    headline: 'Let\u2019s analyze some data',
    webPrompt: 'Create a sample CSV file with 12 months of sales data for 3 product categories (Electronics, Clothing, Food), then analyze it: show total revenue per category, identify the best and worst months, calculate month-over-month growth, and generate a visual chart. Present the results clearly.',
    prompt: 'claude "Create a sample CSV file with 12 months of sales data for 3 product categories (Electronics, Clothing, Food), then analyze it: show total revenue per category, identify the best and worst months, calculate month-over-month growth, and generate an HTML chart I can open in my browser. Save everything to an analysis/ folder."',
    expectation: [
      'Create sample sales data',
      'Analyze revenue by category and month',
      'Calculate growth trends',
      'Generate a visual chart',
    ],
    resultCommand: 'open analysis/chart.html',
    resultExplanation: 'This opens the interactive chart in your browser. On Windows, use: start analysis\\chart.html',
    whatHappened: 'You described what you wanted to know. Claude created sample data, ran the analysis, calculated trends, and built a visual chart. Everything is saved in a folder on your computer.',
    whatYouBuilt: 'A data analysis folder with sample data, calculations, and an interactive revenue chart.',
  },
};

export const INTERFACE_CONFIGS: Record<InterfaceId, InterfaceConfig> = {
  web: {
    id: 'web',
    name: 'Web (claude.ai)',
    description: 'No install. Open a tab and start.',
    setupSteps: [
      'Go to claude.ai in your browser',
      'Sign in or create an account (takes 30 seconds)',
      'You\'re ready! Paste your prompt below.',
    ],
    needsTerminal: false,
  },
  desktop: {
    id: 'desktop',
    name: 'Desktop App',
    description: 'Native app for Mac or Windows.',
    setupSteps: [
      'Download Claude from claude.ai/download',
      'Install and open the app',
      'Sign in with your Anthropic account',
      'You\'re ready! Paste your prompt below.',
    ],
    needsTerminal: false,
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal (CLI)',
    description: 'Most powerful. Reads your files, runs code.',
    setupSteps: [],
    needsTerminal: true,
  },
  vscode: {
    id: 'vscode',
    name: 'VS Code Extension',
    description: 'Same power, inside your editor.',
    setupSteps: [
      'Open VS Code',
      'Go to Extensions (Cmd+Shift+X / Ctrl+Shift+X)',
      'Search "Claude Code" and click Install',
      'Press Cmd+Shift+P and type "Claude Code: Open"',
      'Sign in when prompted. You\'re ready!',
    ],
    needsTerminal: false,
  },
};
