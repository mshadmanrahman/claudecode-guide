/**
 * Registration path for a Claude certification, as a vertical flow that fits a phone.
 * Main column: the route that ends in an exam. Side column: the two places people get stuck.
 */

interface StepProps {
  y: number;
  name: string;
  sub: string;
  focal?: boolean;
}

const MAIN_X = 16;
const MAIN_W = 200;
const SIDE_X = 240;
const SIDE_W = 104;
const H = 56;

function Step({ y, name, sub, focal = false }: StepProps) {
  return (
    <g>
      <rect x={MAIN_X} y={y} width={MAIN_W} height={H} rx="6" fill="var(--bg)" />
      <rect
        x={MAIN_X}
        y={y}
        width={MAIN_W}
        height={H}
        rx="6"
        fill={focal ? 'color-mix(in srgb, var(--acc) 10%, var(--surface))' : 'var(--surface)'}
        stroke={focal ? 'var(--acc)' : 'var(--ink)'}
        strokeOpacity={focal ? 1 : 0.6}
        strokeWidth="1"
      />
      <text x={MAIN_X + MAIN_W / 2} y={y + 25} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--ink)">
        {name}
      </text>
      <text x={MAIN_X + MAIN_W / 2} y={y + 42} textAnchor="middle" fontSize="9" className="font-mono" fill="var(--muted)">
        {sub}
      </text>
    </g>
  );
}

function Detour({ y, name, sub }: Omit<StepProps, 'focal'>) {
  return (
    <g>
      <rect x={SIDE_X} y={y} width={SIDE_W} height={H} rx="6" fill="var(--bg)" />
      <rect
        x={SIDE_X}
        y={y}
        width={SIDE_W}
        height={H}
        rx="6"
        fill="var(--bg)"
        stroke="var(--muted)"
        strokeDasharray="4,3"
        strokeWidth="1"
      />
      <text x={SIDE_X + SIDE_W / 2} y={y + 25} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--ink)">
        {name}
      </text>
      <text x={SIDE_X + SIDE_W / 2} y={y + 42} textAnchor="middle" fontSize="9" className="font-mono" fill="var(--muted)">
        {sub}
      </text>
    </g>
  );
}

const ROWS = [20, 108, 196, 284, 372];
const CX = MAIN_X + MAIN_W / 2;

export function RegistrationPath() {
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 360 448"
        role="img"
        aria-labelledby="cert-path-title cert-path-desc"
        className="mx-auto block h-auto w-full max-w-[420px]"
      >
        <title id="cert-path-title">How registration for a Claude certification works</title>
        <desc id="cert-path-desc">
          You must work at a Claude Partner Network firm and register with a work email on its domain. If the domain is
          on the partner record you pay and sit a 120-minute Pearson exam with a pass mark of 720. A personal email is
          rejected, and an unlinked domain takes 7 to 10 working days to add.
        </desc>
        <defs>
          <marker id="cert-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--muted)" />
          </marker>
        </defs>

        {/* Connectors first, so boxes sit on top. */}
        {ROWS.slice(0, -1).map((y) => (
          <line key={y} x1={CX} y1={y + H} x2={CX} y2={y + H + 30} stroke="var(--muted)" strokeWidth="1" markerEnd="url(#cert-arrow)" />
        ))}
        <line x1={MAIN_X + MAIN_W} y1={ROWS[1] + 28} x2={SIDE_X - 2} y2={ROWS[1] + 28} stroke="var(--muted)" strokeDasharray="4,3" strokeWidth="1" markerEnd="url(#cert-arrow)" />
        <line x1={MAIN_X + MAIN_W} y1={ROWS[2] + 28} x2={SIDE_X - 2} y2={ROWS[2] + 28} stroke="var(--muted)" strokeDasharray="4,3" strokeWidth="1" markerEnd="url(#cert-arrow)" />
        <text x={(MAIN_X + MAIN_W + SIDE_X) / 2} y={ROWS[2] + 20} textAnchor="middle" fontSize="8" className="font-mono" fill="var(--muted)" letterSpacing="0.06em">
          NO
        </text>
        <text x={CX + 8} y={ROWS[2] + H + 20} fontSize="8" className="font-mono" fill="var(--muted)" letterSpacing="0.06em">
          YES
        </text>

        <Step y={ROWS[0]} name="Work at a partner firm" sub="Claude Partner Network" />
        <Step y={ROWS[1]} name="Register with work email" sub="company domain only" />
        <Step y={ROWS[2]} name="Domain on partner record?" sub="checked at registration" focal />
        <Step y={ROWS[3]} name="Pay for the exam" sub="$99 to $175, or 50% off" />
        <Step y={ROWS[4]} name="Sit it with Pearson" sub="120 min, pass at 720" focal />

        <Detour y={ROWS[1]} name="Personal" sub="rejected" />
        <Detour y={ROWS[2]} name="Add domain" sub="7 to 10 days" />
      </svg>
      <figcaption className="mt-3 text-center text-sm text-fd-muted-foreground">
        Where registration stops people: the email and the domain, before any money changes hands.
      </figcaption>
    </figure>
  );
}
