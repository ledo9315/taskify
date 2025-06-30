"use client";

import { FormContainer } from "@/src/components/common/FormContainer";
import { Navigation } from "@/src/components/common/Navigation";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { authClient } from "@/src/lib/auth-client";
import { Loader2, KeyRound, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const { locale } = useParams();
  const searchParams = useSearchParams();
  const intl = useIntl();

  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams?.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setMessage(
        intl.formatMessage({
          id: "ResetPassword.error.noToken",
          defaultMessage:
            "Kein gültiger Token gefunden. Bitte fordere einen neuen Link an.",
        })
      );
    }
  }, [searchParams, intl]);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    mode: "onSubmit",
    shouldUseNativeValidation: false,
  });

  const onSubmit = async (formData: ResetPasswordFormData) => {
    if (!token) return;

    setIsLoading(true);
    setMessage("");

    try {
      const { error } = await authClient.resetPassword({
        newPassword: formData.newPassword,
        token,
      });

      if (error) {
        throw new Error(error.message);
      }

      setMessage(
        intl.formatMessage({
          id: "ResetPassword.success",
          defaultMessage: "Dein Passwort wurde erfolgreich zurückgesetzt.",
        })
      );
      setIsSuccess(true);
      setTimeout(() => router.push(`/${locale}/login`), 3000); // Redirect nach 3 Sekunden
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : intl.formatMessage({
              id: "ResetPassword.error.general",
              defaultMessage:
                "Fehler beim Zurücksetzen des Passworts. Der Link könnte abgelaufen sein.",
            })
      );
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background flex flex-col">
      <Navigation />
      <FormContainer className="h-[calc(100vh-64px)]" size="xl">
        <div className="flex items-center justify-center h-full">
          <Card className="w-full max-w-md mb-20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <KeyRound className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>
                <FormattedMessage
                  id="ResetPassword.title"
                  defaultMessage="Passwort zurücksetzen"
                />
              </CardTitle>
              <CardDescription>
                <FormattedMessage
                  id="ResetPassword.description"
                  defaultMessage="Gib dein neues Passwort ein."
                />
              </CardDescription>
            </CardHeader>

            <CardContent>
              {isSuccess ? (
                <div className="text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      <FormattedMessage
                        id="ResetPassword.successTitle"
                        defaultMessage="Passwort zurückgesetzt!"
                      />
                    </h3>
                    <p className="text-sm text-muted-foreground">{message}</p>
                    <p className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="ResetPassword.redirecting"
                        defaultMessage="Du wirst in Kürze weitergeleitet..."
                      />
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">
                      <FormattedMessage
                        id="ResetPassword.newPassword"
                        defaultMessage="Neues Passwort"
                      />
                    </Label>
                    <Controller
                      name="newPassword"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: intl.formatMessage({
                          id: "ResetPassword.validation.passwordRequired",
                          defaultMessage:
                            "Ein neues Passwort ist erforderlich.",
                        }),
                        minLength: {
                          value: 8,
                          message: intl.formatMessage({
                            id: "ResetPassword.validation.passwordLength",
                            defaultMessage:
                              "Das Passwort muss mindestens 8 Zeichen lang sein.",
                          }),
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          id="newPassword"
                          type="password"
                          className={errors.newPassword ? "border-red-500" : ""}
                          {...field}
                        />
                      )}
                    />
                    {errors.newPassword && (
                      <span className="text-red-500 text-sm">
                        {errors.newPassword.message}
                      </span>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">
                      <FormattedMessage
                        id="ResetPassword.confirmPassword"
                        defaultMessage="Passwort bestätigen"
                      />
                    </Label>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: intl.formatMessage({
                          id: "ResetPassword.validation.confirmPasswordRequired",
                          defaultMessage:
                            "Passwortbestätigung ist erforderlich.",
                        }),
                        validate: (value) =>
                          value === watch("newPassword") ||
                          intl.formatMessage({
                            id: "ResetPassword.validation.passwordMismatch",
                            defaultMessage: "Passwörter stimmen nicht überein",
                          }),
                      }}
                      render={({ field }) => (
                        <Input
                          id="confirmPassword"
                          type="password"
                          className={
                            errors.confirmPassword ? "border-red-500" : ""
                          }
                          {...field}
                        />
                      )}
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500 text-sm">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !token}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        <FormattedMessage
                          id="ResetPassword.saving"
                          defaultMessage="Wird gespeichert..."
                        />
                      </>
                    ) : (
                      <FormattedMessage
                        id="ResetPassword.saveButton"
                        defaultMessage="Neues Passwort speichern"
                      />
                    )}
                  </Button>
                </form>
              )}

              {message && !isSuccess && (
                <div className="mt-4 p-3 rounded-md bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {message}
                  </p>
                </div>
              )}

              {!isSuccess && (
                <div className="mt-6 text-center">
                  <Link
                    href={`/${locale}/login`}
                    className="text-sm text-blue-600 hover:text-blue-500 underline"
                  >
                    <FormattedMessage
                      id="ResetPassword.backToLogin"
                      defaultMessage="Zurück zur Anmeldung"
                    />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </FormContainer>
    </div>
  );
}
