var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCate= document.getElementById("productCate")
var productDesc = document.getElementById("Desc")

var nameAlert= document.getElementById("productNameAlert")
var priceAlert = document.getElementById("productPriceAlert")
var cateAlert = document.getElementById("productCateAlert")
var descAelert = document.getElementById("productDescAlert")

var table = document.getElementById("Tablebody")
var button = document.getElementById("submitBtn")
var search = document.getElementById("search")
var products = [];
var updateMode = false;
var idx;
var storage = JSON.parse(localStorage.getItem("allProducts"))
if(storage != null){
    products = storage;
    displayProducts();
}

function getProducts(){
    var product = {
        name: productName.value,
        price: Number(productPrice.value),
        Cate: productCate.value,
        Desc: productDesc.value,
    }
    return product
}

 function addUpdateProduct(){
    validateMassege()
    if(validateProduct()){
        if(!updateMode){
            AddProducts(getProducts())
        }else{
            updateProducts(getProducts())
        }
        storeData();
        displayProducts();
        clearInput();
    }else{
        console.log("a7a")
    }
    
 }

 function storeData(){
    localStorage.setItem("allProducts" , JSON.stringify(products))
 }
 
 function AddProducts(product){
    products.push(product)
 }

 function updateProducts(product){
    products.splice(idx,1,product)
    buttonSwap();
    updateMode=false
 }

 function displayProducts(){
    container="";
    for(var i=0;i<products.length;i++)
    {
         container+=`<tr>
                    <td>${i+1}</td>
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>                   
                    <td>${products[i].Cate}</td>
                    <td>${products[i].Desc}</td>
                    <td><button onclick="PatchValues(${i})" class="btn btn-warning text-white">Update</button></td>
                    <td><button onclick="deleteProducts(${i})" class="btn btn-danger text-white">Delete</button></td>
                    </tr>`   
    }
    table.innerHTML=container;
 }

 function clearInput(){
    productName.value=""
    productPrice.value=""
    productCate.value=""
    productDesc.value=""
 }

 function setInputs(index){
    productName.value=products[index].name
    productPrice.value=products[index].price
    productCate.value=products[index].Cate
    productDesc.value=products[index].Desc
 }

 function buttonSwap(){
    if(button.innerHTML=="Add Product")
        {
            button.innerHTML="Update"
        }else{
            button.innerHTML="Add Product"
        }
 }

function deleteProducts(index){
    products.splice(index,1);
    storeData();
    displayProducts()
 }

function PatchValues(index){
    idx=index
    setInputs(index);
    buttonSwap();
    updateMode = true
 }

 function searchElement(){
    container="";
    for(var i=0 ; i<products.length ;i++)
        {
            if(products[i].name.toLowerCase().includes(search.value.toLowerCase())){
                    container+=`<tr>
                                <td>${i}</td>
                                <td>${products[i].name}</td>
                                <td>${products[i].price}</td>                   
                                <td>${products[i].Cate}</td>
                                <td>${products[i].Desc}</td>
                                <td><button onclick="PatchValues(${i})" class="btn btn-warning text-white">Update</button></td>
                                <td><button onclick="deleteProducts(${i})" class="btn btn-danger text-white">Delete</button></td>
                                </tr>`   
              }
        }
        table.innerHTML=container;
 }

 function validateProduct(){
    return (/^[A-Z][a-z0-9]{1,7}$/.test(productName.value)&&/^[1-9][0-9]{2,6}$/.test(productPrice.value)&&/^[A-Z][a-z]{1,8}$/.test(productCate.value)&&/^[\w]{4,80}$/.test(productDesc.value))
 }
 function validateMassege(){
    if(!(/^[A-Z][a-z0-9]{1,7}$/.test(productName.value))){
        nameAlert.classList.remove("d-none")
        productName.classList.remove("is-valid")
        productName.classList.add("is-invalid")
    }else{
        nameAlert.classList.add("d-none")
        productName.classList.remove("is-invalid")
        productName.classList.add("is-valid")
    }

    if(!(/^[1-9][0-9]{2,6}$/.test(productPrice.value))){
        priceAlert.classList.remove("d-none")
        productPrice.classList.remove("is-valid")
        productPrice.classList.add("is-invalid")
    }
    else{
        priceAlert.classList.add("d-none")
        productPrice.classList.remove("is-invalid")
        productPrice.classList.add("is-valid")
    }

    if(!(/^[A-Z][a-z]{1,8}$/.test(productCate.value))){
        cateAlert.classList.remove("d-none")
        productCate.classList.remove("is-valid")
        productCate.classList.add("is-invalid")
    }
    else{
        cateAlert.classList.add("d-none")
        productCate.classList.remove("is-invalid")
        productCate.classList.add("is-valid")
    }
    if(!(/^[\w]{4,80}$/.test(productDesc.value))){
        descAelert.classList.remove("d-none")
        productDesc.classList.remove("is-valid")
        productDesc.classList.add("is-invalid")
    }
    else{
        descAelert.classList.add("d-none")
        productDesc.classList.remove("is-invalid")
        productDesc.classList.add("is-valid")
    }
 }