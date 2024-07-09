import { FC } from 'react'
import { FadePopper } from './fade-popper.tsx'
import { List, ListItem, ListItemText } from '@mui/material'
import { useSearch } from '../use-data.ts'
import { getHighlightedText } from '../tools.tsx'

interface SearchSuggestionsProps {
  open: boolean
  search: string
  setValue(value: string): void
}

export const SearchSuggestions: FC<SearchSuggestionsProps> = ({
  search,
  setValue,
  open,
}) => {
  const list = useSearch(search).slice(0, 12)
  const anchorEl = document.querySelector('.app-bar')

  return (
    <FadePopper anchorEl={anchorEl} open={open}>
      <List
        sx={{
          width: anchorEl?.clientWidth,
          pt: 0,
          pb: 0,
          maxHeight: '380px',
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
              primary={getHighlightedText(p.name, search, {
                match: {
                  variant: 'body2',
                  color: 'primary.main',
                },
                noMatch: {
                  variant: 'body2',
                },
              })}
              secondary={getHighlightedText(p.sku, search, {
                match: {
                  variant: 'caption',
                  color: 'primary.main',
                },
                noMatch: {
                  variant: 'caption',
                  color: 'text.secondary',
                },
              })}
            />
          </ListItem>
        ))}
      </List>
    </FadePopper>
  )
}
