using {MainService} from '../routes/main';

annotate MainService.SalesOrderHeaders with @(UI: {

    SelectionFields: [
        id,
        totalAmount,
        status_id,
        customer_id
    ],

    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: id,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '100rem',
            },
        },
        {
            $Type: 'UI.DataField',
            Label: 'Cliente',
            Value: customer.id,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '100rem',
            },
        },
        {
            $Type: 'UI.DataField',
            Label: 'Status',
            Value: status.id,
            Criticality: (status.id = 'COMPLETED' ? 3 : (status.id = 'PENDING' ? 2 : 1)),
            CriticalityRepresentation: #WithoutIcon,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '100rem',
            },
        },
        {
            $Type: 'UI.DataField',
            Value: totalAmount,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '10rem',
            },
        },
        {
            $Type: 'UI.DataField',
            Value: cratedAt,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '15rem',
            },
        },
        {
            $Type: 'UI.DataField',
            Value: cratedBy,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '15rem',
            },
        }
    ],
}) {
    id @title: 'ID';
    totalAmount @title: 'Valor Total';
    createdAt @title: 'Criado em';
    createdBy @title: 'Criado por';
    customer @(
        title: 'Cliente',
        Common: {
            Label: 'Cliente',
            Text: customer.firstName,
            ValueList: {
                $Type: 'Common.ValueListType',
                    CollectionPath: 'Customers',
                    Parameters: [
                        {
                            $Type: 'Common.ValueListParameterInOut',
                            LocalDataProperty: 'customer_id',
                            ValueListProperty: 'id'
                        },
                        {
                            $Type: 'Common.ValueListParameterInOut',
                            ValueListProperty: 'firstName'
                        },
                        {
                            $Type: 'Common.ValueListParameterInOut',
                            ValueListProperty: 'lastName'
                        },
                        {
                            $Type: 'Common.ValueListParameterInOut',
                            ValueListProperty: 'email'
                        }
                    ]
            },
        }
    );
    status @(
        title: 'Status',
        Common: {
            Label: 'Status',
            Text: status.description,
            TextArrangement : #TextOnly,
            ValueListWithFixedValues,
            ValueList: {
                $Type: 'Common.ValueListType',
                    CollectionPath: 'SalesOrderStatuses',
                    Parameters: [
                        {
                            $Type: 'Common.ValueListParameterInOut',
                            ValueListProperty: 'id',
                            LocalDataProperty: 'status_id'
                        },
                    ]
            },
        } 
        
    )

};

annotate MainService.SalesOrderStatuses with {
    id @Common.Text: description @Common.TextArrangement: #TextOnly
};

