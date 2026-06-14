"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppImage } from "@/components/ui/AppImage";
import { LoginSchema, type LoginInput } from "@/modules/auth/types";
import { useLogin } from "@/modules/auth/hooks/useAuthMutations";

export function LoginForm() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = handleSubmit((data) => login.mutate(data));

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

      <form className="_social_login_form" onSubmit={onSubmit} noValidate>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_login_form_input _mar_b14">
              <label className="_social_login_label _mar_b8">Email</label>
              <input
                type="email"
                className="form-control _social_login_input"
                aria-invalid={errors.email ? true : undefined}
                {...register("email")}
              />
              {errors.email ? (
                <span className="mt-1 block text-xs text-rose-500">
                  {errors.email.message}
                </span>
              ) : null}
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_login_form_input _mar_b14">
              <label className="_social_login_label _mar_b8">Password</label>
              <input
                type="password"
                className="form-control _social_login_input"
                aria-invalid={errors.password ? true : undefined}
                {...register("password")}
              />
              {errors.password ? (
                <span className="mt-1 block text-xs text-rose-500">
                  {errors.password.message}
                </span>
              ) : null}
            </div>
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

        {login.isError ? (
          <div className="row">
            <div className="col-12">
              <p className="mb-2 text-sm text-rose-500">
                {(login.error as Error).message}
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
                disabled={login.isPending}
              >
                {login.isPending ? "Signing in…" : "Login now"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_login_bottom_txt">
            <p className="_social_login_bottom_txt_para">
              Dont have an account? <Link href="/register">Create New Account</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
