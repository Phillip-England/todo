import mongoose, { Schema, model, models} from 'mongoose'

const projectSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
  },
  vision: {
    type: String,
  },
})

const Project = models.Project || model('Project', projectSchema)

export default Project