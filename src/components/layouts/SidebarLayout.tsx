"use client";

import { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@src/components/common/AppSidebar";

interface SidebarLayoutProps {
  children: ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
