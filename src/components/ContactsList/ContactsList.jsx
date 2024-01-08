import ContactItem from "./ContactItem";

import ContactsListSteled from "./ContactsList.styled";

const ContactsList = ({contacts, deleteContact}) => {    
        return (
            <ContactsListSteled>
            <h2>Contacts</h2>
            <ul>
                {contacts.map(contact => (
                    <ContactItem key={contact.id} contact={contact} deleteContact={deleteContact} />         
                ))}     
            </ul>
            </ContactsListSteled>    
        )
}

export default ContactsList