/* Student Name: Arun Varadharajalu
Student Number: 8896434 */

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

const getTodayDateStr = () => `${months[new Date().getMonth() + 1]} ${new Date().getDate()}, ${new Date().getFullYear()}`;

module.exports = {
	getTodayDateStr
};