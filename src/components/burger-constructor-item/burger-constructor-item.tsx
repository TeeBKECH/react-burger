import { FC, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient } from '../../services/reducers/reducers';

import styles from './burger-constructor-item.module.css'

interface IBurgerItemProps {
  el: IIngredient;
  index: number;
  removeIngredient: any;
  moveIngredient: any;
}

const BurgerConstrucorItem: FC<IBurgerItemProps> = ({ el, index, removeIngredient, moveIngredient }) => {

  const ref = useRef<HTMLLIElement>(null)

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [ , dropRef] = useDrop({
    accept: 'item',
    hover: (item: any, monitor: any): void => {
      const dragIndex = item.index
      const hoverIndex = index
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      if (hoverBoundingRect !== undefined) {
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top)
        const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

        // if dragging down, continue only when hover is smaller than middle Y
        if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
        // if dragging up, continue only when hover is bigger than middle Y
        if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

        moveIngredient(dragIndex, hoverIndex)
        item.index = hoverIndex
      }
    },
  })

  const opacity = isDragging ? 0 : 1
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

export default BurgerConstrucorItem