import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./dotButton";
import { PrevButton, NextButton, usePrevNextButtons } from "./buttons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Photo } from "@/app/about/helpers";
import { Skeleton } from "@nextui-org/react";

type PropType = {
  slides: Photo[];
  options?: EmblaOptionsType;
  isLoading: boolean;
};

const ImageSkeleton = () => (
    <div className="relative aspect-square overflow-hidden rounded-[1.75rem] group">
      <Skeleton className="w-full h-full" />
  </div>
);

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, isLoading } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="embla">
      <h1 className="text-4xl text-[#23417c] font-bold md:text-5xl mb-4">
        Gallery
      </h1>

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div className="embla__slide" key={`skeleton-${index}`}>
                  <ImageSkeleton />
                </div>
              ))
            : slides.map((slide, index) => (
                <div className="embla__slide" key={index}>
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="relative aspect-square overflow-hidden rounded-[1.75rem] group"
                  >
                    <Image
                      src={slide.image_url}
                      alt={slide.caption}
                      layout="fill"
                      objectFit="cover"
                      className="transition-all duration-300 group-hover:scale-110 group-hover:brightness-50"
                    />
                    <div className="absolute inset-0 flex items-end p-3 justify-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-[#fbfbf8] text-center font-semibold px-4 py-2 text-md md:text-2xl">
                        {slide.caption}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
