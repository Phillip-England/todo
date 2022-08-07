import mongoose, { Schema, model, models} from 'mongoose'

export const subRouteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  mainRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MainRoute'
  },
  name: {
    type: String,
  },
})

const SubRoute = models.SubRoute || model('SubRoute', subRouteSchema)

export default SubRoute