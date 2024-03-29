import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import {login} from '../../actions/authActions'
import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

function validateInput(data) {
  let errors = {}

  if (Validator.isNull(data.identifier)) {
    errors.identifier = 'This field is required'
  }
  if (Validator.isNull(data.password)) {
    errors.password = 'This field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

class LoginForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    identifier: '',
    password: '',
    errors: {},
    isLoading: false
  }

  isValid() {
    const {errors, isValid} = validateInput(this.state)

    if (!isValid) {
      this.setState({errors})
    }

    return isValid
  }

  onSubmit(e) {
    e.preventDefault()
    if (::this.isValid()) {
      this.setState({errors: {}, isLoading: true})
      this.props.login(this.state).then(
        (res) => this.context.router.push('/'),
        (err) => this.setState({errors: err.response.data.errors, isLoading: false})
      )
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const {errors, identifier, password, isLoading} = this.state
    return (
      <form onSubmit={::this.onSubmit}>
        <h1>Login</h1>

        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <TextFieldGroup
          field='identifier'
          label='Username / Email'
          value={identifier}
          error={errors.identifier}
          onChange={::this.onChange} />
          
        <TextFieldGroup
          field='password'
          label='Password'
          value={password}
          error={errors.password}
          onChange={::this.onChange}
          type='password' />

        <div className="form-group">
          <button className="btn btn-primary btn-lg" disabled={isLoading}>
            Login
          </button>
        </div>
      </form>
    )
  }
}

export default connect(null, {login})(LoginForm)
