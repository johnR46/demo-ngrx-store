import { Address } from './address';

export interface Customer {
  code: string;
  userName: string;
  password: string;
  addresses?: Address[];
}
