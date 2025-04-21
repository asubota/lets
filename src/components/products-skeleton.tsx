import { Skeleton, Stack } from '@mui/material'

export const ProductsSkeleton = () => {
  return (
    <Stack spacing={2} sx={{ p: 3, pr: 5, pl: 5 }}>
      <Skeleton variant="rounded" height={35} animation="wave" />
      <Skeleton variant="rounded" height={12} animation="pulse" />
      <Skeleton variant="rounded" height={30} animation="pulse" />
      <Skeleton variant="rounded" height={12} animation="wave" />
      <Skeleton variant="rounded" height={20} animation="pulse" />
      <Skeleton variant="rounded" height={35} animation="wave" />
      <Skeleton variant="rounded" height={10} animation="wave" />
    </Stack>
  )
}
