import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Link,
} from '@mui/material'
import { FC, useState } from 'react'
import { Product } from '../types.ts'
import { ImageSlider } from './image-slider.tsx'
import LinkIcon from '@mui/icons-material/Link'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'

const getHref = (link: string): string => {
  return link.startsWith('http') ? link : `https://${link}`
}

export const DetailsPopup: FC<{ details: Product; onClose: () => void }> = ({
  details,
  onClose,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  return (
    <Dialog open={true} onClose={onClose} fullScreen={isFullScreen}>
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
            {!isFullScreen && (
              <LinkIcon fontSize="small" sx={{ color: 'primary.main' }} />
            )}
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

        <IconButton
          size="small"
          sx={{ ml: 'auto', color: 'primary.main' }}
          onClick={() => setIsFullScreen((v) => !v)}
        >
          {isFullScreen ? (
            <CloseFullscreenIcon fontSize="small" />
          ) : (
            <OpenInFullIcon fontSize="small" />
          )}
        </IconButton>
      </DialogTitle>

      <Divider sx={{ ml: 1, mr: 1, mb: '4px', borderColor: 'primary.main' }} />

      <DialogContent
        sx={{
          p: 0,
          pl: isFullScreen ? 0 : '2px',
          pr: isFullScreen ? 0 : '2px',
          minHeight: '250px',
          ...(isFullScreen && { backgroundColor: '#000' }),
        }}
      >
        {details.pics && (
          <ImageSlider
            key={isFullScreen ? 1 : 0}
            pics={details.pics}
            title={details.name}
            isFullScreen={isFullScreen}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
