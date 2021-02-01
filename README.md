# FabWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Description

   `installment` modules contains all the components and models required for this project. There are two components ,
   `LoanListComponent` & `PaymentListComponent`,as well as UI model ts interfaces `installment`,`loan`.

   Right now the backend api is missing but backend logic is mocked in TS files. The folder called `mock` contains
   backend logic (`backend-mock.service`) as well as http service for loading json files from assets directory.
  
   Apart that the `widget` module contains pagination component ,this component facilitating pagination feature.

   All the styles are written in `css`. No third party libraries used.

##  About the backend logic
   
   As per the  description the technical requirement for backend technology is `Java`. but my strength is in .NET technologies . there is another repository contains all the backend logic written in .NET core 5.
    https://github.com/binson143/Fab-Api.git

## SQL

   As per the description ,sql is not required data should handled from json files. but if we need to use PSQL , the query would be.

   Table structure

   Parent
   =================================

    ID,Sender,Receiver,TotalAmount
   =================================

Child
   =================================

    ID,ParentId,PaidAmount
   =================================

1.) display all the parent transactions,Limit and Offset values will vary as per the pagination parameters.
   
    
```
SELECT "Parent"."Id","Sender", "Receiver", "TotalAmount","Child"."totalPaidAmount"
FROM public."Parent"
INNER JOIN(
SELECT "Child"."ParentId",SUM("Child"."PaidAmount") as "totalPaidAmount"
FROM public."Child"
GROUP BY "Child"."ParentId")  as "Child"
ON "Parent"."Id"="Child"."ParentId"
LIMIT 2
OFFSET 0;
```

2.)  populate the corresponding children (installment) data 

```
SELECT "Child"."Id","Parent"."Sender", "Parent"."Receiver", "Child"."PaidAmount"
FROM public."Child"
INNER JOIN 
public."Parent"
ON "Parent"."Id"="Child"."ParentId"
WHERE  "Child"."ParentId"=1
```
