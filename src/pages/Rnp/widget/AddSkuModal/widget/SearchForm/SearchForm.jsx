import { ConfigProvider, Form, Flex, Input, Button } from "antd"
import styles from "./SearchForm.module.css"
import { search } from "../../../icons"

function SearchForm() {
  const [form] = Form.useForm();
  return (
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#5329FF',
                fontFamily: 'Mulish',
                fontSize: 16,
                controlHeightLG: 45
            },
            components: {
                Input: {
                    activeBorderColor: '#5329FF',
                    hoverBorderColor: '#5329FF'
                }
            }
        }}
    >
      <Form form={form} onFinish={console.log} className={styles.search}>
        <Flex gap={12}>
          <Form.Item name='search' className={styles.search__input}>
            <Input
              placeholder='Поиск товара'
              size='large'
              name='search'
              // value={inputValue}
              // onChange={(e) => setInputValue(e.target.value)}
              // onKeyDown={(e) => { searchSubmitHandler(e) }}
              
            />
          </Form.Item>
          <Button
            size='large'
            type='primary'
            htmlType='submit'
            className={styles.search__button}
            icon={search}
            loading={false}
          >
              Найти
          </Button>
        </Flex>
      </Form>
    </ConfigProvider>
  )
}

export default SearchForm