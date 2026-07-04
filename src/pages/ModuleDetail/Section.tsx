
import type { Section } from "../../types/section";

interface SectionProps{
    section: Section
}


export default function SectionDetails( {section}: SectionProps ) {

    return(
        <div className="flex flex-col gap-6 w-full">
            <h1 className="text-xl md:text-2xl font-semibold">{section.title}</h1>
            <div className="flex flex-col gap-6">
                <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-60 sm:h-72 md:h-96 rounded-2xl object-cover"
                />
                <div className="prose prose-sm sm:prose-base max-w-none text-gray-800">
                    <p>{section.description}</p>
                </div>
            </div>
        </div>
    )
}


