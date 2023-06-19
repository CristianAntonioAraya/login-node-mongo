import mongoose from 'mongoose';

mongoose.connect(process.env.PROD_URI);

mongoose.connection.once('open', () => {
    console.log('Data Base online in production mode');
});

export default mongoose;
