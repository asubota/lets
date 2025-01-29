import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
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
import { useSetServicesForCart } from '../../cart-api.ts'
import { useGetCurrentCartServiceItems } from '../../hooks/use-get-cart-items.ts'

function isSameSet(setA: Set<string>, setB: Set<string>) {
  if (setA.size !== setB.size) return false

  for (const val of setA) {
    if (!setB.has(val)) return false
  }

  return true
}

export const Service = () => {
  const { mutate } = useSetServicesForCart()
  const currentServiceItems = useGetCurrentCartServiceItems()
  const [checked, setChecked] = useState<string[]>(currentServiceItems)
  const allPopularServices = usePopularServices()
  const navigate = useNavigate()

  const handleToggle = (sku: string) => () => {
    const newValue = !checked.includes(sku)
      ? [...checked, sku]
      : checked.filter((v) => v !== sku)

    setChecked(newValue)
  }

  const handleClose = () => {
    if (!isSameSet(new Set(checked), new Set(currentServiceItems))) {
      mutate({ itemIds: checked })
    }

    navigate({ to: '/cart' })
  }

  return (
    <Dialog open onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{'Шо по сєрвісу ?'}</DialogTitle>
      <DialogContent>
        <List sx={{ bgcolor: 'background.paper', pt: 0, pb: 0 }}>
          {allPopularServices.map((value) => {
            const labelId = `checkbox-list-label-${getFavoriteId(value)}`

            return (
              <ListItem
                key={value.sku}
                secondaryAction={
                  <IconButton edge="end">
                    <ConstructionIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(getFavoriteId(value))}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.includes(getFavoriteId(value))}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={value.name}
                    secondary={`${value.price} грн`}
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
