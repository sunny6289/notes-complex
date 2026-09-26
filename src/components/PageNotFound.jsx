import { TbError404 } from "react-icons/tb";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='relative w-full h-screen primary-text flex items-center justify-center overflow-hidden bg-gradient-dark px-6 py-16'>
            <div className='absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#3B82F6]/10 blur-3xl' />
            <div className='absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#3B82F6]/10 blur-3xl' />

            <button className='absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-[#3B82F6]/10 px-4 py-2 text-sm font-semibold text-[#3B82F6] transition hover:bg-[#3B82F6] hover:text-white md:left-10 md:top-8' onClick={()=>navigate(-1)}>
                <FaAngleDoubleLeft />
                <span>Go back</span>
            </button>

            <main className='relative z-10 flex max-w-3xl flex-col items-center text-center'>
                <div className='mb-8 flex items-center gap-3 text-[#3B82F6]'>
                    <span className='h-px w-10 bg-[#3B82F6]/50 sm:w-20' />
                    <span className='text-xs font-bold uppercase tracking-[0.35em]'>Error 404</span>
                    <span className='h-px w-10 bg-[#3B82F6]/50 sm:w-20' />
                </div>
                <div className='relative mb-8'>
                    <div className='absolute inset-0 rounded-3xl bg-[#3B82F6]/20 blur-2xl' />
                    <TbError404 color='#3b82f6' className='relative rounded-3xl border-2 border-[#3b82f6]/60 bg-[#3B82F6]/10 p-4 text-[130px] shadow-2xl shadow-[#3B82F6]/20 sm:text-[190px]' />
                </div>
                <h1 className='logo text-4xl font-bold sm:text-6xl'>Page not found</h1>
            </main>
        </div>
    );
}

export default PageNotFound;
