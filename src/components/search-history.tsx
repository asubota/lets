import { FC } from 'react'
import {
  ClickAwayListener,
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
  onClickOutside(): void
  setValue(value: string): void
  anchorEl: null | HTMLElement
  isOpen: boolean
}> = ({ anchorEl, setValue, isOpen, onClickOutside }) => {
  const items = useHistoryItems()
  const { remove } = useHistoryActions()

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
            <ClickAwayListener onClickAway={onClickOutside}>
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
                      onClick={() => handleHistoryClick(term)}
                    />
                    <IconButton onClick={() => remove(term)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}
