import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'


const EmptyState = () => {
  return (
    <div className='p-5 py-24 flex items-center flex-col mt-10 border-2 border-dashed'>
        <h2>You do not have any created videos</h2>
        <Link href={'/dashboard/create-new'}>
            <Button>Create New Video</Button>
        </Link>
    </div>
  )
}

export default EmptyState