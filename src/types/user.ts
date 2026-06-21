
export interface User{
    id: number,
    display_name: string,
    username: string,
    email: string
}

export function getAuth() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    return {
        token,
        user: user ? JSON.parse(user) : null
    };
}

export function getUser() {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}