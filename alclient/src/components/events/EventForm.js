import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {createEvent} from '../../actions/eventActions'
import TextFieldGroup from '../common/TextFieldGroup'

class EventForm extends Component {
  static propTypes = {
    createEvent: PropTypes.func.isRequired,
  }

  state = {
    title: '',
    errors: {},
    isLoading: false
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.createEvent(this.state)
  }

  render() {
    const {title, errors, isLoading} = this.state

    return (
      <form onSubmit={::this.onSubmit}>
        <h1>Create New Game Event</h1>

        <TextFieldGroup
          field="title"
          label="Event Title"
          name="title"
          value={title}
          onChange={::this.onChange}
          error={errors.title}
        />

        <button type="submit" disabled={isLoading} className="btn btn-primary">Create</button>
      </form>
    )
  }
}

export default connect(null, {createEvent})(EventForm)
