'use client'

import { useState } from 'react'

interface User {

    id: String
    name: string
    email: string

}

export default function Page() {

    const [users, setUsers] = useState<User[]>([])
    const [name, setName ] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const fetchUsers = async () => 
    {
        const user = await fetch('/api/users')

        const data = await user.json()

        setUsers(data)
    }
    
    const addUser = async () =>
    {
        await fetch('/api/users',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({name, email})
        })
    }
    
    console.log(users);
    
 
    return<div className="flex flex-col gap-2">
        
        <input 
        className="p-4"
        type="text"
        placeholder="Enter your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <input 
        className='p-4'
        type='text'
        placeholder='Enter your Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={fetchUsers} className='p-4 border border-white hover:bg-yellow-500' >FetchUsers</button>
        <button onClick={addUser} className='p-4 border border-white hover:bg-yellow-500' >Update the database</button>

    </div>

}