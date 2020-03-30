import filterData from './filter';

const riskLevel = ['1','2','3','4','5','6','7','8','9','10'];
const riskTitle = ["Risk","Bonds %","Large Cap %","Mid Cap %","Foreign %","Small Cap %"];
const riskTable = [
    { "Risk": 1, "Bonds": 80, "LargeCap": 20, "MidCap": 0, "Foreign": 0, "SmallCap": 0 }, 
    { "Risk": 2, "Bonds": 70, "LargeCap": 15, "MidCap": 15, "Foreign": 0, "SmallCap": 0 }, 
    { "Risk": 3, "Bonds": 60, "LargeCap": 15, "MidCap": 15, "Foreign": 10, "SmallCap": 0 }, 
    { "Risk": 4, "Bonds": 50, "LargeCap": 20, "MidCap": 20, "Foreign": 10, "SmallCap": 0 }, 
    { "Risk": 5, "Bonds": 40, "LargeCap": 20, "MidCap": 20, "Foreign": 20, "SmallCap": 0 }, 
    { "Risk": 6, "Bonds": 35, "LargeCap": 25, "MidCap": 5, "Foreign": 30, "SmallCap": 5 }, 
    { "Risk": 7, "Bonds": 20, "LargeCap": 25, "MidCap": 25, "Foreign": 25, "SmallCap": 5 }, 
    { "Risk": 8, "Bonds": 10, "LargeCap": 20, "MidCap": 40, "Foreign": 20, "SmallCap": 10 }, 
    { "Risk": 9, "Bonds": 5, "LargeCap": 15, "MidCap": 40, "Foreign": 25, "SmallCap": 15 }, 
    { "Risk": 10, "Bonds": 0, "LargeCap": 5, "MidCap": 25, "Foreign": 30, "SmallCap": 40 }
];
let chartData = [
  { date: "Select Level", value: 20 },
  { date: "Select Level", value: 20 },
  { date: "Select Level", value: 20 },
  { date: "Select Level", value: 20 },
  { date: "Select Level", value: 20 },
];
const selectedRisk = 0;
const totalAmmount = 0;
const initialState = { riskLevel, riskTitle, riskTable, selectedRisk, totalAmmount, chartData };

function reducer(state = initialState, action){
  
switch (action.type) {
    case "SET_RISK":
      let { level } = action.payload;
      let { riskTable } = state;
      let chartData =  filterData(riskTable.filter(r => r.Risk == level)[0]);
      return {
        ...state, chartData, selectedRisk: level
      };
    case "SET_AMOUNT":
      let { totalAmmount } = action.payload;
      return {
        ...state, totalAmmount
      };
    
    default:
      return state;
  }
}
 
export default reducer;