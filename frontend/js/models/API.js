document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();    // カテゴリの取得と表示
    setupFormEvents();    // フォームの送信イベント設定
});

/**
 * バックエンドAPIと通信し、カテゴリーの一覧を取得して画面のプルダウンを更新する
 * @async
 * @returns {Promise<void>} 戻り値なし（非同期でDOM更新までを実行）
 */
async function fetchCategories() {
    try {
            const response = await fetch('http://localhost:8080/api/v1/categories');
        
        if (!response.ok) {
            throw new Error(`エラーが発生しました: ${response.status}`);
        }

        const data = await response.json();
        console.log('取得した生データ:', data);

        // APIからの返り値が { data: [...] } か [...] か両方に対応する
        const categories = data.data ? data.data : data;
        
        // 💡 filter() を使って振り分ける
        const expenseCategories = categories.filter(category => category.Type === 'expense');
        const incomeCategories  = categories.filter(category => category.Type === 'income');

        // デバッグ用：振り分けられたか確認するログ
        console.log('支出として認識された数:', expenseCategories.length);
        console.log('収入として認識された数:', incomeCategories.length);

        // 振り分けた結果をそれぞれ別のプルダウンに書き換える
        updateSelectElement('.content__item--expense .category', expenseCategories);
        updateSelectElement('.content__item--income .category', incomeCategories);

    } catch (error) {
        console.error('カテゴリーの取得に失敗しました:', error);
    }
}

/**
 * 受け取ったカテゴリーのリストを使って、指定されたセレクトボックス（プルダウン）の選択肢を書き換える
 * @param {string} selector - 更新対象となるセレクトボックスのCSSセレクタ（例: '.content__item--expense .category'）
 * @param {Array<{ID: number, Name: string}>} categoryList - APIから取得したカテゴリーオブジェクトの配列
 * @returns {void}
 */
function updateSelectElement(selector, categoryList) {
    const select = document.querySelector(selector);
    
    // データがない場合や対象が見つからない場合は処理を止める
    if (!select || !categoryList) return;

    select.innerHTML = '';

    categoryList.forEach(category => {
        const option = document.createElement('option');
        option.value = category.ID;
        option.textContent = category.Name;
        select.appendChild(option);
    });
}

/**
 * 支出・収入の各フォームに対して、送信（保存ボタンクリックやエンターキー押下）時のイベントリスナーを設定する
 * @returns {void}
 */
function setupFormEvents() {
    // 支出フォームの設定
    const expenseForm = document.getElementById('content__item--expense-form');
    if (expenseForm) {
        expenseForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            console.log('支出の保存ボタンが押されました！');
        });
    }

    // 収入フォームの設定
    const incomeForm = document.querySelector('.content__item--income-form');
    if (incomeForm) {
        incomeForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            console.log('収入の保存ボタンが押されました！');
        });
    }
}
