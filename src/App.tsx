import { useState, useEffect } from "react";
import  NavBar  from './pages/nav'
import "./App.css";
import Axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Piechart from "./pages/piechart";
import Barchart from "./pages/barcharts";
import { ThemeProvider } from "react-bootstrap";

function App() {
  const [programmingLanguagesKnown, setprogrammingLanguagesKnown] = useState<any>([]);
  const [handle,setHandle]=useState("");
  const [verdicts,setVerdicts]=useState([]);
  const[tags,setTags]=useState([]);
  const[levels,setLevels]=useState([]);
  const[rating,setRating]=useState([]);

  //Fetching the data from API
  const fetchApi = () => {
    Axios.get("https://codeforces.com/api/user.status?handle="+handle).then((res) => {

      let resultLength=res.data.result.length;
      let programmingLanguages=[""];
      let verdictArray=[""];
      let tagsArray=[""];
      let levelsArray=[""];
      let ratingArray=[""];

      for (let i = 0; i < resultLength; i++){
        programmingLanguages=[...programmingLanguages,res.data.result[i].programmingLanguage];
        verdictArray=[...verdictArray,res.data.result[i].verdict];
        tagsArray=[...tagsArray,...res.data.result[i].problem.tags];
        levelsArray=[...levelsArray,res.data.result[i].problem.index];
        ratingArray=[...ratingArray,res.data.result[i].problem.rating];

      }
      function fetchData(data:any):any{
      const dataMap = data.reduce((accumualtor:any, entry:any) => accumualtor.set(entry, (accumualtor.get(entry) || 0) + 1), new Map());
      let tmp=[{}];
      tmp.shift();
      // console.log(dataMap);
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
      function compare(a:any, b:any) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }
      
      tmp.sort(compare);
      return tmp;
      }

      //Languages known
      setprogrammingLanguagesKnown(fetchData(programmingLanguages));

      //Verdicts
      setVerdicts(fetchData(verdictArray));

      //Tags
      setTags(fetchData(tagsArray));

      //Levels
      setLevels(fetchData(levelsArray));

      //Rating
      setRating(fetchData(ratingArray));

    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      {}
    });
  };
  if(!handle){
    return <>
    <NavBar/>
    <div className="form1" >
    
    <Form>
      <Form.Control type="text" onChange={(e) => setHandle(e.target.value)} placeholder="Enter Codeforces Handle" />
      <Button variant="primary" onClick={fetchApi} className="submit">Submit</Button>
    </Form>
    </div></>;
  }


  return (
    <>
    <NavBar/>
    <div className="form1" >
    
    <Form>
      <Form.Control type="text" onChange={(e) => setHandle(e.target.value)} placeholder="Enter Codeforces Handle" />
      <Button variant="primary" onClick={fetchApi} className="submit">Submit</Button>
    </Form>
    </div>
    {/* {DisPlaying The PieCharts} */}
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
          <Piechart data={tags} cx={300} cy={300} width={800} height={600} outerRadius={280} innerRadius={150} handle={handle} label="Tags of "/>
      </div>
      </div>
      
      
      
    </div>
    <div className="d-flex justify-content-around">
        <div className="shadow-lg p-3 mb-5 bg-white rounded">
        <Barchart label={"Problem levels of"} handle={handle} data={levels}/>
        </div>
    </div>
    <div className="d-flex justify-content-around">
        <div className="shadow-lg p-3 mb-5 bg-white rounded">
        <Barchart label={"Problem ratings of"} handle={handle} data={rating}/>
        </div>
    </div>
    </>
  );
}

export default App;