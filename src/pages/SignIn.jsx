import React, { useState } from "react";
import User from "../components/User";
import { RadioGroup } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../firbase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
const accounts = [
  {
    id: "374ed1e4-481b-4074-a26e-6137657c6e35",
    fullName: "Bilal Gümüş",
    picture: "374ed1e4-481b-4074-a26e-6137657c6e35/1.jpg",
  },
  {
    id: "43332f46-89a4-435c-880e-4d72bb51149a",
    fullName: "Andrew Clark",
    picture: "43332f46-89a4-435c-880e-4d72bb51149a/1.jpg",
  },
  {
    id: "b8476d8d-bd7e-405f-aa66-9a22a9727930",
    fullName: "Amelia Miller",
    picture: "/b8476d8d-bd7e-405f-aa66-9a22a9727930/1.jpg",
  },
  {
    id: "88421e2c-ca7a-4332-815f-6e12824e2d05",
    fullName: "Sophia Smith",
    picture: "/88421e2c-ca7a-4332-815f-6e12824e2d05/1.jpg",
  },
  {
    id: "0c2f5599-9296-4f94-97d5-e773043188ae",
    fullName: "Emily Martinez",
    picture: "/0c2f5599-9296-4f94-97d5-e773043188ae/1.jpg",
  },
];

function SignIn() {
  const [selected, setSelected] = useState(accounts[0]);
  const [customUser, setCustomUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signIn, user,SetPerson } = UserAuth();
  const navigate = useNavigate();
  const [data,setData]=useState();
  const [show,setShow]=useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    try {
      fetchUserData();
      await signIn(email,password);
      // console.log(selected);
      setShow(true)
      // navigate("/sign");
      
    } catch (e) {
      console.log(e.message);
      setErrorMessage(e.message)
    }
  };
  const fetchUserData = async () => {
    try {
      const q = query(
        collection(db, "user"),
        where("user.email", "==", email)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 0) {
        throw new Error("User not found");
      }
      const userData = querySnapshot.docs[0].data();
      // console.log(userData.user.picture);
      const user = {
        id: "custom",
        fullName: userData.user.fullName,
        email: userData.user.email,
        password: userData.user.password,
        type: "CUSTOM",
        picture: userData.user.picture,
      };
      SetPerson(user);
      setCustomUser(user);
      setSelected(user);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }

};
  

  return (
    <div className="h-full flex flex-col items-center justify-center gap-[24px] w-full max-w-[720px] mx-auto">
      {/* <h1 className="text-2xl font-semibold">Select a Dummy User to Log In</h1> */}
      <div className="w-full p-4 text-center">
        <div className="mx-auto w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-2">
              {/* {accounts.map((account) => (
                <User key={account.id} user={account} />
              ))} */}
              <div className="block text-gray-700 text-3xl text-center font-bold mb-7">
                Sign In
              </div>
              <div className="flex flex-col gap-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={show}
                />
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={show}
                />
              </div>
            </div>
          </RadioGroup>
          {errorMessage && (
            <div className="text-red-400 my-2">{errorMessage}</div>
          )}

          {show ? <Link
            // onClick={handleSignIn}
            to={"/sign"}
            state={{ account: selected }}
          
            className="mt-4 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600"
          >
            Prceed to face authentication
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-1.5 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </Link> :<Link
            onClick={handleSignIn}
            className="mt-4 inline-flex mx-4 items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600"
          >
            Sign In
          
          </Link>}
          
          <div className="text-sm text-gray-500 mt-4">
            Dont't have an Account?{" "}
            <Link to={"/user-select"} className="text-blue-700">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
