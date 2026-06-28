import { Link, useParams, useLoaderData, redirect, useNavigate } from "react-router-dom"
import type { LoaderFunctionArgs } from "react-router-dom";
import type { Section } from "../../types/section";
import { ChevronLeft, ChevronRight } from 'lucide-react'
import NavBar from "../../components/NavBar";
import { useState } from "react";
import SectionDetails from "./Section";
import { getUser } from "../../types/user";


export default function Sections() {
    const params = useParams<{ moduleId: string }>();
    const navigate = useNavigate();

    const { sections } = useLoaderData() as {
        sections: Section[];
    };

    console.log(sections)


    const [selectedNumber, setSelectedNumber] = useState(0);
    const selectedSection = sections[selectedNumber];

    function previous() {
        if (selectedNumber > 0) {
            setSelectedNumber(selectedNumber - 1);
        }
    }

    function next() {
        if (selectedNumber < sections.length - 1) {
            setSelectedNumber(selectedNumber + 1);
        }
    }

    const handleComplete = async (moduleId: number) => {
    const result = await completeModulesAdd(moduleId);

    if (!result.error) {
        navigate("/profile");
        console.log(result);
        return result;  
    }
};

    return (
        <>
            <NavBar />
            <div className="p-20 w-screen">
                <Link to="/">
                    <button className="text-black cursor-pointer mb-10 flex items-center">
                        <ChevronLeft /> Exit module
                    </button>
                </Link>
                <div className="flex flex-row justify-items-start gap-30">
                    <div className="">
                        <h2 className="mb-4.5 text-xl font-bold">Sections</h2>
                        <div className="flex flex-col gap-3 w-50">
                            {sections.map((section, index) => (
                                <p onClick={() => setSelectedNumber(index)}>{section.title}</p>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <SectionDetails section={selectedSection} />
                        <div className="flex gap-4 mt-12 justify-between">
                            <button className="bg-gray-200 text-black py-3 px-10 rounded-md cursor-pointer flex items-center" onClick={() => (previous())}>
                                <ChevronLeft /> Previous
                            </button>
                            {selectedNumber === sections.length - 1 ?
                                <button className="bg-[#3F75FF] text-white py-3 px-10 rounded-md border border-[#3F75FF] cursor-pointer flex items-center" onClick={() => {(next()), handleComplete(Number(params.moduleId))}}>
                                    Finish
                                    <ChevronRight />
                                </button>
                                :
                                <button className="bg-[#3F75FF] text-white py-3 px-10 rounded-md border border-[#3F75FF] cursor-pointer flex items-center" onClick={() => (next())}>
                                    Next
                                    <ChevronRight />
                                </button>}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const sectionsLoader = async ({ params }: LoaderFunctionArgs) => {
    const moduleSections = await fetch(`http://localhost:3000/api/modules/${params.moduleId}/sections`)
    const rawData = await moduleSections.json()

    if (!rawData) {
        return { sections: null }
    }
    console.log(rawData)
    const sections: Section[] = rawData;

    return { sections }
}

export const completeModulesAdd = async (moduleId: number) => {
    const user = getUser();

    const response = await fetch(
        `http://localhost:3000/api/users/${user.id}/completedModules/${moduleId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    const result = await response.json();

    return result;

}
