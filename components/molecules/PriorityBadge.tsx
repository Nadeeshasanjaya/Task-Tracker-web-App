import { Badge } from "@/components/atoms/Badge";

const map = {
  LOW: { label: "Low", color: "gray" as const },
  MEDIUM: { label: "Medium", color: "yellow" as const },
  HIGH: { label: "High", color: "red" as const },
};

export function PriorityBadge({ priority }: { priority: keyof typeof map }) {
  const { label, color } = map[priority];
  return <Badge color={color}>{label}</Badge>;
}