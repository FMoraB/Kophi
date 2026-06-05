import type { Module } from "../ModuleComponents/Module";
export interface ModuleCardProps {
    image: string;
    title: string;
    Module: Module
}

function ModuleCard({ image, title, Module }: ModuleCardProps) {
    const isBlue = Module.id === 1;

    return (
        <div className={`relative h-[160px] rounded-xl p-6 flex flex-col justify-between overflow-hidden shadow-sm border border-gray-100/50 ${isBlue ? 'bg-[#6fa0f6] text-white' : 'bg-white text-[#505050]'
            }`}>
            <div className="z-10">
                <h2 className={`text-xl font-bold tracking-tight uppercase max-w-[80%] leading-snug font-sans ${isBlue ? 'text-white' : 'text-[#505050]'
                    }`}>
                    {Module.title}
                </h2>
            </div>
            {/* Absolute positioned icon in bottom right */}
            <div className="absolute bottom-0 right-0 w-24 h-24 flex items-end justify-end p-2 pointer-events-none">
                <img
                    src={image}
                    alt={title}
                    className="max-w-full max-h-full object-contain"
                />
            </div>
        </div>
    )
}
export default ModuleCard