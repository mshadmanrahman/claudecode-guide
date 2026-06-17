'use client';

import { useEffect, useRef } from 'react';
import type { JSX } from 'react';
import { useInView } from '@/hooks/use-in-view';

type Scene = {
  tl: string; t1: string; t2: string;
  bl: string; b1: string; b2: string;
  out1: string; out2: string; out3: string; out4: string;
};

const SCENES: Scene[] = [
  { tl: 'EMAIL',     t1: 'From: Sarah',        t2: 'Re: Q3 targets...',
    bl: 'TRANSCRIPT', b1: '[00:14] Agreed on',  b2: 'July 1 deadline.',
    out1: 'Team update:',       out2: 'Q3 target confirmed.',
    out3: 'Assigned: 3 tasks.', out4: 'Review doc by Fri.' },
  { tl: 'SLACK MSG', t1: 'Can we draft a',      t2: 'proposal for this?',
    bl: 'BRIEF',      b1: 'Client wants faster', b2: 'checkout in app.',
    out1: 'Proposal:',          out2: 'Single-step checkout',
    out3: 'with saved cards.',  out4: 'Est. 40% lift.' },
  { tl: 'NOTES',     t1: 'Feature shipped.',    t2: '3 bugs resolved.',
    bl: 'EMAIL',      b1: 'Stakeholders need',  b2: 'highlights today.',
    out1: 'Highlights:',        out2: '- Feature is live',
    out3: '- Bugs closed: 3',  out4: '- Next: onboarding' },
];

const ARC1: [number, number][] = [[172,78],[231,78],[231,145],[290,145]];
const ARC2: [number, number][] = [[172,212],[231,212],[231,145],[290,145]];
const ARC3: [number, number][] = [[358,145],[395,128],[425,162],[462,145]];

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function bezier4(pts: [number, number][], t: number): [number, number] {
  const [p0, p1, p2, p3] = pts;
  const mt = 1 - t;
  return [
    mt*mt*mt*p0[0] + 3*mt*mt*t*p1[0] + 3*mt*t*t*p2[0] + t*t*t*p3[0],
    mt*mt*mt*p0[1] + 3*mt*mt*t*p1[1] + 3*mt*t*t*p2[1] + t*t*t*p3[1],
  ];
}

export function HeroVisual(): JSX.Element {
  const [containerRef, inView] = useInView(0.3);
  const activeRef = useRef(false);
  const idxRef = useRef(0);

  useEffect(() => {
    if (!inView) { activeRef.current = false; return; }
    activeRef.current = true;
    idxRef.current = 0;

    const alive = () => activeRef.current;
    const g = (id: string) => document.getElementById(id);

    function typeText(id: string, text: string, ms: number, done?: () => void) {
      const node = g(id);
      if (!node) return;
      let i = 0;
      node.style.opacity = '1';
      const tick = () => {
        if (!alive()) return;
        node.textContent = text.slice(0, i) + (i < text.length ? '|' : '');
        if (i++ < text.length) setTimeout(tick, ms);
        else { node.textContent = text; done?.(); }
      };
      tick();
    }

    function animDot(id: string, pts: [number, number][], dur: number, done?: () => void) {
      const dot = g(id);
      if (!dot) return;
      dot.setAttribute('opacity', '1');
      let t0: number | null = null;
      const frame = (ts: number) => {
        if (!alive()) return;
        if (!t0) t0 = ts;
        const t = Math.min((ts - t0) / dur, 1);
        const [x, y] = bezier4(pts, easeInOut(t));
        dot.setAttribute('cx', String(x));
        dot.setAttribute('cy', String(y));
        dot.setAttribute(
          'opacity',
          String(t < 0.08 ? t / 0.08 : t > 0.88 ? (1 - t) / 0.12 : 1),
        );
        if (t < 1) requestAnimationFrame(frame);
        else { dot.setAttribute('opacity', '0'); done?.(); }
      };
      requestAnimationFrame(frame);
    }

    function pulseRing(done?: () => void) {
      const ring = g('b-ring');
      if (!ring) return;
      let t0: number | null = null;
      const frame = (ts: number) => {
        if (!alive()) return;
        if (!t0) t0 = ts;
        const t = Math.min((ts - t0) / 600, 1);
        ring.setAttribute('r', String(40 + t * 18));
        ring.setAttribute('opacity', String(0.55 * (1 - t)));
        if (t < 1) requestAnimationFrame(frame);
        else { ring.setAttribute('opacity', '0'); done?.(); }
      };
      requestAnimationFrame(frame);
    }

    function fadeIn(id: string) {
      const node = g(id);
      if (!node) return;
      node.style.transition = 'opacity 0.3s';
      node.style.opacity = '1';
    }

    function runScene() {
      if (!alive()) return;
      const sc = SCENES[idxRef.current++ % SCENES.length];

      const tlNode = g('b-tl'); if (tlNode) tlNode.textContent = sc.tl;
      const blNode = g('b-bl'); if (blNode) blNode.textContent = sc.bl;

      ['b-t1','b-t2','b-b1','b-b2','b-o1','b-o2','b-o3','b-o4'].forEach(id => {
        const node = g(id);
        if (!node) return;
        node.style.transition = 'none'; node.style.opacity = '0'; node.textContent = '';
      });
      ['b-arc1','b-arc2','b-arc3'].forEach(id => {
        const node = g(id);
        if (!node) return;
        node.style.transition = 'none'; node.style.opacity = '0';
      });
      ['b-dot1','b-dot2','b-dot3'].forEach(id => g(id)?.setAttribute('opacity', '0'));
      const ring = g('b-ring');
      if (ring) { ring.setAttribute('r', '40'); ring.setAttribute('opacity', '0'); }

      // Top card types first; bottom card starts 500ms in (concurrent feel).
      // Arc + dot sequence fires once bottom card finishes (always finishes last).
      typeText('b-t1', sc.t1, 52, () => typeText('b-t2', sc.t2, 52, undefined));
      setTimeout(() => {
        typeText('b-b1', sc.b1, 52, () => {
          typeText('b-b2', sc.b2, 52, () => {
            setTimeout(() => {
              fadeIn('b-arc1'); fadeIn('b-arc2');
              setTimeout(() => {
                let arrived = 0;
                const onArrived = () => {
                  if (++arrived < 2) return;
                  pulseRing(() => {
                    fadeIn('b-arc3');
                    setTimeout(() => {
                      animDot('b-dot3', ARC3, 820, () => {
                        setTimeout(() => {
                          typeText('b-o1', sc.out1, 40, () => {
                            typeText('b-o2', sc.out2, 40, () => {
                              typeText('b-o3', sc.out3, 40, () => {
                                typeText('b-o4', sc.out4, 40, () => {
                                  setTimeout(() => {
                                    ['b-t1','b-t2','b-b1','b-b2','b-arc1','b-arc2','b-arc3','b-o1','b-o2','b-o3','b-o4'].forEach(id => {
                                      const node = g(id);
                                      if (!node) return;
                                      node.style.transition = 'opacity 0.4s';
                                      node.style.opacity = '0';
                                    });
                                    setTimeout(() => { if (alive()) runScene(); }, 700);
                                  }, 2600);
                                });
                              });
                            });
                          });
                        }, 80);
                      });
                    }, 220);
                  });
                };
                animDot('b-dot1', ARC1, 820, onArrived);
                animDot('b-dot2', ARC2, 820, onArrived);
              }, 280);
            }, 240);
          });
        });
      }, 500);
    }

    runScene();
    return () => { activeRef.current = false; };
  }, [inView]);

  return (
    <div ref={containerRef} className="w-full">
      <svg viewBox="0 0 648 280" className="w-full h-auto" aria-hidden="true">

        {/* TOP INPUT CARD */}
        <rect x={12} y={30} width={160} height={96} rx={8}
          fill="#fafafa" stroke="#e5e7eb" strokeWidth={1.5}
          className="dark:fill-neutral-800 dark:stroke-neutral-700"
        />
        <text id="b-tl" x={24} y={50} fill="#9ca3af" fontSize={8} fontWeight={500}
          letterSpacing="0.09em" fontFamily="-apple-system,sans-serif"
          className="dark:fill-neutral-500"
        >EMAIL</text>
        <line x1={12} y1={58} x2={172} y2={58}
          stroke="#f0f0f0" strokeWidth={1} className="dark:stroke-neutral-700"
        />
        <text id="b-t1" x={24} y={76} fill="#111" fontSize={10}
          fontFamily="-apple-system,sans-serif" opacity={0}
          className="dark:fill-neutral-100"
        />
        <text id="b-t2" x={24} y={91} fill="#6b7280" fontSize={10}
          fontFamily="-apple-system,sans-serif" opacity={0}
          className="dark:fill-neutral-400"
        />

        {/* BOTTOM INPUT CARD */}
        <rect x={12} y={164} width={160} height={96} rx={8}
          fill="#fafafa" stroke="#e5e7eb" strokeWidth={1.5}
          className="dark:fill-neutral-800 dark:stroke-neutral-700"
        />
        <text id="b-bl" x={24} y={184} fill="#9ca3af" fontSize={8} fontWeight={500}
          letterSpacing="0.09em" fontFamily="-apple-system,sans-serif"
          className="dark:fill-neutral-500"
        >TRANSCRIPT</text>
        <line x1={12} y1={192} x2={172} y2={192}
          stroke="#f0f0f0" strokeWidth={1} className="dark:stroke-neutral-700"
        />
        <text id="b-b1" x={24} y={210} fill="#111" fontSize={10}
          fontFamily="-apple-system,sans-serif" opacity={0}
          className="dark:fill-neutral-100"
        />
        <text id="b-b2" x={24} y={225} fill="#6b7280" fontSize={10}
          fontFamily="-apple-system,sans-serif" opacity={0}
          className="dark:fill-neutral-400"
        />

        {/* ARC 1: top card to Claude (S-curve) */}
        <path id="b-arc1" d="M 172 78 C 231 78 231 145 290 145"
          fill="none" stroke="#d1d5db" strokeWidth={1.5} opacity={0}
          className="dark:stroke-neutral-600"
        />
        <circle id="b-dot1" r={4} fill="#111" opacity={0}
          className="dark:fill-neutral-100"
        />

        {/* ARC 2: bottom card to Claude (mirror S-curve) */}
        <path id="b-arc2" d="M 172 212 C 231 212 231 145 290 145"
          fill="none" stroke="#d1d5db" strokeWidth={1.5} opacity={0}
          className="dark:stroke-neutral-600"
        />
        <circle id="b-dot2" r={4} fill="#111" opacity={0}
          className="dark:fill-neutral-100"
        />

        {/* CLAUDE CENTER */}
        <circle id="b-ring" cx={324} cy={145} r={40}
          fill="none" stroke="#111" strokeWidth={1} opacity={0}
          className="dark:stroke-neutral-100"
        />
        <circle cx={324} cy={145} r={34} fill="#111"
          className="dark:fill-neutral-100"
        />
        <g transform="translate(303,123) scale(0.33)">
          <path
            fillRule="evenodd" clipRule="evenodd"
            d="M111.989 58.3947H128V74.9387H112V91.088H104.069V106.667H96V91.088H88.0693V106.667H80V91.088H48V106.667H39.936V91.088H32V106.667H23.9307V91.088H16V74.9333H0V58.4H16V26.6667H111.989V58.3947ZM32 58.3947H39.936V43.2107H32V58.3947ZM88.0533 58.3947H96V43.2107H88.0533V58.3947Z"
            fill="white" className="dark:fill-neutral-900"
          />
          <rect x={32} y={43} width={8} height={16} fill="#111"
            className="dark:fill-neutral-100"
          />
          <rect x={88} y={43} width={8} height={16} fill="#111"
            className="dark:fill-neutral-100"
          />
        </g>
        <text x={324} y={194} textAnchor="middle" fill="#9ca3af" fontSize={9}
          fontFamily="-apple-system,sans-serif" className="dark:fill-neutral-500"
        >Claude</text>

        {/* ARC 3: Claude to output (gentle wave) */}
        <path id="b-arc3" d="M 358 145 C 395 128 425 162 462 145"
          fill="none" stroke="#d1d5db" strokeWidth={1.5} opacity={0}
          className="dark:stroke-neutral-600"
        />
        <circle id="b-dot3" r={4} fill="#111" opacity={0}
          className="dark:fill-neutral-100"
        />

        {/* OUTPUT FRAME */}
        <rect x={462} y={83} width={174} height={124} rx={8}
          fill="#fafafa" stroke="#e5e7eb" strokeWidth={1.5}
          className="dark:fill-neutral-800 dark:stroke-neutral-700"
        />
        <text x={474} y={103} fill="#9ca3af" fontSize={8} fontWeight={500}
          letterSpacing="0.09em" fontFamily="-apple-system,sans-serif"
          className="dark:fill-neutral-500"
        >CLAUDE</text>
        <line x1={462} y1={111} x2={636} y2={111}
          stroke="#f0f0f0" strokeWidth={1} className="dark:stroke-neutral-700"
        />
        <text id="b-o1" x={474} y={128} fill="#374151" fontSize={10}
          fontFamily="-apple-system,sans-serif" opacity={0}
          className="dark:fill-neutral-300"
        />
        <text id="b-o2" x={474} y={142} fill="#374151" fontSize={10}
          fontFamily="-apple-system,sans-serif" opacity={0}
          className="dark:fill-neutral-300"
        />
        <text id="b-o3" x={474} y={156} fill="#374151" fontSize={10}
          fontFamily="-apple-system,sans-serif" opacity={0}
          className="dark:fill-neutral-300"
        />
        <text id="b-o4" x={474} y={170} fill="#374151" fontSize={10}
          fontFamily="-apple-system,sans-serif" opacity={0}
          className="dark:fill-neutral-300"
        />
      </svg>
    </div>
  );
}
