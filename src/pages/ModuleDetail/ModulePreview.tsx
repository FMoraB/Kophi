import NavBar from "../../components/NavBar"
import { useParams } from "react-router"
import { useSingleModule } from "../../hooks/useSingleModule"

function ModulePreview() {
    const { id } = useParams<{ id: string }>()
    const { singleModule } = useSingleModule(Number(id))

    if (!singleModule) {
        return (
            <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
                <div className="text-2xl">Loading module...</div>
            </div>
        )
    }
    console.log(singleModule)
    return (
        <>
            <NavBar />
            <div className="pt-20 pl-20 pr-20">
                <div>
                    <img src={singleModule.image} alt={singleModule.title} className="w-full h-100 object-cover" />

                </div>
                <div className="mt-10">
                    <h1 className="font-bold text-2xl">{singleModule.title}</h1>
                    <div className="w-30ch">
                        <h2>{singleModule.description}</h2>
                    </div>
                    <div className="flex gap-5 mt-5">
                        <button className="bg-[#3F75FF] text-white p-2 rounded-md cursor-pointer">Start Module</button>
                        <button className="bg-white text-black p-2 rounded-md border-black border cursor-pointer">Add to Wishlist</button>
                    </div>
                    <div className=" bg-[#B3B3B3] rounded-md mt-20 mb-20 p-12">
                        <h3 className="font-bold text-2xl text-white mb-5">About this module</h3>
                        <div className="flex flex-col md:flex-row gap-10 md:gap-100">
                            <div>
                                <div className="mb-4">
                                    <p className="font-semibold text-lg">Difficulty</p>
                                    <p>{singleModule.difficulty}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">Duration</p>
                                    <p>About {singleModule.duration} hours</p>
                                </div>
                            </div>
                            <div>
                                <div className="mb-4">
                                    <p className="font-semibold text-lg">Language</p>
                                    <p>{singleModule.language}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">Age Range</p>
                                    <p>{singleModule.ageRange}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>

    )
}

export default ModulePreview