// Steven A. Roseman II
// Visual Frameworks
// Project 2
// Term 1302

window.addEventListener("DOMContentLoaded", function(){


    function getEle(x){
        var elementId = document.getElementById(x);
        return elementId;
    }
    function createEle(y){
        var createElement = document.createElement(y);
        return createElement;
    };
    
    function chooseProd() {
        var formTag = document.getElementsByTagName("form"),
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
    
    function keepData(){
        var newId                   = Math.floor(Math.random()*100000001);
        
        getPushedRadio();
        getFavValue();
    
        
        var prodDetails             = {};
            prodDetails.fname       =["First Name:", getEle("fname").value];
            prodDetails.lname       =["Last Name:", getEle("lname").value];
            prodDetails.email       =["Email:", getEle("email").value];
            prodDetails.group       =["Product Group:", getEle("select").value];
            prodDetails.interest    =["slider", getEle("slider").value];
            prodDetails.color       =["Color", productColor];
            prodDetails.fav         =["Favorite", favValue]; 
            prodDetails.date        =["Date", getEle("date").value];
            prodDetails.comments    =["Comments", getEle("comments").value];
    
    localStorage.setItem(newId, JSON.stringify(prodDetails));
    alert("Wish Saved");
        
    }
    function getData(){
        toggleControls("on");
        var makeDiv = createEle("div");
        makeDiv.setAttribute("id", "prodDetails");
        var makeUlList = createEle("ul");
        makeDiv.appendChild(makeUlList);
        document.body.appendChild(makeDiv);
        getEle("prodDetails").style.display = "block";
        for(var i=0, j=localStorage.length; i<j;i++) {
            var makeLi = createEle("li");
            makeUlList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var subUlList = createEle("ul");
            makeLi.appendChild(subUlList);
            for( var a in obj) {
                var subLi = createEle("li");
            subUlList.appendChild(subLi);
            var optSubText = obj[a][0] +" " +obj[a][1];
            subLi.innerHTML = optSubText;
            }
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
    var wishProducts = ["--Choose A Product--", "posh", "kitten", "zany"];
    var productColor;
    var favValue = "No"
    ;
    
    
    var displayLink = getEle("displayData");
    displayLink.addEventListener("click", getData);
    
    var clearLink = getEle("clearData");
    clearLink.addEventListener("click", clearLocal); 
    var submit = getEle("button");
    submit.addEventListener("click", keepData); 
    
    
    chooseProd();
 
});