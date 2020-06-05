import React, { useState } from 'react'
import {
  Form,
  Row,
  Col,
  Select,
  Checkbox,
  Button,
  Tag,
  Space,
  Typography,
  Input
} from 'antd'
import PropTypes from 'prop-types'
import { PlusOutlined } from '@ant-design/icons'

const { Title } = Typography
const { TextArea } = Input
const inputLayout = {
  wrapperCol: { span: 24 }
}

const FamilyHistory = ({ diseases }) => {
  const [disableFamilyHistory] = useState(true)
  const [familyBackground] = useState(['Diabetes 👩🏼🧒🏽', 'Others 🧒🏽'])
  return (
    <>
      <Row>
        <Col offset={6} span={12}>
          <Title level={4}>Family history</Title>
        </Col>
      </Row>
      <Row>
        <Col offset={6} span={5}>
          <Form.Item {...inputLayout} name='familyHistoryDisease' label='Disease'>
            <Select options={diseases} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Space direction='vertical' size='middle' style={{ width: '100%' }}>
        <Row>
          <Col offset={6} span={4}>
            <Checkbox><span className='checkbox-text'>Mother 👩🏼</span></Checkbox>
          </Col>
          <Col offset={0} span={4}>
            <Checkbox><span className='checkbox-text'>Grandma 👵🏻</span></Checkbox>
          </Col>
          <Col offset={0} span={4}>
            <Checkbox><span className='checkbox-text'>Grandpa 👴🏻</span></Checkbox>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={4}>
            <Checkbox><span className='checkbox-text'>Father 👨🏿</span></Checkbox>
          </Col>
          <Col offset={0} span={4}>
            <Checkbox><span className='checkbox-text'>Grandma 👵🏿</span></Checkbox>
          </Col>
          <Col offset={0} span={4}>
            <Checkbox><span className='checkbox-text'>Grandpa 👴🏿</span></Checkbox>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={4}>
            <Checkbox><span className='checkbox-text'>Siblings 🧒🏽</span></Checkbox>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={3}>
            <Button disabled={disableFamilyHistory} type='primary'><PlusOutlined />Add</Button>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            {familyBackground.map((item, key) => <Tag closable key={item}>{item}</Tag>)}
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Form.Item {...inputLayout} name='familyHistoryObservations' label='Observations'>
              <TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
      </Space>

    </>
  )
}

FamilyHistory.propTypes = {
  diseases: PropTypes.array
}

export default FamilyHistory
