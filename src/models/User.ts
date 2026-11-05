import { Schema, model, models} from 'mongoose';
import { unique } from 'next/dist/build/utils';
const UserSchema = new Schema(
    {
        firstName : {type : String, required: true},
        lastName : {type : String, required : true},
        email : {type : String, required: true, unique : true},
        password : {type : String, required: true},

    },
    {timestamps: true}
);

const User = models.User || model('User', UserSchema);
export default User;