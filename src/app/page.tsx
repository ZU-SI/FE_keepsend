"use client";

import BannerSection from "@/app/(home)/_components/BannerSection";
import ServiceSection from "@/app/(home)/_components/ServiceSection";
import SolutionSection from "@/app/(home)/_components/SolutionSection";
import GlobalHeader from "@/components/layouts/GlobalHeader";

export default function Home() {
  return (
    <main id="main" >
      <GlobalHeader />
      <BannerSection startIdx={0} />
      <ServiceSection startIdx={3} />
      <SolutionSection startIdx={11} />
    </main>
  );
}
