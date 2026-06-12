import { useMemo } from "react"
//Explicación use memo: UseState congela su estado en [], osea la primera vez se ejecuta el codigo de la funcion de useState y en las siguientes no se vuelve a ejecutar, es como un estado pero para funciones. 
//Use effect congela su estado en [dependencia], osea la primera vez se ejecuta el codigo de useEffect y en las siguientes no se vuelve a ejecutar hasta que cambie la dependencia.|
//UseMemo memoriza el estado de la funcion, osea la primera vez se ejecuta el codigo de la funcion de useMemo y en las siguientes no se vuelve a ejecutar hasta que cambie la dependencia.
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
    const recommendedModules = useMemo<Module[]>(() => modules.filter(module => module.type === "Recommended"), [modules])
    const popularModules = useMemo<Module[]>(() => modules.filter(module => module.type === "Popular"), [modules])
    const exploreModules = modules



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
