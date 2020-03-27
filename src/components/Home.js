import React from 'react';

import { useSelector } from "react-redux";

import { RickInput } from './riskInput/index';
import { Table } from './table/index';

function Home() {
  const { riskLevel, riskTitle, riskTable, selectedRisk } = useSelector(state => state);
;
  return (
    <div id="risk-selector-container">
      <RickInput riskLevel={riskLevel}/>
      <div className="table-container">
        <Table data={{riskTitle, riskTable, selectedRisk}}/>
        <div id="view-logo">
          {/* <img src="../app/assets/images/donutlogo.png"/> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
