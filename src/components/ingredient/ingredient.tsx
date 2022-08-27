import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useDrag } from 'react-dnd'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { IIngredient } from '../../services/reducers/reducers';

import styles from './ingredient.module.css'

interface IIngredientProps {
  el: IIngredient;
  openIngredientDetails: (el: IIngredient) => void;
  type: string;
}

const Ingredient: FC<IIngredientProps> = ({el, openIngredientDetails, type}) => {

  const location: Location = useLocation()
  const ingredientId: number = el._id

  const [{ opacity }, ref] = useDrag({
    type: type,
    item: { el },
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <div draggable ref={ref} onClick={() => openIngredientDetails(el)} className={styles.category_item} style={{ opacity }}>
        {el.__v !== 0 && <Counter count={el.__v} size="default" />}
        <img src={el.image} alt={el.name} />
        <div className={styles.category_item_currency}>
          <span className="text text_type_digits-default">{el.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default card_title">{el.name}</p>
      </div>
    </Link>
  )
}

export default Ingredient