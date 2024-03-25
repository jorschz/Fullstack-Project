# Fullstack-Project: Petshop
This project consists of a product inventory management application. The front-end developed in React and back-end developed in Spring.


## How to use

### Authentication
#### Register
````
POST /user/register
````
| Parameter | Type   | Description                   |
|:----------|:-------|:------------------------------|
| name      | string | **Required**: User's name     |
| email     | string | **Required**: User's email    |
| password  | string | **Required**: User's password |

#### Sign In
````
POST /user/login
````
| Parameter | Type   | Description                   |
|:----------|:-------|:------------------------------|
| email     | string | **Required**: User's Email    |
| password  | string | **Required**: User's Password | 

---------------------------------------------------------------------------------------------------

### Warehouse
#### Register Warehouse
```
POST /warehouse
```
| Parameter | Type   | Description                            |
|:----------|:-------|:---------------------------------------|
| id        | long   | **Required**: Warehouse ID             |
| name      | string | **Required**: Warehouse Name           |
| animal    | string | **Required**: Animal Type (Dog or Cat) |

***Note***: *All registered products will have status as TRUE*

#### Listing all warehouses
```
GET /warehouse
```

#### List warehouse by ID
```
GET /warehouse/${id}
```

#### Edit warehouse
```
PUT /warehouse/${id}
```
| Parameter | Type   | Description                            |
|:----------|:-------|:---------------------------------------|
| id        | long   | **Required**: Warehouse ID             |
| name      | string | **Required**: Warehouse Name           |
| animal    | string | **Required**: Animal Type (Dog or Cat) |

#### Disable warehouse
```
PUT /warehouse/disable/${id}
```

***Note***: *If there is stock in the warehouse, it will not be possible to disable it*

---------------------------------------------------------------------------------------------------

### Inventory

#### Register inventory
```
POST /inventory
```
| Parameter | Type   | Description                                                       |
|:----------|:-------|:------------------------------------------------------------------|
| id        | long   | **Required**: Product ID                                          |
| product   | string | **Required**: Product Type (Food, Flea control, Parasite Control) |
| animal    | string | **Required**: Animal Type (Dog or Cat)                            |
| category  | string | **Required**: Animal Category ( Puppy/Kitten or Adult )           |
| quantity  | long   | **Required**: Quantity                                            |
| warehouse | any    | **Required**: Warehouse ID                                        |

#### List all inventories
```
GET /inventory
```

#### List inventory by ID
```
GET /inventory/${id}
```

#### Edit inventory
```
PUT /inventory/${id}
```
| Parameter | Type   | Description                                                         |
|:----------|:-------|:--------------------------------------------------------------------|
| product   | string | **Required**: Product Type (Food, Flea control or Parasite Control) |
| quantity  | long   | **Required**: Quantity                                              |

#### Delete inventory
```
DELETE /inventory/${id}
```

--------------------------------------------------------------------------------------------------

### Dashboard

#### Load records for the dashboard
```
GET /statistics/${animal}/${category}
```
| Parameter | Type   | Description                                         |
| animal    | string | **Required**: Animal Type (Dog or Cat)              |
| category  | string | **Required** Animal Category (Puppy/Kitten or Adult |


## Application Usage
Users are exppected to clone the project into their local environment and set up the [PostgreSQL](https://www.postgresql.org/) database with the database name specified in the proejct. Additionally, database credentials need to be provided in the file:
```
application.properties
```
Once the environment is set up, the aplication can be started in an IDE, such as [IntelliJ](https://www.jetbrains.com/pt-br/idea/)

--------------------------------------------------------------------------------------------------

This project was collaboratively developed as part of an evaluation assignment for the Senai course.
















