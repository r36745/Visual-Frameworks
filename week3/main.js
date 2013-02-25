// Steven A. Roseman II
// Visual Frameworks
// Project 3

// Term 1302


//This function makes sure to load when DOM is ready
window.addEventListener("DOMContentLoaded", function(){

//getElementById Function

    function getEle(x){
        var elementId = document.getElementById(x);
        return elementId;
    }
    function createEle(y){
        var createElement = document.createElement(y);
        return createElement;
    };
    
    // This is the select field element, populates product options
    function chooseProd() {
        var formTag = document.getElementsByTagName("form"),//Form tag is an array of all form <form> used in a HTML page. Only one form tag used
            selectLi = getEle("select"),
            makeLiTag = createEle("select");
            makeLiTag.setAttribute("id", "products");
        for(var i=0, j=wishProducts.length; i<j; i++){
            var createOptions = createEle("option"),
                groupProducts = wishProducts[i];
            createOptions.setAttribute("value", groupProducts);
            createOptions.innerHTML = groupProducts;
            makeLiTag.appendChild(createOptions);
        }
        selectLi.appendChild(makeLiTag);
    }
    
    function getPushedRadio(){
        var radioButtons = document.forms[0].color;
        for (var i=0; i<radioButtons.length; i++){
            if(radioButtons[i].checked)
            productColor = radioButtons[i].value;
        }
    }
    
    function getFavValue(){
        if (getEle("fav").checked){
            favValue = getEle("fav").value;
        } else {
            favValue = "No";
        }
    }
    function toggleControls(n) {
        switch(n){
            case "on":
                getEle("comments").style.display = "none";
                getEle("clearData").style.display = "inline";
                getEle("displayData").style.display = "none";
                getEle("newItem").style.display = "inline";
                break;
            case "off":
                getEle("comments").style.display = "block";
                getEle("clearData").style.display = "inline";
                getEle("displayData").style.display = "inline";
                getEle("newItem").style.display = "none";
                getEle("prodDetails").style.display = "none";
                break;
            default:
                return false;
        }
    }
    
    function storeData(key){
        //if no key, it's a brand new item and need a new key
        if(!key) {
             var id                   = Math.floor(Math.random()*100000001);
        }else{
            //Set the id to the existing to, so that it will save over data
            //The key is the same thats been passed through editSubmit handler
            //To the validate function and then passed here into storeData
            id = key;
        }
        //Gather up our form field values and store in an object
        //Object properties contain array with the form label and input value
        getPushedRadio();
        getFavValue();
    
        
        var prodDetails             = {};
            prodDetails.fname       =["First Name:", getEle("fname").value];
            prodDetails.lname       =["Last Name:", getEle("lname").value];
            prodDetails.email       =["Email:", getEle("email").value];
            prodDetails.group       =["product:", getEle("products").value];
            prodDetails.interest    =["slider", getEle("slider").value];
            prodDetails.color       =["Color", productColor];
            prodDetails.fav         =["Favorite", favValue]; 
            prodDetails.date        =["Date", getEle("date").value];
            prodDetails.comments    =["Comments", getEle("comments").value];
    
    //localStorage is used to save the data to localStorage, using stringify to convert the obj to a string
    //localStorage only saves as a string
    localStorage.setItem(id, JSON.stringify(prodDetails));
    alert("Wish Saved");
        
    }
    function getData(){
        //Take data from localStorage and put it to the browser
        toggleControls("on");
        var makeDiv = createEle("div");
        makeDiv.setAttribute("id", "prodDetails");
        var makeUlList = createEle("ul");
        makeDiv.appendChild(makeUlList);
        document.body.appendChild(makeDiv);
        getEle("prodDetails").style.display = "block";
        for(var i=0, j=localStorage.length; i<j;i++) {
            var makeLi = createEle("li");
            var linksLi = createEle("li");
            makeUlList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //To convert the string back to an obj
            var obj = JSON.parse(value);
            var subUlList = createEle("ul");
            makeLi.appendChild(subUlList);
            for( var a in obj) {
                var subLi = createEle("li");
            subUlList.appendChild(subLi);
            var optSubText = obj[a][0] +" " +obj[a][1];
            subLi.innerHTML = optSubText;
            subUlList.appendChild(linksLi);
            }
            makeItemsLink(localStorage.key(i),linksLi); // Used to create the edit and delete buttons
        }
    
    }
    // Create edit/delete link for each stored item when displayed
    function makeItemsLink(key,linksLi) {
        //add edit single item link
        var editLink = createEle("a");
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Wish";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        var breakTag = createEle("br");
        linksLi.appendChild(breakTag);
        
        var deleteLink = createEle("a");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Wish";
        deleteLink.addEventListener("click",deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }
    function editItem() {
        //Grab data from our item from localStoarage
        var value = localStorage.getItem(this.key);
        var prodDetails = JSON.parse(value);
        
        //Show form to edit item
        toggleControls("off");
        
        //populate form fields with current localStorage values
        getEle("fname").value = prodDetails.fname[1];
        getEle("lname").value = prodDetails.lname[1];
        getEle("email").value = prodDetails.email[1];
        getEle("products").value = prodDetails.group[1];
        getEle("slider").value = prodDetails.interest[1];
        var radios = document.forms[0].color;
        for(var i=0; i < radios.length; i++) {
            if(radios[i].value == "Passion Pink" && prodDetails.color[1] == "Passion Pink") {
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Refreshing Rasberry" && prodDetails.color[1] == "Refreshing Rasberry") {
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Blueberry blue" && prodDetails.color[1] == "Blueberry blue") {
                radios[i].setAttribute("checked", "checked");
            }
        }
        if(prodDetails.fav[1] == "Yes") {
            getEle("favValue").setAttribute("checked", "checked");
        }
        getEle("date").value = prodDetails.date[1];
        getEle("comments").value = prodDetails.comments[1];
        
        //Remove the initial listener from the unput "save wish" button
        save.removeEventListener("click", storeData);
        //Change submit button value to edit button
        getEle("submit".value = " Edit Wish");
        var editSubmit = getEle("submit");
        //Save the key value established in the function as a property of the editSubmit event
        //so we can use that value wehn we save the data we edited
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
        
    }
    function deleteItem() {
        var ask = confirm(" Are you sure you want to delete your wish");
        if(ask) {
            localStorage.removeItem(this.key);
            window.location.reload();
        }else{
            alert("Wish was not deleted");
        }
    }
    
    function clearLocal() {
        if(localStorage.length === 0){
            alert("No Data");
        } else {
            localStorage.clear();
            alert("Wish has been deleted");
            window.location.reload();
            return false;
        }
    }
    
    function validate(e) {
        //Define the elements that should be checked
        var getFname = getEle("fname");
        var getLname = getEle("lname");
        var getEmail = getEle("email");
        var getProducts = getEle("products");
        
        //Reset error messages
        errMsg.innerHTML = "";
        getFname.style.border = "1px solid black";
        getLname.style.border = "1px solid black";
        getEmail.style.border = "1px solid black";
        getProducts.style.border = "1px solid black";
        
        // Get Error Messages
        var messageAry = [ ];
        // conditional to first name validation
        if(getFname.value == "") {
            var fnameError = "Please correct first name";
            getFname.style.border = "1px solid red";
            messageAry.push(fnameError);
        }
        //Check last name conditional
        if(getLname.value =="") {
            var lnameError = "Please correct last name";
            getLname.style.border = "1px solid red";
            messageAry.push(lnameError);
        }
        //Email Validation
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!(re.exec(getEmail.value))) {
            var emailError = "Please enter a valid email Address";
            getEmail.style.border = "1px solid red";
            messageAry.push(emailError);
        }
        if(getProducts.value == "--Choose A Product--") {
            var productError = "Add a Product";
            getProducts.style.border = "1px solid red";
            messageAry.push(productError);
        }
         //Any errors display to screen
         if(messageAry.length >= 1) {
            for (var i=0, j=messageAry.length; i < j; i++) {
                var txt = document.createElement("li");
                txt.innerHTML = messageAry[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
        return false;
         }else{
            //if its good, save data-send key value from edit function
            //remember key value, passed through editSubmit event Listener as a property
            storeData(this.key);
         }
       
    } 
    
    //Default Variables
    var wishProducts = ["--Choose A Product--", "posh", "kitten", "zany"];
    var productColor;
    var favValue = "No";
    var errMsg = getEle("errors");
    
    
    
    
 
    
    var displayLink = getEle("displayData");
    displayLink.addEventListener("click", getData);
    
    var clearLink = getEle("clearData");
    clearLink.addEventListener("click", clearLocal); 
    var save = getEle("submit");
    save.addEventListener("click", validate); 
    
    
    chooseProd();
 
});