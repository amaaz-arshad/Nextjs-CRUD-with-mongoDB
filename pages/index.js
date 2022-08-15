import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import config from "../utils/config";

export default function Home({ data }) {
  console.log(data);
  const [users, setUsers] = useState(data);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(-1);

  // add user function
  const addUser = (e) => {
    e.preventDefault();
    console.log("add button clicked");
    console.log(name, email, phone);

    axios
      .post(`${config.API_URL}/addUser`, {
        name,
        email,
        phone,
      })
      .then((response) => {
        console.log(response);
        setName("");
        setEmail("");
        setPhone("");
        setUsers([...users, response.data]);
        // alert("User Added successfully");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  // delete user function
  function deleteUser(id, index) {
    axios
      .delete(`${config.API_URL}/deleteUser/${id}`)
      .then((response) => {
        console.log(response);
        const list = [...users];
        list.splice(index, 1);
        setUsers(list);
        setEditMode(false);
        setName("");
        setEmail("");
        setPhone("");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  }

  // update user function
  const updateUser = (e, id) => {
    e.preventDefault();
    console.log("edit button click");
    console.log(id, name, email, phone);
    axios
      .put(`${config.API_URL}/updateUser/${id}`, {
        name,
        email,
        phone,
      })
      .then((response) => {
        console.log(response);
        for (const user of users) {
          if (user._id === editId) {
            user.name = name;
            user.email = email;
            user.phone = phone;
          }
        }
        setEditMode(false);
        setName("");
        setEmail("");
        setPhone("");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };
  return (
    <>
      <div className="container">
        {/* user form */}

        {/* <h4 className="mt-4 text-center">User Form</h4> */}
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

        {/* user table */}

        {/* <h4 className="mt-4 mb-4 text-center">User Data</h4> */}

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
    </>
  );
}

export async function getStaticProps() {
  const response = await axios.get(`${config.API_URL}/getUsers`);
  return {
    props: {
      data: response.data,
    },
  };
}
