const mongoose = require('mongoose')

export default async function connectMongo() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
