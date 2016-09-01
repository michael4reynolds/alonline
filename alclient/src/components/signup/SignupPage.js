import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import SignupForm from './SignupForm'
import {userSignupRequest, isUserExists} from '../../actions/signupActions'
import {addFlashMessage} from '../../actions/flashMessages'

class SignupPage extends Component {
  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired,
  }

  render() {
    const {userSignupRequest, addFlashMessage, isUserExists} = this.props
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm 
            isUserExists={isUserExists}
            userSignupRequest={userSignupRequest} 
            addFlashMessage={addFlashMessage} />
        </div>
      </div>
    )
  }
}

export default connect(null, {userSignupRequest, addFlashMessage, isUserExists})(SignupPage)
