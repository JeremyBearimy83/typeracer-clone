import React, { ReactElement, useState, FormEvent, useEffect } from "react";

import useInputState from "../../hooks/useInputState";

import { useAuth } from "../../context/AuthContext";

import { IUser } from "../../utils/types";

import { gql, useQuery } from "@apollo/client";
import Snackbar from "../utils/Snackbar";

// const TEST_QUERY = gql`
//   {
//     greetingAnonymous
//   }
// `;

interface Props {}

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default function Auth({}: Props): ReactElement {
  //DUMMY QUERY TO TEST GRAPHQL
  //   useEffect(() => {
  //     fetch("http://localhost:8000/graphql", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         query: `
  //         query {
  //           greetingAnonymous
  //           {
  //            message
  //             success
  //           }
  //         }`,
  //       }),
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .catch((err) => console.log({ err }))
  //       .then((res) => {
  //         console.log({ res });
  //       });
  //   }, []);
  const [login, setLogin] = useState(true);

  const switchPage = () => {
    setLogin((prev) => !prev);
  };

  // const everything: any = useQuery(TEST_QUERY);

  return (
    <div className="auth">
      <main>
        {login ? (
          <SignIn switchPage={switchPage} />
        ) : (
          <Register switchPage={switchPage} />
        )}
      </main>
    </div>
  );
}

function SignIn({ switchPage }: { switchPage: () => void }): ReactElement {
  const [errors, setErrors] = useState<string[]>([]);

  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);

  const [authToken, setAuthToken] = useState("");

  const [email, setEmail, resetEmail] = useInputState();
  const [pass, setPass, resetPass] = useInputState();

  const AuthContext = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!email) errors.push("Email is Required");
    else if (!validateEmail(email)) errors.push("Invalid Email ID");
    if (!pass) errors.push("Password is Required");

    if (errors.length === 0) {
    } else {
      resetEmail();
      resetPass();
      setErrors(errors);
    }

    const query = `mutation ($email: String!, $pass: String!) {
      userLogIn(email:$email, password: $pass)
          {
            message,
            success
          }
    }`;

    //GRAPHQL LOGIC

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
        variables: { email, pass },
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log({ err }))
      .then((res) => {
        console.log(res.message);
        if (res.success) {
          setAuthToken(res.message);
          const signedInUser: IUser = {
            authToken: res.message,
            username: res.username,
            id: res.id,
          };
          AuthContext?.setCurrentUser(signedInUser);
          startTimer();
        }
      });
  };

  const startTimer = () => {
    setShowSnackBar(true);
    setTimeout(() => setShowSnackBar(false), 5000);
  };

  const query2 = `query{
    greeting
        {
          message,
          success
        }
  }`;

  // const loginChecker = () => {
  //   fetch("http://localhost:8000/graphql", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", "auth-token": authToken },
  //     body: JSON.stringify({
  //       query: query2,
  //     }),
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .catch((err) => console.log({ err }))
  //     .then((res) => {
  //       console.log({ res });
  //     });
  // };

  return (
    <React.Fragment>
      {/* <button onClick={loginChecker}>Are you logged in</button> */}
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {errors.map((err) => {
          return <div className="error">{err}</div>;
        })}
        <div className="input">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={setEmail}
            id="email"
            type="text"
            placeholder="Johndoe@gmail.com"
          />
        </div>
        <div className="input">
          <label htmlFor="pass">Password</label>
          <input
            value={pass}
            onChange={setPass}
            id="pass"
            type="password"
            placeholder="••••••••••"
          />
        </div>

        <div className="outh outh--google">
          <i className="fab fa-google"></i>
          Continue with Google
        </div>
        <div className="outh outh--discord">
          <i className="fab fa-discord"></i>
          Continue with Discord
        </div>
        <button>Submit</button>
      </form>
      <span>
        Don't have an account? <span onClick={switchPage}>Register</span>{" "}
      </span>
      {showSnackBar && <Snackbar />}
      {/* <Snackbar /> */}
    </React.Fragment>
  );
}

function Register({ switchPage }: { switchPage: () => void }): ReactElement {
  const [errors, setErrors] = useState<string[]>([]);

  const [username, setUsername, resetUsername] = useInputState();
  const [email, setEmail, resetEmail] = useInputState();
  const [pass, setPass, resetPass] = useInputState();
  const [confirmPass, setConfirmPass, resetConfirmPass] = useInputState();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!username) errors.push("Username is Required");
    if (!email) errors.push("Email is Required");
    else if (!validateEmail(email)) errors.push("Invalid Email ID");
    if (!pass) errors.push("Password is Required");
    else if (pass !== confirmPass) errors.push("Passwords do not match");

    if (errors.length === 0) {
    } else {
      resetEmail();
      resetPass();
      resetConfirmPass();
      setErrors(errors);
    }

    //GRAPHQL LOGIC

    const query = `mutation ($email: String!, $pass: String!, $username: String!) {
      userSignUp(username:$username, password: $pass, email:$email)
          {
            message,
            success
          }
    }`;

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
        variables: { email, pass, username },
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log({ err }))
      .then((res) => {
        console.log({ res });
      });
  };

  return (
    <React.Fragment>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {errors.map((err) => {
          return <div className="error">{err}</div>;
        })}
        <div className="input">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={setUsername}
            id="username"
            type="text"
            placeholder="JohnDoe"
          />
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={setEmail}
            id="email"
            type="text"
            placeholder="Johndoe@gmail.com"
          />
        </div>
        <div className="input">
          <label htmlFor="pass">Password</label>
          <input
            value={pass}
            onChange={setPass}
            id="pass"
            type="password"
            placeholder="••••••••••"
          />
        </div>
        <div className="input">
          <label htmlFor="cpass">Confirm Password</label>
          <input
            value={confirmPass}
            onChange={setConfirmPass}
            id="cpass"
            type="password"
            placeholder="••••••••••"
          />
        </div>

        <button>Submit</button>
      </form>
      <span>
        Already have an account? <span onClick={switchPage}>Sign In</span>{" "}
      </span>
    </React.Fragment>
  );
}
