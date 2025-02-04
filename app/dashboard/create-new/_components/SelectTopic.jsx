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

const SelectTopic = ({ onUserSelect }) => {
  const options = [
    "Custom Prompt",
    "Random AI Story",
    "Scary Story",
    "Historical Story",
    "Bedtime/Fairytale Story",
    "Motivational Speech",
    "Fun Facts",
  ];
  const [selectedOption, setSelectedOption] = useState();

  return (
    <div>
      <h2 className="font-bold text-xl text-primary">Content</h2>
      <p className="text-grey-500">What is the topic of your video?</p>
      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          value != "Custom Prompt" && onUserSelect("topic", value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedOption == "Custom Prompt" && (
        <Textarea
          onChange={(e) => onUserSelect("topic", e.target.value)}
          className="mt-3"
          placeholder="Enter the prompt here..."
        />
      )}
    </div>
  );
};

export default SelectTopic;
