$(document).ready(function() {
  var intervalId;
  var noClicks = false;
  var itemClicked = '';
  var gamesWon = 0;
  var gamesLost = 0;
  var gamesUndecided = 0;
  var gameNo = 0;
  var qtimer = 10;
  var interGameno = 5;

  var games = [
    {
      question:
        'Name the hit The Rolling Stones song that was written by The Beatles.',
      choices: [
        'As Time Goes By',
        'Fade Away',
        'I Want To Be Your Man',
        'Do You Want To Know A Secret?',
      ],
      answer: '2',
      trivia:
        'The Beatles later recorded the song with Ringo as the lead vocal',
      image: 'assets/images/beman.jpeg',
    },
    {
      question: 'At one time Jimi Hendrix was a member of this band',
      choices: [
        'The Yardbirds',
        'Spencer Davis Group',
        'Vanilla Fudge',
        'Joey Dee and the Starliters',
      ],
      answer: '3',
      trivia:
        'Besides Jimi Hendrix, The Joey Dee Band also had several members of the Young Rascals',
      image: 'assets/images/jds.png',
    },
    {
      question: 'What Band sold the most records in 1967.',
      choices: [
        'The Beatles',
        'The Rolling Stones',
        'The Monkees',
        'The Doors',
      ],
      answer: '2',
      trivia:
        'The Monkees - in fact they sold more records than the Beatles and Rolling Stones combined',
      image: 'assets/images/monkees.png',
    },
    {
      question:
        'Frank Sinatra recorded only one song written by the Beatles. That Was',
      choices: ['Yesterday', 'Something', 'in My Life', 'Nowhere Man'],
      answer: '1',
      trivia:
        "George Harrison's Something - which made Lennon and McCartney very jealous.",
      image: 'assets/images/sinatra.png',
    },
    {
      question:
        "Name the 70's group that has a main vocialist who played the flute",
      choices: ['Moody Blues', 'Jethro Tull', 'Traffic', 'Led Zeppelin'],
      answer: '1',
      trivia: "The singers' name was Ian Anderson of Jethro Tull",
      image: 'assets/images/jt.png',
    },
    {
      question:
        "This famous band of the 70's were originally called 'The Golliwoggs'",
      choices: [
        'Grateful Dead',
        'Jefferson Airplane',
        'Creedence Clearwater Revival',
        'The Hollies',
      ],
      answer: '2',
      trivia: 'John Fogerty was the lead singer/song writer of the band',
      image: 'assets/images/ccr.png',
    },
  ];

  var numberOfGames = games.length;

  // clear playing are until the start of the game
  $('.remainderTimerContainer').hide();
  $('.remainderTime').hide();
  $('.card').hide();

  // wait for click of start button
  $(document).on('click', '.startButton', function() {
    $('.startButton').hide();
    displayGame();
  });

  // wait for selection of answer
  $(document).on('click', '.answerButton', function(response) {
    // The following will turn off click while game is in pause mode
    if (noClicks) return;

    // get the qtimer of the selection picked and put the game in pause mode
    itemClicked = response.currentTarget.dataset.buttonno;

    // find if selection is correct
    resultDisplay = '';

    if (itemClicked == games[gameNo].answer) {
      $('.selectButton' + itemClicked).css('background-color', 'yellow');
      stop('won');
    } else {
      stop('lost');
    }
  });

  function displayGame() {
    //set up display area
    $('.remainderTimerContainer').show();
    $('.remainderTime').show();
    $('.card').show();
    $('.result').empty();
    $('.answerBox').empty();
    $('.result').hide();

    //display question box
    $('.questionBox').text(games[gameNo].question);

    //display possible answers
    $('.answerTitle').html('Possible Answers');
    for (var i = 0; i < 4; i++) {
      answerWrap = $('<BUTTON>');
      answerWrap.addClass('answerButton');
      answerWrap.addClass('selectButton' + i);
      answerWrap.html(games[gameNo].choices[i]);
      answerWrap.attr('data-buttonno', i);
      $('.answerBox').append(answerWrap);
    }

    // set time interval and run
    run();
  }

  // this function sets the timer for the question to be solved
  function run() {
    qtimer = 11; //set to 11 to compensate delayed apperance of timer
    intervalId = setInterval(decrement, 1000);
  }

  function decrement() {
    qtimer = qtimer - 1;
    if (qtimer == 0) {
      $('.remainderTime').html('');
    } else {
      $('.remainderTime').html('Seconds Remaining:&emsp;&emsp;' + qtimer);
    }

    // change timer background cokor depending on status
    switch (qtimer) {
      case 0: //intergame timer
        clearInterval(intervalId);
        $('.remainderTimerContainer').css('background-color', 'black');
        mode = 'un';
        displayAnswer(mode);
        break;
      case 3: // warning: 3 seconds left to decide answer
        $('.remainderTimerContainer').css('background-color', 'red');
        break;
      case 10: // answer selecton
        $('.remainderTimerContainer').css('background-color', 'green');
        break;
    }
  }
  //----------------------------------------

  //this function sets the timer to pause the between Games
  function interGametimer() {
    interGameno = 6;
    $('.remainderTimerContainer').css('background-color', 'black');
    interGame = setInterval(interGamedec, 1000);
  }

  function interGamedec() {
    interGameno = interGameno - 1;

    if (interGameno == 0) {
      $('.remainderTime').html('');
    } else {
      $('.remainderTime').html('Next Game in ' + interGameno + ' seconds');
    }

    if (interGameno === 0) {
      clearInterval(interGame);
      clearInterval(intervalId);
      qtimer = 10;
      gameNo += 1;

      if (gameNo >= numberOfGames) {
        endOfGame();
      } else {
        $('.remainderTimerContainer').css('background-color', 'green');
        $('.remainderTime').html(''); //blank out timer
        displayGame();
      }
    }
  }

  function stop(mode) {
    $('.remainderTime').html(''); //blank out timer

    displayAnswer(mode);
    clearInterval(intervalId);
    if (gameNo >= numberOfGames) {
      endOfGame();
    } else {
      if (interGameno === 0) {
        displayGame();
      }
    }
  }

  // end of game display
  function endOfGame() {
    $('.questionTitle').html('Your Score');
    $('.questionBox').text('');
    $('.answerBox').empty();
    $('.answerTitle').empty();
    $('.result').empty;

    imageWrap = $('<img>');
    imageWrap.attr('src', 'assets/images/gameover.png');
    $('.answerBox').append(imageWrap);

    mess = $('<table>');
    mess.append('<tr>');
    mess.append('<td>');
    mess.append('Games Won');
    mess.append('<td>');
    mess.append(gamesWon);

    mess.append('<tr>');
    mess.append('<td>');
    mess.append('Games Lost');
    mess.append('<td>');
    mess.append(gamesLost);

    mess.append('<tr>');
    mess.append('<td>');
    mess.append('Undecided');
    mess.append('<td>');
    mess.append(gamesUndecided);

    $('.questionBox').append(mess);
  }

  // display answer
  function displayAnswer(mode) {
    //$('.remainderTime').hide();
    $('.result').empty();
    $('.answerTitle').empty();
    $('.answerBox').empty();
    qtimer = 10; //reset counter
    switch (mode) {
      case 'un':
        $('.answerTitle').html('Sorry - you ran out of time<br>');
        $('.answerTitle').show;
        $('.result').append(
          'The correct answer is<br><br>' +
            games[gameNo].choices[games[gameNo].answer] +
            '<br>'
        );
        $('.result').show();
        qtimer = 10;
        gamesUndecided += 1;
        break;
      case 'lost':
        $('.answerTitle').html('Sorry - Incorrect Answer<br>');
        $('.answerTitle').show;
        $('.result').append(
          'The correct answer is<br><br>' +
            games[gameNo].choices[games[gameNo].answer] +
            '<br>'
        );
        $('.result').show();
        gamesLost += 1;
        break;
      case 'won':
        $('.answerTitle').html('That is the correct Answer<br>');
        $('.answerTitle').show;

        imageWrap = $('<img>');
        imageWrap.attr('src', games[gameNo].image);
        $('.answerBox').append(imageWrap);
        triviatext = $('<p>');
        triviatext.html('<br>Trivia:<br>' + games[gameNo].trivia);
        $('.answerBox').append(triviatext);
        $('.answerBox').show();
        gamesWon += 1;
        break;
    }

    interGametimer();
  }
}); //ready
