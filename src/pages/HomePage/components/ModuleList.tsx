import type { Module } from "../../../types/module"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { useState } from "react";
import ModuleCard from "./ModuleCard";
import 'swiper/css';

interface ModuleListProps {
    title?: string
    subtitle: string
    modules: Module[]
}

function ModuleList({ title, subtitle, modules }: ModuleListProps) {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    // Swiper loop needs strictly more than slidesPerView * 2 slides (3 * 2 = 6).
    // Triple the list when there are ≤ 3 modules so we always have ≥ 9 slides.
    const slidesToRender = modules.length > 0 && modules.length <= 3
        ? [...modules, ...modules, ...modules]
        : modules;
    const canLoop = slidesToRender.length > 6;

    return (
        <div className=" p-8 rounded-none font-sans select-none">
            <h1 className="text-gray-800 text-2xl font-bold tracking-wide text-center">{title}</h1>
            <div className="mb-6 px-12">
                <h2 className="text-gray-800 text-base font-normal tracking-wide">{subtitle}</h2>
            </div>
            <div className="flex items-center justify-between gap-1 max-w-full">
                {/* Left Navigation Button */}
                <button
                    onClick={() => swiperInstance?.slidePrev()}
                    className="bg-white hover:bg-gray-50 text-black font-black text-2xl w-8 h-[160px] flex items-center justify-center rounded-lg shadow-sm shrink-0 transition-colors duration-200 cursor-pointer"
                >
                    &#8249;
                </button>

                {/* Swiper Container */}
                <div className="flex-1 min-w-0 mx-4">
                    <Swiper
                        spaceBetween={24}
                        slidesPerView={3}
                        loop={canLoop}
                        onSwiper={(swiper) => setSwiperInstance(swiper)}
                        className="w-full"
                    >
                        {slidesToRender.map((module, index) => (
                            <SwiperSlide key={`${module.id}-${index}`}>
                                <ModuleCard
                                    image={module.image}
                                    title={module.title}
                                    Module={module}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Right Navigation Button */}
                <button
                    onClick={() => swiperInstance?.slideNext()}
                    className="bg-white hover:bg-gray-50 text-black font-black text-2xl w-8 h-[160px] flex items-center justify-center rounded-lg shadow-sm shrink-0 transition-colors duration-200 cursor-pointer"
                >
                    &#8250;
                </button>
            </div>
        </div>
    )
}
export default ModuleList