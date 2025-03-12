import React from "react";
import { formatPrice } from "../service/utils";
import TooltipInfo from "../components/TooltipInfo";

export const TableRow = ({ values, percent, sign, tableType }) => {
  // const green = require("../assets/greenarrow.png");
  // const red = require("../assets/redarrow.png");

  return (
    <div className='d-flex'>
      {values
        ? values.map((val, i) => {
            return (
              <span
                className={i < 2 ? "col fin-row" : "col-2 fin-row"}
                key={i}
                style={
                  i === 0
                    ? { textAlign: "left" }
                    : i > 1
                    ? { textAlign: "right", fontWeight: 400 }
                    : { fontWeight: 700, textAlign: "right" }
                }
              >
                {(percent || percent === 0 || !percent) && i === 2 ? (
                  <span>
                    {percent && percent > 0 ? (
                      <svg
                        style={{ height: "1.25vh", marginRight: "4px" }}
                        viewBox='0 0 20 12'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M14 0L16.29 2.29L11.41 7.17L7.41 3.17L0 10.59L1.41 12L7.41 6L11.41 10L17.71 3.71L20 6V0H14Z'
                          fill='#00B69B'
                        />
                      </svg>
                    ) : (
                      <svg
                        style={{ height: "1.25vh", marginRight: "4px" }}
                        viewBox='0 0 20 12'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M14 12L16.29 9.71L11.41 4.83L7.41 8.83L0 1.41L1.41 0L7.41 6L11.41 2L17.71 8.29L20 6V12H14Z'
                          fill='#F93C65'
                        />
                      </svg>
                    )}
                  </span>
                ) : // <img src={percent && percent > 0 ? green : red} alt="" className='me-2' style={{ width: '2.5vh', }} />
                null}
                <span
                  style={
                    percent <= 0 && i > 1
                      ? { fontWeight: 700, fontSize: "1.75vh", color: "red" }
                      : !percent && i > 1
                      ? { fontWeight: 700, fontSize: "1.75vh", color: "red" }
                      : percent > 0 && i > 1
                      ? {
                          fontWeight: 700,
                          fontSize: "1.75vh",
                          color: "rgba(0, 182, 155, 1)",
                        }
                      : {}
                  }
                >
                  {/* {i === 0 && tableType === 1 && val === "Выручка" && (
                    <span style={{ display: "flex", alignItems: "center" }}>
                      {val}
                      <TooltipInfo text='Маржинальная прибыль — это разница между выручкой и переменными затратами. Маржинальность или рентабельность по маржинальной прибыли — это отношение маржинальной прибыли к выручке.' />
                    </span>
                  )}

                  {i === 1
                    ? typeof val === "string"
                      ? val
                      : formatPrice(val) + (sign ? sign : " ₽")
                    : i > 1 && val
                    ? formatPrice(val) + " %"
                    : i > 1
                    ? 0 + " %"
                    : val} */}
                  {i === 0 &&
                  tableType === 1 &&
                  (val === "Выручка" ||
                    val === "Маржинальная стоимость" ||
                    val === "Валовая прибыль" ||
                    val === "Чистая прибыль" ||
                    val === "ROI" ||
                    val === "Рентабельность ВП" ||
                    val === "Рентабельность ОП") ? (
                    <>
                      {val}
                      {val === "Выручка" && (
                        <TooltipInfo text='Сумма, заработанная при продаже товаров' />
                      )}
                      {val === "Маржинальная стоимость" && (
                        <TooltipInfo text='Разница между выручкой и переменными расходами' />
                      )}
                      {val === "Валовая прибыль" && (
                        <TooltipInfo text='Разность между выручкой и себестоимостью продаж' />
                      )}
                      {val === "Чистая прибыль" && (
                        <TooltipInfo text='Прибыль, остающаяся после уплаты налогов, сборов, отчислений' />
                      )}
                      {val === "ROI" && (
                        <TooltipInfo text='Рассчитана как отношение чистой прибыли к суммарным расходам (себестоимость продаж + расходы на рекламу, логистику, хранение, штрафы, комиссию)' />
                      )}
                      {val === "Рентабельность ВП" && (
                        <TooltipInfo text='Отношение валовой прибыли к суммарной выручке' />
                      )}
                      {val === "Рентабельность ОП" && (
                        <TooltipInfo text='Отношение операционной прибыли к суммарной выручке' />
                      )}
                    </>
                  ) : i === 1 ? (
                    typeof val === "string" ? (
                      val
                    ) : (
                      formatPrice(val) + (sign ? sign : " ₽")
                    )
                  ) : i > 1 && val ? (
                    formatPrice(val) + " %"
                  ) : i > 1 ? (
                    0 + " %"
                  ) : (
                    val
                  )}
                </span>
              </span>
            );
          })
        : null}
    </div>
  );
};

const FinanceTable = ({
  title,
  data,
  sign,
  wbData,
  dataDashBoard,
  tableType,
}) => {
  return (
    <div className='finance-table'>
      {!dataDashBoard ? (
        <div
          className='d-flex flex-column align-items-center justify-content-center'
          style={{ height: "100%", paddingTop: "20%" }}
        >
          <span className='loader'></span>
        </div>
      ) : (
        <div>
          <p className='fw-bold numbers mb-2'>{title}</p>
          {data &&
            data.map((item, i) => {
              let values = item ? Object.values(item) : [];
              let keys = item ? Object.keys(item) : [];
              let rate = keys ? keys.find((el) => el === "rate") : null;
              return (
                <TableRow
                  key={i}
                  values={values}
                  sign={sign}
                  percent={rate ? item["rate"] : null}
                  tableType={tableType}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default FinanceTable;
