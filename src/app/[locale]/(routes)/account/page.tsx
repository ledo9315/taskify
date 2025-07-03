"use client";

import { FormContainer } from "@/src/components/common/FormContainer";
import { Navigation } from "@/src/components/common/Navigation";
import { Loader2, LogOut } from "lucide-react";
import { useState, useEffect, use } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "sonner";
import { convertImageToBase64 } from "@/src/utils/imageUtils";
import { authClient } from "@/src/lib/auth-client";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { PersonalInfoCard, PasswordChangeCard } from "@/src/components/account";
import { BackToDashboardButton } from "@/src/components/ui/back-to-dashboard";

interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Session {
  user: User;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
}

export default function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const intl = useIntl();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const sessionData = await authClient.getSession();
      if (sessionData.data) {
        setSession(sessionData.data as Session);
      }
    };
    getSession();
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
      router.push(`/${locale}/login`);
    } catch {
      toast.error(
        intl.formatMessage({
          id: "Account.signOutError",
          defaultMessage: "Fehler beim Abmelden",
        })
      );
    } finally {
      setIsSigningOut(false);
    }
  };

  const handlePersonalInfoSubmit = async (
    formData: PersonalInfoFormData,
    image: File | null,
    shouldRemoveImage: boolean
  ) => {
    setIsLoading(true);
    try {
      const updateData: Record<string, string> = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
      };

      if (image) {
        updateData.image = await convertImageToBase64(image);
      } else if (shouldRemoveImage) {
        updateData.image = "";
      }

      const { error } = await authClient.updateUser(updateData);

      if (error) {
        toast.error(
          intl.formatMessage({
            id: "Account.updateError",
            defaultMessage: "Fehler beim Aktualisieren der Daten",
          })
        );
      } else {
        toast.success(
          intl.formatMessage({
            id: "Account.updateSuccess",
            defaultMessage: "Daten erfolgreich aktualisiert",
          })
        );
        // Refresh session
        const sessionData = await authClient.getSession();
        if (sessionData.data) {
          setSession(sessionData.data as Session);
        }
      }
    } catch {
      toast.error(
        intl.formatMessage({
          id: "Account.updateError",
          defaultMessage: "Fehler beim Aktualisieren der Daten",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChangeSubmit = async (
    formData: PasswordChangeFormData
  ) => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error(
        intl.formatMessage({
          id: "Account.passwordMismatch",
          defaultMessage: "Passwörter stimmen nicht überein",
        })
      );
      return;
    }

    setIsPasswordLoading(true);
    try {
      const { error } = await authClient.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (error) {
        toast.error(
          intl.formatMessage({
            id: "Account.passwordChangeError",
            defaultMessage: "Fehler beim Ändern des Passworts",
          })
        );
      } else {
        toast.success(
          intl.formatMessage({
            id: "Account.passwordChangeSuccess",
            defaultMessage: "Passwort erfolgreich geändert",
          })
        );
      }
    } catch {
      toast.error(
        intl.formatMessage({
          id: "Account.passwordChangeError",
          defaultMessage: "Fehler beim Ändern des Passworts",
        })
      );
    } finally {
      setIsPasswordLoading(false);
    }
  };

  if (!session) {
    return (
      <FormContainer size="lg">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </FormContainer>
    );
  }

  return (
    <FormContainer size="lg">
      <Navigation />
      <div className="space-y-6 max-w-4xl mx-auto py-20">
        <div className="flex justify-between items-center mb-6">
          <BackToDashboardButton />
          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex items-center gap-2 cursor-pointer"
          >
            {isSigningOut ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <LogOut size={16} />
            )}
            <FormattedMessage id="Account.signOut" defaultMessage="Abmelden" />
          </Button>
        </div>

        <h1 className="sr-only">
          <FormattedMessage id="Account.title" defaultMessage="Mein Konto" />
        </h1>

        <PersonalInfoCard
          user={session.user}
          onSubmit={handlePersonalInfoSubmit}
          isLoading={isLoading}
        />

        <PasswordChangeCard
          onSubmit={handlePasswordChangeSubmit}
          isLoading={isPasswordLoading}
        />
      </div>
    </FormContainer>
  );
}
