import logo from './logo.svg';
import './App.css';
// import Highcharts from 'highcharts';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Chart from './components/Chart.js';
import TopChart from './components/TopChart.js';
// import Selecter from './components/Selecter.js';
import React, { useState, Component, useEffect } from 'react'; 

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Container, Row, Card, Col } from 'react-bootstrap';

// import селекта
import Select from "react-select";
import { FixedSizeList as List } from "react-window";


require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
// require('highcharts/modules/map')(Highcharts)

// ПРОБА НАЧАЛО

// ПРОБА КОНЕЦ

// НАЧАЛО СЕЛЕКТА


const height = 35;

class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}

const Selecter = ({ data, active, onChange }) => (

    <Select
        // style={{width:'10%'}}
        defaultValue={active}
        isMulti
        // name="colors"
        options = {data}
        components ={{ MenuList }}
        onChange = {(values) => onChange(values)}
        menuPlacement = 'auto'
        maxMenuHeight={100}
        // onChange={(values) => console.log(values)}
        // className="basic-multi-select"
        // classNamePrefix="select"
    />
);



// КОНЕЦ СЕЛЕКТА




const skillsSet = [
  {
      "value": "H2",
      "label": "H2"
  },
  {
      "value": "C2H2",
      "label": "C2H2"
  },
  {
    "value": "C2H4",
    "label": "C2H4"
  },
  {
    "value": "CO",
    "label": "CO"
  },
];

const typesOfProblems = {
  1: 'Исправная работа', 2:'Частичный разряд', 3:'Разряд низкой энергии', 4: 'Низкотемпературный технический дефект'
}


function dictToList(value) {
  var mam = Object.keys(value)
  mam.forEach(function(part, index) {
    this[index] = Number(part);
  }, mam);
  mam = [mam,Object.values(value)][0].map((_, colIndex) => [mam,Object.values(value)].map(row => row[colIndex]))
  return mam
}
const App = () => {
  // var idinfo = require('./idinfo.json');
  // var id = require('./id.json');
  // var idinfo = require('./idinfo.json');
  // var id = require('./id.json');
  const [idInfo, setIdInfo] = useState([])
  const [id,setId] = useState([])
  // const [users, setUsers] = useState(idinfo['2_trans_1'])
  // const [mom, setMom] = useState(dictToList(users['C2H2']))
  const [users, setUsers] = useState([])
  const [mom, setMom] = useState([])
  const [transformatorsIds,setTransformatorsIds] = useState([])
  const [optionSeries, setOptionSeries] = useState([
    {
    data: mom,
    name: 'C2H2',
  }])
  useEffect(async ()=>{
    var idInfoData;
    var idData;
    // async function getIdInfo() {
    //   await fetch('https://scoeur.pythonanywhere.com/idinfo?id='+'2_trans_1')
    //     .then(res => res.json())
    //     // .then(data => idInfoData = data)
    //     .then(data => setUsers(data['2_trans_1']))

    // }
    
    // async function getId() {
    //   await fetch('https://scoeur.pythonanywhere.com/id')
    //     .then(res => res.json())
    //     .then(data => idData = data)
    // }
    
    // getIdInfo();
    // getId();
    await fetch('https://scoeur.pythonanywhere.com/idinfo?id='+'2_trans_1')
        .then(res => res.json())
        .then(data => idInfoData = data)
        // .then(data => setUsers(data['2_trans_1']))
    await fetch('https://scoeur.pythonanywhere.com/id')
        .then(res => res.json())
        .then(data => idData = data)

    // console.log(idInfoData)
    setUsers(idInfoData['2_trans_1'])
    setMom(dictToList(idInfoData['2_trans_1']['C2H2']))
    setId(idData)
    setMom(dictToList(idInfoData['2_trans_1']['C2H2']))

    const transformatorsIdsNow = []

    for (let i=0;i<idData.length;i++){
      transformatorsIdsNow.push({
        "value": idData[i],
        "label": idData[i]
    })
    }
    setTransformatorsIds(transformatorsIdsNow)
    
    setOptionSeries([
      {
      data: dictToList(idInfoData['2_trans_1']['C2H2']),
      name: 'C2H2',
    }])

  }, [])
  const [activeCharts, setActiveCharts] = useState([
    {value: 'C2H2',label: 'C2H2'}
  ]);
  
  const [upcommingTransformators, setUpcommingTransformators] = useState([])
  const [currentTransformators, setCurrentTransformators] = useState([{
    "value": "2_trans_1",
    "label": "2_trans_1"
}])
  const [activeChosenTranformators, setActiveChosenTranformators] = useState([])
  const [activeTransformator, setActiveTransformator] = useState('2_trans_1')

const optionsStackOverflow = {
    title: {
      text: 'Концентрации газов в '+activeTransformator
    },
    yAxis: [{
      height: '75%',
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'Объем'
      }
    }],
    series: optionSeries}

    async function changeGraphics(value){
      
      var newId;

      await fetch('https://scoeur.pythonanywhere.com/idinfo?id='+value)
        .then(res => res.json())
        .then(data => newId = data)
      
      

      setUsers(newId[value])
      setMom(dictToList(users['C2H2']))
      var newOptionSeries = []

      for (var step = 0;step<optionSeries.length;step++){
        var mot = Object.keys(newId[value][optionSeries[step].name])

          mot.forEach(function(part, index) {
            this[index] = Number(part);
          }, mot);

          mot = [mot,Object.values(newId[value][optionSeries[step].name])][0].map((_, colIndex) => [mot,Object.values(newId[value][optionSeries[step].name])].map(row => row[colIndex]))

        newOptionSeries.push({
          data: mot,
          name: optionSeries[step].name,
        })
      }

      
      setOptionSeries(newOptionSeries)
      setActiveTransformator(value)
      console.log('newOptionSeries',newOptionSeries)
      console.log('optionSeries', optionSeries)
    }
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

  function addTransformators(){
    var m = currentTransformators.concat(upcommingTransformators).filter(onlyUnique)
    // setCurrentTransformators(currentTransformators.concat(upcommingTransformators).unique())
    setCurrentTransformators(m)
    setUpcommingTransformators([])
    setActiveChosenTranformators([])
  }


  function onTransformatorChoose(values){
    if (values) {
      setUpcommingTransformators(values)
    } else {
      setUpcommingTransformators([])
    }
  }
  
  function onChoose(values) {
    if (values) {
        var series = []
        for (var step = 0;step<values.length;step++){
          var mom = Object.keys(users[values[step].label])

          mom.forEach(function(part, index) {
            this[index] = Number(part);
          }, mom);

          mom = [mom,Object.values(users[values[step].label])][0].map((_, colIndex) => [mom,Object.values(users[values[step].label])].map(row => row[colIndex]))

          series.push({
            data: mom,
            name: values[step].label,
          })
          
        }
        setOptionSeries(series)

    }else{
      setOptionSeries([])
    }
  }
  
  return (
    <div className='App'>
      <div style={{padding: '2.2rem', fontSize:'1.9em', background: '#3f527c', margin: '-20px', borderRadius: '0 0 10px 10px', color: 'white',boxShadow: '0 0 10px rgba(0,0,0,0.5)'}}>
        Мониторинг текущего состояния силовых трансформаторов
      </div>
      <div style={{height:'4rem'}}>

      </div>
      
          <Chart options={optionsStackOverflow}>
          </Chart>
        
          <div style={{height:'1rem'}}></div>
          Категория состояния: {typesOfProblems[users.category]} <br>
          </br>   
          Концентрации газов достигнут установки через: {users.predicted}
      <div style={{height:'1rem'}}></div>
      <div style={{width:'50%', margin: 'auto'}}>
        <Selecter style = {{maxHeight: '1rem'}} data={skillsSet} active={activeCharts} onChange = {onChoose}></Selecter>
      </div>
      <div style={{height: '3rem'}}></div>
      <div style={{height: '2px', background: '#b3b3b3'}}></div>
      <div style={{height: '3rem'}}></div>

      <Container fluid>
        <Row sm ={3} md={3} lg={5}>
          {currentTransformators.map( (transformator, i) => (
            <Col>
              <Button style = {{width: '135px', marginBottom: '1rem'}} onClick={() => changeGraphics(transformator['value'])}>
                {transformator['value']}
              </Button>
            </Col>
          ) )}
          
        </Row>
        <div style={{height: '2rem'}}></div>
        <Row>
        <Col lg={8}>
          <Selecter style = {{maxHeight: '10rem'}} active={{value: '2_trans_1',label: '2_trans_1'}} data={transformatorsIds} onChange = {onTransformatorChoose}></Selecter>
        </Col>
        <Col lg = {4}>
          <Button variant="success" style={{width: '70px'}} onClick = {() => addTransformators()}>+</Button>
        </Col>
        </Row>
      </Container>
      
      <div style={{height:'1rem'}}></div>
      <div style={{height: '3rem'}}></div>
      <div style={{height: '4rem',background: '#3f527c', margin: '-20px', borderRadius: '10px 10px 0 0', color: 'white',boxShadow: '0 0 10px rgba(0,0,0,0.5)'}}></div>
    </div>
  );
}

export default App;
