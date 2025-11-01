'use client'

import React from 'react'
import CardType2 from '../Cards/cardType2'

type Service = {
  Title: string
  ImageUrl: string
}

const services: Service[] = [
  { Title: 'Tailoring', ImageUrl: '/admin/login.jpg' },
  { Title: 'Plumbing', ImageUrl: '/admin/login.jpg' },
  { Title: 'Electrical', ImageUrl: '/admin/login.jpg' },
  { Title: 'Tiling', ImageUrl: '/admin/login.jpg' },
  { Title: 'Tailoring', ImageUrl: '/admin/login.jpg' },
  { Title: 'Plumbing', ImageUrl: '/admin/login.jpg' },
  { Title: 'Electrical', ImageUrl: '/admin/login.jpg' },
  { Title: 'Tiling', ImageUrl: '/admin/login.jpg' },
  { Title: 'Tailoring', ImageUrl: '/admin/login.jpg' },
  { Title: 'Plumbing', ImageUrl: '/admin/login.jpg' },
  { Title: 'Electrical', ImageUrl: '/admin/login.jpg' },
  { Title: 'Tiling', ImageUrl: '/admin/login.jpg' },
]

interface BannerType1Props {
  bannerTitle: string
}

const BannerType2: React.FC<BannerType1Props> = ({ bannerTitle }) => {
  return (
    <div>
      <h1 className='text-xl font-bold m-2 text-center'>{bannerTitle}</h1>
      <div className='flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <CardType2
            key={index}
            Title={service.Title}
            ImageUrl={service.ImageUrl}
          />
        ))}
      </div>
    </div>
  )
}

export default BannerType2
