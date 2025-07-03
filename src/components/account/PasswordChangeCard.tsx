"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Key, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import usePasswordRequirements from "@/src/components/common/PasswordRequirements";

interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordChangeCardProps {
  onSubmit: (data: PasswordChangeFormData) => Promise<void>;
  isLoading: boolean;
}

export function PasswordChangeCard({
  onSubmit,
  isLoading,
}: PasswordChangeCardProps) {
  const intl = useIntl();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<PasswordChangeFormData>({
    mode: "onSubmit",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async (data: PasswordChangeFormData) => {
    await onSubmit(data);
    reset();
  };

  const passwordRequirements = usePasswordRequirements(watch("newPassword"));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          <FormattedMessage
            id="Account.password.title"
            defaultMessage="Passwort ändern"
          />
        </CardTitle>
        <CardDescription>
          <FormattedMessage
            id="Account.password.description"
            defaultMessage="Stelle sicher, dass dein Konto sicher bleibt"
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">
              <FormattedMessage
                id="Account.currentPassword"
                defaultMessage="Aktuelles Passwort"
              />
            </Label>
            <Controller
              name="currentPassword"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: "Account.validation.currentPasswordRequired",
                  defaultMessage: "Aktuelles Passwort ist erforderlich",
                }),
              }}
              render={({ field }) => (
                <Input {...field} id="currentPassword" type="password" />
              )}
            />
            {errors.currentPassword && (
              <span className="text-red-500 text-sm">
                {errors.currentPassword.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">
              <FormattedMessage
                id="Account.newPassword"
                defaultMessage="Neues Passwort"
              />
            </Label>
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: "Account.validation.newPasswordRequired",
                  defaultMessage: "Neues Passwort ist erforderlich",
                }),
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: intl.formatMessage({
                    id: "Account.validation.passwordComplexity",
                    defaultMessage:
                      "Passwort muss mindestens 8 Zeichen lang sein und mindestens eine Zahl, ein Großbuchstabe, ein Kleinbuchstabe und ein Sonderzeichen enthalten",
                  }),
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="newPassword"
                  type="password"
                  className={errors.newPassword ? "border-red-500" : ""}
                />
              )}
            />
            {passwordRequirements}
            {errors.newPassword && (
              <span className="text-red-500 text-sm">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              <FormattedMessage
                id="Account.confirmPassword"
                defaultMessage="Passwort bestätigen"
              />
            </Label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: intl.formatMessage({
                  id: "Account.validation.confirmPasswordRequired",
                  defaultMessage: "Passwort-Bestätigung ist erforderlich",
                }),
              }}
              render={({ field }) => (
                <Input {...field} id="confirmPassword" type="password" />
              )}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button className="cursor-pointer" type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Key className="mr-2 h-4 w-4" />
            )}
            <FormattedMessage
              id="Account.changePassword"
              defaultMessage="Passwort ändern"
            />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
