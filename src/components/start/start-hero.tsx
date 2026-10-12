// Static step-0 heading for /start. StartFlow reads search params, so the
// server HTML only contains its Suspense fallback; rendering this there gives
// crawlers the h1 and intro without JavaScript.
export function StartHero() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 pt-28 pb-8 text-center">
        <h1 className="font-display tracking-[-0.035em] text-display-article font-semibold text-fd-foreground leading-[1.08]">
          What do you want to make?
        </h1>
        <p className="mt-6 max-w-lg text-lead text-fd-muted-foreground leading-relaxed">
          Pick one. I&apos;ll walk you through everything from there.
        </p>
      </section>
    </main>
  );
}
