import { FC, useEffect } from 'react'
import { useAppDispatch } from '../../utils/hooks'
import { BrowserRouter as Router } from 'react-router-dom'

import { getBurgerIngredients } from '../../services/actions'

import { ModalSwitch } from '../modal-switch/modal-switch'

const App: FC = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getBurgerIngredients())
  }, [])
  
  return (
    <Router basename="/react-burger">
      <ModalSwitch />
    </Router>
  );
}

export default App