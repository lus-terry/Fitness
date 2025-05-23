// components/CustomDateGridEvent.jsx
import React from 'react'

const CustomDateGridEvent = ({ calendarEvent }) => {
  return (
    <div style={{ padding: '2px 4px', marginBottom: '2px', backgroundColor: '#43a047', color: 'white', borderRadius: '2px' }}>
      {calendarEvent.title}
    </div>
  )
}

export default CustomDateGridEvent
