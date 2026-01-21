import { useState } from 'react'

import ConstructionIcon from '@mui/icons-material/Construction'
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useNavigate } from '@tanstack/react-router'

import { useSetPopularServicesForCart } from '../../cart-api.ts'
import { useCartPopularServiceIds } from '../../hooks/use-cart-popular-service-ids.ts'
import { getFavoriteId } from '../../tools.tsx'
import { type Product } from '../../types.ts'
import { usePopularServices } from '../../use-data.ts'

function isSameSet(setA: Set<string>, setB: Set<string>) {
  if (setA.size !== setB.size) {
    return false
  }

  for (const val of setA) {
    if (!setB.has(val)) {
      return false
    }
  }

  return true
}

const sortByPrice = (a: Product, b: Product) => b.price - a.price

export const Service = () => {
  const { mutate } = useSetPopularServicesForCart()
  const currentServiceItemIds = useCartPopularServiceIds()
  const [checked, setChecked] = useState<string[]>(currentServiceItemIds)
  const allPopularServices = usePopularServices()
  const navigate = useNavigate()

  const handleToggle = (sku: string) => () => {
    const newValue = !checked.includes(sku) ? [...checked, sku] : checked.filter((v) => v !== sku)

    setChecked(newValue)
  }

  const handleClose = () => {
    if (!isSameSet(new Set(checked), new Set(currentServiceItemIds))) {
      mutate({ itemIds: checked })
    }

    void navigate({ to: '/cart' })
  }

  return (
    <Dialog open onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{'Шо по сєрвісу ?'}</DialogTitle>
      <DialogContent>
        <List
          sx={(theme) => {
            return {
              pt: 0,
              pb: 0,
              backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
            }
          }}
        >
          {allPopularServices.sort(sortByPrice).map((product) => {
            const labelId = `checkbox-list-label-${getFavoriteId(product)}`

            return (
              <ListItem
                key={product.sku}
                secondaryAction={<ConstructionIcon fontSize="small" sx={{ color: 'secondary.light' }} />}
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(getFavoriteId(product))} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.includes(getFavoriteId(product))}
                      tabIndex={-1}
                      disableRipple
                      slotProps={{
                        input: { 'aria-labelledby': labelId },
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={product.name}
                    secondary={`${product.price} грн`}
                    slotProps={{
                      secondary: { color: 'secondary.light' },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
    </Dialog>
  )
}
