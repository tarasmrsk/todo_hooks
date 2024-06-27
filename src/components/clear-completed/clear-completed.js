import React from 'react'
import './clear-completed.css'

function ClearCompleted({ deleteCompletedItem }) {
  return <button type="button" className="clear-completed" onClick={deleteCompletedItem}>
      Clear completed
  </button>
}

export default ClearCompleted
