import { type FC, useState } from 'react'

import NoPhotographyIcon from '@mui/icons-material/NoPhotography'
import { Box, Card, CircularProgress, Typography } from '@mui/material'
import { createLink } from '@tanstack/react-router'
import { useSwipeable } from 'react-swipeable'

import { copyContent, getFavoriteId } from '../tools.tsx'
import { type FavoriteProduct, type Product } from '../types.ts'
import { RippleText } from './ripple-text.tsx'


const LinkedImg = createLink('img')

export const Info: FC<{
  p: Product | FavoriteProduct
}> = ({ p }) => {
  const [imgIndex, setImgIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const pics = p.pics ?? []
  const currentImg = pics[imgIndex] ?? ''

  const swipeHandlers = useSwipeable({
    trackMouse: true,
    onSwipedLeft: () => {
      if (pics.length > 1) {
        setImgIndex((prev) => (prev + 1) % pics.length)
        setLoading(true)
      }
    },
    onSwipedRight: () => {
      if (pics.length > 1) {
        setImgIndex((prev) => (prev - 1 + pics.length) % pics.length)
        setLoading(true)
      }
    },
  })

  const showFallback = !currentImg
  return (
    <Card
      sx={{
        display: 'flex',
        p: 1,
        mb: 1,
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 125,
          height: 125,
          borderRadius: 1,
          overflow: 'hidden',
          flexShrink: 0,
          bgcolor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: pics.length > 1 ? 'pointer' : 'default',
          touchAction: 'pan-y',
        }}
        {...swipeHandlers}
      >
        {loading && !showFallback && <CircularProgress size={20} />}
        {!showFallback ? (
          <LinkedImg
            to="/list/$id/details"
            params={{ id: getFavoriteId(p) }}
            src={currentImg}
            alt={p.name}
            style={{
              display: loading ? 'none' : 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        ) : (
          <NoPhotographyIcon sx={{ fontSize: 36, color: 'secondary.main' }} />
        )}
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="body2"
          sx={{
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          onClick={async (e) => {
            e.stopPropagation()
            await copyContent(p.name)
          }}
        >
          <RippleText text={p.name} />
        </Typography>

        <Box
          sx={{
            mt: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: 12, color: 'text.primary' }}
          >
            {p.price} грн
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: 12 }}
            onClick={async (e) => {
              e.stopPropagation()
              await copyContent(p.sku)
            }}
          >
            <RippleText text={p.sku} />
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}
