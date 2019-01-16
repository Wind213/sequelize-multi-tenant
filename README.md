# sequelize-multi-tenant

An example of shared database schema isolated multi-tenant implementation with express, nodejs and sequelize.

## Getting Started

1. run query from `database/shared.sql`, `database/tenant_1.sql`, and `database/tenant_1.sql`
2. change parameter `username` and `password` from `middlewares/sequelize.js`
3. execute `npm install`
4. running `npm start`
5. call api from your api client (ex. Postman) 
```
localhost:9090/tasks 
```
with header
```
"Authorization":"{"email": "user1@example.com", "password": "pass1"}"
```

### Prerequisites

nodejs >= 8.x

mariadb >= 10.2.x

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
