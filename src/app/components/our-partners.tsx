"use client";
import { useState, useRef } from "react";
import Image from "next/image";

const partners = [
  { name: "Amazon", logo: "https://logos-world.net/wp-content/uploads/2020/06/Amazon-Logo.png", url: "https://www.amazon.com" },
  { name: "Alibaba", logo: "https://logos-world.net/wp-content/uploads/2022/05/Alibaba-Logo.png", url: "https://www.alibaba.com" },
  { name: "Daraz", logo: "https://logos-world.net/wp-content/uploads/2022/05/Daraz-Logo.png", url: "https://www.daraz.com" },
  { name: "eBay", logo: "https://logos-world.net/wp-content/uploads/2020/11/eBay-Logo.png", url: "https://www.ebay.com" },
  { name: "Walmart", logo: "https://logos-world.net/wp-content/uploads/2021/12/Walmart-Logo.png", url: "https://www.walmart.com" },
  { name: "Shopify", logo: "https://logos-world.net/wp-content/uploads/2020/11/Shopify-Logo.png", url: "https://www.shopify.com" },
  { name: "Etsy", logo: "https://logos-world.net/wp-content/uploads/2020/12/Etsy-Logo.png", url: "https://www.etsy.com" },
  { name: "Flipkart", logo: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png", url: "https://www.flipkart.com" },
  { name: "Temu", logo: "https://logos-world.net/wp-content/uploads/2024/01/Temu-Logo.png", url: "https://www.temu.com" },
  { name: "Aliexpress", logo: "https://logos-world.net/wp-content/uploads/2022/12/AliExpress-Logo.png", url: "https://www.aliexpress.com" },
];

const LogoSlider = () => {
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  return (
    <div 
      className="logo-slider-container overflow-hidden relative w-full" 
      onMouseEnter={() => setIsPaused(true)} 
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={sliderRef}
        className={`logo-slider flex items-center gap-12 w-max ${isPaused ? "paused" : ""}`}
      >
        {/* Render partners twice to create infinite loop effect */}
        {[...partners, ...partners].map((partner, index) => (
          <a
            key={index}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="logo-slide flex-shrink-0 grayscale transition-all duration-300 "
          >
            <div className="relative w-32 h-16">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={128}
                height={64}
                className="object-contain"
                unoptimized
              />
            </div>
          </a>
        ))}
      </div>

      {/* Global Styles for Scrolling Animation */}
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .logo-slider {
          animation: scroll 20s linear infinite;
          will-change: transform;
        }
        .paused {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

const OurPartners = () => {
  return (
    <section className="py-20 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-gray-600">
            We collaborate with leading brands and marketplaces to bring you the best selection of products at competitive prices.
          </p>
        </div>
        <LogoSlider />
      </div>
    </section>
  );
};

export default OurPartners;
