import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Link,
  Typography,
} from '@mui/material'
import { FC } from 'react'
import { Product } from '../types.ts'
import { ImageSlider } from './image-slider.tsx'
import LinkIcon from '@mui/icons-material/Link'

export const DetailsPopup: FC<{ details: Product; onClose: () => void }> = ({
  details,
  onClose,
}) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle typography="subtitle2" textAlign="left" sx={{ p: 1 }}>
        {details.name}
      </DialogTitle>

      <Divider sx={{ ml: 1, mr: 1, borderColor: 'primary.main' }} />

      <DialogContent sx={{ p: 1, pl: '2px', pr: '2px', minHeight: '250px' }}>
        {details.link && (
          <Typography
            textAlign="center"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            <LinkIcon fontSize="small" sx={{ color: 'primary.main' }} />
            <Link
              href={
                details.link.startsWith('http')
                  ? details.link
                  : `https://${details.link}`
              }
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              Visit {details.vendor}
            </Link>
          </Typography>
        )}

        {details.pics && <ImageSlider pics={details.pics} alt={details.name} />}
      </DialogContent>
    </Dialog>
  )
}
