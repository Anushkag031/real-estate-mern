
import {createContext, useEffect, useState} from 'react';

export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const [currentUser, setCurrentUser] = useState(null);

    // Retrieve user from localStorage on component mount
    useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          console.log('Retrieved user from localStorage:', parsedUser); // Debug log
          setCurrentUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user from localStorage:', error);
        }
      }
    }, []);
  
    // Log currentUser whenever it changes
    useEffect(() => {
      console.log('Current User in Provider:', currentUser); // Debug log
    }, [currentUser]);
  
    // Function to update the user and save to localStorage
    const updatedUser = (data) => {
      setCurrentUser(data);
      console.log('Updated user:', data); // Debug log
    };
  
    // Save currentUser to localStorage whenever it changes
    useEffect(() => {
      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("user");
        console.log('Removing user from localStorage'); // Debug log
      }
    }, [currentUser]);
    return(
        <AuthContext.Provider 
        value={{
            currentUser, updatedUser}}
        >
            {children}
        </AuthContext.Provider>
    )
}