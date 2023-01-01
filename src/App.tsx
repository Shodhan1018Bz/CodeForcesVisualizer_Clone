import { useState, useEffect } from "react";
import  NavBar  from './pages/nav'
import "./App.css";
import Axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Piechart from "./pages/piechart";
import Barchart from "./pages/barcharts";
import Table from './pages/tables'

function App() {
  const [programmingLanguagesKnown, setprogrammingLanguagesKnown] = useState<any>([]);
  const [handle,setHandle]=useState("");
  const [verdicts,setVerdicts]=useState([]);
  const[tags,setTags]=useState([]);
  const[levels,setLevels]=useState([]);
  const[rating,setRating]=useState([]);
  const[numberofContestsAttended,setNumberofContestsAttended]=useState(0);
  const[bestRank,setBestRank]=useState(0);
  const[worstRank,setWorstRank]=useState(0);
  const[maxUp,setMaxUp]=useState(0);
  const[maxDown,setMaxDown]=useState(0);
  const[maxAttemted,setMaxAttempted]=useState<any>();
  const[solved,setSolved]=useState();
  const[tried,setTried]=useState();
  const[averageAttempted,setAverageAttempted]=useState<any>();
  const[solvedWithOneSubmission,setSolvedWithOneSubmission]=useState<any>();
  const[mxAc,setMxAc]=useState(1);

  //Fetching the data from API
  const fetchApiFromUserStatus = () => {
    // Fetching the from user.rating API
    Axios.get("https://codeforces.com/api/user.rating?handle="+handle)
      .then((res)=>{
        // console.log(res.data);
        let resultLength=res.data.result.length;
        let maxRank=res.data.result[0].rank;
        let minRank=res.data.result[0].rank;
        let up=res.data.result[0].newRating;
        let down=res.data.result[0].newRating;
        
        setNumberofContestsAttended(resultLength);
        for(let i=1;i<resultLength;i++){
            maxRank=Math.max(maxRank,res.data.result[i].rank);
            minRank=Math.min(minRank,res.data.result[i].rank);
            up=Math.max(up,res.data.result[i].newRating-res.data.result[i].oldRating);
            down=Math.min(down,res.data.result[i].newRating-res.data.result[i].oldRating);
        }
        setBestRank(maxRank);
        setWorstRank(minRank);
        setMaxDown(down);
        setMaxUp(up);
        // console.log(minRank);

      })
      .catch((err)=>console.error(err))
    


    // Fetching the from user.status API
    Axios.get("https://codeforces.com/api/user.status?handle="+handle).then((res) => {

      let resultLength=res.data.result.length;
      let programmingLanguages=[""];
      let verdictArray=[""];
      let tagsArray=[""];
      let levelsArray=[""];
      let ratingArray=[""];
      let problemsArray=[""];
      let solvedArray=[""];
      


      for (let i = 0; i < resultLength; i++){
        programmingLanguages=[...programmingLanguages,res.data.result[i].programmingLanguage];
        verdictArray=[...verdictArray,res.data.result[i].verdict];
        tagsArray=[...tagsArray,...res.data.result[i].problem.tags];
        levelsArray=[...levelsArray,res.data.result[i].problem.index];
        ratingArray=[...ratingArray,res.data.result[i].problem.rating];
        problemsArray=[...problemsArray,res.data.result[i].problem.contestId.toString()+res.data.result[i].problem.index];
        if(res.data.result[i].verdict==="OK"){
          solvedArray=[...solvedArray,res.data.result[i].problem.contestId.toString()+res.data.result[i].problem.index]
        }
      }

      const dataMap = problemsArray.reduce((accumualtor:any, entry:any) => accumualtor.set(entry, (accumualtor.get(entry) || 0) + 1), new Map());
      const solvedArrayMap = solvedArray.reduce((accumualtor:any, entry:any) => accumualtor.set(entry, (accumualtor.get(entry) || 0) + 1), new Map());
      let mxAttempted=0;
      let sumAttempted=0;
      let with1=0;
      dataMap.forEach(function(value:any, key:any){
        if(key!==""){
          mxAttempted=Math.max(mxAttempted,value);
          sumAttempted+=value;
          if(value==1){
            with1++;
          }
        }
      })
      setTried(dataMap.size);
      setSolved(solvedArrayMap.size);
      let p=sumAttempted*1.0/resultLength;
      setAverageAttempted(p);
      setMaxAttempted(mxAttempted);
      setSolvedWithOneSubmission(with1);





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
      <Button variant="primary" onClick={()=>{fetchApiFromUserStatus;}} className="submit">Submit</Button>
    </Form>
    </div></>;
  }


  return (
    <>
    <NavBar/>
    <div className="form1" >
    
    <Form>
      <Form.Control type="text" onChange={(e) => setHandle(e.target.value)} placeholder="Enter Codeforces Handle" />
      <Button variant="primary" onClick={fetchApiFromUserStatus} className="submit">Submit</Button>
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
    <div className="d-flex justify-content-around">
    <Table H1={"Contests of"} handle={handle} r2l={"Number of Contests"} r2r={numberofContestsAttended} r3l={"Best rank"} r3r={worstRank} r4l={"Worst rank"} r4r={bestRank} r5l={"Max Up"} r5r={maxUp} r6l={"Max Down"} r6r={maxDown} r7l={""} r7r={""} />
    <Table H1={"Some Numbers about"} handle={handle} r2l={"Tried"} r2r={tried} r3l={"Solved"} r3r={solved} r4l={"Average attempts"} r4r={averageAttempted} r5l={"Max attempts"} r5r={maxAttemted} r6l={"Solved with one submission"} r6r={solvedWithOneSubmission} r7l={"Max AC(s)"} r7r={mxAc} />
    </div>
    </>
  );
}


export default App;