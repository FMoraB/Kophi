import { Link, useParams, useLoaderData, redirect, Navigate, useNavigate } from "react-router-dom"
import type { LoaderFunctionArgs } from "react-router-dom";
import type { Tag } from "../../types/tag";
import NavBar from "../../components/NavBar";
import { ChevronLeft } from 'lucide-react'
import ModuleCard from "./component/moduleCard";
import type { Module } from "../../types/module";
import { useState } from "react";
import { logout } from "../../types/user";


export default function Profile() {

    const [onToggle, setOnToggle] = useState<string>("Completed")
    const navigate = useNavigate();
    const data = useLoaderData<any>();
    console.log(data);

    const handleLogOut = () => {
        logout(),
        navigate('/')
    }

    return (
        <>
            <NavBar />

            <div className="bg-gray-100 min-h-screen pt-24 pb-10">
                <div className="max-w-7xl mx-auto px-4">
                    <Link to="/">
                        <button className="text-black cursor-pointer mb-10 flex items-center">
                            <ChevronLeft /> Back
                        </button>
                    </Link>

                    <div className="bg-white border border-gray-300 rounded-3xl overflow-hidden">

                        <div
                            className="h-56 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600')",
                            }}
                        />

                        <div className="relative flex flex-col items-center px-6 pb-12">

                            <img
                                src="https://i.pravatar.cc/250"
                                alt="profile"
                                className="
                                    w-40
                                    h-40
                                    rounded-full
                                    border
                                    border-white
                                    object-cover
                                    -mt-20
                                "
                            />

                            <h1 className="text-5xl font-bold mt-4">
                                {data.user.display_name}
                            </h1>

                            <p className="text-gray-500 mt-2">
                                @{data.user.username}
                            </p>

                            <div className="flex gap-16 mt-8 text-center">
                                <div>
                                    <p className="text-5xl font-bold">20</p>
                                    <p className="text-sm text-gray-500">
                                        Day streak
                                    </p>
                                </div>

                                <div>
                                    <p className="text-5xl font-bold">15</p>
                                    <p className="text-sm text-gray-500">
                                        Hours
                                    </p>
                                </div>

                                <div>
                                    <p className="text-5xl font-bold">
                                        {data.completedModules.length}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Modules
                                    </p>
                                </div>
                            </div>

                            <p className="text-center max-w-xl mt-8 text-gray-700">
                                Passionate learner exploring technology and AI.
                            </p>
                            
                            <div className="flex flex-col justify-center gap-3">
                                <p className="mt-8 text-md w-full text-center">Preferred Tags:</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                {data.user.tags.map((tag: Tag) => (
                                    <span
                                        key={tag.id}
                                        className="px-3 py-1 rounded-full bg-purple-100 text-sm
                                        "
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                            </div>
                            

                            <div className="mt-8 text-center">
                                <p>
                                    <strong>Username:</strong>{" "}
                                    {data.user.username}
                                </p>

                                <p>
                                    <strong>Email:</strong>{" "}
                                    {data.user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-12">
                        <button className="px-6 py-2 border rounded-md bg-white " onClick={() => setOnToggle('Completed')}>
                            Completed Modules
                        </button>

                        <button className="px-6 py-2 border rounded-md bg-white " onClick={() => setOnToggle('WishList')}>
                            WishList
                        </button>
                    </div>

                    <div className="mt-8 flex flex-col gap-8">
                        {onToggle === "Completed" && data.completedModules.map((module: Module) => (
                            <ModuleCard
                                key={module.id}
                                module={module}
                            />
                        ))}
                        {onToggle === "WishList" && data.wishList.map((module: Module) => (
                            <ModuleCard
                                key={module.id}
                                module={module}
                            />
                        ))}
                    </div>
                    <button className="text-black cursor-pointer mb-10 flex items-center" onClick={() => handleLogOut()}>
                            Log out
                    </button>
                </div>
                
            </div>
        </>
    );
}


export const userLoader = async ({ params }: LoaderFunctionArgs) => {

    const userFetch = await fetch(
        `http://localhost:3000/api/users/${params.userId}`
    );

    const completedModulesFetch = await fetch(
        `http://localhost:3000/api/users/${params.userId}/completedModules`
    );

    const wishlistFetch = await fetch(
        `http://localhost:3000/api/users/${params.userId}/wishList`
    );

    const user = await userFetch.json();
    const completedModules = await completedModulesFetch.json();
    const wishList = await wishlistFetch.json();

    return { user, completedModules, wishList };

};
