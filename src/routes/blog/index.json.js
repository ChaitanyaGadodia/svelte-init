import posts from "./_posts.js";

const contents = JSON.stringify(
  posts.map(post => {
    return {
      title: post.title,
      slug: post.slug
    };
  })
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function get(res) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(contents);
}
