import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <div className="rtlConfig">
    
      <Row className="rtlConfig">
      <Col md="7">
        {account && account.login ? (
          <div>
            <Alert color="success">
              <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                You are logged in as user {account.login}.
              </Translate>
            </Alert>

            <div className="horzontalList">
              <button className="menuButton">برگه ماموریت </button>
              <button className="menuButton">برنامه سالانه</button>
              <button className="menuButton">فرایند انجام حسابرسی</button>
              <button className="menuButton">فرم های مورد نیاز</button>
              <button className="menuButton">پیام ها</button>
              <button className="menuButton">لوح قوانین</button>
              <button className="menuButton">دستور العمل  ها و بازبینه ها</button>
            </div>
          </div>

          
        ) : (
          <div className="rtlConfig">

            <Row className="rtlConfig">
              <Col className="horzontalList">
                <span className="hipster rounded"/>
                <span className="title"> ورود به سامانه حسابرسی</span>
                <span className="hipster rounded"/>
              </Col>
              </Row>
            <Alert color="success">
              <span>
                برای ورود به سیستم کلیک کنید:
              </span>
              
              <div>
              <Button color="white" type="submit">
              <Link to="/login" >
                <div className="enterButton"> ورود</div>
              </Link>
            </Button>
              </div>
            </Alert>

          </div>
        )}
        
  
        <ul>
          <h4>:در موارد زیر با ادمین سامانه تماس بگیرید</h4>
          <li className="rtlConfig">
            در صورتی که در ورود به سیستم دچار مشکل شده اید.
          </li>
          <li>
            در صورتی که نام کاربری ندارید.
          </li>
          <li>
            در صورتی که نام کاربری و رمز عبور خود رار فراموش کرده اید.
          </li>
        </ul>
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
