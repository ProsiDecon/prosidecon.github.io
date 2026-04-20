---
title: Research
permalink: /research/
intro: Working papers and current research projects.
---
<div class="collection-list">
  {% assign papers = site.research | sort: "path" %}
  {% for paper in papers %}
    {% unless paper.path contains "TEMPLATE.md" %}
      <article class="collection-card">
        <p class="collection-card__label">Working paper</p>
        <h2 class="collection-card__title">
          <a href="{{ paper.pdf_path | relative_url }}" download>
            {{ paper.title }}
          </a>
        </h2>
        <div class="collection-card__body">
          {{ paper.content | markdownify }}
        </div>
        <p class="collection-card__actions">
          <a class="button-link" href="{{ paper.pdf_path | relative_url }}" download>Download PDF</a>
        </p>
      </article>
    {% endunless %}
  {% endfor %}
</div>
