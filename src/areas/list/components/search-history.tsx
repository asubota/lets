import { FC } from 'react'
import { IconButton, List, ListItem, ListItemText } from '@mui/material'
import { useHistoryActions, useHistoryItems } from '../../../store'
import DeleteIcon from '@mui/icons-material/Delete'
import { FadePopper } from '../../../components/fade-popper.tsx'

export const SearchHistory: FC<{
  setValue(value: string): void
  open: boolean
}> = ({ setValue, open }) => {
  const items = useHistoryItems()
  const { removeHistoryItem } = useHistoryActions()

  if (!items.length) {
    return null
  }

  const anchorEl = document.querySelector('.app-bar')

  return (
    <FadePopper anchorEl={anchorEl} open={open}>
      <List
        sx={{
          width: anchorEl?.clientWidth,
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
