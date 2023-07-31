const userStore = {
    currentUser: null,
};

// Prep for the events/interaction from user
window.addEventListener("load", () => {
    const modalWrapper = document.querySelector('#modal-wrapper');
    const modalBg = modalWrapper.querySelector('#modal-wrapper-bg');
    const modal = modalWrapper.querySelector('#modal');
    const modalHeader = modal.querySelector('.header');
    const modalContent = modal.querySelector('.content');
    const modalClose = modal.querySelector('.close');

    const loginButton = document.querySelector('.login-button');
    const logoutButton = document.querySelector('.logout-button');
    const loggedAreaContent = document.querySelectorAll('.logged-area');
    const loggedOutAreaContent = document.querySelectorAll('.logged-out-area');

    const addCoffeeButton = document.querySelector('.add-coffee-button');

    const showFunFactModal = (data) => {
        modalWrapper.style.display = 'flex';

        modalHeader.innerHTML = 'Fun facts about coffee';
        modalContent.innerHTML = `
            <img src="${data.image}" />
            <h2>${data.title}</h2>
            ${data.text}
        `;
    };
    // User interaction events: log/signup
    const showLoginModal = () => {
        modalWrapper.style.display = 'flex';

        modalHeader.innerHTML = 'Login';
        modalContent.innerHTML = `
            <form>
                <div class="error"></div>
                <label>
                    Username:
                    <input type="text" class="login-username" />
                </label>
                <label>
                    Password:
                    <input type="password" class="login-password" />
                </label>
                <button class="login-button primary-button">Login</button>
            </form>
        `;
        // user input field. 
        const error = modalContent.querySelector('.error');
        const userInput = modalContent.querySelector('.login-username');
        const passInput = modalContent.querySelector('.login-password');

        userInput.focus();

        modalContent.querySelector('.login-button').addEventListener('click', (event) => {
            event.preventDefault();

            const user = userInput.value;
            const pass = passInput.value;

            const login = LOGIN_DATA.find((e) => e.username == user && e.password == pass);

            if (login == null) {
                error.innerHTML = 'Invalid combination of username/password!';
            } else {
                error.innerHTML = '';
                doLogin(login);
                hideModal();
            }
        });
    };
    // Event: Coffee Consumptions Counter
    const showAddCoffeeModal = () => {
        modalWrapper.style.display = 'flex';

        modalHeader.innerHTML = 'Select your coffee';
        //Define coffeeType
        const coffeeType = {
            selectedCoffee: null,
        };
        const describeCoffee = (coffee) => `
            <div class="coffee-chip" data-coffee-id="${coffee.id}">
                <img src="imgs/coffee-types/${coffee.icon}" />
                <p>${coffee.brand}</p>
                <p><strong>${coffee.name}</strong></p>
                <p>${coffee.desc}, ${coffee.mg} mg Caffeine</p>
            </div>
        `;
        const maybeDescribeCoffee = (coffee) => coffee ? describeCoffee(coffee) : '<div></div>';
        const describeRow = (coffees) => `
            <div class="row large-4">
                ${coffees.map(maybeDescribeCoffee).join('')}
            </div>
        `;
        const rowLength = 4;
        const coffeesDiv = [...chunks(COFFEE_OPTIONS, rowLength)]
            .map((chunk) => Array.from({ length: rowLength }, (_, i) => chunk[i]))
            .map(describeRow)
            .join('');
        modalContent.innerHTML = `
            <div class="error"></div>
            ${coffeesDiv}
            <button class="primary-button add-coffee-button">Add coffee</button>
        `;
        //Once user selected their coffee short-cut, the background will change to white to identified the selection
        const updateChips = () => {
            modalContent.querySelectorAll('.coffee-chip').forEach((chip) => {
                const id = chip.getAttribute('data-coffee-id');
                if (coffeeType.selectedCoffee.id == id) {
                    chip.classList.add('selected');
                } else {
                    chip.classList.remove('selected');
                }
            });
        };

        modalContent.querySelectorAll('.coffee-chip').forEach((chip) => {
            const id = chip.getAttribute('data-coffee-id');
            chip.addEventListener('click', () => {
                coffeeType.selectedCoffee = COFFEE_OPTIONS.find((e) => e.id == id);
                updateChips();
            });
        });
        //Too prvents human error, user has to slected one option before adding coffee
        modalContent.querySelector('.add-coffee-button').addEventListener('click', () => {
            const error = modalContent.querySelector('.error');
            if (coffeeType.selectedCoffee == null) {
                error.innerHTML = 'Please select a coffee.';
            } else {
                //Requirments: Use of variables and arrays to store and manipulate data (text or numbers)
                error.innerHTML = '';
                userStore.currentUser.cups++;
                userStore.currentUser.mg += coffeeType.selectedCoffee.mg;
                updateLoginData();
                hideModal();
            }
        });
    };

    const hideModal = () => {
        modalWrapper.style.display = 'none';
    };

    const doLogin = (login) => {
        userStore.currentUser = login;
        updateLoginData();
    }

    const doLogout = () => doLogin(null);

    const updateLoginData = () => {
        const login = userStore.currentUser;

        if (login != null) {
            localStorage.setItem('login', JSON.stringify(login));
            loggedOutAreaContent.forEach((loggedOutArea) => {
                loggedOutArea.style.display = 'none';
            });
            loggedAreaContent.forEach((loggedArea) => {
                loggedArea.style.display = 'block';
                replace(loggedArea, '.login-username', login.username);
                replace(loggedArea, '.cups-counter', `${login.cups} Cups`);
                replace(loggedArea, '.mg-counter', `${login.mg}mg caffeine`);
            });
        } else {
            localStorage.removeItem('login');
            loggedOutAreaContent.forEach((loggedOutArea) => {
                loggedOutArea.style.display = 'block';
            });
            loggedAreaContent.forEach((loggedArea) => {
                loggedArea.style.display = 'none';
            });
        }

        updateCoffeeCup();
    }
    // Fullfield requirments: Use of a mathematical function to display or manipulate information on the screen
    const updateCoffeeCup = () => {
        const login = userStore.currentUser;
        if (login) {
            const image = document.querySelector('.coffee-cup-image');
            const cups = Math.min(login.cups, 4);

            const cupsToRender = Array.from({ length: cups + 1 })
                .map((_, i) => i)
                .map((n) => `
                    <img src="imgs/cup-levels/cup-level-${n}.svg" width="100%" />
                `)
                .join('');
            
            image.innerHTML = cupsToRender;

            if (login.cups <= login.goal) {
                showGoodJobDialog(image);
            } else {
                showWatchOutDialog(image);
            }
        }
    };
    // User event: triggered speech bubble to change from good to bad-job dialog 
    const showGoodJobDialog = (wrapper) => {
        const div = document.createElement("div");
        div.classList.add('good-job-dialog');
        div.innerHTML = `
            <p class="title">:)</p>
            <p class="title">Good Job!</p>
            <p>You're on track with your goal!</p>
        `;
        wrapper.appendChild(div);
    };
    
    const showWatchOutDialog = (wrapper) => {
        const div = document.createElement("div");
        div.classList.add('bad-job-dialog');
        div.innerHTML = `
            <p class="title">:(</p>
            <p class="title">Watchout!</p>
            <p>You have exceeded the your set coffee goal</p>
        `;
        wrapper.appendChild(div);
    };
    // Fun-fact pop up, click outside to hide it (inlucding the closed windown button)
    modalBg.addEventListener('click', hideModal);
    modalClose.addEventListener('click', hideModal);

    document.querySelectorAll("[data-fun-fact-id]").forEach((element) => {
        element.addEventListener('click', (_) => {
            const id = element.getAttribute('data-fun-fact-id');
            showFunFactModal(FUN_FACTS[id]);
        });
    });

    loginButton.addEventListener('click', showLoginModal);
    logoutButton.addEventListener('click', doLogout);
    addCoffeeButton.addEventListener('click', showAddCoffeeModal);

    const possibleLogin = localStorage.getItem('login');
    if (possibleLogin != null) {
        const user = JSON.parse(possibleLogin);
        doLogin(user);
    }
});

const replace = (root, selector, content) => {
    root.querySelectorAll(selector).forEach((el) => el.innerHTML = content);
}