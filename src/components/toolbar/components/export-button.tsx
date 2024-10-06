import { FC } from 'react'
import { IconButton } from '@mui/material'
import { handleTakeScreenshot } from '../../../tools.tsx'
import IosShareIcon from '@mui/icons-material/IosShare'
import { useAppView } from '../../../store'

export const ExportButton: FC = () => {
  const view = useAppView()

  if (view !== 'tile') {
    return null
  }

  return (
    <IconButton
      sx={{ ml: '16px', color: 'text.secondary' }}
      size="small"
      onClick={handleTakeScreenshot}
    >
      <IosShareIcon />
    </IconButton>
  )
}
