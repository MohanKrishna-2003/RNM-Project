CREATE TABLE usertable (
    id SERIAL PRIMARY KEY,                
    name VARCHAR(20) NOT NULL,            
    email VARCHAR(100) NOT NULL UNIQUE,   
    password VARCHAR(255) NOT NULL,      
    address TEXT);                          
    
select * from "usertable";

--create some sample values and check