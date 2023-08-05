import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth-options'
import { createCommentSchema } from '@/utils/schemas'
import { CustomError, UnauthorizedError, getErrorResponse } from '@/utils/error'
import { prisma } from '@/utils/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new UnauthorizedError()
    }

    const form = await req.json()
    const { comment, id, isReply } = createCommentSchema.parse(form)

    const value = isReply
      ? await prisma.comment.findUnique({ where: { id } })
      : await prisma.solution.findUnique({ where: { id } })

    if (!value) {
      throw new CustomError({ message: 'Solution or Comment not found', status: 404 })
    }

    const created = isReply
      ? await prisma.commentReply.create({
          data: {
            content: comment,
            commentId: id,
            userId: session.user.id,
          },
          include: {
            user: true,
          },
        })
      : await prisma.comment.create({
          data: {
            content: comment,
            solutionId: id,
            userId: session.user.id,
          },
          include: {
            user: true,
          },
        })

    const data = {
      ...created,
      ...(!isReply ? { replies: [] } : {}),
    }

    return NextResponse.json(data)
  } catch (error) {
    return getErrorResponse(error)
  }
}
