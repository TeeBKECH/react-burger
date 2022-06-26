import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'

import styles from './modal.module.css'

const Modal = ({onClose, children, title}) => {

  const handleCloseModal = e => {
    e.key === 'Escape' && onClose();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleCloseModal)

    return () => {
      document.removeEventListener('keydown', handleCloseModal)
    }
  }, [])

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
    document.getElementById('react-modals')
  )
}

Modal.propTypes = {}

export default Modal