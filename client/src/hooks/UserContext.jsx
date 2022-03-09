import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import FullLoading from "../elements/FullScreenLoading";
import { auth, db } from "../fbconfig";

const AuthContext = createContext({
  login: () => { },
  signup: () => { },
  currentUser: {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [currentUser, setcurrentUser] = useState(null);
  const [additionalUserInfo, setadditionalUserInfo] = useState(null);
  const [loading, setloading] = useState(true);
  const login = async ({ email, password }) => {
    try {

      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
          return { err: false };
        })
    } catch (error) {

      return { err: true, ...error };
    }


  };
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        let data = await getDoc(doc(db, "users", user.uid));
        if (data.exists()) {
          setcurrentUser(user);
          setadditionalUserInfo({ ...data?.data() });
          setisLoggedIn(true);
          setloading(false);
        }
        // ...
      } else {
        // User is signed out
        setisLoggedIn(false);
        setcurrentUser(null);
        setloading(false);

        // ...
      }
    });
  }, []);

  const signup = async ({ email, password, name }) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;


        await setDoc(doc(db, "users", user.uid), {
          name: name,
          type: "admin",
          email: email,
          status: 'inactive',
          storeID: '',
        });

        setadditionalUserInfo({
          name: name,
          type: "admin",
          email: email,
          status: 'inactive',
          storeID: '',
        });
        return {
          err: false,
        };
        // ...
      })
      .catch((error) => {
        console.log("err", error);
        return {
          err: true,
          ...error,
        };
        // ..
      });
  };
  const updateLocalUserInfo = (data) => {
    setadditionalUserInfo({ ...additionalUserInfo, ...data })
  }
  const updateUser = async (value) => {
    return setDoc(doc(db, 'users', auth.currentUser.uid), value, { merge: true }).then(() => {
      updateLocalUserInfo(value)

      return { err: false }
    }).catch(err => { return { err: true } })
  }
  const logout = () => {
    signOut(auth);
  };
  if (loading) {
    return <FullLoading />;
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, signup, logout, currentUser, additionalUserInfo, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { signup, login, isLoggedIn, logout, currentUser, additionalUserInfo, updateLocalUserInfo, updateUser
  } =
    useContext(AuthContext);

  return { signup, login, isLoggedIn, logout, currentUser, additionalUserInfo, updateLocalUserInfo, updateUser };
};
