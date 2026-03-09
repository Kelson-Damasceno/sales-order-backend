type SalesOrderByDaysProps = {
     salesOrderId: string,
     salesOrderTotalAmount: number,
     customerId: string,
     customerFullName: string,
}; 

export class SalesReportModel {
     constructor(private props: SalesOrderByDaysProps) {}

     public static with(props: SalesOrderByDaysProps): SalesReportModel {
             return new SalesReportModel(props);
         }

     public get id (){
          return this.props.customerId;
     }

    public get salesOrderId (){

          return this.props.salesOrderId
    }
    public get salesOrderTotalAmount (){

          return this.props.salesOrderTotalAmount
    }
    public get customerId (){

          return this.props.customerId
    }
    public get customerFullName (){

          return this.props.customerFullName
    }

    public toObject(): SalesOrderByDaysProps {
            return {
                  salesOrderId: this.props.salesOrderId,
                  salesOrderTotalAmount: this.props.salesOrderTotalAmount,
                  customerId: this.props.customerId,
                  customerFullName: this.props.customerFullName,
            };
      }
}