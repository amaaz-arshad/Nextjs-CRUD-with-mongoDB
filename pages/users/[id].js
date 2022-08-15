import styles from "../../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import config from "../../utils/config";
import { useRouter } from "next/router";
import Link from "next/link";

export default function UpdateUser({ data }) {
  console.log(data);
  const [user, setUser] = useState({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });
  const router = useRouter();

  // update user function
  const updateUser = (e) => {
    e.preventDefault();
    console.log("edit button click");
    console.log(user);
    axios
      .put(`${config.API_URL}/updateUser/${data._id}`, user)
      .then((response) => {
        console.log(response);
        router.back();
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
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
        <div style={{ display: "flex" }}>
          <button
            className="form-control btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            {/* <Link href="/users"> */}
            Cancel
            {/* </Link> */}
          </button>
          <button
            onClick={updateUser}
            className="form-control btn btn-secondary"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  const response = await axios.get(
    `${config.API_URL}/getUserById/${params.id}`
  );
  return {
    props: {
      data: response.data,
    },
  };
}
