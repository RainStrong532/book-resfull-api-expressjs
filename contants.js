//express serve config
const PORT=8031;
const HOST="localhost";
const HOST_URL="http://localhost:8031";

//sql server config
const SQL_USER="sa";
const SQL_SERVER="127.0.0.1";
const SQL_PASSWORD="12345678";
const SQL_DATABASE="book_store";

//mysql config
const MYSQL_USER="root";
const MYSQL_PASSWORD="mysqlpassword";
const MYSQL_HOST="localhost";
const MYSQL_DATABASE="book_store";

const TOKEN_SECRET = "c6fe37c7d392cf78a76ae4187795519d32833baaab12de9461064fb07f0bcfa17f2305aeabc15ddb6b0c6d86b754c3cc219e7d2749512df01d9f617ca4802b28"; // dùng để bảo mật cho đăng nhập càng phức tạp àng khó hack

module.exports = {
    PORT, HOST, HOST_URL,
    SQL_USER, SQL_SERVER, SQL_PASSWORD, SQL_DATABASE, // SQL Server
    MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DATABASE, // MySQL
    TOKEN_SECRET
}