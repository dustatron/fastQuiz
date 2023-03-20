import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";
import Blocked from "../Blocked";

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    // If user is not logged in, return login component
    if (!firebase.auth().currentUser) {
      return <Blocked />;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
