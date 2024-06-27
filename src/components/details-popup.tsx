import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Link,
} from '@mui/material'
import { FC } from 'react'
import { Product } from '../types.ts'
import { ImageSlider } from './image-slider.tsx'
import LinkIcon from '@mui/icons-material/Link'

const getHref = (link: string): string => {
  return link.startsWith('http') ? link : `https://${link}`
}

export const DetailsPopup: FC<{ details: Product; onClose: () => void }> = ({
  details,
  onClose,
}) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle
        typography="subtitle2"
        textAlign="left"
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '6px',
        }}
      >
        {details.link && (
          <>
            <LinkIcon fontSize="small" sx={{ color: 'primary.main' }} />
            <Link
              title={details.name}
              href={getHref(details.link)}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: 'none' }}
              typography="subtitle2"
              color="text.primary"
            >
              {details.name}
            </Link>
          </>
        )}

        {!details.link && details.name}
      </DialogTitle>

      <Divider sx={{ ml: 1, mr: 1, borderColor: 'primary.main' }} />

      <DialogContent sx={{ p: 1, pl: '2px', pr: '2px', minHeight: '250px' }}>
        {details.pics && <ImageSlider pics={details.pics} alt={details.name} />}
      </DialogContent>
    </Dialog>
  )
}
