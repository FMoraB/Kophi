import { Form, redirect, useActionData, useNavigation, Link } from "react-router"
import NavBar from "../../layouts/NavBar";
import type { ActionFunctionArgs } from "react-router";

export default function Register() {
    const data = useActionData<any>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return (
        <div className=''>
            <NavBar></NavBar>
            <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
                <div className="w-[90%] max-w-md px-10 py-20 bg-white border border-gray-300 rounded-md flex flex-col gap-4 items-center">
                    {data?.message && (
                        <p className="text-red-500 text-sm">
                            {data.message}
                        </p>
                    )}
                    <h2 className="text-2xl font-medium">REGISTER</h2>
                    <Form method="POST" className="flex flex-col gap-4 w-full max-w-sm">

                        <label className="flex flex-col gap-2">
                            <span>Username</span>
                            <input name="username" required placeholder='eg: @us3rnam3' className="bg-gray-100 p-3 rounded-md"></input>
                        </label>
                        <label className="flex flex-col gap-2">
                            <span>Email</span>
                            <input type='email' placeholder='example@gmail.com' required name="email" className="bg-gray-100 p-3 rounded-md"></input>
                        </label>
                        <label className="flex flex-col gap-2">
                            <span>Password</span>
                            <input type="password" placeholder="Enter your password..." required name="password" className="bg-gray-100 p-3 rounded-md"></input>
                        </label>
                        <button type="submit" className="w-full bg-blue-500 p-3 rounded-md text-white transition-all duration-100 hover:bg-blue-600">{isSubmitting ? 'Registering...' : 'Register'}</button>
                        <div className="flex flex-row gap-2 w-full justify-center">
                            <p className="font-light text-sm">You're registered already?</p>
                            <Link to="/login">
                            <button className="text-black cursor-pointer flex items-center text-sm">
                                Login here
                            </button>
                        </Link>
                        </div>
                        
                    </Form>
                </div>
            </div>
        </div>
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

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    return redirect(`/tags/${userId}`);

}