export const View = {
    /** 
     * アプリ全体の土台（タブ切り替え部分を含む）を組み立てる
     * @returns {string} HTML文字列
     */
    renderHome: () => {
        return `
            <div class="container__box">
<!-- ラジオボタンを使って支出/収入の画面タブ切り替えを実現 -->
                <input type="radio" name="income_and_outgo" id="expense" class="content__tab--radio" checked>
                <input type="radio" name="income_and_outgo" id="income" class="content__tab--radio">
                <div class="content__nav">
                    <label for="expense">支出</label>
                    <label for="income">収入</label>
                </div>
<!-- 支出と収入それぞれのフォームを入れ子で呼び出し -->
                ${View.renderExpenses()}
                ${View.renderIncome()}
            </div>
        `;
    },

    /** 
     * 支出入力フォームのパーツ
     */
    renderExpenses: () => {
        return `
            <div class="content__item--expense">
                <form id="content__item--expense-form">
<!-- タイトル入力欄（バックエンドで必須） -->
                    <div class="inner__item">
                        <input type="text" name="title" placeholder="タイトル（例: ランチ）" class="amount-display" required>
                    </div>
<!-- 金額入力欄 -->
                    <div class="inner__item">
                        <input type="number" name="amount" placeholder="&yen;0" class="amount-display" required>
                    </div>
<!-- カテゴリーのセレクトボックス（APIから取得したデータが流し込まれる） -->
                    <div class="inner__item">
                        <label for="category" class="inner-item__menu">カテゴリー</label>
                            <select size="1" name="category" class="category" required>
                                <option value="" disabled selected>選択してください</option>
                            </select>
                    </div>
<!-- 自由記述のメモ -->
                    <div class="inner__item">
                        <label for="memo" class="inner-item__menu">メモ</label>
                        <textarea name="memo" class="inner-item__menu"></textarea>
                    </div>
<!-- 日付選択 -->
                    <div class="inner__item">
                        <label for="date" class="inner-item__menu">日付</label>
                        <input type="date" name="date" class="inner-item__menu" required>
                    </div>
                    
<!-- 保存処理の成功/失敗を伝えるインラインメッセージ -->
                    <div class="form-feedback"></div>
                    <div>
                        <button type="submit" class="save-btn">保存</button>
                    </div>
                </form>
            </div>`;
    },

    /** 
     * 収入入力フォームのパーツ
     */
    renderIncome: () => {
        return `
            <div class="content__item--income">
                <form class="content__item--income-form">
                    <div class="inner__item">
                        <input type="text" name="title" placeholder="タイトル（例: 4月分給与）" class="amount-display" required>
                    </div>
                    <div class="inner__item">
                        <input type="number" name="amount" placeholder="&yen;0" class="amount-display" required>
                    </div>
                    <div class="inner__item">
                        <label for="category" class="inner-item__menu">カテゴリー</label>
                            <select size="1" name="category" class="category" required>
                                <option value="" disabled selected>選択してください</option>
                            </select>
                    </div>
                    <div class="inner__item">
                        <label for="memo" class="inner-item__menu">メモ</label>
                        <textarea name="memo" class="inner-item__menu"></textarea>
                    </div>
                    <div class="inner__item">
                        <label for="date" class="inner-item__menu">日付</label>
                        <input type="date" name="date" class="inner-item__menu" required>
                    </div>
                    <div class="form-feedback"></div>
                    <div>
                        <button type="submit" class="save-btn">保存</button>
                    </div>
                </form>
            </div>`;
    },

    /**
     * プルダウン（select要素）の中に、APIから取得したカテゴリーデータを流し込む
     * @param {string} selector
     * @param {Array} categories
     */
    updateCategories: (selector, categories) => {
        const select = document.querySelector(selector);
        if (!select || !categories) return;

        // カテゴリーが1件もない場合の表示
        if (categories.length === 0) {
            select.innerHTML = '<option value="" disabled selected>カテゴリーが登録されていません</option>';
            return;
        }

        // 既存の選択肢をクリアして、新しいリストを作成
        select.innerHTML = `
            <option value="" disabled selected>選択してください</option>
            ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
        `;
    }
};