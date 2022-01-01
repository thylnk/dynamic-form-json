import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { validation } from '../../utils/Enum/validation';

const propTypes = {
    question: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    defaultAnswer: PropTypes.number,
    required: PropTypes.bool,
    opitons: PropTypes.array,
    setError: PropTypes.func,
}

const defaultProps = {
    question: '',
    type: 'radio',
    description: null,
    defaultAnswer: 1,
    required: false,
    opitons: [],
    setError: () => { },
}

export default function Radio({ question, type, description, defaultAnswer, required, options, setError }) {

    // neu truong defaultAnswer la null thi -> ''
    defaultAnswer = (defaultAnswer === null) ? '' : defaultAnswer;

    const [errorInput, setErrorInput] = useState(null);

    const handleError = (event) => {
        let error = null;
        const value = event.target.value;
        if (required) {
            error = validation.required(value);
            setErrorInput(error);
            setError((error) ? true : false);
        }
    }

    return (
        <div className='input-group'>
            <label htmlFor="generation">{question}</label>
            <span className='description'>{description}</span>
            <div className='border-left'>
                <div className='input-group' >
                    {(errorInput && <span className='error'><i className='fas fa-exclamation-triangle'></i>{errorInput}</span>)}
                    {

                        (options && options.map((item, index) => {
                            return (
                                <div key={index}>
                                    <input type='radio' name={question} value={item.value}
                                        defaultChecked={defaultAnswer === item.value}
                                        onBlur={(event) => handleError(event)}
                                    />
                                    <label>{item.text}</label>
                                </div>
                            )
                        }))
                    }
                </div>
            </div>
        </div>
    )
}


Radio.propTypes = propTypes;

Radio.defaultProps = defaultProps;