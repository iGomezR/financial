
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