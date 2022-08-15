import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import config from "../utils/config";

const addusers = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const router = useRouter();

  // add user function
  const addUser = (e) => {
    e.preventDefault();
    console.log("add button clicked");
    console.log(user);

    axios
      .post(`${config.API_URL}/addUser`, user)
      .then((response) => {
        console.log(response);
        router.push("users");
        // setUser({
        //   name: "",
        //   email: "",
        //   phone: "",
        // });
        // alert("data added succesfully");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <form className={styles.formstyle}>
        <input
          className="form-control"
          type="text"
          placeholder="Enter user name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <br />
        <input
          className="form-control"
          type="email"
          placeholder="Enter user email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <br />
        <input
          className="form-control"
          type="number"
          placeholder="Enter user phone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          required
        />
        <br />
        <button onClick={addUser} className="form-control btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default addusers;
