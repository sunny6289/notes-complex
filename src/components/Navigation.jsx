import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../utlis/firebase/firebase';
import { userOut } from '../store/slices/authentication/authSlice';
import { GiOakLeaf } from "react-icons/gi";
import { MdLogout } from "react-icons/md";


const Navigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signOutUser = async()=>{
        try {
            await signOut(auth);
            dispatch(userOut());
            navigate('/');
        } catch (error) {
            console.error('Error : ',error)
        }
    }
    return (
        <nav className='w-full h-16 flex items-center justify-between py-0 px-3 md:px-10 bg-[#000] border-b-2 border-zinc-900 sticky top-0 z-[60]'>
            <div className="flex items-center gap-1 md:gap-3 select-none" onClick={()=>navigate('/')}>
                <GiOakLeaf className='text-blue-500 text-3xl md:text-4xl'/>
                <h1 className='primary-text text-2xl md:text-3xl logo'>Notes</h1>
            </div>
            <button
                type='button'
                onClick={signOutUser}
                className='flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-white hover:bg-zinc-900'
            >
                Sign out <MdLogout />
            </button>
        </nav>
    );
}

export default Navigation;
