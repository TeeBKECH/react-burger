import React from 'react'
import PropTypes from 'prop-types'

import styles from './order-details.module.css'
import orderImage from '../../images/orderImage.svg'

const OrderDetails = ({order}) => {
  return (
    <div className={styles.order}>
      <div className={styles.order_header}>
        <p className={`${styles.order_number} text text_type_digits-large`}>{order.orderNumber}</p>
        <p className='text text_type_main-medium'>идентификатор заказа</p>
      </div>
      <img className={styles.order_image} src={orderImage} alt="Заказ оформлен" />
      <div className={`${styles.order_status}`}>
        <p className='text text_type_main-default'>{order.orderStatus}</p>
        <p className='text text_type_main-default text_color_inactive'>{order.orderMessage}</p>
      </div>
    </div>
  )
}
OrderDetails.propTypes = {
  order: PropTypes.object.isRequired
}

export default OrderDetails