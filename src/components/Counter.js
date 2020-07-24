import React from 'react';

function Counter(props) {
  const tariff = JSON.parse(localStorage.getItem('tariff'));

  const handleInputChange = event => {
    const {name, value} = event.target;
    props.setData({...props.data, [name]: value});
  };

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

  const dropData = () => {
    props.setData(dataDrop);
    props.updateResult(dropResult);
  }

  const doCount = () => {
    let electricity = (props.data.electricity > 100) ? parseFloat(((props.data.electricity - 100) * tariff.elect_under + 100 * tariff.elect_before).toFixed(2)) : parseFloat((props.data.electricity * tariff.elect_before).toFixed(2));
    let gaz = parseFloat((props.data.gaz * tariff.gaz).toFixed(2));
    let water = parseFloat((props.data.water * tariff.water).toFixed(2));
    let heat = parseFloat(props.data.heat);
    let utilities = parseFloat(props.data.utilities);
    let intercom = parseFloat(props.data.intercom);
    let total = parseFloat((electricity + gaz + water + heat + utilities + intercom).toFixed(2));
    return {total, electricity, gaz, water, heat, utilities, intercom};
  }

  return (
    <div className="container">
      {tariff.created ?
        (<div className="row justify-content-center mb-5">
            <div className="col-md-4">
              <h4>Создать месячный расчет</h4>
              <div className="form-group">
                <label htmlFor="electricity">Электричество (кВт)</label>
                <input name="electricity"
                       className="form-control form-control-sm"
                       value={props.data.electricity}
                       onChange={handleInputChange}
                       id="electricity"
                       type="number"
                       min="0" max="1000"
                />

                <label htmlFor="gaz">Газ (м³)</label>
                <input name="gaz"
                       className="form-control form-control-sm"
                       value={props.data.gaz}
                       onChange={handleInputChange}
                       id="gaz"
                       type="number"
                       min="0" max="100"
                />

                <label htmlFor="water">Вода (м³)</label>
                <input name="water"
                       className="form-control form-control-sm"
                       value={props.data.water}
                       onChange={handleInputChange}
                       id="water"
                       type="number"
                       min="0" max="100"
                />

                <label htmlFor="heat">Отопление (Грн)</label>
                <input name="heat"
                       className="form-control form-control-sm"
                       value={props.data.heat}
                       onChange={handleInputChange}
                       id="heat"
                       type="number"
                       min="0" max="10000"/>

                <label htmlFor="utilities">Комуслуги (Грн)</label>
                <input name="utilities"
                       className="form-control form-control-sm"
                       value={props.data.utilities}
                       onChange={handleInputChange}
                       id="utilities"
                       type="number"
                       min="0" max="1000"
                />

                <label htmlFor="intercom">Домофон (Грн)</label>
                <input name="intercom"
                       className="form-control form-control-sm"
                       value={props.data.intercom}
                       onChange={handleInputChange}
                       id="intercom"
                       type="number"
                       min="0" max="200"
                />
              </div>

              <button onClick={() => {
                props.updateResult(doCount())
              }} className="btn btn-outline-success">Рассчитать
              </button>

              <button onClick={dropData} className="btn btn-outline-danger" style={{marginLeft: "10px"}}>Обнулить
              </button>
            </div>
            <div className="col-md-4">
              {props.result.total !== 0 ?
                (<h4>Расчитано по тарифу</h4>) : (
                  <h4>Будет расчитано по тарифу</h4>
                )
              }
              <div className="form-group">
                <label htmlFor="updated_at">Тариф создано</label>
                <input id="updated_at"
                       type="text" value={tariff ? tariff.created : ''}
                       className="form-control form-control-sm"
                       disabled/>

                <label htmlFor="elect_before">Электричество до 100 (кВт/Грн)</label>
                <input id="elect_before"
                       type="text"
                       value={tariff.elect_before}
                       className="form-control form-control-sm"
                       disabled/>

                <label htmlFor="elect_under">Электричество свыше 100 (кВт/Грн)</label>
                <input id="elect_under"
                       type="text"
                       value={tariff.elect_under}
                       className="form-control form-control-sm"
                       disabled/>

                <label htmlFor="gaz_t">Газ (м³/Грн)</label>
                <input id="gaz_t"
                       type="text"
                       value={tariff.gaz}
                       className="form-control form-control-sm"
                       disabled/>

                <label htmlFor="water_t">Вода (м³/Грн)</label>
                <input id="water_t"
                       type="text"
                       value={tariff.water}
                       className="form-control form-control-sm"
                       disabled/>
              </div>
            </div>
            <div className="col-md-4">
              {props.result.total !== 0 &&
              <div>
                <h4>Результаты расчета</h4>
                <div className="form-group">
                  <label htmlFor="total">Общая сумма (Грн)</label>
                  <input name="total"
                         className="form-control form-control-sm"
                         style={{color: "red"}}
                         value={props.result.total}
                         id="total"
                         type="text"
                         disabled/>

                  <label htmlFor="electricity_r">Электричество (Грн)</label>
                  <input name="electricity_r"
                         className="form-control form-control-sm"
                         value={props.result.electricity}
                         id="electricity_r"
                         type="text"
                         disabled/>

                  <label htmlFor="gaz_r">Газ (Грн)</label>
                  <input name="gaz_r"
                         className="form-control form-control-sm"
                         value={props.result.gaz}
                         id="gaz_r"
                         type="text"
                         disabled/>

                  <label htmlFor="water_r">Вода (Грн)</label>
                  <input name="water_r"
                         className="form-control form-control-sm"
                         value={props.result.water}
                         id="water_r"
                         type="text"
                         disabled/>

                  <label htmlFor="heat_r">Отопление (Грн)</label>
                  <input name="heat_r"
                         className="form-control form-control-sm"
                         value={props.result.heat}
                         id="heat_r"
                         type="text"
                         disabled/>

                  <label htmlFor="utilities_r">Комуслуги (Грн)</label>
                  <input name="utilities_r"
                         className="form-control form-control-sm"
                         value={props.result.utilities}
                         id="utilities_r"
                         type="text"
                         disabled/>

                  <label htmlFor="intercom_r">Домофон (Грн)</label>
                  <input name="intercom_r"
                         className="form-control form-control-sm"
                         value={props.result.intercom}
                         id="intercom_r"
                         type="text"
                         disabled/>
                </div>
              </div>
              }
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-12 mt-5">
              <h4 style={{color: "#ff471a"}}>Тариф не установлен!</h4>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Counter;






