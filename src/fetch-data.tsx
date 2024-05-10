import { FC, useState } from 'react'
import SyncIcon from '@mui/icons-material/Sync'
import { IconButton } from '@mui/material'
import { getData } from './use-data.ts'
import { STORAGE_KEY } from './constants.ts'

export const FetchData: FC = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const data = await getData()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setLoading(false)
  }

  return (
    <IconButton
      color="secondary"
      aria-label="Refresh data"
      sx={{ position: 'absolute', top: 10, right: 10 }}
      onClick={handleClick}
      className={loading ? 'rotate' : ''}
    >
      <SyncIcon />
    </IconButton>
  )
}
