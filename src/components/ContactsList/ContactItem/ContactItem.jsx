import ContactItemStyled from "./ContactItem.styled"

const ContactItem = ({ contact: { id, name, number }, deleteContact }) => {
    return (
        <ContactItemStyled>
            <p>{name}: <span>{number}</span></p>
            <button onClick={() => deleteContact(id)}>Delete</button>
        </ContactItemStyled> )
}

export default ContactItem