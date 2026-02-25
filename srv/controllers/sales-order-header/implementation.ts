import { User } from '@sap/cds';

import { SalesOrderHeader, SalesOrderHeaders } from '@cds-models/sales';
import { CreationPayloadValidationResult, SalesOrderHeaderController } from './protocols';
import { SalesOrderHeaderService } from 'srv/services/sales-oreder-header/protocols';

export class SalesOrderHeaderControllerImpl implements SalesOrderHeaderController {
    constructor(private readonly service: SalesOrderHeaderService) {}

    public async beforeCreate(params: SalesOrderHeader): Promise<CreationPayloadValidationResult> {
        return this.service.beforeCreate(params);
    }

    public async afterCreate(params: SalesOrderHeader, loggedUser: User): Promise<void> {
        return this.service.afterCreate(params, loggedUser);
    }
}

// afterCreate(params: SalesOrderHeaders, loggedUser: User): Promise<void>

// public async afterCreate(params: SalesOrderHeaders, loggedUser: User): Promise<void> {
//     return this.service.afterCreate(params, loggedUser);
// }
