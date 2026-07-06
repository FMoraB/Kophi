import { Form, useActionData, useNavigation, redirect } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import NavBar from "../../layouts/NavBar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function CreateModule() {
    const actionData = useActionData<{ message?: string }>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="min-h-screen bg-gray-100 text-black">
            <NavBar />

            <div className="py-24 px-4 sm:px-6 lg:px-8 pb-12">
                <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-xl p-10 py-15">
                    <h1 className="text-2xl font-bold mb-2">Create a module</h1>
                    <p className="text-gray-600 mb-8">
                        Fill in the details below to create a new module in the platform.
                    </p>

                    <Form method="post" className="space-y-5">
                        
                            <div className="flex flex-col gap-5 flex-1">
                                <div>
                                    <label className=" text-gray-600 block text-sm font-medium mb-2">Title (max. 35 letters) </label>
                                    <input
                                        name="title"
                                        required
                                        className="w-full border border-gray-300 rounded-md p-3"
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-600 block text-sm font-medium mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        required
                                        rows={4}
                                        className="w-full h-full border border-gray-300 rounded-md p-3"
                                    />
                                </div>
                            </div>



                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className=" text-gray-600 block text-sm font-medium mb-2">Difficulty</label>
                                        <select
                                            name="difficulty"
                                            className="w-full border border-gray-300 rounded-md p-3"
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-gray-600 block text-sm font-medium mb-2">Duration (hours)</label>
                                        <input
                                            type="number"
                                            name="duration"
                                            min="1"
                                            required
                                            className="w-full border border-gray-300 rounded-md p-3"
                                        />
                                    </div>
                                </div>

                                <div className="text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Language</label>
                                        <input
                                            name="language"
                                            required
                                            className="w-full border border-gray-300 rounded-md p-3"
                                        />
                                    </div>

                                    <div>
                                        <label className=" text-gray-600 block text-sm font-medium mb-2">Age range</label>
                                        <input
                                            name="age_range"
                                            required
                                            className="w-full border border-gray-300 rounded-md p-3"
                                        />
                                    </div>
                                </div>

                                <div className=" text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Image URL</label>
                                        <input
                                            name="image"
                                            required
                                            className="w-full border border-gray-300 rounded-md p-3"
                                        />
                                    </div>

                                    <div>
                                        <label className=" text-gray-600 block text-sm font-medium mb-2">Icon URL</label>
                                        <input
                                            name="icon"
                                            required
                                            className="w-full border border-gray-300 rounded-md p-3"
                                        />
                                    </div>
                                </div>
                            </div>

                        <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className=" bg-blue-500 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 disabled:opacity-60"
                        >
                            {isSubmitting ? "Creating..." : "Create module"}
                        </button>
                        </div>

                        {actionData?.message && (
                            <p className='text-sm text-red-500'>
                                {actionData.message}
                            </p>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}

export const createModuleAction = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const module = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        difficulty: formData.get("difficulty") as string,
        duration: Number(formData.get("duration")),
        image: formData.get("image") as string,
        icon: formData.get("icon") as string,
        language: formData.get("language") as string,
        age_range: formData.get("age_range") as string,
        module_types_id: 1,
        views: 0,
    };

    const response = await fetch(`${API_URL}/api/modules`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(module),
    });

    const data = await response.json();

    if (!response.ok) {
        return { message: data.message || "No se pudo crear el módulo" };
    }

    return redirect(`/create-module-tags/${data.id}`);

};
