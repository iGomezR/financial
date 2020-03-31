import React from "react";
import {
  Link
} from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setRiskSelection } from '../../action/index';

export const RickInput = () => {
  const { selectedRisk, riskLevel } = useSelector(state => state);
  const styleBtn = {opacity: 1};
  const dispatch = useDispatch();

  let risklabelVal = riskLevel.map(level => {
    let style = {backgroundColor: '#e6ff3f'};
    return (<li key={`li-${level}`} onClick={()=> dispatch(setRiskSelection(level))} style={selectedRisk === level ? style: {}}>{level}</li>);
  });
  
return (
  <div >
    <div className="risk-selector-header-labels">
      <div className="risk-label-select">
        Please Select A Risk Level For Your Investment Portfolio
      </div>
      <div className="risk-label-levels">
        <div className="risk-label">Low</div>
        <div className="risk-label">High</div>
      </div>
    </div>
    <div className="risk-selector-button-container">
      <div className="risk-selector">
        <ul className="risk-selector-ul">
          {risklabelVal}
        </ul>
      </div>
      <div className="continue" className="button" style={selectedRisk !== 0? styleBtn: {}}>
        <Link to="/calculator">Calculator</Link>
        
      </div>
    </div>
  </div>
)};
