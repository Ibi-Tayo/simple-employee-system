import { CompanyTitle } from "./CompanyTitle";
import { JobTitle } from "./JobTitle";

export interface Employee {
    id:          string;
    name:        string;
    dateOfBirth: Date;
    job:         JobTitle;
    yearsOfExperience: number;
    company:     CompanyTitle;
    salary:      number;
    address:     string;
    city:        string;
    postcode:    string;
}
