import React from 'react';

const Button = ({content, onClick, style}) => {
    return (
        <>
            <button className={`${style} active:scale-95`} onClick={onClick}>{content}</button>
        </>
    );
}

export default Button;
