import React from 'react';
import {Bar} from 'react-chartjs-2';

function Chart(props) {

  const randomRgbaArr = () => {
    const array = []
    const randomRgba = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return "rgba(" + r + "," + g + "," + b + "," + 0.9 + ")";
    }
    for (let i = 0; i <= 6; i++) {
      array.push(randomRgba());
    }
    return array;
  }

  const data = {
    labels: ['Электричество', 'Газ', 'Вода',
      'Отопление', 'Комуслуги', 'Домофон'],
    datasets: [
      {
        label: 'Стоимость комуслуг',
        fill: true,
        lineTension: 0.5,
        backgroundColor: randomRgbaArr,
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        data: [props.result.electricity, props.result.gaz, props.result.water, props.result.heat, props.result.utilities, props.result.intercom]
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      labels: {
        fontColor: '#ffffff',
        fontSize: 13,
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#ffffff',
          fontSize: 13,
        },
        display: true,
        gridLines: {
          display: true,
          lineWidth: 1,
          color: '#ffffff'
        },
      }],
      yAxes: [{
        ticks: {
          callback: function (value, index, values) {
            return '₴' + value;
          },
          beginAtZero: true,
          fontColor: '#ffffff',
          fontSize: 13,
          padding: 2
        },
        display: true,
        gridLines: {
          display: true,
          lineWidth: 1,
          color: '#ffffff'
        },
      }]
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        {props.result.total !== 0 ?
          (<div className="col-md-10 mr-auto mt-4">
              <Bar
                data={data}
                options={options}
                height={100}
              />
            </div>
          ) : (
            <div className="col-md-12 mt-5">
              <h4 style={{color: "#ff471a"}}>Нет данных для отображения...</h4>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Chart;




