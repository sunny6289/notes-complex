import { motion } from 'framer-motion';
import AuthForm from './AuthForm';

const Hero = ()=> {
  const scrollToSignUp = () => {
    document.getElementById('signup-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen pt-16 sm:pt-20">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
        {/* Hero Text Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6"
          >
            Your thoughts,
            <br />
            <span className="text-accent">organized beautifully</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
          >
            Transform your ideas into organized, actionable notes. 
            Simple, fast, and beautiful note-taking for modern thinkers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="px-4"
          >
            <button 
              onClick={scrollToSignUp}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-accent text-white hover:bg-blue-600 transition-colors text-base sm:text-lg w-full sm:w-auto"
            >
              Sign Up Now
            </button>
          </motion.div>
        </div>

        {/* Auth Form Section */}
        <motion.div 
          id="signup-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full max-w-md mx-auto px-4 sm:px-0"
        >
          <AuthForm />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;