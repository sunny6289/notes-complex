import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utlis/firebase/firebase';
import { userIn } from '../store/slices/authentication/authSlice';

const randomString = (length) => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';

	for (let index = 0; index < length; index += 1) {
		result += characters[Math.floor(Math.random() * characters.length)];
	}

	return result;
};

const guestSignup = async (dispatch) => {
	const email = `guest-${Date.now()}-${randomString(8)}@guest.local`;
	const password = randomString(8);

	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		dispatch(userIn({name: res.user.displayName, email: res.user.email}))
		
	} catch (error) {
		return error?.message || 'Guest signup failed';
	}
};

export { guestSignup };
export default guestSignup;
