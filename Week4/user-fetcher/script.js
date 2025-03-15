const API_URL = "https://jsonplaceholder.typicode.com/users";
const STORAGE_KEY = "users";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; 

document.addEventListener("DOMContentLoaded", () => {
    addStyles();
    loadUsers();
});

const loadUsers = async () => {
    const usersData = getStoredUsers();
    if (usersData) {
        renderUsers(usersData);
    } else {
        fetchUsers();
    }
};

const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("API connection failed!");
        
        const users = await response.json();
        saveUsersToStorage(users);
        renderUsers(users);
    } catch (error) {
        showError(error.message);
    }
};

const saveUsersToStorage = (users) => {
    const data = { users, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const getStoredUsers = () => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return null;
    
    const { users, timestamp } = JSON.parse(storedData);
    if (Date.now() - timestamp > EXPIRATION_TIME) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
    return users;
};

const renderUsers = (users) => {
    const container = document.querySelector(".ins-api-users");
    container.innerHTML = "";
    container.innerHTML = "<h1 class='user-list-title'>User List</h1>";
    users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        userCard.innerHTML = `
            <img src="images/user.png" alt="User" class="user-icon">
            <div class="user-info">
                <h2>${user.name}</h2>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
            </div>
            <button class="delete-btn" data-id="${user.id}">&times;</button>
        `;
        container.appendChild(userCard);
    });
    attachDeleteEvents();
};

const attachDeleteEvents = () => {
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const userId = parseInt(event.target.dataset.id);
            const userCard = event.target.parentElement;
            userCard.classList.add("fade-out");
            setTimeout(() => {
                deleteUser(userId);
            }, 500);
        });
    });
};

const deleteUser = (userId) => {
    let usersData = getStoredUsers();
    usersData = usersData.filter(user => user.id !== userId);
    saveUsersToStorage(usersData);
    renderUsers(usersData);
};

const showError = (message) => {
    const container = document.querySelector(".ins-api-users");
    container.innerHTML = `<p class='error'>${message}</p>`;
};

const addStyles = () => {
    const style = document.createElement("style");
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background: #007074;
        }
        .ins-api-users {
            max-width: 800px;
            margin: 20px auto;
            padding: 10px;
            background: #FFC1B4;
            border-radius: 10px;
        }
        .user-list-title {
            text-align: center;
            font-weight: bold;
            color: #034C53;
        }
        .user-card {
            position: relative;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-bottom: 10px;
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
            width: 50px;
            height: 50px;
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
    `;
    document.head.appendChild(style);
};
