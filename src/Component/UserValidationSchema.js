import * as yup from 'yup';

export const RegisterValidation = yup.object().shape({
    firstname: yup.string().min(5).required(),
    lastname: yup.string().required(),
    email: yup.string().min(4).required().email(),
    password: yup.string().min(5).required()
});


export const LoginValidation = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().min(5).required()
});

