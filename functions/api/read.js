exports = async function(payload, response) {
  const client = context.services.get("mongodb-atlas");
  const db = client.db("sample_mflix");
  const sample_table_db = db.collection("sample_table");

  // リクエストのボディからメッセージIDを取得
  const body = JSON.parse(payload.body.text());
  const messageId = body.message_id;
  
  // メッセージIDでデータを検索
  const result = await sample_table_db.findOne({ message_id: BSON.Int32(messageId) });
  
  // データが見つかったか確認
  if (result) {
    // 必要なフィールドだけを抽出
    const { name, title, note } = result;
    response.setStatusCode(200);
    response.setBody(JSON.stringify({ name, title, note }));
  } else {
    // データが見つからない場合
    response.setStatusCode(404);
    response.setBody(JSON.stringify({ error: "Data not found" }));
  }
};
