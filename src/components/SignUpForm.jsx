import { motion } from 'framer-motion';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { userIn } from '../store/slices/authentication/authSlice';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../utlis/firebase/firebase';

export default function SignUpForm({ onToggleForm }) {
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if(formData.email.length && formData.password.length && formData.confirmPassword.length){
        if(formData.password === formData.confirmPassword){
          const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
          dispatch(userIn({name: res.user.displayName, email: res.user.email}))
     
        }else{
          alert('password and confirm password does not match')
        }
      }else{
        alert('Email, password and confirm password cannot be empty')
      }
    } catch (error) {
      console.error('Error : ', error)
      setFormData({
        email: '',
        password: '',
        confirmPassword: ''})
    }
  };

  const handleGoogleSignUp = async() => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      dispatch(userIn({name: res.user.displayName, email: res.user.email, photoURL: res.user.photoURL}));

    } catch (error) {
      console.error('Error : ',error)
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={handleGoogleSignUp}
        type="button"
        className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 bg-white hover:bg-gray-50 text-gray-800 rounded-lg transition-colors duration-200 font-medium text-sm sm:text-base mb-6"
      >
        <FcGoogle className="text-xl sm:text-2xl" />
        Sign up with Google
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#1a1f21] text-gray-400">or continue with</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2a3133] border border-gray-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-white text-sm sm:text-base"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2a3133] border border-gray-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-white text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2a3133] border border-gray-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-white text-sm sm:text-base"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 px-4 bg-accent hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm sm:text-base"
          
        >
          Create Account
        </button>
      </form>

      <p className="mt-4 text-center text-xs sm:text-sm text-gray-400">
        Already have an account?{' '}
        <button
          onClick={onToggleForm}
          className="text-accent hover:text-blue-400 transition-colors"
        >
          Sign in
        </button>
      </p>
    </motion.div>
  );
}