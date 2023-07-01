import { Link } from 'react-router-dom';
import { auth } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import navstyles from "./Navbar.module.css";
import { useState } from 'react';

const Navbar = () => {

    const [clicked, setClicked] = useState(false);

    const [user] = useAuthState(auth);

    const handleSignOut = async () => {
        await signOut(auth);
    }

    return (
        <div className={navstyles.nav_container}>

            <Link to={"/"} className={navstyles.link}>HOME</Link>
            {
                user ?
                    <div className={navstyles.sign_in_container}>
                        <p className={navstyles.user_name}>{user?.displayName}</p>
                        <img className={navstyles.user_image} src={user?.photoURL || ""} alt="User Profile Image" width={50} height={50} onClick={() => {setClicked((prev) => !prev)}}/>
                        {
                            clicked && <button className={navstyles.btn} onClick={handleSignOut}>Sign Out</button>
                        }
                    </div>
                    :
                    <Link to={"/login"} className={navstyles.link}>LOGIN</Link>
            }

        </div>
    )
}

export default Navbar;