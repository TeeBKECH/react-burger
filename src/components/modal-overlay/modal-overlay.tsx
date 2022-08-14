import React from 'react'
import PropTypes from 'prop-types'

import styles from './modal-overlay.module.css'

const modalOverlay = ({onClose}) => {
  return (
    <div onClick={onClose} className={styles.modalOverlay}></div>
  )
}

modalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default modalOverlay