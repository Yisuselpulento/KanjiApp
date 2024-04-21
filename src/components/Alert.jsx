const Alert = ({ alert }) => {
  return (
    <div className={`${alert.error ? 'bg-red-500 text-red-200' : 'bg-green-500'} bg-gradient-to-br text-center p-2 rounded  text-white  text-sm  `}>
      {alert.msg}
    </div>
  )
}

export default Alert
