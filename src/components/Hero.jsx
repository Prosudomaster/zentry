import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const totalVideos = 4;

  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const mainVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const miniVideoRef = useRef(null);

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  /* CLICK ANIMATION */
  useGSAP(
    () => {
      if (!hasClicked) return;

      gsap.set("#next-video", { visibility: "visible" });

      gsap.to("#next-video", {
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => {
          if (nextVideoRef.current) {
            nextVideoRef.current.currentTime = 0;
            nextVideoRef.current.play();
          }
        },
      });

      gsap.from("#current-video", {
        scale: 0,
        duration: 1.2,
        ease: "power1.inOut",
      });
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  /* FRAME SHAPE */
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });
  });

  /* SCROLL ANIMATION */
  useGSAP(() => {
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* MINI PREVIEW */}
        <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
          <div
            onClick={handleMiniVideoClick}
            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
          >
            <video
              ref={miniVideoRef}
              src={getVideoSrc(upcomingVideoIndex)}
              loop
              muted
              id="current-video"
              className="size-64 scale-150 object-cover object-center"
              onLoadedData={handleVideoLoad}
            />
          </div>
        </div>

        {/* NEXT VIDEO (ANIMATED) */}
        <video
          ref={nextVideoRef}
          id="next-video"
          src={getVideoSrc(currentIndex)}
          loop
          muted
          className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        {/* MAIN BACKGROUND VIDEO */}
        <video
          ref={mainVideoRef}
          src={getVideoSrc(
            currentIndex === totalVideos ? 1 : currentIndex
          )}
          autoPlay
          muted
          loop
          playsInline
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        {/* TEXT */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the MetaGame Layer <br />
              unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
