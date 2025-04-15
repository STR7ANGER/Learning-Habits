import { useState, useEffect } from "react";
import { assets } from "./../assets/assets";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";

const Hero = () => {
  // Define content for each slide
  const slides = [
    {
      image: assets.ai,
      title: "AI Solutions",
      description:
        "Join our AI development program and build intelligent solutions for tomorrow's challenges",
      buttonText: "Explore AI Courses",
    },
    {
      image: assets.blockchain,
      title: "Blockchain",
      description:
        "Master decentralized applications and blockchain technologies with our expert-led courses",
      buttonText: "Discover Blockchain",
    },
    {
      image: assets.detavis,
      title: "Data Visualization",
      description:
        "Transform complex data into powerful visual stories with our data visualization courses",
      buttonText: "Start Visualizing",
    },
    {
      image: assets.fullstack,
      title: "Fullstack Development",
      description:
        "Build complete web applications from front to back with our comprehensive fullstack program",
      buttonText: "Become Fullstack",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Ensure we always have a valid slide to reference
  const currentSlideData = slides[currentSlide] || slides[0];

  return (
    <div className="relative h-[calc(70vh-64px)] w-full overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image container with proper rendering */}
          <div className="absolute inset-0 w-full h-full">
            {typeof slide.image === "string" ? (
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              // Modified SVG rendering to fill the space
              <div className="w-full h-full">
                {/* Use proper TypeScript handling for JSX elements */}
                {slide.image && typeof slide.image === 'object' && 'type' in slide.image ? 
                  <div className="w-full h-full object-cover">{slide.image}</div> :
                  <div className="w-full h-full bg-gray-800"></div>
                }
              </div>
            )}
          </div>

          {/* Overall dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Left side gradient overlay for text highlighting */}
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-lg">
            {/* Title with TextPressure */}
            <div className="mb-6">
              <BlurText
                text={currentSlideData?.title}
                delay={15}
                animateBy="words"
                direction="top"
                className="text-5xl mb-8 text-white"
              />
            </div>

            {/* Description */}
            <p className="text-xl text-white mb-8">
              {currentSlideData?.description}
            </p>

            {/* CTA Button */}
            <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors shadow-lg">
              {currentSlideData?.buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Vertical Slide indicators on right side */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col space-y-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;