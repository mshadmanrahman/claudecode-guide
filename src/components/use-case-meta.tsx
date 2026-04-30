import { Clock, Wrench, Cpu } from 'lucide-react';

interface UseCaseMetaProps {
  time: string;
  tools: string[];
  model?: string;
}

export function UseCaseMeta({
  time,
  tools,
  model = 'Opus 4.7 or Sonnet 4.6',
}: UseCaseMetaProps) {
  return (
    <div className="not-prose my-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-fd-border py-3 text-sm text-fd-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-4 w-4" aria-hidden /> {time}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Wrench className="h-4 w-4" aria-hidden /> {tools.join(', ')}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Cpu className="h-4 w-4" aria-hidden /> {model}
      </span>
      <span className="ml-auto text-xs">
        By{' '}
        <a
          href="https://www.linkedin.com/in/shadmanrahman"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-fd-foreground hover:underline"
        >
          Shadman Rahman
        </a>
      </span>
    </div>
  );
}
