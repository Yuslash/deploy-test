import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function page(req: any, res: any)
{
    if(req.method ==='POST')
    {
        const { name, email } = req.body

        const user = await prisma.user.create({
            data: { name, email }
        })

        res.status(200).json(user)
    } else if (req.method === 'GET')
    {
        const users = await prisma.user.findMany()

        res.status(200).json(users)
    }
}