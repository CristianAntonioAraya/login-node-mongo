import mongoose from 'mongoose';

const { NODE_ENV, DEV_URI, PROD_URI } = process.env;

const URI = NODE_ENV === 'development' ? DEV_URI : PROD_URI;

mongoose.connect(URI);

mongoose.connection.once('open', () => {
    console.log('Data Base online in', `${NODE_ENV}`, 'mode');
});

export default mongoose;
