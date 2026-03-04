using {MainService} from '../routes/main';

annotate MainService.SalesOrderHeaders with @(
    Capabilities: {
        DeleteRestrictions : {
            $Type : 'Capabilities.DeleteRestrictionsType',
            Deletable: false,
        },
        FilterRestrictions : {
            $Type : 'Capabilities.FilterRestrictionsType',
            FilterExpressionRestrictions: [
                {
                    Property: createdAt,
                    AllowedExpressions: 'SingleRange'
                },
                {
                    Property: modifiedAt,
                    AllowedExpressions: 'SingleRange'
                }
            ]
        },
    },
    UI: {

    SelectionFields: [
        id,
        totalAmount,
        status_id,
        customer_id
    ],

    LineItem: [
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
    HeaderInfo  : {
        $Type : 'UI.HeaderInfoType',
        TypeName : 'Pedido',
        TypeNamePlural : 'Pedidos',
        Title: {
            $Type: 'UI.DataField',
            Value: 'ID: {id}',
        }
    },
    Facets: [
        {
            ID: 'SalesOrderData',
            $Type: 'UI.CollectionFacet',
            Label: 'Informeações do Cabecalho do Pedido',
            Facets: [
                {
                    ID: 'Header',
                    $Type: 'UI.ReferenceFacet',
                    Target: '@UI.FieldGroup#Header',
                }
            ]
        },
        {
            ID: 'CustomerData',
            $Type: 'UI.ReferenceFacet',
            Label: 'Informeações do Cliente',
             Target: 'customer/@UI.FieldGroup#CustomerData',
        },
        {
            ID: 'itemsData',
            $Type: 'UI.ReferenceFacet',
            Label: 'Itens do Pedido',
             Target: 'items/@UI.LineItem',
        }
    ],
    FieldGroup#Header  : {
        $Type : 'UI.FieldGroupType',
        Data: [
            {
                $Type: 'UI.DataField',
                Value: id, 

            },
            {
                $Type: 'UI.DataField',
                Value: customer.id, 

            },
            {
                $Type: 'UI.DataField',
                Value: totalAmount, 

            },
            {
                $Type: 'UI.DataField',
                Value: createdAt, 

            },
            {
                $Type: 'UI.DataField',
                Value: createdBy, 

            },
        ]
    },
})  {
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

annotate MainService.Customers with @(
    UI: {
        FieldGroup#CustomerData : {
            $Type : 'UI.FieldGroupType',
            Data: [
                {
                    $Type: 'UI.DataField',
                    Value: id,                
                },
                {
                    $Type: 'UI.DataField',
                    Value: firstName,                
                },
                {
                    $Type: 'UI.DataField',
                    Value: lastName,                
                },{
                    $Type: 'UI.DataField',
                    Value: email,                
                },
                
            ]
            
        },
    }
                
)
{
    id @title : 'ID';
    firstName @title : 'Nome';
    lastName @title : 'Sobrenome';
    email @title : 'E-mail'
};


annotate MainService.SalesOrderItems with @(
    UI: {
        LineItem  : [
            {
                $Type: 'UI.DataField',
                Value: id,
                ![@HTML5.CssDefaults]: {
                    $Type: 'HTML5.CssDefaultsType',
                    width: '18rem',
            },
            },
            {
                $Type: 'UI.DataField',
                Value: product.name,
                ![@HTML5.CssDefaults]: {
                    $Type: 'HTML5.CssDefaultsType',
                    width: '15rem',
            },
            },
            {
                $Type: 'UI.DataField',
                Value: quantity,
            },
            {
                $Type: 'UI.DataField',
                Value: price,
            }
        ],
    }
){
    id @tittle: 'ID';
    quantity @tittle: 'Quantidade';
    price @tittle: 'Preço';
    header @UI.HiddenFilter @UI.Hidden;
    product @UI.HiddenFilter @UI.Hidden;
};

annotate MainService.Products with {
    name @title : 'Produto';
};

