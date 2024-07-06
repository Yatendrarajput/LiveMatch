async function getMatchData() {
    try {
        const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=b52d212e-3e41-4291-8c34-f3679d33c758&offset=0");
        const data = await response.json();

        if (data.status !== "success") return;

        const matchesList = data.data || [];

        const matchContainer = document.getElementById("match-list");

        matchesList.forEach(match => {
            const matchCard = document.createElement('div');
            matchCard.classList.add('match-card');
            matchCard.innerHTML = `
                <div class="match-name">${match.name}</div>
                <div class="match-details">
                    <div>Status: ${match.status}</div>
                    <div>Score: ${getScoreInfo(match)}</div>
                </div>
            `;

            matchCard.addEventListener('click', () => {
                matchCard.querySelector('.match-details').classList.toggle('open');
            });

            matchContainer.appendChild(matchCard);
        });

    } catch (error) {
        console.error("Error fetching match data:", error);
    }
}

function getScoreInfo(match) {
    if (match.score && match.score.length > 0) {
        return match.score.map(score => `${score.inning}: ${score.r}/${score.w} in ${score.o} overs`).join(', ');
    } else {
        return 'No score available';
    }
}

getMatchData();
