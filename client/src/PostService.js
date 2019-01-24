import axios from 'axios'

const url = 'api/posts';

class PostService {
    // GET posts
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: post.createdAt
                    }))
                )
            } catch (e) {
                reject(e);
            }
        });
    }

    // POST posts
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }

    // DELETE posts
    static deletePost(id) {
        return axios.delete(`${url}/${id}`);
    }
}

// LOOK INTO THIS
export default PostService;