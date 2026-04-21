---
title: Research
permalink: /research/
intro: Working papers and current research projects.
section_class: page-section--wide
---
<div class="collection-list">
  {% assign papers = site.research | sort: "order" %}
  {% for paper in papers %}
    {% unless paper.path contains "TEMPLATE.md" %}
      <article class="collection-card">
        <p class="collection-card__label">Working paper</p>
        <h2 class="collection-card__title">
          {% if paper.pdf_path and paper.pdf_path != "" %}
            <a href="{{ paper.pdf_path | relative_url }}" download>
              {{ paper.title }}
            </a>
          {% else %}
            {{ paper.title }}
          {% endif %}
        </h2>
        {% assign coauthors_value = paper.coauthors | default: paper["coauthors"] | default: paper.data.coauthors | default: paper.data["coauthors"] %}
        {% if coauthors_value and coauthors_value != "" %}
          <p class="collection-card__meta">{{ coauthors_value }}</p>
        {% endif %}
        <div class="collection-card__body">
          {{ paper.content | markdownify }}
        </div>
        {% if paper.pdf_path and paper.pdf_path != "" %}
          <p class="collection-card__actions">
            <a class="button-link" href="{{ paper.pdf_path | relative_url }}" download>Download PDF</a>
          </p>
        {% endif %}
      </article>
    {% endunless %}
  {% endfor %}
</div>
