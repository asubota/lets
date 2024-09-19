import { FC } from 'react'
import { useLinkProps } from '@tanstack/react-router'
import { IconButton } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { copyContent } from '../../tools.tsx'

export const BookmarkButton: FC<{ search: string }> = ({ search }) => {
  const { href } = useLinkProps({ to: '/', search: { s: search } })
  const fullUrl = window.origin + href

  return (
    <IconButton
      size="small"
      sx={{ color: 'text.secondary', mr: '20px' }}
      onClick={() => copyContent(fullUrl)}
    >
      <BookmarkIcon />
    </IconButton>
  )
}
