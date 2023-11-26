import React, { useState, useEffect } from "react";
import slider1 from "../assets/slider1.jpeg";
import slider2 from "../assets/slider2.jpeg";
import slider3 from "../assets/slider3.jpeg";
import slider4 from "../assets/slider4.jpeg";
import slider5 from "../assets/slider5.jpg";
import HeroSlider, { Overlay, Slide, MenuNav } from "hero-slider";

const CarouselSlider = () => {
  const options = {
    items: 3, // Number of items to display at a time
    autoplay: true,
    autoplayTimeout: 500, // Auto-play interval in milliseconds
    nav: true, // Show navigation arrows
  };

  return (
    <HeroSlider
      height={"80vh"}
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 10,
        shouldAutoplay: true,
        slidingAnimation: "right_to_left",
        onSliding: (nextSlide) =>
          console.debug("onSliding(nextSlide): ", nextSlide),
        onBeforeSliding: (previousSlide, nextSlide) =>
          console.debug(
            "onBeforeSliding(previousSlide, nextSlide): ",
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide) =>
          console.debug("onAfterSliding(nextSlide): ", nextSlide),
      }}
    >

      <Slide
        background={{
          backgroundImageSrc: slider1,
        }}
      />

      <Slide
        background={{
          backgroundImageSrc: slider5,
        }}
      />

      <Slide
        background={{
          backgroundImageSrc: slider4,
        }}
      />

      <Slide
        background={{
          backgroundImageSrc: slider3,
        }}
      />

    </HeroSlider>
  );
};

export default CarouselSlider;
