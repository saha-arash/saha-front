import React, { FC } from 'react';
import DatePicker from 'react-datepicker2';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Input } from 'reactstrap';
const HesabResiItemDetail: FC<RouteComponentProps> = ({ match }) => {
  const { id, item }: any = match.params;

  return (
    <Row>
      <Col lg={12}>
        <h3 className="my-5">
          جزییات حسابرسی
      </h3>
        <div className="mb-4">
          <h5 className="mb-3">
            فایل
        </h5>
          <input id="file_madarek" type="file" />
        </div>
        <div className="mb-4">
          <h5 className="mb-3">
            تاریخ
        </h5>
          <DatePicker

            isGregorian={false}
            timePicker={false}

            persianDigits
          />
        </div>
        <div className="mb-4">
          <h5 className="mb-3">
            موضوع
        </h5>
          <Input />
        </div>
        <div className="mb-4">
          <h5 className="mb-3">
            شماره نامه
        </h5>
          <Input />
        </div>
        <div className="mb-4">
          <h5 className="mb-3">
            شماره گردش
        </h5>
          <Input />
        </div>
      </Col>
      <Col lg={12} className="mb-4">
        <Button color="warning" className="px-4">
          فایل‌ها
        </Button>
      </Col>
      <Col lg={12} className="mb-4">
        <Button color="primary" className="px-4">
          ثبت
        </Button>
      </Col>
    </Row>
  )
}

export default HesabResiItemDetail;
