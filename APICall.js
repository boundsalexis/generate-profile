const axios =require('axios');
// for more than one api pull
// axios.all([
//     axios.get('https://api.github.com/users/boundsalexis'),
//     // axios.get('https://api.github.com/users/phantomjs')
//   ])
//   .then(response => {
//     //this will be executed only when all requests are complete
//     console.log('______', response[0].data);
//     // console.log("_______", response);
//   })
// .catch(err=>console.log(err))

// apiCall = username => { 

// }
var apiCall = function(username){ 
    return axios.get('https://api.github.com/users/'+username)
    .then(response => {
        // console.log(response);
      return response;
    })
    .catch(err=>console.log(err))
};
