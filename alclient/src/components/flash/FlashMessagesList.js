import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import FlashMessage from './FlashMessage'
import {deleteFlashMessage} from '../../actions/flashMessages'

class FlashMessagesList extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
  }
  
  render() {
    const messages = this.props.messages.map(message => 
    <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage}/>
    )
    return (
      <div>{messages}</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  }
}

export default connect(mapStateToProps, {deleteFlashMessage})(FlashMessagesList)

