import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Container } from '@mui/material'
import { AppBar } from '../components/app-bar.tsx'
import { useNotifyAboutChange } from '../hooks/use-notify-about-change.ts'
import { useListenToCacheUpdate } from '../hooks/use-listen-to-cache-update.ts'

const Component = () => {
  useNotifyAboutChange()
  useListenToCacheUpdate()

  return (
    <Container sx={{ pl: 1, pr: 1, pb: 1 }}>
      <AppBar />
      <Outlet />
    </Container>
  )
}

export const Route = createFileRoute('/_layout')({
  component: Component,
})
