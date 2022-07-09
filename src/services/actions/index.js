export const GET_BURGER_INGREDIENTS_REQUEST = 'GET_BURGER_INGREDIENTS_REQUEST'
export const GET_BURGER_INGREDIENTS_FAILED = 'GET_BURGER_INGREDIENTS_FAILED'
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS'

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

// Получение с сервера игредиентов посредством усилителя
export const getBurgerIngredients = () => {
  
  return function(dispatch) {

    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST
    })
    fetch(API_URL)
      .then(res => {
        if (res.ok) {
          const data = res.json()
          console.log(data)
          dispatch({
            type: GET_BURGER_INGREDIENTS_SUCCESS,
            data: data.data
          })
        } else {
          dispatch({
            type: GET_BURGER_INGREDIENTS_FAILED
          })
        }
      }).catch(err => {
        dispatch({
          type: GET_BURGER_INGREDIENTS_FAILED
        })
      })
  }
} 