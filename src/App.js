import './App.css';
import MoreIcon from './assets/more.svg';

function App() {
  // const List = [
  //   {  }
  // ];
  return (
    <div className="App">
      <header className="App-header">
        Money Match
      </header>
      <body>
        <div className="Box shadow-sm rounded">
          <div className="d-flex justify-content-between mb-1">
            <span>To Do List</span>
            <span><img src={MoreIcon}/></span>
          </div>
          <div className="Divider"></div>
          <div>List</div>
          <div className="Divider"></div>
          <div className="Footer">Don't miss out an importance tasks anymore</div>
        </div>
      </body>
    </div>
  );
}

export default App;
