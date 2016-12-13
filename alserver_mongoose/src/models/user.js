import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'

mongoose.Promise = global.Promise

const User = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  timezone: {type: String, required: true},
  password: {type: String, required: true}
})

User.plugin(timestamps)

export default mongoose.model('User', User)
