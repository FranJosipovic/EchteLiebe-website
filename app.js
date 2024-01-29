const menuToggler = document.querySelector("#menu-toggler");
const mobileContent = document.querySelector("#mobile-menu");
menuToggler.addEventListener("click", function () {
  mobileContent.classList.toggle("hidden");
});

const infoSection = document.querySelector(".container-content");
const newsSection = document.querySelector(".container-content-news");
const chantsSection = document.querySelector(".container-content-chants");

const infoNavItem = document.querySelectorAll(".menu-item")[0];
const newsNavItem = document.querySelectorAll(".menu-item")[1];
const chantsNavItem = document.querySelectorAll(".menu-item")[2];
const infoNavItem2 = document.querySelectorAll(".menu-item")[3];
const newsNavItem2 = document.querySelectorAll(".menu-item")[4];
const chantsNavItem2 = document.querySelectorAll(".menu-item")[5];
// Add click event listeners to the navigation items
infoNavItem.addEventListener("click", () => {
  infoSection.scrollIntoView({ behavior: "smooth" });
});

newsNavItem.addEventListener("click", () => {
  newsSection.scrollIntoView({ behavior: "smooth" });
});

chantsNavItem.addEventListener("click", () => {
  chantsSection.scrollIntoView({ behavior: "smooth" });
});
infoNavItem2.addEventListener("click", () => {
  infoSection.scrollIntoView({ behavior: "smooth" });
});

newsNavItem2.addEventListener("click", () => {
  newsSection.scrollIntoView({ behavior: "smooth" });
});

chantsNavItem2.addEventListener("click", () => {
  chantsSection.scrollIntoView({ behavior: "smooth" });
});

const albumTrackId = "3tcHT8rV6NYBjHErOhTV8m";
const albumTrackMarket = "HR";

const params = new URLSearchParams();
params.append("grant_type", "client_credentials");
params.append("client_id", "ba1b1c5caa3847e79629d0724e4edb2b");
params.append("client_secret", "aa55a23cdd704c3cbd9ae8b5a538b227");

async function getTracks() {
  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const tokenData = await tokenResponse.json();
    const token = tokenData.access_token;

    const trackResponse = await fetch(
      `https://api.spotify.com/v1/albums/${albumTrackId}?market=${albumTrackMarket}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const trackData = await trackResponse.json();
    console.log(trackData);
    const tracks = trackData.tracks.items.map((item) => ({
      preview_url: item.preview_url,
      name: item.name,
      artist: item.artists[0].name,
    }));

    return { items: tracks, image: trackData.images[0].url };
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
}

getTracks().then((data) => {
  console.log(data);
  const chantsContainer = document.getElementById("chants-container");

  data.items.forEach((chant) => {
    const chantCard = document.createElement("div");
    chantCard.classList.add("chant-card");

    const chantImg = document.createElement("img");
    chantImg.setAttribute("src", data.image);
    chantImg.setAttribute("height", "125px");

    const cardArtistName = document.createElement("div");
    cardArtistName.classList.add("card-artist-name");
    cardArtistName.innerHTML = `
            <p>${chant.artist}</p>
            <h6>${chant.name}</h6>
          `;

    const audio = document.createElement("audio");
    audio.setAttribute("controls", "");
    const source = document.createElement("source");
    source.setAttribute("src", chant.preview_url);
    audio.appendChild(source);

    chantCard.appendChild(chantImg);
    chantCard.appendChild(cardArtistName);
    chantCard.appendChild(audio);

    chantsContainer.appendChild(chantCard);
  });
});
