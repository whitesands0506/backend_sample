exports = async function(payload, response){
  const client = context.services.get("mongodb-atlas");
  const db = client.db("sample_mflix");
  const sample_table_db = db.collection("sample_table");

  // payload.body.text()をパースして、message_idを取得します
  const body = JSON.parse(payload.body.text());
  const messageId = body.message_id;

  // 指定されたmessage_idを持つドキュメントをデータベースから検索します
  const result = await sample_table_db.findOne({ message_id: BSON.Int32(messageId) });

  // 結果が存在する場合、name, title, noteを返却します
  if (result) {
    response.setStatusCode(200);
    response.setBody(JSON.stringify({
      name: result.name,
      title: result.title,
      note: result.note
    }));
  } else {
    // 該当するドキュメントが存在しない場合、404ステータスコードとメッセージを返却します
    response.setStatusCode(404);
    response.setBody(JSON.stringify({ error: "Document not found" }));
  }
};
