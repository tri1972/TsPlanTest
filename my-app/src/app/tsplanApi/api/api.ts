export * from './account.service';
import { AccountService } from './account.service';
export * from './ts.service';
import { TsService } from './ts.service';
export * from './values.service';
import { ValuesService } from './values.service';
export const APIS = [AccountService, TsService, ValuesService];
