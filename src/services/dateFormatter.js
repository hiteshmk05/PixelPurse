export function formatDate(dateString) {
    const date = new Date(dateString);
    
    // Get the day, month, and year
    const day = String(date.getDate()).padStart(2, '0');  // Adds leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-based
    const year = date.getFullYear();
    
    // Return the formatted date as dd/mm/yyyy
    return `${day}/${month}/${year}`;
}

// Example usage:

