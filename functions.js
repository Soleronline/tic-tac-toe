let active_player = true;
const CHAR_PLAYER1 = 'X';
const CHAR_PLAYER2 = '0';
let player1 = "";
let player2 = "";

let combinations = {
    '1': {
        '2': {'3': ''},
        '4': {'7': ''},
        '5': {'9': ''},
    },
    '2': {
        '5': {'8': ''},
    },
    '3': {
        '6': {'9': ''},
        '5': {'7': ''},
    },
    '4': {
        '5': {'6': ''}
    },
    '7': {
        '8': {'9': ''}
    },
}

const show_message = (message) => typeof TEST === 'undefined' ? document.querySelector("#message").innerHTML = message : null;
const restart_message = () => document.querySelector("#message").innerHTML = '';

const show_form = (id_form) => document.getElementById(id_form).style.display = "block";
const hide_form = (id_form) => document.getElementById(id_form).style.display = "none";

const show_keyboard = (id_keyboard) => document.getElementById(id_keyboard).style.display = "block";
const hide_keyboard = (id_keyboard) => document.getElementById(id_keyboard).style.display = "none";

const show_winning_message = () => show_message("Player <strong><u>" + (active_player ? player1 : player2) + "</u></strong> has won");
const show_tie_message = () => show_message("There has been a tie");

const who_starts = () => Boolean(Math.floor(Math.random() * 2));
const write_who_has_turn_is_it = () => document.getElementById("who_has_turn_is_it").innerHTML = "It's player <strong><i>" + (active_player ? player1 : player2) + "</i></strong>'s turn";
const player_change = () => active_player = !active_player;
const get_char = () => active_player ? CHAR_PLAYER1 : CHAR_PLAYER2;


/**
 * The start function initializes the game by getting the player names, validating them, showing the
 * player names, hiding the form, showing the keyboard, determining the starting player, and adding
 * event listeners to the game buttons.
 */
function start(){
    restart_message();
    player1 = document.getElementById("player1").value.trim();
    player2 = document.getElementById("player2").value.trim();

    [valid, message] = validate_players(player1, player2);
    if (valid){
        show_player_names(player1, player2);
        hide_form("myform");
        show_keyboard("keyboard");
        active_player = who_starts();
        write_who_has_turn_is_it();

        let buttons_pos = document.getElementsByClassName("pos");
        for (let bot of buttons_pos){
            bot.addEventListener("click", move);
        }
    }else{
        show_message(message);
    }
}

/**
 * The function "move" handles the logic for each move in a game, including checking for a win or tie
 * and updating the player's turn.
 * @param event - The event parameter is an object that represents the event that triggered the
 * function. It contains information about the event, such as the element that triggered the event
 * (srcElement).
 */
function move(event){
    restart_message();
    let button_pressed = event.srcElement;
    write_char(button_pressed);
    let finish = game_is_over();
    if (finish === true){
        show_winning_message();
        restart_game();
    }else if (finish === null){
        show_tie_message();
        restart_game();
    }else{
        player_change();
        write_who_has_turn_is_it();
    }
}

/**
 * The function "restart_game" hides the keyboard, shows a form, and restarts the keyboard.
 */
function restart_game(){
    hide_keyboard("keyboard");
    show_form("myform");
    restart_keyboard(document.getElementsByClassName("pos"));
}

/**
 * The function "restart_keyboard" resets the values and enables all buttons in a given array.
 * @param buttons_pos - The `buttons_pos` parameter is an array of objects representing the positions
 * of buttons on a keyboard. Each object in the array has two properties: `value` and `disabled`.
 */
function restart_keyboard(buttons_pos){
    for (let bot of buttons_pos){
        bot.value = "";
        bot.disabled = false;
    }
}

/**
 * The function "game_is_over" checks if the game is over by determining if there is a combination of 3
 * in a row, if there are no more free spaces, or if the game is still ongoing.
 * @returns The function game_is_over() returns either false, null, or true.
 * - false (continue playing): when there is no 3-in-a-row combination and there are gaps
 * - null (tie): when there is no combination of 3 in lines and there are no free spaces
 * - true (finished): when there is a match of 3 in stripes
 */
function game_is_over(){
    let buttons_all = document.getElementsByClassName("pos");
    let buttons = get_selected_buttons(buttons_all, get_char());
    if (check_combination(buttons)){
        return true;
    }
    if (!there_are_free_spaces(buttons_all)){
        return null;
    }
    return false;
}

/**
 * The function "check_combination" checks if there is a valid combination of buttons based on the
 * given array of buttons.
 * @param buttons - The `buttons` parameter is an array that represents the combination of buttons
 * pressed. Each element in the array represents a button that was pressed.
 * @returns a boolean value. It returns true if there is a valid combination of buttons based on the
 * given conditions, and false otherwise.
 */
function check_combination(buttons){
    if (buttons.length < 3){
        return false;
    }
    for (let i = 0; i < buttons.length - 2; i+=1){
        for (let j = i+1; j< buttons.length - 1; j+=1){
            for (let k = j + 1; k<=buttons.length - 1; k+=1){

                if (combinations[buttons[i]] != undefined &&
                    combinations[buttons[i]][buttons[j]] != undefined &&
                    combinations[buttons[i]][buttons[j]][buttons[k]] !=  undefined){

                    return true;
                }
             }
        }
    }
    return false;
}

function get_selected_buttons(buttons_pos, char){
    let buttons = [];

    for (let bot of buttons_pos){
        if (bot.value === char){
            buttons.push(bot.id.substring(3))
        }
    }
    return buttons;
}

/**
 * The function checks if there are any free spaces in an array of buttons positions.
 * @param buttons_pos - The parameter `buttons_pos` is an array that represents the positions of
 * buttons. Each element in the array is an object that has a `value` property. The `value` property
 * represents the current value of the button at that position.
 * @returns a boolean value. It returns true if there are free spaces (buttons with empty values) in
 * the buttons_pos array, and false if all the spaces are filled (all buttons have non-empty values).
 */
function there_are_free_spaces(buttons_pos){
    let full = 0;
    for (let bot of buttons_pos){
        if (bot.value !== ""){
            full += 1;
        }
    }
    return !(full == buttons_pos.length);
}

/**
 * The function "write_char" sets the value of a button to a character and disables the button.
 * @param boton - The parameter "boton" is a reference to a button element in HTML.
 */
function write_char(boton){
    boton.value = get_char();
    boton.disabled = true;
}

/**
 * The function "show_player_names" updates the HTML elements with the names of two players and their
 * corresponding characters.
 * @param player1 - The name of the first player.
 * @param player2 - The `player2` parameter is the name of the second player in the game.
 */
function show_player_names(player1, player2){
    document.getElementById("name_player1").innerHTML = player1 + "(" + CHAR_PLAYER1 + ")";
    document.getElementById("name_player2").innerHTML = player2 + "(" + CHAR_PLAYER2 + ")";
}

/**
 * The function "validate_players" checks if two player names are valid and different from each other.
 * @param player1 - The first player's name.
 * @param player2 - The parameter "player2" is a string representing the name of the second player in a
 * game.
 * @returns an array with two elements. The first element is a boolean value indicating whether the
 * players are valid or not. The second element is a string message providing information about the
 * validation result.
 */
function validate_players(player1, player2){
    if (player1.trim() === ""){
        return [false, "Invalid player 1 name"];
    }
    if (player2.trim() === ""){
        return [false, "Invalid player2 name"];
    }
    if (player1.trim() === player2.trim()){
        return [false, "Player1 and player2 have the same name"];
    }
    return [true, ""];
}

// Enable for tests
// module.exports =  { validate_players, there_are_free_spaces }