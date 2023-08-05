import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

interface CustomErrorOptions {
  message: string
  status?: number
}

export class CustomError extends Error {
  readonly message: string
  readonly status: number

  constructor(options: CustomErrorOptions) {
    super(options.message)
    this.message = options.message
    this.status = options.status ?? 400
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message?: string) {
    super({ message: message ?? 'Unauthorized', status: 401 })
  }
}

export function getErrorResponse(error: any) {
  if (error instanceof CustomError) {
    return NextResponse.json({ message: error.message }, { status: error.status })
  }

  if (error instanceof ZodError) {
    return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
  }

  return NextResponse.json({ message: 'Server Error' }, { status: 500 })
}
