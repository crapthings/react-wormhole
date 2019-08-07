export const withTest = WrappedComponent => {
  WrappedComponent.prototype.test = function () {
    console.log(test)
  }

  return WrappedComponent
}
