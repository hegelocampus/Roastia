import React, { Component } from 'react';
import AuthLink from '../../util/AuthLink';
import { AddIcon } from '../../util/icons';

class AddDropDown extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ open: !this.state.open })
  }

  render () {
    return (
    <div className="dropdown">
      <button onClick={this.toggle}>
        <AddIcon className="add-icon" />
        <p>Add</p>
      </button>
      {this.state.open && <div>
        <AuthLink
          content='Add Shop'
          to={{
            pathname: '/new/shop',
            state: {
              background: this.props.location
            }
          }}
        />
        <AuthLink
          content='Add Coffee'
          to={{
            pathname: '/new/coffee',
            state: {
              background: this.props.location
            }
          }}
        />
      </div>}
    </div>
    )
  }
}

export default AddDropDown;