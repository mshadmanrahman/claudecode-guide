import { Folder } from 'lucide-react';

export function ProjectFolderIllustration() {
  return (
    <div className="font-mono text-xs text-fd-muted-foreground">
      <div className="flex items-center gap-2 text-fd-foreground">
        <Folder className="h-4 w-4" /> your-project
      </div>
      <div className="ml-5 mt-2 space-y-1">
        <div>├ package.json</div>
        <div>├ README.md</div>
        <div>├ src/</div>
        <div>└ app/</div>
      </div>
    </div>
  );
}
