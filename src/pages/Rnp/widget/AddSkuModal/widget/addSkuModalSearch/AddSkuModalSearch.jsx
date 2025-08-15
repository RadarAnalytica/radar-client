import { useEffect } from "react";
import { ConfigProvider, Form, Flex, Input, Button } from "antd"
import styles from "./AddSkuModalSearch.module.css"
import { search } from "../../../icons"

function AddSkuModalSearch({
  skuLoading,
  submitSearch
}) {
  const [form] = Form.useForm();
  const searchValue = Form.useWatch('search', form);

  const finishHandler = (data) => {
    const value = data.search.trim();
    if (!value){
      return
    }
    submitSearch(value);
  }

  useEffect(() => {
    let timeout = null;
    
    if (!searchValue) {
      timeout = setTimeout(() => {
        submitSearch(null);
      }, 1000);
    } else {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout)

  }, [searchValue])

  return (
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#5329FF',
                fontSize: 16,
                contentFontSizeLG: 16,
                controlHeightLG: 45,
            },
            components: {
              Form: {
                itemMarginBottom: 0
              },
              Input: {
                activeBorderColor: '#5329FF',
                hoverBorderColor: '#5329FF'
              },
              Button: {
                paddingInline: 12,
                fontWeight: 600
              }
            }
        }}
    >
      <Form form={form} onFinish={finishHandler} className={styles.search}>
        <Flex gap={12}>
          <Form.Item name='search' className={styles.search__input}>
            <Input
              placeholder='Поиск товара'
              size='large'
              name='search'
              allowClear={true}
            />
          </Form.Item>
          <Button
            size='large'
            type='primary'
            htmlType='submit'
            icon={search}
            loading={skuLoading}
          >
              Найти
          </Button>
        </Flex>
      </Form>
    </ConfigProvider>
  )
}

export default AddSkuModalSearch