## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Image uploads

Admin cover images are uploaded through `POST /api/upload` (multipart) and saved to
`storage/uploads/` (gitignored). Served back via `GET /uploads/[file]`. The public URL
(`/uploads/xxx.jpg`) is stored in `projects.cover_image`, never a `blob:` URL (blob URLs
break outside the creating tab). On the landing grid, cards render images at natural
height (`w-full h-auto`, no forced aspect) so the masonry staggers by image height.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
