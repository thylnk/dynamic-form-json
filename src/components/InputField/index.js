import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inputType } from '../../utils/Enum/inputType';
import { validation } from '../../utils/Enum/validation';

const propTypes = {
    question: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    defaultAnswer: PropTypes.string,
    required: PropTypes.bool,
    attrs: PropTypes.object,
    setError: PropTypes.func,
    handleChange: PropTypes.func.isRequired,
}

const defaultProps = {
    question: null,
    type: 'text',
    description: null,
    defaultAnswer: '',
    required: false,
    attrs: {},
    setError: () => { },
}

const InputField = (props) => {

    let { question, type, description, defaultAnswer, required, attrs, handleChange, setError, idxSec, idxQues } = props;

    const [errorInput, setErrorInput] = useState(false);
    const [isValidated, setIsValidated] = useState(false);

    // neu truong defaultAnswer la null thi -> ''
    defaultAnswer = (defaultAnswer === null) ? '' : defaultAnswer;

    const handleError = (event) => {
        let error = null;
        const value = event.target.value;
        if (!isValidated) {
            if (required) {
                error = validation.required(value);
                setErrorInput(error);
                // null thi ktra tiep do dai cua value co thoa khong
                if (!error) {
                    error = (type === inputType.number) ? validation.number(value, attrs) : validation.text(value, attrs);
                    // setErrorInput
                    setErrorInput(error);
                }
                // setError de submitForm hay khong
                setError((error) ? true : false);
            }
            if (!error) setIsValidated(true);
        }
    }

    const onChange = (event) => {
        handleChange(event, idxSec, idxQues, type);
    }

    return (

        (type === inputType.textarea ? (
            // inputfield cho textarea
            <div className='input-group'>
                <label>{question}</label >
                <span className='description'>{description}</span>
                <textarea className='border-left'
                    name={question}
                    onBlur={(event) => handleError(event)}
                    onChange={onChange}
                    defaultValue={defaultAnswer} />
                {
                    (errorInput && <span className='error'><i className='fas fa-exclamation-triangle'></i>{errorInput}</span>)
                }
            </div >
        ) : (

            // inputfield cho text/number
            <div className='input-group'>
                <label>{question}</label>
                <span className='description'>{description}</span>
                <input className='border-left' type='text'
                    onBlur={(event) => handleError(event)}
                    defaultValue={defaultAnswer}
                    name={question}
                    onChange={onChange} />
                {
                    (errorInput && <span className='error'><i className='fas fa-exclamation-triangle'></i>{errorInput}</span>)
                }
            </div>
        ))
    )
}

InputField.propTypes = propTypes;

InputField.defaultProps = defaultProps;

export default InputField;