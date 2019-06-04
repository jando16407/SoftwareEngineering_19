<html>
<head><title>uploader.php</title></head>
<body>
<p> file uploader </p>
<?php
  $updir = "./upload/";
  $filename = $_FILES['upfile']['name'];
  if(move_uploaded_file($_FILES['upfile']['tmp_name'], $updir.$filename)==FALSE){
    print("Upload failed");
    print($_FILES['upfile']['error']);
  }
  else {
    print("<b> $filename </b> uploaded");
  }
?>
</body>
</html>