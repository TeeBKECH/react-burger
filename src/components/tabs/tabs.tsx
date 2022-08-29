import { FC } from 'react'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './tabs.module.css'

interface ITabProps {
  current: string;
  setCurrent: (value: string) => void;
}

const Tabs: FC<ITabProps> = ({current, setCurrent}) => {
    
  return (
    <div className={styles.tabs}>
      {/* @ts-ignore */}
      <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
        Булки
      </Tab>
      {/* @ts-ignore */}
      <Tab value="main" active={current === 'main'} onClick={setCurrent}>
        Начинки
      </Tab>
      {/* @ts-ignore */}
      <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
        Соусы
      </Tab>
    </div>
  )
}

export default Tabs