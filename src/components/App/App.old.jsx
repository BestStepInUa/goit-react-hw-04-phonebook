import { Component } from "react";
import { nanoid } from 'nanoid'

import AddContactForm from "components/AddContactForm";
import ContactsList from "components/ContactsList";
import ContactsFilter from "components/ContactsFilter";

import AppContainer from "./App.styled";

export default class App extends Component {
  state = {
    contacts: [],
    filter: ''  
  }

  componentDidMount() { 
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
    }
   }
  
  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }           
  }

  handleAddContactFormSubmit = ({ name, number }) => {
    const contact = { id: nanoid(), name, number }
    const { contacts } = this.state
    const isDublicated = contacts.find(contact => contact.name === name)
    if (isDublicated) {
      alert(`${name} is already in contacts.`)
      return
    }
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact]
    }))
  }

  handleContactsFilter = evt => {        
    this.setState({filter: evt.currentTarget.value})
  }

  getVisibleContacts = () => {
    const { contacts, filter } = this.state
    const normalizedFilter = filter.toLocaleLowerCase()
    return contacts.filter(({name}) => name.toLocaleLowerCase().includes(normalizedFilter))
  }

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts.filter(contact => contact.id !== id)]      
    }))

  }

  render() {
    const { filter } = this.state
    const visibleContacts = this.getVisibleContacts()
    
    return (
      <AppContainer>
        <h1>Phonebook</h1>
        <AddContactForm onFormSubmit={this.handleAddContactFormSubmit} />
        <ContactsFilter value={filter} onFilterChange={this.handleContactsFilter} />
        <ContactsList contacts={visibleContacts} deleteContact={this.deleteContact} />
    </AppContainer>
    )
  }
}