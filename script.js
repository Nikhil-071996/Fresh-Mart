//  Handle window preloader

const preloader = document.getElementById('preloader')

window.addEventListener('load' , () => preloader.style.display = 'none')


// Styling Form Border on Focus

const searchForm = document.getElementById('search');
const searchInput = document.getElementById('search-input');
const searchInputToggleBtn = document.getElementById('searchBtn-hidden')

if(searchInputToggleBtn !== null || searchInput !== null){
searchInput.addEventListener('focus' , () => {
    searchForm.classList.add('focus')  
})
searchInput.addEventListener('blur' , () => {
    searchForm.classList.remove('focus')  
})

    searchInputToggleBtn.addEventListener('click' , () => {
        if(searchInput.classList == 'show'){
            searchInput.classList.remove('show')
            searchInputToggleBtn.classList.replace('fa-xmark' , 'fa-magnifying-glass')
        }else{
            searchInput.classList.add('show')
            searchInputToggleBtn.classList.replace('fa-magnifying-glass' , 'fa-xmark')
    
        }
    })
}


// Handle Toggle Menu 

const openMenuBtn = document.querySelector('.fa-bars')
const closeMenuBtn = document.querySelector('.fa-circle-xmark')
const menu = document.getElementById('menu')

openMenuBtn.addEventListener('click' , () => {
    menu.classList.add('show')
})
closeMenuBtn.addEventListener('click' , () => {
    menu.classList.remove('show')
})


// Login Frm Open & Close Toggle 

const loginModalToggleBtn = document.getElementById('login-btn')
const loginModalToggleBtn2 = document.getElementById('login-btn-2')
const loginModal = document.querySelector('.login-overlay')
const Overlay = document.querySelector('.overlay')
const loginCloseBtn = document.querySelector('.fa-xmark')

loginModalToggleBtn.addEventListener('click' , () => {
    loginModal.classList.remove('hidden')
    SignInBtn.focus()
    cartContainer.classList.remove('show')
})  
loginModalToggleBtn2.addEventListener('click' , () => {
    loginModal.classList.remove('hidden')
    SignInBtn.focus()
    cartContainer.classList.remove('show')
})

function closeLoginModal(){
    loginModal.classList.add('hidden')
}

Overlay.addEventListener('click', closeLoginModal) 
loginCloseBtn.addEventListener('click', closeLoginModal) 



// Toggle Sign-in Sign-up Form 

const SignInBtn = document.getElementById('sign-in-btn')
const SignUpBtn = document.getElementById('sign-up-btn')

const SignInForm = document.getElementById('sign-in')
const SignUpForm = document.getElementById('sign-up')

function toggleSignInForm(){
    SignInForm.classList.toggle('hidden')
    SignUpForm.classList.toggle('hidden')
}

SignInBtn.addEventListener('click', () => {
    SignInForm.classList.remove('hidden')
    SignUpForm.classList.add('hidden')
})
SignUpBtn.addEventListener('click', () => {
    SignInForm.classList.add('hidden')
    SignUpForm.classList.remove('hidden')
})


// Fetching Data From Products.json 
const URL = 'Products.json'
fetchData(URL)


const productsEl = document.getElementById('products')
const categoriesSelectEl = document.getElementById('select-categories')
const categoriesListEl = document.getElementById('categories-list')


let products = []

let searchFilter = []

async function fetchData(url){
    try{
        const res = await fetch(url)
        const data = await res.json()
        products = data.products
        createElements(products)
        createCategoriesList(products)
    }catch(error){
        const Error = document.createElement('div')
        Error.classList.add('no-items-found')

        const msg = document.createElement('h1')
        msg.innerText = 'Sorry No Items Found'
        Error.appendChild(msg)
        productsEl.innerHTML = ''
        productsEl.appendChild(Error)
    }
}

// Creating CategoryElements 

function createCategoriesList(products){
    let categories = products.map(product => product.category)
    let uniqueCategories = new Set(categories)
    
    uniqueCategories.forEach(category => {
        categoriesListEl.innerHTML += `
        <li value="${category}">${category}</li>`
        
        const categoriesOption = document.createElement('option')
        categoriesOption.innerText = category
        categoriesOption.value = category
        if(categoriesSelectEl !== null){
            categoriesSelectEl.appendChild(categoriesOption)
        }
    })  
    filterByCategories() 
}

// Filter Product Elements By Categories

function filterByCategories(){
    if(categoriesSelectEl !== null){
        
        categoriesSelectEl.addEventListener('change' , e => {
            let categoryValue = e.target.value.toLowerCase()
            searchFilter.forEach(product => {
                if(e.target.value == 'All Categories'){
                    product.element.classList.remove('hide')
                }else{
                    const isVisible = product.category.toLowerCase().includes(categoryValue)
                    product.element.classList.toggle('hide' , !isVisible)
                }
            })
            
        })
    }

    let categoriesList = categoriesListEl.querySelectorAll('li')

    categoriesList.forEach(list => {
        list.addEventListener('click' , e => {
            let categoryValue = e.target.innerText.toLowerCase()
            searchFilter.forEach(product => {
                const isVisible = product.category.toLowerCase().includes(categoryValue)
                product.element.classList.toggle('hide' , !isVisible)
            })
        })
    })
}


// Creating Product Elements 

function createElements(products){
    searchFilter = products.map(product => {
        const productCardEl = document.createElement('div')
        productCardEl.classList.add('product-card')
        
        productCardEl.innerHTML = ` 
            <i class="fa-regular fa-heart" onclick="addToWishList(${product.id})""></i> 
            <div class="image-container">
                <div class="image-container">
                    <img src="Images/${product.name}.webp" alt="${product.name}">
                </div>
            </div>
            <p class="categories">${product.type}</p>
            <h4 class="product-name">${product.name}</h4>
            <div class="price">
                <i class="fa-solid fa-indian-rupee-sign"></i>
                <span>${product.price}</span>
            </div>
            <button class="add-to-cart btn" onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-plus"></i></button>
        `
        if(productsEl !== null){
            productsEl.appendChild(productCardEl)
        }
        return { name : product.name , type : product.type , element : productCardEl , price : product.price , category : product.category}
    })
}
// Adding Function to Search Input 

if(searchForm !== null){
    searchForm.addEventListener('submit' , e => {
        e.preventDefault()
        let searchValue = searchInput.value.toLowerCase()
        let filteredProduct =  products.filter(product => {
            return product.name.toLowerCase().includes(searchValue) || product.type.toLowerCase().includes(searchValue)
        })
        if(filteredProduct.length === 0){
            if(productsEl !== null){
                const noItemsFound = document.createElement('div')
                noItemsFound.classList.add('no-items-found')
    
                const msg = document.createElement('h1')
                msg.innerText = 'Sorry No Items Found'
                noItemsFound.appendChild(msg)
                productsEl.innerHTML = ''
                productsEl.appendChild(noItemsFound)
            }
        }else{
            productsEl.innerHTML = ''
            createElements(filteredProduct)
        }
        searchInput.value = ''
    })
}


// Adding Functionality to cheap and Expensive Btn

const cheapBtn = document.getElementById('cheap');
const expensiveBtn = document.getElementById('expensive');

if(cheapBtn !== null && expensiveBtn !== null){
    cheapBtn.addEventListener('click' , () => {
        searchFilter.forEach(product => {
            product.element.classList.add('hide')
        })
        products.sort((a , b) => {
            return a.price - b.price
        })
        createElements(products)
    })

    expensiveBtn.addEventListener('click' , () => {
        searchFilter.forEach(product => {
            product.element.classList.add('hide')
        })
        products.sort((a , b) => {
            return b.price - a.price
        })
        createElements(products)
    })
}

// Display Cart 

const cartToggleBtn = document.querySelector('.shopping-cart')
const cartContainer = document.getElementById('cart')

cartToggleBtn.addEventListener('click' , () => cartContainer.classList.toggle('show'))

// // Adding Items to cart 

const itemContainer = document.querySelector('.item-container')
const cartTotal = document.getElementById('cart-total-amount')
const cartTotal2 = document.getElementById('price')
const noOfItemsInCart = document.querySelector('.no-of-items-in-cart')

let cart = loadCart()


function addToCart(id){
    let product = products.find(product => id === product.id) 
    let duplicateItem = cart.find(product => product.id === id)
    if(duplicateItem){
        duplicateItem.quantity++
    }else{
        cart.push({id : id , quantity : 1 , price : product.price , name : product.name })
        cart
    }
    updateCart()
    saveCart()
    showHideCart()
}

function saveCart(){
    localStorage.setItem('cart' , JSON.stringify(cart))
}
function loadCart(){
    const cart =  localStorage.getItem('cart')
    return JSON.parse(cart) || []
}

function showHideCart(){
    if(cart.length !== 0){
        cartToggleBtn.classList.remove('hide')
        updateCart()
    }else{
        cartToggleBtn.classList.add('hide')
        cartContainer.classList.remove('show')
    }
}
showHideCart()



function updateCart(){
    itemContainer.innerHTML = ''
    noOfItemsInCart.innerText = cart.length
    const total = cart.reduce((sum , entry) => {
        return sum + entry.price * entry.quantity
    } , 0)
    
    cartTotal.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${total}`
    cartTotal2.innerText = total
    
    cart.forEach(cartItem => {
        const Item = document.createElement('div')
            Item.classList.add('items')
            Item.innerHTML = `
            <div class="img-container">
                <img src="Images/${cartItem.name}.webp" alt="">
            </div>
            <div class="cart-info">
                <h2>${cartItem.name}</h2>
                <div id="amount"><i class="fa-solid fa-indian-rupee-sign"></i>${cartItem.price * cartItem.quantity}</div>
                <div class="no-of-items"> <i class="fa-solid fa-xmark"></i> <span id="number">${cartItem.quantity}</span></div>
            </div>
            <i class="fa-solid fa-xmark" id="remove-item-from-cart" onclick="removeItemsFromCart(${cartItem.id})"></i>
        `
            itemContainer.appendChild(Item)
    })
}

function removeItemsFromCart(id){
   cart = cart.filter(item => item.id !== id)
   updateCart()
   saveCart()
   showHideCart()
}

// Adding Items To WishList 

const tableBody = document.getElementById('wish-list-items')
const emptyCartMsg = document.getElementById('Enpty-Wishlist')
const wishListItems = document.getElementById('wishList-items')

const itemAddedMsg = document.getElementById('item-added')
const itemAlreadyExistMsg = document.getElementById('item-exist')
let wishList = loadWishList()

function addToWishList(id){
    let product  = products.find(product => product.id == id)
    let duplicateItem = wishList.find(item => item.id == id)
    if(!duplicateItem){
        wishList.push({ id : id , name : product.name , price : product.price})
        itemAddedMsg.classList.add('show')
        setTimeout(() => {
            itemAddedMsg.classList.remove('show')
        }, 1500);
    }else{
        itemAlreadyExistMsg.classList.add('show')
        setTimeout(() => {
            itemAlreadyExistMsg.classList.remove('show')
        }, 1500);
    }
    saveWishList()
    updateWishList()
    toggleWishListTable()
}



function saveWishList(){
    localStorage.setItem('wishlist' , JSON.stringify(wishList))
}
function loadWishList(){
    const wishList  = localStorage.getItem('wishlist')
    return JSON.parse(wishList) || []
}
function toggleWishListTable(){
    if(emptyCartMsg !== null){
    if(wishList.length === 0){
            emptyCartMsg.classList.remove('hide')
            wishListItems.classList.add('hide')
        }else{
            emptyCartMsg.classList.add('hide')
            wishListItems.classList.remove('hide')    
    }
    }
}
toggleWishListTable()


function updateWishList(){
    if(tableBody !== null){
        tableBody.innerHTML = ''
    }
    wishList.forEach(item => {
        const tableRow = document.createElement('tr')

        tableRow.innerHTML = `
            <td class="img-container">
                <img src="Images/${item.name}.webp" alt="${item.name}">
            </td>
            <td>${item.name}</td>
            <td><i class="fa-solid fa-indian-rupee-sign">${item.price}</td>
            <td>
            <button class="add-to-cart btn" onclick="addToCart(${item.id})"><i class="fa-solid fa-cart-plus"></i></button>
            </td>
            <td>
            <i class="fa-solid fa-xmark" id="remove-item-from-cart" onclick="removeItemsFromWishList(${item.id})"></i>
            </td>`
            if(tableBody !== null){
                tableBody.appendChild(tableRow)
            }
    })
}

function removeItemsFromWishList(id){
    wishList = wishList.filter(item => item.id != id)
    updateWishList()
    saveWishList()
    toggleWishListTable()
}
updateWishList()

// Toggle Password Show and Hide 

const showPasswordBtn = document.getElementById('show-password-eye-2')
const passwordSignUp = document.getElementById('password2')

const showConfirmPasswordBtn = document.getElementById('show-conf-password-eye')
const confirmPasswordSignup = document.getElementById('con-password')


const showPasswordBtnSignIn = document.getElementById('show-password-eye')
const PasswordSignIn = document.getElementById('password1')

showPasswordBtn.addEventListener('click' , () => {
    if(passwordSignUp.type == 'password'){
        passwordSignUp.type = 'text'
        showPasswordBtn.classList.replace('fa-eye' , "fa-eye-slash") 
    }else{
        passwordSignUp.type = 'password'
        showPasswordBtn.classList.replace('fa-eye-slash' , "fa-eye") 
    }
})

showConfirmPasswordBtn.addEventListener('click' , () => {
    if(confirmPasswordSignup.type == 'password'){
        confirmPasswordSignup.type = 'text'
        showConfirmPasswordBtn.classList.replace('fa-eye' , "fa-eye-slash") 
    }else{
        confirmPasswordSignup.type = 'password'
        showConfirmPasswordBtn.classList.replace('fa-eye-slash' , "fa-eye") 
    }
})

showPasswordBtnSignIn.addEventListener('click' , () => {
    if(PasswordSignIn.type == 'password'){
        PasswordSignIn.type = 'text'
        showPasswordBtnSignIn.classList.replace('fa-eye' , "fa-eye-slash") 
    }else{
        PasswordSignIn.type = 'password'
        showPasswordBtnSignIn.classList.replace('fa-eye-slash' , "fa-eye") 
    }
})

// Handle Form Submit 

// SignUp Elements

const fullName = document.getElementById('name1')
const email = document.getElementById('email2')

const passLengthEl = document.getElementById('password-length')
const passMatchEl = document.getElementById('password-match')

const loginFirstEl = document.getElementById('login-first')
const accountDetailsEl = document.getElementById('account-info')
const accountDetailsEl2 = document.getElementById('menu-account')

// Handle Signup first Error
const loginFirstMsgPopup = document.querySelector('.login-first-msg-popup')

const FormDetails = loadFormDetails()

function saveFormDetails(){
    localStorage.setItem('form' ,JSON.stringify(FormDetails) )
}

function hideSignUpBtn(){
    const userName = document.getElementById('user-name')
    const userName2 = document.getElementById('user-name-menu')
    if(FormDetails.length > 0){
        loginModalToggleBtn.classList.add('hide')
        loginFirstEl.classList.add('hide')
        accountDetailsEl.classList.remove('hide')
        accountDetailsEl2.classList.remove('hide')
        userDetailsLogin()   
    }
function userDetailsLogin(){
    FormDetails.map(info => {
        userName.innerText = info.name
        userName2.innerText = info.name
    })
}
}

hideSignUpBtn()

function loadFormDetails(){
    const FormDetails = localStorage.getItem('form')
    return JSON.parse(FormDetails) || []

}

SignUpForm.addEventListener('submit' , (e) => {
    const errors = []
    // Check if password length is small
    if(passwordSignUp.value.length < 8){
        errors.push('error1')
        passLengthEl.classList.remove('hide')
        setTimeout(() => {
             passLengthEl.classList.add('hide')  
        }, 3000);
    }
    // Check if password and confirm Password Matches
    if(passwordSignUp.value !== confirmPasswordSignup.value){
        passMatchEl.classList.remove('hide')
        setTimeout(() => {
             passMatchEl.classList.add('hide')  
        }, 3000);
        errors.push('error2')
    }   
    if(errors.length > 0){
        e.preventDefault()
        FormDetails = []
    }else{
        FormDetails.push({name : fullName.value ,email : email.value , password : passwordSignUp })
        saveFormDetails() 
    }
})


// Handle Logout Btn

const logoutBtn = document.querySelectorAll('#logout-button')

logoutBtn.forEach(btn => {
    btn.addEventListener('click' , () => {
        localStorage.removeItem('form')
        localStorage.removeItem('wishlist')
        localStorage.removeItem('cart')
        localStorage.removeItem('image')

        window.location.reload()
    })
})


// Sign In Form 

SignInForm.addEventListener('submit' , e => {
    e.preventDefault()
    loginFirstMsgPopup.classList.remove('hide')
    setTimeout(() => {
        loginFirstMsgPopup.classList.add('hide')
    }, 3000);
})


// Handle Upload Image 
 
const fileSelector = document.querySelectorAll('#file')
const imgBox = document.querySelectorAll('#ImageBox')
let imgBoxArray = Array.from(imgBox)

let image = loadImage()


fileSelector.forEach(file => {
    file.addEventListener('change' , () => {

    const imageUrl = file.files[0];

        if(imageUrl){
            const reader = new FileReader();
            reader.addEventListener('load' , () =>{
               image =  imgBoxArray.map(img => {
                    img.setAttribute('src' , reader.result)
                    return reader.result
                })
                saveImage()
            })
            reader.readAsDataURL(imageUrl)
        }
    })
})


function saveImage(){
    localStorage.setItem('image' , JSON.stringify(image))
    console.log(image)
}

function loadImage(){
    const image = localStorage.getItem('image')
    return JSON.parse(image) || []
    
}

function setImage(){
    imgBox.forEach(img => {
        img.setAttribute('src' , image[0])
    })
}
setImage()