import { Schema, model, models} from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  }
})

const User = models.User || model('User', userSchema)

export default User