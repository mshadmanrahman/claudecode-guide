'use client';

import type { CliStep } from '@/components/claude-code-mock';
import { CHAR_MS, stepDuration } from '@/components/claude-code-mock';
import { ClaudeDesktopCodeMock, type DesktopClock, type PickerState } from '@/components/claude-desktop-code-mock';

/**
 * The model-selection page's session: a search on Opus 5.5 at medium, then the
 * picker beside the send button turns effort down to low and switches to
 * Sonnet 5.5 before the bulk rename gets typed.
 */

const steps: CliStep[] = [
  { kind: 'prompt', text: 'Find every call to getUser in src/' },
  { kind: 'thinking', verb: 'Searching', ms: 900 },
  { kind: 'tool', name: 'Grep', arg: 'getUser', result: '41 matches in 12 files' },
  { kind: 'say', text: 'getUser is called 41 times across 12 files.\nMost of them are in src/api and src/hooks.' },
];

const NEXT = 'Rename all 41 calls to fetchUser';

// Milliseconds after the reply lands.
const AT = {
  pressEffort: 700,
  slideFrom: 1500,
  slideTo: 2100,
  closeEffort: 2700,
  pressModel: 3400,
  hoverSonnet: 4300,
  pickSonnet: 4900,
  type: 5600,
};

function endOfSteps(starts: number[]) {
  const last = steps.length - 1;
  return starts[last] + stepDuration(steps[last]);
}

function picker({ t, starts }: DesktopClock): PickerState {
  const d = t - endOfSteps(starts);
  if (d < AT.pressEffort) return { model: 'Opus 5.5', effort: 'medium' };
  if (d < AT.closeEffort) {
    const p = Math.min(1, Math.max(0, (d - AT.slideFrom) / (AT.slideTo - AT.slideFrom)));
    return {
      model: 'Opus 5.5',
      effort: p < 0.5 ? 'medium' : 'low',
      menu: d < AT.pressEffort + 150 ? null : 'effort',
      press: d < AT.pressEffort + 150 ? 'effort' : null,
      slider: 1 - p,
    };
  }
  if (d < AT.pressModel) return { model: 'Opus 5.5', effort: 'low' };
  if (d < AT.pickSonnet + 200) {
    return {
      model: 'Opus 5.5',
      effort: 'low',
      menu: d < AT.pressModel + 150 ? null : 'model',
      press: d < AT.pressModel + 150 ? 'model' : null,
      hover: d < AT.hoverSonnet ? 'Opus 5.5' : 'Sonnet 5.5',
    };
  }
  return { model: 'Sonnet 5.5', effort: 'low' };
}

export function ModelPickerMock() {
  return (
    <ClaudeDesktopCodeMock
      steps={steps}
      title="Find getUser calls"
      folder="my-app"
      loop
      height={250}
      tailMs={AT.type + NEXT.length * CHAR_MS + 2200}
      picker={picker}
      fill={(c) => {
        const d = c.t - endOfSteps(c.starts) - AT.type;
        return d < 0 ? undefined : NEXT.slice(0, Math.floor(d / CHAR_MS));
      }}
    />
  );
}
