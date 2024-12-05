import React from 'react';

const Input = ({placeholder,value, onChange, addedStyle}) => {
    return (
            <>
                <input value={value} onChange={onChange} type="text" placeholder={placeholder} className={`w-1/4 bg-black relative right-0 rounded text-zinc-400 p-2 text-md outline-1 ${addedStyle}`} />
            </>
    );
}

export default Input;
