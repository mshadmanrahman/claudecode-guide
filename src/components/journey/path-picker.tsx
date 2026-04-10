'use client';

import { Check, RotateCcw } from 'lucide-react';
import { OsSelector } from '@/components/guide/os-selector';
import { InterfaceSelector } from '@/components/journey/interface-selector';
import type { JourneyOs, JourneyInterface } from '@/hooks/use-journey-selections';

interface PathPickerProps {
  os: JourneyOs | null;
  iface: JourneyInterface | null;
  onOsChange: (os: JourneyOs) => void;
  onInterfaceChange: (iface: JourneyInterface) => void;
  onReset: () => void;
}

const interfaceLabels: Record<JourneyInterface, string> = {
  web: 'Web App',
  desktop: 'Desktop App',
  cli: 'Terminal (CLI)',
  ide: 'IDE Extension',
};

const osLabels: Record<JourneyOs, string> = {
  mac: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
};

export function PathPicker({ os, iface, onOsChange, onInterfaceChange, onReset }: PathPickerProps) {
  const bothSelected = os !== null && iface !== null;

  return (
    <div className="rounded-2xl border border-fd-border bg-fd-card p-5 sm:p-6">
      <h3 className="font-display text-lg font-semibold tracking-tight text-fd-foreground">
        Personalise your path
      </h3>
      <p className="mt-1 text-sm text-fd-muted-foreground">
        Tell us your setup and we&apos;ll tailor the steps for you.
      </p>

      {/* Step 1: OS */}
      <div className="mt-5">
        <p className="mb-2 text-sm font-medium text-fd-foreground">
          What computer are you on?
        </p>
        <OsSelector selected={os} onSelect={onOsChange} />
      </div>

      {/* Step 2: Interface (revealed after OS) */}
      {os !== null && (
        <div className="mt-5 animate-slide-up-fade">
          <p className="mb-2 text-sm font-medium text-fd-foreground">
            How do you want to use Claude?
          </p>
          <InterfaceSelector selected={iface} onSelect={onInterfaceChange} />
        </div>
      )}

      {/* Confirmation */}
      {bothSelected && (
        <div className="mt-4 flex items-center justify-between animate-slide-up-fade">
          <p className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
            <Check className="h-4 w-4" />
            Got it &mdash; {osLabels[os]} + {interfaceLabels[iface]}. Steps are tailored for you.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
