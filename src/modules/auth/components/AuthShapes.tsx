import { AppImage } from "@/components/ui/AppImage";

export function AuthShapes() {
  return (
    <>
      <div className="_shape_one">
        <AppImage
          src="/assets/images/shape1.svg"
          alt=""
          width={300}
          height={300}
          className="_shape_img"
        />
        <AppImage
          src="/assets/images/dark_shape.svg"
          alt=""
          width={300}
          height={300}
          className="_dark_shape"
        />
      </div>
      <div className="_shape_two">
        <AppImage
          src="/assets/images/shape2.svg"
          alt=""
          width={200}
          height={200}
          className="_shape_img"
        />
        <AppImage
          src="/assets/images/dark_shape1.svg"
          alt=""
          width={200}
          height={200}
          className="_dark_shape _dark_shape_opacity"
        />
      </div>
      <div className="_shape_three">
        <AppImage
          src="/assets/images/shape3.svg"
          alt=""
          width={200}
          height={200}
          className="_shape_img"
        />
        <AppImage
          src="/assets/images/dark_shape2.svg"
          alt=""
          width={200}
          height={200}
          className="_dark_shape _dark_shape_opacity"
        />
      </div>
    </>
  );
}
