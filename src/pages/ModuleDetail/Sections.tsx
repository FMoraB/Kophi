import { Link, NavLink, Outlet, useParams, useLoaderData } from "react-router-dom"
import type { LoaderFunctionArgs } from "react-router-dom";
import type { Section } from "../../types/section";


export default function Sections() {
    const params = useParams<{ moduleId: string }>();

    const { sections } = useLoaderData() as {
    sections: Section[];
};
console.log(sections)

    return (
        <div>
            {sections.map((section) => (
                <NavLink key={section.id} to={`${section.id}`} className={({ isActive }) => {
                    return isActive ? 'text-red-500' : ''
                }}>
                    Title: {section.title}
                </NavLink>
            ))}
            <Outlet></Outlet>
        </div>

    )
}

export const sectionsLoader = async ({ params }: LoaderFunctionArgs) => {
    const moduleSections = await fetch(`http://localhost:3000/api/modules/${params.moduleId}/sections`)
    const rawData = await moduleSections.json()
    if (!rawData) {
        return { sections: null }
    }
    console.log(rawData)
    const sections:Section[] = rawData;

    return { sections }
}
