import mongoose from 'mongoose';

export default () => {
    mongoose.connect("mongodb+srv://biswas25277:WcCsA59ZoiAfkLV0@cluster0.tdth3oi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected");
    }).catch((e) => {
        console.log("Error connecting to database", e);
    });
};
