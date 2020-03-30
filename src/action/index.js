
export const setRiskSelection = (level) => {
    return {
        type: 'SET_RISK',
        payload: {
            level
        }
    }
     
};

export const setTotalAmmount = (totalAmmount) => {
    return {
        type: 'SET_AMOUNT',
        payload: {
            totalAmmount
        }
    }
     
};

export const getChartData = () => {
    return {
        type: 'SET_CHART_DATA'
    }
     
};