"use client"
import { db } from '@/configs/db';
import { useEffect } from 'react';
import {Users} from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React from 'react'

const Provider = ({ children }) => {

  const {user} = useUser();

  useEffect(() => {
    user&&isNewUser();
  }, [user])

  const isNewUser = async () => {
    const result = await db.select().from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
  
    console.log(result);
  
    if (!result[0]) {
      const name = user?.fullName || user?.primaryEmailAddress?.emailAddress; // Use email as name if fullName is missing
      
      await db.insert(Users).values({
        name: name,
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
      });
    }
  };
  

  return (
    <div>{children}</div> 
  )
}

export default Provider