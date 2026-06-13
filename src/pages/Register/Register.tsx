import { Form, redirect, useActionData, useNavigation } from "react-router"
import type { ActionFunctionArgs } from "react-router";

export default function Register() {
    const data = useActionData<any>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return (
        <Form method="POST">
            <label>
                <span>Username</span>
                <input name="username"></input>
            </label>
            <label>
                <span>Email</span>
                <input type='email' name="email"></input>
            </label>
            <label>
                <span>Password</span>
                <input type="password" name="password"></input>
            </label>
            <button type="submit">{isSubmitting ? 'Registering...' : 'Register'}</button>
            {data?.message && <p>{data.message}</p>}
        </Form>
    )
}

export const registerAction = async ({ request }: ActionFunctionArgs) => {
    const data = await request.formData();

    const submission = {
        display_name: data.get('username') as string,
        username: data.get('username') as string,
        email: data.get('email') as string,
        password: data.get('password') as string,
    }

    const response = await fetch(
        'http://localhost:3000/api/auth/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submission),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        return result;
    }

    const userId = result.user.id;

    return redirect(`/tags/${userId}`);

}