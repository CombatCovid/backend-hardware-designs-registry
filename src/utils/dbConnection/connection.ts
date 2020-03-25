import mongoose from 'mongoose';

const conectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

export const connection = mongoose.connect(conectionString, {
  useNewUrlParser: true
});
