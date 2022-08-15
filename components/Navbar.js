import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.links}>
          <Link href="/">Home</Link>
          {/* <Link href="/users">Users</Link> */}
          {/* <Link href="/addusers">Add Users</Link> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
