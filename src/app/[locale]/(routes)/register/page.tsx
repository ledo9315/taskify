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
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm, Controller } from "react-hook-form";
import { authClient } from "@/src/lib/auth-client";
import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { convertImageToBase64 } from "@/src/utils/imageUtils";
import { useRouter } from "next/navigation";
import usePasswordRequirements from "@/src/components/common/PasswordRequirements";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  image?: string;
  callbackUrl?: string;
}

export default function RegisterPage() {
  const { locale } = useParams();
  const intl = useIntl();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onSubmit",
  });

  const passwordRequirements = usePasswordRequirements(watch("password"));

  const onSubmit = async (formData: RegisterFormData) => {
    const { error: signupError } = await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`,
        image: image ? await convertImageToBase64(image) : "",
        callbackURL: `/${locale}/login?emailVerified=1`,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          setLoading(false);
          router.push(`/${locale}/verify-email?justRegistered=1`);
        },
      }
    );

    reset();

    if (signupError) {
      setError(signupError.message || "Registration failed");
    } else {
      setError(null);
    }
  };

  return (
    <div className="bg-background">
      <Navigation />
      <FormContainer className="md:h-[calc(100vh-64px)]" size="xl">
        <div className="flex justify-center mt-10 md:mt-20">
          <Card className="w-full max-w-lg md:max-w-md border-transparent md:border md:border-border bg-card shadow-none md:shadow-sm">
            <CardHeader>
              <CardTitle>
                <FormattedMessage
                  id="Register.title"
                  defaultMessage="Konto erstellen"
                />
              </CardTitle>
              <CardDescription>
                <FormattedMessage
                  id="Register.description"
                  defaultMessage="Gib deine Daten unten ein, um dein Konto zu erstellen"
                />
              </CardDescription>
              <CardAction>
                <Link href={`/${locale}/login`}>
                  <Button variant="link" className="cursor-pointer">
                    <FormattedMessage
                      id="Register.signInLink"
                      defaultMessage="Anmelden"
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
                        id="Register.email"
                        defaultMessage="E-Mail"
                      />
                    </Label>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: intl.formatMessage({
                          id: "Register.validation.emailRequired",
                          defaultMessage: "Email is required",
                        }),
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: intl.formatMessage({
                            id: "Register.validation.emailInvalid",
                            defaultMessage: "Invalid email address",
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

                  <div className="flex flex-col md:flex-row md:justify-between">
                    {/* First Name */}
                    <div className="grid gap-2 mb-6 md:mb-0">
                      <Label htmlFor="firstName">
                        <FormattedMessage
                          id="Register.firstName"
                          defaultMessage="Vorname"
                        />
                      </Label>
                      <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: intl.formatMessage({
                            id: "Register.validation.firstNameRequired",
                            defaultMessage: "Vorname ist erforderlich",
                          }),
                          minLength: {
                            value: 2,
                            message: intl.formatMessage({
                              id: "Register.validation.firstNameMinLength",
                              defaultMessage:
                                "Vorname muss mindestens 2 Zeichen lang sein",
                            }),
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            id="firstName"
                            type="text"
                            className={errors.firstName ? "border-red-500" : ""}
                            {...field}
                          />
                        )}
                      />
                      {errors.firstName && (
                        <span className="text-red-500 text-sm">
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">
                        <FormattedMessage
                          id="Register.lastName"
                          defaultMessage="Nachname"
                        />
                      </Label>
                      <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: intl.formatMessage({
                            id: "Register.validation.lastNameRequired",
                            defaultMessage: "Nachname ist erforderlich",
                          }),
                          minLength: {
                            value: 2,
                            message: intl.formatMessage({
                              id: "Register.validation.lastNameMinLength",
                              defaultMessage:
                                "Nachname muss mindestens 2 Zeichen lang sein",
                            }),
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            id="lastName"
                            type="text"
                            className={errors.lastName ? "border-red-500" : ""}
                            {...field}
                          />
                        )}
                      />
                      {errors.lastName && (
                        <span className="text-red-500 text-sm">
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="password">
                      <FormattedMessage
                        id="Register.password"
                        defaultMessage="Passwort"
                      />
                    </Label>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: intl.formatMessage({
                          id: "Register.validation.passwordRequired",
                          defaultMessage: "Passwort ist erforderlich",
                        }),
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: intl.formatMessage({
                            id: "Register.validation.passwordComplexity",
                            defaultMessage:
                              "Passwort muss mindestens 8 Zeichen lang sein und mindestens eine Zahl, ein Großbuchstabe, ein Kleinbuchstabe und ein Sonderzeichen enthalten",
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

                    {passwordRequirements}
                    {errors.password && (
                      <span className="text-red-500 text-sm">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">
                      <FormattedMessage
                        id="Register.confirmPassword"
                        defaultMessage="Passwort bestätigen"
                      />
                    </Label>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: intl.formatMessage({
                          id: "Register.validation.confirmPasswordRequired",
                          defaultMessage: "Passwort ist erforderlich",
                        }),
                        minLength: {
                          value: 6,
                          message: intl.formatMessage({
                            id: "Register.validation.passwordMinLength",
                            defaultMessage:
                              "Passwort muss mindestens 6 Zeichen lang sein",
                          }),
                        },
                        validate: (value) =>
                          value === watch("password") ||
                          intl.formatMessage({
                            id: "Register.validation.passwordMismatch",
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

                  {/* Profile Image */}
                  <div className="grid gap-2">
                    <Label htmlFor="image">
                      <FormattedMessage
                        id="Register.image"
                        defaultMessage="Profilbild (optional)"
                      />
                    </Label>
                    <div className="flex items-end gap-4">
                      {imagePreview && (
                        <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                          <Image
                            src={imagePreview}
                            alt="Profile preview"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2 w-full">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full"
                        />
                        {imagePreview && (
                          <X
                            className="cursor-pointer"
                            onClick={() => {
                              setImagePreview(null);
                            }}
                          />
                        )}
                      </div>
                    </div>
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
                        id="Register.registerButton"
                        defaultMessage="Registrieren"
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
              <div className="text-center py-2 mt-4 text-red-500 text-sm bg-red-500/10">
                {error}
              </div>
            )}
          </Card>
        </div>
      </FormContainer>
    </div>
  );
}
