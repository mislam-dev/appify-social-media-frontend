import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils/cn";

export type AppImageProps = ImageProps;

export function AppImage({ className, alt, ...props }: AppImageProps) {
  return <Image alt={alt} className={cn(className)} {...props} />;
}
