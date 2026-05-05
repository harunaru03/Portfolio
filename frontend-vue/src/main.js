import { View } from './js/views/input_screen.js';
import { getCategories, sendInput } from './api/API.js';
import { Result } from './js/views/result_screen.js';
import './assets/global.css';

const app = document.getElementById('app');

/**
 * 画面内に通知メッセージ（成功・エラー）を表示する
 * @param {HTMLElement} form - メッセージを表示する対象のフォーム要素
 * @param {string} message - 表示するテキスト
 * @param {boolean} isError - エラー表示（赤色）にするかどうか
 */
function showFeedback(form, message, isError = false) {
    const feedbackArea = form.querySelector('.form-feedback');
    if (!feedbackArea) return;

    feedbackArea.textContent = message;
    feedbackArea.className = `form-feedback ${isError ? 'form-feedback--error' : 'form-feedback--success'}`;

    // 5秒後に自動的にメッセージを消去して画面をスッキリさせる
    setTimeout(() => {
        feedbackArea.textContent = '';
        feedbackArea.className = 'form-feedback';
    }, 5000);
}

/**
 * @param {Event} e
 * @param {string} type
 */
async function handleFormSubmit(e, type) {
    e.preventDefault(); // 画面のリロードを防ぐ
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    // 【バリデーション】未来日の入力をフロントエンドで事前に防ぐ
    const selectedDate = new Date(formData.get('date'));
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0); //JSTで+9時間されるため0時0分0秒にする
    today.setHours(0, 0, 0, 0); // 今日を判定するために時間の情報を消す

    if (selectedDate > today) {
        showFeedback(form, '本日以前の日付を選択してください。', true);
        return;
    }

    // バックエンドAPIが期待するデータ形式（JSON）にまとめる
    const data = {
        title: formData.get('title'),
        amount: Number(formData.get('amount')),
        category_id: Number(formData.get('category')),
        memo: formData.get('memo'),
        transaction_date: formData.get('date'), // key名をバックエンド側に合わせる
        type: type
    };

    try {
        // 【二重送信防止】通信が終わるまでボタンを無効化する
        submitBtn.disabled = true;
        
        // Modelを呼び出してサーバーにデータを送る
        await sendInput(data);
        
        // 成功時のフィードバック
        showFeedback(form, '保存が完了しました！');
        form.reset(); // 入力欄をまっさらに戻す
        
    } catch (error) {
        // タイムアウトエラー（AbortController）とそれ以外のエラーを判別する
        if (error.name === 'AbortError') {
            showFeedback(form, '通信がタイムアウトしました。再度お試しください。', true);
        } else {
            showFeedback(form, '保存に失敗しました。再度お試しください。', true);
        }
    } finally {
        // 成功・失敗に関わらず、最後にボタンをまた押せる状態に戻す
        submitBtn.disabled = false;
    }
}

/**
 * イベントリスナーの初期設定（Event Delegation）
 * 画面遷移のたびに登録し直さなくていいように、一番外側の#app要素でイベントを待ち受ける
 */
function initEvents() {
    app.addEventListener('submit', (e) => {
        // どのフォームから送信されたかに応じて処理を分岐
        if (e.target.id === 'content__item--expense-form') {
            handleFormSubmit(e, 'expense');
        } else if (e.target.classList.contains('content__item--income-form')) {
            handleFormSubmit(e, 'income');
        }
    });
}

/**
 * 画面のページ遷移を担当する
 */
async function navigate(page = 'input') {

    // 画面をクリア
    app.innerHTML = '';

    // 収支の結果画面を表示する
    switch(page) {
        case 'result':
            app.innerHTML = Result.renderResultScreenList();
            break;

    // 画面の見た目（HTML）をViewから取得して反映
        case 'input':
            app.innerHTML = View.renderInputScreen();
            await setupInputPage();
            break;
        default:
            app.innerHTML = '';
            break;
    }
}

/**
 * 入力画面に必要なデータ（カテゴリーなど）を準備する
 */
async function setupInputPage() {
    try {
        // モデルからカテゴリー一覧を取得
        const categories = await getCategories();
        
        // 取得したデータを「支出」用と「収入」用に振り分けてセレクトボックスに反映
        View.updateCategories('.content__item--expense .category', 
            categories.filter(c => c.type === 'expense'));
            
        View.updateCategories('.content__item--income .category', 
            categories.filter(c => c.type === 'income'));

    } catch (err) {
        console.error('データの初期読み込みエラー:', err);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-msg';
        errorDiv.textContent = 'データの読み込みに失敗しました。画面を更新してください。';
        app.appendChild(errorDiv);
    }
}

// アプリ起動時に一度だけイベント設定を走らせる
initEvents();

// pencilボタンなどからの呼び出しに対応するためグローバルに公開
window.navigate = navigate;

