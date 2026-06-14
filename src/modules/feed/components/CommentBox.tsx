"use client";

import { useState } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { CommentMicIcons } from "@/modules/feed/components/icons";

export function CommentBox({ avatar = "/assets/images/comment_img.png" }: { avatar?: string }) {
  const [value, setValue] = useState("");

  return (
    <div className="_feed_inner_comment_box">
      <form
        className="_feed_inner_comment_box_form"
        onSubmit={(e) => {
          e.preventDefault();
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
            <textarea
              className="form-control _comment_textarea"
              placeholder="Write a comment"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        <CommentMicIcons />
      </form>
    </div>
  );
}
