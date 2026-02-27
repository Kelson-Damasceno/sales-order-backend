import { User } from '@sap/cds';

import { SalesOrderHeader, SalesOrderHeaders } from '@cds-models/sales';

export type CreationPayloadValidationResult = {
    hasError: boolean;
    totalAmount?: number;
    error?: Error;
};

export interface SalesOrderHeaderController {
    beforeCreate(params: SalesOrderHeader): Promise<CreationPayloadValidationResult>;
    afterCreate(params: SalesOrderHeader, loggedUser: User): Promise<void>;
}
