// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {
    filterStatus: false,
    AppointmentsList: [],
    titleInput: '',
    dateInput: '',
  }

  title = event => {
    this.setState({titleInput: event.target.value})
  }

  date = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: uuidv4(),
      titleInput,
      dateInput: format(new Date(dateInput), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }

    this.setState(prevState => ({
      AppointmentsList: [...prevState.AppointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onStar = ID => {
    this.setState(prevState => ({
      AppointmentsList: prevState.AppointmentsList.map(eachItem => {
        if (eachItem.id === ID) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  showFavourite = () => {
    this.setState(prevState => ({filterStatus: !prevState.filterStatus}))
  }

  render() {
    const {AppointmentsList, titleInput, dateInput, filterStatus} = this.state
    let displayList = []
    if (filterStatus === true) {
      displayList = AppointmentsList.filter(
        eachItem => eachItem.isStarred === true,
      )
    } else {
      displayList = AppointmentsList
    }

    return (
      <div className="mainContainer">
        <div className="miniContainer">
          <div className="topSection">
            <form onSubmit={this.addAppointment}>
              <h1>Add Appointment</h1>
              <div className="inputContainer">
                <label className="labelStyle" htmlFor="title">
                  TITLE
                </label>
                <input
                  value={titleInput}
                  onChange={this.title}
                  className="inputStyle"
                  id="title"
                  placeholder="Title"
                />
              </div>

              <div className="inputContainer">
                <label className="labelStyle" htmlFor="date">
                  DATE
                </label>
                <input
                  value={dateInput}
                  onChange={this.date}
                  type="date"
                  className="inputStyle"
                  id="date"
                />
              </div>

              <button type="submit" className="addButtonStyle">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="horizontalRule" />
          <div className="bottomSection">
            <div className="bottomTitleSection">
              <h1>Appointments</h1>
              <button
                onClick={this.showFavourite}
                type="button"
                className="normalButtonStyle"
              >
                Starred
              </button>
            </div>
            <ul className="AppointmentItemListContainer">
              {displayList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  eachAppointment={eachAppointment}
                  onStar={this.onStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
