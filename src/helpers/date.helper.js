import moment from 'moment'

export const formattedDate = (date, days = 0, format) => {
  return moment(date).add(days, 'day').format(format)
}