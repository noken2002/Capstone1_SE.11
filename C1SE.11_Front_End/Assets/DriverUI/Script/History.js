function toggleDropdown()
{
    const dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.style.display === "block"
        ? (dropdownContent.style.display = "none")
        : (dropdownContent.style.display = "block");
}