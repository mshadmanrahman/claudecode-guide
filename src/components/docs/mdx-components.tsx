import type { ComponentProps } from "react";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { ClaudeCodeMock } from "@/components/claude-code-mock";
import { AppSessionMock } from "@/components/docs/app-session-mock";
import { ModelPickerMock } from "@/components/docs/model-picker-mock";
import { VocabBridge } from "@/components/vocab-bridge";
import { DocCallout } from "@/components/docs/doc-callout";
import { DocPre } from "@/components/docs/doc-pre";
import { PromptCard } from "@/components/prompt-card";
import { FromClaude } from "@/components/from-claude";
import { UseCaseMeta } from "@/components/use-case-meta";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { AuthorBio } from "@/components/author-bio";
import { UseCaseWalkthrough } from "@/components/use-case-walkthrough";
import {
  ProjectFolderIllustration,
  PromptComposerIllustration,
  ClaudeQuestionsIllustration,
  FileWrittenIllustration,
  FileEditingIllustration,
  ClaudeKnowsIllustration,
  CalendarEventIllustration,
  MultiSourcePullIllustration,
  BriefDocumentIllustration,
  SkimOnPhoneIllustration,
  PreparedReadyIllustration,
  AntiSycophancyHero,
} from "@/components/illustrations";
import {
  MemoryRouterDiagram,
  EveryTurnTaxDiagram,
  MoreFilesTrapDiagram,
  ClaudeMdRouterDiagram,
  IsolationWallsDiagram,
  FiveCLoopDiagram,
  CheckPanelDiagram,
  PersonaFlowDiagram,
  PromptCachePrefixDiagram,
  EnvVarScopesDiagram,
  ReleaseCheckDiagram,
} from "@/components/docs/doc-diagrams";

const DefaultImg = defaultMdxComponents.img;

/** A page's opening hero.png is its LCP element, so it loads eagerly at high priority. */
function DocImg(props: ComponentProps<typeof DefaultImg>) {
  const src = typeof props.src === "string" ? props.src : (props.src as { src?: string } | undefined)?.src ?? "";
  if (!/\/hero\.[^/]+$/.test(src)) return <DefaultImg {...props} />;
  return <DefaultImg {...props} loading="eager" fetchPriority="high" />;
}

/** MDX component map for docs pages. The English and Bangla docs routes both render with it. */
export const mdxComponents = {
  ...defaultMdxComponents,
  img: DocImg,
  pre: DocPre,
  Callout: DocCallout,
  // Scripted sessions render in the desktop app by default; TerminalMock keeps the CLI look.
  ClaudeCodeMock: AppSessionMock,
  TerminalMock: ClaudeCodeMock,
  ModelPickerMock,
  VocabBridge,
  PromptCard,
  FromClaude,
  UseCaseMeta,
  YouTubeEmbed,
  AuthorBio,
  UseCaseWalkthrough,
  ProjectFolderIllustration,
  PromptComposerIllustration,
  ClaudeQuestionsIllustration,
  FileWrittenIllustration,
  FileEditingIllustration,
  ClaudeKnowsIllustration,
  CalendarEventIllustration,
  MultiSourcePullIllustration,
  BriefDocumentIllustration,
  SkimOnPhoneIllustration,
  PreparedReadyIllustration,
  AntiSycophancyHero,
  MemoryRouterDiagram,
  EveryTurnTaxDiagram,
  MoreFilesTrapDiagram,
  ClaudeMdRouterDiagram,
  IsolationWallsDiagram,
  FiveCLoopDiagram,
  CheckPanelDiagram,
  PersonaFlowDiagram,
  PromptCachePrefixDiagram,
  EnvVarScopesDiagram,
  ReleaseCheckDiagram,
};
