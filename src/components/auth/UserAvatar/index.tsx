import { AvatarCircle } from "./styled";

interface UserAvatarProps {
  name: string;
  size?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function UserAvatar({ name, size }: UserAvatarProps) {
  return (
    <AvatarCircle $size={size} aria-hidden="true">
      {getInitials(name)}
    </AvatarCircle>
  );
}
