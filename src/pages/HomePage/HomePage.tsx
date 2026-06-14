import { useMemo } from "react"
import { useLoaderData } from "react-router-dom"

import NavBar from "../../components/NavBar"
import MainBanner from "../../components/Home/MainBanner"
import ModuleList from "../../components/Home/ModuleList"
import ExploreList from "../../components/Home/ExploreList"
import type { Module } from "../../components/ModuleComponents/Module"
import bannerImg from "../../assets/banner.jpg"
import Footer from "../../components/Footer"
import { socialMedia } from "../../components/socialData"

function HomePage() {
    const data = useLoaderData<any>()

    const recommendedModules = useMemo<Module[]>(() => data.modules.filter((module: Module) => module.type === "Recommended"), [data.modules])
    const popularModules = useMemo<Module[]>(() => data.modules.filter((module: Module) => module.type === "Popular"), [data.modules])
    const exploreModules = data.modules



    return (
        <>
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
        </>
    )
}

export const modulesLoader = async () => {
    const modulesData = await fetch(`http://localhost:3000/api/modules`)
    const rawModules = await modulesData.json()
    
    const TYPE_MAP: Record<number, string> = {
        1: "Default",
        2: "Popular",
        3: "Recommended",
    }
    
    const modules = rawModules.map((raw: any) => ({
        id: raw.id,
        title: raw.title,
        image: raw.image,
        description: raw.description,
        type: TYPE_MAP[raw.module_types_id] ?? "Default",
        sections: [],
        tags: [],
        difficulty: raw.difficulty,
        language: raw.language,
        duration: raw.duration,
        ageRange: raw.age_range,
        views: raw.views,
    }))
    
    return { modules }
}

export default HomePage
