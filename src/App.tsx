import { useState, useEffect } from "react";
import  NavBar  from './pages/nav'
import "./App.css";
import Axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Piechart from "./pages/piechart";

function App() {
  const [programmingLanguagesKnown, setprogrammingLanguagesKnown] = useState<any>([]);
  const [handle,setHandle]=useState("");
  const [verdicts,setVerdicts]=useState([]);
  const[tags,setTags]=useState([]);

  //Fetching the data from API
  const fetchApi = () => {
    Axios.get("https://codeforces.com/api/user.status?handle="+handle).then((res) => {

      let resultLength=res.data.result.length;
      
      let programmingLanguages=[""];
      let verdictArray=[""];
      let tagsArray=[""];

      for (let i = 0; i < resultLength; i++){
        programmingLanguages=[...programmingLanguages,res.data.result[i].programmingLanguage];
        verdictArray=[...verdictArray,res.data.result[i].verdict];
        tagsArray=[...tagsArray,...res.data.result[i].problem.tags];
      }
      function fetchData(data:any):any{
      const dataMap = data.reduce((acc:any, e:any) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
      let tmp=[{}];
      tmp.shift();
      console.log(dataMap);
      dataMap.forEach(function(value:any, key:any) {

        if(key!==""){
          let p={
            name:key,
            value:value
          };
          if(tmp.length!=0)
          tmp=[...tmp,p];
          else
          tmp=[p];
        }
      })
      return tmp;
      }

      //Languages known
      setprogrammingLanguagesKnown(fetchData(programmingLanguages));

      //Verdicts
      setVerdicts(fetchData(verdictArray));

      //Tags
      setTags(fetchData(tagsArray));


    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      {}
    });
  };




  return (
    <>
    <NavBar/>
    <div className="form1" >
    
    <Form>
      <Form.Control type="text" onChange={(e) => setHandle(e.target.value)} placeholder="Enter Codeforces Handle" />
      <Button variant="primary" onClick={fetchApi} className="submit">Submit</Button>
    </Form>
    </div>
      <div>
      <div className="d-flex justify-content-around">
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
                <Piechart data={programmingLanguagesKnown} cx={200} cy={200} width={500} height={400} outerRadius={150} innerRadius={0}  handle={handle} label="Languages of "/>
           </div>
           <div className="shadow-lg p-3 mb-5 bg-white rounded">
                <Piechart data={verdicts} cx={200} cy={200} width={500} height={400} outerRadius={150} innerRadius={0} handle={handle} label="Verdicts of "/>
           </div> 
      </div>
      <div className="d-flex justify-content-around">
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
          <Piechart data={tags} cx={300} cy={300} width={800} height={600} outerRadius={250} innerRadius={100} handle={handle} label="Tags of "/>
      </div>
      </div>
      <p>{handle}</p>
    </div>
    
    </>
  );
}

export default App;