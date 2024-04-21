// Formats the date to be accurate to your timezone
module.exports = {
    format_date: (date) => {
        return new Date(date).toLocaleDateString({timeZone: "auto"});
    }
}
