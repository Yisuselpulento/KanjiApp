const Alert = ({ alert }) => {
  return (
    <div className={`${alert.error ? 'bg-red-500' : 'bg-green-500'} bg-gradient-to-br text-center p-3 uppercase text-white font-bold text-sm  `}>
      {alert.msg}
    </div>
  )
}

export default Alert
