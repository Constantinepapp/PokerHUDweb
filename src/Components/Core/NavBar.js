import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import cardstwo from '../../assets/img/poker-cards.png'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="Navbar" expand="md">
      
        <Link to="/" className="title-logo"><img height="40px" src={cardstwo}></img>PokerStats</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem className="NavItem">
              <Link to="/">File Reader</Link>
            </NavItem>
            <NavItem>
              <Link to="/equity">Equity</Link>
            </NavItem>
            
          </Nav>
          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;





