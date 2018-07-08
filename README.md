# Versed

**Typographic control for verse, poetry, hymns and lyrics.**

> This is work in progress.

Proper poetry layout has two specific needs:

- long lines that run over should be indented
- verse blocks should be [centered on their longest line](http://webtypography.net/2.3.4).

You can get this effect by:

1. Including `versed.js` and `versed.css` on your page
2. Marking up your verse HTML sensibly. (You can do it simply in markdown, too.)

## Usage

### 1. Add `versed.js` and `versed.css`

First, link to `versed.css` and `versed.js` in your page. See this project's `index.html` page for an example.

### 2. Mark up your verse

This is really easy once you know how.

1. In your HTML, mark up stanzas as paragraphs (that is, `<p>` elements), and use line breaks (`<br>`) to break lines.
2. Wrap each poem (including its title, which would normally be marked up as a heading element) in a `div` or a `blockquote` with the class `versed`.

This is also easy to do in markdown by wrapping each poem in an HTML `div`. Most markdown flavour let you wrap passages of markdown in `<div class="versed">...</div>`:

``` html
<div class="versed">

    <h3>I Wandered Lonely as a Cloud</h3>

    <p>I wandered lonely as a cloud<br>
    That floats on high o'er vales and hills ...</p>

</div>
```

In [CommonMark](https://spec.commonmark.org/0.28/#html-blocks), you only have to have a blank line around the HTML tags. In [kramdown](https://kramdown.gettalong.org/syntax.html#html-spans), you add the attribute `markdown="1"` to the opening `div` tag.

You can also use a blockquote, if you can apply a `versed` class to it. For instance, in kramdown you can do:

``` md
> I wandered lonely as a cloud
{:.versed}
```

(Versed will override normal blockquote indentation to format that blockquote as a plain div.)

For line indents and extra spaces, use em spaces. This is best done with the HTML entity `&emsp;`.

#### Line numbers

To add line numbers to your poems, add the class `versed-number-lines` to your `div` or `blockquote`, like this: 

``` html

<div class="versed versed-number-lines">

    <h3>I Wandered Lonely as a Cloud</h3>

    <p>I wandered lonely as a cloud<br>
    That floats on high o'er vales and hills ...</p>

</div>
```

## Background

Poetry formatting is complicated, and if you've studied poetry and know HTML you know that HTML has no inherent way to mark up poetry semantically in a way that suits poetry's semantic structures. And the same goes for all verse, including lyrics and hymns or snippets of song in running text.

We needed:

1. A convention for marking up poetry that can be expressed in plain markdown (e.g. [CommonMark](http://commonmark.org/) for want of a better 'standard'). Rendered as HTML with nothing but user-agent formatting, the poems should still be readable and recognisable as poems.
2. A script that turns those poems into properly structured elements that we can target with CSS. The script:
    - targets a class, which can be applied, for instance, to a `div` or a `blockquote` that contains verse. (e.g. applied to markdown if you're using kramdown, or by wrapping markdown in a `div` that the processor knows to process), 
    - some kind of explicit delimiter (e.g. a lone pilcrow before and after a poem) or
    - the pattern of elements created by our given syntax (e.g. a heading followed by a series of short lines). This last option is most convenient and least likely to work.
3. An unopinionated CSS stylesheet (probably written as Sass) that can be applied to format these poems conventionally (e.g. enlarge titles, preserve white space, put spaces between stanzas, and indent runover lines).

## Others' work

Who else has tackled similar issues?

In the [Electric Book workflow](http://electricbook.works/docs/editing/poetry.html), we hack this by treating lines of poetry as list items. It's not a terrible hack, but it's still a hack. Most importantly, it provides a poor fallback where our `.verse` CSS isn't available. (Bulleted poems, yuck!)

[EPUBSecrets](http://epubsecrets.com/formatting-poetry-in-epub-part-1.php) and [Joshua Tallent](http://ebookarchitects.com/blog/backwards-compatible-poetry-for-kf8mobi/) use manual HTML markup and CSS, where stanzas are in a `div` and each line of poetry is a `p`. They get a beautiful result, but this kind of manual coding is very labour-intensive. [The New York Times even covered Tallent's work](https://www.nytimes.com/2014/09/15/arts/artsspecial/line-by-line-e-books-turn-poet-friendly.html).

These examples also demonstrate how to use media queries to target differing CSS support among ereaders, which is a separate CSS challenge. [Liz Castro](http://www.pigsgourdsandwikis.com/2012/01/media-queries-for-formatting-poetry-on.html) has written more on that.

[Dave Rupert](https://github.com/davatron5000/Lettering.js)'s' [Lettering.js](http://letteringjs.com/) provided a great starting point for this, because you could use it to target the lines of a poem. [Thomas Fuchs](https://github.com/madrobby) created a [super-efficient, no-jQuery version](https://gist.github.com/madrobby/1119059) (and [others created similar adaptations](https://github.com/davatron5000/Lettering.js/wiki/More-Lettering.js)). This work was super valuable, and I've adapted Fuchs's version for part of our script.

