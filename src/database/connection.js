var sql = require('mssql');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

var config = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'dbadmin', 
            password: 'canopus074'  
        }
    },
    options: {
        
        encrypt: false,
        database: 'meowmosaic'  
    }
};  
var connection = new Connection(config);  
connection.on('connect', function(err) {  
    // If no error, then good to proceed.
    console.log("Connected");  
});


connection.connect();


function executeStatement() {  
    var request = new Request("SELECT 1", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });  
    
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);  
} 
 

// const dbSettings = {
//     user: 'dbadmin',
//     password: 'canopus074',
//     server: 'localhost',
//     database: 'meowmosaic',
//     options: {
//         encrypt: false, 
//         trustServerCertificate: true, 
//       }
// };

 


// const getConnection = async() => {
//     try{
//          await sql.connect(dbSettings)
//         const result = sql.query("SELECT 1");
//         console.log(result);
//     }
//     catch (error) {
//         console.error(error);
//     }
    
   
// }

// module.exports = {
//     getConnection
// }


