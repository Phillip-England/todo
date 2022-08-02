import mongoose, { Schema, model, models} from 'mongoose'

const noteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  feature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feature'
  },
  details: {
    type: String
  }
})

const Note = models.Note || model('Note', NoteSchema)

export default Note