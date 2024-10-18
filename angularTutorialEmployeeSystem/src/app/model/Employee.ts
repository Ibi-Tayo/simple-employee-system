import { Company } from "./Company";
import { JobTitle } from "./JobTitle";

export interface Employee {
    id:          string;
    name:        string;
    dateOfBirth: Date;
    job:         JobTitle;
    yearsOfExperience: number;
    company:     Company;
    salary:      number;
    address:     string;
    city:        string;
    postcode:    string;
}
