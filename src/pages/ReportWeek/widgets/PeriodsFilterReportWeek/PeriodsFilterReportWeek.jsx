import { ConfigProvider, Popover, Button, Form, Checkbox} from 'antd';
import { useForm } from 'antd/es/form/Form';
import styles from './PeriodsFilterReportWeek.module.css';

function PeriodForm({periodOptions, setPeriod}) {

  const [form] = useForm();

  function formChangeHandler(){
    const data = form.getFieldsValue()
    setPeriod(() => {
      let result = [];
      for (const week in data){
        data[week] && result.push(Number(week))
      }
      return result
    })
  }

  function clearFormHandler(){
    form.resetFields();
    setPeriod([]);
  }
  
  const list = periodOptions.map((el, i) => (
    <div key={i} className={styles.item}>
      <Checkbox
        value={el.value}
        onChange={formChangeHandler}
      >
        {el.label}
      </Checkbox>
    </div>
  ));

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
      <Form form={form} className={styles.list}>
        <Button
          className={styles.item}
          type='button'
          onClick={clearFormHandler}
        >
          Все время
        </Button>
        {periodOptions.map((el, i) =>
          <Form.Item
            key={el.value}
            name={el.value}
            className={styles.list__item}
            valuePropName="checked"
            value={el.value}
            onChange={formChangeHandler}
            >
            <Checkbox>
              {el.label}
            </Checkbox>
          </Form.Item>)}
      </Form>
    </ConfigProvider>
  );
}


export default function PeriodsFilterReportWeek({period, periodOptions, setPeriod}) {

	return (
		<div>
			<div className={styles.title}>Период</div>
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
					content={<PeriodForm periodOptions={periodOptions} setPeriod={setPeriod}/>}
					trigger="click"
					placement="bottomLeft"
				>
					<Button
            className={styles.button}
						iconPosition="start"
						size="large"
					>
            {period?.length > 0 ? `Выбрано недель: ${period.length}` : 'Все время'}
            <span className="ant-select-arrow" unselectable="on"><svg className={styles.arrow} viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M2 2L14 14L26 2" stroke="" strokeWidth="4" strokeLinecap="round"></path></svg></span>
					</Button>
				</Popover>
			</ConfigProvider>
		</div>
	);
}
