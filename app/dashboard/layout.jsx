"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { VideoInfoContext } from "../_context/VideoInfoContext";
import { UserDetailContext } from "../_context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { Users } from "@/configs/schema";
const DashboardLayout = ({ children }) => {
  const [videoInfo, setVideoInfo] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    console.log(userDetail);
    user && getUserDetails();
  }, [user]);

  const getUserDetails = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
    setUserDetail(result[0]);
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <VideoInfoContext.Provider value={{ videoInfo, setVideoInfo }}>
        <div>
          <Header />
          <div className="flex">
            <div className="hidden md:block w-64">
              <SideNav />
            </div>
            <div className="flex-1 md:ml-0 p-10">{children}</div>
          </div>
        </div>
      </VideoInfoContext.Provider>
    </UserDetailContext.Provider>
  );
};

export default DashboardLayout;
