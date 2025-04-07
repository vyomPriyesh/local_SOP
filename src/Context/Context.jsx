import { createContext, useContext, useState } from "react";

const MyContext = createContext(); // ✅ Ensure Context is Created

 const MyProvider = ({ children }) => {
  const [search, setSearch] = useState(null);
  const [selectside, setSelectside] = useState([]);
  const [zipcode, setZipcode] = useState(null);
  const [values, setValues] = useState([25000, 75000]);
  const [state, setState] = useState([]);
  const [county, setCounty] = useState([]);
  const [sorts, setSorts] = useState('');
  return (
    <MyContext.Provider value={{ search, setSearch,selectside,setSelectside,zipcode,setZipcode,values ,setValues,state,setState,county,setCounty,sorts, setSorts}}>
      {children}
    </MyContext.Provider>
  );
};

// ✅ Ensure This Function is AFTER Context Declaration
export const useMyContext = () => {
  return useContext(MyContext);
};

export default MyProvider;
