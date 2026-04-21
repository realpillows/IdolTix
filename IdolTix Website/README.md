# IdolTix Static Website

Public storefront for IDOLTIX, UEN 53522050B.

## Local preview

Run from this folder:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```txt
http://127.0.0.1:4173/
```

## Deploy to Vercel

- Import this folder or its GitHub repo into Vercel.
- Framework preset: Other.
- Build command: none.
- Output directory: root.

The included `vercel.json` enables clean URLs such as `/shop`, `/checkout`, and `/policies/terms`.
