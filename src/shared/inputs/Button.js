import React from 'react';
import Input from "shared/inputs/Input";


const Button = (props) => <Input type='button' {...props} onClick={
    !props?.onClick ? () => {
        } :
        props?.onClick?.constructor?.name === 'AsyncFunction' ? async e => {
            e.preventDefault();
            e.target.disabled = true;
            await props.onClick();
            e.target.disabled = false;
        } : props?.onClick?.constructor?.name === 'Function' ? e => {
            e.preventDefault();
            e.target.disabled = true;
            props.onClick();
            e.target.disabled = false;
        } : () => {
        }
}/>

export default Button;