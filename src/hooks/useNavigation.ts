import { useRouter } from "next/navigation";
import { use } from "react";

export const useNavigation = (params?: Promise<{ locale: string }>) => {
  const router = useRouter();
  const locale = params ? use(params).locale : "de"; // fallback

  const navigateTo = (path: string) => {
    router.push(`/${locale}${path}`);
  };

  const backToDashboard = () => {
    router.push(`/${locale}`);
  };

  const backToLanding = () => {
    router.push(`/${locale}/landing`);
  };

  return {
    navigateTo,
    backToDashboard,
    backToLanding,
    locale,
  };
};
