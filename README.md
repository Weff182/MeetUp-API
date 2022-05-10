# MeetUp-API

CRUD REST Web API for working with meetUps
![image](https://user-images.githubusercontent.com/79044694/167723620-a236c03c-913b-4d0b-9b1c-fefdb8417909.png)
Meetup API review video on YouTube: https://youtu.be/SjnpPlkMu7c

Stack
1. Node.js;
2. Express;
3. PostgreSQL 14.

Web api functionality
1. Getting a list of all meetups(with searching for meetups(with title), filtering them(whith userId who created), sorting(ascending).The result be paginated)
2. Getting a specific meetup by its Id;
3. Registering a new meetup(by the Administrator);
4. Updating the meetup (by the Administrator)
5. Deleting the meetup (by the Administrator)

Other things implemented in the project: 
1. Swagger documentation(with authorization)
2. Joi validation 
3. JWT auth system
