import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { db } from "../../firebase";
import uid from "uid";
const Register = ({ user, setUser }) => {
  const [displayName, setDisplaceName] = useState("");
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const onRegister = async (type) => {
    if (userid && password) {
      const docRef = await db.collection("users").add({
        userid,
        password,
        email,
        displayName,
      });
      const doc = await docRef.get();
      const userRef = await db.collection(`users/${doc.id}/pens`).add({
        name: "Demo Pen",
        code: {
          html: "",
          css: "",
          js: "",
        },
      });
      const pens = await userRef.get();
      setUser({
        id: doc.id,
        ...doc.data(),
        pens: [
          {
            id: pens.id,
            ...pens.data(),
          },
        ],
      });
      console.log(pens.data());
      history.push("/");
    }
  };
  const history = useHistory();
  useEffect(() => {
    if (user.userid) {
      history.push("/");
    }
  });
  return (
    <div className="">
      <label
        htmlFor="register-displaceName"
        className="register__displaceName--label"
      >
        <input
          type="text"
          name="displaceName"
          id="register-displaceName"
          placeholder="Displace Name"
          className="register__displaceName"
          required
          onChange={(e) => setDisplaceName(e.target.value)}
        />
      </label>
      <label htmlFor="regiser-userid" className="register__userid--label">
        <input
          type="text"
          name="userid"
          id="regiser-userid"
          className="register__userid"
          placeholder="Userid"
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </label>
      <label htmlFor="register-password" className="register__password--label">
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="Password"
          className="register__password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label htmlFor="register-email" className="register__email--label">
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="register-email"
          className="register__email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button className="submit" type="submit" onClick={onRegister}>
        Register
      </button>
      <Link to={`/signin`}>already have a account?</Link>
    </div>
  );
};

export default Register;
