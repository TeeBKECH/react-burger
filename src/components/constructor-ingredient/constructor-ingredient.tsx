import { FC, useRef } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { IIngredient } from '../../services/reducers/reducers'

import styles from './constructor-ingredient.module.css'
import { IDndItem } from '../burger-constructor-item/burger-constructor-item'

interface IBurgerConstructorItemProps {
  el: IIngredient;
  index: number;
  removeIngredient: (el: IIngredient) => void;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

const ConstructorIngredient: FC<IBurgerConstructorItemProps> = ({ el, index, removeIngredient, moveIngredient }) => {

  const ref = useRef<HTMLLIElement>(null)

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [ , dropRef] = useDrop({
    accept: 'item',
    hover: (item: IDndItem, monitor: any) => {
      const dragIndex: number = item.index
      const hoverIndex: number = index
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      if (hoverBoundingRect !== undefined) {
        const hoverMiddleY: number = (hoverBoundingRect.bottom - hoverBoundingRect.top)
        const hoverActualY: number = monitor.getClientOffset().y - hoverBoundingRect.top
  
        // if dragging down, continue only when hover is smaller than middle Y
        if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
        // if dragging up, continue only when hover is bigger than middle Y
        if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
  
        moveIngredient(dragIndex, hoverIndex)
        item.index = hoverIndex
      }
    },
  })

  const opacity: number = isDragging ? 0 : 1
  dragRef(dropRef(ref))

  return (
    <li
      style={{ opacity }}
      draggable
      // index={index}
      ref={ref}
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

export default ConstructorIngredient