import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { Spinner } from "@/components/feedback/Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, loading, disabled, type = "button", ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        (disabled || loading) && "cursor-not-allowed opacity-70",
        className,
      )}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  ),
);

Button.displayName = "Button";
