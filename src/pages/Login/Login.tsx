import { Form, redirect, useActionData, useNavigation, Link } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import NavBar from "../../components/NavBar";

export default function Login() {
    const data = useActionData<any>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    

    return (
       
        <div>
            <NavBar />
            <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
                <div className="w-[90%] max-w-md px-10 py-20 bg-white border border-gray-300 rounded-md flex flex-col gap-4 items-center">
                    {data?.message && (
                        <p className="text-red-500 text-sm">
                            {data.message}
                        </p>
                    )}

                    <h2 className="text-2xl font-medium">
                        LOGIN
                    </h2>

                    <Form method="POST" className="flex flex-col gap-4 w-full max-w-sm">
                        <label className="flex flex-col gap-2">
                            <span>Email</span>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="example@gmail.com"
                                className="bg-gray-100 p-3 rounded-md"
                            />
                        </label>

                        <label className="flex flex-col gap-2">
                            <span>Password</span>
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="Enter your password"
                                className="bg-gray-100 p-3 rounded-md"
                            />
                        </label>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 p-3 rounded-md text-white transition-all duration-100 hover:bg-blue-600"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>

                        <div className="flex flex-row gap-2 w-full justify-center">
                            <p className="font-light text-sm">Not registered yet?</p>
                            <Link to="/register">
                                <button className="text-black cursor-pointer flex items-center text-sm">
                                    Register here
                                </button>
                            </Link>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
}

export const loginAction = async ({ request }: ActionFunctionArgs) => {
    const data = await request.formData();

    const submission = {
        email: data.get("email") as string,
        password: data.get("password") as string,
    };

    const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submission),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        return result;
    }

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    return redirect("/");
};