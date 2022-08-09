import mongoose, { Schema, model, models} from 'mongoose'
import { subRouteSchema } from './subRouteModel'

const mainRouteSchema = new Schema({
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
  subRoutes: {
    type: [subRouteSchema],
  }
})

const MainRoute = models.MainRoute || model('MainRoute', mainRouteSchema)

export default MainRoute