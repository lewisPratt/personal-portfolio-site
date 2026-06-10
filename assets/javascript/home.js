const skills = document.querySelectorAll(".skill");
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const skillsParent = document.querySelector("#skill-inner")
const skillContainer = document.querySelector("#skill-wrapper")
const totalSkills = skillsParent.childElementCount;
const currentScore = document.querySelector("#current-score");
const pointBubble = document.querySelector("#point-bubble");
const mainPortrait = document.querySelector("#main-portrait");
const thumbnail = document.querySelector("#thumbnail-portrait");
const noMoreSkills = document.querySelector("#no-more-skills");
thumbnail.addEventListener("click", countClicks);

const projectCards = document.querySelectorAll(".card-head");
projectCards.forEach(cardHead => {
    cardHead.addEventListener("click", () => {
        cardHead.classList.toggle("unblur-head")
        cardHead.closest(".card").classList.toggle("remove-bottom-margin");
        

    })
});

document.body.addEventListener("click", (e) => {
    projectCards.forEach(cardHead => {
        if (!cardHead.closest(".card").contains(e.target)) {
            cardHead.classList.remove("unblur-head")
            cardHead.closest(".card").classList.remove("remove-bottom-margin");
        }
    });
});

let shot = 0;
let clicks = 0;
let pictureClicks = false;
let score = 0;

skills.forEach(skill => {
    skill.addEventListener("click", () => {
        //clone the element that was clicked and set the original to be hidden
        let clone = skill.cloneNode(true);

        //get the data-skill-name attribute to identify the specific clicked skill
        //then find duplicate skills and set their visibility to hidden to 
        //maintain a consitent animation with no jumps/stutters. 
        let skillName = skill.getAttribute("data-skill-name");
        let sameSkills = document.querySelectorAll("[data-skill-name=" + skillName + "]");
        sameSkills.forEach(skillPill => {
            skillPill.style.visibility = "hidden";
        });

        //determine the rotation angle, jump height and placement of cloned skill
        const angle = Math.floor(Math.random() * 721) - 360;
        let container = skill.parentNode;
        let containerTop = container.getBoundingClientRect().y;
        const height = random(10, (containerTop - 100));
        let leftPos = skill.getBoundingClientRect().x + "px";
        let topPos = skill.getBoundingClientRect().y + window.scrollY + "px";


        //set position and styling of cloned skill
        clone.style.left = leftPos;
        clone.style.top = topPos;
        clone.classList.add("shoot-off");
        clone.style.setProperty("--shotHeight", `${height}px`);
        clone.style.setProperty("--rotAngle", `${angle}deg`);

        document.body.appendChild(clone);
        clone.addEventListener("animationend", () => clone.remove());

        let center = skill.getBoundingClientRect().x + (skill.offsetWidth / 2);
        spawnBubble(center, skill.getBoundingClientRect().y, 10)

        shot += 1;
        checkEmpty();

    })
});

function checkEmpty() {

    if ((shot * 2) == totalSkills) {
        const rect = skillContainer.getBoundingClientRect();

        let xPosition = rect.left + rect.width / 2;
        let yPosition = skillContainer.getBoundingClientRect().y;
        spawnBubble(xPosition, yPosition, 50);
        skillsParent.style.display = "none";
        noMoreSkills.style.display = "block";
    }
}

function updateScore(points) {
    score += points;
    currentScore.innerText = score;
}
//spawns a point bubble at the coordinates passed and points value
//adds points to overall score
function spawnBubble(xPos, yPos, points) {
    let pointClone = pointBubble.cloneNode(true);
    console.log(xPos, yPos);
    pointClone.style.left = xPos + "px";
    pointClone.style.top = yPos + window.scrollY + "px";
    pointClone.innerText = "+" + points;

    pointClone.classList.add("new-points");
    pointClone.addEventListener("animationend", () => pointClone.remove());
    document.body.appendChild(pointClone);
    updateScore(points);
}
function countClicks() {
    clicks += 1;
    if (clicks >= 20 && !pictureClicks) {
        const rect = thumbnail.getBoundingClientRect();
        let xPosition = rect.left + rect.width / 2;
        let yPosition = thumbnail.getBoundingClientRect().y;
        spawnBubble(xPosition, yPosition, 50);
        pictureClicks = true;
        thumbnail.classList.remove("target");
        document.querySelector("#second-portrait").classList.add("revealed");
    }
}

