import { authOptions } from '@/utils/auth-options'
import { prisma } from '@/utils/prisma'
import { updateProfileSchema } from '@/utils/schemas'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const form = await req.json()
    const data = updateProfileSchema.parse(form)

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        bio: data.bio,
        name: data.name,
        twitterUsername: data.twitter,
        website: data.website,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 400 })
  }
}
