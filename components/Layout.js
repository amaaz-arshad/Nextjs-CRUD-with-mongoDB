import Navbar from "./Navbar";
import Head from "next/head";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Nextjs CRUD</title>
        {/* <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Navbar /> <div> {children} </div>
    </>
  );
};

export default Layout;
