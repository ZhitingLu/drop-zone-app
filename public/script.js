const dropzone = document.getElementById('dropzone');
const fileList = document.getElementById('file-list');
const fileInput = document.getElementById('file-input');

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('dragover');

  const files = e.dataTransfer.files;
  showFilePreviews(files);
});

fileInput.addEventListener('change', (e) => {
  const files = e.target.files;
  showFilePreviews(files);
});

function showFilePreviews(files) {
  fileList.innerHTML = '';

  for (const file of files) {
    const listItem = document.createElement('li');
    listItem.textContent = file.name;

    if (file.type.includes('image/')) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.alt = file.name;
      listItem.appendChild(img);
    } else if (file.type.includes('video/')) {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      listItem.appendChild(video);
    }

    fileList.appendChild(listItem);
  }
}
