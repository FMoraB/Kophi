import NavBar from "../../components/NavBar"
import { Link, type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router"
import { useLoaderData } from "react-router-dom"
import { ChevronLeft } from 'lucide-react'
import { getUser } from "../../types/user"
import { useState } from "react"


function ModulePreview() {
    //instead of using useEffect, we can use useLoaderData to get the data
    const data = useLoaderData<any>()

    const [isItOnWishList, setIsItOnWishList] = useState<boolean>(data.isOnWishList);

    const handleWishlist = async () => {
        const result = await wishListAdd(data.module.id);
        setIsItOnWishList(!isItOnWishList);
    };

    if (!data.module) {
        return (
            <div className="min-h-screen bg-white text-black p-8 flex items-center justify-center">
                <div className="text-2xl">Loading module...</div>
            </div>
        )
    }



    return (
        <>
            <NavBar />
            <div className="pt-20 pl-20 pr-20">
                <Link to="/">
                    <button className="text-black cursor-pointer mb-10 flex items-center">
                        <ChevronLeft /> Back
                    </button>
                </Link>
                <div>
                    <img src={data.module.image} alt={data.module.title} className="w-full h-100 object-cover" />

                </div>
                <div className="mt-10">
                    <h1 className="font-bold text-2xl">{data.module.title}</h1>
                    <div className="w-30ch">
                        <h2>{data.module.description}</h2>
                    </div>
                    <div className="flex gap-5 mt-5">
                        <Link to={`/sections/${data.module.id}`}>
                            <button className="bg-[#3F75FF] text-white p-2 rounded-md cursor-pointer">Start Module</button>
                        </Link>
                        <button className={
                            isItOnWishList
                                ? "bg-white text-[#3F75FF] p-2 rounded-md border border-[#3F75FF] cursor-pointer"
                                : "bg-white text-black p-2 rounded-md border border-black cursor-pointer "
                        }
                            onClick={() => { (wishListAdd(data.module.id)), setIsItOnWishList(!isItOnWishList) }}>{isItOnWishList ? "Wishlisted" : "Add to Wishlist"}</button>
                    </div>
                    <div className=" bg-[#B3B3B3] rounded-md mt-20 mb-20 p-12">
                        <h3 className="font-bold text-2xl text-white mb-5">About this module</h3>
                        <div className="flex flex-col md:flex-row gap-10 md:gap-100">
                            <div>
                                <div className="mb-4">
                                    <p className="font-semibold text-lg">Difficulty</p>
                                    <p>{data.module.difficulty}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">Duration</p>
                                    <p>About {data.module.duration} hours</p>
                                </div>
                            </div>
                            <div>
                                <div className="mb-4">
                                    <p className="font-semibold text-lg">Language</p>
                                    <p>{data.module.language}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">Age Range</p>
                                    <p>{data.module.age_range}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>

    )
}

export const moduleLoader = async ({ params }: LoaderFunctionArgs) => {

    const moduleData = await fetch(`http://localhost:3000/api/modules/${params.id}`)
    const rawData = await moduleData.json()
    if (!rawData) {
        return { module: null }
    }
    const module = rawData;

    const isOnWishList = await isItOnWishList(Number(params.id));

    return { module, isOnWishList }
}

export const wishListAdd = async (moduleId: number) => {
    const user = getUser();

    const response = await fetch(
        `http://localhost:3000/api/users/${user.id}/wishList/${moduleId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    const result = await response.json();

    if (!response.ok) {
        return result;
    }

    console.log(result);

    return { message: "Se agrego el modulo a tu WishList con exito!" };

}

export const isItOnWishList = async (moduleId: number) => {
    const user = getUser();

    const response = await fetch(
        `http://localhost:3000/api/users/${user.id}/wishList`
    );

    const wishlist = await response.json();

    return wishlist.some(
        (module: any) => module.id === moduleId
    );
};

export default ModulePreview