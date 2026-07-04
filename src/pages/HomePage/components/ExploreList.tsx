import { useEffect, useState } from "react";
import type { Module } from "../../../types/module";
import ModuleCard from "./ModuleCard"

interface ExploreListProps {
    title: string
    modules: Module[]
}

function ExploreList({ title, modules }: ExploreListProps) {
    const [exploreModules, setExploreModules] = useState<Module[]>(modules)
    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => {
        const filteredModules =
            modules.filter(module => module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                module.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        setExploreModules(filteredModules)

    }, [searchTerm, modules])
    return (
        <div className="max-w-7xl mx-auto px-12 py-16 pb-40">
            <div className="mb-8">
                <h1 className="text-gray-800 text-3xl font-bold tracking-tight text-center">{title}</h1>
            </div>
            <search className="flex justify-center">
                <input
                    type="text"
                    placeholder="Search modules"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
                />
            </search>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
                {exploreModules.map((module) => (
                    <ModuleCard
                        key={module.id}
                        image={module.image}
                        title={module.title}
                        Module={module}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExploreList