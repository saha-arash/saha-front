import './home.scss';

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import bargeMamooriat from 'app/entities/barge-mamooriat/barge-mamooriat';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;
  const history =  useHistory();

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
              <button className="cardd-1" onClick={ () => history.push("/barge-mamooriat")} >برگه ماموریت </button>
              <button className="cardd-1" onClick={ () => history.push("/barname-hesab-resi")} >برنامه سالانه</button>
              <button className="cardd-1" onClick={ () => history.push("/barname-hesab-resi")} >فرایند انجام حسابرسی</button>
              <button className="cardd-1" onClick={ () => history.push("/payam")} >پیام ها</button>
              <button className="cardd-1" onClick={ () => history.push("/barge-mamooriat")} >فرم های مورد نیاز</button>
              <button className="cardd-1" onClick={ () => history.push("/barge-mamooriat")} >لوح قوانین</button>
              <button className="cardd-1" onClick={ () => history.push("/barge-mamooriat")} >دستور العمل  ها و بازبینه ها</button>
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
        
  
        <ul className= "rtlConfig">
          <h4 className= "rtlConfig">:در موارد زیر با ادمین سامانه تماس بگیرید</h4>
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
