'use client'

import ButtonBack from "@/components/ButtonBack"
import ButtonLogout from "@/components/ButtonLogout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"


export default function Transfer() {

    const router = useRouter()

    const [user, setUser] = useState<string>()
    const [value, setValue] = useState<string>()

    const {data: session} = useSession();

    async function handleTransfer(event: SyntheticEvent) {

        event.preventDefault();

        const result = await fetch(`http://localhost:3333/users/${user}/transfers`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': session?.jwt
            },
            body: JSON.stringify({
                value: value
            })
        })

        router.push('/user')
    }

    return (
        <>
            <div className="flex mb-6 items-center justify-center pt-16 gap-4">
                <ButtonLogout />
                <ButtonBack />
            </div>
            <div className="flex flex-col items-center w-full h-full mt-16">
                <form className="w-[400px] flex flex-col gap-6" onSubmit={handleTransfer}>

                    <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                            type="number"
                            name="user"
                            id="user"
                            className="h-12 rounded-md p-2 bg-transparent border border-gray-300 w-full"
                            placeholder="Type the User ID"
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </div>

                    <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                            type="number"
                            name="price"
                            id="price"
                            className="h-12 rounded-md p-2 bg-transparent border border-gray-300 w-full"
                            placeholder="0.00"
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="h-12 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
                    >
                        Transfer
                    </button>
                </form>
            </div>
        </>
    )
}