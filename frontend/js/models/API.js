document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();    // カテゴリの取得と表示
    setupFormEvents();    // フォームの送信イベント設定
});

async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/categories');
        
        if (!response.ok) {
            throw new Error(`エラーが発生しました: ${response.status}`);
        }

        const data = await response.json();
        
        // 支出のプルダウンを書き換える
        updateSelectElement('.content__item--expense .category', data);

    } catch (error) {
        console.error('カテゴリーの取得に失敗しました:', error);
    }
}

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
