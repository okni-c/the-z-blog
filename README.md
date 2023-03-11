# The Z-Chronicles

This is a blog/CMS app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.
This is free to use and be repurposed to fit your needs.

## Features

- Admin panel to create blog posts, with custom WYSIWYG editor
- MongoDB Database for blog data
- NextAuth discord authentication
- Lightweight and fast CRUD operations in prod
- Dark/Light mode
- Mobile and desktop friendly
- Meets web accessibilty standards

## Areas of Improvement

- Find a way to upload and manage blog images via a CDN
- Design could be better, UX could be better
- next/Image optimization
- On initial site load, MongoDB query speed is slow, this could be because it's on the free tier

## Preview

### Desktop:
![image](https://user-images.githubusercontent.com/77583463/224508740-594a1cf3-f4ed-4342-84c3-b53824f909d8.png)
![image](https://user-images.githubusercontent.com/77583463/224508757-04461c6b-8c2c-4b7b-a850-65399150cf5c.png)
![image](https://user-images.githubusercontent.com/77583463/224508789-d7036b54-c457-43b2-b5ce-3708c4c65726.png)

### Mobile:
![image](https://user-images.githubusercontent.com/77583463/224508909-b07e15d8-b3bc-4862-8c0e-7c9f544923d5.png)


## How to run locally
- Clone repo and `npm i`
- Use `npm run dev` to start the dev environment

## Notes
- To access the admin panel, go to the `/admin` page
- To set discord credentials, add your email address used with your discord account in the `.env` file
- Right now, blog images are stored in the `/blog-imgs/` directory in the `public` folder. Just add the file name when putting images into your posts
