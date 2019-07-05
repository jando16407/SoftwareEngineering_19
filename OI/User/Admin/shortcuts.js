hotkeys('shift+ctrl+1,shift+ctrl+2,shift+ctrl+3,shift+ctrl+4,shift+ctrl+5', function(event,handler) {
  switch(handler.key){
    case "shift+ctrl+1": window.location.href ="main.html";break;
    case "shift+ctrl+2": window.location.href ="workspace.html";break;
    case "shift+ctrl+3":window.location.href ="settings.html";break;
    case "shift+ctrl+4":window.location.href ="officeview.html";break;
    case "shift+ctrl+5":window.location.href ="../../logout.html";break;
  }
});