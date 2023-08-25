import React from 'react';
import './loginComponent.css';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'login',
            username: '',
            password: '',
            fullName: '',
            email: '',
            createPassword: '',
            repeatPassword: ''
        };
    }

    toggleMode() {
        const newMode = this.state.mode === 'login' ? 'signup' : 'login';
        this.setState({ mode: newMode });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div>
                <div className={ `form-block-wrapper form-block-wrapper--is-${ this.state.mode }` }></div>
                <section className={ `form-block form-block--is-${ this.state.mode }` }>
                    <header className="form-block__header">
                        <h1>{ this.state.mode === 'login' ? 'Welcome back!' : 'Sign up' }</h1>
                        <div className="form-block__toggle-block">
                            <span>{ this.state.mode === 'login' ? 'Don\'t' : 'Already' } have an account? Click here &#8594;</span>
                            <input id="form-toggler" type="checkbox" onClick={ this.toggleMode.bind(this) }/>
                            <label htmlFor="form-toggler"></label>
                        </div>
                    </header>
                    <LoginForm
                        mode={ this.state.mode }
                        onSubmit={ this.props.onSubmit }
                        formData={ this.state }
                        onInputChange={ this.handleInputChange }
                    />
                </section>
            </div>
        );
    }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form onSubmit={ this.props.onSubmit }>
                <div className="form-block__input-wrapper">
                    <div className="form-group form-group--login">
                        <Input
                            type="text" id="username"
                            label="user name"
                            disabled={ this.props.mode === 'signup' }
                            value={ this.props.formData.username }
                            onChange={ this.props.onInputChange }
                        />
                        <Input
                            type="password"
                            id="password"
                            label="password"
                            disabled={ this.props.mode === 'signup' }
                            value={ this.props.formData.password }
                            onChange={ this.props.onInputChange }
                        />
                    </div>
                    <div className="form-group form-group--signup">
                        <Input
                            type="text"
                            id="fullname"
                            label="full name"
                            disabled={ this.props.mode === 'login' }
                            value={ this.props.formData.fullName }
                            onChange={ this.props.onInputChange }
                        />
                        <Input
                            type="email"
                            id="email"
                            label="email"
                            disabled={ this.props.mode === 'login' }
                            value={ this.props.formData.email }
                            onChange={ this.props.onInputChange }
                        />
                        <Input
                            type="password"
                            id="createpassword"
                            label="password"
                            disabled={ this.props.mode === 'login' }
                            value={ this.props.formData.createPassword }
                            onChange={ this.props.onInputChange }
                        />
                        <Input
                            type="password"
                            id="repeatpassword"
                            label="repeat password"
                            disabled={ this.props.mode === 'login' }
                            value={ this.props.formData.repeatPassword }
                            onChange={ this.props.onInputChange }
                        />
                    </div>
                </div>
                <button className="button button--primary full-width"
                        type="submit">{ this.props.mode === 'login' ? 'Log In' : 'Sign Up' }</button>
            </form>
        );
    }
}

const Input = ({ id, type, label, name, disabled, value, onChange }) => (
    <input
        className="form-group__input"
        type={ type }
        id={ id }
        name={ name }
        placeholder={ label }
        disabled={ disabled }
        value={ value }
        onChange={ onChange }
    />
);

export default LoginComponent;

