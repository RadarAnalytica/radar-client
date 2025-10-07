import React, { useState, useContext } from 'react';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import CalculateForm from '../containers/calculate/CalculateForm';
import CalculateResults from '../containers/calculate/CalculateResults';
import NoSubscriptionPage from './NoSubscriptionPage';
import AuthContext from '../service/AuthContext';

const Calculate = () => {
    const { user } = useContext(AuthContext);
    const [sellPrice, setSellPrice] = useState(0);
    const [targetIncome, setTargetIncome] = useState(0);
    const [mpComission, setMpComission] = useState(0);
    const [mpLogistic, setMpLogistic] = useState(0);
    const [reverseLogistic, setReverseLogistic] = useState(0);
    const [buyinCost, setBuyinCost] = useState(0);
    const [logitics, setLogistics] = useState(0);
    const [wrapper, setWrapper] = useState(0);
    const [buyoutRate, setBuyoutRate] = useState(100);
    const [taxRate, setTaxRate] = useState(0);
    const [amortization, setAmortization] = useState(0);

    const [result, setResult] = useState({
        marginalProfit: 0,
        grossProfitMargin: 0,
        netProfit: 0,
        profitability: 0,
        targetAmount: 0,
    });

    const calculateMetrics = () => {
        // Calculate Marginal Profit
        const marginalProfit = (sellPrice - buyinCost - (sellPrice / 100 * mpComission) - mpLogistic - (taxRate * sellPrice / 100)) - (sellPrice - buyinCost - (sellPrice / 100 * mpComission) - mpLogistic - (taxRate * sellPrice / 100)) * ((100 - buyoutRate) / 5) / 100;

        // Calculate Gross Profit Margin
        const grossProfitMargin = ((marginalProfit) / sellPrice) * 100;

        // Calculate Net Profit
        const netProfit = (marginalProfit) - wrapper - amortization;

        // Calculate Profitability
        const profitability = (netProfit / sellPrice) * 100 * 2;

        const targetAmount = targetIncome / marginalProfit;

        setResult({
            marginalProfit,
            grossProfitMargin,
            netProfit,
            profitability,
            targetAmount
        });

        return {
            marginalProfit,
            grossProfitMargin,
            netProfit,
            profitability,
            targetAmount
        };
    };

    const handleCalculate = () => {
        const result = calculateMetrics();
        console.log(result); // You can display or utilize the result in any way you want
    };

    if (user?.subscription_status === 'expired') {
        return <NoSubscriptionPage title={'Калькулятор unit-экономики товара'} />;
      };

    return (
        <div className='calculate-page'>
            <MobilePlug />
      <SideNav />
            <div className="calculate-content pb-3">
                <TopNav title={'Калькулятор unit-экономики товара'} />
                <div className="calculate-container dash-container container">
                    <div className="row ps-1 pt-2">
                        <div className="col-8">
                            <CalculateForm
                                base={{
                                    sellPrice, setSellPrice, targetIncome, setTargetIncome
                                }}
                                mpCom={{
                                    mpComission, setMpComission, mpLogistic, setMpLogistic, reverseLogistic, setReverseLogistic
                                }}
                                selfCost={{
                                    buyinCost, setBuyinCost, logitics, setLogistics, wrapper, setWrapper
                                }}
                                additional={{
                                    buyoutRate, setBuyoutRate, taxRate, setTaxRate, amortization, setAmortization
                                }}
                                handleCalculate={handleCalculate}
                            />
                        </div>
                        <div className="col-4">
                            <CalculateResults result={result} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculate;
