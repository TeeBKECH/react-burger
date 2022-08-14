import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { getBurgerIngredients } from '../../services/actions'

import { ModalSwitch } from '../modal-switch/modal-switch'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBurgerIngredients())
  }, [])
  
  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App