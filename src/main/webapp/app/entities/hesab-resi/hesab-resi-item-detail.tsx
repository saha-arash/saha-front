
import React, { FC } from 'react';
import DatePicker from 'react-datepicker2';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Input } from 'reactstrap';
import translateToFa from './translate';
import axios from "axios";
import { openFile } from 'react-jhipster';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HesabResiItemDetail: FC<RouteComponentProps> = ({ match, location }) => {
  const { id, item }: any = match.params;
  const downloadFile = (url) => {
    axios
      .request({
        url,
        method: 'GET',
        responseType: 'blob', // important
      })

      .then(({ data }) => {
        console.log('data', data)

        const downloadUrl = window.URL.createObjectURL(new Blob([data]));

        const link = document.createElement('a');

        link.href = downloadUrl;

        link.setAttribute('download', true); // any other extension

        document.body.appendChild(link);

        link.click();

        link.remove();

      });
  }
  return (
    <Row>
      <Col lg={12}>
        <h3 className="my-5">
          {translateToFa[item] || item} [ {id} ]
      </h3>
        {/* <div className="mb-4">
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
        </div> */}
      </Col>
      {
        ((item === "VoroodiBilanSeSalGhabl" || item === "VoroodiBilanSalGhabl") && location.state?.sal) && (
          <Col lg="12" className="mb-4">
        {/* <a onClick={() => downloadFile(`${item === "VoroodiBilanSeSalGhabl" ? `api/sesal/excel/${location.state?.sal}` : `api/sal/excel/${location.state?.sal}`}`)}>
          دریافت خروجی
        </a> */}
      </Col>
        )
      }
      <Col lg={12} className="mb-4">
        <Button tag={Link} to={{
          pathname: `/file-hesab-resi/${item}/${id}`,
          
        }} color="warning" className="px-4">
          <FontAwesomeIcon icon={faFile} />
                &nbsp;
          فایل‌ها
        </Button>
      </Col>
      <Col lg={12} className="mb-4">
        {/* <Button color="primary" className="px-4">
          ثبت
        </Button> */}
      </Col>
    </Row>
  )
}

export default HesabResiItemDetail;
