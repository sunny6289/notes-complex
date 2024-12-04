import { motion } from 'framer-motion';
import { GiOakLeaf } from 'react-icons/gi';

export default function Header() {
    const scrollToSignUp = () => {
        document.getElementById('signup-form').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-dark/80 backdrop-blur-sm">
            <nav className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 sm:py-4">
                
                <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl sm:text-2xl text-white flex items-center gap-3 select-none"
                    >
                        <GiOakLeaf className='text-blue-500 text-4xl' />
                        <h1 className='primary-text text-3xl logo'>Notes</h1>
                    </motion.div>
                    
                
                <div className="flex items-center justify-between">
                    
                    <button
                        onClick={scrollToSignUp}
                        className="px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full bg-accent text-white hover:bg-blue-600 transition-colors"
                    >
                        Sign Up
                    </button>
                </div>
            </nav>
        </header>
    );
}