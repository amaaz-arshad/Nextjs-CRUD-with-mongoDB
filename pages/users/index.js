import styles from "../../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import config from "../../utils/config";
import { useRouter } from "next/router";

export default function Users({ data }) {
  console.log(data);
  const router = useRouter();

  // delete user function
  function deleteUser(id) {
    axios
      .delete(`${config.API_URL}/deleteUser/${id}`)
      .then((response) => {
        console.log(response);
        router.push("users");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  }

  return (
    <>
      <div className="container">
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
            {data.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm me-2"
                    onClick={() => {
                      router.push(`users/${user._id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user._id)}
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

export async function getServerSideProps() {
  const response = await axios.get(`${config.API_URL}/getUsers`);
  return {
    props: {
      data: response.data,
    },
  };
}
