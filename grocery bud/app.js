document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('listModal');
    const newListBtn = document.getElementById('newListBtn');
    let currentEditingItem = null;

    // --- 1. MAKE FUNCTIONS GLOBAL ---
    // We attach these to 'window' so the HTML onclick="saveList()" can find them.
    
    window.openModal = function(isEdit, element = null) {
        const input = document.getElementById('listInput');
        const date = document.getElementById('dueDate');
        const title = document.getElementById('modalTitle');

        modal.style.display = "block";

        if (isEdit && element) {
            title.innerText = "Edit Shopping List";
            // Get data from the attributes we stored
            input.value = element.getAttribute('data-name') || "";
            date.value = element.getAttribute('data-date') || "";
            currentEditingItem = element;
        } else {
            title.innerText = "Create New List";
            input.value = "";
            date.value = "";
            currentEditingItem = null;
        }
    };

    window.closeModal = function() {
        modal.style.display = "none";
    };

    window.saveList = function() {
        const name = document.getElementById('listInput').value;
        const date = document.getElementById('dueDate').value;

        if (!name) {
            alert("Please enter a name for your list!");
            return;
        }

        if (currentEditingItem) {
            // UPDATE MODE: Update the existing card
            currentEditingItem.querySelector('strong').innerText = name;
            currentEditingItem.querySelector('span').innerText = (date || 'Today');
            currentEditingItem.setAttribute('data-name', name);
            currentEditingItem.setAttribute('data-date', date);
        } else {
            // CREATE MODE: Add a new card to the screen
            const section = document.querySelector('section:last-of-type'); 
            const newListCard = document.createElement('div');
            newListCard.className = "list-card";
            newListCard.style.marginTop = "20px";
            newListCard.style.marginBottom = "20px";
            // Store data in attributes so we can "Edit" it later
            newListCard.setAttribute('data-name', name);
            newListCard.setAttribute('data-date', date);

            newListCard.innerHTML = `
  
          <div>
            <strong>${name}</strong>
            <span>${date || 'Today'}</span>
          </div>

          <button class="continue">Continue</button>
        </div>
            `;
            
            // Insert the new list above the "New List" button
            section.insertBefore(newListCard, newListBtn);
        }

        window.closeModal();
    };

    // --- 2. SETUP EVENT LISTENERS ---
    if (newListBtn) {
        newListBtn.onclick = () => window.openModal(false);
    }

    // Close modal if user clicks outside the box
    window.onclick = function(event) {
        if (event.target == modal) {
            window.closeModal();
        }
    };
});