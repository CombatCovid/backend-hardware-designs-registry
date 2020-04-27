import * as mongoose from 'mongoose';

// const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

const connectionString = 'mongodb://localhost:27017/officePages';
export const connection = mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
