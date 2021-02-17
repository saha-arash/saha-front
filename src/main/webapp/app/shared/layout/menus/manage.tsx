import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';
import { faCalculator, faComments, faFileAlt, faFileContract, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

export const ManageMenu = props => (
  <NavDropdown icon="th-list" name="مدیریت" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    {/* <MenuItem icon="asterisk" to="/yegan-code">
      YeGancode
    </MenuItem> */}
    <MenuItem icon={faComments} to="/payam">
      پیام ها
    </MenuItem>
    {/* <MenuItem icon="asterisk" to="/file-name">
      <Translate contentKey="global.menu.entities.fileName" />
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/karbar">
      <Translate contentKey="global.menu.entities.karbar" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/semat">
      <Translate contentKey="global.menu.entities.semat" />
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/morkhasi">
      مرخصی ها
    </MenuItem>
    <MenuItem icon="asterisk" to="/dore">
      دوره ها
    </MenuItem>
    <MenuItem icon="asterisk" to="/negahbani">
      نگهبانی ها
    </MenuItem> */}
    <MenuItem icon={faFileAlt} to="/barge-mamooriat">
      برگه ماموریت ها
    </MenuItem>
    <MenuItem icon={faCalculator} to="/hesab-resi">
      حسابرسی ها
    </MenuItem>
    {/* <MenuItem icon="asterisk" to="/barname-hesab-resi">
      برنامه های حسابرسی سالانه
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/file-barge-mamooriat">
      <Translate contentKey="global.menu.entities.fileBargeMamooriat" />
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/daraje">
      <Translate contentKey="global.menu.entities.daraje" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/yegan-type">
      <Translate contentKey="global.menu.entities.yeganType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/niroo-code">
      <Translate contentKey="global.menu.entities.nirooCode" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/yegan">
      <Translate contentKey="global.menu.entities.yegan" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/file-hesab-resi">
      <Translate contentKey="global.menu.entities.fileHesabResi" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/file-gozaresh">
      <Translate contentKey="global.menu.entities.fileGozaresh" />
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/mantaghe">
      <Translate contentKey="global.menu.entities.mantaghe" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ostan">
      <Translate contentKey="global.menu.entities.ostan" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/shahr">
      <Translate contentKey="global.menu.entities.shahr" />
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/gozaresh">
      گزارش ها
    </MenuItem> */}
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
