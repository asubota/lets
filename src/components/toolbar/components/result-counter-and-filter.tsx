import { type FC } from 'react'

import TroubleshootIcon from '@mui/icons-material/Troubleshoot'
import { Box, IconButton, Typography } from '@mui/material'

import { useSearchActions } from '../../../store/search.ts'
import { RedDot } from '../../red-dot.tsx'

interface ResultCounterAndFilterProps {
  total: number
  uniqueVendors: string[]
  filteredSearch: boolean
}

export const ResultCounterAndFilter: FC<ResultCounterAndFilterProps> = ({
  uniqueVendors,
  filteredSearch,
  total,
}) => {
  const { toggleLimitModal } = useSearchActions()
  const fewVendorsAvailable = uniqueVendors.length > 1

  return (
    <Box
      onClick={fewVendorsAvailable ? toggleLimitModal : undefined}
      sx={{ cursor: fewVendorsAvailable ? 'pointer' : 'default' }}
    >
      <IconButton
        size="small"
        disabled={uniqueVendors.length < 2}
        sx={{ position: 'relative', color: 'text.secondary' }}
      >
        <TroubleshootIcon />
        {filteredSearch && <RedDot />}
      </IconButton>
      <Typography component="span" variant="body2" sx={{ fontWeight: 'bold' }}>
        {total}
      </Typography>
    </Box>
  )
}
