import { Form, redirect, useActionData, useNavigation } from "react-router"
import type { ActionFunctionArgs } from "react-router";

export default function Login() {
    // 	Access data returned by the action
    const data = useActionData<any>();
    // Track loading/submitting state
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Form method="POST">
            <label>
                <span>Email</span>
                <input type='email' name="email"></input>
            </label>
            <label>
                <span>Password</span>
                <input type="password" name="password"></input>
            </label>
            <button type="submit">{isSubmitting ? 'Logging in...' : 'Login'}</button>
            {data?.message && <p>{data.message}</p>}
        </Form>
    )
}

export const loginAction = async ({ request }: ActionFunctionArgs) => {
    const data = await request.formData();

    const submission = {
        email: data.get('email') as string,
        password: data.get('password') as string,
    }

    const response = await fetch(
        'http://localhost:3000/api/auth/login',
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

    return redirect('/');

}