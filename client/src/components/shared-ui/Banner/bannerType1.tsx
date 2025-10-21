'use client'

import React from 'react'
import CardType1 from '../Cards/cardType1'

type Service = {
  Title: string
  ImageUrl: string
}

const services: Service[] = [
  { Title: 'Tailoring', ImageUrl: '/admin/login.jpg' },
  { Title: 'Plumbing', ImageUrl: '/admin/login.jpg' },
  { Title: 'Electrical', ImageUrl: '/admin/login.jpg' },
  { Title: 'Tiling', ImageUrl: '/admin/login.jpg' },
]

interface BannerType1Props {
  bannerTitle: string
}

const BannerType1: React.FC<BannerType1Props> = ({ bannerTitle }) => {
  return (
    <div>
      <h1 className='text-xl font-bold m-2 text-center'>{bannerTitle}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {services.map((service, index) => (
          <CardType1
            key={index}
            Title={service.Title}
            ImageUrl={service.ImageUrl}
          />
        ))}
      </div>
    </div>
  )
}

export default BannerType1
