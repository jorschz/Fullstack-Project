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














