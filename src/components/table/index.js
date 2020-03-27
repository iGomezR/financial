import React from "react";

export const Table = (props) => {
    if(!props) return <div/>;
    let {riskTitle, riskTable, selectedRisk} = props.data;
    let labels;
    let tableValue;
    if(riskTitle && riskTable){
        labels = riskTitle.map(label => <td key={label.trim()}>{label}</td>);
        tableValue = riskTable.map(risk => {
            return(
                <tr key={`risk-${risk.Risk}`} className={selectedRisk == risk.Risk ? 'row-hover': 'li-unselected'}>
                    <td>{risk.Risk}</td>
                    <td>{risk.Bonds}</td>
                    <td>{risk.LargeCap}</td>
                    <td>{risk.MidCap}</td>
                    <td>{risk.Foreign}</td>
                    <td>{risk.SmallCap}</td>
                </tr>
            );
        });
    }
    
    return(
        <table id="customers">
            <tbody>
                <tr>
                {labels}
                </tr>
            </tbody>
            <tbody>
                {tableValue}
            </tbody>
      </table>
    );
};
