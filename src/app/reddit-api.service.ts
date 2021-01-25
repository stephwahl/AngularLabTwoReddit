import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface RedditPost {
  title: string; // title of post
  link: string; // outbound link to the post on reddit
  image: string; // thumbnail
};

@Injectable({
  providedIn: "root",
})
export class RedditApiService {
  // inject HTTP Client here
  posts: RedditPost[] = [];

  constructor(private http: HttpClient) {}

  getPosts() {
    const url = "https://www.reddit.com/r/aww/.json";
    this.http.get(url).subscribe(
      (resp: any) => {
        const posts = resp.data.children;

        for (let post of posts) {
          const redditPost : RedditPost = {
            title: post.data.title,
            link: "https://reddit.com" + post.data.permalink,
            image: post.data.thumbnail
          };

          this.posts.push(redditPost);

        }

        console.log(this.posts);
  
      }, // this is what happens on success
      (error) => {
        console.log(error);
      } // this is what happens if I get an error from the API
    );
    // array of posts exists in response.data.children
    // loop through array
    // for each post
    // data lives in post.data
  }
}