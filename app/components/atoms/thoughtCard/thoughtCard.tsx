import { Thought } from "@/app/utils/types/thoughts";
import React from "react";

type props = {
  thought: Thought;
};

const ThoughtCard: React.FC<props> = ({ thought }) => {
  const date = new Date(thought.date);

  return (
    <div className="flex flex-col border-y-2 gap-2 border-gray-400 p-3 text-black font-thin cursor-pointer hover:bg-[#f2c323]">
      <div className="flex justify-between">
        <div className="uppercase text-sm">{thought.group}</div>
        <div className="text-sm">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="text-2xl font-bold">{thought.title}</div>
      <div className="text-sm">{thought.subtitle}</div>
    </div>
  );
};

export default ThoughtCard;
