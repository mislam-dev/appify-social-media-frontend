"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppImage } from "@/components/ui/AppImage";
import { RegisterSchema, type RegisterInput } from "@/modules/auth/types";
import { useRegister } from "@/modules/auth/hooks/useAuthMutations";

export function RegisterForm() {
  const register = useRegister();
  const {
    register: field,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = handleSubmit((data) => register.mutate(data));

  return (
    <>
      <button type="button" className="_social_registration_content_btn _mar_b40">
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

      <form className="_social_registration_form" onSubmit={onSubmit} noValidate>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                First name
              </label>
              <input
                type="text"
                className="form-control _social_registration_input"
                aria-invalid={errors.first_name ? true : undefined}
                {...field("first_name")}
              />
              {errors.first_name ? (
                <span className="mt-1 block text-xs text-rose-500">
                  {errors.first_name.message}
                </span>
              ) : null}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                Last name
              </label>
              <input
                type="text"
                className="form-control _social_registration_input"
                aria-invalid={errors.last_name ? true : undefined}
                {...field("last_name")}
              />
              {errors.last_name ? (
                <span className="mt-1 block text-xs text-rose-500">
                  {errors.last_name.message}
                </span>
              ) : null}
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">Email</label>
              <input
                type="email"
                className="form-control _social_registration_input"
                aria-invalid={errors.email ? true : undefined}
                {...field("email")}
              />
              {errors.email ? (
                <span className="mt-1 block text-xs text-rose-500">
                  {errors.email.message}
                </span>
              ) : null}
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                Password
              </label>
              <input
                type="password"
                className="form-control _social_registration_input"
                aria-invalid={errors.password ? true : undefined}
                {...field("password")}
              />
              {errors.password ? (
                <span className="mt-1 block text-xs text-rose-500">
                  {errors.password.message}
                </span>
              ) : null}
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                Repeat Password
              </label>
              <input
                type="password"
                className="form-control _social_registration_input"
                aria-invalid={errors.confirm_password ? true : undefined}
                {...field("confirm_password")}
              />
              {errors.confirm_password ? (
                <span className="mt-1 block text-xs text-rose-500">
                  {errors.confirm_password.message}
                </span>
              ) : null}
            </div>
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

        {register.isError ? (
          <div className="row">
            <div className="col-12">
              <p className="mb-2 text-sm text-rose-500">
                {(register.error as Error).message}
              </p>
            </div>
          </div>
        ) : null}

        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_registration_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                className="_social_registration_form_btn_link _btn1"
                disabled={register.isPending}
              >
                {register.isPending ? "Creating account…" : "Register now"}
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
