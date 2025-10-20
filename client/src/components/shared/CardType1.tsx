'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface CardType1Props {
  Title: string
  ImageUrl: string
}

const CardType1: React.FC<CardType1Props> = ({ Title, ImageUrl }) => {
  return (
    <Card className='w-full rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
      {/* Image */}
      <div className='relative w-full h-40'>
        <Image src={ImageUrl} alt={Title} fill className='object-cover' />
      </div>

      {/* Title */}
      <CardFooter className='flex justify-center items-center p-1'>
        <h3 className='text-sm font-semibold text-center uppercase tracking-wide'>
          {Title}
        </h3>
      </CardFooter>
    </Card>
  )
}

export default CardType1
