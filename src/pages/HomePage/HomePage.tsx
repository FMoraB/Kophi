import { useMemo } from "react"
import { useLoaderData } from "react-router-dom"

import NavBar from "../../layouts/NavBar"
import MainBanner from "./components/MainBanner"
import ModuleList from "./components/ModuleList"
import ExploreList from "./components/ExploreList"
import type { Module } from "../../types/module"
import bannerImg from "../../assets/KophiBan.svg"
import Footer from "../../layouts/Footer"
import { socialMedia } from "../../components/socialData"

function HomePage() {
    const data = useLoaderData<any>()

    const recommendedModules = useMemo<Module[]>(() => data.rawModules.filter((module: Module) => module.module_types_id === 3), [data.rawModules])
    const popularModules = useMemo<Module[]>(() => data.rawModules.filter((module: Module) => module.module_types_id === 2), [data.rawModules])
    const exploreModules = data.rawModules

    return (
        <div>
            <NavBar />
            <div className="pt-20">
                <MainBanner title="Learn about AI now" description="Learn on a simple way how the AI improves our daily life" image={bannerImg} />
            </div>
            {/*Category section*/}
            <section className="bg-[#f2f2f2] pt-30 pb-48">
                <ModuleList title="EXPLORE YOUR INTERESTS" subtitle="Recommended" modules={recommendedModules} />
                <ModuleList subtitle="Popular" modules={popularModules} />
            </section>
            <section>
                < ExploreList title="EXPLORE MORE" modules={exploreModules} />
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

export default HomePage
