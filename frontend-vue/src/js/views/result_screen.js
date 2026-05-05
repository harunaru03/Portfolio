export const Result = {
    /** 
     * アプリ全体の土台（タブ切り替え部分を含む）を組み立てる
     * @returns {string} HTML文字列
     */
    renderResultScreenList: () => {
        return `
        <div>あ
        ${Result.renderResultExpensesList()}
        ${Result.renderResultIncomeList()}
        </div>
        `;
    },

    renderResultExpensesList: () => {
        return `
        <div>い</div>
        `;
    },

    renderResultIncomeList: () => {
        return `
        <div>う</div>
        `;
    },
};