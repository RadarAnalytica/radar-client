import React from "react";
import { formatPrice } from "../service/utils";
import GreenArrow from "../assets/greenarrow.svg";
import RedArrow from "../assets/redarrow.svg";
import { Tooltip } from "chart.js";
import TooltipInfo from "./TooltipInfo";

const ChartTableRow = ({ object }) => {
  const advertising = object?.name === "Реклама (ДРР (общий))";

  return (
    <div className='chart-table-row '>
      <div className='clue-text mb-2' style={{ fontSize: "14px" }}>
        {object.name}
        {object.name === "Реклама (ДРР (общий))" && (
          <TooltipInfo text='Отношение суммарных расходов на рекламу к выручке' />
        )}
        {object.name === "Комиссия (от выручки)" && (
          <TooltipInfo text='Отношение суммарной комиссии к выручке' />
        )}
        {object.name === "Логистика (от выручки)" && (
          <TooltipInfo text='Отношение суммарных расходов на логистику к выручке' />
        )}
      </div>

      <div className='d-flex justify-content-between'>
        <div className='container d-flex justify-content-between'>
          <div className='chart-row-data col'>
            <div style={{ display: "flex", gap: 10 }}>
              <p
                className='m-0 p-0 fw-bold'
                style={{ fontSize: "1.25vw !important" }}
              >
                {formatPrice(object.amount)} ₽
              </p>
              <div className='d-flex align-items-center mt-2'>
                {formatPrice(advertising ? object.percent : object.percentRate) > 0 ? (
                  <img
                    style={{ height: "1.25vh", marginRight: "4px" }}
                    src={GreenArrow}
                    alt=''
                  />
                ) : (
                  <img
                    style={{ height: "1.25vh", marginRight: "4px" }}
                    src={RedArrow}
                    alt=''
                  />
                )}
                <p
                  className='m-0 p-0 tiny-numbers'
                  style={
                    formatPrice(advertising ? object.percent : object.percentRate) <= 0
                      ? { color: "red" }
                      : { color: "rgb(0, 182, 155)" }
                  }
                >
                  {formatPrice(advertising ? object.percent : object.percentRate)} %
                </p>
              </div>
            </div>
            {/* <div className='mt-2'>
                            <img src={object.percentRate <= 0 ? redchart1 : greenchart1} alt="" />
                        </div> */}
          </div>
          <div className='row-chart col'>
            <div style={{ display: "flex", gap: 10 }}>
              <p
                className='m-0 p-0 fw-bold'
                style={{ fontSize: "1.25vw !important" }}
              >
                {formatPrice(advertising ? object.percentRate : object.percent)} %
              </p>
              <div className='d-flex align-items-center mt-2'>
                {formatPrice(object.percentRate2) > 0 ? (
                  <img
                    style={{ height: "1.25vh", marginRight: "4px" }}
                    src={GreenArrow}
                    alt=''
                  />
                ) : (
                  <img
                    style={{ height: "1.25vh", marginRight: "4px" }}
                    src={RedArrow}
                    alt=''
                  />
                )}
                <p
                  className='m-0 p-0 tiny-numbers'
                  style={
                    formatPrice(object.percentRate2) <= 0
                      ? { color: "red" }
                      : { color: "rgb(0, 182, 155)" }
                  }
                >
                  {formatPrice(object.percentRate2)} %
                </p>
              </div>
            </div>
            {/* <div className='mt-2'>
                            <img src={object.percentRate2 > 0 ? greenchart1 : redchart2} alt="" />
                        </div> */}
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  );
};

const ChartTable = ({ data, title, wbData, dataDashBoard, loading }) => {
  return (
    <div className='chart-table'>
      <p className='fw-bold numbers mb-2'>{title}</p>
      {!dataDashBoard || loading ? (
        <div
            style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            paddingTop: '20%',
            }}
        >
            <div
                className='d-flex flex-column align-items-center justify-content-center'
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            >
                <span className='loader'></span>
            </div>
        </div>
      ) : (
        <div>
          {data && data.map((obj, i) => <ChartTableRow object={obj} key={i} />)}
        </div>
      )}
    </div>
  );
};

export default ChartTable;
