// key id: UUID;
//       firstName: String(20);
//       lastName: String(100);
//       email: String(255);

type CustomerProps = {
    id: string;
    firstName: string;
    lastName: string;
    email: string

}

export class CustomerModel {
    constructor(private props: CustomerProps) {}

    public get id(){
        return this.props.id;
    }

    public get firstName(){
        return this.props.firstName;
    }

    public get lastName(){
        return this.props.lastName;
    }

    public get email(){
        return this.props.email;
    }

    public setDefaultEmailDomain(){
        if (!this.props.email.includes('@')){
                this.props.email = `${this.props.email}@gmail.com`; 
            }
    }

}
