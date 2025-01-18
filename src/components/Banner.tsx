import { useState, useEffect } from "react";
import { IBanner } from "@/interfaces";
import Link from "next/link";
import Image from "next/image";

interface BannerProps {
  banners: IBanner[];
}

export default function Banner({ banners }: BannerProps) {
  const [displayedBanners, setDisplayedBanners] = useState<IBanner[]>([]);

  useEffect(() => {
    const updateBanners = () => {
      let newBanners = [...banners];

      const mainBanner =
        newBanners.find((b) => b.position === 1) || newBanners[0];
      newBanners = newBanners.filter((b) => b !== mainBanner);

      // Shuffle remaining banners
      const shuffledBanners = shuffleArray(newBanners);

      // Update the displayed banners with the main banner always at index 1
      setDisplayedBanners([
        shuffledBanners[0],
        mainBanner,
        ...shuffledBanners.slice(1),
      ]);
    };

    const shuffleArray = (array: IBanner[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    updateBanners();

    const interval = setInterval(updateBanners, 1 * 30 * 1000);

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <section className="bg-secondary p-4 text-center text-foreground rounded-lg my-0 sm:my-5">
      <h1 className="text-sm sm:text-lg mb-8 px-4 font-bold text-highlight">
        Your hub for navigating the Dark Web, accessing hidden sites, forums,
        and privacy tools.
      </h1>
      <section className="relative w-full overflow-hidden rounded-lg">
        {/* Banner Images Section */}
        <div className="flex w-full h-[70px] sm:h-[150px] gap-1">
          {displayedBanners.map((banner, index) => {
            const bannerLink =
              banner.linkType === "internal"
                ? `/${banner.postLink?.slug.current}`
                : banner.externalLink;

            return (
              <Link
                key={index}
                href={bannerLink || "/"}
                target={banner.linkType === "external" ? "_blank" : "_self"}
                className="w-1/3 h-full flex-shrink-0"
              >
                <Image
                  src={banner.media.asset.url}
                  alt={banner.title}
                  width={1200}
                  height={400}
                  className="w-full h-full object-cover rounded-lg"
                  quality={75}
                  priority
                />
              </Link>
            );
          })}
        </div>
      </section>
    </section>
  );
}
