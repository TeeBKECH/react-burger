import { FC, ReactNode, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'

import styles from './modal.module.css'

export interface IModalProps {
  onClose: () => void;
  children?: ReactNode;
  title?: string;
}

const Modal: FC<IModalProps> = ({onClose, children, title}) => {

  const handleCloseModal = useCallback((e) => {
      e.key === 'Escape' && onClose();
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleCloseModal)

    return () => {
      document.removeEventListener('keydown', handleCloseModal)
    }
  }, [handleCloseModal])

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h3 className='text text_type_main-large'>{title ? title : ''}</h3>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        <div className={styles.modal_body}>
          {children}
        </div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    document.getElementById('react-modals') as HTMLElement
  )
}

export default Modal