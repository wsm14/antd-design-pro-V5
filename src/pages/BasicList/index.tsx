import { useState, useEffect } from 'react';
import { Table, Row, Col, Card, Button, Pagination, Space } from "antd";
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from "umi";
import styles from "./index.less";

const Index = () => {
    const [page, setPage] = useState(1);
    const [pcr_page, setPcrPage] = useState(10);
    const init = useRequest<{ data: BasicListApi.Data }>(`https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&pcr_page=${pcr_page}`);
    useEffect(() => {
        init.run()
    }, [page, pcr_page])

    const changeNum = (_page: any, _pur_page: any) => {
        setPage(_page);
        setPcrPage(_pur_page);
        // init.run();
    }

    const searchLayout = () => {

    }
    const beforeTableLayout = () => {
        return (
            <Row>
                <Col span={12}>col-12</Col>
                <Col span={12} className={styles.right}>
                    <Space>
                        <Button type="primary">add</Button>
                        <Button type="primary">add</Button>
                    </Space>
                </Col>
            </Row>
        )
    }

    const afterTableLayout = () => {
        return (
            <Row>
                <Col span={12}>col-12</Col>
                <Col span={12} className={styles.right}>
                    <Pagination
                        total={init?.data?.meta?.total || 0}
                        current={init?.data?.meta?.page || 1}
                        pageSize={init?.data?.meta?.per_page || 10}
                        onChange={changeNum}
                        onShowSizeChange={changeNum}
                    ></Pagination>
                </Col>
            </Row>
        )
    }

    return (
        <PageContainer>
            {searchLayout()}
            <Card>
                {beforeTableLayout()}
                <Table
                    dataSource={init?.data?.dataSource}
                    columns={init?.data?.layout?.tableColumn.filter((item) => item.hideInColumn !== true)} pagination={false}
                    loading={init?.loading}
                />
                {afterTableLayout()}
            </Card>
        </PageContainer>
    )
}

export default Index
