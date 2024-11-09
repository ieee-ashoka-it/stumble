import { Home, Info, Calendar, Users, Mail } from "lucide-react";

export const getPages = () => {
  return [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Team", href: "/team", icon: Users },
    { name: "Contact", href: "/contact", icon: Mail },
  ];
};