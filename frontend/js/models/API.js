/**
 * バックエンドAPIからカテゴリーの一覧を取得する（Model）
 * @async
 * @returns {Promise<Array>} カテゴリーオブジェクトの配列
 */
export async function getCategories() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api/v1';
    
    try {
        const response = await fetch(`${baseUrl}/categories`);

        if (!response.ok) {
            throw new Error(`エラーが発生しました: ${response.status}`);
        }

        const data = await response.json();
        console.log('API取得成功:', data);

        // APIからの返り値が { data: [...] } か [...] か両方に対応する
        return data.data ? data.data : data;

    } catch (error) {
        console.error('カテゴリーの取得に失敗しました:', error);
        throw error; // エラーは上位（Controller）でキャッチできるように再送
    }
}

/**
 * 入力された家計簿データをバックエンドに送信して保存する（Model）
 * @async
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function sendInput(data) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api/v1';

    try {
        const response = await fetch(`${baseUrl}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('保存に失敗しました');
        }

        return await response.json();

    } catch (error) {
        console.error('通信エラー:', error);
        throw error;
    }
}