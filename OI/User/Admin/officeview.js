
var file = document.getElementById('file')

function readURL(input){
       
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        console.log("reader created")
        reader.onload = function(e) {
            var canvas = document.getElementById("officeView")
            var context = canvas.getContext('2d')
            var background = new Image()
            background.src = e.target.result
            background.onload = function(){
                //canvas.appendChild(background)
                if(background.height > canvas.height || background.width > canvas.width)
                    if(background.height - canvas.height > background.width - canvas.width)
                        var ratio = canvas.height/background.height
                    else   
                        var ration = canvas.width/background.width
                context.imageSmoothingEnabled = false
                context.scale(ratio, ratio)
                context.drawImage(background,0,0); 
                
                
            }
            
        };

        reader.readAsDataURL(input.files[0]);
    } 
}
