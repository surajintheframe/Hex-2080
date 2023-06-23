

 
//  const login =  async (email, password)=>{
//    console.log(email,password);

//    const data = {
//     email: email,
//     password:password
//   };
  
// axios.post('http://127.0.0.1:3005/api/v1/users/login',  data)
// .then((response) => {
//   console.log(response);
//   alert('Data posted successfully:', response.data);
// })
// .catch((error) => {
//   console.log(error);
//   alert('Error posting data:', error.meassage);
// });
//     let res ;

//     try{

//          res= await axios({
//                 method:'POST',
//                 url:'http://127.0.0.1:3005/api/v1/users/login',  
               
//                 data:{
//                      email:email,
//                        password:password
//                 }
//             });

//        }
              
          
//         catch(err){
        
//             // console.log(err.response.data);
//              alert(err.message);
//         }
            
//          console.log(res)
//          if(res.data.status ==='success')
//          {
//                      alert(" Location in successfully ");
//                      window.setTimeout(() => {
//                          location.assign('/')
//                      }, 1000);
//                  }      

     
//         }
       






// document.getElementById('Login').addEventListener('submit' , e=>{
//     //console.log(e);
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value
//      login(email , password)
//   //  console.log(email , password);
// })
 


//import axios from 'axios';

 const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3005/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    console.log(res);
    if (res.data.status === 'success') 
     alert('Logged in successfully!')
     else 
     alert('Incorrect Email or password!')

    
  } catch (err) {
    alert( err.response.data.message);
  }
};

// export const logout = async () => {
//   try {
//     const res = await axios({
//       method: 'GET',
//       url: 'http://127.0.0.1:3000/api/v1/users/logout'
//     });
//     if ((res.data.status = 'success')) location.reload(true);
//   } catch (err) {
//     console.log(err.response);
//     showAlert('error', 'Error logging out! Try again.');
//   }
// };


document.getElementById('Login').addEventListener('submit' , e=>{
    //console.log(e);
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value
     login(email , password)
  //  console.log(email , password);
})