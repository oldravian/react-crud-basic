//import React from "react";
import React from "react";

import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {

  const deleteConactHandler = (id) => {
    props.getContactId(id);
  };

  const editConactHandler = (id) => {
    const foundContact = props.contacts.find(contact => contact.id === id);
    props.editContactHandler(foundContact);
  };
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHander={deleteConactHandler}
        editHandler={editConactHandler}
        key={contact.id}
      />
    );
  });

  return (<div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderContactList}</div>
    </div>);
};

export default ContactList;