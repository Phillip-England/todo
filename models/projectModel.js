import mongoose, { Schema, model, models} from 'mongoose'

import { projectNoteSchema } from './projectNoteModel'

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
    type: [projectNoteSchema],
  }
})

const Project = models.Project || model('Project', projectSchema)

export default Project