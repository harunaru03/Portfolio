// ページが読み込まれたらAPIを取得しにいく
document.addEventListener('DOMContentLoaded', fetchCategories);

// APIからカテゴリーデータを取得する
async function fetchCategories() {
    try {
        // 実際のバックエンドのURLを入れる
        const response = await fetch('');
        
        // エラーがないか確認
        if (!response.ok) {
            throw new Error(`エラーが発生しました: ${response.status}`);
        }

        // データをJSON形式に変換
        const data = await response.json();
        
        // 2. 取得したデータを使って、支出と収入のプルダウンを書き換える
        updateSelectElement('.content__item--expense .category', data.expense);
        updateSelectElement('.content__item--income .category', data.income);

    } catch (error) {
        console.error('カテゴリーの取得に失敗しました:', error);
    }
}

// 3. プルダウンの選択肢（optionタグ）を作り直す
function updateSelectElement(selector, categoryList) {
    // 画面の中から対象の select タグを見つける
    const select = document.querySelector(selector);
    if (!select) return;

    // 現在HTMLに直接書かれている <option> を一旦すべて消す
    select.innerHTML = '';

    // APIから受け取ったリストの数だけ <option> を作って追加していく
    categoryList.forEach(category => {
        // 新しい <option> タグを作る
        const option = document.createElement('option');
        
        option.value = category.ID;
        option.textContent = category.name;
        
        // select タグの中に追加
        select.appendChild(option);
    });
}
