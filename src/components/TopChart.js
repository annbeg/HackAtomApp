import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const TopChart = ({ options }) => (
	// <div className="chart" style={style}>
    <HighchartsReact style = {{width:'50px'}} highcharts={Highcharts} options={options}>

    </HighchartsReact>
	// </div>
);

export default TopChart;