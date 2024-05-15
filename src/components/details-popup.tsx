import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import { FC } from 'react'
import { Product } from '../types.ts'
import { ImageSlider } from './image-slider.tsx'

export const DetailsPopup: FC<{ details: Product; onClose: () => void }> = ({
  details,
  onClose,
}) => {
  return (
    <Dialog open={!!details} onClose={onClose}>
      <DialogTitle typography="subtitle2" textAlign="center">
        {details.name}
      </DialogTitle>
      <DialogContent>
        {details.link && (
          <Typography gutterBottom>
            <a href={details.link} target="_blank" rel="noopener noreferrer">
              Open vendor
            </a>
          </Typography>
        )}

        {details.pics && details.pics.length > 0 && (
          <ImageSlider pics={details.pics} />
        )}
      </DialogContent>
    </Dialog>
  )
}
