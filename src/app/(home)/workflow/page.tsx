import type { Metadata } from 'next';
import { DayFlow } from '@/components/workflow/day-flow';
import { WorkflowTracker } from '@/components/workflow/workflow-tracker';
import { OsMapLink } from '@/components/workflow/os-map-link';
import { LoopDiagram } from '@/components/workflow/loop-diagram';
import { SceneBackdrop } from '@/components/scene-backdrop';

const description =
  'Five moments in a workday where Claude saves you time, with a prompt to copy for each. For designers, teachers, marketers, HR teams and PMs.';

export const metadata: Metadata = {
  title: 'Claude in Your Day',
  description,
  openGraph: {
    title: 'Claude in Your Day',
    description,
    type: 'website',
  },
};

/*
 * Connector motion for this route only: a 1px dashed line whose dashes drift in the
 * direction of the flow. Scoped wf-* names, turned off for reduced motion.
 */
const connectorCss = `
.wf-dash-y, .wf-dash-x { --wf-dash: color-mix(in srgb, var(--muted) 55%, transparent); }
.wf-dash-y {
  background-image: linear-gradient(to bottom, var(--wf-dash) 50%, transparent 0);
  background-size: 1px 8px;
  background-repeat: repeat-y;
  animation: wf-flow-y 1.4s linear infinite;
}
.wf-dash-x {
  background-image: linear-gradient(to right, var(--wf-dash) 50%, transparent 0);
  background-size: 8px 1px;
  background-repeat: repeat-x;
  animation: wf-flow-x 1.4s linear infinite;
}
@keyframes wf-flow-y { to { background-position: 0 8px; } }
@keyframes wf-flow-x { to { background-position: 8px 0; } }
@media (prefers-reduced-motion: reduce) {
  .wf-dash-y, .wf-dash-x { animation: none; }
}
`;

export default function WorkflowPage() {
  return (
    <>
      <style>{connectorCss}</style>
      <SceneBackdrop variant="faded" />
      <WorkflowTracker />
      <main className="mx-auto max-w-4xl overflow-x-clip px-4 py-16 text-[var(--ink)] sm:px-6 sm:py-20">
        <div className="mb-12" data-workflow-intro>
          <h1 className="font-display mb-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
            Claude, quietly working through your day.
          </h1>
          <p className="m-0 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
            Five moments in a normal workday where Claude saves you time. Pick your role, copy a
            prompt, and try one today.
          </p>
        </div>

        <LoopDiagram />

        <DayFlow />

        <div
          className="glass mt-16 rounded-xl p-6 sm:p-8"
          data-workflow-complete
        >
          <h2 className="mb-3 mt-0 font-mono text-xs font-normal text-[var(--muted)]">
            where this came from
          </h2>
          <p className="m-0 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            This page is a simplified version of an AI operating system I actually run: 35 scheduled jobs,
            from a morning brief to an evening recap. The prompts above are drawn from what
            I use daily as a PM and builder.
          </p>
          <OsMapLink />
        </div>
      </main>
    </>
  );
}
