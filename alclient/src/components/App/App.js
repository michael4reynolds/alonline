import React, {Component} from 'react'
import NavigationBar from '../navigation/NavigationBar'
import FlashMessagesList from '../flash/FlashMessagesList'

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavigationBar/>
        <FlashMessagesList/>
        {this.props.children}
      </div>
    )
  }
}

export default App
