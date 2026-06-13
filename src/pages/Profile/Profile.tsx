import { Link, useParams, useLoaderData } from "react-router-dom"
import type { LoaderFunctionArgs } from "react-router-dom";
import type { Tag } from "../../types/tag";
export default function Profile() {

    const params = useParams<{ userId: string }>();
    const data = useLoaderData<any>();
    console.log(data);

    return (
        <div>
            <p>Profile ID: {params.userId}</p>
            <p>{data.user.id}</p>
            <Link to="/">Home</Link>
            <p>{data.user.display_name}</p>
            <p>{data.user.email}</p>
            {data.user.tags.map((tag: Tag) => (
                <span key={tag.id} className="flex flex-row gap-5">
                    {tag.id}
                </span>
            ))}

            {data.completedModules.map((module: any) => (
                <div key={module.id}>
                    {/* Hacer componente aca de modulo del perfil */}
                    <h2>{module.title}</h2>
                    <p>{module.description}</p>

                    {module.tags.map((tag: Tag) => (
                        <span key={tag.id} className="flex flex-row gap-5">
                            {tag.name}
                        </span>
                    ))}
                </div>
            ))}

        </div>
    )
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
