'use client'

import ButtonLogout from "@/components/ButtonLogout"
import ButtonTransfer from "@/components/ButtonTransfer"
import { Session } from "inspector"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

type Props = {
    name: string,
    email: string,
    money: number,
    is_admin: number
}

export default function Admin() {

    const { data: session } = useSession();

    const data = [
        {
            name: 'Guilherme',
            email: 'guilherme@email.com',
            money: 1000,
            is_admin: 1
        },
        {
            name: 'Eduardo',
            email: 'dukrl@email.com',
            money: 0,
            is_admin: 0
        },
        {
            name: 'Isabel',
            email: 'isabel@email.com',
            money: 1000,
            is_admin: 0
        },
        {
            name: 'Frederica',
            email: 'drica@email.com',
            money: 1000,
            is_admin: 0
        },
        {
            name: 'Pedro',
            email: 'pedro@email.com',
            money: 0,
            is_admin: 0
        },
    ]

    async function getAllUsers() {
        const result = await fetch(`http://localhost:3333/users/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': session?.jwt,
                'Access-Control-Allow-Headers': 'content-type,authorization',
            }
        })

        const data = await result.json();

        console.log(data)
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div>
            <div className="flex mb-6 items-center justify-center pt-16 gap-4">
                <ButtonLogout />
                <ButtonTransfer />
            </div>
            <h1 className="flex text-3xl mb-6 items-center justify-center pt-16">User List</h1>
            <ul role="list" className="flex flex-col items-start h-screen items-center divide-y divide-white-100">
                {
                    data.map(item => {
                        return <li key={item.email} className="flex justify-between w-full gap-x-6 py-5 my-8 max-w-lg max-h-8">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-white-900">{item.name}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-white-500">{item.email}</p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-white-900">&euro;{item.money}</p>
                                {!item.is_admin ? (
                                    <p className="mt-1 text-xs leading-5 text-gray-500">

                                    </p>
                                ) : (
                                    <div className="mt-1 flex items-center gap-x-1.5">
                                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        </div>
                                        <p className="text-xs leading-5 text-gray-500">Admin</p>
                                    </div>
                                )}
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}