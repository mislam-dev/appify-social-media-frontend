import { AppImage } from "@/components/ui/AppImage";
import { AuthShapes } from "@/modules/auth/components/AuthShapes";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";

export function RegisterPage() {
  return (
    <section className="_social_registration_wrapper _layout_main_wrapper">
      <AuthShapes />
      <div className="_social_registration_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_registration_right">
                <div className="_social_registration_right_image">
                  <AppImage
                    src="/assets/images/registration.png"
                    alt="Registration illustration"
                    width={720}
                    height={620}
                    priority
                  />
                </div>
                <div className="_social_registration_right_image_dark">
                  <AppImage
                    src="/assets/images/registration1.png"
                    alt="Registration illustration"
                    width={720}
                    height={620}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_registration_content">
                <div className="_social_registration_right_logo _mar_b28">
                  <AppImage
                    src="/assets/images/logo.svg"
                    alt="Buddy Script"
                    width={150}
                    height={40}
                    className="_right_logo"
                  />
                </div>
                <p className="_social_registration_content_para _mar_b8">
                  Get Started Now
                </p>
                <h4 className="_social_registration_content_title _titl4 _mar_b50">
                  Registration
                </h4>
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
