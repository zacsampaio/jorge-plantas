import { EmptyDescription, EmptyTitle, EmptyWrapper } from "./styled";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <EmptyWrapper>
      <EmptyTitle>{title}</EmptyTitle>
      {description && <EmptyDescription>{description}</EmptyDescription>}
      {action}
    </EmptyWrapper>
  );
}
