import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTotalAmmount } from "../action";

function Calculator() {
  const { riskTitle, riskTable, selectedRisk, totalAmmount } = useSelector(state => state);
  const dispatch = useDispatch();
  const SKIP_LABEL = "Risk";
  let labels;
  let tableValue;
  
  const BondsAmount = useRef(null);
  const LargeCapAmount = useRef(null);
  const MidCapAmount = useRef(null);
  const ForeignAmount = useRef(null);
  const SmallCapAmount = useRef(null);

  const BondsDiff = useRef(null);
  const LargeCapDiff = useRef(null);
  const MidCapDiff = useRef(null);
  const ForeignDiff = useRef(null);
  const SmallCapDiff = useRef(null);

  const BondsNewAmount = useRef(null);
  const LargeCapNewAmount = useRef(null);
  const MidCapNewAmount = useRef(null);
  const ForeignNewAmount = useRef(null);
  const SmallCapNewAmount = useRef(null);

  const riskCalculatorTransfers = useRef(null);

  const focusInputs = (reference) => {
      let Bonds = parseInt(BondsAmount.current.value);
      let LargeCap = parseInt(LargeCapAmount.current.value);
      let MidCap = parseInt(MidCapAmount.current.value);
      let Foreign = parseInt(ForeignAmount.current.value);
      let SmallCap = parseInt(SmallCapAmount.current.value);
    if(parseInt(reference.current.value) < 0){
      reference.current.style.borderColor = 'red';
      riskCalculatorTransfers.current.style.color = 'red';
      riskCalculatorTransfers.current.value = 'Please use only positive digits or zero when entering current amounts. Please enter all inputs correctly.';
      dispatch(setTotalAmmount(0));
    } else {
      reference.current.style.borderColor = 'black';
    }
    
    if (selectedRisk> 0 && Bonds  >= 0 & LargeCap >= 0 && MidCap >= 0 && Foreign >= 0 && SmallCap >= 0) {
      let total = Bonds+LargeCap+MidCap+Foreign+ SmallCap;
      setValidInput();
      dispatch(setTotalAmmount(total));
    }
  };

  const setValidInput = () => {
    riskCalculatorTransfers.current.value = '';
    riskCalculatorTransfers.current.style.color = 'black';
  }

  const rebalance = () => {
    const percents = riskTable.filter(r => r.Risk == selectedRisk)[0];
    BondsNewAmount.current.value = percentCalc(totalAmmount, percents.Bonds);
    LargeCapNewAmount.current.value = percentCalc(totalAmmount, percents.LargeCap);
    MidCapNewAmount.current.value = percentCalc(totalAmmount, percents.MidCap);
    ForeignNewAmount.current.value = percentCalc(totalAmmount, percents.Foreign);
    SmallCapNewAmount.current.value = percentCalc(totalAmmount, percents.SmallCap);

    BondsDiff.current.value =    BondsAmount.current.value - BondsNewAmount.current.value;
    LargeCapDiff.current.value = LargeCapAmount.current.value - LargeCapNewAmount.current.value;
    MidCapDiff.current.value =   MidCapAmount.current.value - MidCapNewAmount.current.value;
    ForeignDiff.current.value =  ForeignAmount.current.value - ForeignNewAmount.current.value;
    SmallCapDiff.current.value = SmallCapAmount.current.value - SmallCapNewAmount.current.value;
    riskCalculatorTransfers.current.value = ' * Work in progress';

    BondsDiff.current.style.color = parseInt(BondsDiff.current.value) < 0 ? 'red': 'green'; 
    LargeCapDiff.current.style.color = parseInt(LargeCapDiff.current.value) < 0 ? 'red': 'green'; 
    MidCapDiff.current.style.color = parseInt(MidCapDiff.current.value) < 0 ? 'red': 'green';
    ForeignDiff.current.style.color = parseInt(ForeignDiff.current.value) < 0 ? 'red': 'green'; 
    SmallCapDiff.current.style.color = parseInt(SmallCapDiff.current.value) < 0 ? 'red': 'green';

    BondsNewAmount.current.style.color = 'blue'; 
    LargeCapNewAmount.current.style.color = 'blue';
    MidCapNewAmount.current.style.color = 'blue';
    ForeignNewAmount.current.style.color = 'blue';
    SmallCapNewAmount.current.style.color = 'blue';
  };

  const percentCalc = (totalAmount, percent) => totalAmount * percent / 100;

  if (riskTitle && riskTable) {
    labels = riskTitle.map(label => {
      if (label !== SKIP_LABEL) {
        return <th key={label.trim()}>{label.replace("%", "")}</th>;
      }
    });

    tableValue = riskTable
      .filter(r => r.Risk == selectedRisk)
      .map(risk => {
        return (
          <tr key={`risk-${risk.Risk}`}>
            <th>{risk.Bonds}%</th>
            <th>{risk.LargeCap}%</th>
            <th>{risk.MidCap}%</th>
            <th>{risk.Foreign}%</th>
            <th>{risk.SmallCap}%</th>
          </tr>
        );
      });
  }
  return (
    <div className="risk-selector-container">
      <div className="risk-calculator-label">Personalized Portfolio</div>
      <div className="risk-calculator-label-container">
        <div className="risk-calculator-label-risk">Risk Level {selectedRisk}</div>
      </div>
      <div>
        <table className="customers risk-size">
          <thead>
            <tr>{labels}</tr>
          </thead>
          <tbody>{tableValue}</tbody>
        </table>
      </div>
      <div className="currentInvestmentContainer">
        Please Enter Your Current Portfolio
        <button
          style={totalAmmount !== 0 && selectedRisk !== 0?  {opacity: 1}: {}}
          className="button rebalance-button"
          type="button"
          onClick={rebalance}
          disabled = { totalAmmount === 0 && selectedRisk !== 0 ? 'disabled': null}
        > Rebalance </button>
      </div>
      <div className="risk-calculator-input-container">
        <table className="customers">
          <thead>
            <tr>
              <td colSpan="2">Current Amount</td>
              <td>Difference</td>
              <td>New Amount</td>
              <td colSpan="2">Recommended Transfers</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bonds</td>
              <td>
                <input
                  ref={BondsAmount}
                  onBlur={() => focusInputs(BondsAmount)}
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={BondsDiff}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={BondsNewAmount}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td rowSpan="5"  >
                <textarea 
                  className="risk-calculator-transfers" 
                  ref={riskCalculatorTransfers} 
                  disabled="disabled"/>
              </td>
            </tr>
            <tr>
              <td>Large Cap</td>
              <td>
                <input
                  ref={LargeCapAmount}
                  onBlur={() => focusInputs(LargeCapAmount)}
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={LargeCapDiff}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={LargeCapNewAmount}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
            </tr>
            <tr>
              <td>Mid Cap</td>
              <td>
                <input
                  ref={MidCapAmount}
                  onBlur={() => focusInputs(MidCapAmount)}
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={MidCapDiff}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={MidCapNewAmount}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
            </tr>
            <tr>
              <td>Foreign</td>
              <td>
                <input
                  ref={ForeignAmount}
                  onBlur={() => focusInputs(ForeignAmount)}
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={ForeignDiff}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={ForeignNewAmount}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
            </tr>
            <tr>
              <td>Small Cap</td>
              <td>
                <input
                  ref={SmallCapAmount}
                  onBlur={() => focusInputs(SmallCapAmount)}
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={SmallCapDiff}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={SmallCapNewAmount}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Calculator;
