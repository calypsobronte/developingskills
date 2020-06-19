(function () {
    let startButton = document.querySelector('#start');
    let startButton2 = document.querySelector('#start2');
    let startButton3 = document.querySelector('#start3');
    let howToButton = document.querySelector('#how-to');
    let closeHowToButton = document.querySelector('#close-how-to');
    let howToPlayScreen = document.querySelector('.how-to-play-screen');
    let mainScreen = document.querySelector('.main-screen');
    let quizScreen = document.querySelector('.quiz-screen');
    let resultScreen = document.querySelector('.result-screen');

    startButton.addEventListener('click', showGamePlay);
    startButton2.addEventListener('click', showGamePlay);
    startButton3.addEventListener('click', showGamePlay);

    howToButton.addEventListener('click', function () {
        howToPlayScreen.classList.remove('hidden');
        mainScreen.classList.add('hidden');
    });

    closeHowToButton.addEventListener('click', function () {
        howToPlayScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
    });

    let questionLength = 3;
    let questionIndex = 0;
    let score = 0;
    let questions = [];
    let timer = null

    function showGamePlay() {
        // TODO: show spinner
        questionIndex = 0;
        questions = [];
        score = 0;

        window.setTimeout(function () {
            // TODO: get questions from server

            mainScreen.classList.add('hidden');
            howToPlayScreen.classList.add('hidden');
            resultScreen.classList.add('hidden');
            quizScreen.classList.remove('hidden');

            questions = [
                { image: '001', answers: ['amarillo', 'azul', 'rojo', 'verde'], correct: 'amarillo' },
                { image: '002', answers: ['amarillo', 'azul', 'rojo', 'verde'], correct: 'rojo' },
                { image: '003', answers: ['amarillo', 'azul', 'rojo', 'verde'], correct: 'verde' },
            ];
            let questionCount = document.getElementById('question-count');
            questionCount.innerHTML = questionLength.toString();
            populate()
        }, 50);
    }

    let isEnded = function () {
        return questionLength === questionIndex;
    };

    function populate() {
        let answersContainer = document.getElementById('answers-container');
        let answerButtons = answersContainer.querySelectorAll('.default-button');

        answerButtons.forEach(function (element) {
            element.disabled = false;
            element.classList.remove('correct');
            element.classList.remove('wrong');
        });

        if (isEnded()) {
            showScores();
        } else {
            startProgressbar();
            timer = window.setTimeout(function () {
                guess(null);
            }, 10000);

            setQuizText('');

            let imageElement = document.getElementById('question-image');
            imageElement.src = questions[questionIndex].image + '.jpg';

            // show choices
            let choices = questions[questionIndex].answers;
            for (let i = 0; i < choices.length; i++) {
                let element = document.getElementById('answer' + i);
                element.innerHTML = choices[i];

                element.addEventListener('click', handleAnswerClick)
            }

            showProgress(':P');
        }
    }

    function handleAnswerClick(e) {
        let el = e.currentTarget;
        let answer = el.innerHTML;
        el.removeEventListener('click', handleAnswerClick);
        guess(answer);
    }

    function showProgress() {
        let questionIndexElement = document.getElementById('question-index');
        let index = questionIndex + 1;
        questionIndexElement.innerHTML = index.toString();
    }

    function guess(answer) {
        clearTimeout(timer);
        let answersContainer = document.getElementById('answers-container');
        let answerButtons = answersContainer.querySelectorAll('.default-button');

        answerButtons.forEach(function (element) {
            element.disabled = true;
            if (element.innerHTML === questions[questionIndex].correct) {
                element.classList.add('correct');
            }
        });

        stopProgressbar();

        if (questions[questionIndex].correct === answer) { // correct answer
            score++;
            setQuizText('Correct 🥳')
        } else if (answer) { // incorrect answer
            setQuizText('Dont give up. 💪');
            answerButtons.forEach(function (element) {
                if (element.innerHTML === answer) {
                    setQuizText('Dont give up. 😢');
                    //element.classList.add('incorrect answer ');
                }
            });
        } else {
            setQuizText('👾 time spent')
        }

        questionIndex++;

        window.setTimeout(function () {
            populate();
        }, 2000);
    }

    function setQuizText(text) {
        let el = document.getElementById('quiz-text');
        el.innerHTML = text;
    }

    function showScores() {
        let scoreElement = document.getElementById('score');
        let scoreTotalElement = document.getElementById('score-total');
        let scoreNameElement = document.getElementById('score-name');

        scoreElement.innerHTML = score.toString();
        scoreTotalElement.innerHTML = questionLength.toString();

        if (score < 4) {
            scoreNameElement.innerHTML = '😉'
        } else if (score < 7) {
            scoreNameElement.innerHTML = '🤓'
        } else if (score < 10) {
            scoreNameElement.innerHTML = '🤯'
        } else {
            scoreNameElement.innerHTML = '👨‍🎓👩‍🎓'
        }

        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
    }

    function startProgressbar() {
        // We select the div that we want to turn into a progressbar
        let progressbar = document.getElementById('progress-bar');
        progressbar.innerHTML = '';
        // We create the div that changes width to show progress
        let progressbarInner = document.createElement('span');

        // Append the progressbar to the main progressbardiv
        progressbar.appendChild(progressbarInner);

        // When everything is set up we start the animation
        progressbarInner.style.animationPlayState = 'running';
    }

    function stopProgressbar() {
        let progressbar = document.getElementById('progress-bar');
        let progressbarInner = progressbar.querySelector('span');
        progressbarInner.style.animationPlayState = 'paused';
    }

})();
