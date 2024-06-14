import React, { useContext, useState } from "react";
import { createUser } from "./api";
import { AuthContext } from "./context";
import { Link, useNavigate } from "react-router-dom";
import "./App.css"; // Import the CSS file

const CreateNewUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState(""); // New state variable for bio
  const [image, setImage] = useState(""); // New state variable for image
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      console.log("SUBMIT: ", auth.accessToken, username, password, firstName, lastName, bio, image);
      await createUser({ username, password, firstName, lastName, bio, image, auth }); // Pass bio and image to createUser function
      navigate('/Login')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new-user-container">
      <h1>Create New User</h1>
      <div className="input-group">
        <label htmlFor="new-username">Username:</label>
        <input
          type="text"
          id="new-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="new-password">Password:</label>
        <input
          type="password"
          id="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="new-firstname">First Name:</label>
        <input
          type="text"
          id="new-firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="new-lastname">Last Name:</label>
        <input
          type="text"
          id="new-lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="new-bio">Bio:</label> {/* Add input field for bio */}
        <input
          type="text"
          id="new-bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="new-image">Change Image:</label>
        <input
          type="file"
          id="new-image"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
        />
      </div>

      <div>
        <button className="btn-submit" onClick={submit}>Create Account</button>
        <button className="btn-secondary"><Link to='/login'>Already have an account?</Link></button>
      </div>
    </div>
  );
};

export default CreateNewUser;
