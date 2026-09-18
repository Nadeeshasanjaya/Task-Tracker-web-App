import { Badge } from "@/components/atoms/Badge";

const map = {
  TODO: { label: "To Do", color: "gray" as const },
  IN_PROGRESS: { label: "In Progress", color: "blue" as const },
  DONE: { label: "Done", color: "green" as const },
};

export function StatusBadge({ status }: { status: keyof typeof map }) {
  const { label, color } = map[status];
  return <Badge color={color}>{label}</Badge>;
}