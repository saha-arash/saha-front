import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './yegan.reducer';
import { IYegan } from 'app/shared/model/yegan.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Select from 'react-select';
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import omitEmpty from 'omit-empty';
import { useReactToPrint } from 'react-to-print';

const statusOption = [
  {
    label: 'حسابرسی نشده',
    value: 'hesabresiShode'
  }, {
    label: 'جهت حسابرسی',
    value: 'jahateHesabResi'
  }, {
    label: 'حسابرسی شده',
    value: 'hesabresiNashodeShode'
  },
  {
    label: 'جهت پیگیری',
    value: 'jahatePeygiri'
  }
];

const initialFilter = {
  name: undefined,
  code: undefined,
  nirooCodeId: undefined,
  shahrId: undefined,
  ostanId: undefined,
  mantagheId: undefined,
  hesabresiShode: undefined,
  jahateHesabResi: undefined,
  jahatePeygiri: undefined,
  hesabresiNashodeShode: undefined
}

export interface IYeganProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Yegan = (props: IYeganProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const [ostans, setOstans] = useState();
  const [mantaghes, setMantaghes] = useState();
  const [niroos, setNiroos] = useState();
  const [filters, setFilters] = useState(initialFilter);

  const changeFilter = (feildName: string, value: string | boolean | null) => {
    setFilters((prev) => ({
      ...prev,
      [feildName]: value || undefined
    }))
  }

  useEffect(() => {
    const getOstans = async () => {
      const res = await axios.get('/api/ostans');
      setOstans(res.data.map(item => ({ value: item.id, label: item.name })));
    };

    const getNiroos = async () => {
      const res = await axios.get('/api/niroo-codes');
      setNiroos(res.data.map(item => ({ value: item.id, label: item.name })));
    };

    const getMantaghes = async () => {
      const res = await axios.get('/api/mantaghes');
      setMantaghes(res.data.map(item => ({ value: item.id, label: item.name })));
    };

    getNiroos();
    getMantaghes();
    getOstans();
  }, [])

  const getAllEntities = () => {
    const {hesabresiId, status} = props.match.params || {}
    if(hesabresiId && status) {
      const preFilter = {
        hesabresiId,
        [status]: true
      }
      props.getEntities(
        paginationState.activePage - 1, 
        paginationState.itemsPerPage, 
        `${paginationState.sort},${paginationState.order}`, 
        preFilter
        );
    } else {
      props.getEntities(
        paginationState.activePage - 1, 
        paginationState.itemsPerPage, 
        `${paginationState.sort},${paginationState.order}`, 
        omitEmpty(filters));
    }

  };

  const getFilteredData = (e) => {
    e.preventDefault();
    getAllEntities();
  }

  const sortEntities = () => {
    getAllEntities();
    // props.history.push(
    //   `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    // );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const searchCities = (inputValue, callback) => {
    setTimeout(() => {
      axios.get('/api/shahrs/search', { params: { name: inputValue } }).then((res) => {
        callback(res.data.map(item => ({ value: item.id, label: item.name })))
      })
    }, 1000)
  };

  const handleStatus = (name?: string) => {
    statusOption.forEach((item) => {
      changeFilter(item.value, false)
    })
    if(name) {
      changeFilter(name, true)
    }
  };

  const { yeganList, match, loading, totalItems } = props;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    suppressErrors: false
  });
  return (
    <div>
      <h2 id="yegan-heading">
        <span>یگان ها</span>
        {
          props.match.params?.hesabresiId ? null : (
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <span>ایجاد یگان جدید</span>
        </Link>
          )
        }
      </h2>
      {
        props.match.params?.hesabresiId ? null : (
          <Container style={{ direction: 'rtl' }}>
        <Form onSubmit={getFilteredData}>
          <FormGroup row>
            <Label for="status" sm={2} md={1}>
              نام
        </Label>
            <Col sm={10} md={5}>
              <Input 
              type="text" 
              name="email" 
              id="exampleEmail"
              onChange={(e) => changeFilter('name', e.target.value)}
                />
            </Col>
            <Label for="status" sm={2} md={1}>
              وضعیت
        </Label>
            <Col sm={10} md={5}>
              <Select 
              options={statusOption} 
              placeholder="" 
              isClearable 
              onChange={(e) => handleStatus(e?.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="mantaghe" sm={2} md={1}>
              نیرو
        </Label>
            <Col sm={10} md={5}>
              <Select options={niroos} placeholder="" isClearable 
              onChange={(e) => changeFilter('nirooCodeId', e?.value)}
              />
            </Col>
            <Label for="mantaghe" sm={2} md={1}>
              منطقه
        </Label>
            <Col sm={10} md={5}>
              <Select options={mantaghes} placeholder="" isClearable 
              onChange={(e) => changeFilter('mantagheId', e?.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} md={1}>
              استان
        </Label>
            <Col sm={10} md={5}>
              <Select 
              options={ostans} 
              placeholder="" 
              onChange={(e) => changeFilter('ostanId', e?.value)}
              isClearable />
            </Col>
            <Label sm={2} md={1}>
              شهر
        </Label>
            <Col sm={10} md={5}>
              <AsyncSelect
                loadOptions={searchCities}
                defaultOptions={true}
                placeholder="" isClearable 
                onChange={(e) => changeFilter('shahrId', e?.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
          <Label sm={2} md={1}>
              کد
        </Label>
            <Col sm={10} md={5}>
            <Input 
            type="string" 
            id="code" 
            onChange={(e) => changeFilter('code', e.target.value)} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Button color="info" type="submit">
              اعمال فیلتر
        </Button>
          </FormGroup>
        </Form>
      </Container>
        )
      }
      
        {yeganList && yeganList.length > 0 ? (
          <>
          <Button color="success" className="mb-4 px-4" onClick={handlePrint}>
            پرینت
            
            </Button>
        <div className="table-responsive" ref={componentRef}>
          

          <Table responsive >
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <span>شناسه</span> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <span>نام یگان</span> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('code')}>
                  <span>کد یگان</span> <FontAwesomeIcon icon="sort" />
                </th>
                {/* <th>
                  <span>نیرو</span> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <span>شهر</span> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <span>نوع یگان</span> <FontAwesomeIcon icon="sort" />
                </th> */}
                <th />
              </tr>
            </thead>
            <tbody>
              {yeganList.map((yegan, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${yegan.id}`} color="link" size="sm">
                      {yegan.id}
                    </Button>
                  </td>
                  <td>{yegan.name}</td>
                  <td>{yegan.code}</td>
                  {/* <td>{yegan.nirooCodeId ? <Link to={`niroo-code/${yegan.nirooCodeId}`}>{yegan.nirooCodeId}</Link> : ''}</td>
                  <td>{yegan.shahrId ? <Link to={`shahr/${yegan.shahrId}`}>{yegan.shahrId}</Link> : ''}</td>
                  <td>{yegan.yeganTypeId ? <Link to={`yegan-type/${yegan.yeganTypeId}`}>{yegan.yeganTypeId}</Link> : ''}</td> */}
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${yegan.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      {
                        props.match.params?.hesabresiId ? null : (
                          <>
                            <Button
                        tag={Link}
                        to={`${match.url}/${yegan.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${yegan.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                          </>
                        )
                      }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
          </>
        ) : (
            !loading && (
              <div className="alert alert-warning">
                یگانی یافت نشد
              </div>
            )
          )}
      
      <div className={yeganList && yeganList.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={paginationState.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={paginationState.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = ({ yegan }: IRootState) => ({
  yeganList: yegan.entities,
  loading: yegan.loading,
  totalItems: yegan.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Yegan);
