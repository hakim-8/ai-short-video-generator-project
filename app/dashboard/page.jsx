"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import VideoList from "./_components/VideoList";
import { videoData } from "@/configs/schema";
const Dashboard = () => {
  const [videoList, setVideoList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetVideoList();
  }, [user]);

  const GetVideoList = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress; // Match with provider.js
      console.log("User Email:", email);
      const result = await db
        .select()
        .from(videoData)
        .where(eq(videoData.createdBy, email));
      console.log("Query Result:", result);
      setVideoList(result);
    } catch (error) {
      console.error("Error fetching video list:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
        <Link href={"/dashboard/create-new"}>
          <Button>+ Create New</Button>
        </Link>
      </div>

      {/* Empty State */}
      {videoList?.length === 0 && (
        <div>
          <EmptyState />
        </div>
      )}
      {/* List of Videos */}
      <VideoList videoList={videoList} />
    </div>
  );
};

export default Dashboard;
