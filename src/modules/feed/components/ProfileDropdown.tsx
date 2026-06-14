"use client";

import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/providers/auth-provider";
import { fullName } from "@/lib/utils/formatters";
import { useFeedUiStore } from "@/modules/feed/store/ui.store";

const CHEVRON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none" viewBox="0 0 6 10">
    <path fill="#112032" d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z" opacity=".5" />
  </svg>
);

export function ProfileDropdown() {
  const { user, logout } = useAuth();
  const open = useFeedUiStore((s) => s.openDropdown === "profile");
  const toggle = useFeedUiStore((s) => s.toggleDropdown);

  const name = user ? fullName(user.first_name, user.last_name) : "Dylan Field";
  const avatar = user?.avatar_url ?? "/assets/images/profile.png";

  return (
    <div className="_header_nav_profile">
      <div className="_header_nav_profile_image">
        <AppImage
          src={avatar}
          alt={name}
          width={42}
          height={42}
          className="_nav_profile_img"
        />
      </div>
      <div className="_header_nav_dropdown">
        <p className="_header_nav_para">{name}</p>
        <button
          id="_profile_drop_show_btn"
          className="_header_nav_dropdown_btn _dropdown_toggle"
          type="button"
          onClick={() => toggle("profile")}
          aria-label="Toggle profile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none" viewBox="0 0 10 6">
            <path fill="#112032" d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z" />
          </svg>
        </button>
      </div>

      <div
        id="_prfoile_drop"
        className={cn("_nav_profile_dropdown _profile_dropdown", open && "show")}
      >
        <div className="_nav_profile_dropdown_info">
          <div className="_nav_profile_dropdown_image">
            <AppImage
              src={avatar}
              alt={name}
              width={48}
              height={48}
              className="_nav_drop_img"
            />
          </div>
          <div className="_nav_profile_dropdown_info_txt">
            <h4 className="_nav_dropdown_title">{name}</h4>
            <Link href="#" className="_nav_drop_profile">
              View Profile
            </Link>
          </div>
        </div>
        <hr />
        <ul className="_nav_dropdown_list">
          <li className="_nav_dropdown_list_item">
            <Link href="#" className="_nav_dropdown_link">
              <div className="_nav_drop_info">Settings</div>
              <span className="_nav_drop_btn_link">{CHEVRON}</span>
            </Link>
          </li>
          <li className="_nav_dropdown_list_item">
            <Link href="#" className="_nav_dropdown_link">
              <div className="_nav_drop_info">Help &amp; Support</div>
              <span className="_nav_drop_btn_link">{CHEVRON}</span>
            </Link>
          </li>
          <li className="_nav_dropdown_list_item">
            <button
              type="button"
              className="_nav_dropdown_link"
              onClick={logout}
              style={{ width: "100%", background: "none", border: "none" }}
            >
              <div className="_nav_drop_info">Log Out</div>
              <span className="_nav_drop_btn_link">{CHEVRON}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
