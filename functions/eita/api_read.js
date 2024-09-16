exports = async function(payload, response) {
  try {
    const client = context.services.get("mongodb-atlas");
    const db = client.db("sample_mflix");
    const sample_table_db = db.collection("sample_table");

    // リクエストの本文から message_id を取得
    const body = JSON.parse(payload.body.text());
    const messageId = body.message_id;

    // message_id に基づいてデータを検索
    const query = { message_id: BSON.Int32(messageId) };
    const projection = { _id: 0, name: 1, title: 1, note: 1 }; // 必要なフィールドだけを取得

    const result = await sample_table_db.findOne(query, { projection });

    if (result) {
      response.setStatusCode(200);
      response.setBody(JSON.stringify(result)); // 検索結果を返す
    } else {
      response.setStatusCode(404);
      response.setBody(JSON.stringify({ error: "Message not found" })); // データが見つからなかった場合
    }
  } catch (error) {
    console.error("Error finding document:", error);
    response.setStatusCode(500);
    response.setBody(JSON.stringify({ error: "Failed to retrieve document" })); // エラー発生時
  }
};