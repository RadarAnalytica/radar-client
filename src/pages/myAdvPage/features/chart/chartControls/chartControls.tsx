import React, { useCallback, useMemo } from 'react';
import styles from './chartControls.module.css';
import { Checkbox, ConfigProvider, CheckboxChangeEvent } from 'antd';
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
  const chartControlsChangeHandler = useCallback((e: CheckboxChangeEvent) => {
    const { value, checked } = e.target;
    setChartControls((prevControls) => {
      if (!prevControls || prevControls.length === 0) return prevControls;
      return prevControls.map(i => {
        if (i.engName === value) {
          return {
            ...i,
            isActive: checked
          };
        } else {
          return i;
        }
      });
    });
  }, [setChartControls]);

  const deselectButtonClickHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setChartControls((prevControls) => {
      if (!prevControls || prevControls.length === 0) return prevControls;
      return prevControls.map(i => ({ ...i, isActive: false }));
    });
  }, [setChartControls]);

  const selectAllButtonClickHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setChartControls((prevControls) => {
      if (!prevControls || prevControls.length === 0) return prevControls;
      return prevControls.map(i => ({ ...i, isActive: true }));
    });
  }, [setChartControls]);

  const hasActiveControls = useMemo(() => {
    return chartControls && chartControls.length > 0 && chartControls.some(_ => _.isActive);
  }, [chartControls]);

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
                <span className={styles.controls__label}>
                  {i.ruName} <TooltipInfo text={i.tooltipText} style={{ fontSize: '12px' }} />
                </span>
              </Checkbox>
            </ConfigProvider>
          </div>
        );
      })}
      {hasActiveControls ? (
        <button 
          type="button"
          className={styles.controls__deselectButton} 
          onClick={deselectButtonClickHandler}
        >
          Снять все
        </button>
      ) : (
        <button 
          type="button"
          className={styles.controls__deselectButton} 
          onClick={selectAllButtonClickHandler}
        >
          Включить все
        </button>
      )}
    </div>
  );
};

export default ChartControls;

