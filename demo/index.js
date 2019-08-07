import React, { Component } from 'react'
import { render } from 'react-dom'
import withWormhole, { getWormhole } from '../src'
import { withTest } from './test'

@withWormhole('root')
@withTest
class Root extends Component {
  state = {
    ts: Date.now()
  }

  componentWillUpdate() {
    this.wormhole('changeRootTs').setState({ ts: Date.now() })
  }

  render() {
    return (
      <div>
        <h3>Root</h3>
        <div>{this.state.ts}</div>
        <Nest />
      </div>
    )
  }
}

class Nest extends Component {
  componentDidMount() {
    console.log('Nest')
  }

  render() {
    return (
      <div>
        <h3>Nest</h3>
        <Nest1 />
      </div>
    )
  }
}

class Nest1 extends Component {
  componentDidMount() {
    console.log('Nest1')
  }

  render() {
    return (
      <div>
        <h3>Nest1</h3>
        <Nest2 />
      </div>
    )
  }
}

@withWormhole('changeRootTs')
class Nest2 extends Component {
  state = {
    ts: null
  }

  onClick = evt => {
    this.wormhole('root').setState({ ts: Date.now() })
    console.log(getWormhole())
  }

  render() {
    return (
      <div>
        <h3>Nest2</h3>
        <button onClick={this.onClick}>Change Root Timestamp {this.state.ts}</button>
      </div>
    )
  }
}

render(<Root />, document.getElementById('root'))
