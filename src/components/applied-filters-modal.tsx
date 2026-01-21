import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Divider, Grid } from '@mui/material'
import { yellow } from '@mui/material/colors'

import { Modal } from './modal.tsx'
import { VendorChip } from './vendor-chip.tsx'
import { useAppliedFilters, useAppliedFiltersActions } from '../store/appliedFilters.ts'
import { useSearchActions, useShowAppliedFiltersModal } from '../store/search.ts'
import { groupByVendor } from '../tools.tsx'
import { type Product } from '../types.ts'
import { useAllVendors } from '../use-data.ts'

export const AppliedFiltersModal = ({ list }: { list: Product[] }) => {
  const vendors = useAllVendors()
  const countByVendor = groupByVendor(list)

  const { toggleAppliedFiltersModal } = useSearchActions()
  const open = useShowAppliedFiltersModal()

  const appliedFilters = useAppliedFilters()
  const { toggleVendor } = useAppliedFiltersActions()

  return (
    <Modal open={open} onClose={toggleAppliedFiltersModal} title="Applied Filters" onSave={toggleAppliedFiltersModal}>
      <Grid container columnSpacing={2} rowSpacing={1.5} sx={{ pl: 3, pr: 3, pt: 2 }}>
        {vendors.sort().map((vendor) => {
          const isSelected = appliedFilters.includes(vendor)

          return (
            <Grid
              size={{ xs: 6, md: 4 }}
              key={vendor}
              sx={{
                py: 1,
                display: 'grid',
                justifyContent: 'flex-start',
                alignItems: 'center',
                columnGap: 1,
                gridTemplateColumns: '96px auto auto 1fr',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <VendorChip source="live" vendor={vendor} onClick={toggleVendor} />
              </Box>
              <Box
                sx={{ fontWeight: 'bold', fontSize: '14px', color: isSelected ? yellow[500] : 'white' }}
                component="span"
              >
                {countByVendor[vendor] ?? 0}
              </Box>
              {isSelected ? <CheckCircleIcon sx={{ fontSize: 12, color: yellow[500] }} /> : <div />}
              <Box />
            </Grid>
          )
        })}
      </Grid>

      <Divider sx={{ ml: 3, mr: 3, mt: 2, mb: 1 }} />
    </Modal>
  )
}
