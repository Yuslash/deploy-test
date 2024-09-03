import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialize Prisma client only once
const prisma = global.prisma || new PrismaClient();

// Cache Prisma client in global object to avoid multiple instances in serverless environments
if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { name, email } = req.body as { name: string; email: string };

            if (!name || !email) {
                return res.status(400).json({ error: 'Name and email are required' });
            }

            // Create a new user
            const user = await prisma.user.create({
                data: { name, email },
            });

            return res.status(201).json(user); // 201 for successful resource creation
        } else if (req.method === 'GET') {
            // Retrieve all users
            const users = await prisma.user.findMany();
            return res.status(200).json(users);
        } else {
            // Handle other HTTP methods (e.g., PUT, DELETE)
            res.setHeader('Allow', ['POST', 'GET']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        // Log the error for debugging
        console.error('API error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
