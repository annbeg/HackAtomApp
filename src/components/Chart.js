import React from 'react';
import './Chart.css';
// import Highcharts from 'highcharts';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const Chart = ({ options }) => (
	// <div className="chart" style={style}>
    <HighchartsReact style = {{width:'50px'}} className='chart' highcharts={Highcharts} options={options} >

    </HighchartsReact>
	// </div>
);

export default Chart;