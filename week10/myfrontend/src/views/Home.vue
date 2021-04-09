<template>
  <div class="container is-widescreen">
    <section class="hero">
      <div class="hero-body">
        <p class="title">My Stories</p>
      </div>
    </section>
    <section class="section" id="app">
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-3" v-for="blog in blogs" :key="blog.id">
            <div class="card">
              <div class="card-image pt-5">
                <figure class="image">
                  <img
                    style="height: 120px"
                    :src="blog.file_path"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="title">{{ blog.title }}</div>
                <div class="content">{{ blog.content }}</div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item" @click="redirect('detail/'+blog.id)">Read more...</a>
                <a class="card-footer-item" @click="addlike(blog.id)">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="far fa-heart"></i>
                    </span>
                    <span>Like {{blog.like}}</span>
                  </span>
                </a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      blogs: null,
    };
  },
  methods:{
    redirect(path) {
      console.log("redirect to : ", path);
      this.$router.push(`/${path}`);
    },
    addlike(id){
      axios
        .post("http://localhost:3000/blogs/addlike/"+id)
        .then((response) => {
          console.log(response)
          for(var blog of this.blogs){
            if(blog.id == id){
              this.blogs.like = blog.like++
            }
          }
        })
        .catch((err) =>{
          console.log(err);
        })
    
    }
  },
  created() {
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        this.blogs = response.data;
        console.log(this.blogs);
        for(var image of this.blogs){
          image.file_path = "http://localhost:3000/static/" + image.file_path
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
</style>