# Employee Scheduling App

# Description
The Employee Scheduling App is a web application designed for businesses to manage employee shifts. The main functionalities of the application include:

- Shift Management: Allows managers to add, view, edit, and delete shifts for employees.
- Coverage Request: Employees can request coverage for their shifts.
- Coverage Approval: Managers can approve or decline the coverage request.
- Covering Shifts: Other employees can take up shifts that need coverage. 
- User Authentication and Account Management

The front-end of the application is built using React and the back-end is developed using Django Rest Framework. The app uses token-based authentication with the help of Django's Djoser library. Using Djoser Endpoints employees can sign-up, log-in, change their password, and reset their password.

# Features
- Interactive calendar for viewing shifts.
- Ability to add a shift by selecting a date and time range in the calendar.
- Option to edit and delete shifts directly from the calendar.
- Shift coverage request and approval system.
- Settings panel where users can change their password, username, and associated color on calendar.
- Integration with AWS Simple Email Service for automated email notifications
- Integration with AWS RDS to manage data in MySQL database instance

# Installation
Provide instructions on how to install and setup your application.

# Usage
Supervisors can add shifts using the add shift button and entering shift details.  Individual shifts can be updated or deleted by clicking on the shifts.  There are buttons for bulk deleting shifts and creating recurring schedules.

Employees can click on their own shifts and request for full or partial coverage.

<img width="1511" alt="image" src="https://github.com/dcueva7/Employee-Schedule/assets/111453767/a5209b6b-eef8-4982-b05b-4646c0751a33">

# Technologies Used
- React
- Django Rest Framework
- Django's Djoser library for authentication
- FullCalendar for displaying shifts
- Chakra UI for component design
- JS-Cookies for handling JWT tokens
- AWS SES for automatic email sending
- AWS RDS MySQL for data management
- AWS Cloudwatch for logging and error tracking

# Contact Information
Daniel Cueva
dnlcueva@hotmail.com


