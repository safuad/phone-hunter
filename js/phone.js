const loadPhone = async (searchText=13,isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;  
    // console.log(data)
    displayPhone(phones,isShowAll)
}

const displayPhone = (phones,isShowAll) =>{
    // console.log(phones)
    const phoneContainer =  document.getElementById('phone-container')
    phoneContainer.textContent = ''
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }
    
    // console.log('is shoe all',isShowAll)
    if(!isShowAll){
        phones = phones.slice(0,12)
    }

    phones.forEach(phone => {
        // console.log(phone)
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h5 class="card-title text-3xl ">${phone.brand}</h5>
          <p class = "text-lg">${phone.phone_name}</p>
          <div class="card-actions justify-center">
            <button onclick="handelShowDetail('${phone.slug}');" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard)
    });
    toggleLoadingSpinner(false)
}

const handelShowDetail = async (id) =>{
    // console.log('clicked',id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data

    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
    const phoneName = document.getElementById('show-detail-phone-name')
    phoneName.innerText = phone.name

    const showDetailContainer = document.getElementById('show-details-container')
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt=""/>
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>GPS:</span>${phone?.others?.GPS}</p>
    `
    console.log(phone)
    show_details_modal.showModal()
}

// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true)
    const searchFiled = document.getElementById('search-field')
    const searchText = searchFiled.value;
    console.log(searchText)
    loadPhone(searchText,isShowAll)

}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    }
}
const handelShowAll = () =>{
    handleSearch(true)
}
loadPhone()