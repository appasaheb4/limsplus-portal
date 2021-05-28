import validate from "validate.js"
import moment from "moment"
export { validate }
validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function (value: any) {
    return +moment.utc(value)
  },
  // Input is a unix timestamp
  format: function (value: any, options: any) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss"
    return moment.utc(value).format(format)
  },
})

export const patientManager = {
  internalPid:{
    presence: true,
  },
  mobileNo:{
    presence: true,
  },
  title:{
    presence:true
  },
  firstName:{
    presence:true
  },
  middleName:{
    presence:true
  },
  lastName:{
    presence:true
  }
}
