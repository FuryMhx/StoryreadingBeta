var mysql = require('mysql');
var dbConfig = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '20001120mhx',
  database: 'fury',
};

// Data connection pool
const pool = mysql.createPool(dbConfig);

if (pool) {
  console.log('MySQL server started and connected successfully  ...');
}

// Link to the database
function query(sql, callback) {
  console.log('   ');
  console.info('==========', '[  ', sql, '  ]');
  console.log('   ');
  
  pool.getConnection(function (err, connection) {
    if (err) {
      console.error('Error getting connection from pool', err);
      return callback(err, null); // Early return on error
    }
    
    connection.query(sql, function (err, rows) {
      if (err) {
        console.error('Error executing query', err);
      }
      callback(err, rows);
      connection.release();
    });
  });
}

module.exports = {
  query
};


