import type { ProductConfig } from '../../types/app';
import { appleAirpods } from './appleAirpods';
import { appleIpad } from './appleIpad';
import { appleIphone } from './appleIphone';
import { appleMacbook } from './appleMacbook';
import { appleWatch } from './appleWatch';

export const products: Record<string, ProductConfig> = {
  [appleIphone.id]: appleIphone,
  [appleMacbook.id]: appleMacbook,
  [appleAirpods.id]: appleAirpods,
  [appleIpad.id]: appleIpad,
  [appleWatch.id]: appleWatch,
};

export const productIds = Object.keys(products);
