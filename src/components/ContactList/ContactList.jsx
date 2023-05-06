import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import styles from './ContactList.module.css';

export default class Contacts extends Component {
  render() {
    const handleDeleteCard = this.props.handleDeleteCard;

    return (
      <ul className={styles.item}>
        {this.props.contacts.map(i => {
          return (
            <li key={i.id} className={styles.list}>
              {i.name}: {i.number}{' '}
              <Button handleDeleteCard={() => handleDeleteCard(i.id)} />
            </li>
          );
        })}
      </ul>
    );
  }
}

Contacts.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  handleDeleteCard: PropTypes.func,
};