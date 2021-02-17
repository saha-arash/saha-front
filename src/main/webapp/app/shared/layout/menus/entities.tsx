import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';
import { faTable } from '@fortawesome/free-solid-svg-icons';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="موجودیت ها" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    {/* <MenuItem icon={faTable} to="/yegan-code">
      <Translate contentKey="global.menu.entities.yeganCode" />
    </MenuItem> */}
    <MenuItem icon={faTable} to="/karbar">
      کاربران
    </MenuItem>
    <MenuItem icon={faTable} to="/yegan">
      یگان
    </MenuItem>
    <MenuItem icon={faTable} to="/yegan-type">
      نوع یگان ها
    </MenuItem>
    <MenuItem icon={faTable} to="/semat">
      سمت ها
    </MenuItem>
    <MenuItem icon={faTable} to="/daraje">
      درجه ها
    </MenuItem>
    <MenuItem icon={faTable} to="/mantaghe">
      منطقه
    </MenuItem>
    <MenuItem icon={faTable} to="/ostan">
      استان
    </MenuItem>
    <MenuItem icon={faTable} to="/shahr">
      شهر
    </MenuItem>
    {/* <MenuItem icon={faTable} to="/payam">
      <Translate contentKey="global.menu.entities.payam" />
    </MenuItem> */}
    {/* <MenuItem icon={faTable} to="/file-name">
      <Translate contentKey="global.menu.entities.fileName" />
    </MenuItem> */}
    {/* <MenuItem icon={faTable} to="/morkhasi">
      <Translate contentKey="global.menu.entities.morkhasi" />
    </MenuItem>
    <MenuItem icon={faTable} to="/dore">
      <Translate contentKey="global.menu.entities.dore" />
    </MenuItem>
    <MenuItem icon={faTable} to="/negahbani">
      <Translate contentKey="global.menu.entities.negahbani" />
    </MenuItem> */}
    {/* <MenuItem icon={faTable} to="/barge-mamooriat">
      <Translate contentKey="global.menu.entities.bargeMamooriat" />
    </MenuItem> */}
    {/* <MenuItem icon={faTable} to="/hesab-resi">
      <Translate contentKey="global.menu.entities.hesabResi" />
    </MenuItem>
    <MenuItem icon={faTable} to="/barname-hesab-resi">
      <Translate contentKey="global.menu.entities.barnameHesabResi" />
    </MenuItem>
     <MenuItem icon={faTable} to="/file-barge-mamooriat">
      <Translate contentKey="global.menu.entities.fileBargeMamooriat" />
    </MenuItem>  */}
    <MenuItem icon={faTable} to="/niroo-code">
      نیرو ها
    </MenuItem> 
    {/* <MenuItem icon={faTable} to="/file-hesab-resi">
      <Translate contentKey="global.menu.entities.fileHesabResi" />
    </MenuItem> */}
    {/* <MenuItem icon={faTable} to="/file-gozaresh">
      <Translate contentKey="global.menu.entities.fileGozaresh" />
    </MenuItem> */}

    {/* <MenuItem icon={faTable} to="/gozaresh">
      <Translate contentKey="global.menu.entities.gozaresh" />
    </MenuItem> */}
    <MenuItem icon={faTable} to="/daraje">
      <span>درجه</span>
    </MenuItem>
    {/* <MenuItem icon={faTable} to="/mohasebe-hazine-mamooriat">
    <span>هزینه ماموریت</span>
    </MenuItem>
    <MenuItem icon={faTable} to="/dastoor-amal-ejra-e">
      <span>دستور العمل اجرایی</span>
    </MenuItem>
    <MenuItem icon={faTable} to="/gardeshkar-barname-hesabresi">
    <span>گردش کار</span>
    </MenuItem>
    <MenuItem icon={faTable} to="/madarek">
    <span>مدارک حسابرسی</span>
    </MenuItem>
    <MenuItem icon={faTable} to="/bilan-sal-ghabl">
    <span>بیلان سال قبل</span>
    </MenuItem>
    <MenuItem icon={faTable} to="/gozaresh-hozoor">
    <span>گزارش حضور</span>
    </MenuItem>
    <MenuItem icon={faTable} to="/chekide-gardesh-kar">
    <span>چکیده گردش کار</span>
    </MenuItem>
    <MenuItem icon={faTable} to="/bilan-se-sal-ghabl">
    <span>بیلان سه سال قبل</span>
    </MenuItem>
    <MenuItem icon={faTable} to="/mosta-khreje">
    <span>مستخرجه</span>
    </MenuItem>
    <MenuItem icon={faTable} to="/rafe-iradat">
    <span>رفع ایرادات</span>
    </MenuItem>
    <MenuItem icon={faTable} to="/bank-etelaati">
    <span>بانک اطلاعاتی</span>
    </MenuItem>
    <MenuItem icon={faTable} to="/nameh">
    <span>نامه ها</span>
    </MenuItem>
    <MenuItem icon={faTable} to="/kholase-gozaresh">
    <span>خلاصه گزارش</span>
    </MenuItem>
    <MenuItem icon={faTable} to="/gardesh-kar">
    <span>گردش کار</span>
    </MenuItem> */}
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
