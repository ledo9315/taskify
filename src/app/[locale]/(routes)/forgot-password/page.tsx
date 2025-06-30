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
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const { locale } = useParams();
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    mode: "onSubmit",
    shouldUseNativeValidation: false,
  });

  const onSubmit = async (formData: ForgotPasswordFormData) => {
    setIsLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          redirectTo: `/${locale}/reset-password`,
        }),
      });

      if (!res.ok) {
        let errorMessage = "Ein unbekannter Fehler ist aufgetreten.";
        try {
          const body = await res.json();
          errorMessage = body?.error?.message || res.statusText;
        } catch {
          errorMessage = res.statusText;
        }
        throw new Error(errorMessage);
      }

      setMessage(
        intl.formatMessage({
          id: "ForgotPassword.success",
          defaultMessage:
            "Wenn die E-Mail existiert, wurde eine Nachricht zum Zurücksetzen des Passworts gesendet.",
        })
      );
      setIsSuccess(true);
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : intl.formatMessage({
              id: "ForgotPassword.error",
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
                  id="ForgotPassword.title"
                  defaultMessage="Passwort vergessen?"
                />
              </CardTitle>
              <CardDescription>
                <FormattedMessage
                  id="ForgotPassword.description"
                  defaultMessage="Gib deine E-Mail-Adresse ein, um dein Passwort zurückzusetzen."
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      <FormattedMessage
                        id="ForgotPassword.successTitle"
                        defaultMessage="E-Mail gesendet!"
                      />
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="ForgotPassword.success"
                        defaultMessage="Wenn die E-Mail existiert, wurde eine Nachricht zum Zurücksetzen des Passworts gesendet."
                      />
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      <FormattedMessage
                        id="ForgotPassword.email"
                        defaultMessage="E-Mail-Adresse"
                      />
                    </Label>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: intl.formatMessage({
                          id: "ForgotPassword.validation.emailRequired",
                          defaultMessage: "E-Mail-Adresse ist erforderlich",
                        }),
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: intl.formatMessage({
                            id: "ForgotPassword.validation.emailInvalid",
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
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        <FormattedMessage
                          id="ForgotPassword.sending"
                          defaultMessage="Wird gesendet..."
                        />
                      </>
                    ) : (
                      <FormattedMessage
                        id="ForgotPassword.sendButton"
                        defaultMessage="Passwort-Reset senden"
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
                    id="ForgotPassword.backToLogin"
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
