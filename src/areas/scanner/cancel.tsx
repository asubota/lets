import { type FC } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import { createLink } from '@tanstack/react-router'


const LinkedButton = createLink(IconButton)

export const Cancel: FC = () => {
  return (
    <LinkedButton
      to="/list"
      sx={{
        zIndex: 1,
        position: 'absolute',
        top: '15px',
        left: '15px',
        color: 'primary.main',
      }}
    >
      <ArrowBackIcon />
    </LinkedButton>
  )
}
