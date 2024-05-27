import { Modal } from './modal.tsx'
import { FC } from 'react'
import { useSearchActions, useShowLimitModal } from '../store/search.ts'

export const LimitSearchModal: FC = () => {
  const { toggleLimitModal } = useSearchActions()
  const open = useShowLimitModal()

  return (
    <Modal
      open={open}
      onClose={toggleLimitModal}
      title=""
      onSave={toggleLimitModal}
    >
      <></>
    </Modal>
  )
}
