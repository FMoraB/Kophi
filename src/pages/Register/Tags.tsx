import { useActionData, useNavigation } from "react-router";
import { Form, useLoaderData, redirect } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import type { Tag } from "../../types/tag";

export default function Tags() {
    const data = useLoaderData<any>();
    const actionData = useActionData<any>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Form method="post">
            <h2>Selecciona maximo 3 tags</h2>

            {data.tags.map((tag: Tag) => (
                <label key={tag.id}>
                    <input
                        type="checkbox"
                        name="tagIds"
                        value={tag.id}
                    />
                    {tag.name}
                </label>
            ))}

            <button type="submit">
                {isSubmitting ? 'Saving...' : 'Save' }
            </button>

            {actionData?.message && <p>{actionData.message}</p>}

        </Form>
    );
}

export const tagsLoader = async ({}) => {

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

    return redirect(`/profile/${params.userId}`);
};
