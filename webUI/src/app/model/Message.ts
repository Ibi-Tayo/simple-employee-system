export class Message {
  EmployeeDeletionSuccessMessage = (id: string): string =>
    `Employee with id: ${id} has been deleted`;
  EmployeeDeletionFailMessage = (id: string): string =>
    `Employee with id: ${id} was not found and couldn't be deleted`;
  EmployeeAdditionSuccessMessage = (name: string): string =>
    `Employee with name: ${name} has been been added to the system`;
  EmployeeAdditionFailMessage = (name: string): string =>
    `Employee with name: ${name} was not added, try again later`;
  EmployeeUpdateSuccessMessage = (name: string): string =>
    `Employee with name: ${name} has had their details updated`;
  EmployeeUpdateFailMessage = (name: string): string =>
    `Employee with name: ${name} was not updated`;

  EmployeeLoadingFailMessage = "There was a problem loading the employees table, try again later"
  EmployeeNotFoundFailMessage = "Employee not found";
}

export const message = new Message();
