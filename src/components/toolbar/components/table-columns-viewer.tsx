import { FC } from 'react'
import { IconButton } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import { useIsRoute } from '../../../hooks/use-is-route.hook.ts'
import { useAppView, useTableActions } from '../../../store'

export const TableColumnsViewer: FC = () => {
  const isMainRoute = useIsRoute('/')
  const view = useAppView()
  const { toggleSettings } = useTableActions()

  if (isMainRoute && view == 'table') {
    return (
      <IconButton
        sx={{ ml: 'auto', color: 'text.secondary' }}
        onClick={toggleSettings}
        size="small"
      >
        <TuneIcon />
      </IconButton>
    )
  }
}
