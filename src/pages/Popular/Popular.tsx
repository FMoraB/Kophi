import { useMemo } from "react"
import { Link, useLoaderData } from "react-router-dom"

import NavBar from "../../layouts/NavBar"
import ModuleList from "../HomePage/components/ModuleList"
import ExploreList from "../HomePage/components/ExploreList"
import type { Module } from "../../types/module"
import Footer from "../../layouts/Footer"
import { socialMedia } from "../../components/socialData"
import moduleCard from "../Profile/component/moduleCard"
import ModuleCard from "../Profile/component/moduleCard"
import { ChevronLeft } from "lucide-react"

function Popular() {
    const data = useLoaderData<any>()
    const popularModules = useMemo<Module[]>(() => data.rawModules.filter((module: Module) => module.module_types_id === 2), [data.rawModules])

    return (
        <div>
            <NavBar />
            <div className="pt-24 px-4 sm:px-6 md:px-8 lg:px-12">
                <Link to="/">
                        <button className="text-black cursor-pointer mb-10 flex items-center hover:opacity-70 transition-opacity">
                            <ChevronLeft /> Back
                        </button>
                    </Link>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 md:mb-15 w-full text-center">Popular</h1>
                <div className="flex flex-col  gap-8 justify-center items-stretch">
                <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 md:mb-6 w-full text-left">#1</h2>
                <ModuleCard module={popularModules[0]} />
                </div>
                <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 md:mb-6 w-full text-left">#2</h2>
                <ModuleCard module={popularModules[1]} />
                </div>
                <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 md:mb-6 w-full text-left">#3</h2>
                <ModuleCard module={popularModules[2]} />
                </div>
                </div>
            </div>
            {/*Category section*/}
            <section>
                < ExploreList title="EXPLORE MORE" modules={popularModules} />
            </section>
            <footer>
                <Footer socialMedia={socialMedia} />
            </footer>
        </div>
    )
}

export const modulesLoader = async () => {
    const modulesData = await fetch(`http://localhost:3000/api/modules`)
    const rawModules = await modulesData.json()
    
    return { rawModules }
}

export default Popular
