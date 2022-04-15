document.addEventListener("DOMContentLoaded", () => {});

  
  //get form element to variable
  const form = document.querySelector("#create-task-form");
  //add the event listener to the form
  form.addEventListener('submit',submitHandle)


  //handle the form submission
  function submitHandle(e){
    //e.preventDefault>>since e is an event this prevents the default submit behavior
    e.preventDefault();
    console.log(e.target)
    //get the value of Task
    let newTask = e.target.querySelector('#new-task-description').value;
    //append that value using appendTask function
    appendTask(newTask);
    //add event listener if list is longer than 1
    initSortButton();


    e.target.reset()
    }

//appends the new task to the UL element
function appendTask(task){
//make list components
const newListItem = makeListItem(task)
const xBtn = makeButton('x')
const dropDown = makeDropDown()

//add them together
newListItem.appendChild(xBtn);
newListItem.appendChild(dropDown)


//add the created list item to the DOM
document.querySelector('#tasks').appendChild(newListItem)

}

  //returns a li item with task as textContent
function makeListItem(task){
let item = document.createElement('li')
item.textContent = task;
return item
}

//returns a delete button
function makeButton(text){
  //create the button in the dom
  let btn = document.createElement('button')
  //assign the button test based on argument
  btn.textContent = text;
  //create an event listener for the button that, when envoked, removes the buttons's parent object
  btn.addEventListener('click',(e)=> e.target.parentElement.remove())
  //return the button
return btn
}

//returns a dropdown menue
function makeDropDown(){
  const dropDown = document.createElement('select');
  //set default color of default option to be red
  dropDown.style.color='red'
  //add an event listener to change color when menu item is selected
  dropDown.addEventListener('change', function(e){

    if (e.target.value==1){e.target.style.color='red'}   

  
    if (e.target.value==2){e.target.style.color='blue'}  

    if (e.target.value==3){e.target.style.color='green'}  
    })

  //highest priority option
  const option1 = document.createElement('option');
  option1.value = '1'
  option1.textContent = 'Highest Priority'
  option1.style.color = 'red'

  //middle priority option
  const option2 = document.createElement('option');
  option2.value = '2'
  option2.textContent = 'Middle Priority'
  option2.style.color = 'red'

  const option3 = document.createElement('option');
  option3.value = '3'
  option3.textContent = 'Low Priority'
  option3.style.color = 'red'


  dropDown.appendChild(option1)
  dropDown.appendChild(option2)
  dropDown.appendChild(option3)
  return dropDown;
}


//function reorders list grouped by priority
function sortListAlpha(){
//creates an array of all the list elements
  const listArray = Array.from(document.querySelector('ul').children);
  //gets the UL element
  const ulElement = document.querySelector('ul')
  //create empty list(will fill in new order and append later)
  let newListArray = []

  //quick function to get priority value from list item
  const dropDownValue = (x)=>x.querySelector('select').value;

  //builds newListArray and removes each item from UL
  for (i of listArray){
    //if newlistArray is empty or if i is higher priority than first element in newlistArray, then unshift i, else push i
    if (!newListArray.length || (dropDownValue(i)<= dropDownValue(newListArray[0]))  ){
      newListArray.unshift(i);
      ulElement.removeChild(i)
      
    }
    else {newListArray.push(i)}
  }
  
  //re-append new list array items in new order
    for (i of newListArray){ulElement.appendChild(i); console.log(newListArray)}

  
}

//returns the sort button
function initSortButton(){
  const sortButton = document.querySelector('#sort')
  const ulElement = document.querySelector('#tasks')
  
  //only add the event listener if the list is longer than one
  sortButton.addEventListener('click',()=>
  {if(ulElement.childElementCount > 1
    ){sortListAlpha()}}
  )


  return submitButton

}