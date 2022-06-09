import React from 'react';

function Button(props) {
    return (
        <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
        >
            {props.children}</button>
    );
}

export default Button;
