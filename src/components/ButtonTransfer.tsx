'use client'

import { useRouter } from 'next/navigation'

export default function ButtonLogout(){
	const router = useRouter()

	function handleTransfer() {
        router.replace('/transfer');
    }

 return <button onClick={handleTransfer} className="p-2 w-40 border border-gray-300 rounded-md">Transfer Money</button>
}