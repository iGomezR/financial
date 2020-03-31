import React, {useState} from 'react';
import donut from "../assets/donutlogo.png";
import table from "../assets/chartlogo.jpg";
import { useSelector } from "react-redux";

import { RickInput } from './riskInput/index';
import { Table } from './table/index';
import PieHooks from './donut/pie';

function Home() {
  const { riskTitle, riskTable, selectedRisk, chartData } = useSelector(state => state);

  const [count, setCount] = useState(false);

  let toShow = count? <PieHooks data={chartData} width={500} height={500} innerRadius={60} outerRadius={100}/> :<Table data={{riskTitle, riskTable, selectedRisk}}/>;

  return (
    <div className="risk-selector-container">
      <RickInput />
      <div className={'graphic'}>
        { toShow }
      <button  className="view-logo" onClick={() => setCount(!count)}>
          <img src={count?table:donut} />
      </button>
      </div>
      
    </div>
  );
}

export default Home;
