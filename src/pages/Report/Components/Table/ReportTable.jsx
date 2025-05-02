import { ConfigProvider, Divider, Radio, Table } from 'antd';
import styles from './ReportTable.module.css';

export default function ReportTable({columns, data}) {
  console.log('data', data)




  return (
    <div className={styles.tableContainer}>
<ConfigProvider
// font-weight: 500;
// font-size: 16px;
// color: #8c8c8c;
  theme={{
    components: {
      Table: {
        headerColor: '#8c8c8c',
        headerBg: '#f7f6fe',
        headerBorderRadius: 20,
        cellFontSize: 16,
        borderColor: '#e8e8e8',
        cellPaddingInline: 20,
        cellPaddingBlock: 8
      },
      Checkbox: {
        colorBorder: '#ccc',
        colorPrimary: '#5329ff',
        colorPrimaryBorder: '#5329ff',
        colorPrimaryHover: '#5329ff'
      }
    },
  }}
>
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      tableLayout='fixed'
      rowSelection={{
        type: 'checkbox'
      }}
      scroll={true}
      ></Table>
      </ConfigProvider>
    </div>
  )
}