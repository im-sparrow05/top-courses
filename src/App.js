import React from "react";
import Navbar from "./Components/Navbar";
import Filter from "./Components/Filter";
import Cards from "./Components/Cards";
import Spinner from "./Components/Spinner";
import { apiUrl, filterData } from "./data.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const App = () => {
  const [courses,setCourses] = useState([]);
  const [loading,setLoading] = useState(true);
  const [category,setCategory] = useState('All');
  useEffect(()=>{
    const fetchData = async() => {
      try{
        const res = await fetch(apiUrl);
        const output = await res.json();
        // save data into variable
        setCourses(output.data);

      }catch{
        toast.error("Network me koi dikkat hai");
      }
      setLoading(false);
    }
    fetchData();
  },[])
  return (
    <div className="flex min-h-screen flex-col bg-bgDark2">
      <div>
      <Navbar />
      </div>
      <div className="bg-bgDark2">
      <div>
      <Filter 
      filterData={filterData}
      category= {category}
      setCategory={setCategory}
      />
      </div>
      <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
      {loading ? (<Spinner/>): (<Cards courses={courses} category={category}/>)}
      </div>
      </div>
    </div>
  );
};

export default App;
