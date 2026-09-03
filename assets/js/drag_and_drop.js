function setupDragAndDrop(zoneId, inputId, listId) {
    const dropZone = document.getElementById(zoneId);
    const fileInput = document.getElementById(inputId);
    const fileList = document.getElementById(listId);

    // If these elements are not on the current page, exit safely
    if (!dropZone || !fileInput || !fileList) return;

    // 1. Click to open file explorer
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    // 2. Drag hover styling
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-spsaccent', 'text-spswhite');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-spsaccent', 'text-spswhite');
    });

    // 3. Drop event
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-spsaccent', 'text-spswhite');

        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            updateFileList();
        }
    });

    // 4. File input change event
    fileInput.addEventListener('change', () => {
        updateFileList();
    });

    // 5. Update UI list
    function updateFileList() {
        fileList.innerHTML = '';
        if (fileInput.files.length > 0) {
            const listItem = document.createElement('li');
            listItem.textContent = fileInput.files[0].name;
            fileList.appendChild(listItem);
        }
    }
}

// 1. Original Candidate Form
setupDragAndDrop('drop-zone-cv', 'reg_cv', 'file-list-cv');
setupDragAndDrop('drop-zone-cl', 'reg_intro', 'file-list-cl');

// 2. SEND Candidate Form
setupDragAndDrop('send-drop-zone-cv', 'send_reg_cv', 'send-file-list-cv');
setupDragAndDrop('send-drop-zone-cl', 'send_reg_intro', 'send-file-list-cl');