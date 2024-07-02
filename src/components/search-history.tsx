import { FC } from 'react'
import { IconButton, List, ListItem, ListItemText } from '@mui/material'
import { useHistoryActions, useHistoryItems } from '../store'
import DeleteIcon from '@mui/icons-material/Delete'
import { FadePopper } from './fade-popper.tsx'

export const SearchHistory: FC<{
  onClickAway(): void
  setValue(value: string): void
  anchorEl: null | HTMLElement
  open: boolean
}> = ({ anchorEl, setValue, open, onClickAway }) => {
  const items = useHistoryItems()
  const { removeHistoryItem } = useHistoryActions()

  if (!items.length) {
    return null
  }

  return (
    <FadePopper anchorEl={anchorEl} open={open} onClickAway={onClickAway}>
      <List
        sx={{
          width: 'calc(100vw - 16px)',
          pt: 0,
          pb: 0,
          maxHeight: '250px',
          overflow: 'auto',
        }}
      >
        {items.map((term, index) => (
          <ListItem divider key={index} sx={{ height: '50px' }}>
            <ListItemText
              primary={term}
              onClick={() => setValue(term)}
              sx={{ cursor: 'pointer' }}
            />
            <IconButton onClick={() => removeHistoryItem(term)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </FadePopper>
  )
}
