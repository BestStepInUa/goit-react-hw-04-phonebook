import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

import AddContactForm from 'components/AddContactForm';
import ContactsList from 'components/ContactsList';
import ContactsFilter from 'components/ContactsFilter';

import AppContainer from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // componentDidMount - Забираємо список контактів з LS, якщо вони там наявні
  useEffect(() => {
    const localStorageContacts = localStorage.getItem('contacts');
    if (localStorageContacts) {
      setContacts(JSON.parse(localStorageContacts));
    }
  }, []);

  // componentDidUpdate - Записуємо оновлений список контактів в LS при його зміні
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContactFormSubmit = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };
    const isDublicated = contacts.find(contact => contact.name === name);
    if (isDublicated) {
      toast.error(`${name} is already in contacts.`);
      return;
    }
    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const handleContactsFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const deleteContact = id => {
    setContacts(prevContacts => [
      ...prevContacts.filter(contact => contact.id !== id),
    ]);
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <AppContainer>
      <h1>Phonebook</h1>
      <AddContactForm onFormSubmit={handleAddContactFormSubmit} />
      <ContactsFilter value={filter} onFilterChange={handleContactsFilter} />
      <ContactsList
        contacts={visibleContacts()}
        deleteContact={deleteContact}
      />
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </AppContainer>
  );
};

export default App;
