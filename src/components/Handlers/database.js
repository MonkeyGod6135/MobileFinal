// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const myContactsDB = openDatabase({name: 'MyContacts.db'});
const ContactsTableName = 'contact';

module.exports = {
    // declare function that will create the contact table
    createContactsTable: async function () {
        // declare a transaction that will execute a SQL statement
        (await myContactsDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${ContactsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    fullname TEXT,
                    phone TEXT,
                    email TEXT,
                    groupname TEXT
                );`,
                // arguments needed when using an SQL prepared statement
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log('Contacts table created successfully');
                },
                error => {
                    console.log('Error creating contacts table ' + error.message);
                },
            );
        });
    },

     // declare function that will insert a row into the contacts table
     addContact: async function (fullname, phone, email, groupname) {
        // declare a transaction that will execute an SQL statement
        (await myContactsDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `INSERT INTO ${ContactsTableName} (fullname, phone, email, groupname) VALUES ("${fullname}", "${phone}", "${email}", "${groupname}")`,
                // arguments passed when using SQL prepared statements
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log(fullname + " added successfully");
                },
                error => {
                    console.log('Error adding fullname ' + error.message);
                },
            );
        });
    },

};