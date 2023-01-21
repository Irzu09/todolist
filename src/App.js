import './App.css';
import MoreIcon from './assets/more.svg';
import AddIcon from './assets/add.svg';
import CheckboxIcon from './assets/checkbox.svg';
import { useState } from 'react';

function App() {
  const [add, setAdd] = useState(false);

  const list = [
    { id: 1, subject: 'Make Payment', status: false },
    { id: 2, subject: 'Submit Pending Claims', status: false },
    { id: 3, subject: 'Submit Pending Claims', status: false },
    { id: 4, subject: 'Submit Pending Claims', status: false },
    { id: 5, subject: 'Submit Pending Claims', status: false },
    { id: 6, subject: 'Submit Pending Claims', status: false },
  ];
  return (
    <div className='App'>
      <header className='App-header'>
        Money Match
      </header>
      <body>
        <div className='Box shadow-sm rounded'>
          <div className='d-flex justify-content-between Sect1'>
            <span>To Do List</span>
            <span>
              <img src={AddIcon} className='mr-3' alt='add icon' onClick={() => setAdd(!add)} />
              <img src={MoreIcon} className='mr-2' alt='more icon' />
            </span>
          </div>
          <div className='Divider'></div>
          <div className='Sect2'>
            {list.map((list) =>
              <div key={list.id} className='List d-flex flex-row justify-content-between'>
                <div>{list.subject}</div>
                <div>
                  <img src={CheckboxIcon} className='mr-2' alt='checkbox icons' />
                  <img src={MoreIcon} className='mr-1' alt='more icon' />
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
      </body>
    </div>
  );
}

export default App;
