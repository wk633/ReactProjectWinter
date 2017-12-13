This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### use redux
- use redux-thunk to handle asynchronous action
    - applyMiddleware
    - action return a function
- install redux-devtools-extension
    - use compose function to compose applyMiddleware and devtools
- use react-redux
    - no need to subscribe manually, only reducer, action and dispatch
    - use provider and connect
        - "provider" component is put on the outermost layer, use only once
        - "connect" get parameters from outer layer(can use decorator to write)
        - can use decorator to write connect(need to install babel-plugin-transform-decorators-legacy, and add plugin configuration in package.json)



