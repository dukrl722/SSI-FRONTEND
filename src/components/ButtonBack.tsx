'use client'

import { useRouter } from 'next/navigation'

export default function ButtonBack(){
	const router = useRouter()

	function handleBack() {
        router.replace('/user');
    }

 return <button onClick={handleBack} className="p-2 w-40 border border-gray-300 rounded-md">Back</button>
}