"use client";

import { AppImage } from "@/components/ui/AppImage";
import { cn } from "@/lib/utils/cn";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "@/modules/feed/api/upload.api";
import { SendIcon } from "@/modules/feed/components/icons";
import { useCreatePost } from "@/modules/feed/hooks/usePosts";
import { useUploadImage } from "@/modules/feed/hooks/useUpload";
import { useRef, useState } from "react";

export function PostComposer() {
  const [content, setContent] = useState("");
  const [contentBackup, setContentBackup] = useState("");

  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadedUrlBackup, setUploadedUrlBackup] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createPost = useCreatePost();
  const upload = useUploadImage();

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function clearImage() {
    setPreview(null);
    setUploadedUrl(null);
    setError(null);
    upload.reset();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError(null);

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Only image files are allowed (JPEG, PNG, WebP, GIF).");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image must be 5 MB or smaller.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    setUploadedUrl(null);
    upload.mutate(file, {
      onSuccess: (img) => {
        setUploadedUrl(img.url);
        setPreview(img.url);
      },
      onError: (err) => {
        setError(err.message || "Image upload failed. Please try again.");
      },
    });
  }

  function submit() {
    const trimmed = content.trim();
    if (!trimmed) return;
    if (upload.isPending) return;
    setContentBackup(content);
    setContent("");
    setUploadedUrlBackup(uploadedUrl || "");
    clearImage();

    createPost.mutate(
      {
        content: trimmed,
        status: "public",
        image: uploadedUrl ?? undefined,
      },
      {
        onSuccess: () => {
          setContentBackup("");
          setUploadedUrlBackup("");
        },
        onError: () => {
          setContent(contentBackup);
          setUploadedUrlBackup(uploadedUrlBackup);
          setPreview(uploadedUrlBackup);
        },
      },
    );
  }

  const isBusy = createPost.isPending || upload.isPending;

  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={onFileChange}
      />

      <div className="_feed_inner_text_area_box">
        <div className="_feed_inner_text_area_box_image">
          <AppImage
            src="/assets/images/txt_img.png"
            alt=""
            width={48}
            height={48}
            className="_txt_img"
          />
        </div>
        <div className="form-floating _feed_inner_text_area_box_form">
          <textarea
            className="form-control _textarea"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {!content && (
            <label
              className={cn(
                "_feed_textarea_label",
                "flex items-center justify-between",
              )}
              htmlFor="floatingTextarea"
            >
              <p className="flex items-center gap-2">
                <span className="block">Write something ...</span>
                <span className="block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="24"
                    fill="none"
                    viewBox="0 0 23 24"
                  >
                    <path
                      fill="#666"
                      d="M19.504 19.209c.332 0 .601.289.601.646 0 .326-.226.596-.52.64l-.081.005h-6.276c-.332 0-.602-.289-.602-.645 0-.327.227-.597.52-.64l.082-.006h6.276zM13.4 4.417c1.139-1.223 2.986-1.223 4.125 0l1.182 1.268c1.14 1.223 1.14 3.205 0 4.427L9.82 19.649a2.619 2.619 0 01-1.916.85h-3.64c-.337 0-.61-.298-.6-.66l.09-3.941a3.019 3.019 0 01.794-1.982l8.852-9.5z"
                    />
                  </svg>
                </span>
              </p>
            </label>
          )}
        </div>
      </div>

      {preview && (
        <div className="_feed_inner_text_area_preview _mar_t16">
          <div className="relative inline-block w-full max-w-md overflow-hidden rounded-xl border border-gray-200">
            <AppImage
              src={preview}
              alt="Selected image preview"
              width={400}
              height={260}
              unoptimized
              sizes="(max-width: 768px) 100vw, 480px"
              className="block w-full object-cover"
              style={{ width: "100%", height: "auto" }}
            />

            {upload.isPending && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/45 text-white">
                <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                <span className="text-sm font-medium">Uploading…</span>
              </div>
            )}

            <button
              type="button"
              onClick={clearImage}
              aria-label="Remove image"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-lg leading-none text-white hover:bg-black/80"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {error && <p className="_mar_t8 text-sm text-red-500">{error}</p>}

      <div className="_feed_inner_text_area_bottom">
        <div className="_feed_inner_text_area_item">
          {MEDIA_BUTTONS.map((b) => (
            <div key={b.key} className={`${b.cls} _feed_common`}>
              <button
                type="button"
                className="_feed_inner_text_area_bottom_photo_link"
                onClick={b.key === "photo" ? openFilePicker : undefined}
              >
                <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                  {b.icon}
                </span>
                {b.label}
              </button>
            </div>
          ))}
        </div>
        <div className="_feed_inner_text_area_btn">
          <button
            type="button"
            className="_feed_inner_text_area_btn_link"
            onClick={submit}
            disabled={isBusy}
          >
            <SendIcon />
            <span>
              {upload.isPending
                ? "Uploading…"
                : createPost.isPending
                  ? "Posting…"
                  : "Post"}
            </span>
          </button>
        </div>
      </div>

      <div className="_feed_inner_text_area_bottom_mobile">
        <div className="_feed_inner_text_mobile">
          <div className="_feed_inner_text_area_item">
            {MEDIA_BUTTONS.map((b) => (
              <div key={b.key} className={`${b.cls} _feed_common`}>
                <button
                  type="button"
                  className="_feed_inner_text_area_bottom_photo_link"
                  onClick={b.key === "photo" ? openFilePicker : undefined}
                >
                  <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                    {b.icon}
                  </span>
                </button>
              </div>
            ))}
          </div>
          <div className="_feed_inner_text_area_btn">
            <button
              type="button"
              className="_feed_inner_text_area_btn_link"
              onClick={submit}
              disabled={isBusy}
            >
              <SendIcon />
              <span>Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const PhotoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      fill="#666"
      d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51z"
    />
  </svg>
);
const VideoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="24"
    fill="none"
    viewBox="0 0 22 24"
  >
    <path
      fill="#666"
      d="M11.485 4.5c2.213 0 3.753 1.534 3.917 3.784l2.418-1.082c1.047-.468 2.188.327 2.271 1.533l.005.141v6.64c0 1.237-1.103 2.093-2.155 1.72l-.121-.047-2.418-1.083c-.164 2.25-1.708 3.785-3.917 3.785H5.76c-2.343 0-3.932-1.72-3.932-4.188V8.688c0-2.47 1.589-4.188 3.932-4.188h5.726z"
    />
  </svg>
);
const EventIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="24"
    fill="none"
    viewBox="0 0 22 24"
  >
    <path
      fill="#666"
      d="M14.371 2c.32 0 .585.262.627.603l.005.095v.788c2.598.195 4.188 2.033 4.18 5v8.488c0 3.145-1.786 5.026-4.656 5.026H7.395C4.53 22 2.74 20.087 2.74 16.904V8.486c0-2.966 1.596-4.804 4.187-5v-.788c0-.386.283-.698.633-.698.32 0 .584.262.626.603l.006.095v.771h5.546v-.771c0-.386.284-.698.633-.698zm3.546 8.283H4.004l.001 6.621c0 2.325 1.137 3.616 3.183 3.697l.207.004h7.132c2.184 0 3.39-1.271 3.39-3.63v-6.692z"
    />
  </svg>
);
const ArticleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="20"
    fill="none"
    viewBox="0 0 18 20"
  >
    <path
      fill="#666"
      d="M12.49 0c2.92 0 4.665 1.92 4.693 5.132v9.659c0 3.257-1.75 5.209-4.693 5.209H5.434c-.377 0-.734-.032-1.07-.095l-.2-.041C2 19.371.74 17.555.74 14.791V5.209c0-.334.019-.654.055-.96C1.114 1.564 2.799 0 5.434 0h7.056zm-.008 1.457H5.434c-2.244 0-3.381 1.263-3.381 3.752v9.582c0 2.489 1.137 3.752 3.38 3.752h7.049c2.242 0 3.372-1.263 3.372-3.752V5.209c0-2.489-1.13-3.752-3.372-3.752z"
    />
  </svg>
);

const MEDIA_BUTTONS = [
  {
    key: "photo",
    label: "Photo",
    icon: PhotoIcon,
    cls: "_feed_inner_text_area_bottom_photo",
  },
  {
    key: "video",
    label: "Video",
    icon: VideoIcon,
    cls: "_feed_inner_text_area_bottom_video",
  },
  {
    key: "event",
    label: "Event",
    icon: EventIcon,
    cls: "_feed_inner_text_area_bottom_event",
  },
  {
    key: "article",
    label: "Article",
    icon: ArticleIcon,
    cls: "_feed_inner_text_area_bottom_article",
  },
];
