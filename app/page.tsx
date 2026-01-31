import HeroSection from "@/app/components/sections/hero";
import StatsBar from "@/app/components/sections/stats-bar";
import DirectoryTreeSection from "@/app/components/sections/directory-tree";
import CompanyIsolationSection from "@/app/components/sections/company-isolation";
import WorkerHierarchySection from "@/app/components/sections/worker-hierarchy";
import CommandCategoriesSection from "@/app/components/sections/command-categories";
import RalphLoopSection from "@/app/components/sections/ralph-loop";
import WorkerStateMachineSection from "@/app/components/sections/worker-state-machine";
import SkillExecutionSection from "@/app/components/sections/skill-execution";
import ThreadLifecycleSection from "@/app/components/sections/thread-lifecycle";
import KnowledgeSystemSection from "@/app/components/sections/knowledge-system";
import FooterSection from "@/app/components/sections/footer";

export default function Home() {
  return (
    <main className="relative">
      {/* Fixed nav dots */}
      <nav className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {[
          { id: "structure", label: "Structure" },
          { id: "companies", label: "Companies" },
          { id: "workers", label: "Workers" },
          { id: "commands", label: "Commands" },
          { id: "ralph", label: "Ralph Loop" },
          { id: "state-machine", label: "State Machine" },
          { id: "skills", label: "Skills" },
          { id: "threads", label: "Threads" },
          { id: "knowledge", label: "Knowledge" },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            title={item.label}
            className="group flex items-center justify-end gap-2"
          >
            <span className="hidden rounded bg-bg-card px-2 py-1 font-mono text-[10px] text-text-muted opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
              {item.label}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-text-muted transition-colors group-hover:bg-accent" />
          </a>
        ))}
      </nav>

      <HeroSection />
      <StatsBar />
      <DirectoryTreeSection />
      <CompanyIsolationSection />
      <WorkerHierarchySection />
      <CommandCategoriesSection />
      <RalphLoopSection />
      <WorkerStateMachineSection />
      <SkillExecutionSection />
      <ThreadLifecycleSection />
      <KnowledgeSystemSection />
      <FooterSection />
    </main>
  );
}
