"use client";

import cn from "@/utils/class-names";

type StickyHeaderProps = {
  className?: string;
  offset?: number;
};

export default function StickyHeader({
  offset = 2,
  className,
  children,
}: React.PropsWithChildren<StickyHeaderProps>) {
  return (
    <header
      className={cn(
        "sticky top-0 z-[9999] flex items-center bg-gray-0/80 p-4 backdrop-blur-xl md:px-5 lg:px-6 dark:bg-gray-50/50",
        className
      )}
    >
      {children}
    </header>
  );
}
