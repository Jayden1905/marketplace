'use client'

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div
      className='h-screen fixed inset-0 z-50 bg-background w-full flex items-center
        justify-center'
    >
      <Card className='w-[420px] shadow-lg'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-center'>404</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-xl text-center text-gray-600 mb-4'>
            Oops! Page not found
          </p>
          <p className='text-center text-gray-500'>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button asChild>
            <Link href='/'>Go back home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
