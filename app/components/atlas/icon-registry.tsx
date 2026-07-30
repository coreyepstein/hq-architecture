import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Blocks,
  BookOpen,
  Bot,
  Brain,
  Building2,
  Cloud,
  Clock3,
  Cpu,
  CreditCard,
  Files,
  GitBranch,
  KeyRound,
  LockKeyhole,
  MessagesSquare,
  Monitor,
  Network,
  Orbit,
  Package as PackageIcon,
  Plug,
  Radio,
  RefreshCw,
  Rocket,
  Route,
  ScanFace,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Store,
  Terminal,
  Users,
  Workflow
} from "lucide-react";

const iconRegistry: Record<string, LucideIcon> = {
  activity: Activity,
  blocks: Blocks,
  book: BookOpen,
  bot: Bot,
  brain: Brain,
  building: Building2,
  cloud: Cloud,
  cpu: Cpu,
  "credit-card": CreditCard,
  files: Files,
  fingerprint: ScanFace,
  "git-branch": GitBranch,
  history: Clock3,
  "key-round": KeyRound,
  "lock-keyhole": LockKeyhole,
  messages: MessagesSquare,
  "messages-square": MessagesSquare,
  monitor: Monitor,
  network: Network,
  orbit: Orbit,
  package: PackageIcon,
  plug: Plug,
  radio: Radio,
  refresh: RefreshCw,
  "refresh-cw": RefreshCw,
  rocket: Rocket,
  route: Route,
  "server-cog": ServerCog,
  shield: ShieldCheck,
  sparkles: Sparkles,
  store: Store,
  terminal: Terminal,
  users: Users,
  workflow: Workflow
};

interface SystemIconProps {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function SystemIcon({
  name,
  size = 18,
  strokeWidth = 1.5,
  className
}: SystemIconProps) {
  const Icon = iconRegistry[name] ?? Orbit;
  return (
    <Icon
      aria-hidden="true"
      className={className}
      size={size}
      strokeWidth={strokeWidth}
    />
  );
}
