import mongoose, { Schema, model, models} from 'mongoose'

const noteSchema = new Schema({
  note: {
    type: String
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
})

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
  notes: {
    type: [noteSchema],
  }
})

const Project = models.Project || model('Project', projectSchema)

export default Project