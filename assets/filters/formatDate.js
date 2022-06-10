import moment from 'moment'

export default function formatDate(value) {
  if (value) {
    return moment(String(value)).format("Y-MM-DDTHH:mm");
  }
}
