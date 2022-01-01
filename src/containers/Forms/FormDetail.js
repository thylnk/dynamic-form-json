import React from 'react';
import InputField from '../../components/InputField';
import Radio from '../../components/Radio';
import PropTypes from 'prop-types';
import { inputType } from '../../utils/Enum/inputType';

const propTypes = {
    title: PropTypes.string,
    questions: PropTypes.array,
    description: PropTypes.string,
    setError: PropTypes.func,
    handleChange: PropTypes.func.isRequired,
}

const defaultProps = {
    title: '',
    questions: [],
    description: '',
    setError: () => { },
}

export default function FormDetail({ title, description, questions, setError, handleChange, idxSec }) {

    return (
        <div className='form-content'>
            <h2>{title}</h2>
            <span className='description description-main'>{description}</span>
            {
                (questions && questions.map((item, index) => {
                    if (item.type === inputType.radio) {
                        return < Radio key={index}
                            question={item.question}
                            type={item.type}
                            description={item.description}
                            defaultAnswer={item.defaultAnswer}
                            required={item.required}
                            options={item.options}
                            setError={setError}
                            handleChange={handleChange}
                            idxSec={idxSec}
                            idxQues={index} />
                    }
                    else {
                        return (
                            <InputField
                                key={index}
                                question={item.question}
                                type={item.type}
                                description={item.description}
                                defaultAnswer={item.defaultAnswer}
                                required={item.required}
                                attrs={item.attrs}
                                setError={setError}
                                handleChange={handleChange}
                                idxSec={idxSec}
                                idxQues={index}
                            />
                        )
                    }
                }))
            }
        </div>
    )
}

FormDetail.propTypes = propTypes;

FormDetail.defaultProps = defaultProps;