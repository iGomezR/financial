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

  const focusInputs = () => {
    if (
      BondsAmount.current.value &&
      LargeCapAmount.current.value &&
      MidCapAmount.current.value &&
      ForeignAmount.current.value &&
      SmallCapAmount.current.value
    ) {
      let total =
        parseInt(BondsAmount.current.value) +
        parseInt(LargeCapAmount.current.value) +
        parseInt(MidCapAmount.current.value) +
        parseInt(ForeignAmount.current.value) +
        parseInt(SmallCapAmount.current.value);
        dispatch(setTotalAmmount(total));
    }
  };

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
        return <td key={label.trim()}>{label.replace("%", "")}</td>;
      }
    });

    tableValue = riskTable
      .filter(r => r.Risk == selectedRisk)
      .map(risk => {
        return (
          <tr key={`risk-${risk.Risk}`}>
            <td>{risk.Bonds}%</td>
            <td>{risk.LargeCap}%</td>
            <td>{risk.MidCap}%</td>
            <td>{risk.Foreign}%</td>
            <td>{risk.SmallCap}%</td>
          </tr>
        );
      });
  }
  return (
    <div id="risk-selector-container">
      <div className="risk-calculator-label">Personalized Portfolio</div>
      <div className="risk-calculator-label-container">
        <div className="risk-calculator-label-risk">Risk Level {selectedRisk}</div>
      </div>
      <div id="customRiskTable" className="jsgrid">
        <table id="customers">
          <tbody>
            <tr>{labels}</tr>
          </tbody>
          <tbody>{tableValue}</tbody>
        </table>
      </div>
      <div id="currentInvestmentContainer">
        Please Enter Your Current Portfolio
        <button
          id="rebalance-button"
          style={totalAmmount !== 0?  {opacity: 1}: {}}
          className="button"
          type="button"
          onClick={rebalance}
          disabled = { totalAmmount === 0 ? 'disabled': null}
        > Rebalance </button>
      </div>
      <div className="risk-calculator-input-container">
        <table id="customers">
          <tbody>
            <tr>
              <td colSpan="2">Current Amount</td>
              <td>Difference</td>
              <td>New Amount</td>
              <td colSpan="2">Recommended Transfers</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Bonds</td>
              <td>
                <input
                  ref={BondsAmount}
                  onBlur={() => focusInputs()}
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={BondsDiff}
                  onBlur={() => focusInputs()}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={BondsNewAmount}
                  onBlur={() => focusInputs()}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td rowSpan="5">
                <div className="risk-calculator-transfers"></div>
              </td>
            </tr>
            <tr>
              <td>Large Cap</td>
              <td>
                <input
                  ref={LargeCapAmount}
                  onBlur={() => focusInputs()}
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={LargeCapDiff}
                  onBlur={() => focusInputs()}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={LargeCapNewAmount}
                  onBlur={() => focusInputs()}
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
                  onBlur={() => focusInputs()}
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={MidCapDiff}
                  onBlur={() => focusInputs()}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={MidCapNewAmount}
                  onBlur={() => focusInputs()}
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
                  onBlur={() => focusInputs()}
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={ForeignDiff}
                  onBlur={() => focusInputs()}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={ForeignNewAmount}
                  onBlur={() => focusInputs()}
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
                  onBlur={() => focusInputs()}
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={SmallCapDiff}
                  onBlur={() => focusInputs()}
                  disabled="disabled"
                  type="text"
                  className="risk-calculator-main-input"
                />
              </td>
              <td>
                <input
                  ref={SmallCapNewAmount}
                  onBlur={() => focusInputs()}
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
