import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {addFlashMessage} from '../actions/flashMessages'

export default function(ComposedComponent) {
  class Authenticate extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      addFlashMessage: PropTypes.func.isRequired
    }

    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        })
        this.context.router.push('/login')
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.isAuthenticated) {
        this.context.router.push('/')
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props}/>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }
  return connect(mapStateToProps, {addFlashMessage})(Authenticate)
}
