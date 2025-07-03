import { useIntl } from "react-intl";

const usePasswordRequirements = (password: string) => {
  const intl = useIntl();
  const getPasswordRequirements = () => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return {
      minLength: password.length >= minLength,
      hasNumber,
      hasUppercase,
      hasLowercase,
      hasSpecialChar,
    };
  };

  const passwordRequirements = [
    {
      key: "minLength",
      label: intl.formatMessage({
        id: "Account.passwordRequirements.minLength",
        defaultMessage: "Mindestens 8 Zeichen",
      }),
      isValid: (reqs: ReturnType<typeof getPasswordRequirements>) =>
        reqs.minLength,
    },
    {
      key: "hasNumber",
      label: intl.formatMessage({
        id: "Account.passwordRequirements.hasNumber",
        defaultMessage: "Mindestens eine Zahl",
      }),
      isValid: (reqs: ReturnType<typeof getPasswordRequirements>) =>
        reqs.hasNumber,
    },
    {
      key: "hasUppercase",
      label: intl.formatMessage({
        id: "Account.passwordRequirements.hasUppercase",
        defaultMessage: "Mindestens ein Großbuchstabe",
      }),
      isValid: (reqs: ReturnType<typeof getPasswordRequirements>) =>
        reqs.hasUppercase,
    },
    {
      key: "hasLowercase",
      label: intl.formatMessage({
        id: "Account.passwordRequirements.hasLowercase",
        defaultMessage: "Mindestens ein Kleinbuchstabe",
      }),
      isValid: (reqs: ReturnType<typeof getPasswordRequirements>) =>
        reqs.hasLowercase,
    },
    {
      key: "hasSpecialChar",
      label: intl.formatMessage({
        id: "Account.passwordRequirements.hasSpecialChar",
        defaultMessage: "Mindestens ein Sonderzeichen",
      }),
      isValid: (reqs: ReturnType<typeof getPasswordRequirements>) =>
        reqs.hasSpecialChar,
    },
  ];

  return (
    <>
      {password && (
        <div className="flex gap-1 flex-wrap">
          {passwordRequirements.map((requirement) => {
            const isValid = requirement.isValid(getPasswordRequirements());

            return !isValid ? (
              <span
                key={requirement.key}
                className="p-1 bg-secondary text-xs rounded-sm"
              >
                {requirement.label}
              </span>
            ) : null;
          })}
        </div>
      )}
    </>
  );
};

export default usePasswordRequirements;
