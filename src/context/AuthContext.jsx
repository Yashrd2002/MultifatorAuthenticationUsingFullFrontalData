import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firbase";
// import { auth } from "../firebase";
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [person,SetPerson]=useState();
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async () => {
        await sendEmailVerification(auth.currentUser);
      }
    );
  };


  const logout = () => {
    return signOut(auth);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  const setUpRecaptcha = (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  };


  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,
        googleSignIn,
        setUpRecaptcha,
        SetPerson,
        person
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const UserAuth = () => {
  return useContext(UserContext);
};
export { UserAuth };
