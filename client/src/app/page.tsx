'use client'

import BannerType1 from '@/components/shared-ui/Banner/bannerType1'
import BannerType2 from '@/components/shared-ui/Banner/bannerType2'

function page() {
  return (
    <div>
      <BannerType1 bannerTitle='BannerTitle 1' />
      <BannerType2 bannerTitle='BannerTitle 2' />
    </div>
  )
}

export default page
