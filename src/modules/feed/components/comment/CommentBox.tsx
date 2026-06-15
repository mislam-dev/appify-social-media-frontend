"use client";

import { AppImage } from "@/components/ui/AppImage";
import { CommentMicIcons } from "@/modules/feed/components/icons";
import { useState } from "react";

interface CommentBoxProps {
  avatar?: string;
  /** Called with the trimmed text on submit. The parent owns the mutation
   *  (create comment / reply), keeping this component presentational. */
  onSubmit?: (text: string) => void;
  pending?: boolean;
}

export function CommentBox({
  avatar = "/assets/images/comment_img.png",
  onSubmit,
  pending = false,
}: CommentBoxProps) {
  const [value, setValue] = useState("");

  return (
    <div className="_feed_inner_comment_box">
      <form
        className="_feed_inner_comment_box_form"
        onSubmit={(e) => {
          e.preventDefault();
          const text = value.trim();
          if (!text || pending) return;
          onSubmit?.(text);
          setValue("");
        }}
      >
        <div className="_feed_inner_comment_box_content">
          <div className="_feed_inner_comment_box_content_image">
            <AppImage
              src={avatar}
              alt=""
              width={36}
              height={36}
              className="_comment_img"
            />
          </div>
          <div className="_feed_inner_comment_box_content_txt">
            <input
              className="form-control _comment_textarea"
              placeholder="Write a comment"
              value={value}
              disabled={pending}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value);
              }}
            />
          </div>
        </div>
        <CommentMicIcons />
      </form>
    </div>
  );
}
