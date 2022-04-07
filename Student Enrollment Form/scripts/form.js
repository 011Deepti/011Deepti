
function clearvalue(){
    document.getElementById("enrollform").reset();
}

function checkform(){                        
    var name = document.getElementById("enrollname").value;
    let email = document.getElementById("enrollemail").value;
    let weblink = document.getElementById("enrollweblink").value;
    let imagelink = document.getElementById("enrollimglink").value;
    
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let skills = [];
    let checkbox = document.getElementsByName('skills[]');
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            skills.push(checkbox[i].value);
        } 
    }
    let skill = skills.toString();
    console.log(imagelink);
    
    getenrolled(name, email, weblink, imagelink, gender, skill);
   }


function getenrolled(name, email, weblink, imagelink, gender, skill){

   var join1 = "<div class='tabel-data'><div class='tabel-data-desc'><span>";
   var join2 = name;
   var join3 = "</span><span>";   
   var join4 = gender;
   var join5 = "</span><span><a href='#'>";
   var join6 = email;   
   var join7 = "</a></span><span>";  
   var join8 = weblink;     
   var join9 = "</span><span>"; 
   var join10 = skill;       
   var join11 = "</span></div><div class='tabel-data-img'><img src='profile.jpeg.jpg'";
//    var join12 = imagelink;
   var join13 = "></div></div>";

   var alljoin =(join1 + join2 + join3 + join4 + join5 + join6 + join7 + join8 + join9 + join10 + join11 + join13);
   document.getElementById("enroll-data").innerHTML += alljoin;
}
