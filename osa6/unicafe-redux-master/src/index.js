import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const all = (good, ok, bad) => {
  return good + ok + bad
}

const average = (good, ok , bad) => {
  return (good - bad) / all(good,ok,bad)
}

const positive = (good, ok , bad) => {
  return good / (good + ok + bad)
}

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const neutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={neutral}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <div>all {all(store.getState().good, store.getState().ok, store.getState().bad)}</div>
      <div>average {average(store.getState().good, store.getState().ok, store.getState().bad)}</div>
      <div>positive {positive(store.getState().good, store.getState().ok, store.getState().bad)}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
