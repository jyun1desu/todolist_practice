export function fileNameUpdate() {
    const file = this.files[0].name;
    const fileNameElement = this.nextElementSibling;
    fileNameElement.textContent = file;
}

export default fileNameUpdate;