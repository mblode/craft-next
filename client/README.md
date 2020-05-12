# A statically generated blog example using Next.js and Prismic

This example showcases Next.js's [Static Generation](/docs/basic-features/pages.md) feature using [Prismic](https://prismic.io/) as the data source.

## Demo

### [https://next-blog-prismic.now.sh/](https://next-blog-prismic.now.sh/)

### Related examples

- [Blog Starter](/examples/blog-starter)
- [DatoCMS](/examples/cms-datocms)
- [TakeShape](/examples/cms-takeshape)
- [Sanity](/examples/cms-sanity)

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npm init next-app --example cms-prismic cms-prismic-app
# or
yarn create next-app --example cms-prismic cms-prismic-app
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/cms-prismic
cd cms-prismic
```

## Configuration

### Step 1. Create an account and a repository on Prismic

First, [create an account on Prismic](https://prismic.io/).

After creating an account, create a **repository** from the [dashboard](https://prismic.io/dashboard/) and assign to it any name of your liking.

### Step 2. Create an `author` type

From the repository page, create a new **custom type**:

- The name should be `author`.

Next, add these fields (you don't have to modify the settings):

- `name` - **Key Text** field
- `picture` - **Image** field

Alternatively, you can copy the JSON in [`types/author.json`](types/author.json), then click on **JSON editor** and paste it there.

Save the type and continue.

### Step 3. Create a `post` type

From the repository page, create a new **custom type**:

- The name should be `post`.

Next, add these fields (you don't have to modify the settings unless specified):

- `title` - **Title** field
- `content` - **Rich Text** field
- `richText` - **Key Text** field
- `coverImage` - **Image** field
- `date` - **Date** field
- `author` - **Content relationship** field, you may also add `author` to the **Constraint to custom type** option to only accept documents from the `author` type.
- `slug` - **UID** field.

Alternatively, you can copy the JSON in [`types/post.json`](types/post.json), then click on **JSON editor** and paste it there.

Save the type and continue.

### Step 4. Populate Content

Go to the **Content** page, it's in the menu at the top left, then click on **Create new** and select the **author** type:

- You just need **1 author document**.
- Use dummy data for the text.
- For the image, you can download one from [Unsplash](https://unsplash.com/).

Next, select **Post** and create a new document.

- We recommend creating at least **2 Post documents**.
- Use dummy data for the text.
- You can write markdown for the **content** field.
- For images, you can download them from [Unsplash](https://unsplash.com/).
- Pick the **author** you created earlier.

**Important:** For each document, you need to click **Publish** after saving. If not, the document will be in the draft state.

### Step 5. Set up environment variables

Follow the instructions in [this post](https://intercom.help/prismicio/en/articles/1036153-generating-an-access-token) to generate a new access token.

Next, copy the `.env.example` file in this directory to `.env` (which will be ignored by Git):

```bash
cp .env.example .env
```

Then set each variable on `.env`:

- `NEXT_EXAMPLE_CMS_PRISMIC_API_TOKEN` should be the **Permanent access token** you just created
- `NEXT_EXAMPLE_CMS_PRISMIC_REPOSITORY_NAME` is the name of your repository (the one in the URL)
- `NEXT_EXAMPLE_CMS_PRISMIC_REPOSITORY_LOCALE` is the locale of your repository. Defaults to `en-us`

Your `.env` file should look like this:

```bash
NEXT_EXAMPLE_CMS_PRISMIC_API_TOKEN=...
NEXT_EXAMPLE_CMS_PRISMIC_REPOSITORY_NAME=...
NEXT_EXAMPLE_CMS_PRISMIC_REPOSITORY_LOCALE=...
```

### Step 6. Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/zeit/next.js/discussions).

### Step 7. Try preview mode

On your repository page, go to **Settings**, click on **Previews** and then **Create a New Preview** for development, fill the form like so:

- **Site Name**: may be anything, like `development`
- **Domain of Your Application**: `http://localhost:3000`
- **Link Resolver**: `/api/preview`

Once saved, go to one of the posts you've created and:

- **Update the title**. For example, you can add `[Draft]` in front of the title.
- Click **Save**, but **DO NOT** click **Publish**. By doing this, the post will be in draft state.
- Right next to the **Publish** button you should see the **Preview** button, displayed with an eye icon. Click on it!

You should now be able to see the updated title. To exit preview mode, you can click on **Click here to exit preview mode** at the top of the page.

### Step 8. Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

To deploy on Vercel, you need to set the environment variables with **Now Secrets** using [Vercel CLI](https://vercel.com/download) ([Documentation](https://vercel.com/docs/now-cli#commands/secrets)).

Install [Vercel CLI](https://vercel.com/download), log in to your account from the CLI, and run the following commands to add the environment variables. Replace `<NEXT_EXAMPLE_CMS_PRISMIC_API_TOKEN>` and `<NEXT_EXAMPLE_CMS_PRISMIC_REPOSITORY_NAME>` with the corresponding strings in `.env`:

```bash
now secrets add next_example_cms_prismic_api_token <NEXT_EXAMPLE_CMS_PRISMIC_API_TOKEN>
now secrets add next_example_cms_prismic_repository_name <NEXT_EXAMPLE_CMS_PRISMIC_REPOSITORY_NAME>
```

Then push the project to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example) to deploy.
