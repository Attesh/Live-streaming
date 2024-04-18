<template>
  <div class="packages-wrapper">
      <h2 class="package-title">Corsacaster</h2>
      <h6 class="package-subtitle">Access Premium</h6>
      <h1 class="package-heading">It’s easy to get started</h1>
      <p class="package-description">
        Choose the best plan to enjoy the best <br />
        movies and series
      </p>

      <div class="card-wrapper">
        <div class="card">
          <h2 class="card-title">Fan</h2>
          <h3 class="card-price"><span class="dollar-sign">$10</span>/Month</h3>

          <ul class="card-features">
            <li class="feature-item">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Streaming in high quality
            </li>
            <li class="feature-item">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Streaming in high quality
            </li>
            <li class="feature-item blur">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Stream on multiple devices
            </li>
            <li class="feature-item blur">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Ad-free viewing experience
            </li>
            <li class="feature-item blur">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Download to watch later
            </li>
          </ul>

          <button class="btn"><router-link :to="{ name : 'dashboard' }" style="text-decoration:none;color:white">Get Started</router-link></button>
        </div>
        <div class="card athlete">
          <h2 class="card-title">Athelete</h2>
          <h3 class="card-price"><span class="dollar-sign">$20</span>/Month</h3>

          <ul class="card-features">
            <li class="feature-item">
              <div class="img-wrapper">
                <img
                  src="@assets/tick.svg"
                  alt="Checkmark icon"
                  class="feature-icon"
                />
              </div>

              Streaming in high quality
            </li>
            <li class="feature-item">
              <div class="img-wrapper">
                <img
                  src="@assets/tick.svg"
                  alt="Checkmark icon"
                  class="feature-icon"
                />
              </div>

              With the best audio quality
            </li>
            <li class="feature-item">
              <div class="img-wrapper">
                <img
                  src="@assets/tick.svg"
                  alt="Checkmark icon"
                  class="feature-icon"
                />
              </div>

              Stream on multiple devices
            </li>
            <li class="feature-item">
              <div class="img-wrapper">
                <img
                  src="@assets/tick.svg"
                  alt="Checkmark icon"
                  class="feature-icon"
                />
              </div>

              Ad-free viewing experience
            </li>
            <li class="feature-item">
              <div class="img-wrapper">
                <img
                  src="@assets/tick.svg"
                  alt="Checkmark icon"
                  class="feature-icon"
                />
              </div>

              Ad-free viewing experience
            </li>
          </ul>

          <button class="btn"><router-link :to="{ name : 'dashboard' }" style="text-decoration:none;color:white">Get Started</router-link></button>
        </div>
        <div class="card">
          <h2 class="card-title">Corsacaster</h2>
          <h3 class="card-price"><span class="dollar-sign">$30</span>/Month</h3>

          <ul class="card-features">
            <li class="feature-item">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Streaming in high quality
            </li>
            <li class="feature-item">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Streaming in high quality
            </li>
            <li class="feature-item">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Stream on multiple devices
            </li>
            <li class="feature-item">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Ad-free viewing experience
            </li>
            <li class="feature-item">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Download to watch later
            </li>
          </ul>

          <button class="btn"><router-link :to="{ name : 'dashboard' }" style="text-decoration:none;color:white">Get Started</router-link></button>
        </div>
        <div class="card">
          <h2 class="card-title">Guest</h2>
          <h3 class="card-price"><span class="dollar-sign">$30</span>/Month</h3>

          <ul class="card-features">
            <li class="feature-item">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Streaming in high quality
            </li>
            <li class="feature-item">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Streaming in high quality
            </li>
            <li class="feature-item">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Stream on multiple devices
            </li>
            <li class="feature-item">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Ad-free viewing experience
            </li>
            <li class="feature-item">
              <img
                src="@assets/check.svg"
                alt="Checkmark icon"
                class="feature-icon"
              />
              Download to watch later
            </li>
          </ul>

          <button class="btn"><router-link :to="{ name : 'dashboard' }" style="text-decoration:none;color:white">Get Started</router-link></button>
        </div>
      </div>

      <div class="packages-footer">
        <p>Or sign up as a <span> Guest Account </span></p>
      </div>
    </div>
</template>