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
                    <th>{risk.Risk}</th>
                    <th>{risk.Bonds}</th>
                    <th>{risk.LargeCap}</th>
                    <th>{risk.MidCap}</th>
                    <th>{risk.Foreign}</th>
                    <th>{risk.SmallCap}</th>
                </tr>
            );
        });
    }
    
    return(
        <table className="customers principal-size">
            <thead>
                <tr>
                {labels}
                </tr>
            </thead>
            <tbody>
                {tableValue}
            </tbody>
      </table>
    );
};
