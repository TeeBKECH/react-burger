import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'
import { useSelector, useDispatch } from 'react-redux'

import styles from './constructor-ingredient.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const ConstrucorIngredient = ({ el, index, removeIngredient, moveIngredient }) => {

  const { uniqueKey } = el

  const dispatch = useDispatch()

  const ref = useRef(null)

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [spec, dropRef] = useDrop({
    accept: 'item',
    hover: (item, monitor) => {
      const dragIndex = item.index
      const hoverIndex = index
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top)
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

      moveIngredient(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const opacity = isDragging ? 0 : 1
  const dragDropRef = dragRef(dropRef(ref))

  return (
    <li
      style={{ opacity }}
      draggable
      index={index}
      ref={dragDropRef}
      className={styles.constructor_list_item}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        handleClose={() => removeIngredient(el)}
      />
    </li>
  )
}

ConstrucorIngredient.propTypes = {
  el: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  removeIngredient: PropTypes.func.isRequired
}

export default ConstrucorIngredient