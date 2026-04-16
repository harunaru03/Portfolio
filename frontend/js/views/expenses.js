export const View = {
    renderHome: () => {
        return `
            <div class="container__box">
                <input type="radio" name="income_and_outgo" id="expense" class="content__tab--radio" checked>
                <input type="radio" name="income_and_outgo" id="income" class="content__tab--radio">
                <div class="content__nav">
                    <label for="expense">支出</label>
                    <label for="income">収入</label>
                </div>
                ${View.renderExpenses()}
                ${View.renderIncome()}
            </div>
        `;
    },
    renderExpenses: () => {
        return `<div class="content__item--expense">
                    <form id="content__item--expense-form">
                        <div class="inner__item">
                            <input type="text" placeholder="&yen;0" class="amount-display">
                        </div>
                        <div class="inner__item">
                            <label for="category" class="inner-item__menu">カテゴリー</label>
                                <select size="1" name="category" class="category">
                                    <option value="" disabled selected>読み込み中...</option>
                                </select>
                        </div>
                        <div class="inner__item">
                            <label for="memo" class="inner-item__menu">メモ</label>
                            <textarea name="memo" class="inner-item__menu"></textarea>
                        </div>
                        <div class="inner__item">
                            <label for="date" class="inner-item__menu">日付</label>
                            <input type="date" class="inner-item__menu">
                        </div>
                        <div>
                            <button type="submit" class="save-btn">保存</button>
                        </div>
                    </form>
                </div>`;
    },
    renderIncome: () => {
        return `<div class="content__item--income">
                    <form class="content__item--income-form">
                        <div class="inner__item">
                            <input type="text" placeholder="&yen;0" class="amount-display">
                        </div>
                        <div class="inner__item">
                            <label for="category" class="inner-item__menu">カテゴリー</label>
                                <select size="1" name="category" class="category">
                                    <option value="" disabled selected>読み込み中...</option>
                                </select>
                        </div>
                        <div class="inner__item">
                            <label for="memo" class="inner-item__menu">メモ</label>
                            <textarea name="memo" class="inner-item__menu"></textarea>
                        </div>
                        <div class="inner__item">
                            <label for="date" class="inner-item__menu">日付</label>
                            <input type="date" class="inner-item__menu">
                        </div>
                        <div>
                            <button type="submit" class="save-btn">保存</button>
                        </div>
                    </form>
                </div>`;
    }
};