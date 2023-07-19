const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

//console.log(new Date(2023,6,12));

function twoDigit(num) {
    return `${Math.floor(num/10)}${num%10}`;
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateOfMonth = new Date(currYear, currMonth+1, 0).getDate();
    let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
    let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive prevmonth">${lastDateOfLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
        liTag += `<li class="inactive nextmonth">${i - lastDayOfMonth + 1}</li>`;
        
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

    const dayButtons = document.querySelectorAll(".days li");
    dayButtons.forEach(icon => {
        console.log(currYear, currMonth);

        if (!icon.classList.contains('inactive')) {
            icon.addEventListener("click", () => {
                location.href = `/home/schedule/${currYear}${twoDigit(currMonth+1)}${twoDigit(icon.innerText)}`;
            })
        }
        
        if (icon.classList.contains('prevmonth')) {
            if (currMonth === 0) {
                icon.addEventListener("click", () => {
                    location.href = `/home/schedule/${currYear-1}12${twoDigit(icon.innerText)}`;
                })
            } else {
                icon.addEventListener("click", () => {
                    location.href = `/home/schedule/${currYear}${twoDigit(currMonth)}${twoDigit(icon.innerText)}`;
                })
            }
        }
        
        if (icon.classList.contains('nextmonth')) {
            if (currMonth === 11) {
                icon.addEventListener("click", () => {
                    location.href = `/home/schedule/${currYear+1}01${twoDigit(icon.innerText)}`;
                })
            } else {
                icon.addEventListener("click", () => {
                    location.href = `/home/schedule/${currYear}${twoDigit(currMonth+2)}${twoDigit(icon.innerText)}`;
                })
            }
        }
    })
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11){
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }

        renderCalendar();
    })
});
