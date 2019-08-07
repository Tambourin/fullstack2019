import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const message = props.notification;
  if(!message) {
    return null;
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

const mapStoreToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStoreToProps)(Notification)