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
  const [editDataError, setEditDataError] = useState(false);

  const fetchData = () => {
    // MySQL database - GET
    axios.get(`${BASE_URL}`).then((response) => {
      setList(response.data);
    });
  }

  const createData = () => {
    axios.post(`${BASE_URL}`, { newSubject: newData })
      .then((response) => { setList(response.data); console.log("Added Successfully") })
  }

  const updateData = (id, subject) => {
    axios.put(`${BASE_URL}`, { id: id, subject: subject })
      .then((response) => { setList(response.data); console.log("Updated Successfully") })
  }

  const deleteData = (id) => {
    axios({
      method: 'delete',
      url: `${BASE_URL}`,
      data: { id: id }
    }).then((response) => { setList(response.data); console.log("Deleted Succesfully"); })
  }

  const deleteAllData = () => {
    axios.delete(`${BASE_URL}/deleteAll`)
      .then((response) => { setList(response.data); console.log("Deleted Successfully") })
  }

  const completeToDo = (id) => {
    // axios.patch(`${BASE_URL}/v1/todo/${id}`)
    //   .then((result) => {
    //     console.log(result.data.message);
    //     fetchData();
    //   });
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
                <img src={AddIcon} className='pr-2' alt='add icon'
                  onClick={() => {
                    setAdd(!add);

                    // close edit input bar
                    const x = editList.map(() => { return false })
                    setEditList(x);
                  }}
                />
              </div>
              <div className='position-relative d-flex Cursor-pointer' onMouseEnter={() => setMore(!more)} onMouseLeave={() => setMore(!more)} >
                <img src={MoreIcon} className='pl-1 pr-2' alt='more icon' />

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
                      if (e.target.value === "") setEditDataError(true);
                      else {
                        setEditDataError(false);
                        const y = [...list];
                        y[index].subject = e.target.value;
                        setList(y);
                      }
                    }}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        setEditDataError(false);

                        if (e.target.value !== "") {
                          const x = [...editList];
                          x[index] = false
                          setEditList(x);
                          updateData(data.id, data.subject);
                        }
                        else setEditDataError(true);
                      }
                    }}
                  />
                  {editDataError && <div className='text-danger font-weight-normal Error'>This field cannot be empty</div>}
                  <div className='ButtonsEdit'>
                    <button className='EditDiv mr-2'
                      onClick={() => {
                        setEditDataError(false);

                        if (data.subject !== "") {
                          const x = [...editList];
                          x[index] = false
                          setEditList(x);
                          updateData(data.id, data.subject);
                        }
                        else setEditDataError(true);
                      }}
                    ><img src={CheckIcon} /></button>
                    <button className='EditDiv'
                      onClick={() => {
                        const x = [...editList];
                        x[index] = false
                        setEditList(x);
                        fetchData();
                      }}
                    ><img src={UncheckIcon} /></button>
                  </div>
                </div>
                : <div>{data.subject}</div>
              }

              <div className='d-flex flex-row'>
                <div className='Cursor-pointer'>
                  <input
                    className="Checkbox"
                    type="checkbox"
                    id="input01"
                    name="input01"
                    value={data.id}
                    checked={data.status}
                    onChange={(e) => {
                      const x = [...list];
                      // once clicked, considered settle
                      x.map((x) => { if (x.id === e.target.value) x.status = true });
                      setList(x);
                      completeToDo(data.id);
                    }}
                  />
                  <span className="Checkmark"></span>
                  {/* <img src={CheckboxIcon} alt='checkbox icons' /> */}
                </div>
                <div className='position-relative Cursor-pointer'
                  onMouseEnter={() => {
                    const x = [...childMore];
                    x[index] = !childMore[index];
                    setChildMore(x);
                  }}
                  onMouseLeave={() => {
                    const x = [...childMore];
                    x[index] = !childMore[index];
                    setChildMore(x);
                  }}
                >
                  <img src={MoreIcon} className='pr-1 pl-2' alt='more icon' />

                  {childMore[index] &&
                    <div className='ChildMoreDropdownContainer'>
                      <div className='ChildMoreDropdown' id='EditIcon'
                        onClick={() => {
                          const x = list.map((list, idx) => {
                            if (index === idx) return true;
                            else return false;
                          });
                          setEditList(x);
                          // close add input bar
                          setAdd(false);
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
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setNewDataError(false);

                    if (newData !== "") {
                      createData();
                      setNewData("");
                      setAdd(false);
                    }
                    else setNewDataError(true);
                  }
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