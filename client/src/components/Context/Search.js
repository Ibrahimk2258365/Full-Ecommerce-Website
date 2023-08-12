
import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();


const SearchProvider = ({ children }) => {
    const [value, setValue] = useState({
       keywords:"",
       results:[]
    });
    
    return (
        <SearchContext.Provider value={[value, setValue]}>
            {children}
        </SearchContext.Provider>
    )
}

const useSearch = () => useContext(SearchContext);
export { useSearch, SearchProvider }


// import React, {createContext, useContext, useState } from 'react'

// const AuthContext = createContext();



// const AuthProvider  = ({children})=>{
//     const [auth, setAuth] = useState({
//         user:null,
//         token:""
//     })
//     return(
//         <AuthContext.Provider value={[auth,setAuth]}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
// //custom hook
// const useAuth = ()=>useContext(AuthContext);
// export {useAuth,AuthProvider}