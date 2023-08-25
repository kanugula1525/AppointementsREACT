// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, onStar} = props
  const {id, titleInput, isStarred, dateInput} = eachAppointment
  const star = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onFavourite = () => {
    onStar(id)
  }

  return (
    <li className="itemContainer">
      <div className="titleContainer">
        <p className="titleStyle">{titleInput}</p>
        <button
          data-testid="star"
          onClick={onFavourite}
          className="starButton"
          type="button"
        >
          <img src={star} alt="star" />
        </button>
      </div>
      <p className="dateStyle">Date:{dateInput}</p>
    </li>
  )
}

export default AppointmentItem
