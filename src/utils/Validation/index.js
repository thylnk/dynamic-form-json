import { regex } from "./Regex";

export const validateNumber = (value, attrs) => {
    const length = value ? value.toString().trim().length : 0;

    if (length > 0) {
        const result = regex.number.test(value);
        if (!result) {
            return "Trường này chỉ cho phép nhập số!"
        }
        else {
            // value la so
            // neu yeu cau ktra min, max thi attrs khac null
            if (attrs) {
                const num = Number.parseInt(value);
                let min = attrs.min;
                let max = attrs.max;

                if (num < min || num > max) {
                    return `Bạn phải nhập một số từ ${min} đến ${max}!`
                }
                else {
                    return null;
                }
            }
        }
    }
    return null;
};

export const validateRequired = (value) => {
    if (!value || !value.toString().trim().length) {
        return "Trường này bắt buộc phải nhập!";
    }
    return null;
};

export const validateText = (value, attrs) => {
    // neu co yeu cau ktra thi attrs khac null
    if (attrs) {
        const length = value ? value.toString().length : 0;
        let min = attrs.minLength;
        let max = attrs.maxLength;
        if (length < min) {
            return `Bạn phải nhập tối thiểu ${min} kí tự và tối đa ${max} kí tự!`
        }
        else {
            if (length > max) {
                return `Bạn chỉ được phép nhập tối đa ${max} kí tự!`
            }
            return null;
        }
    }
    return null;
};