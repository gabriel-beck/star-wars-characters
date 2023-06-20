let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Error while loading cards')
    }

    const nextButton = document.getElementById('next__button')
    const backButton = document.getElementById('back__button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main__content')
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement ("div")
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character__name__bg"

            const characterName = document.createElement("span")
            characterName.className = "character__name"
            characterName.innerText = character.name.length > 18 ? `${character.name.substring(0, 18).trim()}...` : character.name;

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal__content")
                modalContent.innerHTML = '' 

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg`
                characterImage.className = "character__image"

                const name = document.createElement("span")
                name.className = "character__details"
                name.innerText = `Name: ${character.name}`

                const characterHeight = document.createElement("span")
                characterHeight.className = "character__details"
                characterHeight.innerText = `Height: ${convertHeight(character.height)}`

                const mass = document.createElement("span")
                mass.className = "character__details"
                mass.innerText = `Mass: ${convertMass(character.mass)}`

                const eyeColor = document.createElement("span")
                eyeColor.className = "character__details"
                eyeColor.innerText = `Eye Color: ${convertEyeColor(character.eye_color)}`

                const birthYear = document.createElement("span")
                birthYear.className = "character__details"
                birthYear.innerText = `Birth Year: ${convertBirthYear(character.birth_year)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)
            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next__button')
        const backButton = document.getElementById('back__button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
        alert('Error while loading character')
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertEyeColor(eyeColor) {
    const cores = {
        blue: "Blue",
        brown: "Brown",
        green: "Green",
        yellow: "Yellow",
        black: "Black",
        pink: "Pink",
        red: "Red",
        orange: "Orange",
        hazel: "Hazel",
        unknown: "Unknown"
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
    if (height === "unknown") {
        return "unknown height"
    }

    return (height / 100).toFixed(2)
}

function convertMass (mass) {
    if (mass === "unknown") {
        return "unknown mass"
    }

    return `${mass} kg`
}

function convertBirthYear (birthYear) {
    if (birthYear === "uknown") {
        return "Unknown Birth Year"
    }

    return birthYear
}