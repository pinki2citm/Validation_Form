import React, { useRef, useState } from "react";
import { isValideForm } from "../utils/validate.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice.js";
import Header from "./Header.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [IsSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Redirect the link
  const toggleSignInForm = () => {
    setIsSignInForm(!IsSignInForm);
  };

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  //validate the form
  const ValidateForm = () => {
    const message = isValideForm(email.current.value, password.current.value);
    seterrorMessage(message);
    if (message === null) {
      //create user profile with email and password
      //sign in/sign up
      if (IsSignInForm) {
        //Sign in logic
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            seterrorMessage(errorCode + errorMessage);
          });
      } else {
        //sign Up Logic
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
            })
              .then(() => {
                // Profile updated!
                const { uid, email } = auth.currentUser;
                //ADD USER to REDUX
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                  })
                );
                navigate("/profile");
              })
              .catch((error) => {
                // An error occurred
                // ...
                seterrorMessage(error.message);
              });
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            seterrorMessage(errorCode + errorMessage);
          });
      }
    } else {
      return;
    }
    console.log(message);
  };
  return (
    <div>
      <Header />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-10 bg-black my-2 mx-auto right-0 left-0 text-white bg-opacity-70"
      >
        <h1 className="font-bold text-3xl py-4">
          {IsSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!IsSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />

        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        {!IsSignInForm && (
          <>
            <label className="p-4 my-4">
              <input type="radio" value="option1" />
              Male
            </label>
            <label>
              <input type="radio" value="option2" />
              Female
            </label>
            <br></br>
            <label>
              <input type="file" className="p-4 my-4 w-full bg-gray-700" />
            </label>
            <div className="p-4 my-4 w-full bg-gray-700">
           
         
              <label> 
                <input type="checkbox" name="fiction" />
                Fiction
              </label>{" "}
              <br />
              <label>
                <input type="checkbox" name="nonFiction" />
                Non-Fiction
              </label>{" "}
              <br />
              <label>
                <input type="checkbox" name="science" />
                Science
              </label>{" "}
              <br />
              <label>
                <input type="checkbox" name="history" />
                History
              </label>{" "}
              <br />
            <label>
              <input type="checkbox" name="fantasy" />
              Fantasy
            </label>{" "}
            <br />
            </div>
            <label>
              Select Country:
              <select className="p-4 my-4 w-full bg-gray-700">
                <option value="">Select a country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Australia">Australia</option>
              </select>
            </label>
          </>
        )}

        <p className="text-3xl">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={ValidateForm}
        >
          {IsSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4" onClick={toggleSignInForm}>
          New to E-learn?
          {IsSignInForm ? "Sign Up Now" : "already registered sign in Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
