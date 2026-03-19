import { ExpectedResult as SalesReportByDays } from '@cds-models/db/types/SalesReport';

export interface SalesReportService {
        findByDays(days: number): Promise<SalesReportByDays []>; 
        findByCustomerId(cutomerId: string): Promise<SalesReportByDays []>;
}