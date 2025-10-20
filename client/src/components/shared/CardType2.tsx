'use client'
import React from 'react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

interface CardType2Props {
  Title: string
  ImageUrl: string
}

const CardType2: React.FC<CardType2Props> = ({ Title, ImageUrl }) => {
  return (
    <Card
      className='flex flex-col items-center justify-center p-2 w-32 h-32 
                     rounded-lg shadow-sm hover:shadow-md transition 
                     cursor-pointer bg-white'
    >
      <div className='relative  w-28 h-24 '>
        <Image src={ImageUrl} alt={Title} fill className='object-cover' />
      </div>
      <h3 className='text-[10px] font-medium text-center leading-tight uppercase'>
        {Title}
      </h3>
    </Card>
  )
}

export default CardType2
