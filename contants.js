//express serve config
const PORT = 8031;
const HOST = "localhost";
const HOST_URL = "http://localhost:8031";

//sql server config
const SQL_USER = "sa";
const SQL_SERVER = "127.0.0.1";
const SQL_PASSWORD = "12345678";
const SQL_DATABASE = "book_store";

// url front end

const FRONTEND_URL = "http://localhost:3000";

//mysql config
const MYSQL_USER = "root";
const MYSQL_PASSWORD = "mysqlpassword";
const MYSQL_HOST = "localhost";
const MYSQL_DATABASE = "book_store";

module.exports = {
    PORT, HOST, HOST_URL,
    SQL_USER, SQL_SERVER, SQL_PASSWORD, SQL_DATABASE, // SQL Server
    MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DATABASE, // MySQL
    FRONTEND_URL,
}
