

import Container from './Container';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';


export default class Dialog extends Container {
  static Header = Header;
  static Body = Body;
  static Footer = Footer;
}
