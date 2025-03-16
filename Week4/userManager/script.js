const appendLocation = document.querySelector('.user-list');
const API_URL = "https://jsonplaceholder.typicode.com/users";
const STORAGE_KEY = "users";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000;

const style = document.createElement('style');
style.innerHTML = `
    body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background: #7ea8c5;
    }
    .user-list {
    max-width: 800px;
    margin: 20px auto;
    padding: 10px;
    background: #ff8576;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    }
    .user-list-title {
    text-align: center;
    font-size: 25px;
    margin-bottom: 10px;
    font-weight: bold;
    color: white;
    width: 100%;
    }
    .user-card {
    position: relative;
    padding: 15px;
    width: 350px;
    height: 150px;
    border: 2px solid #ddd;
    border-radius: 10px;
    background: #fff;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
    transition: transform 0.3s ease, opacity 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    }
    .user-info {
    flex: 1;
    }
    .user-card h2 {
    margin: 0 0 5px;
    color: #F38C79;
    }
    .user-card p {
    margin: 5px 0;
    color: #034C53;
    }
    .user-card strong {
    color: #FFC1B4;
    }
    .user-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    }
    .delete-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 50%;
    font-size: 16px;
    transition: background 0.3s ease;
    }
    .delete-btn:hover {
    background: darkred;
    }
    .fade-out {
    transform: scale(0.8);
    opacity: 0;
    }
    .error {
    color: red;
    font-weight: bold;
    text-align: center;
    }
    .fetch-btn {
    background: #034C53;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    transition: background 0.3s ease;
    }
    .fetch-btn:hover {
    background: #023842;
    }
`;
document.head.appendChild(style);

const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('API request failed.');
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error:', error);
        appendLocation.innerHTML = '<p class="error">User data could not be retrieved.</p>';
        return null;
    }
};

const saveUsersToLocalStorage = (users) => {
    const now = new Date().getTime();
    const data = {
        users,
        expire: now + EXPIRATION_TIME
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const getUsersFromLocalStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    const parsedData = JSON.parse(data);
    const now = new Date().getTime();
    if (now > parsedData.expire) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
    return parsedData.users;
};

const renderUsers = (users) => {
    appendLocation.innerHTML = '<div class="user-list-title">User List</div>';
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'user-card';
        const imagePath = `images/user-${user.id}.png`;
        userElement.innerHTML = `
            <img src="${imagePath}" alt="User" class="user-icon">
            <div class="user-info">
                <h2>${user.name}</h2>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
            </div>
            <button class="delete-btn" data-id="${user.id}">&times;</button>
        `;
        appendLocation.appendChild(userElement);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const userId = parseInt(button.getAttribute('data-id'));
            deleteUser(userId);
        });
    });
};

const deleteUser = (userId) => {
    let users = getUsersFromLocalStorage();
    if (!users) return;

    const userCard = document.querySelector(`.delete-btn[data-id="${userId}"]`)?.closest('.user-card');
    if (userCard) {
        userCard.classList.add('fade-out');
        setTimeout(() => {
            users = users.filter(user => user.id !== userId);
            saveUsersToLocalStorage(users);
            renderUsers(users);

            if (users.length === 0) {
                showRefreshButton();
            }
        }, 300);
    }
};

const showRefreshButton = () => {
    if (document.querySelector('.fetch-btn')) return;

    const refreshButton = document.createElement('button');
    refreshButton.className = 'fetch-btn';
    refreshButton.innerText = 'Refresh Users';
    refreshButton.onclick = async () => {
        if (!sessionStorage.getItem('refreshed')) {
            sessionStorage.setItem('refreshed', 'true');
            const users = await fetchUsers();
            if (users) {
                saveUsersToLocalStorage(users);
                renderUsers(users);
                refreshButton.remove();
            }
        } else {
            alert('This button can only be used once.');
        }
    };
    appendLocation.appendChild(refreshButton);
};

const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            const userCards = document.querySelectorAll('.user-card');
            if (userCards.length === 0) {
                showRefreshButton();
            }
        }
    });
});

observer.observe(appendLocation, { childList: true });

const initialize = async () => {
    let users = getUsersFromLocalStorage();
    if (!users) {
        users = await fetchUsers();
        if (users) {
            saveUsersToLocalStorage(users);
        }
    }
    if (users) {
        renderUsers(users);
    }
};

initialize();