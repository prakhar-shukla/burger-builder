import React from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import { tryPurchase } from '../../../redux/actions'

class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                valid: false,
                touched: false,
                validations: {
                    required: true
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    name: 'street',
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                valid: false,
                touched: false,
                validations: {
                    required: true
                }
            },
            pinCode: {
                elementType: 'input',
                elementConfig: {
                    name: 'pinCode',
                    type: 'text',
                    placeholder: 'Pin Code'
                },
                value: '',
                valid: false,
                touched: false,
                validations: {
                    required: true,
                    minLength: 5,
                    maxLength: 8
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    name: 'country',
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                valid: false,
                touched: false,
                validations: {
                    required: true
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                valid: false,
                touched: false,
                validations: {
                    required: true
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    name: 'deliveryMethod',
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                valid: true,
                touched: false,
                validations: {
                    required: true
                }
            }
        },
        formValid: false,
    }

    inputChangeHandler = (event) => {
        const updatedForm = { ...this.state.orderForm }
        const updatedElement = { ...updatedForm[event.target.name] };
        updatedElement.value = event.target.value;
        updatedElement.touched = true;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validations);
        updatedForm[event.target.name] = updatedElement;
        const formValid = Object.keys(updatedForm).every(entry => {
            return updatedForm[entry].valid
        })
        this.setState({ orderForm: updatedForm, formValid: formValid });
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

    submitOrderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let id in this.state.orderForm) {
            formData[id] = this.state.orderForm[id].value
        }
        const order = {
            ingredients: this.props.burger.ingredients,
            price: this.props.burger.price,
            orderData: formData,
            userId: this.props.auth.authState.localId
        }


        this.props.tryPurchase(order);
    }


    render() {
        const formInputs = Object.keys(this.state.orderForm).map((entry, i) => {
            return <Input key={entry}
                elementType={this.state.orderForm[entry].elementType}
                elementConfig={this.state.orderForm[entry].elementConfig}
                value={this.state.orderForm[entry].value}
                changeHandler={this.inputChangeHandler}
                valid={this.state.orderForm[entry].valid}
                touched={this.state.orderForm[entry].touched} />
        })
        return (
            this.props.purchase.loading ? <Spinner /> : <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form onSubmit={this.submitOrderHandler}>
                    {formInputs}
                    <Button btnType="Success" disabled={!this.state.formValid} >Order</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        burger: state.burger,
        purchase: state.purchase,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { tryPurchase })(ContactData)