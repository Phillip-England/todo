import mongoose, { Schema, model, models} from 'mongoose'

export const featureSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String,
  },
  subRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MainRoute'
  }
})

const Feature = models.Feature || model('Feature', featureSchema)

export default Feature