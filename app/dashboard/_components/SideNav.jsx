"use client";
import {
  CircleUser,
  FileVideo,
  Link,
  PanelsTopLeft,
  ShieldPlus,
} from "lucide-react";
import React from "react";
import NextLink from "next/link"; // Import Next.js Link properly
import { usePathname } from "next/navigation";

const SideNav = () => {
  const MenuOption = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: PanelsTopLeft,
    },
    {
      id: 2,
      name: "Create New",
      path: "/dashboard/create-new",
      icon: FileVideo,
    },
  ];
  const path = usePathname();

  return (
    <div className="w-58 h-screen shadow-md p-5">
      <div>
        {MenuOption.map((item) => (
          <NextLink key={item.id} href={item.path} passHref>
            <div
              className={`flex items-center gap-2 mb-4 pb-4 hover:bg-primary hover:text-white rounded-md cursor-pointer ${
                path === item.path && `bg-primary text-white`
              }`}
            >
              <item.icon className="w-5 h-5" />
              <h2
                className={`text-gray-700 ${
                  path === item.path ? "text-white" : "hover:text-white"
                }`}
              >
                {item.name}
              </h2>
            </div>
          </NextLink>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
