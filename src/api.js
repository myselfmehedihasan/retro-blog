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
                    <div class="text-green-500">
                        <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                            <path d="M14 0C6.268 0 0 6.268 0 14s6.268 14 14 14 14-6.268 14-14S21.732 0 14 0zm0 4.917L22.285 10.083H5.715L14 4.917zM22.388 18.333c0 .829-.672 1.5-1.501 1.5H7.113a1.5 1.5 0 01-1.5-1.5v-7.92L14 15.219l7.888-4.806v7.92z"
                                fill="#10B981" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        `;

        cardContainer.appendChild(cardDiv);
    });
};



loadData();
