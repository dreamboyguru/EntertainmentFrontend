import React from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';

function Index() {
  return (
    <div className='py-28 h-screen bg-gray-900'>
      <Formik
        initialValues={{
          type: '',
          title: '',
          desc: '',
          year: '',
          grade: '',
          actors: '',
          image: null,
          video: null,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const formData = new FormData();
            formData.append('type', values.type);
            formData.append('title', values.title);
            formData.append('desc', values.desc);
            formData.append('year', values.year);
            formData.append('grade', values.grade);
            formData.append('actors', values.actors);
            formData.append('image', values.image); // Append the image file
            formData.append('video', values.video); // Append the video file

            const response = await axios.post(
              'http://localhost:3001/videos',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
            console.log(response.data);
          } catch (error) {
            console.error('Error uploading data:', error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className='mx-52'>
            <div className='flex flex-col p-2'>
              <label htmlFor='image'>Image</label>
              <input
                type="file"
                id='image'
                name='image'
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
            </div>
            <div className='flex flex-col p-2'>
              <label htmlFor='video'>Video</label>
              <input
                type="file"
                id='video'
                name='video'
                onChange={(event) => {
                  setFieldValue("video", event.currentTarget.files[0]);
                }}
              />
            </div>

            <div className='p-2'>
              <button type='submit' disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Index;
