import React from 'react';
import styles from './chartControls.module.css';
import { Checkbox, ConfigProvider, Tooltip } from 'antd';
import { ChartControlConfig } from '../../../shared';
import TooltipInfo from '@/components/TooltipInfo';

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
                  {i.ruName} <TooltipInfo text={i.tooltipText} />
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

