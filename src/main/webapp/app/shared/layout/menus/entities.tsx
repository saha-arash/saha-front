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
    {/* <MenuItem icon="asterisk" to="/niroo-code">
      <Translate contentKey="global.menu.entities.nirooCode" />
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/file-hesab-resi">
      <Translate contentKey="global.menu.entities.fileHesabResi" />
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/file-gozaresh">
      <Translate contentKey="global.menu.entities.fileGozaresh" />
    </MenuItem> */}

    {/* <MenuItem icon="asterisk" to="/gozaresh">
      <Translate contentKey="global.menu.entities.gozaresh" />
    </MenuItem> */}
    <MenuItem icon="asterisk" to="/karbar">
      <Translate contentKey="global.menu.entities.karbar" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/semat">
      <Translate contentKey="global.menu.entities.semat" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/daraje">
      <Translate contentKey="global.menu.entities.daraje" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/yegan-type">
      <Translate contentKey="global.menu.entities.yeganType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/yegan">
      <Translate contentKey="global.menu.entities.yegan" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/mohasebe-hazine-mamooriat">
      <Translate contentKey="global.menu.entities.mohasebeHazineMamooriat" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/dastoor-amal-ejra-e">
      <Translate contentKey="global.menu.entities.dastoorAmalEjraE" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/gardeshkar-barname-hesabresi">
      <Translate contentKey="global.menu.entities.gardeshkarBarnameHesabresi" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/madarek">
      <Translate contentKey="global.menu.entities.madarek" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/bilan-sal-ghabl">
      <Translate contentKey="global.menu.entities.bilanSalGhabl" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/gozaresh-hozoor">
      <Translate contentKey="global.menu.entities.gozareshHozoor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/chekide-gardesh-kar">
      <Translate contentKey="global.menu.entities.chekideGardeshKar" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/bilan-se-sal-ghabl">
      <Translate contentKey="global.menu.entities.bilanSeSalGhabl" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/mosta-khreje">
      <Translate contentKey="global.menu.entities.mostaKhreje" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/rafe-iradat">
      <Translate contentKey="global.menu.entities.rafeIradat" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/bank-etelaati">
      <Translate contentKey="global.menu.entities.bankEtelaati" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/nameh">
      <Translate contentKey="global.menu.entities.nameh" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/kholase-gozaresh">
      <Translate contentKey="global.menu.entities.kholaseGozaresh" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/gardesh-kar">
      <Translate contentKey="global.menu.entities.gardeshKar" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/mantaghe">
      <Translate contentKey="global.menu.entities.mantaghe" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ostan">
      <Translate contentKey="global.menu.entities.ostan" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/shahr">
      <Translate contentKey="global.menu.entities.shahr" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
