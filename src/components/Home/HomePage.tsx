import { useState } from "react"
import NavBar from "../NavBar"
import MainBanner from "./MainBanner"
import ModuleList from "./ModuleList"
import ExploreList from "./ExploreList"
import type { Module } from "../ModuleComponents/Module"
import bannerImg from "../../assets/banner.jpg"
import Footer from "../Footer"
import { socialMedia } from "../socialData"

interface HomeProps {
    modules: Module[]
}

function HomePage({ modules }: HomeProps) {
    const [recommendedModules] = useState<Module[]>(modules.filter(module => module.type === "Recommended"))
    const [popularModules] = useState<Module[]>(modules.filter(module => module.type === "Popular"))
    const [exploreModules] = useState<Module[]>(modules)



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

export default HomePage
