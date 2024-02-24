import * as Yup from 'yup'

export const SignUpSchema = Yup.object().shape({
    Name: Yup.string()
        .min(4, 'Please Enter atleast 4 characters')
        .required('Name is Required'),

    Email: Yup.string()
        .email()
        .required('Please Enter valide email'),

    DOB: Yup.string()
        .required('Date of Birth is required'),
  
    Password: Yup.string()
        .min(6, 'Please Enter atleast 6 characters')
        .required('Password is Required'),

    RePassword: Yup.string()
        .required('RePassword is Required')
        .oneOf([Yup.ref('Password'), null], 'Password does not match')
})