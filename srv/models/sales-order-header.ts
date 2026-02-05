type SalesOrderHeaderProps = {
    id: string;
    customerId: string;
}

type CreationPayload = {
    customer_id: SalesOrderHeaderProps['customerId'];
    items: any[];
}

type CreationPayloadValidationResult = {
    hasError: boolean;
    error?: Error;
}

export class SalesOrderHeaderModel {
    constructor(private props: SalesOrderHeaderProps) { }

    public get id() {
        return this.props.id;
    }

    public get customer() {
        return this.props.customerId;
    }

    public validateCreationPayLoad(params: CreationPayload): CreationPayloadValidationResult {

        if (!params.customer_id) {
            return {
                hasError: true,
                error: new Error('Customer inválido')
            };
        }

        if (!params.items || params.items?.length === 0) {
            return {
                hasError: true,
                error: new Error('Itens inválido')
            };
           
        }
            return {
                hasError: false
            }
        }
    }

    


