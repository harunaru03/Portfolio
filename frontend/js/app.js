import { View } from './views/input_screen.js';
import { getCategories, sendInput } from './models/API.js';

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
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-msg';
        errorDiv.textContent = 'データの読み込みに失敗しました。ネットワーク状況を確認して再度お試しください。';
        app.appendChild(errorDiv);
    }
}

/**
 * フォームの送信処理を担当
 * @param {Event} e 
 * @param {string} type - 'expense' または 'income'
 */
async function handleFormSubmit(e, type) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = {
        amount: Number(formData.get('amount')),
        category_id: Number(formData.get('category')),
        memo: formData.get('memo'),
        date: formData.get('date'),
        type: type
    };

    try {
        await sendInput(data);
        alert('保存が完了しました！');
        form.reset();
    } catch (error) {
        alert('保存に失敗しました。再度お試しください。');
    }
}

/**
 * フォームのイベントリスナー設定
 */
function setupEventListeners() {
    const expenseForm = document.getElementById('content__item--expense-form');
    if (expenseForm) {
        expenseForm.addEventListener('submit', (e) => handleFormSubmit(e, 'expense'));
    }

    const incomeForm = document.querySelector('.content__item--income-form');
    if (incomeForm) {
        incomeForm.addEventListener('submit', (e) => handleFormSubmit(e, 'income'));
    }
}

window.navigate = navigate;
