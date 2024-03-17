import React, { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import EditContactForm from "./EditContactForm";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ContactDetail from "./ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const updateContactHandler = (updatedContact) => {
    //update updatedContact in contacts
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === updatedContact.id) {
        return updatedContact;
      }
      return contact;
    });

    setContacts(updatedContacts);
  };


  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const editFormRef = useRef();
  const [selectedContactForEdit, setSelectedContact] = useState(null);

  const editContactHandler = (foundContact) => {
    setSelectedContact(foundContact);
    // Show edit form
    showEditForm();
  };

    const showEditForm = () => {
     editFormRef.current.showForm();
   };

  return (
  <div className="ui container">
      <BrowserRouter>
        <Header />
        <EditContactForm ref={editFormRef} contact={selectedContactForEdit} updateContactHandler={updateContactHandler} />

        <Switch>
          
          <Route
            path="/add"
            
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />

          <Route path="/contact/:id" component={ContactDetail } />

          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler} editContactHandler={editContactHandler}
              />
            )}
          />
        </Switch>
        </BrowserRouter>

    </div>
    // <div className="ui container">
    //   <Header />
    //   <AddContact addContactHandler={addContactHandler} />
    //   <EditContactForm ref={editFormRef} contact={selectedContactForEdit} updateContactHandler={updateContactHandler} />
    //   <ContactList contacts={contacts} getContactId={removeContactHandler} editContactHandler={editContactHandler} />
    // </div>
  );
}

export default App;