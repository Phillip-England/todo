import mongoose, { Schema, model, models} from 'mongoose'

export const projectNoteSchema = new Schema({
  note: {
    type: String
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
})

const ProjectNote = models.ProjectNote || model('ProjectNote', projectNoteSchema)

export default ProjectNote
