import { FC } from 'react'
import { IModalProps } from '../modal/modal'

import styles from './modal-overlay.module.css'

const modalOverlay: FC<IModalProps> = ({onClose}) => {
  return (
    <div onClick={onClose} className={styles.modalOverlay}></div>
  )
}

export default modalOverlay