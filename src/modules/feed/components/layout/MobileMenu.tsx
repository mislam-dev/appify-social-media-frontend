"use client";

import { useState } from "react";
import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { SearchIcon } from "@/modules/feed/components/icons";
import { useAuth } from "@/providers/auth-provider";
import { fullName } from "@/lib/utils/formatters";

const MENU_ITEMS = [
  { label: "Home", href: "/feed" },
  { label: "Friends", href: "#" },
  { label: "Notifications", href: "#" },
  { label: "Messages", href: "#" },
  { label: "Profile", href: "#" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const name = user ? fullName(user.first_name, user.last_name) : "Dylan Field";

  return (
    <div className="_header_mobile_menu">
      <div className="_header_mobile_menu_wrap">
        <div className="container">
          <div className="_header_mobile_menu">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="_header_mobile_menu_top_inner">
                  <div className="_header_mobile_menu_logo">
                    <Link href="/feed" className="_mobile_logo_link">
                      <AppImage
                        src="/assets/images/logo.svg"
                        alt="Buddy Script"
                        width={130}
                        height={34}
                        className="_nav_logo"
                      />
                    </Link>
                  </div>

                  <div className="_header_mobile_menu_right flex items-center gap-2">
                    <form
                      className="relative flex-1"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                        <SearchIcon />
                      </span>
                      <input
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        className="h-10 w-full rounded-full border border-[#e5e7eb] bg-[#f0f2f5] pl-9 pr-3 text-sm text-[#2d3748] outline-none focus:border-[#1890ff]"
                      />
                    </form>

                    <button
                      type="button"
                      aria-label="Toggle menu"
                      aria-expanded={open}
                      onClick={() => setOpen((v) => !v)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0f2f5] text-[#2d3748]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="14"
                        fill="none"
                        viewBox="0 0 18 14"
                      >
                        <path
                          stroke="#666"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1h16M1 7h16M1 13h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {open ? (
                  <nav className="mt-3 overflow-hidden rounded-xl border border-[#eef0f3] bg-white shadow-sm">
                    <ul className="flex flex-col">
                      {MENU_ITEMS.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block px-4 py-3 text-sm font-medium text-[#2d3748] hover:bg-[#f0f2f5]"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li className="border-t border-[#eef0f3]">
                        <button
                          type="button"
                          onClick={() => {
                            setOpen(false);
                            logout();
                          }}
                          className="block w-full px-4 py-3 text-left text-sm font-medium text-[#e0364f] hover:bg-[#f0f2f5]"
                        >
                          Log out
                          <span className="ml-1 text-[#9aa3af]">({name})</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
