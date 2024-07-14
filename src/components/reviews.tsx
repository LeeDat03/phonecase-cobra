"use client";

import React, {
  CSSProperties,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Image from "next/image";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Phone from "./phone";

const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
];

function splitArray<T>(array: Array<T>, numParts: number) {
  const results: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    let inde = i % numParts;

    if (!results[inde]) {
      results[inde] = [];
    }

    results[inde].push(array[i]);
  }
  return results;
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews?: Array<string>;
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  const columnsRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnsRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnsRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnsRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={columnsRef}
      className={cn("animate-marquee space-y-8", className)}
      style={{ "--marquee-duration": duration } as CSSProperties}
    >
      {reviews?.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review
          key={reviewIndex}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          imgSrc={imgSrc}
        />
      ))}
    </div>
  );
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

function Review({ imgSrc, className, ...props }: ReviewProps) {
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5",
        className
      )}
      {...props}
      style={{ animationDelay }}
    >
      <Phone imgSrc={imgSrc} />
    </div>
  );
}

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(PHONES, 3);

  const columns1 = columns[0];
  const columns2 = columns[1];
  const columns3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...columns1, ...columns3.flat(), ...columns2]}
            reviewClassName={(reviewIndex) =>
              cn({
                "md:hidden":
                  reviewIndex >= columns1.length + columns3[0].length,
                "lg:hidden": reviewIndex >= columns1.length,
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...columns2, ...columns3[1]]}
            reviewClassName={(reviewIndex) =>
              cn({
                "md:hidden":
                  reviewIndex >= columns1.length + columns3[0].length,
                "lg:hidden": reviewIndex >= columns1.length,
              })
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={columns3.flat()}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= columns2.length ? "lg:hidden" : ""
            }
            msPerPixel={10}
          />
        </>
      )}
    </div>
  );
}

const Reviews = () => {
  return (
    <MaxWidthWrapper className="relative max-w-5xl overflow-hidden">
      <Image
        src="/what-people-are-buying.png"
        alt="Image gallery"
        aria-hidden={true}
        width={100}
        height={100}
        className="absolute select-none hidden xl:block top-1/3 -left-32"
      />

      <ReviewGrid />
    </MaxWidthWrapper>
  );
};

export default Reviews;
