import mongoose, { Schema } from "mongoose";

const MyListSchema = new mongoose.Schema({
    user:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    movieId: { type: String },
    movieImg: { type: String },
    movieTitle: { type: String },
    movieDesc: { type: String },
},
    { timestamps: true }
);

export default mongoose.model("MyList", MyListSchema);