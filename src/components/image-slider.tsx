import { FC, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Thumbs, Navigation } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'
import { Box } from '@mui/material'

import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/navigation'
import 'swiper/scss/thumbs'

const getSlides = (pics: string[], title: string) => {
  return pics.map((src) => (
    <SwiperSlide key={src}>
      <Box
        component="img"
        src={src}
        alt={title}
        title={title}
        sx={{ width: '100%' }}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = '/lets/logo.webp'
        }}
      />
    </SwiperSlide>
  ))
}

export const ImageSlider: FC<{
  pics: string[]
  title: string
  isFullScreen: boolean
}> = ({ pics, title, isFullScreen }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)

  return (
    <>
      <Swiper
        modules={isFullScreen ? [Thumbs, Navigation] : [Pagination]}
        pagination={isFullScreen ? false : { clickable: true }}
        navigation={isFullScreen}
        slidesPerView={'auto'}
        centeredSlides={true}
        spaceBetween={12}
        {...(isFullScreen &&
          thumbsSwiper && { thumbs: { swiper: thumbsSwiper } })}
      >
        {getSlides(pics, title)}
      </Swiper>

      {isFullScreen && pics.length > 1 && (
        <Swiper
          className="swiper-thumbs"
          modules={[Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
        >
          {getSlides(pics, title)}
        </Swiper>
      )}
    </>
  )
}
