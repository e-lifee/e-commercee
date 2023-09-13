const Pool=require("pg").Pool

const pool=new Pool({
    user:"postgres",
    password:"54484238e",
    host:"localhost",
    port:5432,
    database:"newEcommerce"
})

module.exports=pool