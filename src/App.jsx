import React, { useEffect, useState } from "react";
import client from "./api/axios.config";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import {addTodo, setModal} from './store/todoSlice';
import { useReducer } from "react";
 

const App = () => {
  const xTime = new Date().toLocaleTimeString();
  const Seconds = new Date().getSeconds();
  const [time, setTime] = useState(xTime);
  const [second, setSecond] = useState(Seconds);
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);


  const mybtn = useRef();

  const clickIt = () => mybtn.current.click();
  


  const dispatch = useDispatch(); 


  const mytodo = useSelector((state) =>   state.selected.selectedTodo);
  const modalValue = useSelector((state) =>   state.selected.modal);

  const Timer = () => {
    setTime(new Date().toLocaleTimeString());
    setSecond(new Date().getSeconds());
  };

  const getTodos = async () => {
    setLoading(true);
    try {
      const response = await client.get("/todos");
      setData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();  
  }, []);

  setInterval(Timer, 1000);

  const todoModalFunc = (item) => {
    dispatch(addTodo(item));
    dispatch(setModal());
  }



  return (
    <div className="">
      <div className="h-[50vh] w-full bg-gray-50">
        <button ref={mybtn}>ClickMe</button>
      </div>
    
      <div className={second % 2 === 0 ? "bg-green" : "bg-red"}>{time}</div>
      <div className=" max-w-7xl mx-auto pt-8">
        <div className="flex flex-col mx-auto gap-2 w-full max-w-3xl">
          <label htmlFor="search">Search Terms</label>
          <input
            type="text"
            className="px-2 w-full py-1 border rounded pl-2"
            id="search"
            name=""
            placeholder="Search"
          />
        </div>


        <div className="bg-red-400 text-white">
        </div>
        <div className="flex flex-col gap-2 w-full mx-auto max-w-3xl">
          <ul className="flex flex-col gap-2 mt-4">
            {Loading === false ? (
              data.map((item) => <li onClick={() => todoModalFunc(item)} className="flex py-2 px-2 cursor-pointer hover:bg-gray-100 rounded gap-4 items-center" key={item?.id}> <span className={item.completed ? 'px-3 py-2 bg-emerald-50 text-emerald-600' : 'px-3 py-2 bg-rose-50 text-rose-600'}>{item.completed === true ? 'Completed' : 'Not Completed'}</span> <h1> {item?.title}</h1></li>)
            ) : (
              <h1>Loading...</h1>
            )}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default App;
