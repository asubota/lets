import { Typography } from '@mui/material'

export function getHighlightedText(text: string | null, highlight: string) {
  if (text === null) {
    return text
  }

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Typography
            component="span"
            key={i}
            sx={{ color: 'primary.main', fontWeight: 'bold' }}
          >
            {part}
          </Typography>
        ) : (
          <Typography component="span" key={i}>
            {part}
          </Typography>
        ),
      )}
    </span>
  )
}
