'use client';

// Adapted from uselayouts.com "Get In Touch" (MIT, (c) 2025 Urvish Mali).
// Restyled to the glass surface and the one-accent rule in DESIGN.md.

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { type ComponentProps, type ReactNode, useEffect, useRef, useState } from 'react';

const END_STATE_DELAY_MS = 460;
const CLUSTER_CENTER_X = 32;
const HOVER_TEXT_DELAY = 0.2;

const textTransition = { duration: 0.24, ease: [0.2, 0, 0, 1] } as const;
const avatarSpring = { type: 'spring', stiffness: 460, damping: 26, mass: 0.8 } as const;
const mergeSpring = { type: 'spring', stiffness: 540, damping: 32 } as const;
const slideSpring = { type: 'spring', stiffness: 360, damping: 17, mass: 0.9 } as const;

type Phase = 'idle' | 'start' | 'end';

type SayHiPillProps = Omit<ComponentProps<typeof Link>, 'children' | 'aria-label'> & {
  imageSrc?: string;
  defaultText?: string;
  hoverText?: string;
  /** Replaces the plain text label at rest (for example a photo and name). */
  idle?: ReactNode;
  /** Layout classes for the resting layer. Defaults to a centered label. */
  idleClassName?: string;
  /** Accessible name when `idle` is used. */
  label?: string;
};

export function SayHiPill({
  imageSrc = '/shadman.jpg',
  defaultText = 'Say hi',
  hoverText = "Let's talk",
  idle,
  idleClassName = 'justify-center text-[15px]',
  label,
  className = '',
  ...linkProps
}: SayHiPillProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const phaseRef = useRef<Phase>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const reduce = useReducedMotion();

  const update = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };
  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };
  const start = () => {
    if (phaseRef.current !== 'idle') return;
    clearTimer();
    if (reduce) return update('end');
    update('start');
    timerRef.current = setTimeout(() => {
      update('end');
      timerRef.current = null;
    }, END_STATE_DELAY_MS);
  };
  const end = () => {
    if (hoveredRef.current || focusedRef.current) return;
    clearTimer();
    update('idle');
  };

  useEffect(() => clearTimer, []);

  const active = phase !== 'idle';
  const isEnd = phase === 'end';
  const withMotion = <T extends object>(t: T) => (reduce ? ({ duration: 0 } as const) : t);

  return (
    <Link
      {...linkProps}
      aria-label={label ?? defaultText}
      data-phase={phase}
      onMouseEnter={() => {
        hoveredRef.current = true;
        start();
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        end();
      }}
      onFocus={() => {
        focusedRef.current = true;
        start();
      }}
      onBlur={() => {
        focusedRef.current = false;
        end();
      }}
      className={`relative isolate inline-block h-12 w-44 shrink-0 overflow-hidden rounded-full border border-[var(--line)] bg-[var(--glass2)] text-fd-foreground no-underline backdrop-blur-[16px] backdrop-saturate-[1.2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] active:scale-[0.98] ${className}`}
    >
      <motion.span
        initial={false}
        aria-hidden="true"
        className={`absolute inset-0 flex items-center font-medium leading-none ${idleClassName}`}
        animate={{
          opacity: active ? 0 : 1,
          y: active ? -28 : 0,
          filter: active ? 'blur(4px)' : 'blur(0px)',
        }}
        transition={withMotion(textTransition)}
      >
        {idle ?? defaultText}
      </motion.span>

      <motion.span
        initial={false}
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-start gap-0 pl-1.5 text-sm font-medium leading-none opacity-0"
        animate={{ opacity: active ? 1 : 0 }}
        transition={withMotion(textTransition)}
      >
        <motion.span
          initial={false}
          className="flex shrink-0 items-center justify-center"
          animate={{ x: isEnd ? 0 : CLUSTER_CENTER_X }}
          transition={withMotion(slideSpring)}
        >
          <motion.span
            initial={false}
            className="relative z-0 block size-9 shrink-0 overflow-hidden rounded-full"
            animate={{
              opacity: active ? 1 : 0,
              rotate: active ? 0 : -180,
              x: active ? 0 : -40,
            }}
            transition={withMotion({ ...avatarSpring, delay: active ? 0.04 : 0 })}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt=""
              draggable={false}
              className="absolute inset-0 size-full object-cover"
            />
          </motion.span>

          <motion.span
            initial={false}
            className="block overflow-hidden text-center text-base"
            animate={{
              opacity: active && !isEnd ? 1 : 0,
              scale: active && !isEnd ? 1 : 0.6,
              width: active && !isEnd ? 18 : 0,
              marginLeft: active && !isEnd ? 8 : 0,
              marginRight: active && !isEnd ? 8 : 0,
            }}
            transition={withMotion({
              ...mergeSpring,
              opacity: textTransition,
              delay: active && !isEnd ? 0.14 : 0,
            })}
          >
            +
          </motion.span>

          <motion.span
            initial={false}
            className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--acc)] text-[11px] font-semibold text-[var(--accInk)]"
            animate={{
              opacity: active ? 1 : 0,
              rotate: active ? 0 : 180,
              x: active ? 0 : 40,
              marginLeft: isEnd ? -10 : 0,
            }}
            transition={withMotion({
              ...avatarSpring,
              marginLeft: mergeSpring,
              delay: active && !isEnd ? 0.1 : 0,
            })}
          >
            YOU
          </motion.span>
        </motion.span>

        <motion.span
          initial={false}
          className="block overflow-hidden whitespace-nowrap"
          animate={{
            width: isEnd ? 'auto' : 0,
            marginLeft: isEnd ? 10 : 0,
            opacity: isEnd ? 1 : 0,
          }}
          transition={withMotion({
            width: { ...textTransition, delay: isEnd ? HOVER_TEXT_DELAY : 0 },
            marginLeft: { ...textTransition, delay: isEnd ? HOVER_TEXT_DELAY : 0 },
            opacity: { ...textTransition, delay: isEnd ? HOVER_TEXT_DELAY : 0 },
          })}
        >
          {hoverText}
        </motion.span>
      </motion.span>
    </Link>
  );
}
