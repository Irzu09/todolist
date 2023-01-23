import './App.css';
import MoreIcon from './assets/more.svg';
import AddIcon from './assets/add.svg';
import CheckboxIcon from './assets/checkbox.svg';
import CheckIcon from './assets/check.svg';
import UncheckIcon from './assets/uncheck.svg';
import { useState, useEffect, useRef } from 'react';

const listContent = [
  { id: 1, subject: 'Make Payment', status: false },
  { id: 2, subject: 'Submit Pending Claims', status: false },
  { id: 3, subject: 'Submit Pending Claims', status: false },
  { id: 4, subject: 'Submit Pending Claims', status: false },
  { id: 5, subject: 'Submit Pending Claims', status: false },
  { id: 6, subject: 'Submit Pending Claims', status: false },
];

function App() {
  const [list, setList] = useState(listContent);
  const [add, setAdd] = useState(false);
  const [more, setMore] = useState(false);
  const [childMore, setChildMore] = useState(list.map(() => { return false }));
  const [editList, setEditList] = useState(list.map(() => { return false }));

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
                    <div className='MoreDropdown'>
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
          {list.map((list, index) =>
            <div key={list.id} className='List d-flex flex-row justify-content-between'>
              {editList[index] ?
                <div className='EditSect'>
                  <input className='InputSearchEdit' value={list.subject} autoFocus></input>
                  <div className='ButtonsEdit'>
                    <button className='EditDiv mr-2'
                      onClick={(e) => {
                        const x = [...editList];
                        x[index] = false
                        setEditList(x);

                        // const y = [...list];
                        // y[index].subject = e.target.value;
                        // setList(y);

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
                : <div>{list.subject}</div>
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
                      <div className='ChildMoreDropdown' id='DeleteIcon'>
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
            <input type='search' className='InputSearch' placeholder='What needs to be done?' autoFocus />
            <div className='Buttons'>
              <button className='mr-2 ButtonCreate'>Create</button>
              <button className='ButtonCancel'>Cancel</button>
            </div>
          </div>
        }

        <div className='Footer'>Don't miss out an importance tasks anymore</div>
      </div>
    </div >
  );
}

export default App;