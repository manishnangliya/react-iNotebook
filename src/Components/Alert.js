import React from 'react'

const Alert = (props) => {
    const capitalize=(word)=>{
        if(word==='danger')
        {
            word='error';
        }
        else if(word==='success')
        {
            word ='congratulations!.. '
        }
        return word[0].toUpperCase() + word.slice(1);
    }
    return (
        props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(props.alert.type)}</strong> {props.alert.message}
        </div>
    )
}

export default Alert
