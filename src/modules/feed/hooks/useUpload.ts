"use client";

import { uploadApi, type UploadedImage } from "@/modules/feed/api/upload.api";
import { useMutation } from "@tanstack/react-query";

export function useUploadImage() {
  return useMutation<UploadedImage, Error, File>({
    mutationKey: ["upload", "image"],
    mutationFn: (file: File) => uploadApi.image(file),
  });
}
