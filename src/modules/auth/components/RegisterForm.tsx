/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AppImage } from "@/components/ui/AppImage";
import { ApiError } from "@/lib/api-client";
import { useRegister } from "@/modules/auth/hooks/useAuthMutations";
import { ValidationErrorResponse } from "@/modules/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { type RegisterInput, RegisterSchema } from "../schema/register-schema";
import { AuthInput } from "./AuthInput";

export function RegisterForm() {
  const { mutate: register, isError, error, isPending } = useRegister();
  const {
    register: field,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      agree: true,
    },
  });

  const onSubmit = handleSubmit((data) => register(data));

  useEffect(() => {
    if (isError) {
      if (error instanceof ApiError) {
        const res = error.details as ValidationErrorResponse;
        res.errors.forEach((err) => {
          setError(err.property as any, {
            message: err.constraints.join(", "),
          });
        });
      }
    }
  }, [isError, error, setError]);

  return (
    <>
      <button
        type="button"
        className="_social_registration_content_btn _mar_b40"
      >
        <AppImage
          src="/assets/images/google.svg"
          alt="Google"
          width={18}
          height={18}
          className="_google_img"
        />{" "}
        <span>Register with google</span>
      </button>
      <div className="_social_registration_content_bottom_txt _mar_b40">
        <span>Or</span>
      </div>

      <form
        className="_social_registration_form"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <AuthInput
              label="First name"
              type="text"
              error={errors.first_name?.message}
              {...field("first_name")}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <AuthInput
              label="Last name"
              type="text"
              error={errors.last_name?.message}
              {...field("last_name")}
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <AuthInput
              label="Email"
              type="email"
              error={errors.email?.message}
              {...field("email")}
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <AuthInput
              label="Password"
              type="password"
              error={errors.password?.message}
              {...field("password")}
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <AuthInput
              label="Repeat Password"
              type="password"
              error={errors.confirm_password?.message}
              {...field("confirm_password")}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
            <div className="form-check _social_registration_form_check">
              <input
                className="form-check-input _social_registration_form_check_input"
                type="checkbox"
                id="agreeTerms"
                {...field("agree")}
              />
              <label
                className="form-check-label _social_registration_form_check_label"
                htmlFor="agreeTerms"
              >
                I agree to terms &amp; conditions
              </label>
            </div>
            {errors.agree ? (
              <span className="mt-1 block text-xs text-rose-500">
                {errors.agree.message}
              </span>
            ) : null}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_registration_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                className="_social_registration_form_btn_link _btn1"
                disabled={isPending}
              >
                {isPending ? "Creating account…" : "Register now"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_registration_bottom_txt">
            <p className="_social_registration_bottom_txt_para">
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
