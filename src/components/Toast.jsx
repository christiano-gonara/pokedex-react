function Toast({ message }) {
  if (!message) return null
  return (
    <div className="toast" role="status" key={message.id}>
      {message.text}
    </div>
  )
}

export default Toast
