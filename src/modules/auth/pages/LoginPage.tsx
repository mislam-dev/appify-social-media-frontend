import { AppImage } from "@/components/ui/AppImage";
import { AuthShapes } from "@/modules/auth/components/AuthShapes";
import { LoginForm } from "@/modules/auth/components/LoginForm";

export function LoginPage() {
  return (
    <section className="_social_login_wrapper _layout_main_wrapper">
      <AuthShapes />
      <div className="_social_login_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_login_left">
                <div className="_social_login_left_image">
                  <AppImage
                    src="/assets/images/login.png"
                    alt="Login illustration"
                    width={720}
                    height={620}
                    priority
                    className="_left_img"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_login_content">
                <div className="_social_login_left_logo _mar_b28">
                  <AppImage
                    src="/assets/images/logo.svg"
                    alt="Buddy Script"
                    width={150}
                    height={40}
                    className="_left_logo"
                  />
                </div>
                <p className="_social_login_content_para _mar_b8">
                  Welcome back
                </p>
                <h4 className="_social_login_content_title _titl4 _mar_b50">
                  Login to your account
                </h4>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
