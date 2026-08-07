const dropZoneCv =  document.getElementById('drop-zone-cv');
const dropZoneCl =  document.getElementById('drop-zone-cl');
const fileInputCv = document.getElementById('file-input-cv');
const fileInputCl = document.getElementById('file-input-cl');
const fileListCv = document.getElementById('file-list-cv');
const fileListCl = document.getElementById('file-list-cl');

// Click effects for CV
dropZoneCv.addEventListener('click', () => {
    fileInputCv.click();
    
});

// Click effects for Cover Letter
dropZoneCl.addEventListener('click', () => {
    fileInputCl.click();
});

// Drag hover effects for CV
dropZoneCv.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZoneCv.classList.add('border-spsaccent', 'text-spswhite');
});

dropZoneCv.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZoneCv.classList.remove('border-spsaccent', 'text-spswhite');
});


// Drag hover effects for Cover Letter
dropZoneCl.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZoneCl.classList.add('border-spsaccent', 'text-spswhite');
});

dropZoneCl.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZoneCl.classList.remove('border-spsaccent', 'text-spswhite');
});

// Handling the drop for CV
dropZoneCv.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZoneCv.classList.remove('border-spsaccent', 'text-spswhite');

    if (e.dataTransfer.files.length > 0) {
        fileInputCv.files = e.dataTransfer.files;

        updateFileListCv();
    }
});

// Handling the drop for Cover Letter
dropZoneCl.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZoneCl.classList.remove('border-spsaccent', 'text-spswhite');

    if (e.dataTransfer.files.length > 0) {
        fileInputCl.files = e.dataTransfer.files;

        updateFileListCl();
    }
});

// File Display function for CV
function updateFileListCv() {
    fileInputCv.innerHTML = '';

    for (const file of fileInputCv.files) {
        const listItemCv = document.createElement('li');

        listItemCv.textContent = file.name;

        listItemCv.classList.add('border-1', 'border-spsaccent', 'p-2', 'font-bold');

        fileListCv.appendChild(listItemCv);
    }
}

// File Display function for Cover Letter
function updateFileListCl() {
    fileInputCl.innerHTML = '';

    for (const file of fileInputCl.files) {
        const listItemCl = document.createElement('li');

        listItemCl.textContent = file.name;

        listItemCl.classList.add('border-1', 'border-spsaccent', 'p-2', 'font-bold');

        fileListCv.appendChild(listItemCl);
    }
}

// Listen for change on CV
fileInputCv.addEventListener('change', () => {
    updateFileListCv();
});

// Listen for change on Cover Letter
fileInputCl.addEventListener('change', () => {
    updateFileListCl();
});
