import { Component } from "react";
import AddContactFormStyled from "./Addcontactform.styled.";

const INITIAL_STATE = {
        name: '',
        number: ''
    }

export default class AddContactForm extends Component { 
    state = {...INITIAL_STATE}
    
    handelChange = evt => {
        const { name, value } = evt.currentTarget        
        this.setState({[name]: value})
    }

    handelFormSubmit = evt => {
        evt.preventDefault()       
        this.props.onFormSubmit(this.state)
        this.reset()
    }

    reset = () => {
        this.setState({...INITIAL_STATE})
    }
    
    render() {
        const {name, number} = this.state
        return <AddContactFormStyled onSubmit={this.handelFormSubmit}>
        <label>Name
            <input type="text" name="name" value={name} required onChange={this.handelChange} />
        </label>
        <label>Number
            <input type="tel" name="number" value={number} required onChange={this.handelChange} />
        </label>
        <button type="submit">Add contact</button>
        </AddContactFormStyled>      

    }
}