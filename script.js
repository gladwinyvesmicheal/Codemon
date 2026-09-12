/* =========================================================
   CODEMON
   QUESTION DATABASE BATTLE SYSTEM
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const DAMAGE = 20;

const TEXT_SPEED = 25;

const DIALOGUE_INTERVAL = 1500;


/* =========================================================
   PLAYER TEAM
========================================================= */

const playerTeam = [

    {
        name: "BUGMON",
        shortName: "D1",
        hp: 100,
        maxHP: 100,
        sprite: "assets/player/p1.png"
    },

    {
        name: "CODECLAW",
        shortName: "D2",
        hp: 100,
        maxHP: 100,
        sprite: "assets/player/p2.png"
    },

    {
        name: "DEBUGASAUR",
        shortName: "D3",
        hp: 100,
        maxHP: 100,
        sprite: "assets/player/p3.png"
    }

];


/* =========================================================
   ENEMY TEAM
========================================================= */

const enemyTeam = [

    {
        name: "ERRORBYTE",
        shortName: "E1",
        hp: 100,
        maxHP: 100,
        sprite: "assets/enemy/e1.webp"
    },

    {
        name: "SYNTAXON",
        shortName: "E2",
        hp: 100,
        maxHP: 100,
        sprite: "assets/enemy/e2.webp"
    },

    {
        name: "BUGLORD",
        shortName: "E3",
        hp: 100,
        maxHP: 100,
        sprite: "assets/enemy/e3.webp"
    }

];


/* =========================================================
   BATTLE STATE
========================================================= */

let currentPlayer = 0;

let currentEnemy = 0;

let currentRound = 0;

let battleOver = false;

let switchMenuOpen = false;

let currentQuestion = null;

let questionSolved = false;

let typingTimer = null;


/* =========================================================
   HTML ELEMENTS
========================================================= */

const playerName =
    document.getElementById("playerName");

const playerLevel =
    document.getElementById("playerLevel");

const playerHPText =
    document.getElementById("playerHPText");

const playerMaxHPText =
    document.getElementById("playerMaxHPText");

const playerHPBar =
    document.getElementById("playerHPBar");

const playerSprite =
    document.getElementById("playerSprite");


const enemyName =
    document.getElementById("enemyName");

const enemyLevel =
    document.getElementById("enemyLevel");

const enemyHPText =
    document.getElementById("enemyHPText");

const enemyMaxHPText =
    document.getElementById("enemyMaxHPText");

const enemyHPBar =
    document.getElementById("enemyHPBar");

const enemySprite =
    document.getElementById("enemySprite");


const pythonCode =
    document.getElementById("pythonCode");

const errorName =
    document.getElementById("errorName");

const message =
    document.getElementById("message");

const movesContainer =
    document.getElementById("moves");

const switchButton =
    document.getElementById("switchButton");

const attackEffect =
    document.getElementById("attackEffect");

const damageText =
    document.getElementById("damageText");

const playerPokemon =
    document.getElementById("playerPokemon");

const enemyPokemon =
    document.getElementById("enemyPokemon");


/* =========================================================
   TYPEWRITER MESSAGE
========================================================= */

function showMessage(text) {

    if (!message) {
        return;
    }

    clearInterval(typingTimer);

    message.textContent = "";

    let i = 0;

    typingTimer = setInterval(
        function () {

            if (i < text.length) {

                message.textContent +=
                    text.charAt(i);

                i++;

            } else {

                clearInterval(typingTimer);

                typingTimer = null;

            }

        },
        TEXT_SPEED
    );
}


/* =========================================================
   SHUFFLE ANSWERS
========================================================= */

function shuffleArray(array) {

    const shuffled = [...array];

    for (
        let i = shuffled.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            shuffled[i],
            shuffled[j]
        ] =
        [
            shuffled[j],
            shuffled[i]
        ];

    }

    return shuffled;
}


/* =========================================================
   GET CURRENT QUESTION
========================================================= */

function getCurrentQuestion() {

    if (
        typeof questionDatabase === "undefined" ||
        questionDatabase.length === 0
    ) {

        return null;
    }

    return questionDatabase[
        currentRound %
        questionDatabase.length
    ];
}


/* =========================================================
   SHOW QUESTION
========================================================= */

function showQuestion() {

    currentQuestion =
        getCurrentQuestion();

    questionSolved =
        false;


    if (!currentQuestion) {

        showMessage(
            "No debugging questions found."
        );

        return;
    }


    /* =====================================================
       ERROR
    ===================================================== */

    if (errorName) {

        errorName.textContent =
            currentQuestion.error;
    }


    /* =====================================================
       BROKEN CODE
    ===================================================== */

    if (pythonCode) {

        pythonCode.textContent =
            currentQuestion.code;
    }


    /* =====================================================
       QUESTION
    ===================================================== */

    showMessage(
        currentQuestion.question ||
        "Choose the correct fix for this code."
    );


    /* =====================================================
       ANSWERS
    ===================================================== */

    createMoveButtons();
}


/* =========================================================
   CREATE ANSWER BUTTONS
========================================================= */

function createMoveButtons() {

    if (!movesContainer) {
        return;
    }


    movesContainer.innerHTML = "";


    if (
        !currentQuestion ||
        !Array.isArray(
            currentQuestion.options
        )
    ) {

        return;
    }


    const shuffledOptions =
        shuffleArray(
            currentQuestion.options
        );


    shuffledOptions.forEach(
        function (option) {

            const button =
                document.createElement("button");


            button.type =
                "button";


            button.className =
                "move";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                function () {

                    handleAnswer(option);

                }
            );


            movesContainer.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   ENABLE / DISABLE ANSWERS
========================================================= */

function disableMoves(disabled) {

    if (!movesContainer) {
        return;
    }


    const buttons =
        movesContainer.querySelectorAll(
            ".move"
        );


    buttons.forEach(
        function (button) {

            button.disabled =
                disabled;

        }
    );

}


/* =========================================================
   HANDLE ANSWER
========================================================= */

function handleAnswer(answer) {

    if (battleOver) {
        return;
    }


    if (switchMenuOpen) {
        return;
    }


    if (!currentQuestion) {
        return;
    }


    if (questionSolved) {
        return;
    }


    disableMoves(true);


    /* =====================================================
       CORRECT
    ===================================================== */

    if (
        answer ===
        currentQuestion.correctAnswer
    ) {

        questionSolved =
            true;


        /* ================================================
           FIXED CODE
        ================================================= */

        if (pythonCode) {

            pythonCode.textContent =
                currentQuestion.correctedCode;

        }


        if (errorName) {

            errorName.textContent =
                "FIXED!";

        }


        showMessage(
            "SUPER EFFECTIVE!"
        );


        /* ================================================
           ATTACK
        ================================================= */

        showAttackEffect();


        if (enemyPokemon) {

            enemyPokemon.classList.remove(
                "enemy-hit"
            );

            void enemyPokemon.offsetWidth;

            enemyPokemon.classList.add(
                "enemy-hit"
            );

        }


        /* ================================================
           DAMAGE
        ================================================= */

        enemyTeam[currentEnemy].hp =
            Math.max(
                0,
                enemyTeam[currentEnemy].hp -
                DAMAGE
            );


        showDamage(
            "-" + DAMAGE,
            enemyPokemon
        );


        updateBattleDisplay();


        /* ================================================
           NEXT
        ================================================= */

        setTimeout(
            function () {

                if (
                    enemyTeam[currentEnemy].hp <= 0
                ) {

                    enemyFainted();

                } else {

                    nextQuestion();

                }

            },
            DIALOGUE_INTERVAL
        );


        return;
    }


    /* =====================================================
       WRONG
    ===================================================== */

    showMessage(
        "WRONG FIX! The ErrorMon attacked!"
    );


    if (playerPokemon) {

        playerPokemon.classList.remove(
            "player-hit"
        );

        void playerPokemon.offsetWidth;

        playerPokemon.classList.add(
            "player-hit"
        );

    }


    /* =====================================================
       DAMAGE PLAYER
    ===================================================== */

    playerTeam[currentPlayer].hp =
        Math.max(
            0,
            playerTeam[currentPlayer].hp -
            DAMAGE
        );


    showDamage(
        "-" + DAMAGE,
        playerPokemon
    );


    updateBattleDisplay();


    setTimeout(
        function () {

            if (
                playerTeam[currentPlayer].hp <= 0
            ) {

                playerFainted();

            } else {

                showMessage(
                    "Choose another debugging fix."
                );

                disableMoves(false);

            }

        },
        DIALOGUE_INTERVAL
    );

}


/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion() {

    if (battleOver) {
        return;
    }


    currentRound++;


    currentQuestion =
        null;


    questionSolved =
        false;


    if (pythonCode) {

        pythonCode.textContent =
            "";

    }


    if (errorName) {

        errorName.textContent =
            "NEXT ERROR";

    }


    if (movesContainer) {

        movesContainer.innerHTML =
            "";

    }


    setTimeout(
        function () {

            if (!battleOver) {

                showQuestion();

            }

        },
        300
    );

}


/* =========================================================
   ENEMY FAINTED
========================================================= */

function enemyFainted() {

    showMessage(
        enemyTeam[currentEnemy].name +
        " fainted!"
    );


    updateTeamIcons();


    const nextEnemy =
        findNextLivingEnemy();


    /* =====================================================
       VICTORY
    ===================================================== */

    if (nextEnemy === -1) {

        endBattle(true);

        return;
    }


    currentEnemy =
        nextEnemy;


    currentRound++;


    currentQuestion =
        null;


    questionSolved =
        false;


    if (movesContainer) {

        movesContainer.innerHTML =
            "";

    }


    if (pythonCode) {

        pythonCode.textContent =
            "";

    }


    setTimeout(
        function () {

            updateBattleDisplay();


            showMessage(
                "The opponent sent out " +
                enemyTeam[currentEnemy].name +
                "!"
            );


            setTimeout(
                function () {

                    if (!battleOver) {

                        showQuestion();

                    }

                },
                DIALOGUE_INTERVAL
            );

        },
        DIALOGUE_INTERVAL
    );

}


/* =========================================================
   PLAYER FAINTED
========================================================= */

function playerFainted() {

    showMessage(
        playerTeam[currentPlayer].name +
        " fainted!"
    );


    updateTeamIcons();


    const nextPlayer =
        findNextLivingPlayer();


    if (nextPlayer === -1) {

        endBattle(false);

        return;
    }


    setTimeout(
        function () {

            openSwitchMenu(true);

        },
        DIALOGUE_INTERVAL
    );

}


/* =========================================================
   FIND NEXT LIVING ENEMY
========================================================= */

function findNextLivingEnemy() {

    for (
        let i = 0;
        i < enemyTeam.length;
        i++
    ) {

        if (
            enemyTeam[i].hp > 0
        ) {

            return i;
        }

    }

    return -1;
}


/* =========================================================
   FIND NEXT LIVING PLAYER
========================================================= */

function findNextLivingPlayer() {

    for (
        let i = 0;
        i < playerTeam.length;
        i++
    ) {

        if (
            playerTeam[i].hp > 0
        ) {

            return i;
        }

    }

    return -1;
}


/* =========================================================
   DAMAGE TEXT
========================================================= */

function showDamage(text, target) {

    if (
        !damageText ||
        !target
    ) {

        return;
    }


    const gameElement =
        document.querySelector(".game");


    if (!gameElement) {
        return;
    }


    const rect =
        target.getBoundingClientRect();


    const gameRect =
        gameElement.getBoundingClientRect();


    damageText.textContent =
        text;


    damageText.style.left =
        (
            rect.left -
            gameRect.left +
            50
        ) + "px";


    damageText.style.top =
        (
            rect.top -
            gameRect.top +
            20
        ) + "px";


    damageText.classList.remove(
        "show"
    );


    void damageText.offsetWidth;


    damageText.classList.add(
        "show"
    );

}


/* =========================================================
   ATTACK EFFECT
========================================================= */

function showAttackEffect() {

    if (
        !attackEffect ||
        !enemyPokemon
    ) {

        return;
    }


    const gameElement =
        document.querySelector(".game");


    if (!gameElement) {
        return;
    }


    const rect =
        enemyPokemon.getBoundingClientRect();


    const gameRect =
        gameElement.getBoundingClientRect();


    attackEffect.style.left =
        (
            rect.left -
            gameRect.left +
            40
        ) + "px";


    attackEffect.style.top =
        (
            rect.top -
            gameRect.top +
            30
        ) + "px";


    attackEffect.classList.remove(
        "active"
    );


    void attackEffect.offsetWidth;


    attackEffect.classList.add(
        "active"
    );

}


/* =========================================================
   UPDATE BATTLE DISPLAY
========================================================= */

function updateBattleDisplay() {

    const player =
        playerTeam[currentPlayer];


    const enemy =
        enemyTeam[currentEnemy];


    /* =====================================================
       PLAYER
    ===================================================== */

    if (playerName) {

        playerName.textContent =
            player.name;

    }


    if (playerLevel) {

        playerLevel.textContent =
            "Lv. " +
            (currentRound + 1);

    }


    if (playerHPText) {

        playerHPText.textContent =
            player.hp;

    }


    if (playerMaxHPText) {

        playerMaxHPText.textContent =
            player.maxHP;

    }


    if (playerHPBar) {

        playerHPBar.style.width =
            (
                player.hp /
                player.maxHP *
                100
            ) + "%";

    }


    if (playerSprite) {

        playerSprite.src =
            player.sprite;

        playerSprite.alt =
            player.name;

    }


    /* =====================================================
       ENEMY
    ===================================================== */

    if (enemyName) {

        enemyName.textContent =
            enemy.name;

    }


    if (enemyLevel) {

        enemyLevel.textContent =
            "Lv. " +
            (currentRound + 1);

    }


    if (enemyHPText) {

        enemyHPText.textContent =
            enemy.hp;

    }


    if (enemyMaxHPText) {

        enemyMaxHPText.textContent =
            enemy.maxHP;

    }


    if (enemyHPBar) {

        enemyHPBar.style.width =
            (
                enemy.hp /
                enemy.maxHP *
                100
            ) + "%";

    }


    if (enemySprite) {

        enemySprite.src =
            enemy.sprite;

        enemySprite.alt =
            enemy.name;

    }


    updateTeamIcons();

}


/* =========================================================
   UPDATE TEAM ICONS
========================================================= */

function updateTeamIcons() {

    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const enemyIcon =
            document.getElementById(
                "enemyIcon" +
                (i + 1)
            );


        const playerIcon =
            document.getElementById(
                "playerIcon" +
                (i + 1)
            );


        /* =================================================
           ENEMY
        ================================================= */

        if (enemyIcon) {

            enemyIcon.classList.remove(
                "active",
                "fainted"
            );


            if (
                enemyTeam[i].hp <= 0
            ) {

                enemyIcon.classList.add(
                    "fainted"
                );

            }


            if (
                i === currentEnemy &&
                enemyTeam[i].hp > 0
            ) {

                enemyIcon.classList.add(
                    "active"
                );

            }

        }


        /* =================================================
           PLAYER
        ================================================= */

        if (playerIcon) {

            playerIcon.classList.remove(
                "active",
                "fainted"
            );


            if (
                playerTeam[i].hp <= 0
            ) {

                playerIcon.classList.add(
                    "fainted"
                );

            }


            if (
                i === currentPlayer &&
                playerTeam[i].hp > 0
            ) {

                playerIcon.classList.add(
                    "active"
                );

            }

        }

    }

}


/* =========================================================
   SWITCH BUTTON
========================================================= */

if (switchButton) {

    switchButton.addEventListener(
        "click",
        function () {

            if (battleOver) {
                return;
            }


            if (switchMenuOpen) {
                return;
            }


            openSwitchMenu(false);

        }
    );

}


/* =========================================================
   OPEN SWITCH MENU
========================================================= */

function openSwitchMenu(forced) {

    if (switchMenuOpen) {
        return;
    }


    switchMenuOpen =
        true;


    disableMoves(true);


    const overlay =
        document.createElement("div");


    overlay.className =
        "switch-overlay";


    overlay.id =
        "switchOverlay";


    const panel =
        document.createElement("div");


    panel.className =
        "switch-panel";


    const title =
        document.createElement("h2");


    title.textContent =
        forced
            ? "Choose your next DebugMon"
            : "Switch DebugMon";


    panel.appendChild(title);


    playerTeam.forEach(
        function (player, index) {

            const button =
                document.createElement("button");


            button.className =
                "switch-option";


            button.type =
                "button";


            button.textContent =
                player.name +
                " | HP: " +
                player.hp +
                "/" +
                player.maxHP;


            if (
                player.hp <= 0 ||
                index === currentPlayer
            ) {

                button.disabled =
                    true;

            }


            button.addEventListener(
                "click",
                function () {

                    switchPlayer(index);

                    overlay.remove();

                }
            );


            panel.appendChild(
                button
            );

        }
    );


    /* =====================================================
       CANCEL
    ===================================================== */

    if (!forced) {

        const cancel =
            document.createElement("button");


        cancel.className =
            "cancel-switch";


        cancel.type =
            "button";


        cancel.textContent =
            "CANCEL";


        cancel.addEventListener(
            "click",
            function () {

                overlay.remove();


                switchMenuOpen =
                    false;


                disableMoves(false);

            }
        );


        panel.appendChild(
            cancel
        );

    }


    overlay.appendChild(
        panel
    );


    const gameElement =
        document.querySelector(".game");


    if (gameElement) {

        gameElement.appendChild(
            overlay
        );

    }

}


/* =========================================================
   SWITCH PLAYER
========================================================= */

function switchPlayer(index) {

    if (
        playerTeam[index].hp <= 0 ||
        index === currentPlayer
    ) {

        return;
    }


    currentPlayer =
        index;


    switchMenuOpen =
        false;


    updateBattleDisplay();


    showMessage(
        "Go, " +
        playerTeam[currentPlayer].name +
        "!"
    );


    setTimeout(
        function () {

            if (!battleOver) {

                showQuestion();

            }

        },
        DIALOGUE_INTERVAL
    );

}


/* =========================================================
   END BATTLE
========================================================= */

function endBattle(playerWon) {

    battleOver =
        true;


    disableMoves(true);


    if (switchButton) {

        switchButton.disabled =
            true;

    }


    if (playerWon) {

        showMessage(
            "🏆 VICTORY! You defeated all ErrorMons!"
        );

    } else {

        showMessage(
            "💻 GAME OVER! Your DebugMon team was defeated."
        );

    }

}


/* =========================================================
   START BATTLE
========================================================= */

function startBattle() {

    currentPlayer = 0;

    currentEnemy = 0;

    currentRound = 0;

    battleOver = false;

    switchMenuOpen = false;

    currentQuestion = null;

    questionSolved = false;


    /* =====================================================
       RESET HP
    ===================================================== */

    playerTeam.forEach(
        function (player) {

            player.hp =
                player.maxHP;

        }
    );


    enemyTeam.forEach(
        function (enemy) {

            enemy.hp =
                enemy.maxHP;

        }
    );


    /* =====================================================
       CLEAR
    ===================================================== */

    if (pythonCode) {

        pythonCode.textContent =
            "";

    }


    if (errorName) {

        errorName.textContent =
            "READY";

    }


    if (movesContainer) {

        movesContainer.innerHTML =
            "";

    }


    if (switchButton) {

        switchButton.disabled =
            false;

    }


    updateBattleDisplay();


    showMessage(
        "A wild ErrorMon appeared!"
    );


    /* =====================================================
       FIRST QUESTION
    ===================================================== */

    setTimeout(
        function () {

            if (!battleOver) {

                showQuestion();

            }

        },
        1000
    );

}


/* =========================================================
   START GAME
========================================================= */

startBattle();