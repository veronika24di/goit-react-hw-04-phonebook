import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  hendleChange = event => {
    const { name, value, number } = event.currentTarget;
    this.setState({ [name]: value });
    this.setState({ [number]: value });
  };

  hendleSubmitForm = event => {
    event.preventDefault();
    this.setState({ id: nanoid(), name: this.state.name });

    const { hendleAddContact } = this.props;

    hendleAddContact({
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    });

    this.hendelReset();
  };

  hendelReset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.hendleSubmitForm}>
        <label className={styles.label}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.hendleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.hendleChange}
            className={styles.input}
          />
        </label>

        <button type="submit" className={styles.button}>
          Add contacts
        </button>
      </form>
    );
  }
}
