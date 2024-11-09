import { BellIcon, Share2Icon, CalendarIcon, FileTextIcon } from "lucide-react";
import ClientTweetCard from "@/components/ui/tweet-card/client-tweet-card";
import { InstagramEmbed } from "react-social-media-embed";

import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    // Icon: <FileTextIcon />,
    // name: "Save your files",
    description: "Controversy??",
    href: "https://x.com/IEEEAshoka/status/1849082373901803879",
    cta: "View Tweet",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="shadow-2xl bg-white rounded-xl absolute inset-0 m-auto w-[90%] md:w-2/3 h-2/3 flex items-center justify-center">
        <ClientTweetCard id="1848054053256708267" />
      </div>
    ),
  },
  {
    // Icon: BellIcon,
    // name: "Notifications",
    description: "Mixers.",
    href: "https://x.com/IEEEAshoka/status/1728421611899060449",
    cta: "View Tweet",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="shadow-2xl bg-white rounded-xl absolute inset-0 m-auto w-[90%] md:w-2/3 h-2/3 flex items-center justify-center">
        <ClientTweetCard id="1728421611899060449" />
      </div>
      // <div className="shadow-2xl bg-white rounded-xl absolute inset-0 m-auto w-fit h-fit flex items-center justify-center">
      //   <InstagramEmbed
      //     url="https://www.instagram.com/p/DBi8jvDPEsD"
      //     width={500}
      //     // captioned
      //   />
      // </div>
    ),
  },
  {
    // Icon: Share2Icon,
    // name: "Integrations",
    description: "What could it be?",
    href: "https://x.com/IEEEAshoka/status/1849082373901803879",
    cta: "View Tweet",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="shadow-2xl bg-white rounded-xl absolute inset-0 m-auto w-[90%] md:w-2/3 h-2/3 flex items-center justify-center">
        <ClientTweetCard id="1849082373901803879" />
      </div>
    ),
  },
  {
    // Icon: CalendarIcon,
    // name: "Calendar",
    description: "Future IT project or maybe not?",
    className: "col-span-3 lg:col-span-1",
    href: "https://x.com/IEEEAshoka/status/1838985898090017171",
    cta: "View Tweet",
    background: (
      <div className="shadow-2xl bg-white rounded-xl absolute inset-0 m-auto w-[90%] md:w-2/3 h-2/3 flex items-center justify-center">
        <ClientTweetCard id="1838985898090017171" />
      </div>
    ),
  },
];

export function Media() {
  return (
    <div className="bg-[#fbfbf8] container px-4 py-10">
      <h2 className="text-4xl flex flex-row items-center gap-4 md:text-5xl font-bold mb-12 pt-12 text-[#302f2f]">
        Media
      </h2>
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}
