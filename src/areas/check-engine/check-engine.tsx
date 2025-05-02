import { StaleVendorsList } from './stale-vendors-list.tsx'
import { TopBottomHome } from '../../components/top-botton-home.tsx'

export const CheckEngine = () => {
  return (
    <TopBottomHome>
      <StaleVendorsList />
    </TopBottomHome>
  )
}
