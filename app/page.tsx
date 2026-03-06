import HeroSection from "@/app/components/sections/hero";
import WhatIsHqSection from "@/app/components/sections/what-is-hq";
import StatsBar from "@/app/components/sections/stats-bar";
import UseCasesSection from "@/app/components/sections/use-cases";
import DirectoryTreeSection from "@/app/components/sections/directory-tree";
import IndexMdSystemSection from "@/app/components/sections/index-md-system";
import CompanyIsolationSection from "@/app/components/sections/company-isolation";
import WorkerHierarchySection from "@/app/components/sections/worker-hierarchy";
import CommandCategoriesSection from "@/app/components/sections/command-categories";
import RalphLoopSection from "@/app/components/sections/ralph-loop";
import WorkerStateMachineSection from "@/app/components/sections/worker-state-machine";
import SkillExecutionSection from "@/app/components/sections/skill-execution";
import ThreadLifecycleSection from "@/app/components/sections/thread-lifecycle";
import LearningSystemSection from "@/app/components/sections/learning-system";
import KnowledgeSystemSection from "@/app/components/sections/knowledge-system";
import KnowledgeReposSection from "@/app/components/sections/knowledge-repos";
import HowItWorksSection from "@/app/components/sections/how-it-works";
import GetStartedSection from "@/app/components/sections/get-started";
import FooterSection from "@/app/components/sections/footer";

const navItems = [
  // Overview
  { id: "what-is-hq", label: "What is HQ?", group: "overview" },
  { id: "how-it-works", label: "How It Works", group: "overview" },
  { id: "use-cases", label: "Use Cases", group: "overview" },
  // Architecture
  { id: "structure", label: "Structure", group: "architecture" },
  { id: "index-system", label: "INDEX.md", group: "architecture" },
  { id: "companies", label: "Companies", group: "architecture" },
  { id: "workers", label: "Workers", group: "architecture" },
  { id: "commands", label: "Commands", group: "architecture" },
  { id: "knowledge", label: "Knowledge", group: "architecture" },
  { id: "knowledge-repos", label: "Repos", group: "architecture" },
  // Execution
  { id: "ralph", label: "Ralph Loop", group: "execution" },
  { id: "state-machine", label: "State Machine", group: "execution" },
  { id: "skills", label: "Skills", group: "execution" },
  { id: "threads", label: "Threads", group: "execution" },
  { id: "learning", label: "Learning", group: "execution" },
];

export default function Home() {
  return (
    <main className="relative">
      {/* Fixed nav dots */}
      <nav className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1 md:flex">
        {navItems.map((item, i) => {
          const prevGroup = i > 0 ? navItems[i - 1].group : null;
          const showDivider = prevGroup && prevGroup !== item.group;

          return (
            <div key={item.id}>
              {showDivider && <div className="my-1.5" />}
              <a
                href={`#${item.id}`}
                title={item.label}
                className="group flex items-center justify-end gap-2 py-0.5"
              >
                <span className="hidden rounded bg-bg-card px-2 py-1 font-mono text-[10px] text-text-muted opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
                  {item.label}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-text-muted transition-colors group-hover:bg-accent" />
              </a>
            </div>
          );
        })}
      </nav>

      {/* ─── Overview ─── */}
      <HeroSection />
      <WhatIsHqSection />
      <StatsBar />
      <HowItWorksSection />
      <UseCasesSection />

      {/* ─── Architecture ─── */}
      <DirectoryTreeSection />
      <IndexMdSystemSection />
      <CompanyIsolationSection />
      <WorkerHierarchySection />
      <CommandCategoriesSection />
      <KnowledgeSystemSection />
      <KnowledgeReposSection />

      {/* ─── Execution ─── */}
      <RalphLoopSection />
      <WorkerStateMachineSection />
      <SkillExecutionSection />
      <ThreadLifecycleSection />
      <LearningSystemSection />

      <GetStartedSection />
      <FooterSection />
    </main>
  );
}
