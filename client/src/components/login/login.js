import React from 'react';

import './login.css';

class Login extends React.Component {
    state = {
        mode: 'login',
    };

    toggleMode = async () => {
        const newMode = this.state.mode === 'login' ? 'register' : 'login';
        await this.setState({ mode: newMode });
        await this.props.setMode(this.state.mode);
        console.log(this.props.mode);
    };

    updateInputValue = (key, value) => {
        this.setState(
            {
                [key]: value,
            },
            () => {
                this.props.setFormData(this.state);
            }
        );
    };

    render() {
        const { mode } = this.state;
        return (
            <div>
                <div className={ `form-block-wrapper form-block-wrapper--is-${ mode }` }></div>
                <section className={ `form-block form-block--is-${ mode }` }>
                    <header className="form-block__header">
                        <h1>{ mode === 'login' ? 'Welcome back!' : 'Sign up' }</h1>
                        <div className="form-block__toggle-block">
                            <span>{ mode === 'login' ? "Don't" : 'Already' } have an account? Click here &#8594;</span>
                            <input id="form-toggler" type="checkbox" onClick={ this.toggleMode }/>
                            <label htmlFor="form-toggler"></label>
                        </div>
                    </header>
                    <LoginForm
                        mode={ mode }
                        onSubmit={ this.props.onSubmit }
                        formData={ this.state }
                        updateInputValue={ this.updateInputValue }
                        handleLogin={ this.handleLogin }
                    />
                </section>
            </div>
        );
    }
}

class LoginForm extends React.Component {
    state = {
        emailError: '',
        passwordError: '',
        fullNameError: '',
        repeatPasswordError: '',
    };

    handleInputChange = (key, value) => {
        const { mode, formData } = this.props;

        if ( key === 'email' && (mode === 'register' || mode === 'login') ) {
            if ( /^\S+@\S+\.\S+$/.test(value) ) {
                this.setState({ emailError: '' });
            } else {
                this.setState({ emailError: 'Invalid Credentials' });
            }
        } else if ( key === 'fullName' && mode === 'register' ) {
            if ( value.trim().split(' ').length >= 2 ) {
                this.setState({ fullNameError: '' });
            } else {
                this.setState({ fullNameError: 'Invalid Credentials' });
            }
        } else if ( key === 'repeatPassword' && mode === 'register' ) {
            const { createPassword } = formData;
            if ( createPassword === value ) {
                this.setState({ repeatPasswordError: '' });
            } else {
                this.setState({ repeatPasswordError: 'Invalid Credentials' });
            }
        }

        this.props.updateInputValue(key, value);
    };

    handleValidation = () => {
        const { mode, formData } = this.props;
        const { email, fullName, createPassword, repeatPassword } = formData;

        if ( mode === 'register' ) {
            let valid = true;

            if ( !/^\S+@\S+\.\S+$/.test(email) ) {
                this.setState({ emailError: 'Invalid Credentials' });
                valid = false;
            } else {
                this.setState({ emailError: '' });
            }

            if ( createPassword !== repeatPassword ) {
                this.setState({ repeatPasswordError: 'Invalid Credentials' });
                valid = false;
            } else {
                this.setState({ repeatPasswordError: '' });
            }

            if ( fullName && fullName.split(' ').length < 2 ) {
                this.setState({ fullNameError: 'Invalid Credentials' });
                valid = false;
            } else {
                this.setState({ fullNameError: '' });
            }

            return valid;
        }

        return true;
    };

    render() {
        const {
            emailError,
            fullNameError,
            repeatPasswordError,
        } = this.state;
        return (
            <form onSubmit={ this.props.onSubmit }>
                <div className="form-block__input-wrapper">
                    <div className="form-group form-group--login">
                        <Input
                            type="text" id="email"
                            label="email"
                            disabled={ this.props.mode === 'register' }
                            onChange={ e => this.handleInputChange('email', e.target.value) }
                            className={ emailError ? 'error' : '' }
                        />
                        <Input
                            type="password"
                            id="password"
                            label="password"
                            disabled={ this.props.mode === 'register' }
                            onChange={ e => this.handleInputChange('password', e.target.value) }
                        />
                    </div>
                    <div className="form-group form-group--register">
                        <Input
                            type="text"
                            id="fullname"
                            label="full name"
                            disabled={ this.props.mode === 'login' }
                            onChange={ e => this.handleInputChange('fullName', e.target.value) }
                            className={ fullNameError ? 'error' : '' }
                        />
                        <Input
                            type="email"
                            id="email"
                            label="email"
                            disabled={ this.props.mode === 'login' }
                            onChange={ e => this.handleInputChange('email', e.target.value) }
                            className={ emailError ? 'error' : '' }
                        />
                        <Input
                            type="password"
                            id="createpassword"
                            label="password"
                            disabled={ this.props.mode === 'login' }
                            onChange={ e => this.handleInputChange('createPassword', e.target.value) }
                        />
                        <Input
                            type="password"
                            id="repeatpassword"
                            label="repeat password"
                            disabled={ this.props.mode === 'login' }
                            onChange={ e => this.handleInputChange('repeatPassword', e.target.value) }
                            className={ repeatPasswordError ? 'error' : '' }
                        />
                    </div>
                </div>
                <button
                    className="button button--primary full-width"
                    type="submit"
                    onClick={ (e) => {
                        if ( this.handleValidation() ) {
                            this.props.onSubmit(e);
                        } else {
                            e.preventDefault();
                        }
                    } }
                >
                    { this.props.mode === 'login' ? 'Log In' : 'Sign Up' }
                </button>
            </form>
        );
    }
}

const Input = ({ id, type, label, name, disabled, value, onChange, className }) => (
    <input
        className={ `form-group__input ${ className || '' }` }
        type={ type }
        id={ id }
        name={ name }
        placeholder={ label }
        disabled={ disabled }
        value={ value }
        onChange={ onChange }
    />
);

export default Login;

