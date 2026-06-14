import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...rest }, ref) => (
    <>
      <input
        ref={ref}
        className={cn(className, error && "!border-rose-400")}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {error ? (
        <span className="mt-1 block text-xs text-rose-500">{error}</span>
      ) : null}
    </>
  ),
);

Input.displayName = "Input";
