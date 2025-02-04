"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SelectDuration = ({ onUserSelect }) => {
  return (
    <div className="mt-7">
      <h2 className="font-bold text-xl text-primary">Duration</h2>
      <p className="text-grey-500">How long should the video be?</p>
      <Select
        onValueChange={(value) => {
          value != "Custom Prompt" && onUserSelect("duration", value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="15 seconds">15 seconds</SelectItem>
          <SelectItem value="20 seconds">20 seconds</SelectItem>
          <SelectItem value="25 seconds">25 seconds</SelectItem>
          <SelectItem value="30 seconds">30 seconds</SelectItem>
          <SelectItem value="40 seconds">40 seconds</SelectItem>
          <SelectItem value="45 seconds">45 seconds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDuration;
