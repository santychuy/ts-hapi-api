import { Schema, model, Document } from 'mongoose';
import { compare, hash, genSalt } from 'bcrypt';

export interface IUser extends Document {
	username: string;
	fullname: string;
	password: string;

	validatePassword: (password: string) => Promise<Boolean>;
}

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			lowercase: true,
		},
		fullname: String,
		password: {
			type: String,
			required: true,
			minlength: 7,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre<IUser>('save', async function(next) {
	const user = this;

	if (!user.isModified('password')) return next();

	const salt = await genSalt(10);
	user.password = await hash(user.password, salt);
	next();
});

userSchema.methods.validatePassword = async function(
	password: string
): Promise<Boolean> {
	return await compare(password, this.password);
};

export default model('User', userSchema);
