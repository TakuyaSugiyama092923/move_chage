let number = 0; // 現在のデータインデックス
let data = []; // 初回取得したデータを保存
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const videoArea = document.getElementById("video");
const button = document.getElementById('btn');

// コンテンツを更新する関数
function updateContent() {
  if (data.length === 0) {
    console.error("データが空です。");
    return;
  }

  // 現在のデータを取得して表示
  const currentData = data[number];
  titleArea.textContent = currentData.title || "タイトルなし";
  contentArea.textContent = currentData.content || "コンテンツなし";
  videoArea.setAttribute("src", currentData.url || "");

  // 次のインデックスを設定（循環）
  number = (number + 1) % data.length;
}

// 初回のみデータを取得する関数
async function fetchData() {
  if (data.length > 0) {
    console.log("データは既に取得済みです。");
    return; // データが取得済みの場合は何もしない
  }

  try {
    const response = await fetch("ajax.json");
    if (response.ok) {
      data = await response.json(); // データを保存
      console.log("データを取得しました:", data);
    } else {
      console.error("データの取得に失敗しました:", response.status);
    }
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
}

// ボタンのクリックイベント登録
button.addEventListener("click", async () => {
  if (data.length === 0) {
    // データが未取得の場合は取得してから更新
    await fetchData();
  }
  updateContent();
});

// 初期表示時にデータを取得して表示
window.onload = async () => {
  await fetchData(); // 最初のデータ取得
  updateContent();   // 最初のデータ表示
};
