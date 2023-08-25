import React, { useState } from 'react';
import LoginComponent from '../../components/loginComponent/loginComponent';

const mode = 'login';

const LoginPage = () => {

    const [formData, setFormData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // try {
        //     const response = await axios.post('/your-backend-route', formData); // Replace with your actual route
        //     console.log('Response from backend:', response.data);
        // } catch ( error ) {
        //     console.error('Error submitting form:', error);
        // }
    };

    return (
        <div className={ `app app--is-${ mode }` }>
            <LoginComponent
                mode={ mode }
                onSubmit={ handleSubmit }
                setFormData={ setFormData }
            />
        </div>
    );
};

export default LoginPage;
