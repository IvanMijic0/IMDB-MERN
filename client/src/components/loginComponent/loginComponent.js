import React from 'react';
import './loginComponent.css';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'login',
        };
        this.reset();
    }

    reset() {
        this.state = {
            mode: 'login',
        };
    }

    toggleMode() {
        const newMode = this.state.mode === 'login' ? 'signup' : 'login';
        this.setState({ mode: newMode });
    }

    updateInputValue = (key, value) => {
        this.setState({
            [key]: value
        }, () => {
            this.props.setFormData(this.state);
        });
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
                        updateInputValue={ (key, e) => this.updateInputValue(key, e) }
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
                            onChange={ e => this.props.updateInputValue('username', e.target.value) }
                        />
                        <Input
                            type="password"
                            id="password"
                            label="password"
                            disabled={ this.props.mode === 'signup' }
                            onChange={ e => this.props.updateInputValue('password', e.target.value) }
                        />
                    </div>
                    <div className="form-group form-group--signup">
                        <Input
                            type="text"
                            id="fullname"
                            label="full name"
                            disabled={ this.props.mode === 'login' }
                            onChange={ e => this.props.updateInputValue('fullName', e.target.value) }
                        />
                        <Input
                            type="email"
                            id="email"
                            label="email"
                            disabled={ this.props.mode === 'login' }
                            onChange={ e => this.props.updateInputValue('email', e.target.value) }
                        />
                        <Input
                            type="password"
                            id="createpassword"
                            label="password"
                            disabled={ this.props.mode === 'login' }
                            onChange={ e => this.props.updateInputValue('createPassword', e.target.value) }
                        />
                        <Input
                            type="password"
                            id="repeatpassword"
                            label="repeat password"
                            disabled={ this.props.mode === 'login' }
                            onChange={ e => this.props.updateInputValue('repeatPassword', e.target.value) }
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

