import { View } from './views/input_screen.js';
import { getCategories, sendInput } from './models/API.js';

const app = document.getElementById('app');

/**
 * フォームの送信処理を担当
 */
async function handleFormSubmit(e, type) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    // 1. 未来日のバリデーション（フロントエンド側）
    const selectedDate = new Date(formData.get('date'));
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 時間をリセットして比較

    if (selectedDate > today) {
        alert('本日以前の日付を選択してください。');
        return;
    }

    const data = {
        title: formData.get('title'),
        amount: Number(formData.get('amount')),
        category_id: Number(formData.get('category')),
        memo: formData.get('memo'),
        transaction_date: formData.get('date'),
        type: type
    };

    try {
        // 2. 二重送信防止：ボタンを無効化
        submitBtn.disabled = true;
        
        await sendInput(data);
        alert('保存が完了しました！');
        form.reset();
    } catch (error) {
        alert('保存に失敗しました。再度お試しください。');
    } finally {
        // 処理完了後にボタンを再有効化
        submitBtn.disabled = false;
    }
}

/**
 * イベントの初期化（Event Delegation）
 * 見た目を変えずにメモリ効率を上げるため、親要素でイベントを監視します
 */
function initEvents() {
    app.addEventListener('submit', (e) => {
        if (e.target.id === 'content__item--expense-form') {
            handleFormSubmit(e, 'expense');
        } else if (e.target.classList.contains('content__item--income-form')) {
            handleFormSubmit(e, 'income');
        }
    });
}

/**
 * メインのルーティング・制御関数（Controller）
 */
async function navigate() {
    app.innerHTML = View.renderHome();
    
    try {
        const categories = await getCategories();
        
        // 支出カテゴリーの反映
        View.updateCategories('.content__item--expense .category', 
            categories.filter(c => c.type === 'expense'));
            
        // 収入カテゴリーの反映
        View.updateCategories('.content__item--income .category', 
            categories.filter(c => c.type === 'income'));

    } catch (err) {
        console.error('データの読み込みに失敗しました:', err);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-msg';
        errorDiv.textContent = 'データの読み込みに失敗しました。再度お試しください。';
        app.appendChild(errorDiv);
    }
}

// 起動時の初期化
initEvents();
window.navigate = navigate;
