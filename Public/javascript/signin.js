$("form#formSignin").submit(function(e){
    e.preventDefault();
    console.log(e,'e');
    var userRole = document.getElementById('userRole').value;
    var email = document.getElementById('e-mail').value;
    var password = document.getElementById('pass').value;


     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
     console.log('lllllllllllllllll',localStorage.setItem);


    axios.post('/api/login', {userRole : userRole,email: email, password: password}).then((response)=>{
        console.log('response',response);
        if(response.data.status){
             if (typeof(Storage) !=="undefined") {
                 localStorage.setItem("jwtToken", response.data.token);
             }
            alert(response.data.message);
            window.location =  '/profile';
        }else{
            alert(response.data.message);
            console.log(response);
        }
    })
});

$(document).ready(function(){

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
    console.log('eeeeeeeeeeeeeeeee',localStorage.getItem);

    axios.get('/api/profile').then((res)=>{
   console.log('res',res);
           document.getElementById('firstName').innerText = res.data.firstName;
           
       }).catch((e)=>{
           console.log('errrrrrrrrrrrrrrrrrrrrr',e);
       })
   });