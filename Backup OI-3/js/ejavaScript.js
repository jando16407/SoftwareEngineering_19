var tabButtons=document.querySelectorAll(".tabContainer2 .buttonContainer button")
var tabPanels=document.querySelectorAll(".tabContainer2 .tabPanel")
function showPanel(panelIndex, colorCode){
    tabButtons.forEach(function(node){
    node.style.backgroundColor="";
    node.style.color="";
});
tabButtons[panelIndex].style.backgroundColor=colorCode;
tabButtons[panelIndex].style.color="white";
tabPanels.forEach(function(node){
    node.style.display="none";
});
tabPanels[panelIndex].style.display="block";
tabPanels[panelIndex].style.backgroundColor=colorCode;
}

showPanel(0,'#2196f3');
