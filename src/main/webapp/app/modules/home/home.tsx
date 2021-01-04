import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Row>
      <Col md="9">

        {account && account.login ? (
          <div>
            <Alert color="success">
              <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                You are logged in as user {account.login}.
              </Translate>
            </Alert>
          </div>
        ) : (
          <div>
            <Alert color="success">
              <span>
                برای ورود به سیستم کلیک کنید:
              </span>
              
              <div className="enterButton">
              <Link to="/login" >
                <div className="enterButton"> ورود</div>
              </Link>
              </div>
            </Alert>

          </div>
        )}
        
  
        <ul>
          <h4>:در موارد زیر با ادمین سامانه تماس بگیرید</h4>
          <li dir>
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
        <Col md="3" className="pad">
        <span className="hipster rounded"/>
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
