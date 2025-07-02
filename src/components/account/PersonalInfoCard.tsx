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
import { Badge } from "@/src/components/ui/badge";
import { User, Save, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import { useRef } from "react";
import {
  ProfileImageUploader,
  ProfileImageUploaderRef,
} from "./ProfileImageUploader";

interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  email: string;
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

interface PersonalInfoCardProps {
  user: User;
  onSubmit: (
    data: PersonalInfoFormData,
    image: File | null,
    removeImage: boolean
  ) => Promise<void>;
  isLoading: boolean;
}

export function PersonalInfoCard({
  user,
  onSubmit,
  isLoading,
}: PersonalInfoCardProps) {
  const intl = useIntl();
  const imageUploaderRef = useRef<ProfileImageUploaderRef>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    mode: "onSubmit",
    defaultValues: {
      firstName: user.name?.split(" ")[0] || "",
      lastName: user.name?.split(" ").slice(1).join(" ") || "",
      email: user.email || "",
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFormSubmit = async (data: PersonalInfoFormData) => {
    const image = imageUploaderRef.current?.getImage() || null;
    const shouldRemoveImage =
      imageUploaderRef.current?.getShouldRemove() || false;

    await onSubmit(data, image, shouldRemoveImage);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <FormattedMessage
            id="Account.personalInfo.title"
            defaultMessage="Persönliche Informationen"
          />
        </CardTitle>
        <CardDescription>
          <FormattedMessage
            id="Account.personalInfo.description"
            defaultMessage="Aktualisiere deine persönlichen Daten und dein Profilbild"
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <ProfileImageUploader
            ref={imageUploaderRef}
            currentImage={user.image}
            userName={user.name || ""}
            getInitials={getInitials}
          />
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={user.emailVerified ? "default" : "secondary"}>
                {user.emailVerified ? (
                  <FormattedMessage
                    id="Account.emailVerified"
                    defaultMessage="E-Mail verifiziert"
                  />
                ) : (
                  <FormattedMessage
                    id="Account.emailNotVerified"
                    defaultMessage="E-Mail nicht verifiziert"
                  />
                )}
              </Badge>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                <FormattedMessage
                  id="Account.firstName"
                  defaultMessage="Vorname"
                />
              </Label>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: intl.formatMessage({
                    id: "Account.validation.firstNameRequired",
                    defaultMessage: "Vorname ist erforderlich",
                  }),
                  minLength: {
                    value: 2,
                    message: intl.formatMessage({
                      id: "Account.validation.firstNameMinLength",
                      defaultMessage:
                        "Vorname muss mindestens 2 Zeichen lang sein",
                    }),
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="firstName"
                    placeholder={intl.formatMessage({
                      id: "Account.firstName.placeholder",
                      defaultMessage: "Max",
                    })}
                  />
                )}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                <FormattedMessage
                  id="Account.lastName"
                  defaultMessage="Nachname"
                />
              </Label>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: intl.formatMessage({
                    id: "Account.validation.lastNameRequired",
                    defaultMessage: "Nachname ist erforderlich",
                  }),
                  minLength: {
                    value: 2,
                    message: intl.formatMessage({
                      id: "Account.validation.lastNameMinLength",
                      defaultMessage:
                        "Nachname muss mindestens 2 Zeichen lang sein",
                    }),
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="lastName"
                    placeholder={intl.formatMessage({
                      id: "Account.lastName.placeholder",
                      defaultMessage: "Mustermann",
                    })}
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

          <div className="space-y-2">
            <Label htmlFor="email">
              <FormattedMessage
                id="Account.email"
                defaultMessage="E-Mail-Adresse"
              />
            </Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  disabled
                  className="bg-muted"
                />
              )}
            />
            <p className="text-xs text-muted-foreground">
              <FormattedMessage
                id="Account.email.note"
                defaultMessage="E-Mail-Adresse kann derzeit nicht geändert werden"
              />
            </p>
          </div>

          <Button className="cursor-pointer" type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            <FormattedMessage
              id="Account.saveChanges"
              defaultMessage="Änderungen speichern"
            />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
