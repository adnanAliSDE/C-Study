// Inputs
const inputSection = document.querySelector(".inputs");
const chapterInput = document.querySelector('input[name="chapterName"]');
const subjectInput = document.querySelector('select[name="subjectName"]');
const submitInput = document.querySelector('input[type="submit"]');

// taking data
submitInput.addEventListener("click", (inputFunction) => {
  let title = chapterInput.value;
  let subject = subjectInput.value;
  if (title == "") {
    alert("Please enter the chapter name");
  } else {
    if (localStorage.getItem("chaptersArray") == null) {
      let chaptersArray = [];
      chaptersArray.unshift([title, subject]);
      localStorage.setItem("chaptersArray", JSON.stringify(chaptersArray));
    } else {
      let chaptersArrayJSON = JSON.parse(localStorage.getItem("chaptersArray"));
      chaptersArrayJSON.unshift([title, subject]);
      localStorage.setItem("chaptersArray", JSON.stringify(chaptersArrayJSON));
    }
    chapterInput.value = "";
  }
  populate();
});

// populating data
const toCompleteSection = document.querySelector(".toComplete .chapters");
function populate() {
  toCompleteSection.innerHTML = "";
  let chaptersArrayJSON = JSON.parse(localStorage.getItem("chaptersArray"));
  for (let i = 0; i < chaptersArrayJSON.length; i++) {
    const chapter = chaptersArrayJSON[i];
    toCompleteSection.innerHTML += `
        <div class="chapter">
        <p class="name">${chapter[0]}</p>
        <p class="Subject">${chapter[1]}</p>
        <button onclick=completed(${i})>Mark done</button>
    </div>`;
  }
}
populate();

// putting in completed
const completedSection = document.querySelector(".completed .chapters");

function completed(a) {
  let chapters = JSON.parse(localStorage.getItem("chaptersArray"));
  let date = new Date().getTime();

  if (localStorage.getItem("completedChaptersArray") == null) {
    let completedChapters = [];
    completedChapters.unshift([...chapters[a], date, 1]);
    localStorage.setItem(
      "completedChaptersArray",
      JSON.stringify(completedChapters)
    );
  } else {
    let completedChaptersArrayJSON = JSON.parse(
      localStorage.getItem("completedChaptersArray")
    );
    completedChaptersArrayJSON.unshift([...chapters[a], date, 1]);
    localStorage.setItem(
      "completedChaptersArray",
      JSON.stringify(completedChaptersArrayJSON)
    );
  }
  chapters.splice(a, 1);
  localStorage.setItem("chaptersArray", JSON.stringify(chapters));
  populate();
  popCompleted();
}

function popCompleted() {
  let completedSection = document.querySelector(".completed .chapters");
  let completedChaptersArrayJSON = JSON.parse(
    localStorage.getItem("completedChaptersArray")
  );
  if (completedChaptersArrayJSON == null) {
    return;
  } else {
    completedSection.innerHTML = "";
    for (let i = 0; i < completedChaptersArrayJSON.length; i++) {
      const chapter = completedChaptersArrayJSON[i];
      let date = new Date(chapter[2]);
      let year = date.toLocaleDateString();

      completedSection.innerHTML += `
          <div class="chapter">
          <p class="name">${chapter[0]}</p>
          <p class="subject">${chapter[1]}</p>
          <p class="date" onclick=dateUpdate(${i}) >${year}</p>
      </div>`;
    }
  }
}
popCompleted();

// date Conversion
function dateUpdate(i) {
  // console.log(i);
  let completedChaptersArray = JSON.parse(
    localStorage.getItem("completedChaptersArray")
  );
  let day = 86400 * 1000;
  let change = completedChaptersArray[i][3];
  let oldDate = completedChaptersArray[i][2];
  let newDate = oldDate + change * day;
  console.log(change);
  change = change * 2;
  console.log(change);

  // changing array
  completedChaptersArray[i].splice(2, 2);
  completedChaptersArray[i].push(newDate, change);
  localStorage.setItem(
    "completedChaptersArray",
    JSON.stringify(completedChaptersArray)
  );
  popCompleted();
}
