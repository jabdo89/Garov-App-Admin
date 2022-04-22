import React, { useState, useEffect } from 'react';
import { auth, db } from '@config/firebase';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (authentication) => {
      if (authentication) {
        const userSnapshot = await db()
          .collection('Users')
          .where('userID', '==', authentication.uid)
          .get();

        let userToSet;

        userSnapshot.forEach((doc) => {
          userToSet = doc.data();
        });

        setUser(userToSet);
      } else {
        setUser();
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? {},
        isLogged: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
