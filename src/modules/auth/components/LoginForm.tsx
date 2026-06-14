"use client";

import { AppImage } from "@/components/ui/AppImage";
import { ApiError } from "@/lib/api-client";
import { useLogin } from "@/modules/auth/hooks/useAuthMutations";
import {
  NonValidationErrorResponse,
  ValidationErrorResponse,
} from "@/modules/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInput, LoginSchema } from "../schema/login-schema";
import { AuthInput } from "./AuthInput";

export function LoginForm() {
  const { mutate: login, error, isError, isPending } = useLogin();
  const [manualError, setManualError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = handleSubmit((data) => {
    setManualError("");
    login(data);
  });

  useEffect(() => {
    if (isError) {
      if (error instanceof ApiError) {
        if (error.status === 400) {
          const res = error.details as ValidationErrorResponse;
          res.errors.forEach((err) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError(err.property as any, {
              message: err.constraints.join(", "),
            });
          });
        } else {
          const { message } = error.details as NonValidationErrorResponse;
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setManualError(message || "");
        }
      }
    }
  }, [isError, error, setError]);
  return (
    <>
      <button type="button" className="_social_login_content_btn _mar_b40">
        <AppImage
          src="/assets/images/google.svg"
          alt="Google"
          width={18}
          height={18}
          className="_google_img"
        />{" "}
        <span>Or sign-in with google</span>
      </button>
      <div className="_social_login_content_bottom_txt _mar_b40">
        <span>Or</span>
      </div>
      {manualError && (
        <div className="mb-3 text-left">
          <span className="mt-2 block text-sm text-red-600">{manualError}</span>
        </div>
      )}
      <form className="_social_login_form" onSubmit={onSubmit} noValidate>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <AuthInput
              label="Email"
              type="email"
              variant="login"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <AuthInput
              label="Password"
              type="password"
              variant="login"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
            <div className="form-check _social_login_form_check">
              <input
                className="form-check-input _social_login_form_check_input"
                type="checkbox"
                id="rememberMe"
                {...register("remember")}
              />
              <label
                className="form-check-label _social_login_form_check_label"
                htmlFor="rememberMe"
              >
                Remember me
              </label>
            </div>
          </div>
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
            <div className="_social_login_form_left">
              <p className="_social_login_form_left_para">Forgot password?</p>
            </div>
          </div>
        </div>

        {isError ? (
          <div className="row">
            <div className="col-12">
              <p className="mb-2 text-sm text-rose-500">
                {(error as Error).message}
              </p>
            </div>
          </div>
        ) : null}

        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_login_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                className="_social_login_form_btn_link _btn1"
                disabled={isPending}
              >
                {isPending ? "Signing in…" : "Login now"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_login_bottom_txt">
            <p className="_social_login_bottom_txt_para">
              Dont have an account?{" "}
              <Link href="/register">Create New Account</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
