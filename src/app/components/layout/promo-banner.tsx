"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react"; // For close button (Install: `npm install lucide-react`)

const PromoBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    // Auto-hide banner after 10 seconds (optional)
    //   useEffect(() => {
    //     const timer = setTimeout(() => setIsVisible(false), 10000);
    //     return () => clearTimeout(timer);
    //   }, []);

    if (!isVisible) return null; // Hide banner when closed

    return (
        <div
            className="bg-black text-white text-sm md:text-base py-2 px-4 flex items-center justify-between animate-slide-in transition-all"
        >
            {/* Left: Promo Message */}
            <p className="text-center mx-auto font-semibold tracking-wide">
                🎉 BLACK FRIDAY MEGA SALE: <span className="underline">Flat 50% OFF</span> on all items! 🛍️ Limited time only! ⏳
            </p>

            {/* Right: Close Button */}
            <button
                onClick={() => setIsVisible(false)}
                className="ml-4 p-1 rounded-full hover:bg-white/20 transition"
            >
                <X className="w-5 h-5 text-white" />
            </button>
        </div>
    );
};

export default PromoBanner;
