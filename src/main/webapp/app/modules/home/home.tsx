import './home.scss';

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Button } from 'reactstrap';
import agha from '../../../content/images/agha.jpg'

import { IRootState } from 'app/shared/reducers';
import bargeMamooriat from 'app/entities/barge-mamooriat/barge-mamooriat';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;
  const history = useHistory();

  const [role, setRole] = useState(localStorage.getItem('role'));

  const render = () => {
    let res;
    if (role === 'ROLE_ADMIN') {
      return (
        <>
          <button className="cardd-1" onClick={() => history.push('/barge-mamooriat')}>
            برگه ماموریت{' '}
          </button>
          {/* <button className="cardd-1" onClick={() => history.push('/barname-hesab-resi')}>
            برنامه سالانه
          </button> */}
          <button className="cardd-1" onClick={() => history.push('/hesab-resi')}>
            فرایند انجام حسابرسی
          </button>
          <button className="cardd-1" onClick={() => history.push('/payam')}>
            پیام ها
          </button>
          <button className="cardd-1" onClick={() => alert('بزودی')}>
            فرم های مورد نیاز
          </button>
          <button className="cardd-1" onClick={() => alert('بزودی')}>
            لوح قوانین
          </button>
          <button className="cardd-1" onClick={() => alert('بزودی')}>
            دستور العمل ها و بازبینه ها
          </button>
        </>
      );
    } else {
      return (
        <>
          <button className="cardd-1" onClick={() => history.push('/barge-mamooriat')}>
            برگه ماموریت{' '}
          </button>
          <button className="cardd-1" onClick={() => history.push('/hesab-resi')}>
            فرایند انجام حسابرسی
          </button>
          <button className="cardd-1" onClick={() => history.push('/payam')}>
            پیام ها
          </button>
          <button className="cardd-1" onClick={() => alert('بزودی')}>
            فرم های مورد نیاز
          </button>
        </>
      );
    }
  };

  return (
    <div>
      <Row>
        <Col md="7">
        
          {/* TODO: how to detect user is logged in an after loggin and reloading the page */}
          {account && account.login ? (
            <div >
             <div className="d-flex mr-auto">
             <span className="arteshLogo" />
                  
                  <span className="logo" />
             </div>
              <Alert className='d-flex align-items-center justify-content-center' color="success">
                <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                  You are logged in as user {account.login}.
                </Translate>
              </Alert>

              {role === 'ROLE_ADMIN'}

              <div className="horzontalList">

                {render()}
         

              </div>
            </div>
          ) : (
            <div >
              <Row>
              <Col xs="4">
                  <img className="w-100 rounded-circle border shadow" src={agha}></img>
                </Col>
              </Row>
              <div className="d-flex">
                
                  <span className="arteshLogo" />
               
                  <span className="logo mr-auto" />
                
              </div>
              <Row className="mt-3">
                
                <Col className="text-center">
                  <span className="title"> ورود به سامانه حسابرسی</span>
                </Col>
                
              </Row>
              <Alert color="success" className="alert-center">
                <span>برای ورود به سیستم کلیک کنید:</span>
                <div>
                  <Link to="/login" className="btn btn-white">
                    <div className="enterButton"> ورود</div>
                  </Link>
                </div>
              </Alert>
            </div>
          )}

          <div className="list">
            <h4 className="">در موارد زیر با ادمین سامانه تماس بگیرید:</h4>

            <ul className="rightFloat">
              <li className="">در صورتی که در ورود به سیستم دچار مشکل شده اید.</li>
              <li>در صورتی که نام کاربری ندارید.</li>
              <li>در صورتی که نام کاربری و رمز عبور خود را فراموش کرده اید.</li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
