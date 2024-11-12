import { Home, Calendar, Users, Mail, User } from "lucide-react";

export const getPages = () => {
  return [
    { name: "Home", href: "/", icon: Home },
    { name: "Swipe", href: "/matching", icon: Calendar },
    { name: "My Matches", href: "/matches", icon: Users },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Contact", href: "/contact", icon: Mail },
  ];
};