import { View } from './views/expenses.js';
import { getCategories } from './models/API.js';

const app = document.getElementById('app');

/**
 * メインのルーティング・制御関数（Controller）
 */
async function navigate() {
    // 1. 各Viewパーツを組み合わせて描画
    app.innerHTML = View.renderHome();
    
    try {
        // 2. Modelからデータを取得
        const categories = await getCategories();
        
        // 3. Viewにデータを渡して表示内容を更新（ModelはDOMを知らない）
        View.updateCategories('.content__item--expense .category', 
            categories.filter(c => c.Type === 'expense'));
            
        View.updateCategories('.content__item--income .category', 
            categories.filter(c => c.Type === 'income'));
            
        // 4. フォームのイベント設定
        setupEventListeners();

    } catch (err) {
        console.error('アプリの初期化中にエラーが発生しました:', err);
        // ユーザー向けのエラー表示を追加
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-msg';
        errorDiv.textContent = 'データの読み込みに失敗しました。ネットワーク状況を確認して再度お試しください。';
        app.appendChild(errorDiv);
    }
}

/**
 * フォームのイベントリスナー設定
 * 本来的にはView内にイベントのバインディングを持たせるのが理想的ですが、
 * 今回はControllerレイヤーで簡易的に管理します。
 */
function setupEventListeners() {
    const expenseForm = document.getElementById('content__item--expense-form');
    if (expenseForm) {
        expenseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('支出の保存ボタンが押されました！');
        });
    }

    const incomeForm = document.querySelector('.content__item--income-form');
    if (incomeForm) {
        incomeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('収入の保存ボタンが押されました！');
        });
    }
}

window.navigate = navigate;
