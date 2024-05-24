import { FC } from 'react'
import {
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
} from '@mui/material'
import { useHistoryActions, useHistoryItems } from '../store'
import DeleteIcon from '@mui/icons-material/Delete'

export const SearchHistory: FC<{
  setValue(value: string): void
  anchorEl: null | HTMLElement
}> = ({ anchorEl, setValue }) => {
  const items = useHistoryItems()
  const { remove } = useHistoryActions()
  const isOpen = Boolean(anchorEl)

  const handleHistoryClick = (term: string) => {
    setValue(term)
  }

  if (!items.length) {
    return null
  }

  return (
    <Popper open={isOpen} anchorEl={anchorEl} placement="bottom" transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper elevation={4} sx={{ mt: 1, ml: 1 }}>
            <List sx={{ width: 'calc(100vw - 16px)' }}>
              {items.map((term, index) => (
                <ListItem
                  divider
                  key={index}
                  onClick={() => handleHistoryClick(term)}
                >
                  <ListItemText primary={term} />
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation()
                      remove(term)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}
