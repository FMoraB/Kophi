import { Link, useActionData, useNavigation } from "react-router";
import { Form, useLoaderData, redirect } from "react-router-dom";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import type { Tag } from "../../types/tag";
import NavBar from "../../layouts/NavBar";
import type { Section } from "../../types/section";

export default function CreateModuleSections() {
    const data = useLoaderData<any>();
    const actionData = useActionData<any>();
    const loaderData = useLoaderData<any>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    console.log(loaderData)

    return (
        <div >
            <NavBar></NavBar>
            <div className="py-24  px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-xl p-10 py-15">
                    <h1 className="text-3xl font-bold mb-2">Create your sections</h1>
                    <p className="text-gray-600 mb-8">
                        Fill in the details below to create a new section in your module.
                    </p>
                    <Form method="post" className="flex flex-col gap-2">
                        <div>
                            <label className=" text-gray-600 block text-sm font-medium mb-2">Title</label>
                            <input
                                name="title"
                                required
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                className="w-full h-full border border-gray-300 rounded-md p-3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Image URL</label>
                            <input
                                name="image"
                                required
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Order</label>
                            <input
                                name="order"
                                type="number"
                                required
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                        </div>

                        <div className="flex justify-between gap-4 mt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className=" border border-blue-400 text-blue-500 py-3 px-6 rounded-md font-medium hover:bg-blue-50 disabled:opacity-60"
                            >
                                {isSubmitting ? "Creating..." : "Create new section"}
                            </button>

                        </div>
                    </Form>


                    <h2 className="text-lg font-semibold mt-8 mb-4">Current Sections:</h2>
                    {loaderData?.sections.length <= 0 && (<p className="text-sm">This module doesn't have any sections yet!</p>)}
                    {loaderData?.sections.length > 0 && loaderData?.sections.map((section: Section) => (
                        <div key={section.id} className="flex-col gap-2 mb-4">
                            <h2 className="text-left w-full px-4 py-3 rounded-lg transition bg-gray-200">{section.order}: {section.title}</h2>
                        </div>
                    ))}

                    <div className="flex justify-end gap-4 mt-4">

                        <Link to='/'>
                            <button
                                className=" bg-blue-500 text-white py-3 px-10 rounded-md font-medium hover:bg-blue-700 disabled:opacity-60"
                            >Finish</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export const sectionsLoader = async ({ params }: LoaderFunctionArgs) => {
    const moduleSections = await fetch(`http://localhost:3000/api/modules/${params.moduleId}/sections`)
    const rawData = await moduleSections.json()

    if (!rawData) {
        return { sections: null }
    }
    console.log(rawData)
    const sections: Section[] = rawData;

    return { sections }
}

export const sectionsAction = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const section = {
        name: formData.get("title") as string,
        image: formData.get("image") as string,
        description: formData.get("description") as string,
        order: formData.get("order") as string,
        module_id: Number(params.moduleId)
    };

    const response = await fetch(
        `http://localhost:3000/api/modules/sections`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(section)
        }
    );

    const result = await response.json();

    if (!response.ok) {
        return result;
    }

    return { message: "Success!" };
};