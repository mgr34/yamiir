/**
 * Created by matt on 6/26/17.
 */

import Container from './Container';
import Header from './Header';
import Content from './Content';

export default class Drawer extends Container {
  static Header = Header;
  static Content = Content;
};