import { List, ListItem, ListItemText } from '@mui/material'

import { FadePopper } from '../../../components/fade-popper.tsx'
import { useSearch } from '../../../search-tools.ts'
import { getHighlightedText } from '../../../tools.tsx'

interface SearchSuggestionsProps {
  open: boolean
  search: string
  setValue: (value: string) => void
}

export const SearchSuggestions = ({ search, setValue, open }: SearchSuggestionsProps) => {
  const list = useSearch(search).slice(0, 12)
  const anchorElement = document.querySelector('.app-bar')

  return (
    <FadePopper anchorEl={anchorElement} open={open}>
      <List
        sx={{
          width: anchorElement?.clientWidth,
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
            onClick={() => {
              setValue(p.sku)
            }}
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
