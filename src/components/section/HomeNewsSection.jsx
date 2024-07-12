import React from "react";
import HomeNewsCard from "../card/HomeNewsCard.jsx";
import MainBannerWithoutLogo from "../universal/MainBannerWithoutLogo";

const HomeNewsSection = () => {
  return (
    <div className="flex h-[1000px] w-full flex-col bg-custom-gray-300">
      <MainBannerWithoutLogo bannerTitle={"Tęczowe Wiadomości"} />
      <div className="bg-custom-blue-200 mt-8 flex h-[750px] w-full justify-center gap-16 py-8">
        <HomeNewsCard />
        <HomeNewsCard />
        <HomeNewsCard />
      </div>
    </div>
  );
};

export default HomeNewsSection;
