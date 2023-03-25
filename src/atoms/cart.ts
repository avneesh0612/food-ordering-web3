import { atom } from 'recoil';
import { Item } from '../types/Item';

export interface CartItem extends Item {
  quantity: number;
}

export const cartState = atom<CartItem[]>({
  key: 'cart', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
