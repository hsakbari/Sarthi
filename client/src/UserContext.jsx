import axios from "axios";
import {createContext, useEffect, useState} from "react";

export const UserContext=createContext({});

export function UserContextProvider({children}){
    const[user, setUser]=useState(null);
    const [ready,setReady]=useState(false);
    useEffect(()=>{
        if(!user)
        {
            axios.get('/profile').then((response) => {
                const userData = response.data; // Extract user data from the response
                setUser(userData);
                setReady(true);
            });
            
        }
    }, []);
    return(
        <UserContext.Provider value={{ user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    );
}