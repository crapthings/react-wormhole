import React, { createElement } from 'react'

const universe = {}

const withWormhole = componentName => {

  if (!componentName) throw 'componentName required'

  const hoc = component => props => {

    if (!component.prototype.render) {
      return component(props)
    }

    const { componentDidMount, componentWillUnmount } = component.prototype

    component.prototype.componentDidMount = function () {
      if (universe[componentName]) {
        console.error(universe[componentName])
        throw `componentName must be unique, ${componentName} is in use`
      }

      universe[componentName] = this

      this.wormhole = name => {
        if (Object.prototype.toString.call(name) === '[object String]') {
          return universe[name]
        } else if (Object.prototype.toString.call(name) === '[object Array]') {
          const ref = {}
          for (const _name of name) {
            ref[_name] = universe[_name]
          }
          return ref
        } else {
          return universe
        }
      }

      if (componentDidMount) {
        componentDidMount.apply(this, arguments)
      }
    }

    component.prototype.componentWillUnmount = function () {
      delete universe[componentName]
      if (componentWillUnmount) {
        componentWillUnmount.apply(this, arguments)
      }
    }

    return createElement(component, props)

  }

  return hoc

}

export default withWormhole