"use client";

import { FormContainer } from "@/src/components/common/FormContainer";
import { Navigation } from "@/src/components/common/Navigation";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { authClient } from "@/src/lib/auth-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
  callbackUrl?: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const { locale } = useParams();
  const intl = useIntl();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    if (searchParams?.get("emailVerified") === "1") {
      toast.success(
        intl.formatMessage({
          id: "Login.emailVerifiedSuccess",
          defaultMessage:
            "E-Mail erfolgreich verifiziert! Du kannst dich jetzt anmelden.",
        })
      );
      window.history.replaceState({}, "", `/${locale}/login`);
    }
  }, [searchParams, intl, locale]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onSubmit",
    shouldUseNativeValidation: false,
  });

  const onSubmit = async (formData: LoginFormData) => {
    await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
        rememberMe: true,
        callbackURL: `/${locale}`,
      },
      {
        onRequest: () => {
          setLoading(true);
          setError(null);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          toast.success(
            intl.formatMessage({
              id: "Login.loginSuccess",
              defaultMessage: "Erfolgreich angemeldet!",
            })
          );
          setError(null);
        },
        onError: (ctx) => {
          // Spezielle Behandlung für Email-Verifizierungsfehler
          if (ctx.error.status === 403) {
            setError(
              intl.formatMessage({
                id: "Login.emailVerificationRequired",
                defaultMessage:
                  "Bitte verifiziere deine E-Mail-Adresse. Eine Verifizierungs-E-Mail wurde an dich gesendet.",
              })
            );
          } else if (ctx.error.status === 401) {
            setError(
              intl.formatMessage({
                id: "Login.invalidCredentials",
                defaultMessage: "Ungültige E-Mail-Adresse oder Passwort.",
              })
            );
          } else {
            setError(
              ctx.error.message ||
                intl.formatMessage({
                  id: "Login.loginFailed",
                  defaultMessage:
                    "Anmeldung fehlgeschlagen. Bitte versuche es erneut.",
                })
            );
          }
        },
      }
    );

    reset();
  };

  return (
    <div className="bg-background">
      <Navigation />
      <FormContainer className="md:h-[calc(100vh-64px)]" size="xl">
        <div className="flex justify-center mt-10 md:mt-20">
          <Card className="w-full max-w-lg md:max-w-md shadow-none border-transparent md:border md:border-border bg-card md:shadow-sm">
            <CardHeader>
              <CardTitle>
                <FormattedMessage
                  id="Login.title"
                  defaultMessage="Bei deinem Konto anmelden"
                />
              </CardTitle>
              <CardDescription>
                <FormattedMessage
                  id="Login.description"
                  defaultMessage="Gib deine E-Mail-Adresse unten ein, um dich bei deinem Konto anzumelden"
                />
              </CardDescription>
              <CardAction>
                <Link href={`/${locale}/register`}>
                  <Button className="cursor-pointer" variant="link">
                    <FormattedMessage
                      id="Login.signUpLink"
                      defaultMessage="Registrieren"
                    />
                  </Button>
                </Link>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      <FormattedMessage
                        id="Login.email"
                        defaultMessage="E-Mail"
                      />
                    </Label>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: intl.formatMessage({
                          id: "Login.validation.emailRequired",
                          defaultMessage: "Email ist erforderlich",
                        }),
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: intl.formatMessage({
                            id: "Login.validation.emailInvalid",
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

                  {/* Password */}
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">
                        <FormattedMessage
                          id="Login.password"
                          defaultMessage="Passwort"
                        />
                      </Label>
                      <Link
                        href={`/${locale}/forgot-password`}
                        className="text-sm underline cursor-pointer"
                      >
                        <FormattedMessage
                          id="Login.ForgotPassword"
                          defaultMessage="Passwort vergessen?"
                        />
                      </Link>
                    </div>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: intl.formatMessage({
                          id: "Login.validation.passwordRequired",
                          defaultMessage: "Passwort ist erforderlich",
                        }),
                        minLength: {
                          value: 6,
                          message: intl.formatMessage({
                            id: "Login.validation.passwordMinLength",
                            defaultMessage:
                              "Passwort muss mindestens 6 Zeichen lang sein",
                          }),
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          id="password"
                          type="password"
                          className={errors.password ? "border-red-500" : ""}
                          {...field}
                        />
                      )}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-sm">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Checkbox
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked === true)
                      }
                      id="rememberMe"
                    />
                    <Label htmlFor="rememberMe">
                      <FormattedMessage
                        id="Login.rememberMe"
                        defaultMessage="Angemeldet bleiben"
                      />
                    </Label>
                  </div>
                </div>
                <CardFooter className="flex-col gap-2 px-0 pt-6">
                  <Button
                    type="submit"
                    className="w-full cursor-pointer h-12 md:h-10"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <FormattedMessage
                        id="Login.loginButton"
                        defaultMessage="Anmelden"
                      />
                    )}
                  </Button>
                  <Button
                    disabled={loading}
                    onClick={async () => {
                      await authClient.signIn.social(
                        {
                          provider: "google",
                          callbackURL: `/${locale}`,
                        },
                        {
                          onRequest: () => {
                            setLoading(true);
                          },
                          onResponse: () => {
                            setLoading(false);
                          },
                        }
                      );
                    }}
                    variant="outline"
                    className="w-full cursor-pointer h-12 md:h-10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="0.98em"
                      height="1em"
                      viewBox="0 0 256 262"
                    >
                      <path
                        fill="#4285F4"
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                      ></path>
                      <path
                        fill="#EB4335"
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      ></path>
                    </svg>
                    <FormattedMessage
                      id="Login.loginWithGoogle"
                      defaultMessage="Mit Google anmelden"
                    />
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
            {error && (
              <div className="text-center py-2 mt-4 text-red-500 text-sm bg-red-500/10 rounded-md">
                {error}
                {error.includes("verifiziere") && (
                  <div className="mt-2">
                    <Link
                      href={`/${locale}/verify-email`}
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      <FormattedMessage
                        id="Login.resendVerification"
                        defaultMessage="Verifizierungs-E-Mail erneut senden"
                      />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </FormContainer>
    </div>
  );
}
