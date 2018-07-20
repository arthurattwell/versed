# Versed

**Typographic control for verse, poetry, hymns and lyrics.**

See the [project home page](https://arthurattwell.github.io/versed) for examples.

## Usage

### 1. Add `versed.js` and `versed.css`

Link to `versed.css` and `versed.js` in your HTML by adding these lines to your `head` element:

``` html
<link rel="stylesheet" type="text/css" href="path/to/versed.css">
<script src="path/to/versed.js"></script>
```

See this project's `index.html` page for an example. You'll need to change the `path/to/` part to work for your particular project. You could even link to the hosted version on GitHub, but then you're depending on nothing changing here:

``` html
<link rel="stylesheet" type="text/css" href="https://raw.githubusercontent.com/arthurattwell/versed/master/versed.css">
<script src="https://raw.githubusercontent.com/arthurattwell/versed/master/versed.js"></script>
```

### 2. Mark up your verse

To do this, ensure these two things in your final HTML:

1. Stanzas should be `<p>`s, with `<br>`s for line breaks.
2. Each poem (including any title, marked up as a heading element) in a `div` or a `blockquote` with the class `versed`.

Below are examples in HTML and how you'd do this is markdown, if your system creates HTML from your markdown.

#### HTML example

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

The [`index.html` for this project](https://raw.githubusercontent.com/arthurattwell/versed/master/index.html) contains more HTML examples.

#### Markdown examples

You need to wrap each poem in an HTML `<div>`. Most markdown flavours let you do this with actual HTML tags.

In [CommonMark](https://spec.commonmark.org/0.28/#html-blocks), you add a blank line around the HTML `<div>` tags:

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

In [kramdown](https://kramdown.gettalong.org/syntax.html#html-spans), you add the attribute `markdown="1"` to the opening `div` tag:

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

In kramdown you can also use blockquote syntax instead, and apply a `versed` class to the blockquote. For example:

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

Versed's styling will remove the blockquote indentation that most browsers apply to blockquotes, so that a `versed` blockquote acts much like a plain `div`.

#### Indentation

For line indents and extra spaces, use em spaces. This is best done with the HTML entity `&emsp;`.

#### Line numbers

To add line numbers, add the class `versed-number-lines` to your `div` or `blockquote`, like this:

``` html

<div class="versed versed-number-lines">

    <h3>I Wandered Lonely as a Cloud</h3>

    <p>I wandered lonely as a cloud<br>
    That floats on high o'er vales and hills ...</p>

</div>
```

## In epub

In some, great ereaders like Readium, Versed works perfectly! Unfortunately, many epub readers (including Adobe Digital Editions and Sigil) inject their own scripts and attributes into your pristine HTML, and this clashes with `versed.js`, and makes a mess of your verse.

## In print

If you print from Chrome, Versed works just fine. It does not (yet) work with PrinceXML directly.

## Background

Poetry formatting is complicated, and if you've studied poetry and know HTML you know that HTML has no inherent way to mark up poetry semantically in a way that suits the structure of most poems. And the same goes for all verse, including lyrics and hymns or snippets of song in running text.

So I set out to find or create:

1. A convention for marking up poetry that can be expressed in plain markdown (e.g. [CommonMark](http://commonmark.org/) for want of a better 'standard'). Rendered as HTML with nothing but browser formatting, the poems should still be readable and recognisable as poems.
2. A script that turns those poems into properly structured elements that we can target with CSS. The script targets a class, which can be applied, for instance, to a `div` or a `blockquote` that contains verse. (e.g. applied to markdown if you're using kramdown, or by wrapping markdown in a `div` that the processor knows to process).
3. An unopinionated CSS stylesheet to format these poems.

### Others' work

Who else has tackled similar issues?

In the [Electric Book workflow](http://electricbook.works/docs/editing/poetry.html), we hack line control by treating lines of verse as list items. It's not a terrible hack, but it's still a hack. Most importantly, it provides a poor fallback where our `.verse` CSS isn't available. (Bulleted poems, yuck!)

Like many fastidious ebook coders, [EPUBSecrets](http://epubsecrets.com/formatting-poetry-in-epub-part-1.php) and [Joshua Tallent](http://ebookarchitects.com/blog/backwards-compatible-poetry-for-kf8mobi/) use manual HTML markup and CSS, where stanzas are in a `div` and each line of poetry is a `p`. They get a [good-looking result](https://www.nytimes.com/2014/09/15/arts/artsspecial/line-by-line-e-books-turn-poet-friendly.html), but this kind of manual coding is very labour-intensive. And I think marking up every line as a paragraph is as much a necessary hack of HTML semantics as making each line a list item.

That said, their approach does also demonstrate how to use media queries to target differing CSS support among ereaders, which is a separate CSS challenge we don't tackle in Versed. [Liz Castro](http://www.pigsgourdsandwikis.com/2012/01/media-queries-for-formatting-poetry-on.html) has written more on this.

Thanks to Dave Rupert for [Lettering.js](http://letteringjs.com/) (and those who [adapted it](https://github.com/davatron5000/Lettering.js/wiki/More-Lettering.js)). That work provided a great starting place for `versed.js`.
