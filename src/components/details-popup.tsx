import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Link,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { Product } from '../types.ts'
import { ImageSlider } from './image-slider.tsx'
import LinkIcon from '@mui/icons-material/Link'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'

const getHref = (link: string): string => {
  return link.startsWith('http') ? link : `https://${link}`
}

const useNoScroll = () => {
  useEffect(() => {
    const root = document.getElementById('root')

    document.body.classList.add('no-scroll')
    root?.classList.add('no-root')

    return () => {
      document.body.classList.remove('no-scroll')
      root?.classList.remove('no-root')
    }
  }, [])
}

export const DetailsPopup: FC<{ details: Product; onClose: () => void }> = ({
  details,
  onClose,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  useNoScroll()

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullScreen={isFullScreen}
      PaperProps={{
        sx: { ...(isFullScreen && { backgroundColor: '#000' }) },
      }}
    >
      <DialogTitle
        typography="subtitle2"
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '6px',
          color: isFullScreen ? 'white' : 'text.primary',
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
              sx={{
                textDecoration: 'none',
                color: isFullScreen ? 'white' : 'text.primary',
              }}
              typography="subtitle2"
            >
              {details.name}
            </Link>
          </>
        )}

        {!details.link && details.name}

        {details.pics && (
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
        )}
      </DialogTitle>

      {!isFullScreen && (
        <Divider
          sx={{ ml: 1, mr: 1, mb: '4px', borderColor: 'primary.main' }}
        />
      )}

      {details.pics && (
        <DialogContent
          sx={{
            p: 0,
            pl: isFullScreen ? 0 : '2px',
            pr: isFullScreen ? 0 : '2px',
            pb: isFullScreen ? 0 : '2px',
            minHeight: '250px',
          }}
        >
          <ImageSlider
            key={isFullScreen ? 1 : 2}
            pics={details.pics}
            title={details.name}
            isFullScreen={isFullScreen}
          />
        </DialogContent>
      )}
    </Dialog>
  )
}
