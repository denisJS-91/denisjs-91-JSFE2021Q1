const keyArray = [
  "C",
  "Cs",
  "D",
  "Ds",
  "E",
  "F",
  "Fs",
  "G",
  "Gs",
  "A",
  "As",
  "B",
];
const dataKey = ["z", "s", "x", "d", "c", "v", "g", "b", "h", "n", "j", "m"];
const dataKeyCaps = [
  "Z",
  "S",
  "X",
  "D",
  "C",
  "V",
  "G",
  "B",
  "H",
  "N",
  "J",
  "M",
];

const keys = document.querySelectorAll(".key");
const piano = document.querySelector(".piano1 ");

const onRenderAudio = (e) => {
  const capsLock = e.getModifierState("CapsLock");
  const divWrapper = document.createElement("div");
  divWrapper.classList.add("div-container");
  for (let i = 0; i < keyArray.length; i++) {
    const audo = document.createElement("audio");
    audo.id = keyArray[i];
    audo.dataset.key = capsLock ? dataKeyCaps[i] : dataKey[i];
    audo.src = `./assets/audio/${keyArray[i]}.mp3`;
    divWrapper.append(audo);
  }
  document.querySelector(".div").append(divWrapper);
};

piano.addEventListener("mousedown", (e) => {
  onRenderAudio(e);
  keys.forEach((element) => {
    element.addEventListener("mouseover", () => {
      keys.forEach((el) => el.classList.remove("active"));
      const sound = document.getElementById(element.dataset.note);
      sound ? element.classList.add("active") : null;

      sound ? (sound.currentTime = 0) : null;
      sound ? sound.play() : null;
    });
  });
  keys.forEach((element) => {
    element.addEventListener("mouseleave", () => {
      keys.forEach((el) => el.classList.remove("active"));
    });
  });

  keys.forEach((el) => el.classList.remove("active"));
});

window.addEventListener("mouseup", (e) => {
  const container = document.querySelectorAll(".div-container");
  setTimeout(
    () => (container ? container.forEach((el) => el.remove()) : null),
    500
  );
});

keys.forEach((element) => {
  element.addEventListener("mousedown", (e) => {
    onRenderAudio(e);
    keys.forEach((el) => el.classList.remove("active"));
    const sound = document.getElementById(element.dataset.note);
    sound ? element.classList.add("active") : null;
    sound ? (sound.currentTime = 0) : null;
    sound ? sound.play() : null;
    const container = document.querySelectorAll(".div-container");

    setTimeout(
      () => (container ? container.forEach((el) => el.remove()) : null),
      500
    );
  });
});

window.addEventListener("keydown", function (e) {
  const capsLock = e.getModifierState("CapsLock");
  onRenderAudio(e);
  keys.forEach((el) => el.classList.remove("active"));
  keys.forEach((el) => {
    if (e.code.substr(3, 3).toLowerCase() === el.dataset.key) {
      el.classList.add("active");
    }
    setTimeout(() => el.classList.remove("active"), 500);
  });
  const audio = document.querySelector(
    `audio[data-key="${
      capsLock ? e.code.substr(3, 3) : e.code.substr(3, 3).toLowerCase()
    }"]`
  );
  const container = document.querySelectorAll(".div-container");

  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  setTimeout(
    () => (container ? container.forEach((el) => el.remove()) : null),
    1000
  );
});

const buttonForNotes = document.querySelector(".btn-notes");
buttonForNotes.addEventListener("click", () => {
  keys.forEach((element) => {
    element.innerHTML = `${element.dataset.note}`;
  });
});

const buttonForKeyboard = document.querySelector(".btn-Keyboard");
buttonForKeyboard.addEventListener("click", () => {
  keys.forEach((element) => {
    element.innerHTML = `${element.dataset.key}`;
  });
});

keys.forEach((element) => {
  element.innerHTML = `${element.dataset.note}`;
});

const fullscreen = () => {
  let isInFullScreen =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement;

  let docElm = document.documentElement;
  if (!isInFullScreen) {
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
};
