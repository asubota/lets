import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import { Box } from '@mui/material'

import 'swiper/css'
import 'swiper/css/pagination'

export const ImageSlider: FC<{ pics: string[]; alt: string }> = ({
  pics,
  alt,
}) => {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      slidesPerView={'auto'}
      centeredSlides={true}
      spaceBetween={30}
    >
      {pics.map((src) => {
        return (
          <SwiperSlide key={src}>
            <Box
              component="img"
              src={src}
              alt={alt}
              title={alt}
              sx={{ width: '100%' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/lets/logo.webp'
              }}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
