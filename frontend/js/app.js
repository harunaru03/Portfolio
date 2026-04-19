import { View } from './views/input_screen.js';
import { getCategories } from './models/API.js';

const app = document.getElementById('app');

/**
 * メインのルーティング・制御関数（Controller）
 */
async function navigate() {
    app.innerHTML = View.renderHome();
    
    try {
        const categories = await getCategories();
        
        View.updateCategories('.content__item--expense .category', 
            categories.filter(c => c.Type === 'expense'));
            
        View.updateCategories('.content__item--income .category', 
            categories.filter(c => c.Type === 'income'));
            
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
 * 小規模のアプリなので一つのファイルを見ればどの画面で、何をしているかという流れが一目で分かる方が開発スピードが上がるため簡易実装にする
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
