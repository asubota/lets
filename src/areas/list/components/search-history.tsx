import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, List, ListItem, ListItemText } from '@mui/material'

import { FadePopper } from '../../../components/fade-popper.tsx'
import { useHistoryActions, useHistoryItems } from '../../../store'

export const SearchHistory = ({ setValue, open }: { setValue: (value: string) => void; open: boolean }) => {
  const items = useHistoryItems()
  const { removeHistoryItem } = useHistoryActions()

  if (!items.length) {
    return null
  }

  const anchorElement = document.querySelector('.app-bar')

  return (
    <FadePopper anchorEl={anchorElement} open={open}>
      <List
        sx={{
          width: anchorElement?.clientWidth,
          pt: 0,
          pb: 0,
          maxHeight: '250px',
          overflow: 'auto',
        }}
      >
        {items.map((term, index) => (
          <ListItem
            divider
            key={index}
            sx={{ height: '50px' }}
            secondaryAction={
              <IconButton
                onClick={() => {
                  removeHistoryItem(term)
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={term}
              onClick={() => {
                setValue(term)
              }}
              sx={{ cursor: 'pointer' }}
            />
          </ListItem>
        ))}
      </List>
    </FadePopper>
  )
}
