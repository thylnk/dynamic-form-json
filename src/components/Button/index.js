import React from 'react'
import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.string,
    style: PropTypes.string,
    value: PropTypes.string,
    handleBtn: PropTypes.func,
}

const defaultProps = {
    type: 'button',
    style: '',
    value: 'Hoàn thành',
    handleBtn: () => { },
}


export default function Button({ type, styleClass, value, handleBtn }) {

    const handleClick = (event) => {
        handleBtn(event);
    }

    return (
        <button type={type} className={`btn ${styleClass}`} onClick={handleClick} value={value}>{value}</button>
    )
}

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;