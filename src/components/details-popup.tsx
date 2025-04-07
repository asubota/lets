import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from '@mui/material'
import { FC, useState } from 'react'
import { Product } from '../types.ts'
import { ImageSlider } from './image-slider.tsx'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import { useNoScroll } from '../hooks/use-no-scroll.ts'

export const DetailsPopup: FC<{ details: Product; onClose: () => void }> = ({
  details,
  onClose,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  useNoScroll()

  return (
    <Dialog
      open
      onClose={onClose}
      fullScreen={isFullScreen}
      slotProps={{
        paper: { sx: { ...(isFullScreen && { backgroundColor: '#000' }) } },
      }}
    >
      <DialogTitle
        typography="subtitle2"
        sx={{
          p: 1,
          pb: isFullScreen ? 0 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '6px',
          color: isFullScreen ? 'white' : 'text.primary',
        }}
      >
        {details.name}

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
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
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
