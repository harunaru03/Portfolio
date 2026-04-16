import { View } from './views/expenses.js';
import { fetchCategories, setupFormEvents } from './models/API.js';

const app = document.getElementById('app');

function navigate() {
    app.innerHTML = View.renderHome();
    
    // HTML描画後にAPI連携を実行
    fetchCategories();
    setupFormEvents();
}

window.navigate = navigate;
