export function calculateTimeSincePost (createdAt) {
  const postDate = new Date(createdAt)
  const currentDate = new Date()

  const timeDifference = Math.abs(currentDate - postDate)
  const minutesDifference = Math.floor(timeDifference / (1000 * 60))

  if (minutesDifference < 60) {
    return `${minutesDifference} ${minutesDifference === 1 ? 'minuto' : 'minutos'} atrás`
  } else if (minutesDifference < 24 * 60) {
    const hoursDifference = Math.floor(minutesDifference / 60)
    return `${hoursDifference} ${hoursDifference === 1 ? 'hora' : 'horas'} atrás`
  } else {
    const daysDifference = Math.floor(minutesDifference / (24 * 60))
    return `${daysDifference} ${daysDifference === 1 ? 'día' : 'días'} atrás`
  }
}
