"use client";

import { cn } from "@/lib/utils/cn";
import { ThreeDotsIcon } from "@/modules/feed/components/icons";
import Link from "next/link";
import { useState } from "react";

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

export function ThreeDotActionMenu() {
  const [open, setOpen] = useState(false);
  return (
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
              <Link
                href="#"
                className="_feed_timeline_dropdown_link flex items-center"
              >
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
  );
}
