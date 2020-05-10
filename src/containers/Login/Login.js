import React from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Login.module.css'
import { authorize } from '../../redux/actions'
import { connect } from 'react-redux'

class Login extends React.Component {

    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Your Email Address'
                },
                value: '',
                valid: false,
                touched: false,
                validations: {
                    required: true
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                valid: false,
                touched: false,
                validations: {
                    required: true,
                    minLength: 6
                }
            }
        },
        formValid: false,
        isSignUp: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }


    inputChangeHandler = (event) => {
        const updatedForm = { ...this.state.authForm }
        const updatedElement = { ...updatedForm[event.target.name] };
        updatedElement.value = event.target.value;
        updatedElement.touched = true;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validations);
        updatedForm[event.target.name] = updatedElement;
        const formValid = Object.keys(updatedForm).every(entry => {
            return updatedForm[entry].valid
        })
        this.setState({ authForm: updatedForm, formValid: formValid });
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        this.props.authorize(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);

        console.log("Login Form", this.state.authForm)

    }

    switchLoginMode = (event) => {
        event.preventDefault();
        this.setState((state) => {
            return {
                isSignUp: !state.isSignUp
            }
        })
    }

    componentDidUpdate() {
        if (this.props.burger.purchasable && this.props.auth.authenticated) {
            this.props.history.push('/checkout');
        }
        else if (this.props.auth.authenticated) {
            this.props.history.push('/');
        }
    }

    render() {

        const formInputs = Object.keys(this.state.authForm).map((entry, i) => {
            return <Input key={entry}
                elementType={this.state.authForm[entry].elementType}
                elementConfig={this.state.authForm[entry].elementConfig}
                value={this.state.authForm[entry].value}
                changeHandler={this.inputChangeHandler}
                valid={this.state.authForm[entry].valid}
                touched={this.state.authForm[entry].touched} />
        })

        return (
            this.props.auth.loading ? <Spinner /> :
                <div className={classes.ContactData}>
                    <h4>Enter your Contact Data</h4>
                    <form onSubmit={this.submitFormHandler}>
                        {formInputs}
                        <Button btnType="Success" disabled={!this.state.formValid} >Submit</Button>
                    </form>
                    <Button clicked={this.switchLoginMode} btnType="Success" >{this.state.isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}</Button>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        burger: state.burger
    }
}

export default connect(mapStateToProps, { authorize })(Login)
