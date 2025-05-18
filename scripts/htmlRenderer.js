import { URL } from "./const";

const afterLogin=`
<div class="heading-container">
        <img
          src="./public/Logo.svg"
          class="image" />
        <h1 id="heading">Linkcaddy</h1>
      </div>
      <div class="input-container">
        <div class="input-wrapper">
          <img
            src="/public/url.svg"
            alt="URL"
            class="url-icon" />
          <input
            class="url-input"
            type="text"
            placeholder="Enter URL here..." />
        </div>
      </div>
      <div class="tag-container">
        <a
          target="_blank"
          class="link"
          href="${URL}/app/tweets">
          <img
            class="logo"
            src="./public/tweets.svg" />
          <span class="tag-name">Tweets</span>
        </a>
        <a
          target="_blank"
          class="link"
          href="${URL}/app/links">
          <img
            class="logo"
            src="./public/url.svg" />
          <span class="tag-name">Links</span>
        </a>
        <a
          target="_blank"
          class="link"
          href="${URL}/app/videos">
          <img
            class="logo"
            src="./public/film.svg" />
          <span class="tag-name">Video</span>
        </a>
        <a
          target="_blank"
          class="link"
          href="${URL}/app/documents">
          <img
            class="logo"
            src="./public/document.svg" />
          <span class="tag-name">documents</span>
        </a>
      </div>`