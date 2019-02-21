import Container from './Container';
import Item from './Item';
import Divider from './Divider';

export default class Menu extends Container {
    static Item = Item;
    static Divider = Divider;
};