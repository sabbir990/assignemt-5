function convertNumber(id) {
    const value = document.getElementById(id).innerText;
    const converted = parseInt(value);
    return converted;
}

function setInnerText(id, value) {
    console.log(id, value)
    document.getElementById(id).innerText = value;
}

let seatsLeft = convertNumber('seat-left');
let seatSelected = 0;
let totalPrice = 0;
let incorrectCupponTime = 0

function scrollToTicketSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" })
}

const seats = document.getElementsByClassName("seat-btn");

for (const seat of seats) {
    seat.addEventListener("click", function (event) {
        const seletedSeat = event.target;
        const seatMark = event.target.innerText;

        if (seatSelected === 4) {
            alert("You've already selected 4 seats. You can't select anymore.");
            return;
        }

        seletedSeat.classList.add("bg-green-500")
        seletedSeat.classList.add("text-white");

        const div = document.createElement("div");
        div.classList.add("flex")
        div.classList.add("items-center")
        div.classList.add("justify-between")
        const nameP = document.createElement('p')
        const classP = document.createElement('p')
        const priceP = document.createElement('p')

        nameP.innerText = seatMark;
        classP.innerText = "Economy";
        priceP.innerText = 550;

        div.appendChild(nameP)
        div.appendChild(classP)
        div.appendChild(priceP)

        document.getElementById("selected-seat-container").appendChild(div)

        seatsLeft = seatsLeft - 1;
        seatSelected++;

        totalPrice = seatSelected * 550;

        setInnerText("total-price", totalPrice)

        setInnerText("grand-price", totalPrice)

        setInnerText('seat-left', seatsLeft)
    })
}

document.getElementById("apply-cuppon-btn").addEventListener("click", function (event) {
    const cupponInput = event.target.parentNode.childNodes[1].value;
    if (cupponInput !== "") {
        if (cupponInput === "NEW15") {
            const parcentage = (totalPrice * 15) / 100;
            const grandTotal = totalPrice - parcentage;

            setInnerText("grand-price", grandTotal);

            document.getElementById("cuppon-section").classList.add("hidden")
        } else if (cupponInput === "Couple20") {
            const parcentage = (totalPrice * 20) / 100;
            const grandTotal = totalPrice - parcentage;

            setInnerText("grand-price", grandTotal);

            document.getElementById("cuppon-section").classList.add("hidden")
        }
        else {
            incorrectCupponTime++;

            if (incorrectCupponTime === 3) {
                document.getElementById("cuppon-section").classList.add("hidden")
                alert("You've lost your cuppon chances!")
            }

        }
    } else {
        alert("Enter a cuppon code first please!");
    }
})

document.addEventListener("DOMContentLoaded", function () {
    const phoneNumberInput = document.getElementById("phone-number");
    const submitBtn = document.getElementById("submit-btn");

    phoneNumberInput.addEventListener("input", function (event) {
        if (event.target.value.trim()) {
            submitBtn.removeAttribute("disabled");
        } else {
            submitBtn.setAttribute("disabled", "true");
        }
    });
});


document.getElementById("submit-btn").addEventListener("click", function(){
    document.getElementById("success-page").classList.remove("hidden");
    document.getElementById("main-page").classList.add("hidden")
    document.getElementsByTagName("footer")[0].classList.add("hidden")
})

document.getElementById("continue-btn").addEventListener("click", function(){
    document.location.reload();
})