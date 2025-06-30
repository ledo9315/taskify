import { notFound } from "next/navigation";
import { SidebarLayout } from "@src/components/layouts/SidebarLayout";
import { Dashboard } from "@/src/components/layouts/Dashboard";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supportedLocales = ["de", "en"];
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  return (
    <SidebarLayout>
      <Dashboard />
    </SidebarLayout>
  );
}
