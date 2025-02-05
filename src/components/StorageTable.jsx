import React from "react";
import { formatPrice } from "../service/utils";
import SeeMoreButton from "./SeeMoreButton";

const formatNumber = (num) => typeof num === "number" ? num.toLocaleString("ru-RU") : num;

const TableRow = ({ values }) => {
  return (
    <div className='d-flex'>
      {values
        ? values.map((val, i) => {
          return (
            <span
              className='col fin-row'
              key={i}
              style={
                i === 0
                  ? { textAlign: "left", minWidth: "150px" }
                  : i === 1
                    ? { fontWeight: 700, textAlign: "left" }
                    : i > 1
                      ? { textAlign: "right", fontWeight: 700 }
                      : { fontWeight: 700, textAlign: "right" }
              }
            >
              {(i === 1 || i === 2) && val !== "-"
                ? `${formatNumber(Number(val))} ₽`
                : i === 3
                  ? `${formatNumber(Number(val))} шт.`
                  : i === 1 && val === "-"
                    ? "0 ₽"
                    : val}
            </span>
          );
        })
        : null}
    </div>
  );
};
const StorageTable = ({
  title,
  data,
  titles,
  subtitles,
  wbData,
  dataDashBoard,
}) => {
  return (
    <div className='storage-table mt-3'>
      {!dataDashBoard ? (
        <div
          className='d-flex flex-column align-items-center justify-content-center'
          style={{ height: "100%", paddingTop: "20%" }}
        >
          <span className='loader'></span>
        </div>
      ) : (
        <div style={{ display: "block" }}>
          <div className='storage-table-title-element'>
            <div>
              <p className='fw-bold numbers mb-2'>{title}</p>
            </div>

            <div>
              <SeeMoreButton path='/orders-map' />
            </div>
          </div>

          <div className='d-flex'>
            {titles &&
              titles.map((t, i) => (
                <span
                  className='col fin-row'
                  style={
                    i === 0
                      ? {
                        textAlign: "left",
                        fontWeight: "bold",
                        minWidth: "150px",
                      }
                      : i === 1
                        ? { fontWeight: 700, textAlign: "left" }
                        : i > 1
                          ? { textAlign: "right", fontWeight: 700 }
                          : { fontWeight: 700, textAlign: "right" }
                  }
                  key={i}
                >
                  {t}
                </span>
              ))}
          </div>
          <div className='d-flex  clue-text'>
            {subtitles &&
              subtitles.map((t, i) => (
                <span
                  className='col fin-row'
                  style={
                    i === 0
                      ? {
                        textAlign: "left",
                        fontWeight: "bold",
                        minWidth: "150px",
                      }
                      : i === 1
                        ? { fontWeight: 400, textAlign: "left" }
                        : i > 1
                          ? { textAlign: "right", fontWeight: 400 }
                          : { fontWeight: 400, textAlign: "right" }
                  }
                  key={i}
                >
                  {t}
                </span>
              ))}
          </div>
          {data &&
            data.map((item, i) => {
              let values = item ? Object.values(item) : [];

              return <TableRow key={i} values={values} />;
            })}
        </div>
      )}
    </div>
  );
};

export default StorageTable;
