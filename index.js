const listElement = document.querySelector(".posts");
const fetchButton = document.querySelector("#available-posts button");
const postTemplate = document.querySelector("template");

const myForm = document.getElementById("my-form");

//here we would like to wait for the fetch untill the button is pressed
// so we add a "await" keyword to the funtion, however we also need to wrap it
// around a async to be able to use "await"

// it also means we are expected to return a promise whenver we call the function
// 'sendHttpRequest'
// Method,   url //
async function sendHttpRequest(method, url) {
  //with XHR
  // const promise = new Promise((resolve, reject) => {
  //   //first with XHR we need to instantiate the XMLDocument object
  //   const xhr = new XMLHttpRequest()
  //   // now that we have instantieted it we can add liseners to it, lke the ones bellow!!

  //   //now that we have a open xhr request!
  //   //Open specifies the details of the connection, like what is the URL and what is the method fx. "GET"
  //   //The job of .open is to set the request to the given URl trought the given method "GET"
  //   xhr.open(method, url)
  //   // we can retrieve the data trought onload
  //   //Once we have finished recieving all the packets .onload will be triggered
  //   //and the function that comes after will be invoked
  //   xhr.onload = function () {

  //     //returns the data back if its succesfull withiint the given time
  //     if (xhr.status >= 200 && xhr.status < 300) {
  //       //once we have the data we can say here is the data and here is my promise with the data that i get back
  //       resolve(xhr.response);
  //     } else {
  //       reject("Something went wrong....:<")
  //     }
  //   }
  //   //None of this code will be executed untill we use .send
  //   xhr.send()
  // })

  // return promise

  //===============================================
  //Best way to use for now!!!!!!!!
  //Now we will do the same thing by using fetch()
  const response = await fetch(url, { method });
  console.log(response);
  const result = await response.json();
  return result;

  // We can also ride this code in another way
  //================================================
  // return await fetch(url,{method}).then(r => r.json())
  //================================================

  //Axios
  //We need to put the Axious CDN in the html file to be able to use it
  //Can be used in vanila JS but its best recommended to be used with
  // modern frameworks
  //with axios
  //const { data } = await axios(url, { method })
  //return data
  // return axios.get(url)
}

async function fetchPosts() {
  // When using Axious change to
  //const {data: responseData} = await sendHttpRequest(
  //   "GET",
  //   "https://jsonplaceholder.typicode.com/posts"
  // );

  // Method,   url //
  const responseData = await sendHttpRequest(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );

  console.log(responseData);
  if (responseData.length > 0) {
    for (const post of responseData) {
      const postElClone = document.importNode(postTemplate.content, true);

      //inject data into each cloned template
      postElClone.querySelector("h2").textContent = post.title;
      postElClone.querySelector("p").textContent = post.body;
      postElClone.querySelector("li").id = post.id;

      //append to the list
      listElement.appendChild(postElClone);
    }
  }
}

async function addPost() {
  preventDefault();
  // const sendData = await sendHttpRequest(
  //   "POST",
  //   "https://jsonplaceholder.typicode.com/posts"
  // )

  // const formData = new FormData();
  // formData.append("title", document.getElementById("title").value);
  // formData.append("body", document.getElementById("content").value);
  
  // const data = {
  //   title: formData.get("title"),
  //   body: formData.get("body"),
  // }

  
  // fetch("https://jsonplaceholder.typicode.com/posts", {
  //   method: "POST",
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //   },
  //   body: JSON.stringify(data),
  // })
  // .then(response => {
  //   if (response.ok) {
  //     // handle success
  //     console.log('Data posted successfully');
  //   } else {
  //     // handle errors
  //     console.error('Failed to post data');
  //   }
  // })
  // .catch(error => {
  //   console.error(error);
  // });


  const newPost = {
    title: 'All about Fetch!',
    body: 'Fetch is awesome!'
 }
 const options = {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: new Headers({
        'Content-Type': 'application/json'
    })
 }
 fetch("https://jsonplaceholder.typicode.com/posts", options)
    .then(res => res.json())
    .then(posts => console.log(posts))

  
}

//READ/GET

fetchButton.addEventListener("click", fetchPosts);
myForm.addEventListener("submit", addPost);
