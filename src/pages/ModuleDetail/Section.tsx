
import type { Section } from "../../types/section";

interface SectionProps{
    section: Section
}


export default function SectionDetails( {section}: SectionProps ) {

    return(
        <div className="flex flex-col gap-10">
            <h1 className="text-xl font-semibold">{section.title}</h1>
            <div className="flex flex-col gap-8">
                    <img src={section.image} alt={section.title} className="w-full h-100 object-cover" />
                    <div>
                        <p>{section.description}</p>
                    </div>
            </div>
            <>
            </>
        </div>
       
    )
}


