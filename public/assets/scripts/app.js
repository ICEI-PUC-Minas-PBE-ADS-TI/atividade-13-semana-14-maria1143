document.addEventListener('DOMContentLoaded', () => {
    const questionsContainer = document.getElementById('questions');
    const submitButton = document.getElementById('submit-quiz');
    const resultContainer = document.getElementById('result-container');
    const quizContainer = document.getElementById('quiz-container');
    const restartButton = document.getElementById('restart-quiz');
    let genreChart = null; // Variável para armazenar a instância do gráfico

    // Definição das perguntas e seus gêneros associados
    const quizQuestions = [
        {
            question: "Qual tipo de história te prende mais?",
            options: [
                { text: "Mistérios e investigações complexas", genre: "Suspense" },
                { text: "Grandes aventuras e mundos fantásticos", genre: "Aventura" },
                { text: "Risadas garantidas e situações engraçadas", genre: "Comédia" },
                { text: "Emoções intensas e reviravoltas dramáticas", genre: "Drama" },
                { text: "Muita ação e adrenalina", genre: "Ação" }
            ]
        },
        {
            question: "Qual ambiente de filme você prefere?",
            options: [
                { text: "Cenários futuristas ou espaciais", genre: "Ficção Científica" },
                { text: "Castelos, dragões e magia", genre: "Fantasia" },
                { text: "Ruas escuras e cidades perigosas", genre: "Policial" },
                { text: "Lugares exóticos e paisagens deslumbrantes", genre: "Aventura" },
                { text: "Ambientes cotidianos e relacionamentos", genre: "Romance" }
            ]
        },
        {
            question: "Qual o seu ritmo ideal para um filme?",
            options: [
                { text: "Rápido, com muitas cenas de luta e perseguição", genre: "Ação" },
                { text: "Construção lenta, com foco em personagens e diálogos", genre: "Drama" },
                { text: "Cheio de reviravoltas e surpresas a cada minuto", genre: "Suspense" },
                { text: "Leve e divertido, para relaxar e dar risada", genre: "Comédia" },
                { text: "Com um bom mistério para desvendar", genre: "Mistério" }
            ]
        },
        {
            question: "Qual emoção você busca ao assistir um filme?",
            options: [
                { text: "Medo e tensão", genre: "Terror" },
                { text: "Inspiração e reflexão", genre: "Drama" },
                { text: "Pura diversão e escapismo", genre: "Aventura" },
                { text: "Riso e alegria", genre: "Comédia" },
                { text: "Adrenalina e excitação", genre: "Ação" }
            ]
        },
        {
            question: "Qual tipo de personagem principal te atrai mais?",
            options: [
                { text: "Um herói corajoso que salva o dia", genre: "Ação" },
                { text: "Um detetive inteligente resolvendo um crime", genre: "Policial" },
                { text: "Alguém em busca de amor ou autoconhecimento", genre: "Romance" },
                { text: "Um cientista ou explorador desvendando o desconhecido", genre: "Ficção Científica" },
                { text: "Pessoas comuns em situações extraordinárias", genre: "Drama" }
            ]
        }
    ];

    // Função para carregar as perguntas na página
    function loadQuestions() {
        questionsContainer.innerHTML = ''; // Limpa perguntas anteriores
        quizQuestions.forEach((q, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.classList.add('question-block');
            questionBlock.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                <div class="options">
                    ${q.options.map((option, optIndex) => `
                        <label>
                            <input type="radio" name="question${index}" value="${option.genre}" required>
                            ${option.text}
                        </label>
                    `).join('')}
                </div>
            `;
            questionsContainer.appendChild(questionBlock);
        });
        submitButton.style.display = 'block'; // Mostra o botão de submissão
    }

    // Função para calcular os resultados do quiz
    function calculateResults() {
        const answers = {};
        quizQuestions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) {
                const genre = selectedOption.value;
                answers[genre] = (answers[genre] || 0) + 1;
            }
        });
        return answers;
    }

    // Função para exibir o gráfico de pizza
    function displayChart(results) {
        const labels = Object.keys(results);
        const data = Object.values(results);

        const ctx = document.getElementById('genreChart').getContext('2d');

        // Destrói o gráfico anterior se existir para evitar sobreposição
        if (genreChart) {
            genreChart.destroy();
        }

        genreChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#cc0000', // Vermelho
                        '#ff6666', // Vermelho claro
                        '#800000', // Vermelho escuro
                        '#ff9999', // Rosa claro
                        '#cc3333', // Outro tom de vermelho
                        '#660000', // Vinho
                        '#ffcccc'  // Vermelho muito claro
                    ],
                    borderColor: '#ffffff', // Borda branca para as fatias
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#f0f0f0' // Cor do texto da legenda
                        }
                    },
                    title: {
                        display: true,
                        text: 'Seus Gêneros de Filmes Favoritos',
                        color: '#cc0000', // Cor do título do gráfico
                        font: {
                            size: 18
                        }
                    }
                }
            }
        });
    }

    // Event Listener para o botão de submissão do quiz
    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Evita que a página recarregue
        const allQuestionsAnswered = quizQuestions.every((q, index) =>
            document.querySelector(`input[name="question${index}"]:checked`)
        );

        if (!allQuestionsAnswered) {
            alert('Por favor, responda a todas as perguntas antes de ver o resultado!');
            return;
        }

        const results = calculateResults();
        quizContainer.style.display = 'none'; // Esconde o quiz
        resultContainer.style.display = 'block'; // Mostra o resultado
        displayChart(results); // Exibe o gráfico
    });

    // Event Listener para o botão de reiniciar o quiz
    restartButton.addEventListener('click', () => {
        resultContainer.style.display = 'none'; // Esconde o resultado
        quizContainer.style.display = 'block'; // Mostra o quiz novamente
        loadQuestions(); // Recarrega as perguntas para limpar as seleções
    });

    // Carrega as perguntas quando a página é carregada
    loadQuestions();
});