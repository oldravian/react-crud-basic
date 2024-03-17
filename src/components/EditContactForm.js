import React, { useRef, useState, useEffect, useImperativeHandle, } from "react";
//import user from "../images/user.png";

//const EditContactForm = (props, ref) => {
const EditContactForm = React.forwardRef((props, ref) => {
  const contact = props.contact;
  const formRef = useRef(null);

  useImperativeHandle(ref, () => ({
    showForm() {
      formRef.current.style.display = "block";
    },
  }));

  const [formData, setFormData] = useState({
    id:    contact ? contact.id : "",
    name:  contact ? contact.name : "",
    email: contact ? contact.email : "",
  });


  // Update the formData state when the contact prop changes
  useEffect(() => {
    setFormData({
      id: contact ? contact.id : "",
      name: contact ? contact.name : "",
      email: contact ? contact.email : "",
    });
  }, [contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateContactHandler(formData);
    hideForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const hideForm = () => {
    formRef.current.style.display = "none";
  };

  return (
    <div style={{ display: "none" }} ref={formRef} className="ui main">
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="ui button blue">Update</button>
      </form>
    </div>
  );
});

export default EditContactForm;
