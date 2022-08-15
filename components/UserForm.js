import React from "react";
import styles from "../styles/Home.module.css";

export default function UserForm({
  addUser,
  updateUser,
  name,
  email,
  phone,
  setName,
  setEmail,
  setPhone,
  editId,
  editMode,
}) {
  return (
    <div>
      {/* user form */}
      <form className={styles.formstyle}>
        <input
          className="form-control"
          type="text"
          placeholder="Enter user name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          className="form-control"
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          className="form-control"
          type="number"
          placeholder="Enter user phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br />
        {editMode ? (
          <button
            onClick={(e) => updateUser(e, editId)}
            className="form-control btn btn-secondary"
          >
            Edit
          </button>
        ) : (
          <button onClick={addUser} className="form-control btn btn-primary">
            Add
          </button>
        )}
      </form>
    </div>
  );
}
