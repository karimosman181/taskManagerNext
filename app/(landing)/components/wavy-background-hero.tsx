"use client";
import React from "react";
import { WavyBackground } from "./ui/wavy-background";
import { Medal } from "lucide-react";


export function WavyBackgroundHero() {
    return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
        <div className=" flex justify-center content-center flex-wrap">
        <div className="mb-4 flex w-[150px]  text-[8px] items-center border shadow-sm p-1 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task managment
        </div>
        </div>
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Hero waves are cool
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Leverage the power of canvas to create a beautiful hero section
      </p>
      <div className="flex flex-col md:flex-row justify-center content-center flex-wrap mt-5 space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
      </div>
    </WavyBackground>
  );
}
