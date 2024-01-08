import ContactsFilterStyled from "./ContactsFilter.styled"

const ContactsFilter = ({ value, onFilterChange }) => {
    return (
        <ContactsFilterStyled>Find contacts by name
          <input type="text" value={value} onChange={onFilterChange}/>         
        </ContactsFilterStyled>
    )
}

export default ContactsFilter