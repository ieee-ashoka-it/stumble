"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import IEEELogo from "@/public/images/logo.png";
import {
  NotebookPen,
  Users,
  GalleryHorizontalEnd,
  LogIn,
  Settings,
  Sun,
  Moon,
  ChevronsRight,
} from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Avatar } from "@nextui-org/react";
import { useTheme } from "next-themes";

interface UserData {
  avatar_url: string;
}

export const Sidebar = ({
  user,
  userData,
}: {
  user: SupabaseUser | null;
  userData: UserData | null;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const pages = user
    ? [
        { name: "Swipe", href: "/matching", icon: GalleryHorizontalEnd },
        { name: "My Matches", href: "/matches", icon: Users },
      ]
    : [
        { name: "Login", href: "/login", icon: LogIn },
        { name: "Register", href: "/register", icon: NotebookPen },
      ];

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "hidden md:block fixed left-0 top-0 h-screen bg-background opacity-100 z-50 border-r transition-all duration-400",
        isExpanded ? "w-80" : "w-20"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="flex flex-col p-2 h-full">
        <div className="flex mt-5 h-10 items-center">
          <ChevronsRight
            className={cn(
              "h-full w-full transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </div>
        <div className="flex h-20 items-center">
          <div className="flex items-center justify-center min-w-[64px]">
            <Link href="/">
              <Image
                src={IEEELogo}
                alt="IEEE Logo"
                width={48}
                height={48}
                className="w-full h-full"
              />
            </Link>
          </div>
          <span
            className={cn(
              "truncate text-2xl font-bold transition-all duration-400",
              isExpanded ? "opacity-100 visible" : "opacity-0 invisible"
            )}
          >
            Stumble
          </span>
        </div>
        <div className="flex flex-col">
          {pages.map((page) => {
            const isActive = pathname === page.href;
            return (
              <Link
                key={page.href}
                href={page.href}
                className={cn(
                  "flex items-center h-20 rounded-lg transition-colors relative",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground"
                )}
              >
                <div className="flex items-center justify-center min-w-[64px]">
                  <page.icon
                    className="h-8 w-8"
                    stroke={isActive ? "currentColor" : "gray"}
                  />
                </div>
                <span
                  className={cn(
                    "truncate text-lg transition-all duration-400",
                    isExpanded ? "opacity-100 visible" : "opacity-0 invisible",
                    isActive ? "text-accent-foreground" : "text-gray-500"
                  )}
                >
                  {page.name}
                </span>
              </Link>
            );
          })}
          <Link
            key="profile"
            href="/profile"
            className={cn(
              "flex items-center h-20 rounded-lg transition-colors relative",
              "hover:bg-accent hover:text-accent-foreground",
              pathname === "/profile" && "bg-accent text-accent-foreground"
            )}
          >
            <div className="flex items-center justify-center min-w-[64px]">
              <Avatar
                src={userData?.avatar_url}
                isBordered
                color={pathname === "/profile" ? "primary" : "default"}
                className="h-8 w-8"
              />
            </div>
            <span
              className={cn(
                "truncate text-lg transition-all duration-400",
                isExpanded ? "opacity-100 visible" : "opacity-0 invisible",
                pathname === "/profile"
                  ? "text-accent-foreground"
                  : "text-gray-500"
              )}
            >
              Profile
            </span>
          </Link>
        </div>
        <div className="mt-auto flex flex-col gap-2">
          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "flex items-center h-20 rounded-lg transition-colors relative",
              "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <div className="flex items-center justify-center min-w-[64px]">
              {theme === "dark" ? (
                <Sun className="h-8 w-8" stroke="gray" />
              ) : (
                <Moon className="h-8 w-8" stroke="gray" />
              )}
            </div>
            <span
              className={cn(
                "truncate text-lg text-gray-500 transition-all duration-400",
                isExpanded ? "opacity-100 visible" : "opacity-0 invisible"
              )}
            >
              Toggle theme
            </span>
          </button>
          <Link
            key="settings"
            href="/settings"
            className={cn(
              "flex items-center h-20 rounded-lg transition-colors relative",
              "hover:bg-accent hover:text-accent-foreground",
              pathname === "/settings" && "bg-accent text-accent-foreground"
            )}
          >
            <div className="flex items-center justify-center min-w-[64px]">
              <Settings
                className="h-8 w-8"
                stroke={pathname === "/settings" ? "currentColor" : "gray"}
              />
            </div>
            <span
              className={cn(
                "truncate text-lg transition-all duration-400",
                isExpanded ? "opacity-100 visible" : "opacity-0 invisible",
                pathname === "/settings"
                  ? "text-accent-foreground"
                  : "text-gray-500"
              )}
            >
              Settings
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
