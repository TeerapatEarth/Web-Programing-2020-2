<template>
  <div class="container is-widescreen">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">{{ error }}</div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <p class="title">{{ blog.title }}</p>
      </div>
    </section>
    <section class="section">
      <div class="content" :key="reset">
        <div class="card has-background-light">
          <div class="card-image pt-5">
            <div class="columns">
              <div v-for="image in images" :key="image.id" class="column">
                <figure class="image">
                  <img
                    :src="'http://localhost:3000'+image.file_path"
                    alt="Placeholder image"
                    style="height: 500px; object-fit: cover;"
                  />
                </figure>
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="content">{{ blog.content }}</div>
            <div class="container pb-3">
              <p class="subtitle">Comments</p>
              <div class="columns">
                <div class="column is-8">
                  <input type="text" class="input" v-model="commTxt" placeholder="Add new comment" />
                </div>
                <div class="column is-4">
                  <button @click="addComment" class="button">Add comment</button>
                </div>
              </div>
            </div>
            <div v-for="(comment, index) in comments" :key="comment.id" class="box">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p v-if="toggleInput[index] == 0">{{ comment.comment }}</p>
                    <input class="input" v-model="editInput[index]" v-else>
                    <p class="is-size-7">{{ comment.comment_date }}</p>
                  </div>
                  <nav class="level">
                    <div class="level-left" @click="addlike(comment.id)">
                      <a class="level-item" aria-label="like">
                        <span class="icon is-small pr-3">
                          <i class="fas fa-heart" aria-hidden="true"></i>
                        </span>
                        Like ({{comment.like}})
                      </a>
                    </div>
                    <div class="level-right">
                      <div class="level-item">
                        <button class="button is-warning" @click="editComment(index)" v-if="toggleedit[index] == 0">
                          <span>Edit</span>
                          <span class="icon is-small">
                            <i class="fas fa-edit"></i>
                          </span>
                        </button>
                        <button class="button is-success" v-else @click="saveChange(comment.id, index)">
                          <span>save</span>
                          <span class="icon is-small">
                            <i class="fas fa-edit"></i>
                          </span>
                        </button>
                      </div>
                      <div class="level-item">
                        <button class="button is-danger is-outlined" @click="deleteComment(comment.id, index)" v-if="toggleedit[index] == 0">
                          <span>Delete</span>
                          <span class="icon is-small">
                            <i class="fas fa-times"></i>
                          </span>
                        </button>
                        <button class="button is-link is-outlined" v-else @click="cancleEdit(index)">
                          <span>Cancle</span>
                          <span class="icon is-small">
                            <i class="fas fa-times"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                  </nav>
                </div>
              </article>
            </div>
          </div>
          <footer class="card-footer">
            <router-link class="card-footer-item" to="/">To Home Page</router-link>
            <a class="card-footer-item" @click="deleteBlog">
              <span>Delete this blog</span>
            </a>
          </footer>
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
      blog: {},
      comments: [],
      images: [],
      error: null,
      commTxt: "",
      editToggle: -1,
      editCommentMessage: "",
      toggleedit:[],
      editInput:[],
      toggleInput:[],
      defaultTitle: [],
      reset: 0
    };
  },
  mounted() {
    this.getBlogDetail(this.$route.params.id);
  },
  methods: {
    getBlogDetail(blogId) {
      axios
        .get(`http://localhost:3000/blogs/${blogId}`)
        .then((response) => {
          this.blog = response.data.blog;
          this.images = response.data.images;
          this.comments = response.data.comments;
          for(var i of this.comments){
            this.toggleedit.push(0)
            this.toggleInput.push(0)
            this.defaultTitle.push(i.comment)
            this.editInput.push(i.comment)
          }
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    addComment() {
      axios
        .post(`http://localhost:3000/${this.blog.id}/comments`, {
          comment: this.commTxt,
        })
        .then((response) => {
          this.commTxt = ''
          this.comments.push(response.data);
          this.toggleedit.push(0)
          this.toggleInput.push(0)
          this.editInput.push(this.comments.comment)
          this.defaultTitle.push(this.comments.comment)
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    saveEditComment() {},
    deleteBlog() {
      const result = confirm(`Are you sure you want to delete \'${this.blog.title}\'`);
      if (result){
        axios
        .delete(`http://localhost:3000/blogs/${this.blog.id}`)
        .then((response) => {
          this.$router.push('/')
        })
        .catch((error) => {
          alert(error.response.data.message)
        });
      }
    },
    addlike(commentId){
      axios
        .put(`http://localhost:3000/comments/addlike/${commentId}`)
        .then((response) => {
          let selectedComment = this.comments.filter(e => e.id === commentId)[0]
          selectedComment.like = response.data.like;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteComment(commentId, index){
      let result = confirm("Are u sure?")
      console.log(index)
      if (result) {
        axios
        .delete(`http://localhost:3000/comments/${commentId}`)
        .then(res => {
          this.comments.splice(index, 1)
          this.toggleedit.splice(index, 1)
        })
      }
    },
    editComment(index){
      this.toggleedit[index] ++
      this.toggleInput[index] ++
      this.reset++
    },
    cancleEdit(index){
      this.toggleedit[index] --
      this.toggleInput[index] --
      this.editInput[index] = this.defaultTitle[index]
      this.reset++
    },
    saveChange(commentId, index){
      console.log(this.editInput[index])
      axios
        .put(`http://localhost:3000/comments/${commentId}`, {
          editcomment: this.editInput[index],
        })
        .then((response) => {
          console.log(response)
          this.toggleedit[index] --
          this.toggleInput[index] --
          this.reset++
          this.defaultTitle[index] = this.editInput[index]
          this.comments[index].comment = this.defaultTitle[index]
        })
        .catch((error) => {
          this.error = error.response.data.message;
          console.log("แตกก")
        });
    }
  },
};
</script>