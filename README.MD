Deployed URL: http://18.233.63.31 (hosted on AWS EC2 instance)

You can create your own account or use the one below to get loaded data
- Username : Yonatan
- Password : Yonatan

The project is built using:
- React (antd)
- Node.js
- Express.js
- Typescript
- Prisma ORM
- PostgeSql
- AWS

You can find the API documentaion here: http://18.233.63.31/api-docs

- Here is the sample web screenshot for the app:
[Video demo](https://user-images.githubusercontent.com/61096394/217033076-31a20db2-c97f-4f7d-9631-4f90ab4acbc9.webm)

![image](https://user-images.githubusercontent.com/56218443/216784810-85b3be0b-a385-45bd-ae55-e6262ff689b2.png)

![image](https://user-images.githubusercontent.com/56218443/216784829-7cb8aaaa-e2f9-44fe-9cd9-9b62d7331cef.png)

- Here is the mobile responsive look

![image](https://user-images.githubusercontent.com/56218443/216784928-f0dba681-901c-4850-b9e4-f45ba742c4cf.png)

- I used react-query with react context API for state management.

If you clone and run the project locally:
- Update the DATABASE_URL's value inside .env.sample file. 
- Run database migration using the command ```npx prisma migrate dev --schema=./src/prisma/schema.prisma```
- Generate types for prisma and reload IDE ```npx prisma generate --schema=./src/prisma/schema.prisma```
- Seed the data inside the excel file to database with the command ```npx prisma db seed```. Make sure you have ts-node globally installed.

Thanks.
