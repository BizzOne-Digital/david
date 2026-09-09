import { getLucideIcon } from "@/lib/utils/icons";

interface DynamicLucideIconProps {
  name: string;
  className?: string;
}

export function DynamicLucideIcon({ name, className }: DynamicLucideIconProps) {
  const Icon = getLucideIcon(name);
  return <Icon className={className} />;
}
