export default function filterData(tableValue) {
    let charDAta = [];
    if(tableValue){
        const labels = Object.keys(tableValue);
        charDAta = [
          { date: labels[1], value: tableValue[labels[1]] },
          { date: labels[2], value: tableValue[labels[2]] },
          { date: labels[3], value: tableValue[labels[3]] },
          { date: labels[4], value: tableValue[labels[4]] },
          { date: labels[5], value: tableValue[labels[5]] },
        ]
      }
      return charDAta;
}