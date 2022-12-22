import express from 'express'
import knex from 'knex';
import oracledb from 'oracledb'

let app = express();

let client = null;

const start = async () => {
	try {
		oracledb.initOracleClient({"libDir": "C:\\oracle\\instantclient_19_17"});
		 client = knex({
                client: 'oracledb',
                connection: {
                    "user": "DIGITRADEUSER",
                    "password": "Ptb3gzAS",
                    "connectString": "oneerp:1522/test",
					"libDir": "C:\\oracle\\instantclient_19_17"
                },
            });
            let result = await client.raw('select 1 from dual');
	} catch (err) {
		console.log(err);
	}
}

app.get("/", async (req, res) => {
	try {
		let result = await client.raw("SELECT * FROM dbtrans.VU_BAK_WEB_CUSTS");
		res.send(result);
	} catch (err) {
		console.log(err);
	}
});


			
start()

app.listen(1234, () => {
	console.log("listening");
});