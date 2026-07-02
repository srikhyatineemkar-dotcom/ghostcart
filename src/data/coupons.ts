import { Coupon } from '../types';

export const COUPONS: Coupon[] = [
  {
    code: 'GHOST50',
    discount: 50,
    type: 'percentage',
    minOrder: 250,
    description: 'Get flat 50% discount on orders of ₹250 or more (Max discount ₹200). Savor instant impulse savings!'
  },
  {
    code: 'SAVE100',
    discount: 100,
    type: 'flat',
    minOrder: 500,
    description: 'Get Flat ₹100 discount on orders of ₹500 or more. Perfect for large carts!'
  },
  {
    code: 'RESIST20',
    discount: 20,
    type: 'percentage',
    minOrder: 150,
    description: 'Save 20% on any order, celebrating your power to pause and reflect on impulse buys.'
  }
];
