import { URL } from "./const.js";
import sendRequest from "./helper/sendRequest.js";

async function checkAuthStatus() {
  try {
    const { token } = await chrome.storage.local.get("token");
    return token ? true : false;
  } catch (error) {
    console.error("Error checking auth status:", error);
    return false;
  }
}

function renderLoginView() {
  return `
    <div class="heading-container">
      <img src="./public/brain.png" class="image" />
      <h1 id="heading">Bookmarq</h1>
    </div>
    <div class="button-container">
      <a class="signin-button" target="_blank" href="${URL}/auth/extension">
        <span class="button-text">Sign In</span>
      </a>
      <a href="${URL}/auth/signup" target="_blank" class="create-account-button">
        <span class="button-text">Create Account</span>
      </a>
    </div>
  `;
}

const NAVIGATION_LINKS = [
  {
    href: `${URL}/app/tweets`,
    icon: "./public/tweets.svg",
    label: "tweets",
  },
  {
    href: `${URL}/app/links`,
    icon: "./public/url.svg",
    label: "links",
  },
  {
    href: `${URL}/app/videos`,
    icon: "./public/film.svg",
    label: "videos",
  },
  {
    href: `${URL}/app/documents`,
    icon: "./public/document.svg",
    label: "documents",
  },
];

function renderNavigationLinks() {
  return NAVIGATION_LINKS.map(
    (link) => `
    <a  class="link" data-type="${link.label}">
      <img class="logo" src="${link.icon}" />
      <span class="tag-name">${link.label}</span>
    </a>
  `
  ).join("");
}

function renderMainView() {
  return `
    <div class="heading-container">
      <div class="logo-container">
        <img src="./public/brain.png" class="image" />
        <h1 id="heading">Bookmarq</h1>
      </div>
      <button class="logout-button" title="Logout">
        <img src="./public/logout.svg" alt="Logout" class="logout-icon" />
      </button>
    </div>
    <div class="input-container">
      <div class="input-wrapper">
        <img src="/public/url.svg" alt="URL" class="url-icon" />
        <input class="url-input" type="text" placeholder="Enter URL here..." />
      </div>
    </div>
    <div class="tag-container">
      ${renderNavigationLinks()}
    </div>
  `;
}

async function getCurrentTabInfo() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "getCurrentTab" }, (response) => {
      resolve(response);
    });
  });
}

function renderSuccess() {
  const urlInput = document.querySelector(".url-input");
  urlInput.value = "";
  // Create success element
  const successHTML = `
    <div class="success-overlay">
      <div class="success-container">
        <img src="./public/checked-circle.svg" class="success-icon" alt="Success" />
        <p class="success-message">Successfully Saved!</p>
      </div>
    </div>
  `;

  // Add to app container
  const app = document.getElementById("app");
  app.insertAdjacentHTML("beforeend", successHTML);

  // Auto remove after delay
  setTimeout(() => {
    const successOverlay = document.querySelector(".success-overlay");
    if (successOverlay) {
      successOverlay.style.animation = "fadeOut 0.3s ease forwards";
      successOverlay.addEventListener("animationend", () => {
        successOverlay.remove();
      });
    }
  }, 2000);
}

async function init() {
  const app = document.getElementById("app");
  const isAuthenticated = await checkAuthStatus();
  console.log("auth", isAuthenticated);
  app.innerHTML = isAuthenticated ? renderMainView() : renderLoginView();

  if (!isAuthenticated) {
    app.classList.add("login-container");
  } else {
    app.classList.remove("login-container");

    // Add logout button functionality
    const logoutButton = document.querySelector(".logout-button");
    if (logoutButton) {
      logoutButton.addEventListener("click", async () => {
        await chrome.storage.local.remove("token");
        console.log("Logged out");
        location.reload(); // Reload the popup to show the login view
      });
    }

    const tabInfo = await getCurrentTabInfo();
    if (tabInfo?.url) {
      const urlInput = document.querySelector(".url-input");
      if (urlInput) {
        urlInput.value = tabInfo.url;
      }
    }

    const tagContainer = document.querySelector(".tag-container");
    async function handleClick(e) {
      const link = tabInfo.url;
      const linkElement = e.target.closest(".link");
      const type = linkElement.dataset.type;
      const { success } = await sendRequest(type, link);
      if (success) {
        renderSuccess();
      }
    }
    tagContainer.addEventListener("click", handleClick);
  }

  // Add event listeners for URL input if authenticated
  if (isAuthenticated) {
    const urlInput = document.querySelector(".url-input");
    if (urlInput) {
      urlInput.addEventListener("change", (e) => {
        console.log("URL changed:", e.target.value);
        // Add your URL handling logic here
      });
    }
  }
}

// Initialize the popup
document.addEventListener("DOMContentLoaded", init);
