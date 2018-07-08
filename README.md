# Versed

**Typographic control for verse, poetry, hymns and lyrics.**

See the [project home page](https://arthurattwell.github.io/versed) for examples.

## Usage

> Note: This is work in progress.

### 1. Add `versed.js` and `versed.css`

Link to `versed.css` and `versed.js` (or `versed.min.js`) in your HTML. See this project's `index.html` page for an example.

### 2. Mark up your verse

To do this, you'll:

1. Mark up stanzas as `<p>`s, with `<br>`s for line breaks.
2. Wrap each poem (including its title, marked up as a heading element) in a `div` or a `blockquote` with the class `versed`.

#### HTML examples

``` html
<div class="versed">

    <h3>I Wandered Lonely as a Cloud</h3>

    <p>I wandered lonely as a cloud<br>
    That floats on high o'er vales and hills<br>
    When all at once I saw a crowd,<br>
    A host, of golden daffodils;<br>
    Beside the lake, beneath the trees,<br>
    Fluttering and dancing in the breeze.</p>

</div>
```

#### Markdown examples

This is also easy to do in markdown by wrapping each poem in an HTML `<div>`. Most markdown flavours let you do this.

In [CommonMark](https://spec.commonmark.org/0.28/#html-blocks), you add a blank line around the HTML `<div>` tags.

``` md

<div class="versed">

### I Wandered Lonely as a Cloud

I wandered lonely as a cloud\\
That floats on high o'er vales and hills,\\
When all at once I saw a crowd,\\
A host, of golden daffodils;\\
Beside the lake, beneath the trees,\\
Fluttering and dancing in the breeze.

</div>

```

In [kramdown](https://kramdown.gettalong.org/syntax.html#html-spans), you add the attribute `markdown="1"` to the opening `div` tag.

``` md

<div class="versed" markdown="1">

### I Wandered Lonely as a Cloud

I wandered lonely as a cloud\\
That floats on high o'er vales and hills,\\
When all at once I saw a crowd,\\
A host, of golden daffodils;\\
Beside the lake, beneath the trees,\\
Fluttering and dancing in the breeze.

</div>

```

In kramdown you can also use a blockquote instead, and apply a `versed` class to it. For instance, in kramdown you can do:

``` md
> ### I Wandered Lonely as a Cloud
> 
> I wandered lonely as a cloud\\
> That floats on high o'er vales and hills,\\
> When all at once I saw a crowd,\\
> A host, of golden daffodils;\\
> Beside the lake, beneath the trees,\\
> Fluttering and dancing in the breeze.
{:.versed}
```

(Versed will override basic user-agent blockquote indentation to use that blockquote as a plain div.)

#### Indentation

For line indents and extra spaces, use em spaces. This is best done with the HTML entity `&emsp;`.

#### Line numbers

> This is not currently working properly.

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

I set out to find or create:

1. A convention for marking up poetry that can be expressed in plain markdown (e.g. [CommonMark](http://commonmark.org/) for want of a better 'standard'). Rendered as HTML with nothing but user-agent formatting, the poems should still be readable and recognisable as poems.
2. A script that turns those poems into properly structured elements that we can target with CSS. The script targets a class, which can be applied, for instance, to a `div` or a `blockquote` that contains verse. (e.g. applied to markdown if you're using kramdown, or by wrapping markdown in a `div` that the processor knows to process).
3. An unopinionated CSS stylesheet to format these poems.

### Others' work

Who else has tackled similar issues?

In the [Electric Book workflow](http://electricbook.works/docs/editing/poetry.html), we hack this by treating lines of poetry as list items. It's not a terrible hack, but it's still a hack. Most importantly, it provides a poor fallback where our `.verse` CSS isn't available. (Bulleted poems, yuck!)

[EPUBSecrets](http://epubsecrets.com/formatting-poetry-in-epub-part-1.php) and [Joshua Tallent](http://ebookarchitects.com/blog/backwards-compatible-poetry-for-kf8mobi/) use manual HTML markup and CSS, where stanzas are in a `div` and each line of poetry is a `p`. They get a beautiful result, but this kind of manual coding is very labour-intensive. [The New York Times even covered Tallent's work](https://www.nytimes.com/2014/09/15/arts/artsspecial/line-by-line-e-books-turn-poet-friendly.html).

These examples also demonstrate how to use media queries to target differing CSS support among ereaders, which is a separate CSS challenge. [Liz Castro](http://www.pigsgourdsandwikis.com/2012/01/media-queries-for-formatting-poetry-on.html) has written more on that.

[Dave Rupert](https://github.com/davatron5000/Lettering.js)'s' [Lettering.js](http://letteringjs.com/) provided a great starting point for this, because you could use it to target the lines of a poem. [Thomas Fuchs](https://github.com/madrobby) created a [super-efficient, no-jQuery version](https://gist.github.com/madrobby/1119059) (and [others created similar adaptations](https://github.com/davatron5000/Lettering.js/wiki/More-Lettering.js)). This work was super valuable, and I've adapted Fuchs's version for part of our script.

