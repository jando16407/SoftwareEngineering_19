hotkeys('shift+ctrl+p,ctrl+w,ctrl+m,ctrl+s,ctrl+o,ctrl+l', function(event,handler) {
  switch(handler.key){
    case "shift+ctrl+p": window.location.href ="main.html";break;
    case "ctrl+w": window.location.href ="user_workspace.html";break;
    //case "ctrl+m": window.location.href ="messages.html";break;
    case "ctrl+s":window.location.href ="settings.html";break;
    //case "ctrl+o":window.location.href ="officeview.html";break;
    case "ctrl+l":window.location.href ="../logout.html";break;
  }
});
