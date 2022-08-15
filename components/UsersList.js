import React, { useState } from "react";
// import axios from "axios";

const UsersList = ({
  users,
  deleteUser,
  setName,
  setEmail,
  setPhone,
  setEditId,
  setEditMode,
}) => {
  return (
    <div>
      {/* user table */}
      <table className="mt-5 table">
        <thead className="">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => {
                    setEditMode(true);
                    setName(user.name);
                    setEmail(user.email);
                    setPhone(user.phone);
                    setEditId(user._id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(user._id, index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
