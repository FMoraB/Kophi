
import type { Module } from "../../../types/module";
import { redirect, Link } from "react-router-dom";
import { getUser } from "../../../types/user";

type Props = {
    module: Module;
};

export default function ModuleCard({ module }: Props) {

const activeUser = getUser();
const link = activeUser ? `/modules/${module.id}` : "/login";

    return (
        <div>
            <Link to={link}>
                <div
                    className="
                bg-white
                border
                border-gray-300
                rounded-md
                p-6
                flex
                flex-col
                md:flex-row
                gap-6"
                >

                    <img
                        src={module.image}
                        alt={module.title}
                        className="
                    w-full
                    md:w-80
                    h-65
                    object-cover
                    rounded-md
                "
                    />

                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-3">
                            {module.title}
                        </h2>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {module.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="
                                px-3
                                py-1
                                rounded-full
                                bg-purple-100
                                text-sm
                            "
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-600">
                            {module.description}
                        </p>
                    </div>

                </div>
            </Link>
        </div>
    );
}