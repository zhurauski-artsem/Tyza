import React, { ReactNode, useState } from "react";

import { AuthenticateDataFragment } from "generated/graphql";

type Props = {
  children: ReactNode;
};

export const AuthContext = React.createContext<{
  isAdmin: boolean;
  authData?: AuthenticateDataFragment;
  setAuthData: (authData: AuthenticateDataFragment) => void;
}>({
  isAdmin: false,
  authData: undefined,
  setAuthData: () => {},
});

const AuthProvider = ({ children }: Props) => {
  const [authData, setAuthData] = useState<
    AuthenticateDataFragment | undefined
  >(undefined);

  const authSessionLogin = sessionStorage.getItem("login");

  if (authSessionLogin && !authData) {
    const authDataSession = JSON.parse(authSessionLogin);
    if ("accessToken" in authDataSession) {
      setAuthData(authDataSession);
    }
  }

  const isAdmin = !!authData?.authorities.includes("ROLE_ADMIN");

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        authData,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
