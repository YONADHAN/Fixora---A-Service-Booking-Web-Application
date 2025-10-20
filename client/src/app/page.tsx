'use client'

import BannerType1 from '@/components/banners/bannerType1'
import BannerType2 from '@/components/banners/bannerType2'

function page() {
  return (
    <div>
      <BannerType1 bannerTitle='BannerTitle 1' />
      <BannerType2 bannerTitle='BannerTitle 2' />
    </div>
  )
}

export default page
