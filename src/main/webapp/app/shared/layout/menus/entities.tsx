import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="موجودیت ها" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    {/* <MenuItem icon="asterisk" to="/yegan-code">
      <Translate contentKey="global.menu.entities.yeganCode" />
    </MenuItem> */}
    <MenuItem icon="asterisk" to="/karbar">
      کاربران
    </MenuItem>
    <MenuItem icon="asterisk" to="/semat">
      سمت ها
    </MenuItem>
    <MenuItem icon="asterisk" to="/yegan">
      یگان
    </MenuItem>
    <MenuItem icon="asterisk" to="/yegan-type">
      نوع یگان ها
    </MenuItem>
    <MenuItem icon="asterisk" to="/daraje">
      درجه ها
    </MenuItem>
    <MenuItem icon="asterisk" to="/mantaghe">
      منطقه
    </MenuItem>
    <MenuItem icon="asterisk" to="/ostan">
      استان
    </MenuItem>
    <MenuItem icon="asterisk" to="/shahr">
      شهر
    </MenuItem>
    {/* <MenuItem icon="asterisk" to="/payam">
      <Translate contentKey="global.menu.entities.payam" />
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/file-name">
      <Translate contentKey="global.menu.entities.fileName" />
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/morkhasi">
      <Translate contentKey="global.menu.entities.morkhasi" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/dore">
      <Translate contentKey="global.menu.entities.dore" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/negahbani">
      <Translate contentKey="global.menu.entities.negahbani" />
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/barge-mamooriat">
      <Translate contentKey="global.menu.entities.bargeMamooriat" />
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/hesab-resi">
      <Translate contentKey="global.menu.entities.hesabResi" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/barname-hesab-resi">
      <Translate contentKey="global.menu.entities.barnameHesabResi" />
    </MenuItem>
     <MenuItem icon="asterisk" to="/file-barge-mamooriat">
      <Translate contentKey="global.menu.entities.fileBargeMamooriat" />
    </MenuItem>  */}
    <MenuItem icon="asterisk" to="/niroo-code">
      نیرو ها
    </MenuItem> 
    {/* <MenuItem icon="asterisk" to="/file-hesab-resi">
      <Translate contentKey="global.menu.entities.fileHesabResi" />
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/file-gozaresh">
      <Translate contentKey="global.menu.entities.fileGozaresh" />
    </MenuItem> */}

    {/* <MenuItem icon="asterisk" to="/gozaresh">
      <Translate contentKey="global.menu.entities.gozaresh" />
    </MenuItem> */}
    <MenuItem icon="asterisk" to="/daraje">
      <span>درجه</span>
    </MenuItem>
    {/* <MenuItem icon="asterisk" to="/mohasebe-hazine-mamooriat">
    <span>هزینه ماموریت</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/dastoor-amal-ejra-e">
      <span>دستور العمل اجرایی</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/gardeshkar-barname-hesabresi">
    <span>گردش کار</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/madarek">
    <span>مدارک حسابرسی</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/bilan-sal-ghabl">
    <span>بیلان سال قبل</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/gozaresh-hozoor">
    <span>گزارش حضور</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/chekide-gardesh-kar">
    <span>چکیده گردش کار</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/bilan-se-sal-ghabl">
    <span>بیلان سه سال قبل</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/mosta-khreje">
    <span>مستخرجه</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/rafe-iradat">
    <span>رفع ایرادات</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/bank-etelaati">
    <span>بانک اطلاعاتی</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/nameh">
    <span>نامه ها</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/kholase-gozaresh">
    <span>خلاصه گزارش</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/gardesh-kar">
    <span>گردش کار</span>
    </MenuItem> */}
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
