import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-[#1a1f21] p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-800"
    >
      <AnimatePresence mode="wait">
        {isSignIn ? (
          <SignInForm key="signin" onToggleForm={() => setIsSignIn(false)} />
        ) : (
          <SignUpForm key="signup" onToggleForm={() => setIsSignIn(true)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}