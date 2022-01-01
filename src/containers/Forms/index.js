import React, { useEffect, useState } from 'react';
import formApi from '../../api/formApi';
import Button from '../../components/Button';
import '../../assets/style.css';
import FormDetail from '../Forms/FormDetail';
import { inputType } from '../../utils/Enum/inputType';

export default function Form() {

    const [step, setStep] = useState(1);
    const [error, setError] = useState(false); // true -> loi
    const [title, setTilte] = useState('');
    const [description, setDescription] = useState(null);
    const [sections, setSections] = useState([]);
    // const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const arr = [];
                const response = await formApi.getAll();
                setTilte(response.title);
                setDescription(response.description);
                setSections(response.sections);
            } catch (error) {
                // xu ly loi
                // setError(error);
            }
        }
        fetchData();
    }, [])

    const nextStep = () => {
        let currentStep = step;
        if (error || currentStep === sections.length) {
            // alert("Bạn chưa điền thông tin hoặc thông tin không hợp lệ!");
            return;
        }
        setStep(currentStep + 1);
        // setError(true);
    }

    const prevStep = () => {
        let currentStep = step;
        if (currentStep > 1) {
            setStep(currentStep - 1);
        }
    }

    const handleChange = (e, idxSec, idxQues, type) => {
        const { value } = e.target;
        let updatedSections = [...sections];
        let updatedSection = updatedSections[idxSec];
        let updatedQuestions = [...updatedSection.questions];
        let updatedQuestion = updatedQuestions[idxQues];
        updatedQuestion.defaultAnswer = (type === inputType.radio) ? Number.parseInt(value) : value;
        updatedQuestions.slice(idxQues, 1, updatedQuestion);
        updatedSections.slice(idxSec, 1, idxSec);
        setSections(updatedSections)
    }

    const handleSubmit = () => {

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <div className='left-col'>
                    <div className='input-group'>
                        <h1 className='title'>{title}</h1>
                        <p className='description'>{description}</p>
                    </div>
                    <div className='button-group'>
                        {
                            function () {
                                if (step === 1) {
                                    return (
                                        <Button styleClass="btn btn-next" value='Mục sau' handleBtn={nextStep} />
                                    )
                                }
                                else if (step < sections.length) {
                                    return (
                                        <div>
                                            <Button styleClass="btn-prev" value='Mục trước' handleBtn={prevStep} />
                                            <Button styleClass="btn-next" value='Mục sau' handleBtn={nextStep} />
                                        </div>
                                    )
                                }

                                return (
                                    <div>
                                        <Button styleClass="btn-prev" value='Mục trước' handleBtn={prevStep} />
                                        <Button type='submit' styleClass="btn-submit" value='Hoàn thành' />
                                    </div>
                                )
                            }()
                        }
                    </div>
                </div>
                <div className='right-col'>
                    {
                        (sections && sections.map((item, index) => {
                            if (index === step - 1) {
                                return (
                                    < FormDetail
                                        key={index}
                                        title={item.title}
                                        description={item.description}
                                        questions={item.questions}
                                        setError={setError}
                                        handleChange={handleChange}
                                        idxSec={index}
                                    />
                                )
                            }
                        }))
                    }
                </div>
            </div>
        </form >
    )
}