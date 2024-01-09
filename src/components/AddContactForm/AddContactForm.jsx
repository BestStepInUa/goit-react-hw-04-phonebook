import { useReducer } from 'react';
import AddContactFormStyled from './Addcontactform.styled.';

const INITIAL_STATE = {
  name: '',
  number: '',
};

function reducer(prevState, action) {
  if (action.type === 'reset') {
    return INITIAL_STATE;
  } else {
    return {
      ...prevState,
      [action.type]: action.payload,
    };
  }
}

const AddContactForm = ({ onFormSubmit }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handelChange = evt => {
    const { name, value } = evt.currentTarget;
    dispatch({ type: name, payload: value });
  };

  const handelFormSubmit = evt => {
    evt.preventDefault();
    onFormSubmit(state);
    reset();
  };

  const reset = () => {
    dispatch({ type: 'reset', payload: INITIAL_STATE });
  };

  return (
    <AddContactFormStyled onSubmit={handelFormSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={state.name}
          required
          onChange={handelChange}
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          value={state.number}
          required
          onChange={handelChange}
        />
      </label>
      <button type="submit">Add contact</button>
    </AddContactFormStyled>
  );
};

export default AddContactForm;
