"use client";

import { FormContainer } from "@/src/components/common/FormContainer";
import { Navigation } from "@/src/components/common/Navigation";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { authClient } from "@/src/lib/auth-client";
import { Loader2, Mail, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

interface VerifyEmailFormData {
  email: string;
}

export default function VerifyEmailPage() {
  const { locale } = useParams();
  const intl = useIntl();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VerifyEmailFormData>({
    mode: "onSubmit",
    shouldUseNativeValidation: false,
  });

  const justRegistered = searchParams?.get("justRegistered") === "1";

  const onSubmit = async (formData: VerifyEmailFormData) => {
    setIsLoading(true);
    setMessage("");
    try {
      await authClient.sendVerificationEmail({
        email: formData.email,
        callbackURL: `/${locale}/login?emailVerified=1`,
      });
      setMessage(
        intl.formatMessage({
          id: "VerifyEmail.success",
          defaultMessage: "Verifizierungs-E-Mail wurde erfolgreich gesendet!",
        })
      );
      setIsSuccess(true);
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : intl.formatMessage({
              id: "VerifyEmail.error",
              defaultMessage:
                "Fehler beim Senden der E-Mail. Bitte versuche es erneut.",
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
                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>
                <FormattedMessage
                  id="VerifyEmail.title"
                  defaultMessage="E-Mail verifizieren"
                />
              </CardTitle>
              <CardDescription>
                {justRegistered ? (
                  <FormattedMessage
                    id="VerifyEmail.justRegisteredDescription"
                    defaultMessage="Wir haben dir eine E-Mail geschickt. Bitte bestätige deine Adresse über den Link in der E-Mail, um deinen Account zu aktivieren."
                  />
                ) : (
                  <FormattedMessage
                    id="VerifyEmail.description"
                    defaultMessage="Gib deine E-Mail-Adresse ein, um eine neue Verifizierungs-E-Mail zu erhalten."
                  />
                )}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {justRegistered && !showForm ? (
                <div className="text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      <FormattedMessage
                        id="VerifyEmail.successTitle"
                        defaultMessage="E-Mail gesendet!"
                      />
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="VerifyEmail.successDescription"
                        defaultMessage="Prüfe dein E-Mail-Postfach und klicke auf den Verifizierungslink."
                      />
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={() => setShowForm(true)}
                  >
                    <FormattedMessage
                      id="VerifyEmail.resendButton"
                      defaultMessage="Verifizierungs-E-Mail erneut senden"
                    />
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      <FormattedMessage
                        id="VerifyEmail.email"
                        defaultMessage="E-Mail-Adresse"
                      />
                    </Label>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: intl.formatMessage({
                          id: "VerifyEmail.validation.emailRequired",
                          defaultMessage: "E-Mail-Adresse ist erforderlich",
                        }),
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: intl.formatMessage({
                            id: "VerifyEmail.validation.emailInvalid",
                            defaultMessage: "Ungültige E-Mail-Adresse",
                          }),
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          className={errors.email ? "border-red-500" : ""}
                          {...field}
                        />
                      )}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        <FormattedMessage
                          id="VerifyEmail.sending"
                          defaultMessage="Wird gesendet..."
                        />
                      </>
                    ) : (
                      <FormattedMessage
                        id="VerifyEmail.sendButton"
                        defaultMessage="Verifizierungs-E-Mail senden"
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

              <div className="mt-6 text-center">
                <Link
                  href={`/${locale}/login`}
                  className="text-sm text-blue-600 hover:text-blue-500 underline"
                >
                  <FormattedMessage
                    id="VerifyEmail.backToLogin"
                    defaultMessage="Zurück zur Anmeldung"
                  />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </FormContainer>
    </div>
  );
}
