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
import { usePopularServices } from '../../use-data.ts'
import { useState } from 'react'
import ConstructionIcon from '@mui/icons-material/Construction'
import { getFavoriteId } from '../../tools.tsx'
import { Product } from '../../types.ts'
import { useSetPopularServicesForCart } from '../../cart-api.ts'
import { useCartPopularServiceIds } from '../../hooks/use-cart-popular-service-ids.ts'

function isSameSet(setA: Set<string>, setB: Set<string>) {
  if (setA.size !== setB.size) return false

  for (const val of setA) {
    if (!setB.has(val)) return false
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
    const newValue = !checked.includes(sku)
      ? [...checked, sku]
      : checked.filter((v) => v !== sku)

    setChecked(newValue)
  }

  const handleClose = () => {
    if (!isSameSet(new Set(checked), new Set(currentServiceItemIds))) {
      mutate({ itemIds: checked })
    }

    navigate({ to: '/cart' })
  }

  return (
    <Dialog open onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{'Шо по сєрвісу ?'}</DialogTitle>
      <DialogContent>
        <List sx={{ bgcolor: 'background.paper', pt: 0, pb: 0 }}>
          {allPopularServices.sort(sortByPrice).map((product) => {
            const labelId = `checkbox-list-label-${getFavoriteId(product)}`

            return (
              <ListItem
                key={product.sku}
                secondaryAction={<ConstructionIcon />}
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(getFavoriteId(product))}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.includes(getFavoriteId(product))}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={product.name}
                    secondary={`${product.price} грн`}
                    slotProps={{
                      secondary: { color: 'secondary' },
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
