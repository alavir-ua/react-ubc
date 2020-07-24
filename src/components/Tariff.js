import React, {useState, useEffect} from "react";
import moment from 'moment';
import 'moment/locale/ru'
moment.locale('ru');

function Tariff(props) {
  const time = moment().format('LLL');

  const initTariff = {
    elect_before: "",
    elect_under: "",
    gaz: "",
    water: ""
  };

  const initialTariff = JSON.parse(localStorage.getItem('tariff')) ? JSON.parse(localStorage.getItem('tariff')) : initTariff;

  const [tariff, setTariff] = useState(initialTariff);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const {name, value} = event.target;
    setTariff({...tariff, [name]: value});
  };

  const saveTariff = () => {
    setTariff({...tariff, created: time});
    setSubmitted(true);
  }

  const dropResult = {
    total: 0,
    electricity: 0,
    gaz: 0,
    water: 0,
    heat: 0,
    utilities: 0,
    intercom: 0
  };
  const dataDrop = {
    electricity: 0,
    gaz: 0,
    water: 0,
    heat: 0,
    utilities: 0,
    intercom: 0
  };

  const dropTariff = () => {
    localStorage.removeItem('tariff');
    setTariff(initTariff);
    props.setData(dataDrop);
    props.updateResult(dropResult);
  }

  useEffect(() => {
    localStorage.setItem('tariff', JSON.stringify(tariff));
  }, [tariff])

  useEffect(() => {
  }, [tariff])

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          {!submitted ?
            (<h4>Установить тарифы</h4>) :
            (<div></div>)
          }
        </div>
      </div>
      <div className="row">
        <div className="col-md-6"></div>
      </div>
      <div className="row justify-content-center">
        {submitted ? (
          <div className="col-md-6 mt-5">
            <h4 style={{color: "#00ff00"}}>Тариф успешно сохранен!</h4>
          </div>
        ) : (
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="elect_before">Электричество до 100 (кВт/Грн)</label>
              <input name="elect_before"
                     className="form-control form-control-sm"
                     value={tariff.elect_before}
                     onChange={handleInputChange}
                     id="elect_before"
                     type="number"
                     min="0" max="20"
              />

              <label htmlFor="elect_under">Электричество свыше 100 (кВт/Грн)</label>
              <input name="elect_under"
                     className="form-control form-control-sm"
                     value={tariff.elect_under}
                     onChange={handleInputChange}
                     id="elect_under"
                     type="number"
                     min="0" max="20"
              />

              <label htmlFor="gaz">Газ (м³/Грн)</label>
              <input name="gaz"
                     className="form-control form-control-sm"
                     value={tariff.gaz}
                     onChange={handleInputChange}
                     id="gaz"
                     type="number"
                     min="0" max="50"
              />

              <label htmlFor="water">Вода (м³/Грн)</label>
              <input name="water"
                     className="form-control form-control-sm"
                     value={tariff.water}
                     onChange={handleInputChange}
                     id="water"
                     type="number"
                     min="0" max="100"
              />
              <br/>
            </div>
            <button onClick={saveTariff} className="btn btn-outline-success">Установить</button>
            <button onClick={dropTariff} className="btn btn-outline-danger" style={{marginLeft: "10px"}}>Обнулить
            </button>
          </div>
        )}
        <div className="col-md-6"></div>
      </div>

    </div>
  )
}

export default Tariff;





