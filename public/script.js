document.addEventListener("DOMContentLoaded", () => {
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("file-input");
    const fileList = document.getElementById("file-list");
  
    dropzone.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropzone.classList.add("highlight");
    });
  
    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("highlight");
    });
  
    dropzone.addEventListener("drop", (event) => {
      event.preventDefault();
      dropzone.classList.remove("highlight");
  
      const files = Array.from(event.dataTransfer.files);
      showFiles(files);
    });
  
    fileInput.addEventListener("change", () => {
      const files = Array.from(fileInput.files);
      showFiles(files);
    });
  
    function showFiles(files) {
      fileList.innerHTML = "";
      files.forEach((file) => {
        const listItem = document.createElement("li");
        listItem.textContent = file.name;
        fileList.appendChild(listItem);
      });
    }
  });
  