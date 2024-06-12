import { FC } from 'react'
import { FadePopper } from './fade-popper.tsx'
import { List, ListItem, ListItemText, Typography } from '@mui/material'
import { useSearch } from '../use-data.ts'

interface SearchSuggestionsProps {
  open: boolean
  search: string
  onClickAway(): void
  anchorEl: null | HTMLElement
  setValue(value: string): void
}

export const SearchSuggestions: FC<SearchSuggestionsProps> = ({
  search,
  anchorEl,
  onClickAway,
  setValue,
  open,
}) => {
  const list = useSearch(search).slice(0, 12)

  return (
    <FadePopper anchorEl={anchorEl} open={open} onClickAway={onClickAway}>
      <List
        sx={{
          width: 'calc(100vw - 16px)',
          pt: 0,
          pb: 0,
          maxHeight: '400px',
          overflow: 'auto',
        }}
      >
        {list.map((p) => (
          <ListItem
            divider
            key={p.sku + p.vendor}
            sx={{ pt: 0, pb: 0 }}
            onClick={() => setValue(p.sku)}
          >
            <ListItemText
              sx={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              primary={
                <Typography component="span" variant="body2">
                  {p.name}
                </Typography>
              }
              secondary={
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                >
                  {p.sku}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </FadePopper>
  )
}
