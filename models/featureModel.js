import mongoose, { Schema, model, models} from 'mongoose'

const featureSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  name: {
    type: String,
  },
  notes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notes'
  }
})

const Feature = models.Feature || model('Feature', featureSchema)

export default Feature