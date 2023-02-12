import './App.css';
import MoreIcon from './assets/more.svg';
import AddIcon from './assets/add.svg';
import CheckboxIcon from './assets/checkbox.svg';
import CheckIcon from './assets/check.svg';
import UncheckIcon from './assets/uncheck.svg';
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import config from "./config.json";
import { format } from 'date-fns'

function App() {
  const BASE_URL = config.baseUrl.dev;
  const [list, setList] = useState([]);
  const [add, setAdd] = useState(false);
  const [more, setMore] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const [childMore, setChildMore] = useState(list && list.map(() => { return false }));
  const [editList, setEditList] = useState(list && list.map(() => { return false }));
  const [newData, setNewData] = useState("");
  const [newDataError, setNewDataError] = useState(false);

  let refMore = useRef(null);
  let refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside, true)
  //   document.removeEventListener("click", handleClickOutside, true)
  // }, []);

  const handleClickOutside = (e) => {
    refs.filter((refs, index) => {
      if (refs.current && !refs.current.contains(e.target)) {
        const x = [...childMore];
        x[index] = false;
        setChildMore(x);
      }
    })
    if (refMore && !refMore.current.contains(e.target)) setMore(false);
  }

  const fetchData = () => {
    // MySQL database - GET
    // axios.get("http://localhost:3008/").then((response) => {
    //   setList(response.data);
    // });

    // api - GET
    axios.get(`${BASE_URL}/v1/todo`)
      .then((result) => {
        const dataTodo = result.data.todos;
        const dataList = [];
        dataTodo.map((data, index) => {
          dataList.push({ key: index, id: data._id, subject: data.description, status: data.isCompleted });
        })
        setList(dataList);
      });
  }

  const createData = () => {
    // axios.post("http://localhost:3008/", { newSubject: newData })
    //   .then((response) => { setList(response.data); console.log("Added Successfully") })

    const date = format(new Date(), 'yyyy-MM-dd');
    const time = format(new Date(), 'HH:mm:ss.SSS');
    const fulldate = date + "T" + time + "Z";

    axios.post(`${BASE_URL}/v1/todo`, {
      title: "Write Test-Cases",
      description: newData,
      onDate: fulldate,
      cardColor: "#4dd0e1"
    })
      .then((result) => {
        console.log(result.data.status);
        fetchData();
      });
  }

  const updateData = (id, subject) => {
    // axios.put("http://localhost:3008/", { id: id, subject: subject })
    //   .then((response) => { setList(response.data); console.log("Updated Successfully") })

    axios.put(`${BASE_URL}/v1/todo/${id}`, {
      title: "Updated Title 2",
      description: subject,
    })
      .then((result) => {
        console.log(result.data.status);
        fetchData();
      });
  }

  const deleteData = (id) => {
    // axios({
    //   method: 'delete',
    //   url: 'http://localhost:3008/',
    //   data: { id: id }
    // }).then((response) => { setList(response.data); console.log("Deleted Succesfully"); })

    axios.delete(`${BASE_URL}/v1/todo/${id}`)
      .then((result) => {
        console.log(result.data.status);
        fetchData();
      });
  }

  const deleteAllData = () => {
    // axios.delete("http://localhost:3008/deleteAll")
    //   .then((response) => { setList(response.data); console.log("Deleted Successfully") })

    const listLength = list.length;
    list.map((data, index) => {
      axios.delete(`${BASE_URL}/v1/todo/${data.id}`)
        .then((result) => {
          if (result.data.status === "Error") console.log(data.subject + "fail to delete");
          if (listLength === index - 1) {
            console.log(result.data.status);
            fetchData();
          }
        });
    })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        Money Match
      </header>
      <div className='Box'>
        <div className='d-flex justify-content-between Sect1'>
          <div>To Do List</div>
          <div>
            <div className='d-flex flex-row'>
              <div className='d-flex Cursor-pointer'>
                <img src={AddIcon} className='pr-2' alt='add icon' onClick={() => setAdd(!add)} />
              </div>
              <div className='position-relative d-flex Cursor-pointer'>
                <img src={MoreIcon} className='pl-1 pr-2' alt='more icon' ref={refMore} onClick={() => setMore(!more)} />

                {more &&
                  <div className='MoreDropdownContainer'>
                    <div className='MoreDropdown Cursor-pointer' onClick={() => deleteAllData()}>
                      Delete Entire List
                    </div>
                  </div>
                }

              </div>
            </div>
          </div>
        </div>
        <div className='Divider'></div>
        <div className='Sect2'>
          {list && list.map((data, index) =>
            <div key={data.id} className='List d-flex flex-row justify-content-between'>
              {editList[index] ?
                <div className='EditSect'>
                  <input type='text' className='InputSearchEdit' value={data.subject} autoFocus
                    onChange={(e) => {
                      const y = [...list];
                      y[index].subject = e.target.value;
                      setList(y);
                    }}
                  />
                  <div className='ButtonsEdit'>
                    <button className='EditDiv mr-2'
                      onClick={() => {
                        const x = [...editList];
                        x[index] = false
                        setEditList(x);
                        updateData(data.id, data.subject);
                      }}
                    ><img src={CheckIcon} /></button>
                    <button className='EditDiv'
                      onClick={() => {
                        const x = [...editList];
                        x[index] = false
                        setEditList(x);
                      }}
                    ><img src={UncheckIcon} /></button>
                  </div>
                </div>
                : <div>{data.subject}</div>
              }

              <div className='d-flex flex-row'>
                <div className='Cursor-pointer'>
                  <img src={CheckboxIcon} alt='checkbox icons' />
                </div>
                <div className='position-relative Cursor-pointer'>
                  <img src={MoreIcon} className='pr-1 pl-2' alt='more icon' ref={refs[index]}
                    onClick={() => {
                      const x = [...childMore];
                      x[index] = !childMore[index];
                      setChildMore(x);
                    }}
                  />

                  {childMore[index] &&
                    <div className='ChildMoreDropdownContainer'>
                      <div className='ChildMoreDropdown' id='EditIcon'
                        onClick={() => {
                          const x = [...editList];
                          x[index] = !editList[index];
                          setEditList(x);
                        }}
                      >
                        Edit Item
                      </div>
                      <div className='ChildMoreDropdown' id='DeleteIcon'
                        onClick={() => deleteData(data.id)} >
                        Delete Item
                      </div>
                    </div>
                  }

                </div>
              </div>
            </div>
          )}
        </div>

        {add &&
          <div>
            <div className='InputDiv'>
              <input type='text' className='InputSearch' placeholder='What needs to be done?' value={newData} autoFocus
                onChange={(e) => {
                  setNewData(e.target.value);
                  if (e.target.value === "") setNewDataError(true)
                  else setNewDataError(false)
                }}
              />
              {newDataError && <div className='text-danger Error'>This field cannot be empty</div>}
            </div>
            <div className='Buttons'>
              <button className='mr-2 ButtonCreate'
                onClick={() => {
                  setNewDataError(false);

                  if (newData !== "") {
                    createData();
                    setNewData("");
                    setAdd(false);
                  }
                  else setNewDataError(true);
                }}
              >Create</button>
              <button className='ButtonCancel' onClick={() => setAdd(false)}>Cancel</button>
            </div>
          </div>
        }

        <div className='Footer'>Don't miss out an importance tasks anymore</div>
      </div>
    </div>
  );
}

export default App;