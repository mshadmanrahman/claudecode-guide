'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Gamepad2, ClipboardList, BarChart3, ArrowRight, Check,
  Monitor, Laptop, Terminal as TerminalIcon, ChevronDown, ChevronRight,
  Sparkles, Globe, Code2,
} from 'lucide-react';
import { ProgressiveStep } from '@/components/start/progressive-step';
import { CopyBlock } from '@/components/guide/copy-block';
import { VocabBridge } from '@/components/vocab-bridge';
import { useOsDetect } from '@/hooks/use-os-detect';
import { OS_CONFIGS, TRACK_CONFIGS, INTERFACE_CONFIGS } from '@/data/start-tracks';
import type { OsType } from '@/hooks/use-os-detect';
import type { TrackId, InterfaceId } from '@/data/start-tracks';

const STORAGE_KEY = 'claudecodeguide-start-progress';

const TRACK_OPTIONS = [
  { id: 'build' as TrackId, icon: Gamepad2, verb: 'Build', headline: 'Make a quiz game your friends can play', time: '10 min', color: 'text-green-600 dark:text-green-400', border: 'border-green-500/30' },
  { id: 'organize' as TrackId, icon: ClipboardList, verb: 'Organize', headline: 'Turn messy notes into a clear action plan', time: '5 min', color: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/30' },
  { id: 'analyze' as TrackId, icon: BarChart3, verb: 'Analyze', headline: 'Give it a spreadsheet, get insights and charts', time: '8 min', color: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/30' },
] as const;

const OS_OPTIONS: { id: OsType; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { id: 'mac', icon: Laptop, label: 'Mac' },
  { id: 'windows', icon: Monitor, label: 'Windows' },
  { id: 'linux', icon: TerminalIcon, label: 'Linux' },
];

const INTERFACE_OPTIONS: { id: InterfaceId; icon: React.ComponentType<{ className?: string }>; label: string; description: string; badge?: string }[] = [
  { id: 'web', icon: Globe, label: 'Web (claude.ai)', description: 'No install. Open a tab and go.', badge: 'easiest' },
  { id: 'desktop', icon: Monitor, label: 'Desktop App', description: 'Native app for Mac or Windows.' },
  { id: 'terminal', icon: TerminalIcon, label: 'Terminal (CLI)', description: 'Most powerful. Reads your files.' },
  { id: 'vscode', icon: Code2, label: 'VS Code', description: 'Same power, inside your editor.' },
];

interface SavedProgress {
  track: TrackId | null;
  interfaceChoice: InterfaceId | null;
  os: OsType | null;
  step: number;
}

function loadProgress(): SavedProgress {
  if (typeof window === 'undefined') return { track: null, interfaceChoice: null, os: null, step: 0 };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as SavedProgress;
  } catch { /* ignore */ }
  return { track: null, interfaceChoice: null, os: null, step: 0 };
}

function saveProgress(p: SavedProgress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch { /* ignore */ }
}

export function StartFlow() {
  const searchParams = useSearchParams();
  const detectedOs = useOsDetect();
  const [loaded, setLoaded] = useState(false);
  const [track, setTrack] = useState<TrackId | null>(null);
  const [interfaceChoice, setInterfaceChoice] = useState<InterfaceId | null>(null);
  const [os, setOs] = useState<OsType | null>(null);
  const [step, setStep] = useState(0);
  const [troubleOpen, setTroubleOpen] = useState<string | null>(null);

  // Hydrate from localStorage + URL params
  useEffect(() => {
    const saved = loadProgress();
    const urlTrack = searchParams.get('track') as TrackId | null;

    if (urlTrack && ['build', 'organize', 'analyze'].includes(urlTrack)) {
      setTrack(urlTrack);
      setInterfaceChoice(saved.interfaceChoice);
      setStep(saved.track === urlTrack ? saved.step : 1);
      setOs(saved.os ?? detectedOs);
    } else if (saved.track) {
      setTrack(saved.track);
      setInterfaceChoice(saved.interfaceChoice);
      setStep(saved.step);
      setOs(saved.os ?? detectedOs);
    }
    setLoaded(true);
  }, [searchParams, detectedOs]);

  // Persist progress
  useEffect(() => {
    if (loaded) saveProgress({ track, interfaceChoice, os, step });
  }, [track, interfaceChoice, os, step, loaded]);

  const goToStep = useCallback((n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectTrack = useCallback((t: TrackId) => {
    setTrack(t);
    setOs(detectedOs);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [detectedOs]);

  const selectInterface = useCallback((i: InterfaceId) => {
    setInterfaceChoice(i);
    if (i === 'terminal') {
      // Terminal path: go to OS picker (step 2)
      setStep(2);
    } else {
      // Web/Desktop/VSCode: go to setup + win (step 10)
      setStep(10);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const isNonTerminalPath = interfaceChoice && interfaceChoice !== 'terminal';
  const interfaceConfig = interfaceChoice ? INTERFACE_CONFIGS[interfaceChoice] : null;

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-fd-background">
        <p className="text-fd-muted-foreground">Loading your progress...</p>
      </main>
    );
  }

  const osConfig = os ? OS_CONFIGS[os] : null;
  const trackConfig = track ? TRACK_CONFIGS[track] : null;
  // Terminal path: 6 steps (track, interface, os, terminal, install, sign in, win)
  // Non-terminal path: 3 steps (track, interface, setup+win)
  const totalSteps = isNonTerminalPath ? 3 : 6;

  // ─── Step 0: Pick your track ───
  if (!track || step === 0) {
    return (
      <main className="flex min-h-screen flex-col bg-fd-background">
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 pt-28 pb-8 text-center">
          <h1 className="animate-slide-up-fade font-display tracking-tight-display text-4xl font-normal text-fd-foreground sm:text-5xl leading-[1.08]">
            What do you want to make?
          </h1>
          <p className="animate-slide-up-fade delay-100 mt-6 max-w-lg text-lg text-fd-muted-foreground leading-relaxed">
            Pick one. We&apos;ll walk you through everything step by step.
          </p>
        </section>

        <section className="mx-auto w-full max-w-2xl px-6 py-8">
          <div className="grid gap-4">
            {TRACK_OPTIONS.map((t, i) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => selectTrack(t.id)}
                  className={`animate-slide-up-fade group flex cursor-pointer items-start gap-6 rounded-xl border border-fd-border bg-fd-card p-8 text-left transition-all duration-200 hover:shadow-md hover:${t.border}`}
                  style={{ animationDelay: `${i * 100 + 200}ms` }}
                >
                  <Icon className={`mt-1 h-8 w-8 shrink-0 ${t.color}`} />
                  <div className="flex-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
                      {t.verb}
                    </span>
                    <h2 className="mt-1 font-display text-2xl font-normal text-fd-foreground tracking-tight-display">
                      {t.headline}
                    </h2>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-sm text-fd-muted-foreground">{t.time}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-fd-foreground opacity-0 transition-opacity group-hover:opacity-100">
                        Let&apos;s go <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="mt-12 text-center text-sm text-fd-muted-foreground">
            Already have Claude Code installed?{' '}
            <Link href="/tutorials" className="font-medium text-fd-foreground hover:underline">
              Browse tutorials
            </Link>
          </p>
        </section>
      </main>
    );
  }

  // ─── Step 1: How do you want to use Claude? ───
  if (step === 1) {
    return (
      <main className="flex min-h-screen flex-col bg-fd-background px-6 pt-24 pb-16">
        <ProgressiveStep
          stepNumber={1}
          totalSteps={totalSteps}
          title="How do you want to use Claude?"
          onPrev={() => goToStep(0)}
          nextLabel=""
        >
          <p className="text-fd-muted-foreground leading-relaxed">
            Claude works everywhere. Pick the one that feels right.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {INTERFACE_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = interfaceChoice === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => selectInterface(option.id)}
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border p-5 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-fd-primary bg-fd-primary/5 shadow-sm'
                      : 'border-fd-border bg-fd-card hover:bg-fd-accent'
                  }`}
                >
                  <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${isSelected ? 'text-fd-foreground' : 'text-fd-muted-foreground'}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${isSelected ? 'text-fd-foreground' : 'text-fd-foreground'}`}>
                        {option.label}
                      </span>
                      {option.badge && (
                        <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-fd-muted-foreground">{option.description}</p>
                  </div>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-fd-muted-foreground" />
                </button>
              );
            })}
          </div>
          <p className="text-sm text-fd-muted-foreground">
            Not sure?{' '}
            <Link href="/docs/foundations/which-interface" className="underline hover:text-fd-foreground">
              Compare all four options
            </Link>
          </p>
        </ProgressiveStep>
      </main>
    );
  }

  // ─── Step 2 (Terminal path): What computer are you on? ───
  if (step === 2 && interfaceChoice === 'terminal') {
    return (
      <main className="flex min-h-screen flex-col bg-fd-background px-6 pt-24 pb-16">
        <ProgressiveStep
          stepNumber={2}
          totalSteps={totalSteps}
          title="What kind of computer are you on?"
          onNext={() => goToStep(3)}
          onPrev={() => goToStep(1)}
          nextLabel={os ? `I'm on ${OS_CONFIGS[os].name}` : 'Pick one above'}
        >
          <p className="text-fd-muted-foreground leading-relaxed">
            We&apos;ll customize the terminal instructions for your system.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {OS_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = os === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setOs(option.id)}
                  className={`flex cursor-pointer flex-col items-center gap-3 rounded-xl border p-6 transition-all duration-200 ${
                    isSelected
                      ? 'border-fd-primary bg-fd-primary/5 shadow-sm'
                      : 'border-fd-border bg-fd-card hover:bg-fd-accent'
                  }`}
                >
                  <Icon className={`h-6 w-6 ${isSelected ? 'text-fd-foreground' : 'text-fd-muted-foreground'}`} />
                  <span className={`text-sm font-medium ${isSelected ? 'text-fd-foreground' : 'text-fd-muted-foreground'}`}>
                    {option.label}
                  </span>
                  {isSelected && <Check className="h-4 w-4 text-green-600 dark:text-green-400" />}
                </button>
              );
            })}
          </div>
          {detectedOs && os === detectedOs && (
            <p className="text-sm text-fd-muted-foreground">
              We detected you&apos;re on {OS_CONFIGS[detectedOs].name}. Change it above if that&apos;s wrong.
            </p>
          )}
        </ProgressiveStep>
      </main>
    );
  }

  // ─── Step 3 (Terminal path): Open your terminal ───
  if (step === 3 && osConfig) {
    return (
      <main className="flex min-h-screen flex-col bg-fd-background px-6 pt-24 pb-16">
        <ProgressiveStep
          stepNumber={3}
          totalSteps={totalSteps}
          title={`Open ${osConfig.terminalName}`}
          onNext={() => goToStep(4)}
          onPrev={() => goToStep(2)}
          nextLabel="I see it"
        >
          <p className="text-lg text-fd-foreground leading-relaxed">
            {osConfig.openTerminal}
          </p>

          <div className="rounded-xl border border-fd-border bg-fd-card p-6">
            <h3 className="text-sm font-medium text-fd-foreground mb-2">What you&apos;ll see</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">
              A window with a blinking cursor. {osConfig.terminalExplanation}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setTroubleOpen(troubleOpen === 'terminal' ? null : 'terminal')}
            className="flex cursor-pointer items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            {troubleOpen === 'terminal' ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            It won&apos;t open / I see something else
          </button>
          {troubleOpen === 'terminal' && (
            <div className="animate-fade-in rounded-xl border border-amber-500/20 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-fd-muted-foreground leading-relaxed">
              {os === 'mac' && (
                <p>Try looking for Terminal in Applications &gt; Utilities. Or install <a href="https://iterm2.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-fd-foreground">iTerm2</a> as an alternative.</p>
              )}
              {os === 'windows' && (
                <p>If PowerShell won&apos;t open, try searching for &quot;Command Prompt&quot; instead. Both will work.</p>
              )}
              {os === 'linux' && (
                <p>If Ctrl+Alt+T doesn&apos;t work, look for &quot;Terminal&quot; in your application menu. Most Linux distributions include one by default.</p>
              )}
            </div>
          )}
        </ProgressiveStep>
      </main>
    );
  }

  // ─── Step 4 (Terminal path): Install Claude Code ───
  if (step === 4 && osConfig) {
    return (
      <main className="flex min-h-screen flex-col bg-fd-background px-6 pt-24 pb-16">
        <ProgressiveStep
          stepNumber={4}
          totalSteps={totalSteps}
          title="Install Claude Code"
          onNext={() => goToStep(5)}
          onPrev={() => goToStep(3)}
          nextLabel="Done, what's next"
        >
          <p className="text-fd-muted-foreground leading-relaxed">
            Copy this and paste it into {osConfig.terminalName}. Then press Enter and wait about 30 seconds.
          </p>

          <CopyBlock code={osConfig.installCommand} />

          <div className="rounded-xl border border-fd-border bg-fd-card p-6">
            <h3 className="text-sm font-medium text-fd-foreground mb-2">
              What &quot;<VocabBridge term="npm install" explanation="npm is like an app store for coding tools. This command downloads Claude Code and sets it up on your computer.">npm install</VocabBridge>&quot; means
            </h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">
              Think of it as downloading an app, but instead of clicking a button in the App Store,
              you&apos;re typing the download command. Same idea, different interface.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setTroubleOpen(troubleOpen === 'npm' ? null : 'npm')}
            className="flex cursor-pointer items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            {troubleOpen === 'npm' ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            &quot;npm: command not found&quot;?
          </button>
          {troubleOpen === 'npm' && (
            <div className="animate-fade-in rounded-xl border border-amber-500/20 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-fd-muted-foreground leading-relaxed">
              <p className="whitespace-pre-line">{osConfig.nodeInstall}</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setTroubleOpen(troubleOpen === 'other' ? null : 'other')}
            className="flex cursor-pointer items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            {troubleOpen === 'other' ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            Something else went wrong?
          </button>
          {troubleOpen === 'other' && (
            <div className="animate-fade-in rounded-xl border border-amber-500/20 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-fd-muted-foreground leading-relaxed">
              <p>
                Check our{' '}
                <Link href="/docs/foundations/troubleshooting" className="underline hover:text-fd-foreground">
                  troubleshooting guide
                </Link>
                {' '}or{' '}
                <a href="https://github.com/anthropics/claude-code/issues" target="_blank" rel="noopener noreferrer" className="underline hover:text-fd-foreground">
                  open an issue on GitHub
                </a>.
              </p>
            </div>
          )}
        </ProgressiveStep>
      </main>
    );
  }

  // ─── Step 5 (Terminal path): Sign in ───
  if (step === 5) {
    return (
      <main className="flex min-h-screen flex-col bg-fd-background px-6 pt-24 pb-16">
        <ProgressiveStep
          stepNumber={5}
          totalSteps={totalSteps}
          title="Sign in"
          onNext={() => goToStep(6)}
          onPrev={() => goToStep(4)}
          nextLabel="I'm signed in"
        >
          <p className="text-fd-muted-foreground leading-relaxed">
            Type this and press Enter:
          </p>

          <CopyBlock code="claude" />

          <p className="text-fd-muted-foreground leading-relaxed">
            A browser window will open. Sign in with your Anthropic account.
          </p>

          <div className="rounded-xl border border-fd-border bg-fd-card p-6">
            <h3 className="text-sm font-medium text-fd-foreground mb-2">Don&apos;t have an account?</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">
              It takes 30 seconds.{' '}
              <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-fd-foreground">
                Create one at console.anthropic.com
              </a>
              . You&apos;ll need a Claude Pro ($20/month) or Max plan to use Claude Code.
            </p>
          </div>
        </ProgressiveStep>
      </main>
    );
  }

  // ─── Step 10: Non-terminal path (Web/Desktop/VSCode) ───
  if (step === 10 && trackConfig && interfaceConfig && !interfaceConfig.needsTerminal) {
    return (
      <main className="flex min-h-screen flex-col bg-fd-background px-6 pt-24 pb-16">
        <div className="animate-slide-up-fade w-full max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-fd-muted-foreground">
                Step 3 of 3
              </span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                <Check className="inline h-4 w-4 mr-1" />
                Almost there!
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-fd-muted overflow-hidden">
              <div className="h-full rounded-full bg-green-600 dark:bg-green-400 transition-all duration-500" style={{ width: '100%' }} />
            </div>
          </div>

          <h2 className="font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl mb-2">
            Set up {interfaceConfig.name}
          </h2>

          {/* Setup steps */}
          <div className="mt-6 space-y-3">
            {interfaceConfig.setupSteps.map((stepText, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-fd-border bg-fd-card p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fd-accent text-xs font-medium text-fd-muted-foreground">
                  {i + 1}
                </span>
                <p className="text-sm text-fd-foreground leading-relaxed">{stepText}</p>
              </div>
            ))}
          </div>

          {/* The prompt */}
          <div className="mt-8">
            <h3 className="font-display text-xl font-normal tracking-tight-display text-fd-foreground mb-3">
              {trackConfig.headline}
            </h3>
            <p className="text-sm text-fd-muted-foreground mb-4">
              Copy this and paste it into {interfaceConfig.name}:
            </p>
            <CopyBlock code={trackConfig.webPrompt} />
          </div>

          {/* What Claude will do */}
          <div className="mt-6 rounded-xl border border-fd-border bg-fd-card p-6">
            <h3 className="text-sm font-medium text-fd-foreground mb-3">
              <Sparkles className="inline h-4 w-4 mr-1 text-fd-muted-foreground" />
              Claude will:
            </h3>
            <ul className="space-y-2">
              {trackConfig.expectation.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-fd-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What you built */}
          <div className="mt-8 rounded-xl border border-green-500/20 bg-green-50 dark:bg-green-950/20 p-6">
            <h3 className="text-lg font-display font-normal text-fd-foreground mb-2">
              What just happened?
            </h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">
              {trackConfig.whatHappened}
            </p>
            <p className="mt-4 text-sm text-fd-foreground font-medium">
              {trackConfig.whatYouBuilt}
            </p>
          </div>

          {/* Want more power? */}
          <div className="mt-8 rounded-xl border border-fd-border bg-fd-accent/50 p-6">
            <h3 className="text-sm font-medium text-fd-foreground mb-2">
              Want even more?
            </h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">
              {interfaceChoice === 'web' && 'The web app is great for getting started. For working with your own files and projects, try the Desktop App or Terminal (CLI).'}
              {interfaceChoice === 'desktop' && 'The desktop app handles most tasks. For full power (reading your codebase, running tests, deploying), try the Terminal (CLI).'}
              {interfaceChoice === 'vscode' && 'VS Code extension gives you Claude right in your editor. For standalone tasks, the web app at claude.ai works great too.'}
            </p>
            <Link
              href="/docs/foundations/which-interface"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-fd-foreground hover:underline"
            >
              Compare all interfaces <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* What next */}
          <div className="mt-12">
            <h3 className="font-display text-2xl font-normal tracking-tight-display text-fd-foreground mb-6">
              What to try next
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {TRACK_OPTIONS.filter((t) => t.id !== track).map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => selectTrack(t.id)}
                    className="flex cursor-pointer items-start gap-4 rounded-xl border border-fd-border bg-fd-card p-5 text-left transition-all hover:shadow-sm hover:bg-fd-accent"
                  >
                    <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${t.color}`} />
                    <div>
                      <p className="text-sm font-medium text-fd-foreground">{t.headline}</p>
                      <p className="mt-1 text-xs text-fd-muted-foreground">{t.time}</p>
                    </div>
                  </button>
                );
              })}
              <Link
                href="/tutorials"
                className="flex items-start gap-4 rounded-xl border border-fd-border bg-fd-card p-5 transition-all hover:shadow-sm hover:bg-fd-accent"
              >
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <div>
                  <p className="text-sm font-medium text-fd-foreground">Browse all tutorials</p>
                  <p className="mt-1 text-xs text-fd-muted-foreground">20+ guided projects</p>
                </div>
              </Link>
              <Link
                href="/docs"
                className="flex items-start gap-4 rounded-xl border border-fd-border bg-fd-card p-5 transition-all hover:shadow-sm hover:bg-fd-accent"
              >
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-fd-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-fd-foreground">Read the full docs</p>
                  <p className="mt-1 text-xs text-fd-muted-foreground">Deep reference guide</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="cursor-pointer text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Try a different interface
            </button>
            <span className="text-fd-border">|</span>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                setTrack(null);
                setInterfaceChoice(null);
                setStep(0);
                setOs(detectedOs);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Start over
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ─── Step 6 (Terminal path): The Win! ───
  if (step === 6 && trackConfig && osConfig) {
    return (
      <main className="flex min-h-screen flex-col bg-fd-background px-6 pt-24 pb-16">
        <div className="animate-slide-up-fade w-full max-w-2xl mx-auto">
          {/* Progress bar - complete */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-fd-muted-foreground">
                Step {totalSteps} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                <Check className="inline h-4 w-4 mr-1" />
                Ready!
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-fd-muted overflow-hidden">
              <div className="h-full rounded-full bg-green-600 dark:bg-green-400 transition-all duration-500" style={{ width: '100%' }} />
            </div>
          </div>

          <h2 className="font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl mb-2">
            {trackConfig.headline}
          </h2>
          <p className="text-fd-muted-foreground leading-relaxed mb-8">
            Copy this into {osConfig.terminalName} and press Enter. Then sit back.
          </p>

          <CopyBlock code={trackConfig.prompt} />

          <div className="mt-6 rounded-xl border border-fd-border bg-fd-card p-6">
            <h3 className="text-sm font-medium text-fd-foreground mb-3">
              <Sparkles className="inline h-4 w-4 mr-1 text-fd-muted-foreground" />
              Claude will:
            </h3>
            <ul className="space-y-2">
              {trackConfig.expectation.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-fd-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-fd-muted-foreground">
              This takes 1-3 minutes. It&apos;s doing real work, not just copying a template.
            </p>
          </div>

          {/* See your result */}
          <div className="mt-8 rounded-xl border border-green-500/20 bg-green-50 dark:bg-green-950/20 p-6">
            <h3 className="text-lg font-display font-normal text-fd-foreground mb-2">
              See your result
            </h3>
            <p className="text-sm text-fd-muted-foreground mb-3">
              When Claude is done, type this to see what you built:
            </p>
            <CopyBlock code={trackConfig.resultCommand} />
            <p className="mt-2 text-xs text-fd-muted-foreground">{trackConfig.resultExplanation}</p>
          </div>

          {/* What just happened */}
          <div className="mt-8 rounded-xl border border-fd-border bg-fd-card p-6">
            <h3 className="text-lg font-display font-normal text-fd-foreground mb-2">
              What just happened?
            </h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed mb-4">
              {trackConfig.whatHappened}
            </p>
            {trackConfig.vocabBridge && (
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                <VocabBridge term={trackConfig.vocabBridge.term} explanation={trackConfig.vocabBridge.explanation} />
              </p>
            )}
            <p className="mt-4 text-sm text-fd-foreground font-medium">
              {trackConfig.whatYouBuilt}
            </p>
          </div>

          {/* Iteration prompt */}
          <div className="mt-8 rounded-xl border border-fd-border bg-fd-accent/50 p-6">
            <h3 className="text-sm font-medium text-fd-foreground mb-2">
              Want to change something?
            </h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed mb-3">
              Just tell Claude. That&apos;s the whole workflow:
            </p>
            <p className="font-display text-lg text-fd-foreground">
              Describe &rarr; Claude builds &rarr; You review &rarr; Describe changes &rarr; Repeat
            </p>
          </div>

          {/* What next */}
          <div className="mt-12">
            <h3 className="font-display text-2xl font-normal tracking-tight-display text-fd-foreground mb-6">
              What to try next
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {TRACK_OPTIONS.filter((t) => t.id !== track).map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => selectTrack(t.id)}
                    className="flex cursor-pointer items-start gap-4 rounded-xl border border-fd-border bg-fd-card p-5 text-left transition-all hover:shadow-sm hover:bg-fd-accent"
                  >
                    <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${t.color}`} />
                    <div>
                      <p className="text-sm font-medium text-fd-foreground">{t.headline}</p>
                      <p className="mt-1 text-xs text-fd-muted-foreground">{t.time}</p>
                    </div>
                  </button>
                );
              })}
              <Link
                href="/tutorials"
                className="flex items-start gap-4 rounded-xl border border-fd-border bg-fd-card p-5 transition-all hover:shadow-sm hover:bg-fd-accent"
              >
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <div>
                  <p className="text-sm font-medium text-fd-foreground">Browse all tutorials</p>
                  <p className="mt-1 text-xs text-fd-muted-foreground">20+ guided projects</p>
                </div>
              </Link>
              <Link
                href="/docs/foundations/what-is-claude-code"
                className="flex items-start gap-4 rounded-xl border border-fd-border bg-fd-card p-5 transition-all hover:shadow-sm hover:bg-fd-accent"
              >
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-fd-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-fd-foreground">Read the full docs</p>
                  <p className="mt-1 text-xs text-fd-muted-foreground">Deep reference guide</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                setTrack(null);
                setInterfaceChoice(null);
                setStep(0);
                setOs(detectedOs);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Start over from the beginning
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Fallback
  return (
    <main className="flex min-h-screen flex-col bg-fd-background px-6 pt-24 pb-16">
      <div className="mx-auto text-center">
        <p className="text-fd-muted-foreground">Something went wrong. Let&apos;s start over.</p>
        <button
          type="button"
          onClick={() => goToStep(0)}
          className="mt-4 cursor-pointer text-sm font-medium text-fd-foreground hover:underline"
        >
          Go back to the beginning
        </button>
      </div>
    </main>
  );
}
