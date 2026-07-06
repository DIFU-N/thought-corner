import React from "react";
import { FaDiscord, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const Social = () => {
  return (
    <div className="fixed hidden md:flex flex-col gap-y-5 lg:gap-y-7 justify-end items-center w-[10%] h-screen">
      <div className="grid  text-3xl lg:text-xl gap-y-5 lg:gap-y-6">
        <FaInstagram />
        <FaLinkedin />
        <FaGithub />
        <FaDiscord />
        <FaTwitter />
      </div>
      <div className="border-l border-black h-24 lg:h-28"></div>
    </div>
  );
};

export default Social;
