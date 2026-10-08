# Nurture Map Lab website

Live at https://wangyunai.github.io. GitHub Pages rebuilds the site automatically
a minute or two after any change is committed to `main`, so there is nothing to
install or run.

## Everyday updates

Almost everything you'd want to change lives in the `_data/` folder. Open a file
on GitHub, click the pencil icon, edit, and commit.

| To change…                                    | Edit                      |
| --------------------------------------------- | ------------------------- |
| News                                          | `_data/news.yml`          |
| Lab members, alumni, partners, your PI card   | `_data/people.yml`        |
| Selected publications                         | `_data/publications.yml`  |
| Grants                                        | `_data/grants.yml`        |
| Methods & software                            | `_data/methods.yml`       |
| Headline numbers, links, MOON Study details   | `_data/lab.yml`           |

### Add a news item

Add a block at the **top** of `_data/news.yml` (the homepage shows the newest five):

```yaml
- date: Nov 2026
  category: Paper
  text: Our placental MRI paper is out in Radiology.
  url: https://doi.org/...     # optional
```

### Add a lab member

In `_data/people.yml`, copy an entry under `members:`. Put a square photo in
`images/` and set `photo: /images/their-file.jpg`, or leave `photo: ""` to show
initials. When someone leaves, move them to `alumni:`. If they publish with the
lab, add their citation name (e.g. `Doe, J.`) under `lab_authors:` so it shows in
bold.

### Add a publication

Add a block at the top of `_data/publications.yml`. The homepage shows the first
six; add `profile: true` to also list it on the PI page.

## Formatting tips

- Indentation matters in `.yml` files: use spaces, never tabs, and line up with
  the entries around you.
- If a line contains a colon followed by a space (`Title: subtitle`), wrap the
  text in double quotes.
- If the site doesn't update after a commit, open the **Actions** tab on GitHub;
  a red ✗ there usually points to the line with a YAML typo.

## MOON Study page

`/moon/` is the families page. Its phone number, eligibility, compensation, and
SMS terms link are set in `_data/lab.yml` under `moon:` and stay hidden until
filled in. The visit schedule (MRI weeks, remote consent, first-year check-ins)
is written but hidden until you set `show_visit_details: true`. Participant-facing
wording should be IRB-approved before it goes live.

## Pages and layout

- `index.html` — homepage
- `moon/index.html` — MOON Study families page
- `people/yun-wang/index.html` — PI profile
- `_layouts/default.html`, `_includes/` — shared header, footer, page setup
- `assets/css/main.css` — all styles
