import { useEffect } from "react";
import { ConfigProvider, Form, Flex, Input, Button } from "antd";
import styles from "./AddRnpModalSearch.module.css";
import { search } from "../../../icons";

function AddRnpModalSearch({
  loading,
  submitSearch
}) {
  const [form] = Form.useForm();
  const searchValue = Form.useWatch('search', form);

  const finishHandler = (data) => {
    const value = data.search.trim();
    if (!value){
      return;
    }
    submitSearch(value);
  };

  useEffect(() => {
    let timeout = null;

    if (!searchValue) {
      timeout = setTimeout(() => {
        submitSearch(null);
      }, 1000);
    } else {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);

  }, [searchValue]);

  return (
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#5329FF',
                fontSize: 14,
                contentFontSizeLG: 16,
                controlHeightLG: 38,
                fontFamily: 'Mulish',
            },
            components: {
              Form: {
                itemMarginBottom: 0
              },
              Input: {
                colorBorder: '#5329FF1A',
                activeBorderColor: '#5329FF',
                hoverBorderColor: '#5329FF'
              },
              Button: {
                paddingInline: 12,
                fontSize: 14,
                fontWeight: 600,
                controlHeightLG: 38,
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
            loading={loading}
            style={{ fontSize: 14 }}
            className={styles.search__button}
          >
              Найти
          </Button>
        </Flex>
      </Form>
    </ConfigProvider>
  );
}

export default AddRnpModalSearch;
