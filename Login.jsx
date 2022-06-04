import React, { useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { configureStore, createReducer, combineReducers } from '@reduxjs/toolkit'
 
function App() {  
  const [input, setInput] = useState('')
 
  /* useSelector 允许你检索你想使用的状态，在我们的例子中是notes数组。 */
  const notes = useSelector(state => state.notes)
 
  /* dispatch 允许我们向 store 发送更新信息 */
  const dispatch = useDispatch()
 
  function onCreateNote() {
    dispatch({ type: 'CREATE_NOTE', note: input })
    setInput('')
  }
  return (
    <div>
      <h1>My notes app</h1>
      <button onClick={onCreateNote}>Create Note</button>
      <input value={input} onChange={e => setInput(e.target.value)} />
      { notes.map(note => <p key={note}>Note: {note}</p>) }
    </div>
  );
}
 
/* 在这里，我们创建了一个 reducer，它将在`CREATE_NOTE`动作被触发时更新note数组。 */
const notesReducer = createReducer([], {
  'CREATE_NOTE': (state, action) => [...state, action.note]
})
 
/* Here we create the store using the reducers in the app */
const reducers = combineReducers({ notes: notesReducer })
const store = configureStore({ reducer: reducers })
 
function Main() {
  return (
    /* 在这里，我们使用app中的reducer来创建store。 */
    <Provider store={store}>
      <App />
    </Provider>
  )
}
 
export default Main
