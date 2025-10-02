import { Button, ConfigProvider, Flex } from 'antd'

const AddRnpModalFooter = ({ setIsAddRnpModalVisible, isDataLoading, submitDisabled, addProducts }) => {

    return (
        <Flex justify='end' gap={12}>
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 14,
                        borderRadius: 8,
                        controlHeight: 46,
                        fontWeight: 600,
                    },
                    components: {
                        Button: {
                            paddingInline: 12,
                            fontWeight: 600
                        }
                    }
                }}
            >
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#EEEAFF',
                            colorTextLightSolid: '#5329FF',
                        }
                    }}
                >
                    <Button
                        type='primary'
                        onClick={() => setIsAddRnpModalVisible(false)}
                    >
                        Отменить
                    </Button>
                </ConfigProvider>

                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#5329FF',
                        }
                    }}
                >
                    <Button
                        type='primary'
                        disabled={submitDisabled}
                        loading={isDataLoading}
                        onClick={() => {
                            addProducts();
                        }}
                    >
                        Добавить
                    </Button>
                </ConfigProvider>
            </ConfigProvider>
        </Flex>
    )
}

export default AddRnpModalFooter