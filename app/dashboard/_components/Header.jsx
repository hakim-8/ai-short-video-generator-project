"use client";
import React, { useContext } from "react";
import { UserButton } from "@clerk/nextjs";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <img src={"./robotic.jpg"} alt="logo" width="30px" height="30px" />
        <h2 className="font-bold text-xl">Meta Clips AI</h2>
      </div>
      <div className="flex gap-5 items-center">
        <div className="flex gap-2 items-center">
          <img src={"./coin.png"} alt="credits:" width={20} height={30} />
          <h2>{userDetail?.credits}</h2>
        </div>
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
