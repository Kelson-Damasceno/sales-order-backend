declare module '@sap/cds' {
  export interface UserAttributes {
    id?: unknown;
    [key: string]: any;
  }

  export interface User {
    id?: string;
    roles?: string[];
    attr?: UserAttributes;
    [key: string]: any;
  }

  export interface Context {
    user?: User;
    [key: string]: any;
  }

  export interface Request {
    [key: string]: any;
  }

  export interface Service {
    after: (event: string, entity: string, callback: (data: any, request: Request) => void) => void;
    before: (event: string, entity: string, callback: (request: Request) => void) => void;
    [key: string]: any;
  }

  export const SELECT: {
    one: {
      from: (entity: string) => {
        where: (condition: any) => Promise<any>;
      };
    };
    from: (entity: string) => {
      where: (condition: any) => Promise<any>;
    };
    [key: string]: any;
  };

  export const type: {
    [key: string]: any;
  };

  export const cds: {
    connect: (options?: any) => Promise<any>;
    service: (name: string) => Service;
    [key: string]: any;
  };

  export default cds;
}