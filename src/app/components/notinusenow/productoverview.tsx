"use client";
import { useState } from "react";
import Image from "next/image";

export default function Productoverview() {
    const [activeTab, setActiveTab] = useState<string>("description");

    const tabs = [
        {
            id: "description",
            label: "Description",
            content: `Embodying the raw, wayward spirit of rock ’n’ roll, the Kilburn
        portable active stereo speaker takes the unmistakable look and
        sound of Marshall, unplugs the chords, and takes the show on the
        road.
        <br /><br />
        Weighing in under 7 pounds, the Kilburn is a lightweight piece of
        vintage styled engineering. Setting the bar as one of the loudest
        speakers in its class, the Kilburn is a compact, stout-hearted hero
        with a well-balanced audio which boasts a clear midrange and
        extended highs for a sound that is both articulate and pronounced.
        The analogue knobs allow you to fine-tune the controls to your
        personal preferences while the guitar-influenced leather strap
        enables easy and stylish travel.`,
        },
        {
            id: "additional-info",
            label: "Additional Information",
            content: `Additional product information will go here. You can list detailed
        specifications or other attributes.`,
        },
        {
            id: "reviews",
            label: "Reviews [5]",
            content: `Reviews from users will go here. Display user feedback, ratings, or
        testimonials.`,
        },
    ];

    const images = [
        { src: "/cartsofa1.png", alt: "Sofa 1" },
        { src: "/cartsofa2.png", alt: "Sofa 2" },
    ];

    return (
        <div className="container mx-auto px-6 md:px-20 py-16">
            {/* Tabs Navigation */}
            <div className="flex justify-center border-b mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-6 py-2 hidden md:block text-lg font-medium ${activeTab === tab.id
                            ? "text-black border-b-2 border-black"
                            : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="max-w-3xl mx-auto mb-12">
                {tabs
                    .filter((tab) => tab.id === activeTab)
                    .map((tab) => (
                        <p
                            key={tab.id}
                            className="text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: tab.content }}
                        />
                    ))}
            </div>

            {/* Image Section */}
            <div className="grid md:grid-cols-2 gap-8 px-8">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="bg-[#FFF9F3] flex justify-center rounded-md items-center"
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={500}
                            height={300}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
