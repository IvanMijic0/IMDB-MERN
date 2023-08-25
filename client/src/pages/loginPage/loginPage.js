import React from 'react';
import LoginComponent from '../../components/loginComponent/loginComponent';

const mode = 'login';

const LoginPage = () => (
    <div className={ `app app--is-${ mode }` }>
        <LoginComponent
            mode={ mode }
            onSubmit={
                function () {
                    console.log('submit');
                }
            }
        />
    </div>
);

export default LoginPage;