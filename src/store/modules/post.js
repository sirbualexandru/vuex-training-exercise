export default {
  actions: {
    async fetchPosts({ commit, getters, dispatch }, limit = 3) {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=' + limit
      )
      const posts = await res.json()

      dispatch('sayHello')

      commit('updatePosts', posts)
    },
    sayHello() {
      console.log('sayHello');
    },
    deletePost({commit}, postId) {
      console.log(postId);
      commit('deletePost', postId);
    }
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts
    },
    createPost(state, newPost) {
      state.posts.unshift(newPost)
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter(post => {
        return post.id !== postId
      });

    }
  },
  state: {
    posts: []
  },
  getters: {
    validPosts(state) {
      return state.posts.filter(post => {
        return post.title && post.body
      })
    },
    postsCount(state, getters) {
      return getters.validPosts.length
    }
  }
}
