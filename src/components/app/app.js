import React, { useState } from 'react'

import AppHeader from '../app-header'
import AddForm from '../add-form'
import TodoList from '../todo-list'
import Footer from '../footer'
import './app.css'

function App() {
  const [maxId, setMaxId] = useState(100)
  const [filter, setFilter] = useState('all')
  const [todoData, setTodoData] = useState([])

  const createItem = (label, minutes, seconds) => ({
    id: maxId + 1,
    label,
    done: false,
    dateCreated: new Date(),
    minutes,
    seconds,
  })

  const addItem = (task, minutes, seconds) => {
    const newItem = createItem(task, minutes, seconds)
    setTodoData([newItem, ...todoData])
    setMaxId(prevMaxId => prevMaxId + 1)
  }

  const toggleEditMode = (id) => {
    const updatedData = todoData.map((item) =>
      item.id === id ? { ...item, editMode: !item.editMode } : item
    )
    setTodoData(updatedData)
  }

  const editItem = (id, newText) => {
    const updatedData = todoData.map((item) =>
      item.id === id ? { ...item, label: newText, editMode: false } : item
    )
    setTodoData(updatedData)
  }

  const deleteItem = (id) => {
    const updatedData = todoData.filter((item) => item.id !== id)
    setTodoData(updatedData)
  }

  const setFilterHandler = (newFilter) => {
    setFilter(newFilter)
  }

  const deleteCompletedItem = () => {
    const updatedData = todoData.filter((item) => !item.done)
    setTodoData(updatedData)
  }

  const onToggleDone = (id) => {
    const updatedData = todoData.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    )
    setTodoData(updatedData)
  }

  const doneCount = todoData.filter((item) => !item.done).length

  let filteredTasks = todoData
  if (filter === 'completed') {
    filteredTasks = todoData.filter((task) => task.done === true)
  }
  if (filter === 'active') {
    filteredTasks = todoData.filter((task) => task.done === false)
  }

  return (
    <div className="todoapp">
      <div className="main">
        <AppHeader />
        <AddForm addItem={addItem} />
        <TodoList
          todos={filteredTasks}
          onToggleDone={onToggleDone}
          toggleEditMode={toggleEditMode}
          editItem={editItem}
          deleteItem={deleteItem}
        />
        <Footer
          doneCount={doneCount}
          setFilter={setFilterHandler}
          activeFilter={filter}
          deleteCompletedItem={deleteCompletedItem}
        />
      </div>
    </div>
  )
}

export default App