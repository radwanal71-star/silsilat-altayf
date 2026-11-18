const container = document.getElementById('users-container');

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        container.innerHTML = '';

        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <h3>👤 ${user.name}</h3>
                <p>📧 <strong>البريد:</strong> ${user.email}</p>
                <p>📍 <strong>المدينة:</strong> ${user.address.city}</p>
                <p>📞 <strong>الهاتف:</strong> ${user.phone}</p>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = `<p style="color: red;">حدث خطأ أثناء جلب البيانات: ${error.message}</p>`;
        console.error(error);
    }
}

fetchUsers();