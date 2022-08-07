import mongoose, { Schema, model, models} from 'mongoose'

const subRouteSchema = new Schema({
  name: {
    type: String
  },
  mainRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MainRoute'
  }
})

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