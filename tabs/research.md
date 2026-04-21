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
      {% assign paper_type = paper.type | default: paper["type"] | default: paper.data.type | default: paper.data["type"] | default: "Working paper" %}
      {% assign pdf_path_value = paper.pdf_path | default: paper["pdf_path"] | default: paper.data.pdf_path | default: paper.data["pdf_path"] %}
      {% assign is_request_only = false %}
      {% if pdf_path_value == "request" %}
        {% assign is_request_only = true %}
      {% endif %}
      <article class="collection-card">
        <p class="collection-card__label">{{ paper_type }}</p>
        <h2 class="collection-card__title">
          {% if pdf_path_value and pdf_path_value != "" and is_request_only == false %}
            <a href="{{ pdf_path_value | relative_url }}" download>
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
        {% if pdf_path_value and pdf_path_value != "" and is_request_only == false %}
          <p class="collection-card__actions">
            <a class="button-link" href="{{ pdf_path_value | relative_url }}" download>Download PDF</a>
          </p>
        {% elsif is_request_only %}
          <p class="collection-card__actions">
            <span class="collection-card__availability">Available upon request</span>
          </p>
        {% endif %}
      </article>
    {% endunless %}
  {% endfor %}
</div>
