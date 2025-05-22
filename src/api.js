console.log("connected to api.js");

const loadData = async () => {
    try {
        const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        const posts = data.posts;

        renderCards(posts);
        
    } catch (error) {
        console.error("Error loading data:", error);
    }
};

const renderCards = (posts) => {
    const cardContainer = document.getElementById("card-container");

    const titleContainer = document.getElementById("title-list");
    const markAsRead = document.getElementById("mark-id");

    if (!cardContainer) {
        console.error("card-container not found");
        return;
    }

    posts.forEach(post => {
        const cardDiv = document.createElement("div");
        cardDiv.className = 'bg-[#F3F3F5] p-6 rounded-2xl shadow-md hover:bg-indigo-50';

        const isActive = post.isActive;
        const statusDotClass = isActive ? 'bg-green-500' : 'bg-red-500';

        cardDiv.innerHTML = `
        <div class="flex gap-4">
            <!-- Avatar/Icon -->
            <div class="relative w-12 h-12 rounded-md flex-shrink-0">
                <img src="${post.image}" alt="Avatar" class="w-full h-full rounded-md object-cover">
                <span class="absolute top-0 right-0 w-3 h-3 ${statusDotClass} rounded-full border-2 border-white"></span>
            </div>

            <div class="flex-1">
                <!-- Tags -->
                <div class="text-sm text-gray-500 space-x-4 mb-1">
                    <span># ${post.category}</span>
                    <span>Author: ${post.author?.name || "Unknown"}</span>
                </div>

                <!-- Title -->
                <h2 class="text-lg font-bold text-gray-800">${post.title}</h2>

                <!-- Description -->
                <p class="text-gray-600 text-sm mt-1">${post.description}</p>

                <hr class="my-3 border-dashed border-gray-300">

                <!-- Stats -->
                <div class="flex items-center justify-between text-gray-500 text-sm">
                    <div class="flex gap-4">
                        <div class="flex items-center gap-1">
                            <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                                <path d="M9.333 10.5H18.667M9.333 15.167H16.333M10.5 21H7a4.5 4.5 0 01-4.5-4.5V8.167A4.5 4.5 0 017 3.667h14a4.5 4.5 0 014.5 4.5V16.5a4.5 4.5 0 01-4.5 4.5H17.5L14 24.5 10.5 21z"
                                    stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <span>${post.comment_count}</span>
                        </div>

                        <div class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M11.6667 14C11.6667 14.6188 11.9125 15.2123 12.3501 15.6499C12.7877 16.0875 13.3812 16.3333 14 16.3333C14.6188 16.3333 15.2123 16.0875 15.6499 15.6499C16.0875 15.2123 16.3333 14.6188 16.3333 14C16.3333 13.3812 16.0875 12.7877 15.6499 12.3501C15.2123 11.9125 14.6188 11.6667 14 11.6667C13.3812 11.6667 12.7877 11.9125 12.3501 12.3501C11.9125 12.7877 11.6667 13.3812 11.6667 14Z" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24.5 14C21.7 18.6667 18.2 21 14 21C9.8 21 6.3 18.6667 3.5 14C6.3 9.33333 9.8 7 14 7C18.2 7 21.7 9.33333 24.5 14Z" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                            <span>${post.view_count}</span>
                        </div>

                        <div class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M9.91667 14H14V8.16667M3.5 14C3.5 15.3789 3.77159 16.7443 4.29926 18.0182C4.82694 19.2921 5.60036 20.4496 6.57538 21.4246C7.55039 22.3996 8.70791 23.1731 9.98182 23.7007C11.2557 24.2284 12.6211 24.5 14 24.5C15.3789 24.5 16.7443 24.2284 18.0182 23.7007C19.2921 23.1731 20.4496 22.3996 21.4246 21.4246C22.3996 20.4496 23.1731 19.2921 23.7007 18.0182C24.2284 16.7443 24.5 15.3789 24.5 14C24.5 12.6211 24.2284 11.2557 23.7007 9.98182C23.1731 8.70791 22.3996 7.55039 21.4246 6.57538C20.4496 5.60036 19.2921 4.82694 18.0182 4.29927C16.7443 3.77159 15.3789 3.5 14 3.5C12.6211 3.5 11.2557 3.77159 9.98182 4.29927C8.70791 4.82694 7.55039 5.60036 6.57538 6.57538C5.60036 7.55039 4.82694 8.70791 4.29926 9.98182C3.77159 11.2557 3.5 12.6211 3.5 14Z" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                            <span>${post.posted_time}</span>
                        </div>
                    </div>

                    <!-- Envelope Icon -->
                    <div class="text-green-500 cursor-pointer envelope-icon">
                        <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                            <path d="M14 0C6.268 0 0 6.268 0 14s6.268 14 14 14 14-6.268 14-14S21.732 0 14 0zm0 4.917L22.285 10.083H5.715L14 4.917zM22.388 18.333c0 .829-.672 1.5-1.501 1.5H7.113a1.5 1.5 0 01-1.5-1.5v-7.92L14 15.219l7.888-4.806v7.92z"
                                fill="#10B981" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        `;

        const envelopeIcon = cardDiv.querySelector('.envelope-icon');
        envelopeIcon.addEventListener('click',() =>{

              // Check if a card for this title already exists
    const existing = [...titleContainer.children].find(child =>
        child.textContent.includes(post.title)
    );
    if (existing) return; // Do not add again


        const currentCount = parseInt(markAsRead.innerText, 10);
    markAsRead.innerText = currentCount + 1;


            // Create a new mini card


            const miniCard = document.createElement('div');
            miniCard.className = "bg-white rounded-lg p-4 shadow flex justify-between items-center";
            miniCard.innerHTML =`
             <p class="text-sm text-gray-800 font-medium leading-tight">${post.title}</p>
            <div class="flex items-center space-x-1">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
                </svg>
                <span class="text-sm text-gray-600">${post.view_count}</span>
            </div>
            `;

            titleContainer.appendChild(miniCard);


            



        })

        cardContainer.appendChild(cardDiv);
    });
    latestPosts();
};
// Call the loadData function to fetch and display the posts
loadData();



const latestPosts = async () => {
    const latestPostsData = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
const  posts = await latestPostsData.json();


posts.forEach(post => {
    console.log(post);
    const latestPostContainer = document.getElementById("latest-post-container");

    const latestPostDiv = document.createElement("div");
    latestPostDiv.className = 'card w-80 border border-[#12132D26] p-6 rounded-3xl';
    latestPostDiv.innerHTML =`
    <figure class="bg-gray-100 h-40 w-full flex items-center justify-center rounded-2xl">
    <img src="${post.cover_image}" alt="">
  </figure>
  <div class="card-body">
    <div class="text-sm text-gray-500 flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_29_1881)">
    <path d="M4 7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7Z" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 3V7" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 3V7" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 11H20" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16Z" stroke="#12132D" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_29_1881">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
      <span>${post.author?.posted_date || "No publish date"}</span>
     
    </div>

    <h2 class="card-title text-lg leading-snug">
      ${post.title}
    </h2>
    <p class="text-sm text-gray-600">
      ${post.description}
    </p>

    <div class="flex items-center gap-3 mt-4">
      <div class="avatar">
        <div class="w-10 h-10 rounded-full">

        <img src="${post.profile_image}" alt="">
         
        </div>
      </div>
      <div>
        <p class="font-medium text-gray-800 leading-none">${post.author.name}</p>
       <p class="text-xs text-gray-500">${post.author?.designation || "Unknown"}</p>
      </div>
    </div>
  </div>
    `

    latestPostContainer.appendChild(latestPostDiv);
})

}




