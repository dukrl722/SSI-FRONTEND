'use client'

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function Home() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const router = useRouter()

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault()

        const result = await fetch('http://localhost:3333/users', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })

        router.replace('/')
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <h1 className="text-3xl mb-6">Sign Up</h1>

            <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit}>

                <input
                    className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
                    type="text"
                    name="name"
                    placeholder="Type your name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
                    type="text"
                    name="email"
                    placeholder="Type your email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
                    type="password"
                    name="password"
                    placeholder="Type your password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="h-12 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
                >
                    Create
                </button>
                <a href="/">Already have an Account? Login</a>
            </form>
        </div>
    )
}
