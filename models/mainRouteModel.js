import mongoose, { Schema, model, models} from 'mongoose'

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
  subroutes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubRoute'
  }
})

const MainRoute = models.MainRoute || model('MainRoute', mainRouteSchema)

export default MainRoute