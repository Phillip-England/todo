import mongoose, { Schema, model, models} from 'mongoose'
import { featureSchema } from './featureModel'

export const subRouteSchema = new Schema({
  name: {
    type: String
  },
  mainRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MainRoute'
  },
  features: {
    type: [featureSchema],
  }
})

const SubRoute = models.SubRoute || model('SubRoute', subRouteSchema)

export default SubRoute