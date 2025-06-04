import pkg from 'pg';
const { Pool } = pkg;

// refactoring to use the docker volume 
/*
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gauravkharel',
    password: 'Database101@',
    port: 5432
});
*/
const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
});

pool.connect()
    .then(() => { console.log('Connected to PostgreSQL database!'); })
    .catch((err) => { console.error('Error connecting to the database:', err); });


export default pool;
