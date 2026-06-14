import { forwardRef, type InputHTMLAttributes } from "react";

type AuthInputVariant = "registration" | "login";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  /** Controls the BEM-style class prefix so the field matches its surrounding form. */
  variant?: AuthInputVariant;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, variant = "registration", type = "text", ...rest }, ref) => {
    const prefix = `_social_${variant}`;

    return (
      <div className={`${prefix}_form_input _mar_b14`}>
        <label className={`${prefix}_label _mar_b8`}>{label}</label>
        <input
          ref={ref}
          type={type}
          className={`form-control ${prefix}_input`}
          aria-invalid={error ? true : undefined}
          {...rest}
        />
        {error ? (
          <span className="mt-1 block text-sm text-rose-500 text-left">
            {error}
          </span>
        ) : null}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";
