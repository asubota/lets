import IosShareIcon from '@mui/icons-material/IosShare'
import { IconButton } from '@mui/material'

import { useAppView } from '../../../store'
import { handleTakeScreenshot } from '../../../tools.tsx'

export const ExportButton = () => {
  const view = useAppView()

  if (view !== 'tile') {
    return null
  }

  return (
    <IconButton sx={{ color: 'text.secondary' }} size="small" onClick={handleTakeScreenshot}>
      <IosShareIcon />
    </IconButton>
  )
}
