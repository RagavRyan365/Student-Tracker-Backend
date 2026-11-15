# Student-Tracker-Backend
Tech - Nodejs + Expressjs.   
Data Base - PostgreSQL

## Start Server  
Start - npm start  
Dev(nodemon) - npm run dev

## Folder Stucture
    Student-Tracker-Backend/
    ├── .vscode/
    │   └── settings.json
    ├── src/
    │   ├── config/ ------------------ Data Base Configuration
    │   │   └── connectDB.js
    │   ├── repositories/ ------------ Data Base Operations
    │   │   ├── readDBRepo.js
    │   │   └── writeDBRepo.js
    │   └── server.js ---------------- Entry Point
    ├── .env.example
    ├── .gitignore
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

# Project DataBase Table Schemes

## Classes Table

| Class Code | (Faculty Code)[] | Total No of students | Department | Section | Year |
| ---------- | ---------------- | -------------------- | ---------- | ------- | ---- |
| ITC2026    | {ITAP12,ITAP22}  | 60                   | IT         | C       | 1    |
| ITB2026    | {....}           | 65                   | IT         | B       | 1    |

## Faculties Table

| Faculty Code | Name | Email        | Phone      | (Subject code) |
| ------------ | ---- | ------------ | ---------- | -------------- |
| ITAP12       | F1   | F1@gmail.com | 0000000000 | IT26CC         |
| ITAP22       | F2   | F@gamil.com  | 1111111111 | null           |

## Student Table

| Register Number  | Roll No | Name       | Phone       | Email                                                       | Gender | (Class Code) |
| ---------------- | ------- | ---------- | ----------- | ----------------------------------------------------------- | ------ | ------------ |
| 1234567890123456 | 26IT143 | Ragav Ryan | 22222222222 | [ragavryan@psnacet.edu.in](mailto:ragavryana26it@psnacet.edu.in) | M      | ITC2026      |

## Attendance Table

| (Class Code) | (reg code student) | Status P A or OD | (Subject Code) | Date       |
| ------------ | ------------------ | ---------------- | -------------- | ---------- |
| ITC2026      | 1234567890123456   | P                | IT26CC         | mm-dd-yyyy |

## Subject Table

| Subject Code | Subject Name |
| ------------ | ------------ |
| IT26CC       | EOC          |

