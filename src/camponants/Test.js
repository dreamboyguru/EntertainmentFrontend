import React from 'react';
import { Formik, Form, Field } from 'formik';
// import axios from 'axios';

const UploadImageForm = () => {
    return (
        <Formik
            initialValues={{ image: null }}
            validationSchema=''
            onSubmit={(values) => {
                // const formData = new FormData();
                // formData.append('image', values.image);

                // axios.post('http://localhost:3001/videos', formData)
                //     .then(response => {
                //         console.log(response.data);
                //     })
                //     .catch(error => {
                //         console.error(error);
                //     });
                console.log(values.image);
            }}
        >
            {({ setFieldValue }) => (
                <Form>
                    <Field
                        name="image"
                        type="file"
                        id={e => e.currentTarget.files[0]}
                        
                    />
                    <button type="submit" className='border-2'>Upload</button>
                </Form>
            )}
        </Formik>
    );
};

export default UploadImageForm;
