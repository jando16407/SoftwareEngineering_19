hotkeys('ctrl+1,ctrl+2,ctrl+3,ctrl+4', function(event,handler) {
  switch(handler.key){
    case "ctrl+1": window.location.href ="main.html";break;
    case "ctrl+2": window.location.href ="user_workspace.html";break;
    //case "ctrl+m": window.location.href ="messages.html";break;
    case "ctrl+3":window.location.href ="settings.html";break;
    //case "ctrl+o":window.location.href ="officeview.html";break;
    case "ctrl+4":window.location.href ="../logout.html";break;
  }
});
