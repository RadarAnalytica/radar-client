import React from 'react';
import styles from './chartControls.module.css';
import { Checkbox, ConfigProvider, Tooltip } from 'antd';
import { ChartControlConfig } from '../../../shared';

interface ChartControl extends ChartControlConfig {
  isActive: boolean;
}

interface ChartControlsProps {
  chartControls: ChartControl[];
  setChartControls: React.Dispatch<React.SetStateAction<ChartControl[]>>;
}

const ChartControls: React.FC<ChartControlsProps> = ({ chartControls, setChartControls }) => {
  const chartControlsChangeHandler = (e: any) => {
    const { value, checked } = e.target;
    setChartControls([...chartControls.map(i => {
      if (i.engName === value) {
        return {
          ...i,
          isActive: checked
        };
      } else {
        return i;
      }
    })]);
  };

  const deselectButtonClickHandler = () => {
    setChartControls([...chartControls].map(i => ({ ...i, isActive: false })));
  };

  const selectAllButtonClickHandler = () => {
    setChartControls([...chartControls].map(i => ({ ...i, isActive: true })));
  };

  return (
    <div className={styles.controls}>
      {chartControls && chartControls.map((i, id) => {
        return (
          <div 
            className={styles.controls__controlWrapper} 
            key={id}
            style={{ '--checkbox-color': i.color } as React.CSSProperties}
          >
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: i.color,
                  controlInteractiveSize: 20,
                }
              }}
            >
              <Checkbox
                checked={i.isActive}
                value={i.engName}
                className={styles.controls__checkbox}
                onChange={chartControlsChangeHandler}
              >
                <label className={styles.controls__label}>
                  {i.ruName}
                  {i.isControlTooltip &&
                    <ConfigProvider
                      theme={{
                        token: {
                          colorText: '#1A1A1A',
                          colorTextLightSolid: '#1A1A1A',
                        }
                      }}
                    >
                      <Tooltip
                        title={i.controlTooltipText}
                        arrow={false}
                        color='white'
                      >
                        <div className={styles.controls__tooltipWrapper}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                            <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                          </svg>
                        </div>
                      </Tooltip>
                    </ConfigProvider>
                  }
                </label>
              </Checkbox>
            </ConfigProvider>
          </div>
        );
      })}
      {chartControls.some(_ => _.isActive) ?
        <button className={styles.controls__deselectButton} onClick={deselectButtonClickHandler}>
          Снять все
        </button>
        :
        <button className={styles.controls__deselectButton} onClick={selectAllButtonClickHandler}>
          Включить все
        </button>
      }
    </div>
  );
};

export default ChartControls;

