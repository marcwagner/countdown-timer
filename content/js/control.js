console.clear();
var run_state = "run"
var valid_run_states = ["run", "pause", "reload"];



function updateControl(ctl) {
  get_run_state(window.location.origin + '/control=' + ctl);
//  console.log(ctl)
  run_state = ctl;
}

function updatetime(ctl) {
  get_run_state(window.location.origin + '/time=' + ctl);
  console.log(ctl)
}

function get_run_state(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200 ) {
//            console.log(xhttp.responseText);
            update_run_state(xhttp.responseText);
          };
        };
    xhttp.send();
}

function update_run_state(text) {
  response = text.split('&');
  for (i = 0; i < response.length; i++)  {
    resp = response[i];
      if (valid_run_states.includes(resp)) {
        run_state = resp;
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function check_run_state() {
    while (true) {
      switch (run_state) {
        case "run":
          document.getElementById("run").checked = true;
          break;
        case "pause":
          document.getElementById("pause").checked = true;
          break;
        case "reload":
          document.getElementById("reload").checked = true; // after reset immediately start running
          break;
        }
      get_run_state(window.location.origin + '/run_state', );
      await sleep(500);
  }
}

check_run_state()
