import React, { useState } from 'react'
import { Layout, Result, Button } from 'antd';
import 'antd/dist/antd.css';
import NavbarHead from '../page/NavbarHead'
import { SmileOutlined } from '@ant-design/icons';
const Finish = props => {
    const { Header, Content, Footer } = Layout;
    return (
        <div>
            <Layout >
                <NavbarHead />
                <Result style={{backgroundColor:"white"}}
                    icon={<SmileOutlined />}
                    title="สั่งซื้อเสร็จสิ้น กรุณารอพนักงานยืนยันการสั่งสื้อ"
                    subTitle="พนักงานจะยืนยันการสั่งซื้อภายใน 24 ชั่วโมง"
                    extra={[
                        <Button type="primary" size="large" href="/">
                            กลับสู่หน้าหลัก</Button>,
                        <Button  href="javascript:history.back()" size="large">สั่งงานอีกครั้ง</Button>,
                    ]}
                />
            </Layout></div>
    )
}
export default Finish