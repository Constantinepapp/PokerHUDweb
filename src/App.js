import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNav from './Components/Core/BottomNav'
import Table from './Components/Table'
import Grid from '@material-ui/core/Grid';
import {textToJson} from './helperFunctions/fileParser'
import {tableDataCalc} from './helperFunctions/statisticsTable'
import './App.css'
import add from './assets/img/add.png'
import NavBar from './Components/Core/NavBar'
import example from './assets/example.txt'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(2),
  },
}));


function App() {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  const [json,setJson] = useState({})

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  
  let fileReader;
  const handleFileRead = (e) => {
    const content = fileReader.result;
    const jsonFile = textToJson(content)
    console.log(jsonFile)
    
    setJson(jsonFile)
    
  };
  const exampleText = () =>{
    fetch(example)
      .then(r => r.text())
      .then(text => {
        const jsonFile = textToJson(text)
        console.log(jsonFile)
        setJson(jsonFile)
      });
  }
  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);


    //setInterval((e) =>{
    // try{
    //    fileReader = new FileReader();
    //    fileReader.onloadend = handleFileRead;
    //    fileReader.readAsText(file);
    //  }
    //  catch{
    //    console.log("file changed")
    //  }
      
    //},1000 )
  };
  var recentPlayersTable = []
  var recentPlayersHistory = []
  if (json.length>0){
    [recentPlayersTable,recentPlayersHistory] = tableDataCalc(json)
  }
  console.log(recentPlayersHistory)
    
  
  
  
  console.log(json)
  return (
    <div className="App">
      <NavBar/>
      <Grid container spacing={3} style={{padding:'50px'}}>
      <Grid item xs={1}>
          
          </Grid>
          <Grid item xs={10}>
            <h2>Total Hands : {json[0]? json.length : 0}</h2>
            
          </Grid>
          <Grid item xs={1}>
            
          </Grid>
        <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={10}>
          <Table data={recentPlayersTable} history={recentPlayersHistory}/>
        </Grid>
        <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={12}>
        <input
          type='file'
          id='fileInput'
          className='input-file'
          
          onChange={e => handleFileChosen(e.target.files[0])}
        />
        <label class="button" for="fileInput"><img height="50px" src={add}></img></label>
        <button class="btnExample" onClick={exampleText}>example</button>
        </Grid>
        
      </Grid>
      
      
    </div>
  );
}

export default App;
