exports = async function(payload,response){
  const client = context.services.get("mongodb-atlas");
  const db = client.db("sample_mflix");
  const sample_table_db = db.collection("sample_table");

  const randomId =Math.floor(10000000 + Math.random() * 90000000);

  const body = JSON.parse(payload.body.text());
  
  const name = body.name;
  const title = body.title;
  const note = body.note;
  const result = sample_table_db.insertOne({
   message_id: BSON.Int32(randomId),
   name: name,
   title: title,
   note: note,  
   created_at: new Date(),
  });

  console.log(`Insert result: ${result}`);

  response.setStatusCode(200);
  response.setBody(JSON.stringify({ result: 200 }));
};
  
