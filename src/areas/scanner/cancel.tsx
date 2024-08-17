import { Link } from '@tanstack/react-router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import { FC } from 'react'

export const Cancel: FC = () => {
  return (
    <IconButton
      component={Link}
      to="/"
      sx={{
        zIndex: 1,
        position: 'absolute',
        top: '15px',
        left: '15px',
        color: 'primary.main',
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  )
}
