import React from "react";
import "./App.css";
import data from "./honda_wmi.json";
import {useState, useEffect} from "react";
import ReactDOM from "react-dom";


function App() {
  const keys = ["Name", "WMI", "Country", "CreatedOn", "VehicleType"];
  const temp = data;

  const [searchTerm,setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [filterTerm,setFilterTerm] = useState("");


// The function is used to sort based on the key given 
function compareObjects(object1, object2, key)  {
  const obj1 = object1[key]
  const obj2 = object2[key]

  if (obj1 < obj2) {
    return -1;
  }
  if (obj1 > obj2) {
    return 1;
  }
  return 0;
}

// useEffect is used when there is a change in state of dependencies
// The following is used when a search term is entered. It searches in the Name column.
React.useEffect(() => {
  const results = temp.filter(p =>
    p.Name.toLowerCase().includes(searchTerm)
  );
  setSearchResults(results);
}, [searchTerm]);


  const getRowsJsx = () => {

    // Sort is first performed on CreatedON and then WMI
    temp.sort((a,b) => compareObjects(a, b, 'CreatedOn') || compareObjects(a,b,'WMI'));
        //console.log(temp);

      return searchResults.map((d) => {
      const wmi = d.WMI;
      //console.log(d.Country);
      return (
        <tr key={wmi}>
          {keys.map((k) => (
            <td key={`${wmi}-${k}`}>{d[k]}</td>
          ))}
        </tr>
      );
    });
  };

  
  return (
    <div className="App">
      <header className = "Header">WMI Data - Honda | Total: {data.length}</header>
      
      <div>Search(Name)
        <input className = "InputBox" type = "text" value={searchTerm} onChange = {(event) => setSearchTerm(event.target.value)}/>

      Country  
      <select name="ddl" value={filterTerm} onChange = {(event) => setFilterTerm(event.target.value)}>
      <option value='View All' selected>View All</option>
      <option value='UNITED STATES (USA)'>UNITED STATES (USA)</option>
      <option value='CANADA'>CANADA</option>
      <option value='MEXICO'>MEXICO</option>
      <option value='UNITED KINGDOM (UK)'>UNITED KINGDOM (UK)</option>
      <option value='BELGIUM'>BELGIUM</option>
      <option value='CHINA'>CHINA</option>
      <option value='JAPAN'>JAPAN</option>
      <option value='SPAIN'>SPAIN</option>
      <option value='HONG KONG'>HONG KONG</option>
      </select>

      </div>

      <table className = "Table">
        <thead>
          <tr>
            {keys.map((k) => (
              <th className = "TableHeader" key={k}>{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getRowsJsx()}
        </tbody>
      </table>
    </div>
  );
}

export default App;


