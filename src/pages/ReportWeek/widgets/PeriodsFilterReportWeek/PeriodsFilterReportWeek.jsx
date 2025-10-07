import { ConfigProvider, Popover, Button, Form, Checkbox} from 'antd';
import { useForm } from 'antd/es/form/Form';
import styles from './PeriodsFilterReportWeek.module.css';

function PeriodForm({period, periodOptions, setPeriod}) {

  const [form] = useForm();

  function formChangeHandler(){
    const data = form.getFieldsValue();
    let result = [];
    for (const week in data){
      data[week] && result.push(Number(week));
    }
    setPeriod(result);
  }

  function checkAllHandler() {
    for (const check of periodOptions) {
      form.setFieldValue(check.value, periodOptions.length > period.length ? true : false);
    }
    formChangeHandler();
  }

  const indeterminate = periodOptions.length > 0 && period.length < periodOptions.length && period.length > 0;

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 0
          },
          Checkbox: {
            colorBorder: '#ccc',
            colorPrimary: '#5329ff',
            colorPrimaryBorder: '#5329ff',
            colorPrimaryHover: '#5329ff',
            fontSize: 16
          },
          Button: {
            fontSize: 16,
            colorPrimary: '#5329ff',
          }
        },
      }}
    >
      <div className={styles.list}>
        <Checkbox
          name='all'
          className={styles.list__item}
          onChange={checkAllHandler}
          indeterminate={indeterminate}
          defaultChecked={periodOptions.length === period.length}
        >
          Весь период
        </Checkbox>
        <Form form={form}>
          {periodOptions.map((el) =>
            <Form.Item
              key={el.value}
              className={styles.list__item}
              name={el.value}
              valuePropName="checked"
              value={el.value}
              onChange={formChangeHandler}
              // defaultChecked={period.includes(el.value) ? true : false}
              initialValue={period.includes(el.value) ? true : false}
            >
              <Checkbox>
                {el.label}
              </Checkbox>
            </Form.Item>)}
        </Form>
      </div>
    </ConfigProvider>
  );
}


export default function PeriodsFilterReportWeek({period, periodOptions, setPeriod}) {

	return (
		<div>
			<div className={styles.title}>Период:</div>
			<ConfigProvider
				theme={{
					token: {
						colorBorder: '#00000033',
						colorPrimary: '#E7E1FE',
					},
					components: {
						Popover: {
							borderRadiusXS: 8,
							boxShadowSecondary: '0 0 20px 0 rgba(0, 0, 0, 0.08)',
						},
						Button: {
							primaryColor: '#000',
              defaultBg: '#EAEAF1',
              defaultBorderColor: '#EAEAF1',
              defaultHoverBg: '#EAEAF1',
              defaultHoverBorderColor: '#EAEAF1',
              defaultHoverColor: '#000',
              defaultActiveBg: '#EAEAF1',
              defaultActiveBorderColor: '#EAEAF1',
              defaultActiveColor: 'rgba(0, 0, 0, 0.25)',
							paddingBlockLG: 11,
							paddingInlineLG: 11,
							defaultShadow: false,
							controlHeightLG: 38,
              borderRadiusLG: 8
						},
					},
				}}
			>
				<Popover
					arrow={false}
					content={<PeriodForm period={period} periodOptions={periodOptions} setPeriod={setPeriod}/>}
					trigger="click"
					placement="bottomLeft"
				>
					<Button
            className={styles.button}
						iconPosition="start"
						size="large"
					>
            {period.length === periodOptions.length ? 'Весь период' : `Выбрано недель: ${period.length}`}
            <span className="ant-select-arrow" unselectable="on"><svg className={styles.arrow} viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M2 2L14 14L26 2" stroke="" strokeWidth="4" strokeLinecap="round"></path></svg></span>
					</Button>
				</Popover>
			</ConfigProvider>
		</div>
	);
}
