import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import config from "../utils/config";
import UsersList from "../components/UsersList";
import UserForm from "../components/UserForm";

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
        <UserForm
          addUser={addUser}
          updateUser={updateUser}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
          name={name}
          email={email}
          phone={phone}
          editMode={editMode}
          editId={editId}
        />

        <UsersList
          users={users}
          deleteUser={deleteUser}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
          setEditId={setEditId}
          setEditMode={setEditMode}
        />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const response = await axios.get(`${config.API_URL}/getUsers`);
  return {
    props: {
      data: response.data,
    },
  };
}
