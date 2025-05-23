// components/CustomTimeGridEvent.jsx
import React from 'react'

const CustomTimeGridEvent = ({ calendarEvent }) => {
  return (
    <div style={{ padding: '4px', borderRadius: '4px', backgroundColor: '#1976d2', color: 'white' }}>
      <strong>{calendarEvent.title}</strong>
      <div style={{ fontSize: '12px' }}>{calendarEvent.start} - {calendarEvent.end}</div>
    </div>
  )
}

export default CustomTimeGridEvent
