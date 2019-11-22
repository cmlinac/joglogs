module.exports = marathonScheduler;

showLogs = true; //true = shows lots of console log stuff, false shows "ERROR containing messages only"
function logthis(stuff) {
  if (showLogs || stuff.includes("ERROR")) {
    console.log(stuff);
  }
}

// COMMENT OUT THE NEXT LINE IF NOT TESTING:
// data = {
//   mpw: 0,
//   days: ["1", "2", "3", "4"],
//   longRun: "2",
//   goalDistance: 26.2,
//   raceName: "TEST Data, comment out function called if production",
//   raceDate: "2020-07-01"
// };
//marathonScheduler();

function marathonScheduler(data) {
  let runnerData = [];
  // if no data received with function.
  if (data === undefined) {
    logthis(
      "ERROR! ***** marathonScheduler?? (data) for runner was undefined using sample data ************** "
    );
    // The following will run with test data for testing only
    // use default test data:
    // days: ["0", "2", "3", "4", "5"],

    data = {
      mpw: 0,
      days: ["1", "2", "3", "4"],
      longRun: "2",
      goalDistance: 26.2,
      raceName: "TEST Data, comment out function called if production",
      raceDate: "2020-07-01"
    };
    logthis(data);
  }

  runnerData = data;

  //set trainingStartDate as tomorrow in format "2019-11-30"
  let calculateStartDate = new Date().setDate(new Date().getDate() + 1);
  calculateStartDate =
    new Date(calculateStartDate).toJSON().substr(0, 10) + "T12:00:00";
  logthis("calculateStartDate = " + calculateStartDate);
  // add trainingStartDate in anticipation of this being an option in future, currently starts "tomorrow"
  runnerData.startDate = calculateStartDate;
  logthis("runnerData = " + JSON.stringify(runnerData));
  // beginning mpw must not === 0, start with min 1 mile, to stop divide by zero error.
  if (parseFloat(runnerData.mpw) < 1) {
    runnerData.startMilesPerWeek = 1;
  } else {
    runnerData.startMilesPerWeek = parseFloat(runnerData.mpw);
  }
  runnerData.raceMiles = parseFloat(runnerData.goalDistance);
  logthis("runnerData.raceMiles = " + runnerData.raceMiles);
  runnerData.longRunDay = parseInt(runnerData.longRun);
  if (runnerData.raceName === "") {
    runnerData.raceName = "Run Calendar Created " + YYYYMMDD(new Date());
  }

  // setup some global variables:
  let dayOfMilliseconds = 24 * 60 * 60 * 1000; // 24hrs X 60min X 60secs X 1,000 milliseconds  = 1 day.
  let event = [];
  let events = [];
  let eventCounter = 0;

  let day = [];
  let weekNumber = 0;
  let weekToIncrementNumber = 0;
  let milesThisWeek = runnerData.startMilesPerWeek;
  let weeklyIncrement = 3;
  // Maximum number of mile that should be assigned in a day (depends on length of marathon..)
  // maxMilesPerDay will affect later calculations:
  // if less than 4 run days per week, maxMilesPerWeek = maxMilesPerDay * 2.3
  // if 4 or more runs per week, maxMilesPerWeek = runnerData.raceMiles * 2.5
  let maxMilesPerWeek;
  if (runnerData.raceMiles === 26.2) {
    maxMilesPerDay = 20;
  }
  if (runnerData.raceMiles === 13.1) {
    maxMilesPerDay = 12;
  }
  if (runnerData.raceMiles === 6.2) {
    maxMilesPerDay = 6;
  }
  if (runnerData.raceMiles === 3.1) {
    maxMilesPerDay = 3;
  }
  logthis("maxMilesPerDay = " + maxMilesPerDay);
  let todayNoon = YYYYMMDD(new Date()) + "T12:00:00";
  logthis("let todayNoon = " + todayNoon);
  //scheduleWeekStart = last sundays date.
  let scheduleWeekStart = new Date(todayNoon).setDate(
    new Date(todayNoon).getDate() - new Date(todayNoon).getDay()
  );
  logthis(
    "let scheduleWeekStart = " +
      scheduleWeekStart +
      " " +
      new Date(scheduleWeekStart)
  );
  // Initialize tempEventDate. This is just start value.. gets changed for each event date in for-loop later
  let tempEventDate = new Date(todayNoon).getTime();
  logthis(
    "let tempEvenDate = " +
      tempEventDate +
      " " +
      new Date(tempEventDate) +
      ", this is just start value.. gets changed to each event date in for loop later."
  );

  // Time for some calculations!! What Fun!

  //Calculate running days per week from runnerdata:
  for (let i = 0; i < runnerData.days.length; i++) {
    runnerData.days[i] = parseInt(runnerData.days[i]);
  }

  // Calculate and assign running schedule and percent for each day of run
  if (runnerData.days.length > 6 || runnerData.days.length < 3) {
    logthis(
      "ERROR--- Only " +
        runnerData.days.length +
        " Run Days Chosen.. This Must be between 3 and 6. Continuing with assumed 4 days: Mon, Tue, Thu, Sat"
    );
    runnerData.days.push(1);
    runnerData.days.push(2);
    runnerData.days.push(4);
    runnerData.days.push(6);
  }

  //Check to make sure the "longRunDay" is one of their run days, if not, change it to last of their running days
  if (runnerData.days.includes(runnerData.longRunDay)) {
    // Yay! they picked a long run date that also is on there running days list!
  } else {
    // choose last of there running days as longest run day since they chose longRunDay that wasn't in their days list
    logthis(
      "ERROR: user chose longRunDay = " +
        runnerData.longRunDay +
        ", but that wasn't included in their days for running. adding longRunDay to list of run days."
    );
    runnerData.days.push(runnerData.longRunDay);
    runnerData.days.sort();
  }

  // put runDays in order, ending with their chosen longRunDay.. (make the longRunDay the last day of schedule week.)
  let runDays = runnerData.days;
  runDays.sort((a, b) => a - b);

  //shift the longRunDay to the end of the 'week' of runs by moving later days to beginning (day -7) of the week array (runnerData.days[]).
  // compare last item in list (length-1) to the longRunDay, if it's greater, then minus 7 days from the number and sort again.
  while (runDays[runDays.length - 1] > runnerData.longRunDay) {
    runDays[runDays.length - 1] = runDays[runDays.length - 1] - 7;
    runDays.sort();
  }

  runDays.sort((a, b) => a - b);
  // set maxMilesPerWeek to limit miles per week if only training 3 days per week, or if more than 3 days use chosen max.
  // maxMilesPerWeek should not exceed max run length x number of run days (i.e. if max run is 20 miles, you can't run more than 20 X number of run days)
  if (runDays.length < 4) {
    // maxMilesPerWeek limited to 60 if only training 3 days per week.
    maxMilesPerWeek = maxMilesPerDay * 2.3;
  } else {
    maxMilesPerWeek = runnerData.raceMiles * 2.5;
  }
  logthis("maxMilesPerWeek =  " + maxMilesPerWeek);
  logthis("runDays ordered with long run last = " + runDays);
  logthis("\nCalculated Data Using runnerData:");
  logthis("runDays =" + runDays);
  logthis("runDays.length = " + runDays.length);

  // Calculate how many weeks of training:

  // Take off Last x days for pre-marathon taper (only 26.2 mile marathons have 2 week taper)
  // milliseconds in one day = 24hrs X 60 minutes X 60 Seconds X 1,000 milliseconds

  let lastRegularTrainingDay =
    new Date(runnerData.raceDate + "T12:00:00").getTime() -
    24 * 60 * 60 * 1000 * 14; //= 14 days
  logthis(
    "lastRegularTrainingDay (before taper) = " +
      new Date(lastRegularTrainingDay).toJSON().substr(0, 10)
  );

  //convert the other date values to time in milliseconds javascript native..
  runnerData.startDate = new Date(
    YYYYMMDD(new Date(runnerData.startDate))
  ).getTime();
  logthis(
    "startDate in ms = " +
      runnerData.startDate +
      " = " +
      new Date(runnerData.startDate)
  );

  runnerData.raceDate = new Date(runnerData.raceDate + "T12:00:00").getTime();
  logthis(
    "raceDate in ms = " +
      runnerData.raceDate +
      " = " +
      new Date(runnerData.raceDate)
  );

  //calculate time diff between training start date and last training date
  const timeDifference = lastRegularTrainingDay - runnerData.startDate;
  // calculate the no. of days between two dates by dividing by a day of milliseconds
  const dayDifference = timeDifference / (1000 * 3600 * 24);
  logthis("total days of training time = " + dayDifference);
  // calculate totalweeks to train
  const weeksToTrain = Math.ceil(dayDifference / 7);
  logthis("total weeks of training time = " + weeksToTrain);

  const weeksToIncrementMiles = Math.ceil((dayDifference / 7) * 0.666);
  logthis(
    "total weeks of incrementations (2/3 weeks) = " + weeksToIncrementMiles
  );

  // calculate totalTrainingSessions
  const totalSessions = runDays.length * weeksToTrain;
  logthis("total run sessions (weeks x perweek) = " + totalSessions);

  // figure out if we are going to exceed max miles per week with default weeklyIncrement miles per week increase..********************************************
  // If we exceed peak, then adjust the weeklyIncrement downward to meet peak goal.
  // calculate using default weeklyIncrement as max limit adn maxMilesPerWeek for top limit per week
  logthis(
    "maxMilesPerWeek Goal is = " +
      maxMilesPerWeek +
      ",THIS schedule will reach: " +
      maxMilesPerWeek * weeksToIncrementMiles +
      runnerData.startMilesPerWeek
  );

  if (
    weeksToIncrementMiles * weeklyIncrement + runnerData.startMilesPerWeek >
    maxMilesPerWeek
  ) {
    // Compute new weeklyIncrement to reach max miles per week in the number of weeks of training.
    weeklyIncrement =
      (maxMilesPerWeek - runnerData.startMilesPerWeek) / weeksToIncrementMiles;
  }

  logthis(
    "weeklyIncrement adjusted down if runner exceeds maxMilesPerWeek = " +
      weeklyIncrement
  );

  const peakMiles =
    weeklyIncrement * weeksToIncrementMiles + runnerData.startMilesPerWeek;
  logthis("The peak miles per week will reach " + peakMiles);

  // run descriptions:
  let runEasy =
    "Easy Effort.  Easy runs should be executed at a relaxed effort where breathing is comfortable.  They will help you recover from your other runs.";
  let runSpeed =
    "Speed Development.  Developing speed will set you up for success on race day.  They serve as both physical and mental conditioning. Speed workouts should be executed at harder effort than race pace.";
  let runHill =
    "Hill Workout.  Run for the hills!  Find a hilly route or run hill repeats.  Running hills will pay dividends on race day.  Hill conditioning will make running on a relatively flat course seem easy.";
  let runLong =
    "Long Run.  Long runs are your most crucial run of the week.  They will help build physical and mental endurance for race day.  Long run efforts should be executed at your targeted race pace or slower.";

  if (runDays.length === 3) {
    day[0] = {
      percentMilesPerWeek: 25,
      description: runSpeed
    };
    day[1] = {
      percentMilesPerWeek: 25,
      description: runEasy
    };
    day[2] = {
      percentMilesPerWeek: 50,
      description: runLong
    };
  }
  if (runDays.length === 4) {
    day[0] = {
      percentMilesPerWeek: 12.5,
      description: runEasy
    };
    day[1] = {
      percentMilesPerWeek: 25,
      description: runSpeed
    };
    day[2] = {
      percentMilesPerWeek: 12.5,
      description: runHill
    };
    day[3] = {
      percentMilesPerWeek: 50,
      description: runLong
    };
  }
  if (runDays.length === 5) {
    day[0] = {
      percentMilesPerWeek: 8.3,
      description: runEasy
    };
    day[1] = {
      percentMilesPerWeek: 25,
      description: runSpeed
    };
    day[2] = {
      percentMilesPerWeek: 8.4,
      description: runEasy
    };
    day[3] = {
      percentMilesPerWeek: 8.3,
      description: runHill
    };
    day[4] = {
      percentMilesPerWeek: 50,
      description: runLong
    };
  }
  if (runDays.length === 6) {
    day[0] = {
      percentMilesPerWeek: 6.25,
      description: runEasy
    };
    day[1] = {
      percentMilesPerWeek: 6.25,
      description: runSpeed
    };
    day[2] = {
      percentMilesPerWeek: 25,
      description: runEasy
    };
    day[3] = {
      percentMilesPerWeek: 6.25,
      description: runHill
    };
    day[4] = {
      percentMilesPerWeek: 6.25,
      description: runEasy
    };
    day[5] = {
      percentMilesPerWeek: 50,
      description: runLong
    };
  }

  // add chosen run days and day names
  dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  for (let i = 0; i < runDays.length; i++) {
    day[i].dayNumber = runDays[i];
    day[i].dayOfWeek = dayNames[runDays[i]];
  }

  logthis("run days (computed from Sunday) array:");
  logthis(day);

  logthis("Last training day=" + new Date(lastRegularTrainingDay));

  // ************************** Start creating Events *********************************************
  // ************************** Start creating Events *********************************************

  while (tempEventDate < runnerData.raceDate) {
    weekMilesAddedUp = -1;
    weekNumber++;

    // for uptick training weeks, calculate new miles per week after incrementing the value of weekToIncrementNumber
    if (weekNumber % 3 > 0) {
      weekToIncrementNumber++;
      milesThisWeek =
        weeklyIncrement * weekToIncrementNumber + runnerData.startMilesPerWeek;
    } else {
      // for every 3rd week, the 'Recovery weeks', Miles drop 15% and we do not increment the weekToIncrementNumber (not an uptick week)
      milesThisWeek = 0.85 * milesThisWeek;
    }

    // If any run is over maxMilesPerDay miles, we must redistribute the extra miles onto easier days.
    // create mileTest Array slice in a duplicate of the day array
    let mileTest = day.slice(0);
    // now I loop through the array and add a field to hold the original day order of the array, since I am about to sort by run length percentages
    for (i = 0; i < day.length; i++) {
      mileTest[i].dayorder = i;
    }
    // Sort milesTest array by longest run to shortest, using teh percentMilesPerWeek key
    mileTest.sort((a, b) => a.percentMilesPerWeek - b.percentMilesPerWeek);
    // declare remainder variable for overflow miles
    let remainder = 0;
    //Loop through run, and if any run exceeds maxMilesPerDay miles, spread remainder over the remaining shorter runs
    for (i = mileTest.length - 1; i >= 0; i--) {
      // eslint-disable-next-line prettier/prettier
      logthis("i = " + i + " milesThisWeek = " + milesThisWeek + " mileTest[i].percentMilesPerWeek = " + mileTest[i].percentMilesPerWeek );

      // get normal calculation for this run day
      calcRunByPercent =
        (milesThisWeek * mileTest[i].percentMilesPerWeek) / 100;
      logthis("normal calcRunByPercent = " + calcRunByPercent);
      // add portion of remainder miles by dividing remainder miles by remaining runs (i+1)
      calcRunPlusRemainder = calcRunByPercent + remainder / (i + 1);
      // deduct the same portion of miles from the remainder
      remainder = remainder - remainder / (i + 1);
      logthis(
        "with portion of remainder if applicable =" + calcRunPlusRemainder
      );
      // if THIS run ends up longer than maxMilesPerDay miles, reduce to maxMilesPerDay, and toss the rest into remainder variable
      if (calcRunPlusRemainder > maxMilesPerDay) {
        // put miles over maxMilesPerDay into remainder
        remainder = calcRunPlusRemainder - maxMilesPerDay + remainder;
        // Since it was over maxMilesPerDay, set miles to maxMilesPerDay
        calcMilesToRun = maxMilesPerDay;
      } else {
        // since calcuRunPlusRemainder was under maxMilesPerDay, use it for todays miles to run.
        calcMilesToRun = calcRunPlusRemainder;
      }
      // Reset percentage of week due to change
      mileTest[i].percentMilesPerWeek =
        Math.round((calcMilesToRun / milesThisWeek) * 1000) / 10;
      // set todays calcMilesToRun in the milesTest array for use on event builder
      mileTest[i].calcMilesToRun = calcMilesToRun;

      // eslint-disable-next-line prettier/prettier
      logthis( "for runtest " + i + " (" + mileTest[i].percentMilesPerWeek +"%) the run is " + calcMilesToRun + ". and the remainder is now " + remainder);
    }

    // reSort by original day order so they are called in correct order.
    mileTest.sort((a, b) => a.dayorder - b.dayorder);

    //    logthis(mileTest);

    // Create events for this week
    for (let i = 0; i < runDays.length; i++) {
      // get value of 1st runDays[] and multiply by days, then add to Sunday week start to get first event of week
      //(first event may be negative day to make long run the last day of the weeks events)
      tempEventDate =
        scheduleWeekStart +
        runDays[i] * dayOfMilliseconds +
        7 * weekNumber * dayOfMilliseconds;

      daysTillRaceDay = Math.floor(
        (runnerData.raceDate - tempEventDate) / (24 * 60 * 60 * 1000)
      );

      // if we have entered 2 week taper, drop 25%, then 50% for 26 mile marathon or just 1 week drop if shorter marathon
      if (daysTillRaceDay < 15) {
        // use peakMiles unless its over 40, then use 40.
        if (peakMiles > 2 * maxMilesPerDay) {
          taperMilesPerWeek = 2 * maxMilesPerDay;
        } else {
          taperMilesPerWeek = peakMiles;
        }
        // if less than week til race, drop miles by 75% for 7 days prior to race
        if (daysTillRaceDay < 8) {
          milesThisWeek = 0.25 * taperMilesPerWeek;
        } else {
          // if 26.2 mile marathon, drop miles 50% starting 14 days out, but leave unchanged for shorter marathons
          if (runnerData.raceMiles === 26.2) {
            milesThisWeek = 0.5 * taperMilesPerWeek;
          }
        }
      }

      let remainingWeeks = Math.floor(
        (tempEventDate - runnerData.raceDate) / (-1 * 7 * 24 * 60 * 60 * 1000)
      );

      // skip event if it is before runners start date (calculations start the sunday prior to start date).
      // Also skip event if it is less than 2 days prior to race.

      if (
        tempEventDate >= runnerData.startDate &&
        tempEventDate < runnerData.raceDate - 2 * 24 * 60 * 60 * 1000
      ) {
        // create the actual event ****************************************** create the days event *****************************************
        milesToday = milesThisWeek * (mileTest[i].percentMilesPerWeek / 100);
        // if over 10 mile marathon, round daily run+1/4 to higher mile
        if (runnerData.raceMiles > 10) {
          milesToday = Math.ceil(milesToday + 0.25);
        } else {
          // if less than 10 miles, round to nearest 1/10 mile
          milesToday = Math.round(milesToday * 10) / 10;
        }
        //Aside from calculations, alway make run at least .5 miles.
        if (milesToday < 0.5) {
          milesToday = 0.5;
        }
        eventCounter++;
        event.number = eventCounter;
        event.date = new Date(tempEventDate);
        event.percentMilesPerWeek = mileTest[i].percentMilesPerWeek;
        event.milesToRunToday = milesToday;
        event.mileTotalThisWeek = Math.ceil(milesThisWeek);
        event.title =
          event.milesToRunToday +
          " mile run today. " +
          remainingWeeks +
          " weeks til Marathon.";
        event.description = mileTest[i].description;
        events.push(event);
        event = [];
      }
    }

    eventDay = tempEventDate;
  }

  // Special add on event for Race Day *************
  eventCounter++;
  event.number = eventCounter;
  event.raceName = runnerData.raceName;
  event.date = new Date(runnerData.raceDate);
  event.percentMilesPerWeek = 100;
  event.milesToRunToday = runnerData.raceMiles;
  event.mileTotalThisWeek = runnerData.raceMiles;
  event.title = "Race Day! Great Job, you are ready for this! Good Luck!";
  event.milesToRunToday = runnerData.raceMiles;
  event.description = "RACE DAY!";
  events.push(event);
  // logthis(event);

  logthis("\nAll Done With Regular Training");

  let eventsArr = [];
  for (let i = 0; i < events.length; i++) {
    let eventObj = {
      number: events[i].number,
      raceName: runnerData.raceName,
      dateTime: YYYYMMDD(events[i].date),
      percentMilesPerWeek: events[i].percentMilesPerWeek,
      mileTotalThisWeek: events[i].mileTotalThisWeek,
      runDistance: events[i].milesToRunToday,
      title: events[i].title,
      description: events[i].description
    };
    logthis(
      "Date = " +
        YYYYMMDD(events[i].date) +
        " Descrip = " +
        events[i].description.substr(0, 15) +
        " Miles = " +
        events[i].milesToRunToday
    );

    eventsArr.push(eventObj);
  }

  //logthis("\n\nEventArray:\n\n");
  //logthis(events);

  //logthis("\n\nEventObject:\n\n");
  //  logthis(eventsArr);

  return eventsArr;
}

function YYYYMMDD(aDate) {
  let dateString = new Date(
    aDate.getTime() - aDate.getTimezoneOffset() * 60 * 1000
  )
    .toISOString()
    .split("T")[0];
  return dateString;
}