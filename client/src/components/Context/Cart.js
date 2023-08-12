
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();


const CartProvider = ({ children }) => {
    const [cart, setcart] = useState([]);
    useEffect(() => {
      let existingcartitems = localStorage.getItem("cart");
      if (existingcartitems) {
        setcart(JSON.parse(existingcartitems))
      }
    }, [])
    
    return (
        <CartContext.Provider value={[cart, setcart]}>
            {children} 
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext);
export { useCart, CartProvider }