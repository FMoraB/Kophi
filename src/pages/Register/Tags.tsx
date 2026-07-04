import { useActionData, useNavigation } from "react-router";
import { Form, useLoaderData, redirect } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import type { Tag } from "../../types/tag";
import NavBar from "../../layouts/NavBar";

export default function Tags() {
    const data = useLoaderData<any>();
    const actionData = useActionData<any>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <div>
            <NavBar></NavBar>

            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <Form
                    method="post"
                    className="w-full max-w-md bg-white rounded-md border border-gray-300 px-10 py-20 justify-center flex flex-col gap-4"
                >
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 w-full text-center">
                           What are your interests?
                        </h2>

                        <p className="text-sm text-gray-500 mt-1 mb-6 w-full text-center">
                           Max. 3 tags
                        </p>
                    </div>


                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                        {data.tags.map((tag: Tag) => (
                            <label key={tag.id} className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="tagIds"
                                    value={tag.id}
                                    className="peer hidden"
                                />

                                <span
                                    className="
                                    inline-block px-3 py-1.5 rounded-full
                                    border border-gray-300 text-sm text-gray-700
                                    transition-all duration-200
                                    peer-checked:bg-blue-500
                                    peer-checked:text-white
                                    peer-checked:border-blue-600
                                "
                                >
                                    {tag.name}
                                </span>
                            </label>
                        ))}
                    </div>

                    {/* BUTTON */}
                    <button type="submit" className="w-full bg-blue-500 p-3 rounded-md text-white transition-all duration-100 hover:bg-blue-600">{isSubmitting ? 'Saving...' : 'Save'}</button>


                    {actionData?.message && (
                        <p className="mt-4 text-sm text-red-500 text-center">
                            {actionData.message}
                        </p>
                    )}
                </Form>
            </div>
        </div>
    );
}

export const tagsLoader = async ({ }) => {

    const results = await fetch(
        `http://localhost:3000/api/tags`
    );

    const tags = await results.json();

    return tags;

};

export const tagsAction = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const tagIds = formData
        .getAll("tagIds")
        .map(id => Number(id));

    if (tagIds.length > 3) {
        return {
            message: "Debes seleccionar maximo 3 tags"
        };
    }

    if (tagIds.length <= 0) {
        return {
            message: "Debes seleccionar minimo 1 tag"
        };
    }

    const response = await fetch(
        `http://localhost:3000/api/users/tags/${params.userId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tagIds
            })
        }
    );

    const result = await response.json();

    if (!response.ok) {
        return result;
    }

    return redirect(`/profile`);
};
