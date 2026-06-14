"use client";

import { AppImage } from "@/components/ui/AppImage";
import { cn } from "@/lib/utils/cn";
import { timeAgo } from "@/lib/utils/formatters";
import { ThreeDotsIcon } from "@/modules/feed/components/icons";
import type { Post } from "@/modules/feed/types";
import Link from "next/link";
import { useState } from "react";
import { PostComments } from "@/modules/feed/components/comment/PostComments";

const DROPDOWN_ITEMS = [
  {
    label: "Save Post",
    d: "M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z",
  },
  {
    label: "Hide",
    d: "M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5",
  },
  {
    label: "Edit Post",
    d: "M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75",
  },
  {
    label: "Delete Post",
    d: "M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5z",
  },
];

export function PostCard({ post }: { post: Post }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <AppImage
                src={post.author.avatar}
                alt={post.author.name}
                width={48}
                height={48}
                className="_post_img"
              />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">
                {post.author.name}
              </h4>
              <p className="_feed_inner_timeline_post_box_para">
                {timeAgo(post.created_at)} . <Link href="#">Public</Link>
              </p>
            </div>
          </div>
          <div className="_feed_inner_timeline_post_box_dropdown">
            <div className="_feed_timeline_post_dropdown">
              <button
                type="button"
                className="_feed_timeline_post_dropdown_link"
                onClick={() => setOpen((v) => !v)}
                aria-label="Post options"
              >
                <ThreeDotsIcon />
              </button>
            </div>
            <div
              className={cn(
                "_feed_timeline_dropdown _timeline_dropdown",
                open && "show",
              )}
            >
              <ul className="_feed_timeline_dropdown_list">
                {DROPDOWN_ITEMS.map((item) => (
                  <li className="_feed_timeline_dropdown_item" key={item.label}>
                    <Link href="#" className="_feed_timeline_dropdown_link">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="#1890FF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d={item.d}
                          />
                        </svg>
                      </span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {post.title ? (
          <h4 className="_feed_inner_timeline_post_title">{post.title}</h4>
        ) : null}
        {post.content ? (
          <p
            className="_feed_inner_timeline_post_para"
            style={{ marginBottom: 16 }}
          >
            {post.content}
          </p>
        ) : null}
        {post.image ? (
          <div className="_feed_inner_timeline_image">
            <AppImage
              src={post.image}
              alt=""
              width={620}
              height={420}
              className="_time_img"
            />
          </div>
        ) : null}
      </div>

      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_image">
          {post.reaction_avatars.map((src, i) => (
            <AppImage
              key={src + i}
              src={src}
              alt=""
              width={24}
              height={24}
              className={cn(
                i === 0 ? "_react_img1" : "_react_img",
                i >= 2 && "_rect_img_mbl_none",
              )}
            />
          ))}
          <p className="_feed_inner_timeline_total_reacts_para">9+</p>
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1">
            <Link href="#">
              <span>{post.comment_count}</span> Comment
            </Link>
          </p>
          <p className="_feed_inner_timeline_total_reacts_para2">
            <span>{post.share_count}</span> Share
          </p>
        </div>
      </div>

      <div className="_feed_inner_timeline_reaction">
        <button className="_feed_inner_timeline_reaction_emoji _feed_reaction _feed_reaction_active">
          <span className="_feed_inner_timeline_reaction_link">
            <span className="flex gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="none"
                viewBox="0 0 19 19"
              >
                <path
                  fill="#FFCC4D"
                  d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
                />
                <path
                  fill="#664500"
                  d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"
                />
                <path
                  fill="#fff"
                  d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z"
                />
                <path
                  fill="#664500"
                  d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"
                />
              </svg>
              Haha
            </span>
          </span>
        </button>
        <button className="_feed_inner_timeline_reaction_comment _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span className="flex gap-x-2">
              <svg
                className="_reaction_svg"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="#000"
                  d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"
                />
                <path
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.938 9.313h7.125M10.5 14.063h3.563"
                />
              </svg>
              Comment
            </span>
          </span>
        </button>
        <button className="_feed_inner_timeline_reaction_share _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span className="flex gap-x-2">
              <svg
                className="_reaction_svg"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="21"
                fill="none"
                viewBox="0 0 24 21"
              >
                <path
                  stroke="#000"
                  strokeLinejoin="round"
                  d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"
                />
              </svg>
              Share
            </span>
          </span>
        </button>
      </div>

      <PostComments post={post} />
    </div>
  );
}
