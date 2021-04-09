<template>
  <div class="container is-widescreen">
    <div>
      <section class="hero">
        <div class="hero-body">
          <p class="title">{{ blog.title }}</p>
        </div>
      </section>
      <section class="section" id="app">
        <div class="content">
          <div class="card has-background-light">
            <div class="card-image pt-5">
              <div class="columns">
                <div class="column">
                  <figure class="image">
                    <img
                      src="https://bulma.io/images/placeholders/480x480.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="column">
                  <figure class="image">
                    <img
                      src="https://bulma.io/images/placeholders/480x480.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="column">
                  <figure class="image">
                    <img
                      src="https://bulma.io/images/placeholders/480x480.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="column">
                  <figure class="image">
                    <img
                      src="https://bulma.io/images/placeholders/480x480.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
              </div>
            </div>
            <div class="card-content">
              <div class="content">{{ blog.content }}</div>
              <div class="container">
                <p class="subtitle">Comments</p>
                  <div class="box" v-for="comment in comments.comments" :key="comment.id">
                    <article class="media">
                      <div class="media-left">
                        <figure class="image is-64x64">
                          <img
                            src="https://bulma.io/images/placeholders/128x128.png"
                            alt="Image"
                          />
                        </figure>
                      </div>
                      <div class="media-content">
                        <div class="content">
                          <p>{{comment.comment}}</p>
                          <p class="is-size-7">{{comment.comment_date}}></p>
                        </div>
                        <nav class="level is-mobile">
                          <div class="level-left">
                            <a class="level-item" aria-label="like">
                              <span class="icon is-small">
                                <i class="fas fa-heart" aria-hidden="true"></i>
                              </span>
                            </a>
                          </div>
                        </nav>
                      </div>
                    </article>
                  </div>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" href="/">To Home Page</a>
            </footer>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      blog: null,
      comments: null,
    };
  },
  created() {
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        this.blog = response.data[this.$route.params.id - 1];
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:3000/blogs/"+this.$route.params.id)
      .then((response) => {
        this.comments = response.data
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
</style>