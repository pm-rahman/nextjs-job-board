import React from "react";

interface IBadgeProps {
  children: React.ReactNode;
}
const Badge = ({ children }: IBadgeProps) => {
  return (
    <span className="rounded border bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
      {children}
    </span>
  );
};

export default Badge;
