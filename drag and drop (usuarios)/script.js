document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const userList = document.querySelector('#user-list tbody');

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${phone}</td>
            <td>${email}</td>
        `;
        newRow.setAttribute('draggable', true);
        userList.appendChild(newRow);

        resetForm();
    });

    let dragItem = null;

    userList.addEventListener('dragstart', (e) => {
        dragItem = e.target.closest('tr');
        e.dataTransfer.effectAllowed = 'move';
    });

    userList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(userList, e.clientY);
        const parent = dragItem.parentNode;
        if (afterElement == null) {
            parent.appendChild(dragItem);
        } else {
            parent.insertBefore(dragItem, afterElement);
        }
    });

    userList.addEventListener('dragend', () => {
        dragItem = null;
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('tr:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function resetForm() {
        firstNameInput.value = '';
        lastNameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
    }
});
