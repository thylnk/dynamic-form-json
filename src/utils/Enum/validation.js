import { validateNumber, validateRequired, validateText } from "../Validation";

export const inputType = Object.freeze({
    'text': 'SHORT_TEXT',
    'number': 'NUMBER',
    'textarea': 'LONG_TEXT',
    'radio': 'RADIO',
});

export const validation = Object.freeze({
    'required': validateRequired,
    'number': validateNumber,
    'text': validateText,
})
