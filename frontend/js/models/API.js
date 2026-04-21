const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api/v1';

/**
 * 【Model】バックエンドからカテゴリーの一覧を取得する
 * @param {number} timeout - ネットワークの応答を待つ上限時間（デフォルト10秒）
 * @returns {Promise<Array>} カテゴリーオブジェクトの配列
 */
export async function getCategories(timeout = 10000) {
    // 通信を中断するためのコントローラーを作成
    const controller = new AbortController();
    // 設定時間（10秒）が過ぎたら通信を強制終了させるタイマー
    const timer = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(`${baseUrl}/categories`, {
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`サーバーエラー: ${response.status}`);
        }

        const data = await response.json();
        // APIのレスポンスが { data: [...] } の場合と、直接配列 [...] の場合の両方に対応
        return data.data ? data.data : data;

    } finally {
        // 通信が終わったらタイマーを解除（メモリリーク防止）
        clearTimeout(timer);
    }
}

/**
 * 【Model】入力された家計簿のデータをサーバーに送信（保存）する
 * @param {Object} data
 * @param {number} timeout
 */
export async function sendInput(data, timeout = 10000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(`${baseUrl}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error('保存に失敗しました');
        }

        return await response.json();

    } finally {
        clearTimeout(timer);
    }
}