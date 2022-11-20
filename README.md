# todolist-react-ts-node-express-mysql

## MYSQL - General info:
All tables are connected.
User connected to his lists, and each list conencted to its tasks.
Foreign key connected between the tables.


## MYSQL tables script:

### Users
```
CREATE TABLE `users` (
  `username` varchar(45) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `first` varchar(45) NOT NULL,
  `last` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`username`,`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
### Lists
```
CREATE TABLE `lists` (
  `username` varchar(20) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `adding_foreign_key` (`username`),
  CONSTRAINT `adding_foreign_key` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### Tasks
```
CREATE TABLE `tasks` (
  `list_id` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
