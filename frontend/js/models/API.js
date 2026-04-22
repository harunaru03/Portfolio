const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api/v1';

/**
 * 【共通リクエスト】
 * タイムアウト、ベースURLの結合、レスポンスチェックを一括で行う
 * 
 * @param {string} endpoint - APIのパス
 * @param {Object} options - fetchに渡すメソッドやヘッダーなどの設定
 * @param {number} timeout - 通信を打ち切る時間（ミリ秒）
 * @returns {Promise<any>} 解析済みのJSONデータ
 */
async function request(endpoint, options = {}, timeout = 10000) {
    // 通信タイムアウトのための準備
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
        // 実際に通信を実行
        const response = await fetch(`${baseUrl}${endpoint}`, {
            ...options,
            signal: controller.signal // タイムアウト時に通信を止めるためのシグナル
        });

        // 通信はできたがサーバー側でエラー（404, 500等）になった場合のチェック
        if (!response.ok) {
            throw new Error(`サーバーエラー: ${response.status}`);
        }

        // 成功した場合はJSONとして解析して返す
        return await response.json();

    } finally {
        // 成功・失敗に関わらずタイマーを解除（メモリリークの防止）
        clearTimeout(timer);
    }
}

/**
 * 【個別API：カテゴリー取得】
 * サーバーから「食費」「給与」などのカテゴリー一覧を持ってくる
 * 
 * @param {number} timeout
 * @returns {Promise<Array>} カテゴリーの配列
 */
export async function getCategories(timeout) {
    // 共通関数requestを呼び出して生データを取得
    const data = await request('/categories', {}, timeout);
    
    /**
     * 【データ堅牢化（null対策）】
     * サーバーからの返り値が特殊なケースでも、後続の処理（filterやmap）が
     * クラッシュしないように、必ず配列として返すようにする
     * 1. 「data?.data」: オブジェクトの中に「data」というプロパティがあればそれを流用
     * 2. 「?? data」: なければdata自体を流用
     * 3. 「?? []」: それでもnull等の場合は、最終的に空の配列 [] を返す
     */
    return data?.data ?? data ?? [];
}

/**
 * 【個別API：データ保存】
 * 入力した家計簿データをサーバーに送信し、保存
 * 
 * @param {Object} data - 保存したい内容のオブジェクト
 * @param {number} timeout
 */
export async function sendInput(data, timeout) {
    // 保存（POSTリクエスト）の場合は、メソッドとヘッダー、bodyを指定して送信
    return await request('/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }, timeout);
}