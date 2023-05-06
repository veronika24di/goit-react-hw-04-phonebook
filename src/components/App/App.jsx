import { Component } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import Contacts from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import styles from './App.module.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  hendleAddContact = contact => {
    if (this.state.contacts.some(({ name }) => name === contact.name)) {
      alert(`${contact.name} is already in contacts!`);
      return;
    }
    this.setState(prev => ({ contacts: [...prev.contacts, contact] }));
  };

  hendleFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  handleDeleteCard = id => {
     this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

   componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const optimizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(optimizedFilter)
    );
    // console.log(this.state.contacts);
    return (
      <div className={styles.wrapper}>
        <div className={styles.formWrapper}>
          <h1>Phonebook</h1>
          <ContactForm hendleAddContact={this.hendleAddContact} />

          <h2>Contacts</h2>
          <Filter filter={this.state.filter} onFilter={this.hendleFilter} />

          <Contacts
            contacts={filteredContacts}
            handleDeleteCard={this.handleDeleteCard}
          />
        </div>
      </div>
    );
  }
}