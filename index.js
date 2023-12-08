const getData = async () => {
    try {
        const dataSection = document.querySelector('#data-section');
        dataSection.innerHTML = '<span>loading...</span>';

        const url = 'https://jsonplaceholder.typicode.com/todos?_limit=5';

        const respose = await fetch(url);
        const data = await respose.json();

        if (data.length > 0) {
            let text = '';
            data.forEach(item => {
                text += `<li> ${item.title} / Status: ${item.completed} </li>`;
            });

            const ulElment = document.createElement('ul');
            ulElment.className = 'flex flex-col gap-1 max-h-150 overflow-auto';
            ulElment.id = 'data-list'
            ulElment.innerHTML = text;

            dataSection.replaceChildren(ulElment);
        }
    } catch (error) {
        const dataSection = document.querySelector('#data-section');
        dataSection.innerHTML = '<span>Beklenmedik bir hata oluştu!</span>';
        console.log('Beklenmedik bir hata oluştu: ', error);
    }
}

const addItemToList = ({ title, completed }) => {
    const listElement = document.querySelector('#data-list');

    if (listElement) {
        const liElment = document.createElement('li');
        liElment.innerHTML = `${title} / Status: ${completed}`;

        listElement.appendChild(liElment);
    } else {
        alert('Liste Bulunamadı!')
    }
}

const createEvents = () => {
    const formBtn = document.querySelector('#form-btn');

    formBtn.addEventListener('click', (event) => {
        const form = new FormData(document.getElementById("form"));

        const title = form.get("title");
        const completed = form.get("completed") == 'on';

        addItemToList({ title, completed });

        event.preventDefault();
    })
}

const init = async () => {
    createEvents();
    await getData();
}

init();