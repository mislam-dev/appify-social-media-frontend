import { apiClient, type ApiEnvelope } from "@/lib/api-client";
import { z } from "zod";
import { feedEndpoints } from "./endpoints";

export const UploadedImageSchema = z.object({
  url: z.string().url(),
  public_id: z.string(),
  format: z.string(),
  width: z.number(),
  height: z.number(),
  bytes: z.number(),
});
export type UploadedImage = z.infer<typeof UploadedImageSchema>;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

class UploadApi {
  async image(file: File): Promise<UploadedImage> {
    const form = new FormData();
    form.append("file", file);

    const res = await apiClient.post<ApiEnvelope<UploadedImage>>(
      feedEndpoints.fileUpload,
      form,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    return UploadedImageSchema.parse(res.data.data);
  }
}

export const uploadApi = new UploadApi();
