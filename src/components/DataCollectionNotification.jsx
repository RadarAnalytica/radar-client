import React from "react";
import DataCollectionPreview from "../assets/DataCollectionPreview";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

const DataCollectionNotification = ({ title }) => {
  return (
    <div className='dashboard-page'>
      <div className='dashboard-content pb-3'>
        <div>
          <div className='container dash-container pb-0 pt-0 d-flex flex-column' style={{padding: '0 52px 0 16px', marginTop: '16px'}}>
            <div className='p-3 selfcost-warning w-100'>
              <div className='d-flex align-items-center gap-2'>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    width='30'
                    height='30'
                    rx='5'
                    fill='#00B69B'
                    fillOpacity='0.1'
                  />
                  <path
                    d='M14.013 18.2567L13 7H17L15.987 18.2567H14.013ZM13.1818 23V19.8454H16.8182V23H13.1818Z'
                    fill='#00B69B'
                  />
                </svg>
                <span className='fw-bold'>{title}</span>
                {/* <span className="fw-bold">Мы уже начали собирать все данные по вашему магазину, обычно это не занимает более 30 минут.</span> */}
              </div>
            </div>
          </div>
          <div style={{ paddingRight: '36px'}}>
            <DataCollectionPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCollectionNotification;
