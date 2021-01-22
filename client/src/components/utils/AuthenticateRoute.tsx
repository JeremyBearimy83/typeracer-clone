import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Route, Redirect } from "react-router-dom";
import Play from "../pages/Play";

//RIGHT NOW I AM JUST CHECKING IF USER IN THE CONTEXT IS PRESENT OR NOT AND
// BASED ON THAT I AM AUTHENTICATEING, BUT I THINK I HAVE TO CHECK WITH THE
//IS LOGGED IN ROUTE WITH THE BACKEND ELSE WHAT'S THE POINT OF JWT
//BUT AGAIN WHY DO I HAVE TO DO THAT
//ALSO BACKEND ROUTES SHOULD ALSO BE PROTECTED I GUESS

interface IProps {
  Component: React.FC;
  props?: any;
  path: string;
}

// export default function Home({}: Props): ReactElement

function AuthenticatedRoute({ Component, path }: IProps) {
  const User = useAuth()?.currentUser;

  return (
    <Route
      path={path}
      render={() => (User ? <Component /> : <Redirect to="/" />)}
    />
  );
}

export default AuthenticatedRoute;
