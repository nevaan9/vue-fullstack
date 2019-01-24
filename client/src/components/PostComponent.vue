<template>
  <div>
    <h1>Newsest Posts</h1>
    <!--Create Post Here-->
    <hr>
    <p v-if="error">{{`There is an error: ${error}`}}</p>
    <div style="display: inline-block;">
      <div id="post-form">
        <input id="post-value" name="post" placeholder="Submit a Post Here" v-model="text" type="text" autofocus autocomplete="off"/>
        <button v-on:click="submitPost">Send</button>
      </div>
    </div>
    <div>
      <div
              v-for="(post, index) in posts"
              :key="index"
              style="background-color: beige"
      >
        <p>{{post.text}}</p>
        <span>{{post.createdAt}}</span>
        <button
                @click="deletePost(post._id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
    import PostService from './../PostService'
    export default {
        name: 'PostComponent',
        props: {
            msg: String
        },
        data() {
            return {
                posts: [],
                error: '',
                text: ''
            }
        },
        methods: {
            async submitPost () {
                if (this.text.trim().length > 0) {
                    const text = this.text;
                    this.text = '';
                    await PostService.insertPost(text);
                    this.posts = await PostService.getPosts();
                }
            },
            async deletePost (id) {
                await PostService.deletePost(id);
                this.posts = await PostService.getPosts();
            }
        },
        async created () {
            try {
                this.posts = await PostService.getPosts();
            } catch (e) {
                this.error = e.message;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
